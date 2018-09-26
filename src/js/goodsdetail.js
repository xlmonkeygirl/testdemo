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
    } 

    // 放大镜
    $('.controller ul li').mouseenter(function(){
        var src = $(this).children('img').eq(0).attr('src');
        $('.goodspicture img').attr('src',src);
    });
    var scale = 2;
    $('.goodspicture').mouseenter(function(){
        var src = $(this).children('img').eq(0).attr('src');
        $('.img-out').children('img').eq(0).attr('src',src);
        $('.img-out').css('display','block');
        $('.magic').css({'display':'block','opacity':'0.8'});
    });
    $('.goodspicture').mouseleave(function(){
        $('.img-out').css('display','none');
        $('.magic').css('display','none');
    });
    $('.goodspicture').mousemove(function(e){
        var x = e.clientX - $('.magic').innerWidth()/2;
        var y = e.clientY - $('.magic').innerHeight();
        if(x<=0){
            x = 0;
        }
        if(y<=0){
            y = 0;
        }
        if(x >= $('.goodspicture').innerWidth() - $('.magic').innerWidth() ){
            x = $('.goodspicture').innerWidth() - $('.magic').innerWidth();        //右侧边界判断
        }
        if(y >= $('.goodspicture').innerHeight() - $('.magic').innerHeight() ){
            y = $('.goodspicture').innerHeight() - $('.magic').innerHeight() ;       //底部边界判断
        console.log(x,y);
        }
        e.stopPropagation();
        $('.magic').css('left',x+'px');
        $('.magic').css('top',y+'px');
        $('.img-out img').css('left',-x*scale + "px") ;    //图片默认位置为0 0左上角位置 需要反向才能两者相对显示
        $('.img-out img').css('top',-y*scale + "px");
    });

    var cookie = Cookie.get('goodsinfo');

    if(cookie==''){
        cookie = [];
    }else{
        cookie = JSON.parse(cookie);
    }
    console.log(cookie);
    // 根据数据生成商品详情页面
    $('.goodspicture img').attr('src',cookie.imgurl);
    $('.goods-name').text(cookie.name+cookie.guid);
    $('.goods-price span').html(cookie.price);
    // console.log(cookie.price);


    //商品数量加减
    $('.add').click(function(e){
        e.preventDefault();
        var qty = $('.quality input').val();
        qty++;
        $('.quality input').val(qty);
    });
    $('.reduce').click(function(){
        var qty = $('.quality input').val();
        qty--;
        if(qty<=1){
            qty = 1;
        }
        $('.quality input').val(qty);
    });

    //弹窗展示隐藏
    $('.btn-addcart').click(function(){
        $('.back').css('display','block');

    });
    $('.btn-close').click(function(){
        $('.back').css('display','none');
    });
    $('.btn-cart').click(function(){
        location.href = '../html/shoppingcart.html';
    });
    $('.btn-shopping').click(function(){
        $('.back').css('display','none');
    });


     // 加购物车
    var goodslist = Cookie.get('goodslist');//[{},{}], ''
    if(goodslist === ''){
        goodslist = [];
    }else{
        goodslist = JSON.parse(goodslist);
    }
    $('.btn-addcart').click(function(){
        var goodsinfo = Cookie.get('goodsinfo');
        goodsinfo = JSON.parse(goodsinfo);
        console.log(goodsinfo);
        var goodsinfo_guid = goodsinfo.guid;
        for(var i=0;i<goodslist.length;i++){
            if(goodslist[i].guid == goodsinfo_guid){
                goodslist[i].qty = goodslist[i].qty*1 + $('.quality input').val()*1;
                break;
            }
        }
        if(i==goodslist.length){
            // var mygoods = {
            //     guid:goodsinfo_guid,
            //     imgurl:goodsinfo.imgurl,
            //     name:goodsinfo.name,
            //     price:goodsinfo.price,
            //     qty:$('.quality input').val()
            // }
            goodsinfo.qty = $('.quality input').val();
            console.log(goodsinfo.qty);
            goodslist.push(goodsinfo);
            // goodslist.push(mygoods);
        }
        Cookie.set('goodslist',JSON.stringify(goodslist),{'path':'/'});
        $('.back').css('display','block');
    });
});