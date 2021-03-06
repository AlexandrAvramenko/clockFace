//header menu
// menu
$(".header__burger").click(function () {
  $(".header__menu-mobile").toggleClass("active");
  $(".header__menu-small").toggleClass("hidden");
  $(".header__logo-wrapper").toggleClass("hidden");
  $(this).toggleClass("active");
  // $("body").css("overflow-y","hidden")
});

$(".header__menu-left .item").click(function () {
  $(".header__menu-left .item").not(this).removeClass("active");
  $(this).toggleClass("active");

  $(".submenu").removeClass("active");
  $(this).next(".submenu").addClass("active");
});

//dropdown
$(".search").click(function () {
  $(this).toggleClass("active");
  $(".search-content").slideToggle(300);
  $(".overlay").fadeToggle(300);
});

$(".close__search-content").click(function () {
  $(".search").remove("active");
  $(".search-content").slideUp(300);
  $(".overlay").hide();
});

//.header__menu-mobile
$(".mobile-dropdown").click(function () {
  $(".mobile-dropdown").removeClass("active");
  if ($(this).next(".mobile-dropdown__content").css("display") == "none") {
    $(".mobile-dropdown__content").slideUp(300);
    $(this).next(".mobile-dropdown__content").slideToggle(300);
    $(".mobile-dropdown").removeClass("active");
    $(this).toggleClass("active");
  } else $(".mobile-dropdown__content").slideUp(300);
  return false;
});

//tabs
$("[data-tab]").on("click", function () {
  $(this).addClass("active").siblings("[data-tab]").removeClass("active");
  $(this)
    .siblings("[data-content=" + $(this).data("tab") + "]")
    .addClass("active")
    .siblings("[data-content]")
    .removeClass("active");
  $(".slider-best-deals").slick("refresh");
});

//sliders
$(".slider-best-deals").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  prevArrow: "<img src='./img/arrow-left.svg' class='prev' alt='prev'>",
  nextArrow: "<img src='./img/arrow-right.svg' class='next' alt='next'>",
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
});

$(".slider-reviews").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  prevArrow: "<img src='./img/arrow-left.svg' class='prev' alt='prev'>",
  nextArrow: "<img src='./img/arrow-right.svg' class='next' alt='next'>",
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});

$(".slider-card").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: "<img src='./img/arrow-left.svg' class='prev' alt='prev'>",
  nextArrow: "<img src='./img/arrow-right.svg' class='next' alt='next'>",
  dots: true,
});

$(".slider-documents").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  prevArrow: "<img src='./img/arrow-left.svg' class='prev' alt='prev'>",
  nextArrow: "<img src='./img/arrow-right.svg' class='next' alt='next'>",
  adaptiveHeight: true
});

// btn-ups
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height() * 0.5) {
      $("#scrollup").fadeIn();
    } else {
      $("#scrollup").fadeOut();
    }
  });

  $("#scrollup").click(function () {
    $("body,html").animate({ scrollTop: 0 }, 800);
  });
});

// accordion
$(".accordion__heading").click(function () {
  if ($(this).next().is(":hidden")) {
    $(".accordion__heading").removeClass("active");
    $(".accordion__content").slideUp(300);
  }
  $(this).toggleClass("active");
  $(this).next().slideToggle(300);
});

// input label
$(".inp").blur(function () {
  tmpval = $(this).val();
  if (tmpval == "") {
    $(this).addClass("empty");
    $(this).removeClass("not-empty");
  } else {
    $(this).addClass("not-empty");
    $(this).removeClass("empty");
  }
});

// input[file]
$("#file").change(function () {
  var fileResult = $(this).val().split("\\").pop();
  $(this).parent().find(".fileLoad").find("input").val(fileResult);
  $(".fileLoad").show();

  if (fileResult) {
    $(".icon-del-photo").click(function () {
      $(".fileLoad").hide();
    });
  }
});

// select sort
$(".select__default").click(function () {
  $(this).parent().toggleClass("active");
  $(".select__list").slideToggle(300);
});

$(".select__list li").click(function () {
  var currentele = $(this).html();
  $(".select__default li").html(currentele);
  $(this).parents(".select__wrap").removeClass("active");
  $(".select__list").slideToggle(300);
});

// filters
$(".filters__heading").click(function () {
  $(this).next().slideToggle(300);
});

// modal
$(".open-modal-1").click(function () {
  $(".modal.reserve, .overlay").show();
});
$(".open-modal-2").click(function () {
  $(".modal.price-changes, .overlay").show();
});
$(".overlay, .close-modal").click(function () {
  $(".modal, .overlay").hide();
});

// price
$(".price__item").click(function (e) {
  e.preventDefault();
  if ($(".price__item").hasClass("selected")) {
    $(".price__item").removeClass("selected");
  }
  $(this).toggleClass("selected");
});

// sort-control
$(".del-item").click(function () {
  var id = $(this).attr("data-id");
  $("[data-id=" + id + "]").remove();
});

$(".sort-reset").click(function () {
  $(".sort-control__list .item").remove();
  $(".compare-col:not(.main-col)").remove();
});

jQuery(".hidden-block").scrollbar({
  autoScrollSize: false,
  scrollx: $(".external-scroll_x"),
});

// slider-range
$("#slider-range").slider({
  range: true,
  orientation: "horizontal",
  min: 0,
  max: 10000,
  values: [0, 10000],
  step: 100,

  slide: function (event, ui) {
    if (ui.values[0] == ui.values[1]) {
      return false;
    }

    $("#min_price").val(ui.values[0]);
    $("#max_price").val(ui.values[1]);
  },
});

//maps
function initMap() {
  const position1 = { lat: 55.771345260087486, lng: 37.62279636530492 };
  const map1 = new google.maps.Map(document.getElementById("map-1"), {
    center: position1,
    zoom: 14,
    mapId: "c2cc7820e9334a3c"
  });

  const marker1 = new google.maps.Marker({
    position: position1,
    map: map1,
    icon: "./img/marker.svg"
  });

  const position2 = { lat: 55.771345260087486, lng: 37.62279636530492 };
  const map2 = new google.maps.Map(document.getElementById("map-2"), {
    center: position2,
    zoom: 14,
    mapId: "c2cc7820e9334a3c"
  });

  const marker2 = new google.maps.Marker({
    position: position2,
    map: map2,
    icon: "./img/marker.svg"
  });
}