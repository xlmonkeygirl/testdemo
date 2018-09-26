$(function(){
    render();
    //tab切换效果
    $('.titleleft').click(function(){
        $('.titleleft').css({"color":"#ff500b","border-bottom":"3px solid #ff500b"});
        $('.titleright').css({"color":"#999","border":"none"});
        $('.mobilelogin').animate({'left':-352,'opacity':0}, 300,function(){
            $('.userlogin').animate({'left':0,'opacity':1}, 300);
        });
    });
    $('.titleright').click(function(){
        $('.titleleft').css({"color":"#999","border":"none"});
        $('.titleright').css({"color":"#ff500b","border-bottom":"3px solid #ff500b"});
        $('.userlogin').animate({'left':-352,'opacity':0}, 300,function(){
            $('.mobilelogin').animate({'left':40,'opacity':1}, 300);
        });
    });

    function render(){
        $('.titleleft').css({"color":"#ff500b","border-bottom":"3px solid #ff500b"});
        $('.titleright').css({"color":"#999","border":"none"});
        $('.account').val('');
        $('.loginpassword').val('');
        $('.vercode').val('');
        createCode();

        //  //页面刷新自动登录
        // //获取cookie
        var currentUserName,currentPassWord;
        var allcookies = document.cookie.split('; ');
        allcookies.forEach(function(items){
            var arr = items.split('=');
            if(arr[0] === 'username'){
                currentUserName = arr[1];
            }else if(arr[0] === 'password'){
                currentPassWord = arr[1];
            }
        });
        //判断cookie是否存在，存在即自动跳转
        if(currentUserName && currentPassWord){
            location.href = '../index.html';
        }
    }
    //点击生成验证码
    $('.create-code').mouseover(function(){
        $('.codewrap').css('display','block');
        $('.codewrap').click(function(){
            createCode();
        });
    });
    $('.create-code').mouseout(function(){
        $('.codewrap').css('display','none');
    });

    //验证验证码
    $('.vercode').blur(function(){
        testCode();
    });

    //勾选七天免登录
    var checkRes;
    var idx = 0;
    $('.check_service').attr('idx',idx);
    $('.check_service').click(function(){
        checkRes = testCheck();
    });

    //点击登录
    $('.btnLogin').click(function(){
        var userAccount = $('.account').val();
        var password = $('.loginpassword').val();
        //声明一个数组，存放用户登录信息的cookie
        // var userinfo = [{'username':'userAccount'}];
        if(userAccount && password){
            if(checkRes){
                //勾选七天免登陆写入cookie
                //获取页面打开时的时间
                var time = new Date();
                //将失效日期设置在七天后
                time.setDate(time.getDate()+7);
                //如果勾选了，将输入的信息写入到cookie中,并且添加cookie失效时间
                
                document.cookie = 'username= ' + userAccount + ';expires=' + time.toUTCString()+';Path='+escape('/');
                document.cookie = 'password =' + password + ';expires=' + time.toUTCString()+';Path='+escape('/');
            }else{
                // document.cookie = 'username= ' + userAccount+';Path='+escape('/');
                // document.cookie = 'password =' + password +';Path='+escape('/');
                Cookie.set('username',userAccount,{path:'/'});
            }
            

            //发送ajax请求
            $.ajax({
            url: '../api/login.php',
            type: 'get',
            asycn:true,
            data: {
                'username':userAccount,
                'password':password
            },
            success:function(str){
                // console.log(str);
                if(str == 'success'){
                    $('.loginerror').css('display','none');
                    location.href='../index.html';
                }else{
                    $('.loginerror').css('display','block');
                }
            }
            });
        }
        
    });

    //封装验证验证码
    function testCode(){
        var ocode = $('.vercode').val();
        var code = $('.create-code').text().slice(8);
        if(ocode != code){
            $('.codeerror').css('display','block');
            return false;
        }else{
            $('.codeerror').css('display','none');
            return true;
        }
    }

    //封装生成验证码
    function createCode(){
        var code = randomNumber(1000,9999);
        $('.create-code').html(`<a href="javascript:;" class="codewrap">看不清，更换一张</a>`+code);
    }

    //封装验证勾选
    function testCheck(){
        if($('.check_service').attr('idx')==0){
            $('.check_service').prop('checked','checked');
            idx = 1;
            $('.check_service').attr('idx',idx);
            return true;
        }else{
            $('.check_service').removeAttr('checked');
            idx = 0;
            $('.check_service').attr('idx',idx);
            return false;
        }
    }

    //封装

});