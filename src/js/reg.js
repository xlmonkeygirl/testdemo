$(function(){
    //注册正则验证
    $('.phoneNumber').blur(function(){
        testPhone();
    });

    //生成验证码
    createCode();

    //点击生成验证码
    $('.codeText').mouseover(function(){
        $('.codewrap').css('display','block');
        $('.codewrap').click(function(){
            createCode();
        });
    });
    $('.codeText').mouseout(function(){
        $('.codewrap').css('display','none');
    });

    //验证验证码
    $('.ercode').blur(function(){
        // console.log(typeof(ocode),typeof(code));
        testCode();
    });


    //勾选服务协议
    var checkRes;
    var idx = 0;
    $('.check_service').attr('idx',idx);
    $('.check_service').click(function(){
        checkRes = testCheck();
    });
    //点击下一步
    $('.btnNext').click(function(){
        var phoneRes = testPhone();
        var codeRes = testCode();
        if(checkRes == true){
            $('.checkerror').css('display','none');
        }else{
            $('.checkerror').css('display','block');
        }
        if(phoneRes && codeRes && checkRes){
            $('.regStep1').css('display','none');
            $('.regStep2').css('display','block');
        }else{
            $('.regStep1').css('display','block');
            $('.regStep2').css('display','none');
        }
    });

    //验证用户名
    $('.username').keyup(function(){
         var res = testUserName();
         console.log(res);
    });

    //验证密码
    $('.password').blur(function(){
        testPassword();
    });

    //确认密码
    $('.repass').blur(function(){
        testRepass();
    });

    //点击注册
    $('.btnReg').click(function(){
        var usernameres = testUserName();
        var passwordres = testPassword();
        var repassres = testPassword()

        if(usernameres && passwordres && repassres){
            register();
        }
    });


    //封装验证验证码
    function testCode(){
        var ocode = $('.ercode').val();
        var code = $('.codeText').text().slice(8);
        if(ocode != code){
            $('.codeerror').css('display','block');
            return false;
        }else{
            $('.codeerror').css('display','none');
            return true;
        }
    }

    // 封装验证手机号
    function testPhone(){
        var phone = $('.phoneNumber').val();
        var phoneReg = /^1[3-9]\d{9}$/;
        if(!phoneReg.test(phone)){
            $('.phoneerror').css('display','block');
            return false;
        }else{
            $('.phoneerror').css('display','none');
            $.ajax({
                url: '../api/check_phone.php',
                type: 'get',
                async:true,
                data: {
                    'phoneNumber':phone
                },
                success:function(str){
                    if(str == 'no'){
                        $('.phoneerror').html(`<span>&nbsp;&nbsp;&#161;</span>手机号已存在`)
                                        .css('display','block');
                    }else{
                        $('.phoneerror').html('')
                                         .css('display','none');  
                    }
                }
            });
            if($('.phoneerror').css('display')=='none'){
                return true;
            }else{
                return false;
            }
        }
    }


    //封装生成验证码
    function createCode(){
        var code = randomNumber(1000,9999);
        $('.codeText').html(`<a href="javascript:;" class="codewrap">看不清，更换一张</a>`+code);
    }

    //封装验证勾选
    function testCheck(){
        if($('.check_service').attr('idx')==0){
            $('.check_service').removeAttr('checked');
            idx = 1;
            $('.check_service').attr('idx',idx);
            return false;
        }else{
            $('.check_service').prop('checked','checked');
            idx = 0;
            $('.check_service').attr('idx',idx);
            return true;
        }
    }

    //封装验证用户名
    function testUserName(callback){
        var username = $('.username').val();
        var usernameReg = /[a-zA-Z][\w\-]{5,19}/;
        var usernameRes = true;
        if(!usernameReg.test(username)){
            $('.usernameerror').css('display','block');
            return false;
        }
        else{
            $('.usernameerror').css('display','none');
            $.ajax({
                url: '../api/check_user.php',
                type: 'get',
                async:true,
                data: {
                    'username':username
                },
                success:function(str){
                    console.log(str);
                    if(str == 'yes'){
                        $('.usernameerror').css('display','none');
                        callback(usernameRes);
                    }else{
                        $('.usernameerror').css('display','block');
                        callback(!usernameRes);
                    }
                }
            });
            function callback(){
                return usernameRes;
            }
            return  usernameRes;
        }
    }


    //验证密码
    function testPassword(){
        var password = $('.password').val();
        if(password == ''){
            $('.passworderror').css('display','block');
            return false;
        }else{
            $('.passworderror').css('display','none');
            return true;
        }
    }

    //确认密码
    function testRepass(){
        var repass = $('.repass').val();
        var password = $('.password').val();
        if(repass != password){
            $('.repasserror').css('display','block');
            return false;
        }else{
            $('.repasserror').css('display','none');
            return true;
        }
    }

    //注册封装
    function register(){
        var username = $('.username').val();
        var password = $('.password').val();
        var phoneNumber = $('.phoneNumber').val();
        $.ajax({
            type:'get',
            url:'../api/reg.php',
            async:true,
            data:{
                'username':username,
                'password':password,
                'phoneNumber':phoneNumber
            },
            success:function(str){
                console.log(str);
                if(str == 'success'){
                    location.href = '../login.html';
                }
            }
        });
    }
    
    
});