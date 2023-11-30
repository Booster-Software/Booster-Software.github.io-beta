(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
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

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $(".header").outerHeight() - 17;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == ".header") {
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

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("header-scrolled");
    } else {
      $(".header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $(".header").addClass("header-scrolled");
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

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel
    .find(".carousel-inner")
    .children(".carousel-item")
    .each(function (index) {
      index === 0
        ? introCarouselIndicators.append(
            "<li data-target='#introCarousel' data-slide-to='" +
              index +
              "' class='active'></li>"
          )
        : introCarouselIndicators.append(
            "<li data-target='#introCarousel' data-slide-to='" +
              index +
              "'></li>"
          );
    });

  introCarousel.on("slid.bs.carousel", function (e) {
    $(this).find("h2").addClass("animate__animated animate__fadeInDown");
    $(this)
      .find("p, .btn-get-started")
      .addClass("animate__animated animate__fadeInUp");
  });

  // Skills section
  $("#skills").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    }
  );

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Porfolio isotope and filter
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

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      900: {
        items: 6,
      },
    },
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

// Send CV
function onSubmit(token) {
  var form = document.getElementById("careers-form");
  if (form.checkValidity()) {
    submitCV();
  } else {
    grecaptcha.reset();
    form.reportValidity();
  }
}

function submitCV() {
  var name = $("#careersCVname").val();
  var email = $("#careersCVemail").val();
  var files = $("#careersCVfile").prop("files");
  var captcha = grecaptcha.getResponse();

  resetSubmitResultMessage();
  $("#careersSubmitSpinner").show();
  sendCV(name, email, files, captcha);
}

function sendCV(name, email, files, captcha) {
  var form = new FormData();
  form.append("name", name);
  form.append("email", email);
  var blob = new Blob(files, { type: files[0].type });
  var file = new File([blob], files[0].name);
  form.append("file", file);
  form.append("captcha", captcha);

  fetch("/file-upload", {
    method: "POST",
    body: form,
  })
    .then((response) => {
      showSubmitResult(response.status);
    })
    .catch((error) => {
      showSubmitResult(400);
    });

  return response;
}

function showSubmitResult(result) {
  $("#careersSubmitSpinner").hide();
  getTranslation(function (language) {
    if (result == 200) {
      $("#careersSubmitCollapseAlert").addClass("alert-success");
      $("#careersSubmitCollapseAlertHeader").html(
        language.careersSubmitCollapseAlertHeaderOk
      );
      $("#careersSubmitCollapseAlertMainMessage").html(
        language.careersSubmitCollapseAlertMainMessageOk
      );
      $("#careersSubmitCollapseAlertFooterMessage").html(
        language.careersSubmitCollapseAlertFooterMessageOk
      );
    } else {
      $("#careersSubmitCollapseAlert").addClass("alert-danger");
      $("#careersSubmitCollapseAlertHeader").html(
        language.careersSubmitCollapseAlertHeaderError
      );
      $("#careersSubmitCollapseAlertMainMessage").html(
        language.careersSubmitCollapseAlertMainMessageError
      );
      $("#careersSubmitCollapseAlertFooterMessage").html(
        language.careersSubmitCollapseAlertFooterMessageError
      );
    }
    $("#careersSubmitCollapse").collapse("show");
  });
}

function resetSubmitResultMessage() {
  $("#careersSubmitCollapse").collapse("hide");
  $("#careersSubmitCollapseAlertHeader").html("");
  $("#careersSubmitCollapseAlertMainMessage").html("");
  $("#careersSubmitCollapseAlertFooterMessage").html("");
  $("#careersSubmitCollapseAlert").removeClass();
  $("#careersSubmitCollapseAlert").addClass("alert");
}

$(document).ready(function () {
  $("#careersSubmitSpinner").hide();
});

// Languages
function getTranslation(cb) {
  var lang = localStorage.getItem("language") || "en";

  $.ajax({
    url: "/assets/languages/" + lang + ".json?v=9",
    dataType: "json",
    success: function (lang) {
      cb(lang);
    },
  });
}

function setLanguage(newLang) {
  var currentLang = localStorage.getItem("language");
  localStorage.setItem("language", newLang);

  setInactiveFlag(currentLang);
  setActiveFlag(newLang);

  translate();
}

function setActiveFlag(lang) {
  document
    .getElementById("languageFlag" + (lang || "en").toUpperCase())
    .classList.add("active-language-flag");
}

function setInactiveFlag(lang) {
  document
    .getElementById("languageFlag" + (lang || "en").toUpperCase())
    .classList.remove("active-language-flag");
}

function translate() {
  getTranslation(function (language) {
    // Main page
    $("#navMenuHome").html(language.home);
    $("#navMenuAboutUs").html(language.aboutUs);
    $("#navMenuServices").html(language.services);
    $("#navMenuServices1").html(language.servicesTitle1);
    $("#navMenuServices2").html(language.servicesTitle2);
    $("#navMenuServices3").html(language.servicesTitle3);
    $("#navMenuServices4").html(language.servicesTitle4);
    $("#navMenuServices5").html(language.servicesTitle5);
    $("#navMenuServices6").html(language.navMenuFactoryCustomSoftware);
    $("#navMenuServices7").html(language.navMenuFactoryEcommerce);
    $("#navMenuCareers").html(language.careers);
    $("#navMenuContactUs").html(language.contactUs);
    $("#homeHeader1Text1").html(language.homeHeader1Text1);
    $("#homeHeader1Text2").html(language.homeHeader1Text2);
    $("#homeButton1").html(language.homeButton1);
    $("#homeHeader2Text1").html(language.homeHeader2Text1);
    $("#homeHeader2Text2").html(language.homeHeader2Text2);
    $("#homeButton2").html(language.homeButton2);
    $("#homeHeader3Text1").html(language.homeHeader3Text1);
    $("#homeHeader3Text2").html(language.homeHeader3Text2);
    $("#homeButton3").html(language.homeButton3);
    $("#homeCarouselPrevious").html(language.homeCarouselPrevious);
    $("#homeCarouselNext").html(language.homeCarouselNext);
    $("#featuredServicesTitle1").html(language.featuredServicesTitle1);
    $("#featuredServicesDescription1").html(
      language.featuredServicesDescription1
    );
    $("#featuredServicesTitle2").html(language.featuredServicesTitle2);
    $("#featuredServicesDescription2").html(
      language.featuredServicesDescription2
    );
    $("#featuredServicesTitle3").html(language.featuredServicesTitle3);
    $("#featuredServicesDescription3").html(
      language.featuredServicesDescription3
    );
    $("#aboutUsDescription").html(language.aboutUsDescription);
    $("#aboutUsTitle").html(language.aboutUs);
    $("#aboutUsTitle1").html(language.aboutUsTitle1);
    $("#aboutUsDescription1").html(language.aboutUsDescription1);
    $("#aboutUsTitle2").html(language.aboutUsTitle2);
    $("#aboutUsDescription2").html(language.aboutUsDescription2);
    $("#aboutUsTitle3").html(language.aboutUsTitle3);
    $("#aboutUsDescription3").html(language.aboutUsDescription3);
    $("#servicesTitle").html(language.services);
    $("#servicesDescription").html(language.servicesDescription);
    $("#servicesTitle1").html(language.servicesTitle1);
    $("#servicesDescription1").html(language.servicesDescription1);
    $("#servicesTitle2").html(language.servicesTitle2);
    $("#servicesDescription2").html(language.servicesDescription2);
    $("#servicesTitle3").html(language.servicesTitle3);
    $("#servicesDescription3").html(language.servicesDescription3);
    $("#servicesTitle4").html(language.servicesTitle4);
    $("#servicesDescription4").html(language.servicesDescription4);
    $("#servicesTitle5").html(language.servicesTitle5);
    $("#servicesDescription5").html(language.servicesDescription5);
    $("#letsWorkTogetherTitle").html(language.letsWorkTogetherTitle);
    $("#letsWorkTogetherDescription").html(
      language.letsWorkTogetherDescription
    );
    $("#letsWorkTogetherCTA").html(language.contactUs);
    $("#ourClients").html(language.ourClients);
    $("#teamTitle").html(language.teamTitle);
    $("#teamDescription").html(language.teamDescription);
    $("#contactUsTitle").html(language.contactUs);
    $("#contactUsDescription").html(language.contactUsDescription);
    $("#address").html(language.address);
    $("#phoneNumber").html(language.phoneNumber);
    $("#email").html(language.email);
    $("#footerLogoDescription").html(language.footerLogoDescription);
    $("#footerUsefulLinks").html(language.footerUsefulLinks);
    $("#footerHome").html(language.home);
    $("#footerAboutUs").html(language.aboutUs);
    $("#footerServices").html(language.services);
    $("#footerContactUs").html(language.contactUs);
    $("#footerPhone").html(language.footerPhone);
    $("#footerEmail").html(language.footerEmail);
    $("#copyright").html(language.copyright);
    // Careers
    $("#careersTitle").html(language.careers);
    $("#careersDescription").html(language.careersDescription);
    $("#careersCVnameLabel").html(language.careersCVnameLabel);
    $("#careersCVemailLabel").html(language.careersCVemailLabel);
    $("#careersCVfileLabel").html(language.careersCVfileLabel);
    $("#careersSubmitLabel").html(language.careersSubmitLabel);
    // Booster Factory
    $("#navMenuFactory").html(language.navMenuFactory);
    $("#navMenuFactoryCustomSoftware").html(language.navMenuFactoryCustomSoftware);
    $("#navMenuFactoryEcommerce").html(language.navMenuFactoryEcommerce);
    $("#factoryMainTitleText1").html(language.factoryMainTitleText1);
    $("#factoryMainTitleText2").html(language.factoryMainTitleText2);
    $("#factoryFeatures1Feature1").html(language.factoryFeatures1Feature1);
    $("#factoryFeatures1Feature2").html(language.factoryFeatures1Feature2);
    $("#factoryFeatures1Feature3").html(language.factoryFeatures1Feature3);
    $("#factoryFeatures2Feature1").html(language.factoryFeatures2Feature1);
    $("#factoryFeatures2Feature2").html(language.factoryFeatures2Feature2);
    $("#factoryFeatures2Feature3").html(language.factoryFeatures2Feature3);
    $("#factoryFeatures3Feature1").html(language.factoryFeatures3Feature1);
    $("#factoryFeatures3Feature2").html(language.factoryFeatures3Feature2);
    $("#factoryFeatures3Feature3").html(language.factoryFeatures3Feature3);
    $("#factoryCustomSoftwareTitle").html(language.factoryCustomSoftwareTitle);
    $("#factoryCustomSoftwareDescription").html(language.factoryCustomSoftwareDescription);
    $("#factoryCustomSoftwareTitle1").html(language.factoryCustomSoftwareTitle1);
    $("#factoryCustomSoftwareDescription1").html(language.factoryCustomSoftwareDescription1);
    $("#factoryCustomSoftwareTitle2").html(language.factoryCustomSoftwareTitle2);
    $("#factoryCustomSoftwareDescription2").html(language.factoryCustomSoftwareDescription2);
    $("#factoryCustomSoftwareTitle3").html(language.factoryCustomSoftwareTitle3);
    $("#factoryCustomSoftwareDescription3").html(language.factoryCustomSoftwareDescription3);
    $("#factoryCustomSoftwareTitle4").html(language.factoryCustomSoftwareTitle4);
    $("#factoryCustomSoftwareDescription4").html(language.factoryCustomSoftwareDescription4);
    $("#factoryCustomSoftwareTitle5").html(language.factoryCustomSoftwareTitle5);
    $("#factoryCustomSoftwareDescription5").html(language.factoryCustomSoftwareDescription5);
    $("#factoryCustomSoftwareTitle6").html(language.factoryCustomSoftwareTitle6);
    $("#factoryCustomSoftwareDescription6").html(language.factoryCustomSoftwareDescription6);
    $("#eCommerceDescription").html(language.eCommerceDescription);
    $("#ecommerceMediaTile1").html(language.ecommerceMediaTile1);
    $("#ecommerceMediaDescription1").html(language.ecommerceMediaDescription1);
    $("#ecommerceMediaTile2").html(language.ecommerceMediaTile2);
    $("#ecommerceMediaDescription2").html(language.ecommerceMediaDescription2);
    $("#ecommerceMediaTile3").html(language.ecommerceMediaTile3);
    $("#ecommerceMediaDescription3").html(language.ecommerceMediaDescription3);
    $("#ecommerceMediaTile4").html(language.ecommerceMediaTile4);
    $("#ecommerceMediaDescription4").html(language.ecommerceMediaDescription4);
    $("#ecommerceMediaTile5").html(language.ecommerceMediaTile5);
    $("#ecommerceMediaDescription5").html(language.ecommerceMediaDescription5);
    $("#ecommerceMediaTile6").html(language.ecommerceMediaTile6);
    $("#ecommerceMediaDescription6").html(language.ecommerceMediaDescription6);
    $("#ecommerceMediaTile7").html(language.ecommerceMediaTile7);
    $("#ecommerceMediaDescription7").html(language.ecommerceMediaDescription7);
    $("#digitalPartnerTitle").html(language.digitalPartnerTitle);
    $("#digitalPartnerDescription").html(language.digitalPartnerDescription);
    $("#digitalPartnerCTA").html(language.digitalPartnerCTA);
  });
}

$(document).ready(function () {
  translate();
  setActiveFlag(localStorage.getItem("language"));
});

// Booster Factory fancy background
$(".fancyCubesBackground").append(
  '<div><ul class="cubes">' + "<li></li>".repeat(10) + "</ul></div>"
);
