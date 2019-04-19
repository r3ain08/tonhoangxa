/**
 * tabs
 * @author  lzf
 */
function tabs(tabTitle,tab_content,event){
	var index=$(tabTitle).children(".hover").index()
	$(tab_content).children().eq(index).show().siblings().hide();
	$(tabTitle).children().bind(event,function(){
		var index=$(this).index();
	  	$(this).addClass("hover").siblings().removeClass("hover"); 
		$(tab_content).children().eq(index).show().siblings().hide();
		return false;
	});
}

function open_inq_window(){
	$("#open_pro_inq_window,.pro_inq_mask").stop().fadeIn(500);
}

function open_inq_window_success(){
	$("#pro_inq_window_success,.pro_inq_mask").stop().fadeIn(500);
}


function close_inq_window(){
	$("#open_pro_inq_window").stop().fadeOut(500);
	$("#pro_inq_window_success").stop().fadeOut(500);
	$(".pro_inq_mask").stop().fadeOut(500);
}



$(function(){
//	$(".menu_dl dd").hover(function(){
//		$(".menu_dl dd.hover").addClass("active").removeClass('hover')
//		$(this).find(".menu_pro_down,.menu_down").stop().slideDown();
//		$(this).addClass("hover");
//
//	},function(){
//		$(this).removeClass("hover");
//		$(".menu_dl dd.active").addClass("hover").removeClass("active");
//		
//		$(this).find(".menu_pro_down,.menu_down").stop().slideUp();
//	})

	//手机端导航下拉
	$(".menu_btn").click(function(){
		$(".menu").stop().slideToggle();
	})
	
	$(".ind_search").click(function(){
		$(".ind_sea_hide").addClass("hover");
	})
	
	$(".ind_sea_box_close").click(function(){
		$(".ind_sea_hide").removeClass("hover");
	})
	
	
	/*
	 * banner
	 */
	var banner = $('.banner');
		banner.owlCarousel({
		loop: true,
		dots:true,
		items: 1
	})
	$('.banner_prev').click(function() {
	    banner.trigger('prev.owl.carousel', [300]);
	}) 
	$('.banner_next').click(function() {
	    banner.trigger('next.owl.carousel');
	})
	
	
	//hot_pro
	$(".hot_pro_box").slide({
		titCell: ".hd ul",
		mainCell: ".bd ul",
		autoPlay:true,      //自动播放
		autoPage:true,
		effect:"leftLoop",  //左循环滚动  fold：淡入淡出 topLoop：上循环滚动； leftLoop：左循环滚动；
		delayTime: 500,    //切换时间
		interTime: 4000,    //切换间隔
		trigger: "click",
		vis:1
	});
	
	/*
	 * ind_pro_scroll
	 */
	var ind_pro_scroll = $('.ind_pro_scroll1');
		ind_pro_scroll.owlCarousel({
		margin:10,
		nav: false,
		loop: true,
		dots:true,
		responsive: {
			300: {
			    items: 2
			},
			480: {
			    items: 2
			},
			768: {
			    items: 3
			},
			992: {
			    items: 3
			},
			1200: {
				items: 4
				
			}
		}
	})
	
	$('.ind_pro_box_prev').click(function() {
	    ind_pro_scroll.trigger('prev.owl.carousel');
	}) 
	$('.ind_pro_box_next').click(function() {
	    ind_pro_scroll.trigger('next.owl.carousel');
	})
	
	//hot_news
	$(".hot_news_box").slide({
		titCell: ".hd ul",
		mainCell: ".bd dl",
		autoPlay:true,      //自动播放
		autoPage:true,
		effect:"topLoop",  //左循环滚动  fold：淡入淡出 topLoop：上循环滚动； leftLoop：左循环滚动；
		delayTime: 500,    //切换时间
		interTime: 4000,    //切换间隔
		trigger: "click",
		vis:2
	});
	
	
	/*
	 * ind_pro_scroll
	 */
	var ind_faq = $('.ind_faq_list');
		ind_faq.owlCarousel({
		items: 1,
		nav: false,
		loop: false,
		dots:true
	})
	
	
	
	$(".float_back").click(function(){
		$("html,body").stop().animate({"scrollTop":"0"},300)
	})
	
	$(".float_zk").click(function(){
		$(this).toggleClass("hover");
		$(".float_tel,.float_skype,.float_app").toggle();
	})
	
	$(".about_box1_r_item").hover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	
	
	//ind_tabs
	
	tabs(".ind_appli_bars",".ind_appli_tabs","click")
	
	
	/*
	 * pro_det_wap_scroll
	 */
	var pro_det_wap_scroll = $('.pro_det_wap_scroll');
		pro_det_wap_scroll.owlCarousel({
		nav: true,
		loop: false,
		dots:true,
		items: 1
	})
	
})





$(window).load(function(){
	var w = $(window).width();
	if(w<769){
		
		$(".menu_dl dd").each(function(){
			if($(this).find(".menu_down a").length > 0){
				$(this).find(".menu_tt_ico").show();
			}else{
				$(this).find(".menu_tt_ico").hide();
			}
		})
		$(".menu_dl dd .menu_tt_ico").click(function(){
			$(this).parents(".menu_tt").siblings(".menu_down").stop().slideToggle();
		})
		
	}else{
		$(".menu_dl dd").hover(function(){
			$(".menu_dl dd.hover").addClass("active").removeClass('hover')
			$(this).find(".menu_down").stop().slideDown();
			$(this).addClass("hover");
	
		},function(){
			$(this).removeClass("hover");
			$(".menu_dl dd.active").addClass("hover").removeClass("active");
			$(this).find(".menu_down").stop().slideUp();
		})
		
//		$(".menu_two").hover(function(){
//			$(this).find(".menu_three").stop().show();
//		},function(){
//			$(this).find(".menu_three").stop().hide();
//		})
	}
	
})




