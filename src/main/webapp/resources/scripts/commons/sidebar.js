// sidebar.js

const $sidebar = $(".sidebar-container");
const $toggle = $(".header-toggle");
const $main = $(".main-container");

$sidebar.find("a").on("click", function () {
  const $parentLi = $(this).parent();
  if ($parentLi.hasClass("active")) {
    if (!($(this).hasClass("second-a"))) {
      $parentLi.removeClass("active");
    }
    $("ul:first", $parentLi).slideUp();
  }
  else {
    if (!$parentLi.parent().hasClass("child-menu")) {
      $sidebar.find("li").removeClass("active");
      $sidebar.find("li ul").slideUp();
    }
    else if ($parentLi.parent().hasClass("child-menu")) {
      $parentLi.siblings("li").removeClass("active");
      $parentLi.siblings("li ul").slideUp();
    }
    $parentLi.addClass("active");
    $("ul:first", $parentLi).slideDown();
  }
});

// 페이지 열렸으면 항목 닫기
$sidebar.find(".second-a").on("click", function () {
  const $parentLi = $(this).parent();
  if ($parentLi.hasClass("active")) {
    if ($parentLi.parents("li").hasClass("active")) {
      $parentLi.parents("li").removeClass("active");
      $("ul:first", $parentLi.parents("li")).slideUp();
    }
  }
});

$toggle.on("click", function () {
  if ($sidebar.hasClass("sidebar-open")) {
    if ($main.hasClass("ml-100px")) {
      $main.removeClass("ml-100px");
    }
    $sidebar.removeClass("sidebar-open");
    $sidebar.addClass("sidebar-closed");
  }
  else {
    if (!$main.hasClass("ml-100px")) {
      $main.addClass("ml-100px");
    }
    $sidebar.removeClass("sidebar-closed");
    $sidebar.addClass("sidebar-open");
  }
});
