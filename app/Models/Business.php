<?php

namespace App\Models;

use Spatie\MediaLibrary\File;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\Facades\BusinessRepo;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Business extends Model implements HasMedia
{
    use SoftDeletes, HasSlug, HasMediaTrait;

    protected $fillable = [
        'brand', 'slug', 'city_id', 'contact',
    ];

    protected $casts = [
        'contact' => 'array',
    ];

    //  =============================== Relationships =========================
    public function getLogoAttribute()
    {
        return $this->getFirstMedia(enum('media.business.logo'));
    }

    //  =============================== Relationships =========================

    //  =============================== Relationships =========================
    public function users() : BelongsToMany
    {
        return $this->belongsToMany(User::class, 'businesses_users', 'business_id', 'user_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'variations', 'business_id', 'product_id', 'id', 'id')->distinct();
    }

    public function logo(): MorphToMany
    {
        return $this->mediagroups()->where('media_relations.collection_name', enum('media.business.logo'));
    }

    private function mediagroups(): MorphToMany
    {
        return $this->morphToMany(Media::class, 'model', 'media_relations');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function chats()
    {
        return $this->hasMany(Ticket::class, 'business_id', 'id');
    }

    //  =============================== End Relationships =====================

    //  =============================== Media =================================
    public function registerMediaCollections()
    {
        $this->addMediaCollection(enum('media.business.logo'))
            ->acceptsFile(function (File $file) {
                $allowedMimes = [
                    'image/jpeg', 'image/png', 'image/tiff', 'image/bmp',
                ];

                return in_array($file->mimeType, $allowedMimes);
            })
            ->singleFile();

        $this->addMediaCollection('business-gallery');
    }

    //  =============================== End Media =============================

    //  =============================== Complementary Methods =================
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->usingLanguage('fa')
            ->generateSlugsFrom('brand')
            ->saveSlugsTo('slug');
    }

    public function resolveRouteBinding($business)
    {
        if (request()->isXmlHttpRequest()) {
            return parent::resolveRouteBinding($business);
        } else {
            $business = BusinessRepo::findBySlug($business);

            return $business;
        }
    }

    public function hasLogo()
    {
        return $this->getMedia(enum('media.business.logo'))->isNotEmpty();
    }

    //  =============================== End Complementary Methods =============
}
