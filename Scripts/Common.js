/// <reference path="jquery-1.8.0.min.js" />
/*
* DIV或元素居中
* @return
*/
jQuery.fn.mCenterDiv = function () {
    this.css("position", "absolute");
    this.css("border", "1px solid #ccc");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    this.show(100);
    return this;
};

/*
* 替换字符串中所有符合的字符
* @param ASource 源字符串
* @param AFindText 待替换字符
* @param ARepText 替换后字符
* @return
*/
jQuery.mReplaceAll = function (ASource, AFindText, ARepText) {
    var raRegExp = new RegExp(AFindText, "g");
    return ASource.replace(raRegExp, ARepText);
};

/*
* 判断object是否空，未定义或null
* @param object 
* @return
*/
jQuery.mIsNull = function (obj) {
    if (obj == "" || typeof (obj) == "undefined" || obj == null) {
        return true;
    }
    else {
        return false;
    }
};

/*
* 获取URL参数
* @param name 参数
* @return
*/
jQuery.mGetUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};

/*
* 乘法函数，用来得到精确的乘法结果
* @param arg1 参数1
* @param arg2 参数2
* @return
*/
jQuery.mAccMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

/*
* 获取随机数
* @param x 下限
* @param y 上限
* @return
*/
jQuery.mGetRandom = function (x, y) {
    return parseInt(Math.random() * (y - x + 1) + x);

};

/*
* 将数值四舍五入(保留2位小数)后格式化成金额形式
* @param num 数值(Number或者String)
* @return 金额格式的字符串,如'1,234,567.45'
*/
jQuery.mFormatCurrency = function (num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

/*
* 正则验证
* @param s 验证字符串
* @param type 验证类型 money,china,mobile等 
* @return
*/
jQuery.mCheck = function (s, type) {
    var objbool = false;
    var objexp = "";
    switch (type) {
        case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位
            objexp = "^[0-9]+[\.][0-9]{0,3}$";
            break;
        case 'numletter_': //英文字母和数字和下划线组成   
            objexp = "^[0-9a-zA-Z\_]+$";
            break;
        case 'numletter': //英文字母和数字组成
            objexp = "^[0-9a-zA-Z]+$";
            break;
        case 'numletterchina': //汉字、字母、数字组成 
            objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
            break;
        case 'email': //邮件地址格式 
            objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
            break;
        case 'tel': //固话格式 
            objexp = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
            break;
        case 'mobile': //手机号码 
            objexp = "^(13[0-9]|15[0-9]|18[0-9])([0-9]{8})$";
            break;
        case 'decimal': //浮点数 
            objexp = "^[0-9]+([.][0-9]+)?$";
            break;
        case 'url': //网址 
            objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";
            break;
        case 'date': //日期 YYYY-MM-DD格式
            objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
            break;
        case 'int': //整数 
            objexp = "^[0-9]*[1-9][0-9]*$";
            break;
        case 'int+': //正整数包含0
            objexp = "^\\d+$";
            break;
        case 'int-': //负整数包含0
            objexp = "^((-\\d+)|(0+))$";
            break;
        case 'china': //中文 
            objexp = /^[\u0391-\uFFE5]+$/;
            break;
    }
    var re = new RegExp(objexp);
    if (re.test(s)) {
        return true;
    }
    else {
        return false;
    }
};

/*
* 获取控件的值
* @param controlID 控件ID
* @param controltype 类型 如text radio
* @return
*/
jQuery.mGetValue = function (controlID, controltype) {
    var objValue = "";
    switch (controltype) {
        case 'text': //文本输入框
            objValue = $.trim($("#" + controlID + "").val()); //取值去左右空格
            break;
        case 'radio': //单选框
            objValue = $("input[name='" + controlID + "']:checked").val();
            break;
        case 'select': //下拉列表
            objValue = $("#" + controlID + "").val();
            break;
        case 'checkbox': //多选框
            $("input[name='" + controlID + "']:checked").each(function () {
                objValue += $(this).val() + ",";
            });
            objValue = objValue.substring(0, objValue.length - 1);
            break;
        default:
            break;
    }
    return objValue;
};

/*
* 设置控件的值
* @param controlID 控件ID
* @param controltype 类型 如text radio
* @param controlvalue 绑定值
* @return
*/
jQuery.mSetValue = function (controlID, controltype, controlvalue) {
    switch (controltype) {
        case 'text': //文本输入框  
            //$("#txtUserID").attr("value", '这是绑定内容'); //填充内容  
            //$("input[name='radio1'][value='上海']").attr("checked", true); //单选组radio：设置value='上海'的项目为当前选中项  
            //$("#select1").attr("value", '葡萄牙'); //下拉框select：设置value='中国'的项目为当前选中项  
            //$("input[name='checkbox1'][value='黑色'],[value='蓝色']").attr("checked", true); //多选框：设置多个值为当前选中项  
            $("#" + controlID + "").val(controlvalue); //填充内容  
            break;
        case 'radio': //单选框  
            $("input[name='" + controlID + "'][value='" + controlvalue + "']").prop("checked", true);
            break;
        case 'select': //下拉列表  
            $("#" + controlID + "").prop("value", controlvalue);
            break;
        case 'checkbox': //多选框  
            var arr = controlvalue.split(",");
            var obj = "input[name='" + controlID + "']";
            $(obj).prop("checked", false);
            $.each(arr, function (i, item) {
                obj += "[value='" + item + "'],";
            })
            obj = obj.substring(0, obj.length - 1);
            $(obj).prop("checked", true); //多选框：设置多个值为当前选中项  
            break;
        default:
            break;
    }
};

/*
* 兼容IE火狐等浏览器的自动跳转
* @param url 跳转网址
* @return
*/
jQuery.mAutoNav = function (url) {
    if ($.browser.msie) {
        var referLink = document.createElement('a');
        referLink.href = url;
        document.body.appendChild(referLink);
        referLink.click();
    } else {
        location.href = url;
    }
};

/*
* Table表格奇偶行设置颜色及移动鼠标行变色
* @param table 表格ID
* @return
*/
jQuery.mTableHover = function (table) {
    $("#" + table).each(function () {
        var o = $(this);
        //设置偶数行和奇数行颜色
        o.find("tr:even").css("background-color", "#EFF3FB");
        o.find("tr:odd").css("background-color", "#FFFFFF");
        //鼠标移动隔行变色hover用法关键
        o.find("tr:not(:first)").hover(function () {
            $(this).attr("bColor", $(this).css("background-color")).css("background-color", "#E0E0E0");
        }, function () {
            $(this).css("background-color", $(this).attr("bColor"));
        });
    });
};

/*
* gridview 隔行换色 鼠标滑过变色 多选
* c#获取选择值 Request.Form.Get("chkItem")
* @param objgridview ID
* @return
*/
jQuery.mGridview = function (objgridview) {
    var headcolor = { background: '#E0ECFF', color: '#333' };
    var normalcolor = { background: '#f7f6f3' };
    var altercolor = { background: '#EDF1F8' };
    var hovercolor = { background: '#89A5D1' };
    var selectcolor = { background: '#ACBFDF' };
    var nullcolor = {};
    //get obj id
    var gridviewId = "#" + objgridview;
    //even
    $(gridviewId + ">tbody tr:even").css(normalcolor);
    //first
    $(gridviewId + ">tbody tr:first").css(nullcolor).css(headcolor);
    //odd
    $(gridviewId + ">tbody tr:odd").css(altercolor);
    //hover
    $(gridviewId + ">tbody tr").click(function () {
        var cb = $(this).find("input:checkbox");
        var chf = typeof (cb.attr("checked")) == "undefined" ? true : false;
        cb.attr("checked", chf);
        var expr1 = gridviewId + ' >tbody >tr >td >input:checkbox:checked';
        var expr2 = gridviewId + ' >tbody >tr >td >input:checkbox';
        var selectAll = $(expr1).length == $(expr2).length;
        $('#chkAll').attr('checked', selectAll);
    }).hover(function () {
        $(this).css(hovercolor);
    }, function () {
        $(gridviewId + ">tbody tr:even").css(normalcolor);
        $(gridviewId + ">tbody tr:first").css(nullcolor).css(headcolor);
        $(gridviewId + ">tbody tr:odd").css(altercolor);
    });

    //all check
    $("#chkAll").click(function () {
        $(gridviewId + '>tbody >tr >td >input:checkbox:visible').attr('checked', this.checked);
    });
    //check status
    $(gridviewId + ' >tbody >tr >td >input:checkbox').click(function () {
        var cb = $(this);
        var chf = typeof (cb.attr("checked")) == "undefined" ? true : false;
        cb.attr("checked", chf);
        var expr1 = gridviewId + ' >tbody >tr >td >input:checkbox:checked';
        var expr2 = gridviewId + ' >tbody >tr >td >input:checkbox';
        var selectAll = $(expr1).length == $(expr2).length;
        $('#chkAll').attr('checked', selectAll);
    });
};

/*
* 屏幕居中显示处理进度
* @param info 显示文字
* @param type 方式 0遮罩 1不遮罩
* @param typepic 图片 0:load 1:ok 2:error
* @return
*/
jQuery.mMaskLoad = function (info, type, typepic) {
    var pic = "";
    switch (typepic) {
        case 0: // loading
            pic = "./Images/loading.gif";
            break;
        case 1: // ok
            pic = "./Images/right.png";
            break;
        case 2: // error
            pic = "./Images/error.png";
            break;
        default: //其他任何值时
            pic = "./Images/loading.gif";
            break;
    }
    if (type == 0) {
        $("<div class=\"datagrid-mask\"></div>").css(
        {
            display: "block",
            width: "100%",
            position: "absolute",
            left: "0",
            top: "0",
            opacity: "0.3",
            height: "100%",
            filter: "alpha(opacity=30)",
            background: "#ccc"
        }).appendTo("body");
    };
    $("<div class=\"datagrid-mask-msg\"></div>").css(
        {
            position: "absolute",
            top: "50%",
            padding: "12px 5px 10px 30px",
            width: "auto",
            height: "16px",
            border: "1px solid #D1D1D1",
            background: "#ffffff url('" + pic + "') no-repeat scroll 5px center",
            display: "block",
            left: ($(document.body).outerWidth(true) - 190) / 2,
            top: ($(window).height() - 45) / 2
        }).html(info).appendTo("body");
};

/*
* 屏幕居中隐藏处理进度
* @return
*/
jQuery.mMaskLoadClose = function () {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
};

/*
* 控件后创建SPAN作为TIP提示
* @param o 用this
* @param tip 提示文字
* @param typepic 图片 0:load 1:ok 2:error
* @return
*/
jQuery.mTip = function (o, tip, typepic) {
    var pic = "";
    switch (typepic) {
        case 0: // loading
            pic = "./Images/loading.gif";
            break;
        case 1: // ok
            pic = "./Images/right.png";
            break;
        case 2: // error
            pic = "./Images/error.png";
            break;
        default: //其他任何值时
            pic = "./Images/loading.gif";
            break;
    }
    var eTip = document.createElement("span");
    var objid = $(o).attr("id") + "_tipDiv";
    var value = $(o).val();
    //绝对路径  
    var x = $(o).offset().top;
    var y = $(o).offset().left;
    var w = $(o).width();
    var h = $(o).height();
    eTip.setAttribute("id", objid);
    try {
        document.body.appendChild(eTip);
    } catch (e) { }
    $("#" + objid).hide();
    $("#" + objid).css({
        top: x,
        left: y + w + 10,
        height: h,
        position: "absolute"
    });
    $("#" + objid).html("<img src=\"" + pic + "\" style=\"vertical-align:bottom;margin-right:5px;\">" + tip);
    $("#" + objid).show();
};

/**
* ajax post提交
* @param url
* @param param
* @param datat 为html,json,text
* @param callback 回调函数 function callBack(data)
* @return
*/
jQuery.mJqAjax = function (url, param, datat, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: param,
        dataType: datat,
        success: callback,
        error: function () { }
    });
};

//获取指定div下的控件的值，并组装成对象
jQuery.fn.mGetFormData = function (callback) {
    var obj = $(this).find("input,select,textarea");
    var data = {};
    var checkname = "";
    var radioname = "";
    $(obj).each(function (i, item) {
        var $type = item.type.toLowerCase();
        var $id = item.id;
        var $name = item.name;
        var localName = item.tagName.toLowerCase();

        if (localName == "input") {
            if ($type == "text" || $type == "email" || $type == "password") {
                data[$id] = $.mGetValue($id, "text");
            }
            if ($type == "checkbox") {
                if ($name == checkname) {
                    return true;
                }
                data[$name] = $.mGetValue($name, "checkbox");
                checkname = $name;
            }
            if ($type == "radio") {
                if ($name == radioname) {
                    return true;
                }
                data[$name] = $.mGetValue($name, "radio");
                radioname = $name
            }
        }
        if (localName == "select") {
            data[$id] = $.mGetValue($id, "select");
        }
        if (localName == "textarea") {
            data[$id] = $.mGetValue($id, "text");
        }

    })
    return data;
};

//设置指定div下的控件的值
jQuery.fn.mSetFormData = function (data) {
    var obj = $(this).find("input,select,textarea");
    var checkname = "";
    var radioname = "";
    $(obj).each(function (i, item) {
        var $type = item.type.toLowerCase();
        var $id = item.id;
        var $name = item.name;
        var localName = item.tagName.toLowerCase();
        if (localName == "input") {
            if ($type == "text" || $type == "email" || $type == "password") {
                $.mSetValue($id, "text", data[$id]);
            }
            if ($type == "checkbox") {
                if ($name == checkname) {
                    return true;
                }
                $.mSetValue($name, "checkbox", data[$name]);
                checkname = $name;
            }
            if ($type == "radio") {
                if ($name == radioname) {
                    return true;
                }
                $.mSetValue($name, "radio", data[$name]);
                radioname = $name;
            }
        }
        if (localName == "select") {
            $.mSetValue($id, "select", data[$id]);
        }
        if (localName == "textarea") {
            $.mSetValue($id, "text", data[$id]);
        }

    })
    return data;
};