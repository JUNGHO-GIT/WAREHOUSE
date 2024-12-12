(function  (e, i)  {
	var t = function  (e, i, t)  {
		var n;
		return function a ()  {
			var o = this,
				s = arguments;
			function l ()  {
				if (!t) e.apply(o, s);
				n = null;
			}
			if (n) clearTimeout(n);
			else if (t) e.apply(o, s);
			n = setTimeout(l, i || 100);
		};
	};
	jQuery.fn[i] = function  (e)  {
		return e ? this.bind("resize", t(e)) : this.trigger(i);
	};
})(jQuery, "smartresize");
var CURRENT_URL = window.location.href.split("#")[0].split("?")[0],
	$BODY = $("body"),
	$MENU_TOGGLE = $(`#menu_toggle`),
	$SIDEBAR_MENU = $("#sidebar-menu"),
	$SIDEBAR_FOOTER = $(".sidebar-footer"),
	$LEFT_COL = $(".left_col"),
	$RIGHT_COL = $(".right_col"),
	$NAV_MENU = $(".nav_menu"),
	$FOOTER = $("footer");
function init_sidebar ()  {
	var e = function  ()  {
		$RIGHT_COL.css("min-height", $(window).height());
		var e = $BODY.outerHeight(),
			i = $BODY.hasClass("footer_fixed") ? -10 : $FOOTER.height(),
			t = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
			n = e < t ? t : e;
		n -= $NAV_MENU.height() + i;
		$RIGHT_COL.css("min-height", n);
	};
	$SIDEBAR_MENU.find("a").on("click", function  (i)  {
		var t = $(this).parent();
		if (t.is(".active")) {
			t.removeClass("active active-sm");
			$("ul:first", t).slideUp(function  ()  {
				e();
			});
		}
  else {
  	if (!t.parent().is(".child_menu")) {
				$SIDEBAR_MENU.find("li").removeClass("active active-sm");
				$SIDEBAR_MENU.find("li ul").slideUp();
  }
    else {
    	if ($BODY.is(".nav-sm")) {
					t.parent().find("li").removeClass("active active-sm");
					t.parent().find("li ul").slideUp();
    }
			}
			t.addClass("active");
			$("ul:first", t).slideDown(function  ()  {
				e();
			});
		}
	});
	$MENU_TOGGLE.on("click", function  ()  {
		if ($BODY.hasClass("nav-md")) {
			$SIDEBAR_MENU.find("li.active ul").hide();
			$SIDEBAR_MENU.find("li.active").addClass("active-sm").removeClass("active");
		}
  else {
  	$SIDEBAR_MENU.find("li.active-sm ul").show();
			$SIDEBAR_MENU.find("li.active-sm").addClass("active").removeClass("active-sm");
  }
		$BODY.toggleClass("nav-md nav-sm");
		e();
		$(".dataTable").each(function  ()  {
			$(this).dataTable().fnDestroy();
			$(this).dataTable().fnDraw();
		});
	});
	$SIDEBAR_MENU
		.find('a[href="' + CURRENT_URL + '"]')
		.parent("li")
		.addClass("current-page");
	$SIDEBAR_MENU
		.find("a")
		.filter(function  ()  {
			return this.href == CURRENT_URL;
		})
		.parent("li")
		.addClass("current-page")
		.parents("ul")
		.slideDown(function  ()  {
			e();
		})
		.parent()
		.addClass("active");
	$(window).smartresize(function  ()  {
		e();
	});
	e();
	if ($.fn.mCustomScrollbar) {
		$(".menu_fixed").mCustomScrollbar({
			autoHideScrollbar: true,
			theme: "minimal",
			mouseWheel: {preventDefault: true},
		});
	}
}
var randNum = function  ()  {
	return Math.floor(Math.random() * (1 + 40 - 20)) + 20;
};
$(document).ready(function  ()  {
	$(".collapse-link").on("click", function  ()  {
		var e = $(this).closest(".x_panel"),
			i = $(this).find("i"),
			t = e.find(".x_content");
		if (e.attr("style")) {
			t.slideToggle(200, function  ()  {
				e.removeAttr("style");
			});
		}
  else {
  	t.slideToggle(200);
			e.css("height", "auto");
  }
		i.toggleClass("fa-chevron-up fa-chevron-down");
	});
	$(".close-link").click(function  ()  {
		var e = $(this).closest(".x_panel");
		e.remove();
	});
});
$(document).ready(function  ()  {
	$('[data-toggle="tooltip"]').tooltip({container: "body"});
});
function init_compose ()  {
	if (typeof $.fn.slideToggle === "undefined") {
		return;
	}
	$("#compose, .compose-close").click(function  ()  {
		$(".compose").slideToggle();
	});
}
$(document).ready(function  ()  {
	init_sidebar();
});
