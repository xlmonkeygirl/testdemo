/* 
* @Author: Marte
* @Date:   2018-08-02 20:42:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-15 14:58:43
*/


//生成表格，r行数，c列数
function createTable(r,c){
                var content = '<table ><tbody>';
                for(var _r=1;_r<=r;_r++){
                    content += '<tr>';
                    for(var _c=1;_c<=c;_c++){
                        content += '<td>单元格</td>';
                    }
                    content += '</tr>'
                }
                content += '</tbody></table>';
                return content;
            }

//计算任意数的阶乘 n任意整数
function factorial(n){
    if(n<=1){
        return 1;
    }
    return n*factorial(n-1);
}

//生成随机颜色，返回rgb(r,g,b)；
function randomColor(num){
    if(num===16){
        var color = "#";
        var num = '123456789abcdef';
        for(var i=1;i<=6;i++){
            var number = parseInt(Math.random()*num.length);
            color += num.substr(number,1);
        }
    }else{
            var ranColor = '';
            var r = parseInt(Math.random()*256);
            var g = parseInt(Math.random()*256);
            var b = parseInt(Math.random()*256);
            ranColor = 'rgb('+ r + ',' + g + ',' + b + ')';
        }
               
    return ranColor;
}


//生成任意范围的随机整数，min最小值，max最大值，返回值是number
function randomNumber(min,max){
            return parseInt(Math.random()*(max - min + 1)) + min;
        }

//生成显示当前时间的函数
function showTime(){
        var now = new Date();
        var year = now.getFullYear();
        var mon = now.getMonth() + 1;//月份是从0-11，所以加1
        var date = now.getDate();
        var day = now.getDay();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var arr = '天一二三四五六'.split('');
        var nowtime = year + '年 ' + mon + '月 ' + date + '日 '+hour+':'+min+':'+sec+' 星期' + arr[day];
        return nowtime;
        }



//声明一个对象，放几个函数
var Element = {
    //对象方法
    
    //过滤非元素节点，返回只包含元素节点的数组
    get:function(nodes){
        //声明一个数组用来存放结果
        var res = [];
        //遍历数组，判断每个节点是否是元素节点，是的话，将该节点存放到新的数组中
        for(var i=1;i<nodes.length;i++){
            if(nodes[i].nodeType === 1){
                res.push(nodes[i]);
            }
        }
        return res;
    },
    //得到ele下面所有的子元素
    children:function(ele){
        //声明一个空数组用来存放结果
        // var res = [];

        // //使用遍历数组判断的方法
        // for(var i=1;i<ele.childNodes.length;i++){
        //     if(ele.childNodes[i].nodeType === 1){
        //         res.push(ele.childNodes[i]);
        //     }
        // }
        // return res;
        // 
        // 使用函数调用的方法  谁调用get谁是this，在html页面上是Element调用，this就是Element
        return this.get(ele.childNodes);
    },

    //过滤文本节点，得到前一个元素节点
    prev:function(ele){
        var res = ele.previousSibling;
        if(res === null || res.nodeType === 1){
            return res;
        }
        return this.prev(res);
    },
    //得到后一个元素节点
    next:function(ele){
        var res = ele.nextSibling;
        if(res === null || ele.nextSibling === 1){
            return res;
        }
        return this.next(res);
    }
}

//获取元素的样式，兼容IE8-
function getCss(ele,attr){
    //不能判断是什么版本的浏览器
    //判断浏览器支持哪种获取样式的方式
    if(window.getComputedStyle){
        //标准浏览器
        return getComputedStyle(ele)[attr];
    }else if(ele.currentStyle){
        //IE6、7、8浏览器
        return ele.currentStyle[attr];
    }else{
        //都不支持
        return ele.style[attr]; 
    }
}



//cookie操作
var Cookie ={
    /**
     * 设置cookie
     * @param {String} name   [cookie名称]
     * @param {String} value  [cookie值]
     * @param {[Object]} params [可选参数，是一个对象]
        *expires    {Date}  有效期
        *path       {String}   文件保存路径
        *domain     {String}    域名
        *secure     {boolean}   安全      
     */
    set:function(name,value,params){
        //必填
        var str = name + '=' + value;

        //判断是否有其他参数
        if(params){
            //有效期
            if(params.expires){
                str += ';expires=' +params.expires.toUTCString();
            }
            //保存路径
            if(params.path){
                str += ';path=' + params.path;
            }

            //域名
            if(params.domain){
                str += ';domain=' + params.domain;
            }

            //安全性
            if(params.secure){
                str += ';secure';
            }
        }
        //写入cookie
        document.cookie = str;
    },

/**
 * 获取name对应的cookie值
 * @param  {String} name cookie名
 * @return {String}      根据cookie获取相应的值
 */
    get:function(name){
        var allcookies = document.cookie;
        var res = '';
        allcookies = allcookies.split('; ');
        allcookies.forEach(function(item){
            var arr = item.split('=');
            if(arr[0]== name){
                res = arr[1];
            }
        });
        return res;
    },

/**
 * 删除cookie
 * @param  {String} name cookie名
 */
    remove:function(name){
        var now = new date;
        now.setDate(now.getDate()-1);
        // document.cookie = name + '=null;expires=' + now.toUTCString();
        this.set(name,'null',{expires:now});
    }
}
//Cookie.set('password','123',{expires:date,})


//动画
/**
 * [设置元素动画效果]
 * @ele  {[type]} ele        [元素名称]
 * @param  {[type]} {attr     [description]
 * @param  {[type]} options    [description]
 * @param  {[type]} callback} [description]
 * @return {[type]}            [description]
 */

function animate(ele,options,callback){//undefined
    // target,attr
    // 先获取定时器数量
    var timerLen = 0;
    for(var key in options){
        timerLen++;

        (function(attr){
            var timerName = attr + 'Timer';

            // 获取目标值
            var target = options[attr];

            clearInterval(ele[timerName]);
            
            ele[timerName] = setInterval(function(){
                var current = getCss(ele,attr);//100px,16px,0.5,45deg...

                // 提取单位
                var unit = current.match(/[a-z]+$/);//

                // 避免报错
                if(unit===null){
                    unit = '';
                }else{
                    unit = unit[0];
                }

                // 提取值
                current = parseFloat(current);

                // 计算缓冲速度
                // 避免速度过小，同时避免速度为0
                var speed = (target-current)/10;

                if(attr === 'opacity'){
                    // 避免小数位过多
                    current = current.toFixed(2)*1;

                    if( speed<0 && speed>-0.01){
                        speed = -0.01;
                    }

                    if( speed>0 && speed<0.01){
                        speed = 0.01;
                    }
                    // console.log(speed)
                    // speed = speed>0 ? 0.01 : -0.01;
                }else{
                    speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
                }

                var val = current + speed;

                // console.log(val);

                // 到达目标值
                // 停止定时器
                if(val === target){
                    clearInterval(ele[timerName]);

                    val = target;

                    // 每完成一个动画，数量减1
                    timerLen--;

                    // 当定时器为最后一个，且有回调函数时，执行回调函数
                    if(timerLen===0 && typeof callback === 'function'){
                        callback();
                    }
                }


                ele.style[attr] = val + unit;
            },30);

        })(key);
    }
}
