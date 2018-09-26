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

        //生成商品列表
        $.ajax({
            type:'get',
            url:'../api/goodslist.php',
            async:false,
            success:function(data){
                
                var data = JSON.parse(data);
                // console.log(data);
                var goodslisthtml = data.map(function(item){
                    return `<li idx="${item.id}">
                                <div class="goods-pic">
                                    <img src="${item.imgurl}"/>
                                </div>
                                <div class="goods-info">
                                    <p class="goods-price">￥&nbsp;${item.price}</p>
                                    <p class="goods-title">${item.title}</p>
                                    <p class="goods-seller">${item.seller}</p>
                                    <div class="hover-block">
                                        <p>成交量：${item.trading}</p>
                                        <p>好评率：${item.goodsCommentPercent}</p>
                                        <p>用户评论：${item.commentCount}条</p>
                                    </div>
                                </div>
                                <div class="goods-tools">
                                    <span class="goods-cart"><i ></i>加入购物车</span>
                                    <span class="goods-like"><i></i>收藏</span>
                                </div>
                            </li>`
                }).join(' ');
                // console.log(goodslisthtml);
                // var goodslisthtml = createGoodslist(data);
                $('.goodslist ul').html(goodslisthtml);
            }
        });
    }
        //三级菜单
        $('.menu').delegate('li', 'mouseenter', function() {

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
                    console.log(string);
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
                                console.log(htmldl);
                        html += htmldl;
                    }
                    // console.log(html);
                    $('.categorycontent').html(html);
                }
            });
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
        $('.allcategory').mouseenter(function(){
            $('.categorymenu').css('display','block');
        });
        $('.allcategory').mouseleave(function(){
            $('.categorymenu').css('display','none');
        });
    

    //登录状态转换
    var _login = `<a href="../html/login.html">您好，请登录</a>
                    <a href="../html/Reg.html">免费注册</a>`;
    $('.login').html(_login);
    var cookie = Cookie.get('username');
    console.log(cookie);
    if(cookie){
        var html = `<a href="../html/login.html">${cookie}&nbsp;&nbsp;欢迎光临央广购物</a>
                    <a href="" class="loginout">退出</a>`;
        $('.login').html(html);
        $('.top-right').css('width','550px');
        $('.loginout').click(function(){
            $('.login').html(_login);
            location.href='../index.html';
        });
    }

    //吸顶盒
    window.onscroll = function(){
        if(window.scrollY>200){
            $('.xd-box-wrap').addClass('fix');
        }else{
            $('.xd-box-wrap').removeClass('fix');
        }
    };

    // 加购物车
    var goodslist = Cookie.get('goodslist');//[{},{}], ''
    if(goodslist === ''){
        goodslist = [];
    }else{
        goodslist = JSON.parse(goodslist);
    }
    // console.log(goodslist);
    $('.goodslist').delegate('.goods-cart', 'click', function(event) {
        var currentli = $(this).parent().parent();
        var guid = currentli.attr('idx');
        for(var i=0;i<goodslist.length;i++){
            if(goodslist[i].guid == guid){
                goodslist[i].qty++;
                break;
            }
        }
        if(i==goodslist.length){
            var mygoods = {
                guid:guid,
                imgurl:currentli.children('.goods-pic').children('img').attr('src'),
                name:currentli.children('.goods-info').children('p').eq(1).text(),
                price:currentli.children('.goods-info').children('p').eq(0).text(),
                seller:currentli.children('.goods-info').children('p').eq(2).html(),
                qty:1
            }
            goodslist.push(mygoods);
        }
        Cookie.set('goodslist',JSON.stringify(goodslist),{'path':'/'});
        $('.back').css('display','block');
    });

    //弹窗
    $('.btn-close').click(function(){
        $('.back').css('display','none');
    });
    $('.btn-cart').click(function(){
        location.href = '../html/shoppingcart.html';
    });
    $('.btn-shopping').click(function(){
        $('.back').css('display','none');
    });



    //购物车效果
    $('.my-cart').mouseenter(function(){
        $('.shoppingcar-list').css('display','block');
        $(this).css({'background':'#fff','color':'#333','border-width':'1px 1px 0px 1px','border':'solid #ff6d02'});
    });
    $('.my-cart').mouseleave(function(){
        $('.shoppingcar-list').css('display','none');
        $(this).css({'background':'#ff6d02','color':'#fff','border':'none'});
    });


    // 商品排序
    var priceDesc = false;
    $('.sort-price').click(function(){
        priceDesc = !priceDesc;
        priceDesc = priceDesc? 'desc' : '';
        console.log(priceDesc);
        $.ajax({
            type:'get',
            url:'../api/goodslist.php',
            async:true,
            data:{
                'sort':'price',
                'desc':priceDesc
            },
            success:function(data){
                var data = JSON.parse(data);
                console.log(data);
                var goodslisthtml = createGoodslist(data);
                $('.goodslist ul').html(goodslisthtml);
            }
        });
    });
    $('.sort-trade').click(function(){
        priceDesc = !priceDesc;
        priceDesc = priceDesc? 'desc' : '';
        $.ajax({
            type:'get',
            url:'../api/goodslist.php',
            async:true,
            data:{
                'sort':'trading',
                'desc':priceDesc
            },
            success:function(data){
                var data = JSON.parse(data);
                console.log(data);
                var goodslisthtml = createGoodslist(data);
                $('.goodslist ul').html(goodslisthtml);
            }
        });
    });
    $('.sort-comment').click(function(){
        priceDesc = !priceDesc;
        priceDesc = priceDesc? 'desc' : '';
        $.ajax({
            type:'get',
            url:'../api/goodslist.php',
            async:true,
            data:{
                'sort':'commentCount',
                'desc':priceDesc
            },
            success:function(data){
                var data = JSON.parse(data);
                console.log(data);
                var goodslisthtml = createGoodslist(data);
                $('.goodslist ul').html(goodslisthtml);
            }
        });
    });
    //显示隐藏商品评论、交易量
    $('.goods-price').mouseenter(function(){
        $(this).siblings('.hover-block').css('display','block');
    });
    $('.hover-block').mouseenter(function(){
        $(this).css('display','block');
    });
    $('.goods-price').mouseleave(function(){
        $(this).siblings('.hover-block').css('display','none');
    });
    // 封装生成商品列表的函数
    function createGoodslist(data){
        var goodslisthtml = data.map(function(item){
                    return `<li idx="${item.id}">
                                <div class="goods-pic">
                                    <img src="${item.imgurl}"/>
                                </div>
                                <div class="goods-info">
                                    <p class="goods-price">￥&nbsp;${item.price}</p>
                                    <p class="goods-title">${item.title}</p>
                                    <p class="goods-seller">${item.seller}</p>
                                    <div class="hover-block">
                                        <p>成交量：${item.trading}</p>
                                        <p>好评率：${item.goodsCommentPercent}</p>
                                        <p>用户评论：${item.commentCount}条</p>
                                    </div>
                                </div>
                                <div class="goods-tools">
                                    <span class="goods-cart"><i ></i>加入购物车</span>
                                    <span class="goods-like"><i></i>收藏</span>
                                </div>
                            </li>`
                }).join(' ');
        return goodslisthtml;
    }
    //点击商品进入商品详情页
    $('.goodslist').delegate('.goods-pic', 'click', function() {
        var currentli = $(this).parent();
        console.log(currentli);
        var goodsinfo = [];
        var mygoodsinfo = {
            guid:currentli.attr('idx'),
            imgurl:currentli.children('.goods-pic').children('img').attr('src'),
            name:currentli.children('.goods-info').children('p').eq(1).text(),
            price:currentli.children('.goods-info').children('p').eq(0).text(),
            seller:currentli.children('.goods-info').children('p').eq(2).html()
        }
        console.log(mygoodsinfo);
        goodsinfo.push(mygoodsinfo);
        Cookie.set('goodsinfo',JSON.stringify(mygoodsinfo));
        location.href = '../html/goodsdetail.html';
    });
});
