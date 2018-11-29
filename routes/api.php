<?php

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'AuthController@register')->name('register');
    Route::get('register/activate/{token}', 'AuthController@activate')->name('activate');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout')->name('logout');
        Route::get('user', 'AuthController@user')->name('user');
    });
});

Route::name('users.')->prefix('users')->middleware('web')->group(function () {

    Route::get('/', 'UserController@index')->name('index');
    Route::post('/', 'UserController@store')->name('store');

    Route::prefix('{user}')->group(function () {
        Route::get('/', 'UserController@show')->name('show');
        Route::put('/', 'UserController@update')->name('update');
        Route::delete('/', 'UserController@destroy')->name('destroy');
        Route::get('roles', 'UserController@roles')->name('roles');
        Route::put('roles', 'UserController@syncRoles')->name('roles.sync');
        Route::get('permissions', 'UserController@permissions')->name('permissions');
    });
});

Route::name('posts.')->prefix('posts')->group(function () {
    
    Route::get('/', 'PostController@index')
        ->name('index')
        ->middleware('acl:post.index');
    
    Route::post('/', 'PostController@store')
        ->name('store')
        ->middleware('acl:post.store');
    
    Route::prefix('{post}')->group(function () {
        
        Route::get('/', 'PostController@show')
            ->name('show')
            ->middleware('acl:post,post.show');
        
        Route::put('/', 'PostController@update')
            ->name('update')
            ->middleware('acl:post,post.update');
        
        Route::delete('/', 'PostController@delete')
            ->name('delete')
            ->middleware('acl:post,post.delete');
        
        Route::post('comments', 'PostController@comments')
            ->name('comments')
            ->middleware('acl:post,post.comments');
        
        Route::post('comments', 'PostController@commentsStore')
            ->name('comments.store')
            ->middleware('acl:post,post.comments.store');
    });
});
