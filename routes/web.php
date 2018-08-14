<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * 视图
 */
// 书籍列表
Route::get('/', 'View\CategoryController@index');

// 列表详情
Route::get('/products/{category_id}', 'View\CategoryController@products');

// 内容详情
Route::get('/product/{id}', 'View\ProductController@index');

// 登录
Route::get('/login', 'View\LoginController@index');

// 注册
Route::get('/register', 'View\RegisterController@index');

// 注销

// 购物车


// 提交订单

// 结算


/**
 * 服务器接口
 */
Route::group(['prefix' => 'service'], function () {
    // 根据上级分类id查询分类
    Route::post('category/{parent_id}', 'Service\CategoryController@categories');

    // 用户登录
    Route::post('/login', 'Service\LoginController@index');

    // 注册
    Route::post('/register', 'Service\RegisterController@regist');

    // 验证码
    Route::get('/validate_code', 'Service\LoginController@validate_code');

    /**
     * 需要验证登录的接口
     */
    Route::group(['middleware' => 'check_login'], function () {
        // 添加购物车
        Route::post('car', 'Service\CarController@add_car');
    });
});