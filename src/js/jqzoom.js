/*详情页图片放大镜*/
(function ($) {
    $.fn.imagezoom = function (options) {
        var settings = {
            xzoom: 443,
            yzoom: 443,
            offset:0,
            position: "BTR",
            preload: 1
        };
        if (options) {
            $.extend(settings, options);
        }

        var noalt = '';
        var self = this;

        $(this).bind("mouseenter", function (ev) {
            var imageLeft = $(this).offset().left; //元素左边距
            var imageTop = $(this).offset().top; //元素顶边距
            var imageWidth = $(this).get(0).offsetWidth; //图片宽度
            var imageHeight = $(this).get(0).offsetHeight; //图片高度
            var boxLeft = $(this).parent().offset().left; //父框左边距
            var boxTop = $(this).parent().offset().top; //父框顶边距
            var boxWidth = $(this).parent().width(); //父框宽度
            var boxHeight = $(this).parent().height(); //父框高度
            noalt = $(this).attr("alt"); //图片标题
            var bigimage = $(this).attr("rel"); //大图地址
            $(this).attr("alt", ''); //清空图片alt
            if ($("div.zoomDiv").get().length == 0) {
                $(document.body).append("<div class='zoomDiv'><img class='bigimg' src='" + bigimage + "'/></div><div class='zoomMask'><a href='javascript:;' style='display:block;width:100%;height:100%;'></a></div>"); //放大镜框及遮罩
            }
            if (settings.position == "BTR") {
                //如果超过了屏幕宽度 将放大镜放在右边
                if (boxLeft + boxWidth + settings.offset + settings.xzoom > screen.width) {
                    leftpos = boxLeft - settings.offset - settings.xzoom;
                } else {
                    leftpos = boxLeft + boxWidth + settings.offset;
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {
                    leftpos = imageLeft + imageWidth + settings.offset;
                }
            }
            $("div.zoomDiv").css({ top: boxTop, left: leftpos });
            $("div.zoomDiv").width(settings.xzoom);
            $("div.zoomDiv").height(settings.yzoom);
            $("div.zoomDiv").show();

            $(this).css('cursor', 'move');

            $(document.body).mousemove(function (e) {
                mouse = new MouseEvent(e);
                if (mouse.x < imageLeft || mouse.x > imageLeft + imageWidth || mouse.y < imageTop || mouse.y > imageTop + imageHeight) {
                    mouseOutImage();
                    return;
                }

                var bigwidth = $(".bigimg").get(0).offsetWidth;
                var bigheight = $(".bigimg").get(0).offsetHeight;

                var scaley = 'x';
                var scalex = 'y';

                //设置遮罩层尺寸
                if (isNaN(scalex) | isNaN(scaley)) {
                    var scalex = (bigwidth / imageWidth);
                    var scaley = (bigheight / imageHeight);
                    $("div.zoomMask").width((settings.xzoom) / scalex);
                    $("div.zoomMask").height((settings.yzoom) / scaley);
                    $("div.zoomMask").css('visibility', 'visible');
                }

                xpos = mouse.x - $("div.zoomMask").width() / 2;
                ypos = mouse.y - $("div.zoomMask").height() / 2;

                xposs = mouse.x - $("div.zoomMask").width() / 2 - imageLeft;
                yposs = mouse.y - $("div.zoomMask").height() / 2 - imageTop;

                xpos = (mouse.x - $("div.zoomMask").width() / 2 < imageLeft) ? imageLeft : (mouse.x + $("div.zoomMask").width() / 2 > imageWidth + imageLeft) ? (imageWidth + imageLeft - $("div.zoomMask").width()) : xpos;
                ypos = (mouse.y - $("div.zoomMask").height() / 2 < imageTop) ? imageTop : (mouse.y + $("div.zoomMask").height() / 2 > imageHeight + imageTop) ? (imageHeight + imageTop - $("div.zoomMask").height()) : ypos;


                $("div.zoomMask").css({ top: ypos, left: xpos });
                $("div.zoomDiv").get(0).scrollLeft = xposs * scalex;
                $("div.zoomDiv").get(0).scrollTop = yposs * scaley;
            });
        });
        function mouseOutImage() {
            $(self).attr("alt", noalt);
            $(document.body).unbind("mousemove");
            $("div.zoomMask").remove();
            $("div.zoomDiv").remove();
        }

        //预加载
        count = 0;
        if (settings.preload) {
            $('body').append("<div style='display:none;' class='jqPreload" + count + "'></div>");

            $(this).each(function () {

                var imagetopreload = $(this).attr("rel");

                var content = jQuery('div.jqPreload' + count + '').html();

                jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');

            });
        }
    }

})(jQuery);
function MouseEvent(e) {
    this.x = e.pageX;
    this.y = e.pageY;
}

//以下代码实现小图左右的移动效果
ph$ = {
	bindEvt : function() {
		var o = {};
		o.btn_sell_l = $("#pageLeft");
		
		if (o.btn_sell_l.length > 0) {
			o.btn_sell_l.bind("click", function() {
				ph$.scrollLveSell('bottom');
			});
		}
		o.btn_sell_r = $("#pageRight");
		if (o.btn_sell_r.length > 0) {
			o.btn_sell_r.bind("click", function() {
				ph$.scrollLveSell('top');
			});
		}

	},
	scrollLveSell : function(o) {
		if (this.cfg.lv_flag == 0)
			return false;
		var tar = $("#sell_order");
		var tar2 = $("#sell_order_t");
		tar.stop();
		tar2.stop();
		var max_num = $("#sell_order>li").length;
		var height = 220; //每次移动的大小,包含内边距和外边距
		var top = 0;
		var pos = tar.position();
		//alert(pos.left + "|" + width);
		if (o == "top") {
			if (Math.abs(pos.top)+height > height*(max_num-2)) {
				return false;
			}
			top = pos.top - height;
		} else if (o == "bottom") {
			if (pos.top >= 0) {
				return false;
			}
			top = pos.top + height;
		}
		top = top + "px";
		//alert(left);
		ph$.cfg.lv_flag = 0;
		tar.animate({
			top: top
		}, 220);
		tar2.animate({
			top: top
		}, 220, function() {
			ph$.cfg.lv_flag = 1;
			//alert(pos.left);
		});
	},
	cfg : {

	},
	init : function() {
		this.bindEvt();
	}
};

$(function($) {
	ph$.init();
//****点击小图展示大图和内容 begin***
//小于4时不显示左右的箭头
var num=$("#sell_order li").length;
if(num<3){
	$("#pageLeft").css("display","none")
	$("#pageRight").css("display","none")
	}
	else{
		$("#pageLeft").css("display","block")
	   $("#pageRight").css("display","block")
		}
		
var firstBig=$(".sell_order li:first img").attr("dataSrc");
var firstSmall=$(".sell_order li:first img").attr("rel");

$(".big_pic img").attr("src",firstBig)
$(".small_pic img").attr("src",firstSmall)
$(".sell_order li:first").addClass("hover")


$(".sell_order li").hover(function(){
  var imgBig=$(this).find("img").attr("src");
  $(".bigpic img").attr("rel",imgBig)
  $(".bigpic img").attr("src",imgBig)
 
  $(".sell_order li").removeClass("hover")
  $(this).addClass("hover")
});
//****点击小图展示大图和内容 end***		
});

$(function($) {
	$(".jqzoom").imagezoom();
	$(".jqzoom1").imagezoom();
	$(".jqzoom2").imagezoom();
	$(".jqzoom3").imagezoom();
	$(".jqzoom4").imagezoom();
	$(".jqzoom5").imagezoom();
	$(".jqzoom6").imagezoom();
})
