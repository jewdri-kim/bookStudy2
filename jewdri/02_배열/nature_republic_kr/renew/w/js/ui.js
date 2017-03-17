//Layout(s)
$(document).ready(function(){
	
	var top = $(window).scrollTop();
	var cntop = $('#container').offset().top-100;	
	var has_tab = $('#content').hasClass('fixed_tab');
	header_control(top);		

	//�ε��׼�(s)
	/*
	var now_num = 1;
	var next_num = 0;
	var loading_st = 'plus';
	var loading_img = $('.loading.nr img');
	var loading_time = 100;
	var loading_auto = setTimeout(loading_view,loading_time);
	function loading_view(){
		//alert(0);
		if(now_num == 10){
			loading_st = 'minus'
		}else if(now_num == 1){
			loading_st = 'plus'
		}

		if(loading_st == 'plus'){
			next_num = now_num+1;
		}else{
			next_num = now_num-1;
		}
		//console.log(next_num);

		loading_img.attr("src",loading_img.attr("src").replace("loading_"+now_num,"loading_"+next_num));

		if(loading_auto) clearTimeout(loading_auto);
		 loading_auto = setTimeout(loading_view,loading_time);

		 now_num = next_num;
	}*/
	//�ε��׼�(e)

	//2016-07-14//����(s)
	$('#header .top .w_cont > dl > dt > a').click(function(e){
		e.preventDefault();
		var st = $(this).closest('dl').hasClass('active');

		if(st) $(this).closest('dl').removeClass('active');
		else $(this).closest('dl').addClass('active');
	});

	$('#header .top .w_cont > dl').bind('mouseleave blur',function(){
		$(this).removeClass('active');
	});
	//2016-07-14//����(e)

	//���
	$(window).scroll(function(){
		var t = $(window).scrollTop();
		header_control(t);		
	});

	//�˻����ڵ���õ(s)
	$('.srch_top .form_item .i_text').focus(function(){
		$('.srch_auto').addClass('active');
	});

	$('.srch_auto .btn_auto').click(function(){
		$('.srch_top .form_item .i_text').blur();
		$('.srch_auto').removeClass('active');
	});

	// $('.srch_top .form_item .i_text').blur(function(){
	// 	$('.srch_auto').removeClass('active');
	// });
	//�˻����ڵ���õ(e)

	//2016-05-27//����(s)
	var stiky_st = false;
	function header_control(top){
		if(!has_tab){
			$('.srch_auto').removeClass('active');  //2016-06-10�߰�
			if( top > cntop){
				//console.log('add');
				$('#wrap').addClass('fix_top');
				stiky_st = true; 
			}
			else{
				//console.log('remove');
				$('#wrap').removeClass('fix_top');
				stiky_st = false; 
			}
		}
	}
	//2016-05-27//����(e)

	//��ƼŰ�˻���ư
	$('#header .srch_top .btn_srch').click(function(e){
		if(stiky_st){
			e.preventDefault();
			var st = $(this).closest('.srch_top').hasClass('open');
			if(!st){
				$(this).closest('.srch_top').addClass('open');
				$('.fix_top #header .menu_area .btn_cart').addClass('hidden');
			}
		}
	});

	//��ƼŰ�˻���ư
	$('#header .srch_top .btn_close').click(function(e){
		if(stiky_st){
			e.preventDefault();
			var st = $(this).closest('.srch_top').hasClass('open');
			if(st){
				$(this).closest('.srch_top').removeClass('open');
				$('.fix_top #header .menu_area .btn_cart').removeClass('hidden');
			}
		}
	});


	//��ü�޴�(s)
		$('#header .menu_area .btn_category').bind('mouseover focus',function(){
			all_menu_view();
		});

		$('#header .menu_area').bind('mouseleave blur',function(){
			all_menu_view('close');
		});

		//2016-07-14//����(s)
		function all_menu_view(st){
			
			// 2016-11-15//gnb���� js�߰�(s)
			var gnb_height = $('#header .menu_area').height();
			$('#header .menu_area .all_menu').css('top',gnb_height+1);
			// 2016-11-15//gnb���� js�߰�(e)

			if(st!='close'){
				$('#header .menu_area .all_menu').show();
				$('#header .menu_area .all_menu h2').show();
			}
			else{
				$('#header .menu_area .all_menu').hide();
				$('#header .menu_area .all_menu h2').hide();
			}
		}
		//2016-07-14//����(e)

		$('#header .menu_area .all_menu .w_cont > ul > li > a').bind('mouseover focus',function(){
			$('#header .menu_area .all_menu .w_cont > ul > li').removeClass('active');
			$(this).parent().addClass('active');
		});
	//��ü�޴�(e)

	//gnb�޴�(s)
		$('#header .menu_area .gnb > li > a').bind('mouseover focus',function(){
			all_menu_view('close');
			var menu = $(this).attr('class');
			gnb_sub_view('',menu);
		});

		$('#header .menu_area').bind('mouseleave blur',function(){
			gnb_sub_view('close');
		});

		function gnb_sub_view(st,menu){
			
			// 2016-11-15//gnb���� js�߰�(s)
			var gnb_height = $('#header .menu_area').height();
			$('#header .menu_area .gnb_sub').css('top',gnb_height);
			// 2016-11-15//gnb���� js�߰�(e)

			if(st!='close' && menu != 'none'){
				$('.gnb_sub .w_cont').removeClass('active');
				$('.gnb_sub .w_cont.'+menu).addClass('active');
				$('.gnb_sub').slideDown();
			}else{
				$('.gnb_sub').stop(true,true).slideUp(); 
			}
			// 2016-12-08//����(s)
			if(menu == 'community'){				
				$('.gnb_sub .community .slide_frame .img_box img').each(function(index){
						img_resize($(this));
				});
			}
			// 2016-12-08//����(e)
		}
	//gnb�޴�(e)

	//ranking(s)
		var rank_auto = null;
		var rank_time = 3000;
		rank_auto = setTimeout(auto_ranking, rank_time);
		function auto_ranking(){
			$('.rank_list ol').animate({'top':'-23px'},500,function(){
				$('.rank_list ol').css('top',0).find('li:first').appendTo('.rank_list ol');
			});

			if(rank_auto) clearTimeout(rank_auto);
			rank_auto = setTimeout(auto_ranking, rank_time);
		}
		//2016-09-20//����(s)
		$('#header .logo_area .ranking .rank_list').click(function(e){
			e.preventDefault();
			$('.all_ranking').addClass('active');
		});
		//2016-09-20//����(e)

		$('#header .logo_area .ranking').bind('mouseleave blur',function(){
			$('.all_ranking').removeClass('active');
		});
	//ranking(e)

	//footer select
	$('#footer .site_foot .foot_menu .w_cont > dl dt a').click(function(e){
		e.preventDefault();
		var st = $(this).closest('dl').hasClass('active');
		if(st) $(this).closest('dl').removeClass('active');
		else $(this).closest('dl').addClass('active');
	});

	$('#footer .site_foot').bind('mouseleave blur',function(){
		$('#footer .site_foot .foot_menu .w_cont > dl').removeClass('active');
	});
	 
});
//Layout(e)

//Form(s)
$(document).ready(function(){
	// Input Clear
	var i_text = $('.form_item>.i_label').next('.i_text');
	$('.form_item>.i_label').css('position','absolute');
	i_text
		.focus(function(){
			$(this).prev('.i_label').addClass('hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).prev('.i_label').removeClass('hidden');
			} else {
				$(this).prev('.i_label').addClass('hidden');
			}
		})
		.change(function(){
			if($(this).val() == ''){
				$(this).prev('.i_label').removeClass('hidden');
			} else {
				$(this).prev('.i_label').addClass('hidden');
			}
		})
		.blur();
	

	// radio, checkbox
	 $(".custom_form label").click(function(){
		var sel_id = $(this).attr("for");
		var is_able = $(this).hasClass("disabled");
		if(is_able){
			return 0;
		}
		var is_radio = $("input#"+sel_id).attr("type");
		var is_checked = $("input#"+sel_id).is(':checked'); //.attr("checked");
		
		if(is_radio != "radio"){
			if(is_checked){
				$(this).removeClass("checked");
			}else{
				$(this).addClass("checked");
			}

		}else{

			var name = $("input#"+sel_id).attr("name");
			$("input[name='"+name+"']").each(function(){
				$(this).next().removeClass("checked");
			});
			$(this).addClass("checked");
		}

	});

	//selexbox
    $('select').selectbox({customList: true});
});
//Form(e)

//���̾��˾�(s)
function pop_layer_view(layer, st){
	if(st != 'close'){
        var top = $(window).scrollTop();

		$(layer).addClass('open');
        $(layer).find('.pop_wrap').css('top',top+100+'px');
	}else{
		$(layer).removeClass('open');
	}
}
$(document).ready(function(){
	$('.pop_wrap .btn_close').click(function(e){
		e.preventDefault();
		var layer = $(this).closest('.pop_layer').attr('id');
		layer = '#'+layer;
		pop_layer_view(layer,'close');
	});

	$('.pop_layer .bg').click(function(e){
		e.preventDefault();
		var layer = $(this).closest('.pop_layer').attr('id');
		layer = '#'+layer;
		pop_layer_view(layer,'close');
	});

});

//���̾��˾�(e)

//media(s)
$(document).ready(function(){
	$('.vd_player .btn_play').click(function(e){
		e.preventDefault();
		vd_control($(this));
	});
	
	function vd_control(btn, st){
		if(st != 'stop'){
			btn.fadeOut();
			btn.next().fadeIn();
		}else{
			btn.fadeIn();
			btn.next().fadeOut();
		}
	}
});
//media(e)