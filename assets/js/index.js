$(function () {
    getUserInfo()
    var layer=layui.layer

    $('#btnLogout').on('click', function (){
        // console.log('ok');
        layer.confirm('确认退出登录?',{icon:3,title:'提示'},function(index){
            localStorage.removeItem('token')
            location.href='../../login.html'
            layer.close(index)
        })

    })
       
  

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失效')
            }
            renderAvater(res.data)
        },
        // complete:function(res){
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败'){
        //         localStorage.removeItem('token')
        //         location.href='../../login.html'
    
        //     }
        // }
    })
    function renderAvater(user) {
        var name = user.nickname || user.username

        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avater').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avater').html(first).show()

        }
    }
}