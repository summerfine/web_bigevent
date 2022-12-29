$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo()
    let layer = layui.layer



    // 点击按钮实现退出功能

    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录界面
            location.href = '/login.html'
            
            // 关闭confirm询问框
            layer.close(index)
          })

    })
})
// 获取用户的基本信息
function getUserInfo() {
$.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers:{
    //     Authorization: localStorage.getItem('token') || '' },
    success: function (res) {
        if (res.status !== 0) {
            return layui.layer.msg('获取用户信息失败')
        }
        // 调用renderAvatar渲染用户的头像
        renderAvatar(res.data)
    },
    // complete: function (res) {
    //     // console.log(res)
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // 1.强制清除本地存储中的token
    //         localStorage.removeItem('token')
    //         // 2.跳转到login.html中
    //         location.href = '/login.html'

    //     }

    // }
})
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }



}
