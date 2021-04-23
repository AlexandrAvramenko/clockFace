//header menu
// menu
$(".header__burger").click(function () {
  $(".header__menu-mobile").toggleClass("active");
  $(".header__menu-small").toggleClass("hidden");
  $(".header__logo-wrapper").toggleClass("hidden");
  $(this).toggleClass("active");
  // $("body").css("overflow-y","hidden")
});

//dropdown
$('.search').click(function () {
  $(this).toggleClass('active');
  $('.search-content').slideToggle(300);
  $('.overlay').fadeToggle(300);
});

$('.close__search-content').click(function () {
  $('.search').remove('active');
  $('.search-content').slideUp(300);
  $('.overlay').hide();
});

//.header__menu-mobile
$('.mobile-dropdown').click(function() {
  $('.mobile-dropdown').removeClass('active');
  if ($(this).next('.mobile-dropdown__content').css("display") == "none") {
    $('.mobile-dropdown__content').slideUp(300);
    $(this).next('.mobile-dropdown__content').slideToggle(300);
    $('.mobile-dropdown').removeClass('active');
    $(this).toggleClass('active');
  } else $('.mobile-dropdown__content').slideUp(300);
  return false;
});

//tabs
$('[data-tab]').on('click', function () {
  $(this).addClass('active').siblings('[data-tab]').removeClass('active')
  $(this).siblings('[data-content=' + $(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active')
  $('.slider-best-deals').slick('refresh')
})

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
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }
  ]
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
        slidesToShow: 2
      }
    }
  ]
});

$(".slider-card").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  prevArrow: "<img src='./img/arrow-left.svg' class='prev' alt='prev'>",
  nextArrow: "<img src='./img/arrow-right.svg' class='next' alt='next'>",
  dots: true,
});

// btn-up
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()*0.5) {
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
$('.accordion__heading').click(function () {
  if($(this).next().is(':hidden')) {
    $('.accordion__heading').removeClass('active');
    $('.accordion__content').slideUp(300);
  }
  $(this).toggleClass('active');
  $(this).next().slideToggle(300);
});

// input label
$('.inp').blur(function() {
  tmpval = $(this).val();
  if(tmpval == '') {
      $(this).addClass('empty');
      $(this).removeClass('not-empty');
  } else {
      $(this).addClass('not-empty');
      $(this).removeClass('empty');
  }
});

// input[file]
$('#file').change(function(){
	var fileResult = $(this).val().split('\\').pop();
	$(this).parent().find('.fileLoad').find('input').val(fileResult);
  $('.fileLoad').show()

  if (fileResult) {
    $('.icon-del-photo').click(function () {
      $('.fileLoad').hide()
    });
  }
});

// select sort
$(".select__default").click(function(){
  $(this).parent().toggleClass("active");
  $(".select__list").slideToggle(300)
})

$(".select__list li").click(function(){
  var currentele = $(this).html();
  $(".select__default li").html(currentele);
  $(this).parents(".select__wrap").removeClass("active");
  $(".select__list").slideToggle(300)
})

// filters
$('.filters__heading').click(function () {
  $(this).next().slideToggle(300);
});

$('.filters__close').click(function () {
  $('.filters__content').slideUp(300);
});

// modal
$(".open-modal").click(function() {
  $('.modal, .overlay').show();
});
$(".overlay, .close-modal").click(function() {
  $('.modal, .overlay').hide();
});

// price
$('.price__item').click(function(e) {
  e.preventDefault();
  if($('.price__item').hasClass('selected')) {
    $('.price__item').removeClass('selected')
  }
  $(this).toggleClass('selected')
})
