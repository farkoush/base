<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designer extends Model
{
    protected $casts = [
        'cameras'    => 'array',
        'flags'    => 'array',
        'parts'    => 'array',
        'options'   => 'array',
    ];
}
