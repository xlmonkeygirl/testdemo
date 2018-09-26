$(function(){
    var goodslist;
    render();
    function render(){
        goodslist = Cookie.get('goodslist');//

        if(goodslist === ''){
                goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
        }

        console.log(goodslist);
    }
    goodsRender(goodslist);
    //生成购物车列表
    // var html = '';
    // for(var i=0;i<goodslist.length;i++){
    //     var singlegoodsprice = (goodslist[i].price.slice(1))*(goodslist[i].qty).toFixed(2);
    //     html += `
    //         <div class="single-goods clearfix" guid="${goodslist[i].guid}">
    //             <div class="checkgoods">
    //                 <span><input type="checkbox" class="btnchoice" /></span>
    //             </div>
    //             <div class="goods-img">
    //                 <img src="${goodslist[i].imgurl}"/>
    //             </div>
    //             <div class="goods-main">
    //                 <div class="spu-name">${goodslist[i].name}</div>
    //                 <div class="panel-remove btndel">
    //                 删除该商品<span>&times;</span>
    //                 </div>
               
    //             <table class="spu-singles">
    //                 <tr>
    //                     <td>&nbsp;</td>
    //                     <td>规格：默认</td>
    //                     <td>
    //                         <span class="btn-reduce">-</span>
    //                         <input class="single-qty" type="number" value="${goodslist[i].qty}" />
    //                         <span class="btn-add">+</span>
    //                     </td>
    //                     <td></td>
    //                     <td class="single-price">${goodslist[i].price}</td>
    //                     <td></td>
    //                     <td class="single-goods-price">${singlegoodsprice}</td>
    //                 </tr>
    //             </table>
    //             </div>
    //         </div>
    //     `;
    //     console.log(goodslist[i].qty);
    // }
    // $('.mygoods').html(html);

    //购物车数量加减
    $('.btn-reduce').click(function(){
        var qty = $(this).next().val();
        qty --;
        if(qty<=1){
            qty = 1;
        }
        $(this).next().val(qty);
        var single_price = $(this).parent().next().next().text();
        single_price = single_price.slice(1);
        var single_total = single_price * qty;
        $(this).parent().next().next().next().next().text('￥'+single_total);
    });
    $('.btn-add').click(function(){
        var qty = $(this).prev().val();
        qty ++;
        
        $(this).prev().val(qty);
        var single_price = $(this).parent().next().next().text();
        single_price = single_price.slice(1);
        var single_total = single_price * qty;
        $(this).parent().next().next().next().next().text('￥'+single_total);
    });

    //全选
    $idx = true;
    $('.allchoice').click(function() {
        if($idx){
            $('.allchoice').prop('checked','true');
            $('input').prop('checked','checked');
            var arr = checkednum();
            goodsnum(arr);
            totalMoney(arr);
                        
        }else{
                $('.allchoice').removeAttr('checked');
                $('input').removeAttr('checked');
                var arr = checkednum();
                goodsnum(arr);
                totalMoney(arr);
            }
        $idx = !$idx;
    });

    
     //选中单件商品
                $('.btnchoice').click(function(){
                    if($(this).attr('checked')==='checked'){
                        $(this).removeAttr('checked');
                        $('.allchoice').removeAttr('checked');
                    }else{   
                        $(this).prop('checked','checked');
                        $(this).attr('checked','checked');

                    }
                    var arr = checkednum();
                    if(arr.length === $('.btnchoice').size()){
                        $('.allchoice').prop('checked','true');
                    }
                    var num = goodsnum(arr);
                    goodsnum(arr);
                    totalMoney(arr);

                });
                // 删除单行
                $('.btndel').click(function(){
                    var arr = checkednum();
                    var img = confirm('确定删除该商品吗？');
                    if(img){
                        $(this).parent().parent().remove();
                    }
                    update(arr);
                    var arr = checkednum();
                    goodsnum(arr);
                    totalMoney(arr);


                    var currentLi = $(this).parent().parent();

                    var guid = currentLi.attr('guid');

                    // 找出与guid相同的商品
                    for(var i=0;i<goodslist.length;i++){
                        if(goodslist[i].guid === guid){
                            // 从数组中删除
                            goodslist.splice(i,1);
                            break;
                        }
                    }

                    // 重写cookie
                    Cookie.set('goodslist',JSON.stringify(goodslist));
                    });

                //删除选中的商品
                $('.btnDelAll').click(function(){
                    var arr = checkednum();
                    for(var i=arr.length-1;i>=0;i--){
                        $('.btnchoice').eq(arr[i]).parent().parent().parent().remove();
                    }
                    update(arr);
                    totalMoney(arr);
                    var currentLi = $(this).parent().parent();

                    var guid = currentLi.attr('guid');

                    // 找出与guid相同的商品
                    for(var i=0;i<goodslist.length;i++){
                        if(goodslist[i].guid === guid){
                            // 从数组中删除
                            goodslist.splice(i,1);
                            break;
                        }
                    }

                    // 重写cookie
                    Cookie.set('goodslist',JSON.stringify(goodslist));
                });
    //
    
                //勾选的数量
                function checkednum(){
                    var arr = [];
                    for(var i=0;i<$('.btnchoice').size();i++){
                        if($('.btnchoice').eq(i).prop('checked')){
                            arr.push(i);
                        }
                    }
                    return arr;
                }

                //删除全部商品后，页面清空
                function update(arr){
                    if($('.btnchoice').size()===0){
                        $('.btnDelAll').parent().remove();
                    }
                }

                //商品总数
                function goodsnum(arr){
                    var total = 0;
                    for(var i=0;i<arr.length;i++){
                        total += parseInt($('.single-qty').val());
                    }
                    // return total;
                    $('.goodsnum').html('已选择'+total+'件商品');
                }
                //商品总价
                function totalMoney(arr){
                    var total = 0;
                    for(var i=0;i<arr.length;i++){
                        var price = $('.single-goods-price').eq(arr[i]).text();
                        console.log(price);
                        price = price*1;
                        total += price;
                    }
                    $('.total').html('￥'+total.toFixed(2));
                }
        // 封装生成页面的函数
        function goodsRender(goodslist){
            var html = '';
            for(var i=0;i<goodslist.length;i++){
                var singlegoodsprice = (goodslist[i].price.slice(1))*(goodslist[i].qty).toFixed(2);
                html += `
                    <div class="single-goods clearfix" guid="${goodslist[i].guid}">
                        <div class="checkgoods">
                            <span><input type="checkbox" class="btnchoice" /></span>
                        </div>
                        <div class="goods-img">
                            <img src="${goodslist[i].imgurl}"/>
                        </div>
                        <div class="goods-main">
                            <div class="spu-name">${goodslist[i].name}</div>
                            <div class="panel-remove btndel">
                            删除该商品<span>&times;</span>
                            </div>
                       
                        <table class="spu-singles">
                            <tr>
                                <td>&nbsp;</td>
                                <td>规格：默认</td>
                                <td>
                                    <span class="btn-reduce">-</span>
                                    <input class="single-qty" type="number" value="${goodslist[i].qty}" />
                                    <span class="btn-add">+</span>
                                </td>
                                <td></td>
                                <td class="single-price">${goodslist[i].price}</td>
                                <td></td>
                                <td class="single-goods-price">${singlegoodsprice}</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                `;
                console.log(goodslist[i].qty);
            }
            $('.mygoods').html(html);
        }

});