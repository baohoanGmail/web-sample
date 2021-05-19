!(function ($) {
  "use strict";

  if ($(".banners").length > 0) {
    $(".banners").owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      //  autoHeight: true,
      nav: true,
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  const pcLayout = $(".layoutPc");
  const mobileLayout = $(".layoutMb");
  const WIDTH = $(window).width();
  let wHeight = 0;
  checkPosition();
  function checkPosition() {
    if (WIDTH < 768) {
      pcLayout.addClass("hidden");
      mobileLayout.removeClass("hidden");
    } else {
      pcLayout.removeClass("hidden");
      mobileLayout.addClass("hidden");
    }
  }

  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });
  //Fix scroll social button
  $(window).scroll(function () {
    // Show/Hide share social buttons
    if ($(this).scrollTop() > wHeight) {
      $(".share-social").removeClass("hidden");
      $(".share-social").fadeIn("slow");
    } else {
      $(".share-social").fadeOut("slow");
    }
    // Show/hide back to top button
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  // Back to top button
  // $(window).scroll(function () {
  //   if ($(this).scrollTop() > 100) {
  //     $(".back-to-top").fadeIn("slow");
  //   } else {
  //     $(".back-to-top").fadeOut("slow");
  //   }
  // });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
    // Check margin menu
    $("#main").css({ "margin-top": $("#header").outerHeight() });
    //Animation otp
    $(".digit-group")
      .find("input")
      .each(function () {
        $(this).attr("maxlength", 1);
        $(this).on("keyup", function (e) {
          var parent = $($(this).parent());

          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find("input#" + $(this).data("previous"));

            if (prev.length) {
              $(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39
          ) {
            var next = parent.find("input#" + $(this).data("next"));

            if (next.length) {
              $(next).select();
            } else {
              if (parent.data("autosubmit")) {
                parent.submit();
              }
            }
          }
        });
      });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });
  $(document).on("click", ".close", function () {
    $(".modal").hide();
    $(".modal-backdrop").removeClass("show");
  });

  //Show/hide modal forget login
  $(document).on("click", ".forget-password", function () {
    $("#modalLogin").modal("hide");
    $("#modalLoginForget").modal("show");
  });

  //Handle tab account page
  // $(".tab-nav a").on("click", function () {
  //   let tab = $(this).data("content");
  //   if (!$(this).hasClass("tab-active")) {
  //     $(".tab-nav.tab-active").removeClass("tab-active");
  //     $(".tab-content").removeClass("tab-active");
  //     $(this).parent().addClass("tab-active");
  //     $(tab)
  //       .addClass("tab-active")
  //       .css("opacity", 0)
  //       .animate({ opacity: 1 }, 1000);
  //   }
  // });
  //Fixed social link
  let container = $("#pages .container");
  if (WIDTH < 768) {
    $(".share-social").css({
      left: container.offset().left + container.innerWidth() - 62,
    });
  } else {
    $(".share-social").css({
      left: container.offset().left + container.innerWidth(),
    });
  }

  //Handle tab account page
  $(".tab-item a").on("click", function () {
    let tab = $(this).data("tab");
    if (!$(this).hasClass("tab-active")) {
      $(".tab-item.tab-active").removeClass("tab-active");
      $(".tab_content_support").removeClass("tab-active");
      $(this).parent().addClass("tab-active");
      $("#" + tab)
        .addClass("tab-active")
        .css("opacity", 0)
        .animate({ opacity: 1 }, 1000);
    }
  });

  //Show/hide password
  $(".toggle-password").click(function () {
    $(this).toggleClass("icon-eye icon-eyeclose");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  // Upload image account
  $(".icon-upload").on("click", function () {
    $(this).parent().siblings(".form__uploadInput").click();
  });
  $(".form__uploadInput").on("change", function () {
    if (this.files && this.files[0]) {
      let img = $(this).closest(".form__upload").find(".Imgshow");
      img.attr("src", URL.createObjectURL(this.files[0]));
      img.removeClass("hidden");
      $(this).closest(".form__upload").find(".icon-upload").hide();
      setTimeout(function () {
        $(".register_show").removeClass("hidden");
        $(".register_upload").addClass("hidden");
      }, 1000);
    }
  });
  // Upload image rating
  $(document).on("click", "#btn-upload", function () {
    $(this).siblings(".upload-img").trigger("click");
  });
  $(".upload-img").on("change", function () {
    let fileSize = this.files.length;
    if (fileSize === 0) {
      return;
    }
    let imgGroup = $('<div class="imgGroup" />');
    let removeElement = $('<i class="ion-ios-close" />');
    let groupImageWrapper = $("#image-wrapper");
    for (let i = 0; i < fileSize; i++) {
      let imgElement = $(
        '<input type="image" class="Imgshow" width="80" height="80" />'
      ).attr({
        name: "image" + i,
        src: URL.createObjectURL(this.files[i]),
      });
      imgElement.appendTo(imgGroup);
      removeElement.appendTo(imgGroup);
      imgGroup.appendTo(groupImageWrapper);
    }
  });
  //Show register child
  $(".btn-reigister-child").on("click", function () {
    $(this).hide();
    $("#registerChild")
      .removeClass("hidden")
      .css("opacity", 0)
      .animate({ opacity: 1 }, 1000);
  });

  //Edit Info user
  if (WIDTH < 768) {
    $(".infor-group .btn-change-info").on("click", function () {
      $(this).html("Lưu");
      $(".show-info").addClass("hidden");
      $(".edit-info ").removeClass("hidden");
    });
  } else {
    $(".infor-group .btn-change-info").on("click", function () {
      $(this).html("Lưu thông tin");
      $(".show-info").addClass("hidden");
      $(".edit-info ").removeClass("hidden");
    });
  }

  // Show/hide table order list detail
  $(".show-order-detail").on("click", function () {
    $(".order-detail-list").removeClass("hidden");
    $(".table-order").addClass("hidden");
  });

  //Show/hide success baby update
  $("#registerChild .btn-save").on("click", function () {
    $(".infor-child-first").addClass("hidden");
    $(".infor-child-second").removeClass("hidden");
  });

  //Edit success baby update
  $(".infor-child-second .btn-edit-child").on("click", function () {
    $(".infor-child-second").addClass("hidden");
    $(".edit-info-group-second").removeClass("hidden");
  });

  // Show/hide create address
  $(".btn-change-address").on("click", function () {
    $(".address-group ").addClass("hidden");
    $(".create-address-info").removeClass("hidden");
  });

  // Show/hide edit address
  $(".btn-edit-address").on("click", function () {
    $(".address-group").addClass("hidden");
    $(".edit-address-info").removeClass("hidden");
  });
  //show menu mobile
  $("button.navbar-toggle").click(function () {
    let navbar_obj = $($(this).data("target"));
    navbar_obj.toggleClass("open");
    $(".backdrop-filter").toggleClass("open");
    $("#header .navbar-header").toggleClass("hidden");
    $("#header").toggleClass("bg--white");
    $("#header .register").html("/đăng kí");
  });
  //hide menu mobile
  $(document).on("click", "#header .close-menu", function () {
    $("#menu-mobile").toggleClass("open");
    $(".backdrop-filter").toggleClass("open");
    $("#header .navbar-header").toggleClass("hidden");
    $("#header").toggleClass("bg--white");
  });
  //show menu language
  $(document).on("click", "#header .language", function () {
    $("#menu-mobile").toggleClass("open");
    $(".menu-language").toggleClass("open");
  });
  //hide menu language
  $(document).on("click", ".menu-language .title", function () {
    $("#menu-mobile").toggleClass("open");
    $(".menu-language").toggleClass("open");
  });
  //click button open modal login
  $(document).on("click", "#header .open-modalLogin", function () {
    $("#menu-mobile").toggleClass("open");
    $(".backdrop-filter").toggleClass("open");
    $("#header .navbar-header").toggleClass("hidden");
  });

  //click button search show menu mobile
  $(document).on("click", "#header .search", function () {
    $(".search-page").toggleClass("open");
  });
  //click button search hide menu mobile
  $(document).on(
    "click",
    "#header .search-page .ion-chevron-left",
    function () {
      $(".search-page").toggleClass("open");
    }
  );

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }

  $(document).ready(function () {
    aos_init();

    $(".mobile-categories-trigger").on("click", function () {
      const menu = $(".tabs-nav.mobile");
      const backdrop = $(".tabs-nav-backdrop");
      const closeEl = $(".tab-nav-close-icon");

      function close() {
        menu.removeClass("active");
        backdrop.removeClass("active");
      }

      menu.addClass("active");
      backdrop.addClass("active");

      backdrop.on("click", close);
      closeEl.on("click", close);
    });
  });
})(jQuery);
