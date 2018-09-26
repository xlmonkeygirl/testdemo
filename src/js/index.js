
$(function(){

    


    createNav();
    //三级导航
    function createNav(){
        //头部下拉菜单效果
        $('.top-box dl').mouseenter(function(){
            console.log(888);
            $('.top-box dl dd').stop();
            $(this).children().eq(0).css({'border':'solid #d6d6d6','border-width':'1px 1px 0 1px','margin':'-10px 2px 0 2px','background':'#fff','padding':'5px 9px 6px 9px'});
            $(this).children().eq(1).css({'height':'auto','border':'solid #d6d6d6','border-width':'0 1px 1px 1px','z-index':'2','background':'#fff'});
            $(this).children().eq(1).animate({'top':'21px','opacity':'1'}, 200);
        });
        $('.top-box dl').mouseleave(function(){
            $('.top-box dl dd').stop();
            $(this).children().eq(0).css({'border':'none','margin':'-14px 3px 0 3px','padding':'10px 9px 9px','background':'none'});
            $(this).children().eq(1).css({'height':'0','border':'none'});
            $(this).children().eq(1).animate({'top':'0','opacity':'0'}, 200);
        });

        //二级菜单
        $.ajax({
            url:'../api/data/nav.json',
            type:'get',
            async:true,
            success:function(str){
                var str = str.navList;
                // console.log(str);
                var html = '';
                for(var i=0;i<str.length;i++){
                    var li = '';
                    var a = '';
                    for(var j=0;j<str[i].length;j++){
                        // console.log(str[i][j]);
                        a += `<a href="${str[i][j].link}">${str[i][j].title}</a>`;
                    }
                    li = `<li idx="${i}">${a}</li>`;
                    html += li;
                }
                // console.log(html);
                $('.menu').html(html);
            }
        });
    }
        //三级菜单
        $('.categorymenu').delegate('li', 'mouseover', function() {

            $(this).css('background','#fff');
            $(this).children().css('color','#3a3a3a');
            $('.categorycontent').css('display','block');
            var idx = $(this).attr('idx');
            // console.log(idx);
            $.ajax({
                type:'get',
                url:'../api/data/nav_data.json',
                async:true,
                success:function(string){
                    // console.log(string);
                    var content = string[idx].subNavLists;
                    // console.log(content);
                    var html = '';
                    var htmldt = '';
                    for(var i=0;i<content.length;i++){
                        // var htmldt = `<dt>${content[i].subNavTit}</dt>`;
                        // console.log(htmldt);
                        var htmldl='';
                        var htmldd = '';
                        htmldt = `<dt>${content[i].subNavTit}</dt>`;
                        for(var j=0;j<content[i].subNavList.length;j++){
                            htmldd += `<dd>${content[i].subNavList[j]}</dd>`;
                        }
                        htmldl = `<dl class="clearfix">
                                    <dt class="title">${content[i].subNavTit}&nbsp;&nbsp;&nbsp;&nbsp;&gt;</dt>
                                    ${htmldd}
                                </dl>`;
                                // console.log(htmldl);
                        html += htmldl;
                    }
                    // console.log(html);
                    $('.categorycontent').html(html);
                }
            });
        });
        $('.categorymenu').delegate('li', 'mouseenter', function() {
            $(this).css('background','none');
            // $(this).siblings('li').css('background':'none');
            $(this).children().css('color','#fff');
            $('.categorycontent').css('display','none');
        });
         $('.menu').delegate('li', 'mouseleave', function() {
            $(this).css('background','none');
            $(this).children().css('color','#fff');
            $('.categorycontent').css('display','none');
        });
        $('.categorycontent').mouseenter(function(){
            $(this).css('display','block');
        });
        $('.categorycontent').mouseleave(function(){
            $(this).css('display','none');
        });
        //
        
    //轮播图
    var timer;
    var idx = 0;
    var len = $('.bd ul li').size();
    bannerPlay();
    $('.bd').mouseenter(function(){
        clearInterval(timer);
        $('.btnbanner').css('display','block');
    });
    $('.bd').mouseleave(function(){
        bannerPlay();
        $('.btnbanner').css('display','none');
    });
    $('.hd span').click(function(){
        var idx = $(this).index();
        console.log(idx);
        clearInterval(timer);
        bannerPlay();
    });

    // 封装banner播放函数
    function bannerPlay(){
        // console.log($('.bd ul li').eq(0));
        timer = setInterval(function(){
            $('.bd ul li').eq(idx).fadeIn(600).siblings('li').fadeOut(600);
            // $('.bd ul li').eq(idx+1).animate({'opacity':'1'}, 500);
            $('.hd span').eq(idx).addClass('active').siblings('span').removeClass('active');
            idx++;
            if(idx>=len){
                idx = 0;  
            }
        },3000);
    }

    $('.home-goods-wrap li').mouseenter(function() {
        $(this).children().children().stop();
        $(this).children().children('h3').animate({'top':'28px'}, 300);
        $(this).children().children('h5').animate({'top':'45px','color':'#f00'},300);
        $(this).children().children('img').animate({'right':'20px'},300);
    });
    $('.home-goods-wrap li').mouseleave(function(){
        $(this).children().children().stop();
         $(this).children().children('h3').animate({'top':'25px'}, 300);
        $(this).children().children('h5').animate({'top':'50px','color':'#888'},300);
        $(this).children().children('img').animate({'right':'30px'},300);
    });
    // console.log(999);
    // console.log($('.home-goods-wrap li'));
    // 
    var s1 = new Swiper('.swiper-container', {
                autoplay: { //自动轮播+延时两秒
                    delay:2000,
                    disableOnInteraction:false
                },
                loop: true,//无缝回路轮播
                speed: 500,//切换速度
                navigation: {//上下按钮
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {//焦点跟随
                    el: '.swiper-pagination',
                    clickable: true,//点击焦点跳到指定图片
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';//生成焦点数字
                    }
                },
                mousewheel:true//滚动滑轮可以切图

            });
            
            // var oBox=document.getElementById('swiper-container');
            
            // oBox.onmouseenter=function(){//鼠标经过停止
            //     s1.autoplay.stop();
            // }
            
            // oBox.onmouseleave=function(){//鼠标经过离开
            //     s1.autoplay.start();
            // }
            // $('.swiper-container').mouseover(function(){
            //     s1.autoplay.stop();
            // });
            // $('.swiper-container').mouseout(function(){
            //     s1.autoplay.start();
            // });

            // tab切换
            $('.floor-tab li').mouseenter(function(){
                $(this).css({'border-width':'1px 1px 0 1px','border':'solid #fe5621'}).siblings('li').css({'border-bottom':'1px solid #fe5621','border-width':'0 0 1px 0'});
                var idx = $(this).index();
                $('.maincontent').eq(idx).css('display','block').siblings('.maincontent').css('display','none');
            });
            $('.floor-tab li').mouseleave(function(){
                $(this).css({'border-width':'1px 1px 0 1px','border':'solid #fe5621'}).siblings('li').css('border','none');
               
            });
            //图片透明度改变效果
            $('.g-list li').mouseenter(function(){
                $(this).siblings('li').stop();
                $(this).animate({'opacity':'1'}, 300).siblings('li').animate({'opacity':'0.5'}, 300)
            });
            // $('.g-list li').mouseleave(function(){
            //     $(this).stop();
            // });
            $('.g-list').mouseleave(function(){
                $(this).children('li').animate({'opacity':'0.9'}, 300);
            });

            //侧边导航
            window.onscroll = function(){
                var scrolly = window.scrollY;
                console.log(scrolly);
                if(scrollY>600){
                    $('.slider-nav').css('display','block');
                }else{
                    $('.slider-nav').css('display','none');
                }
            }

            $('.slider-nav li').click(function(){
                $(this).css('background','#f15e1b');
                $(this).siblings('li').css('background','#fff');
                $(this).siblings('li').children('a').removeClass('active');
                $(this).children('a').addClass('active');
            });

            //登录状态转换
            var _login = `<a href="html/login.html">您好，请登录</a>
                        <a href="html/Reg.html">免费注册</a>`;
            $('.login').html(_login);
            var cookie = Cookie.get('username');
                console.log(cookie);
            if(cookie){
                var html = `<a href="html/login.html">${cookie}&nbsp;&nbsp;欢迎光临央广购物</a>
                        <a href="" class="loginout">退出</a>`;
                $('.login').html(html);
                $('.top-right').css('width','550px');
                $('.loginout').click(function(){
                    $('.login').html(_login);
                    location.href='../index.html';
                });
            }

            
});