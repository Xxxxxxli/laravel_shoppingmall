var _tools = {
    post: function (url, postData, success) {
        // 发送post方法
        $.ajax({
            url: url,
            type: 'POST',
            data: postData,
            dataType: 'JSON',
            success: success,
            error: function () {
                console.error('系统错误');
            }
        })
    },
    csrf: function () {
        // 获取csrf
        return $('meta[name="csrf"]').attr('content');
    },
    swiper: function () {
        // 初始化默认swiper
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
        return mySwiper;
    }
};

// 点击菜单 显示菜单
$(function () {
    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('#iosMask');

    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle');
        $iosMask.fadeOut(200);
    }

    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
    $("#showIOSActionSheet").on("click", function () {
        $iosActionsheet.addClass('weui-actionsheet_toggle');
        $iosMask.fadeIn(200);
    });
});

// 返回顶部
$(function () {
    $(document).on('scroll', function () {
        var h = $(document).scrollTop();
        if (h > 200) {
            $('.to-top').show()
        } else {
            $('.to-top').hide()
        }
    });
    var toTop = $('.to-top');
    toTop.on('click', function () {
        window.scrollTo(0, 0);
    });
});

// 添加购物车
$(function () {
    $('#addCar').click(function () {
        var product_id = $(this).data('id');
        var url = "/service/car";
        var postData = {_token: _tools.csrf(), product_id: product_id};
        _tools.post(url, postData, function (res) {
            if (res.status === 0) {
                window.location.href = '/login';
            } else {
                var count = res.data.count;
                $('#carNum').html(count);
            }
        });
    });
});

// 删除购物车
$(function() {
    $('#deleteCar').click(function () {
        var product_id = [];
        $('.car-check').each(function () {
            if ($(this).is(':checked')) {
                product_id.push($(this).attr('id'))
            }
        });
        if (product_id.length === 0) {
            alert('请选择要删除的商品');
            return;
        }
        var url = '/service/delete_car';
        var postData = {_token: _tools.csrf(), product_id: product_id};
        _tools.post(url, postData, function (res) {
            if (res.status === 1) {
                window.location.reload();
            }
        });
    });
});

// 更换图片验证码
$(function () {
    var validateImage = $('#validateImage');
    validateImage.on('click', function () {
        var url = '/service/validate_code?rand=' + Math.round(Math.random() * 5000);
        $(this).attr('src', url);
    })
});

// 注销
$(function () {
    $('#_logout').on('click', function () {
        var url = '/service/logout';
        var postData = {_token: _tools.csrf()};
        _tools.post(url, postData, function () {
            window.location.href = '/login';
        })
    });
});

// 跳转书籍列表 、 购物车
$(function () {
    $('#_category').on('click', function () {
        window.location.href = '/';
    });
    $('#_car').on('click', function () {
        window.location.href = '/car';
    });
});

// 生成订单
$('#createOrder').on('click', function () {
    var url = '/service/order';
    var product_id = [];
    $('.car-check').each(function () {
        if ($(this).is(':checked')) {
            product_id.push($(this).attr('id'));
        }
    });
    var postData = {_token: _tools.csrf(), product_id: product_id};
    console.log(postData);
    if (product_id.length === 0) {
        alert('请先选择需要购买的产品!');
        return;
    }

    _tools.post(url, postData, function (res) {
        if (res.status === 0) {
            alert(res.message);
        } else {
            window.location.href = '/payment/' + res.data.order_no;
        }
    })
});