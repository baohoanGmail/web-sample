// $(".progress-bar").loading();
// $("input").on("click", function () {
//   $(".progress-bar").loading();
// });
//Add class scroll for menu account

const STANDARD_RESOLUTION = 768;
let isPCLayout = $(window).width() >= STANDARD_RESOLUTION;
let clazzName = isPCLayout ? "sticky" : "fixed";
let container = isPCLayout ? $(".tabs .tabs-nav") : $(".banner-component");
let containerHeight = container.offset().top;
$(window).scroll(function () {
  if ($(window).scrollTop() > containerHeight) {
    container.addClass(clazzName);
  } else {
    container.removeClass(clazzName);
  }
});
