$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function() {
        $('.reg-box').show()
        $('.login-box').hide()

    })
    // 点击去登录的链接
    $('#link_login').on('click',function() {
        $('.reg-box').hide()
        $('.login-box').show()

    })
    // 从layui中获取form对象
    let form = layui.form
    // 从layui中获取layer对象
    let layer = layui.layer
    // 通过form.verify()函数制定校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd!==value) {
                return '两次输入的密码不一致'
            } 
            

          }
    })
    //    监听注册表单的提交事件
    
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        let data = {
            username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function (res) {
            if (res.status!==0) {
                // return console.log(res.message)
                return layer.msg(res.message)

            }
            // console.log('注册成功')
            layer.msg('注册成功，请登录')
            $('#link_login').click()


        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登陆失败')

                }
                layer.msg('登陆成功')
                // 将登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })




})