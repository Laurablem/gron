

function autoType(elementClass, typingSpeed){
  var thhis = jQuery(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block"
  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },1500);
}


jQuery(document).ready(function($){
  var typespeed = $('body').attr('data-typespeed');
  //Letter typing on frontpage
  autoType(".type-js",typespeed);

  setTimeout(function(){
    $('.shapes').css('height',$('body').height());
  },500);

  if($('body').hasClass('animation')){
    setTimeout(function(){
      $('.shapes').css('height',$('body').height());
    },7500);
  }
  if($('.flick-it').length>0)
  {
    $slider = $('.flick-it').flickity({
      pageDots: false,
      imagesLoaded: true
    });
  }
  


  window.addEventListener('resize', function(event) {
    $('.shapes').css('height',$('body').height());
  }, true); 

  //Parallax
  // $('.parallax').each(function(){
  //   $(this).mousemove(function(e){
  //     var rect = e.target.getBoundingClientRect();
  //     const xCenter = (rect.left + rect.right) / 2;
  //     const yCenter = (rect.top + rect.bottom) / 2;
  //     var x = -(e.clientX - xCenter) / 5; 
  //     var y = -(e.clientY - yCenter) / 5;
  //     var xImage = -(e.clientX - xCenter) / 5.5; 
  //     var yImage = -(e.clientY - yCenter) / 5.5;
  //     $(this).children('.parallax__border').css({
  //       'top': y+'px',
  //       'left': x+'px' 
  //     });
  //     $(this).children('.parallax__image').css({
  //       'top': yImage+'px',
  //       'left': xImage+'px' 
  //     });
  //   });
  // });

  function setAriaLabelsOnFlickity(){
    var prevButton = document.querySelector('.flickity-button.previous');
    var nextButton = document.querySelector('.flickity-button.next');
    if (prevButton) {
      prevButton.setAttribute('aria-label', 'Forrige');
    }
    if (nextButton) {
      nextButton.setAttribute('aria-label', 'Næste');
    }
  }

  //Flickity Sliders
  if($('.newsslider').length>0){
    $('.newsslider-items').each(function(){
      var $newsslider = new Flickity('.newsslider-items', {
        cellAlign: 'left',
        pageDots: false,
        prevNextButtons: false,
      });
      // Custom Prev/Next buttons (for web accessibility placement)
      var prevButton = document.querySelector('.newsslider-nav-prev');
      var nextButton = document.querySelector('.newsslider-nav-next');
      prevButton.addEventListener('click', () => $newsslider.previous());
      nextButton.addEventListener('click', () => $newsslider.next());
      $newsslider.on('change', function(index) {
        prevButton.disabled = (index === 0);
        nextButton.disabled = (index === $newsslider.slides.length - 1);
      });
      prevButton.disabled = ($newsslider.selectedIndex === 0);
      nextButton.disabled = ($newsslider.selectedIndex === $newsslider.slides.length - 1);
    });
  }

  //Img gallery component
  if($('.component_img-gallery').length>0){
    var $imggallery = $('.component_img-gallery').flickity({
      // options
      pageDots: false,
      wrapAround: true,
      imagesLoaded: true,
    });
    setAriaLabelsOnFlickity();
  }

  if($('.component_img-gallery-intext').length>0){
    var $imggallery = $('.component_img-gallery-intext').flickity({
      // options
      pageDots: false,
      wrapAround: true,
      imagesLoaded: true
    });
    setAriaLabelsOnFlickity();
  }

  if($('.gallerybox').length>0){
    var $timegallery = $('.gallerybox').flickity({
      // options
      pageDots: false,
      wrapAround: true,
      imagesLoaded: true,
      adaptiveHeight: true
    });
    setAriaLabelsOnFlickity();
  }

  

  //Ticker Slider
  if($('.ticker.run').length>0){
    // speed of ticker
    let tickerSpeed = 1;
    let flickity = null;
    let isPaused = false;
    const slideshowEl = document.querySelector('.ticker');

    // functions
    const update = () => {
        if (isPaused) return;
        if (flickity.slides) {
              flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
              flickity.selectedIndex = flickity.dragEndRestingSelect();
              flickity.updateSelectedSlide();
              flickity.settle(flickity.x);
        }
        window.requestAnimationFrame(update);
    };

    const pause = () => {
        isPaused = true;
    };

    const play = () => {
        if (isPaused) {
              isPaused = false;
              window.requestAnimationFrame(update);
        }
    };

    // create flickity instance
    flickity = new Flickity(slideshowEl, {
        cellAlign: 'left',
        setGallerySize: true,
        dragThreshold: 25,
        pageDots: false,
        prevNextButtons: false,
        autoPlay: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25
    });
    flickity.x = 0;

    // event listeners
    slideshowEl.addEventListener('mouseenter', pause, false);
    slideshowEl.addEventListener('focusin', pause, false);
    slideshowEl.addEventListener('mouseleave', play, false);
    slideshowEl.addEventListener('focusout', play, false);

    flickity.on('dragStart', () => {
        isPaused = true;
    });

    // start ticker
    update();

    // Pause button
    const pausePlayBtn = document.getElementById('pause-animation-button');
    const tickerEl = document.querySelector('.dakdak');
    const videoEl = document.querySelector('section.gk-frontpage-banner video');
    if(pausePlayBtn){
      pausePlayBtn.addEventListener('click', () => {
          if (isPaused) {
              play();
              tickerEl.style.animation = '';
              pausePlayBtn.classList.remove('ispaused');
              if (videoEl) {
                videoEl.play();
            }
          } else {
              pause();
              tickerEl.style.animation = 'none';
              pausePlayBtn.classList.add('ispaused');
              if (videoEl) {
                videoEl.pause();
              }
          }
      });
    }
  }


//Video Pause button
if($('.ticker.run').length==0){
  const pausePlayBtn = document.getElementById('pause-animation-button');
  let isVideoPaused = false;
  const videoEl = document.querySelector('section.gk-frontpage-banner video');
  const videoEl2 = document.querySelector('.article-topimage video');
  const videoEl3 = document.querySelector('.video-wrap video');
  const videoEl4 = document.querySelector('.vid__wrap video');

  if(pausePlayBtn){
    pausePlayBtn.addEventListener('click', () => {
        if (isVideoPaused) {
          pausePlayBtn.classList.remove('ispaused');
          isVideoPaused = false;
          if (videoEl) {
            videoEl.play();
          }
          if (videoEl2) {
            videoEl2.play();
          } 
          if (videoEl3) {
            videoEl3.play();
          }
          if (videoEl4) {
            videoEl4.play();
          }
        } else {
          pausePlayBtn.classList.add('ispaused');
          isVideoPaused = true;
          if (videoEl) {
            videoEl.pause();
          }
          if (videoEl2) {
            videoEl2.pause();
          }
          if (videoEl3) {
            videoEl3.pause();
          }
          if (videoEl4) {
            videoEl4.pause();
          }
        }
    });
  }
}

  //Image galleri on artist page
  if($('.image-gallery').length>0){
    console.log('test');
      $carousel = $('.image-gallery').flickity({
        // options
        cellAlign: 'left',
        pageDots: false,
        imagesLoaded: true
      });
      setAriaLabelsOnFlickity();
      setTimeout(function(){
        $carousel.flickity('resize')
      },3000);
  }


  if($('.image-gallery-triple').length>0){

      $carousel = $('.image-gallery-triple').flickity({
        // options
        cellAlign: 'left',
        pageDots: false,
        imagesLoaded: true,
        groupCells: true

      });
      setAriaLabelsOnFlickity();
      setTimeout(function(){
        $carousel.flickity('resize')
      },3000);
  }

  //Prevent download video
  $('.htmlvideo').bind('contextmenu',function() { return false; });


  //Burger Menu
  $('.nav__toggler.open').on('click',function(){
    $('body').addClass('nav-open');
    $('.nav-bg').addClass('active');
    $('.main-navigation').attr('aria-hidden', 'false');
    $('.main-navigation').css('display', 'flex');
    setTimeout(function(){
      $('.main-navigation').addClass('active');
    }, 100);
  });
  $('.nav__toggler.close').on('click',function(){
    $('body').removeClass('nav-open');
    $('.nav-bg').removeClass('active');
    $('.main-navigation').attr('aria-hidden', 'true');
    $('.main-navigation').removeClass('active');
    setTimeout(function(){
      $('.main-navigation').css('display','none');
    },1000);
  });


  //Play Btn on video - Single Artist
  if($('.play-btn').length>0){
    $('.play-btn').on('click',function(){
      var video = $(this).siblings('video').get(0);
      if(!$(this).hasClass('play') && !$(this).hasClass('playing')){
        video.pause();
        video.muted = false;
        video.currentTime = 0;
        video.play();
        $(this).toggleClass('play');
        $(this).toggleClass('is-playing');
      }
      else{
        $(this).siblings('video').get(0).paused ? $(this).siblings('video').get(0).play() : $(this).siblings('video').get(0).pause();
        $(this).toggleClass('is-playing');
      }
    });
  }

  //Autoplay video
  if($('.inline-video').length>0){
      var video = $(this).siblings("video");

      // Detect play/pause state of video and toggle
      if (video.get(0).paused) {
        video.get(0).play();
      } else {
        video.get(0).pause();
      }
      //$(this).siblings('video').get(0).paused ? $(this).siblings('video').get(0).play() : $(this).siblings('video').get(0).pause();
  }

  //Animations

  //Artist name - Single Artist
  if($('.page-artist').length>0){
    reveal($('.page-artist .title-wrap h1'),650);
  }

  if($('.artists-overview').length>0){
    reveal($('.artists-overview .title-wrap h1'),650);
  }

  function reveal(e, timer){
    var element = e[0];
    setTimeout(function(element){
      $(e).addClass('reveal');
    },timer)
  }

  // GENERAL TOGGLE FUNCTION
  $('.toggle-button').on('click', function (e) {
    e.preventDefault();

    var wrapper = $(this).closest('.toggle-wrapper');
    var content = wrapper.find('.toggle-content').first();

    wrapper.toggleClass('active');
    content.slideToggle();
    var isOpen = wrapper.hasClass('active');

    if ($(this).attr('aria-expanded') !== undefined) {
      $(this).attr('aria-expanded', isOpen.toString());
    }

    if (content.attr('aria-hidden') !== undefined) {
      content.attr('aria-hidden', (!isOpen).toString());
    }
  });

  //Practical Info - component
  if($('.component.practical').length>0){
    $('.component.practical').each(function(){
      $('.info-group__item button',this).on('click',function(){
        $(this).children('.button').toggleClass('active');
        $(this).siblings('.text').slideToggle();
        $(this).attr('aria-expanded', function(index, attr){ return attr === 'false' ? 'true' : 'false'; });
        $(this).siblings('.text').attr('aria-hidden', function(index, attr){ return attr === 'false' ? 'true' : 'false'; });
      });
    });
  }

  //Background on icons
    $(window).scroll(function() {
      if ($(window).scrollTop() > 200) {
          $('.topright').addClass('highlight');
      }
      else {
        $('.topright').removeClass('highlight');
      }
  });

  //Open map
  console.log('before open map');
  $('.open-map').on('click',function(){
    console.log('open map');
    $('#map').css('visibility','visible');
    $('#map').attr('aria-hidden', 'false');
    setTimeout(function(){
      $('#map').addClass('active');
      trapFocusInPopup($('#map'));
    },100);
    //var myDiv = $("#map .viewer__wrap");
    //var scrollto = myDiv.offset().left + (myDiv.width() / 2);
    //myDiv.scrollLeft(scrollto);
    $('body').css('overflow','hidden');
  });
  if ((window.location.hash === "#map" || window.location.hash === "#kort") && $('#map').length ) {
    $('#map').css('visibility','visible');
    $('#map').addClass('active');
    $('#map').focus();
    trapFocusInPopup($('#map'));
    $('#map').attr('aria-hidden', 'false');
    //var myDiv = $("#map .viewer__wrap");
    //var scrollto = myDiv.offset().left + (myDiv.width() / 2);
    //myDiv.scrollLeft(scrollto);
    $('body').css('overflow','hidden');
  }
  $('.close__btn').on('click',function(){
    $('#map').removeClass('active');
    $('#map').attr('aria-hidden', 'true');
    $('.open-map').focus();
    setTimeout(function(){
      $('#map').css('visibility','hidden');
    },1000);
    $('body').css('overflow','visible');
  });
  $('#map .bg').on('click',function(){
    $('#map').removeClass('active');
    $('#map').attr('aria-hidden', 'true');
    $('.open-map').focus();
    setTimeout(function(){
      $('#map').css('visibility','hidden');
    },1000);
    $('body').css('overflow','visible');
  });


  $('.zoomin').on('click',function(){
    var zoomlevel = parseInt($('.viewer__wrap').attr('data-zoom'));
    if(zoomlevel<3){
      zoomlevel = zoomlevel + 1;
      $('.viewer__wrap').attr('data-zoom',zoomlevel);
      $('.zoomin').removeClass('inactive');
      $('.zoomout').removeClass('inactive');
    }
    if(zoomlevel==3){
      $('.zoomin').addClass('inactive');
    }
    
  });

  $('.zoomout').on('click',function(){
    var zoomlevel = parseInt($('.viewer__wrap').attr('data-zoom'));
    if(zoomlevel>1){
      zoomlevel = zoomlevel - 1;
      $('.viewer__wrap').attr('data-zoom',zoomlevel);
      $('.zoomout').removeClass('inactive');
      $('.zoomin').removeClass('inactive');
    }
    if(zoomlevel==1){
      $('.zoomout').addClass('inactive');
    }
  });



  //Trap focus in popup - general function for web accessibility
  function trapFocusInPopup($popup) {
    const focusableSelectors = `
      a[href], area[href], input:not([disabled]),
      select:not([disabled]), textarea:not([disabled]),
      button:not([disabled]), iframe, object, embed,
      [tabindex]:not([tabindex="-1"]), [contenteditable]
    `;
    
    const $focusableEls = $popup.find(focusableSelectors).filter(':visible');
    const firstEl = $focusableEls[0];
    const lastEl = $focusableEls[$focusableEls.length - 1];
  
    // Focus the first element in the popup
    firstEl?.focus();
  
    $popup.on('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    });
  }



  //Tickets
  $('.ticket-wrap .ticket').on('click',function(e){

    if(!$(e.target).hasClass('ticket__button')){
      $(this).parent().toggleClass('active').find('.ticket__description').slideToggle();
    }
  });

  //Countdown function
  if($('.timer').length>0){
    var time = $('.timer').attr('data-date');
    var countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      $('.timer .days .number').html(days);
      $('.timer .hours .number').html(hours);
      $('.timer .minutes .number').html(minutes);
      $('.timer .seconds .number').html(seconds);
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        $('.timer').remove();
      }
    }, 1000);
  }



  //BASM check cart
  setTimeout(function(){
    let cartcount = $('.basm_basket_count').html();
    if(cartcount!="0"){
      $('.basm_basket_btn').addClass('show');
    }
  },400);


  var mut = new MutationObserver(function(mutations, mut){
    let cartcount = $('.basm_basket_count').html();
    if(cartcount!="0"){
      $('.basm_basket_btn').addClass('show');
    }
    else{
      $('.basm_basket_btn').removeClass('show');
    }
  });

  if($('#basm').length>0){
    mut.observe(document.querySelector("#basm"),{
      'attributes': true
    });
  }

  //Font size changer
  $('.font-changer-toggle').on('click',function(){
    $('.biggerfont').toggleClass('flexdisplay');
    $('.smallerfont').toggleClass('flexdisplay');
    $('.biggerfont').attr('aria-hidden', function(index, attr){ return attr === 'false' ? 'true' : 'false'; });
    $('.smallerfont').attr('aria-hidden', function(index, attr){ return attr === 'false' ? 'true' : 'false'; });
  });
  $('.biggerfont').on('click',function(){
    if($('.page-article').hasClass('big-1')){
      $('.page-article').removeClass('big-1');
      $('.page-article').addClass('big-2');
    }
    else if($('.page-article').hasClass('big-2')){
      $('.page-article').removeClass('big-2');
      $('.page-article').addClass('big-3');
    }
    else if($('.page-article').hasClass('big-3')){
      $('.page-article').removeClass('big-3');
      $('.page-article').addClass('big-4');
      $(this).addClass('inactive');
    }
    else if($('.page-article').hasClass('smaller-3')){
      $('.page-article').removeClass('smaller-3');
      $('.page-article').addClass('smaller-2');
      $('.smallerfont').removeClass('inactive');
    }
    else if($('.page-article').hasClass('smaller-2')){
      $('.page-article').removeClass('smaller-2');
      $('.page-article').addClass('smaller-1');
    }
    else if($('.page-article').hasClass('smaller-1')){
      $('.page-article').removeClass('smaller-1');
    }
    else{
      $('.page-article').addClass('big-1');
    }

  });
  $('.smallerfont').on('click',function(){
    if($('.page-article').hasClass('smaller-1')){
      $('.page-article').removeClass('smaller-1');
      $('.page-article').addClass('smaller-2');
    }
    else if($('.page-article').hasClass('smaller-2')){
      $('.page-article').removeClass('smaller-2');
      $('.page-article').addClass('smaller-3');
      $(this).addClass('inactive');
    }
    else if($('.page-article').hasClass('big-1')){
      $('.page-article').removeClass('big-1');
    }
    else if($('.page-article').hasClass('big-2')){
      $('.page-article').removeClass('big-2');
      $('.page-article').addClass('big-1');
    }
    else if($('.page-article').hasClass('big-3')){
      $('.page-article').removeClass('big-3');
      $('.page-article').addClass('big-2');
    }
    else if($('.page-article').hasClass('big-4')){
      $('.page-article').removeClass('big-4');
      $('.biggerfont').removeClass('inactive');
      $('.page-article').addClass('big-3');
    }
    else{
      $('.page-article').addClass('smaller-1');
    }

  });

  

  //Drag scroll map
  if($('#grabscroll').length>0){
      const ele = document.getElementById('grabscroll');
      ele.style.cursor = 'grab';

      let pos = { top: 0, left: 0, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
          ele.style.cursor = 'grabbing';
          ele.style.userSelect = 'none';

          pos = {
              left: ele.scrollLeft,
              top: ele.scrollTop,
              // Get the current mouse position
              x: e.clientX,
              y: e.clientY,
          };

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
          // How far the mouse has been moved
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;

          // Scroll the element
          ele.scrollTop = pos.top - dy;
          ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
          ele.style.cursor = 'grab';
          ele.style.removeProperty('user-select');

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener('mousedown', mouseDownHandler);
    }


    $('.component.practical .info-title').on('click',function(){
      if($(this).closest('.info-group').hasClass('active')){
        $('.component.practical .info-group.active').removeClass('active');
        $(this).attr('aria-expanded', 'false');
        $(this).closest('.info-group').find('.info-group__item').attr('aria-hidden', 'true');
      }
      else{
        $('.component.practical .info-group.active').removeClass('active');
        $(this).closest('.info-group').toggleClass('active');
        $(this).attr('aria-expanded', 'true');
        $(this).closest('.info-group').find('.info-group__item').attr('aria-hidden', 'false');
      }
    });


    //Timeline
    $('.timeline_transparent img').addClass('loaded');
    $('.page-timeline h1').addClass('loaded');
    $('.timeline_transparent img').addClass('loaded');

    if($('.rellax').length>0)
    {
      var rellax = new Rellax('.rellax', {
        center:true
      });
    }
    
    if($('.waypoint').length>0)
    {
      var waypoints = $('.waypoint').waypoint({
        handler: function(direction) {
          $(this.element).addClass('pow');
        }, 
        offset: '50%'      
      });
    }

    $('.page-timeline .vidbox video').each(function(){
      $(this).on('click',function(){
        if($(this).parent().hasClass('playing')){
          $(this).parent().removeClass('playing');
        $(this)[0].pause();
        }
        else{
          $(this).parent().addClass('playing');
          $(this)[0].play();
        }
        
      });
    });
    

});

function destroySlider(){
  if (!$slider || typeof $slider.data('flickity') === 'undefined') return;
  $slider.off('scroll.flickity').flickity('destroy');
}
function initSlider(){
  if (!$('.slider').length) return;
  destroySlider();
  $slider = $('.slider').flickity();
  setAriaLabelsOnFlickity();
}

jQuery(document).on('page:change', function() {
  initSlider();
});
jQuery(document).on('page:unload', function() {
  destroySlider();
});




document.addEventListener("DOMContentLoaded", function () {

  // PURCHASE BUTTONS: GIVE BASM OVERLAY FOCUS WHEN CLICKED (WEB ACCESSIBILITY)
  const ticketButtons = document.querySelectorAll(".ticket__button.basm");
  if(ticketButtons.length>0){
    ticketButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Wait a tick to let the iframe become visible
        setTimeout(() => {
          const iframeContainer = document.getElementById("basm");
          const iframe = document.getElementById("basmframe");
          if (iframeContainer && iframe) {
            if (!iframeContainer.classList.contains("hidden")) {
              iframe.setAttribute("tabindex", "-1");
              iframe.focus();
            }
          }
        }, 100); // Delay slightly in case rendering takes time
      });
    });
  }

  // PURCHASE BUTTONS: GIVE BASM OVERLAY FOCUS WHEN CLICKED (WEB ACCESSIBILITY)
  const basketButton = document.querySelector(".basm_basket_btn.basm");
  if(basketButton){
  basketButton.addEventListener("click", () => {
    setTimeout(() => {
      const iframeContainer = document.getElementById("basm");
      const iframe = document.getElementById("basmframe");
      if (iframeContainer && iframe) {
        if (!iframeContainer.classList.contains("hidden")) {
          iframe.setAttribute("tabindex", "-1");
          iframe.focus();
        }
      }
      }, 100);
    });
  }

  // PROFILE BUTTON: GIVE BASM OVERLAY FOCUS WHEN CLICKED (WEB ACCESSIBILITY)
  const profileButton = document.querySelector(".basm_profile_btn.basm");
  if(profileButton){
    profileButton.addEventListener("click", () => {
      setTimeout(() => {
        const iframeContainer = document.getElementById("basm");
        const iframe = document.getElementById("basmframe");
        if (iframeContainer && iframe) {
          if (!iframeContainer.classList.contains("hidden")) {
            iframe.setAttribute("tabindex", "-1");
            iframe.focus();
          }
        }
      }, 100);
    });
  }

});
// Funktion til at måle submenu højder
function measureSubmenuHeights() {
  jQuery('.menu-item-has-children').each(function(e){
    let submenu = jQuery(this).children('.sub-menu')[0];
    if (submenu && !submenu.dataset.height) {
      let $submenu = jQuery(submenu);
      
      // Gem original classes og styles
      let hadActiveClass = $submenu.hasClass('active');
      let originalStyles = {
        opacity: $submenu.css('opacity'),
        visibility: $submenu.css('visibility'),
        position: $submenu.css('position'),
        maxHeight: $submenu.css('max-height'),
        overflow: $submenu.css('overflow'),
        padding: $submenu.css('padding'),
        height: $submenu.css('height'),
        display: $submenu.css('display')
      };
      
      // Midlertidigt gør submenu fuldt synlig og fjern alle begrænsninger (Safari fix)
      // Brug absolute positioning udenfor viewporten i stedet for visibility: hidden
      $submenu.css({
        'opacity': '1',
        'visibility': 'visible',
        'position': 'absolute',
        'left': '-9999px',
        'top': '0',
        'max-height': 'none',
        'height': 'auto',
        'overflow': 'visible',
        'padding': '10px 0', // Brug standard padding fra CSS
        'display': 'block',
        'width': '200px' // Giv et fast width så Safari kan beregne højden
      });
      
      // Force reflow i Safari - læs flere properties for at tvinge layout recalculation
      void submenu.offsetHeight;
      void submenu.offsetWidth;
      void submenu.scrollHeight;
      
      // Få højden - prøv flere metoder for Safari kompatibilitet
      let height = submenu.scrollHeight || 
                   submenu.offsetHeight || 
                   submenu.getBoundingClientRect().height ||
                   $submenu.outerHeight(true) || 
                   $submenu.height();
      
      // Hvis højden stadig er 0 eller 1, prøv at måle børnene direkte
      if (height <= 1) {
        let totalHeight = 0;
        $submenu.children().each(function() {
          let $child = jQuery(this);
          totalHeight += $child.outerHeight(true);
        });
        // Tilføj padding hvis vi måler børnene
        if (totalHeight > 0) {
          height = totalHeight + 20; // 10px top + 10px bottom padding
        }
      }
      
      // Gendan original styles
      // VIGTIGT: Sæt height til 0px så CSS kan animere den når active class tilføjes
      $submenu.css({
        'opacity': originalStyles.opacity || '',
        'visibility': originalStyles.visibility || '',
        'position': originalStyles.position || '',
        'left': '',
        'top': '',
        'height': '0px', // Sæt til 0px så animation kan starte fra 0
        'overflow': originalStyles.overflow || '',
        'padding': originalStyles.padding || '',
        'display': originalStyles.display || '',
        'width': ''
      });
      
      // Gendan active class hvis den var der
      if (hadActiveClass) {
        $submenu.addClass('active');
      }
      
      // Sæt data-height som string (dataset forventer string)
      if (height && height > 0) {
        submenu.dataset.height = String(height);
      }
    }
  });
}

// Mål højder når navigationen åbnes første gang
jQuery(document).ready(function($) {
  let heightsMeasured = false;
  
  $('.nav__toggler.open').on('click', function() {
    if (!heightsMeasured) {
      // Vent lidt så navigationen er fuldt synlig
      setTimeout(function() {
        measureSubmenuHeights();
        heightsMeasured = true;
      }, 200);
    }
  });
  
  // Prøv også at måle ved page load hvis navigationen allerede er synlig (usandsynligt men sikkerhed)
  if ($('.main-navigation').css('display') !== 'none') {
    setTimeout(measureSubmenuHeights, 100);
  }
});
// Accordion menu - click handler for at toggle submenu
jQuery('.menu-item-has-children > a').on('click', function(e) {
  e.preventDefault();
  let $link = jQuery(this);
  let $menuItem = $link.parent('.menu-item-has-children');
  let $submenu = $menuItem.find('.sub-menu');
  let isOpen = $submenu.hasClass('active');
  
  // Hvis data-height ikke er sat endnu, måle den først
  if (!isOpen && !$submenu[0]?.dataset?.height) {
    measureSubmenuHeights();
    // Force reflow efter måling
    void $submenu[0].offsetHeight;
  }
  
  // Luk alle andre submenus først (accordion - kun én åben ad gangen)
  jQuery('.menu-item-has-children').not($menuItem).each(function() {
    let $otherSubmenu = jQuery(this).find('.sub-menu');
    let $otherLink = jQuery(this).find('> a');
    if ($otherSubmenu.hasClass('active')) {
      // Animer height til 0
      $otherSubmenu.css('height', '0px');
      setTimeout(function() {
        $otherSubmenu.removeClass('active');
        $otherLink.removeClass('active');
        $otherSubmenu.css('height', ''); // Fjern inline height
      }, 300);
    }
  });
  
  // Toggle current submenu
  if (isOpen) {
    // Luk submenu - animer height til 0
    $submenu.css('height', '0px');
    // Vent på animation før vi fjerner active class
    setTimeout(function() {
      $submenu.removeClass('active');
      $link.removeClass('active');
      $submenu.css('height', ''); // Fjern inline height så CSS kan tage over
    }, 300); // Match transition tid fra CSS
  } else {
    // Brug data-height hvis den er målt
    let submenuEl = $submenu[0];
    let measuredHeight = submenuEl?.dataset?.height;
    
    // Hvis data-height ikke er sat eller er 0, måle den først
    if (!measuredHeight || parseInt(measuredHeight, 10) <= 0) {
      measureSubmenuHeights();
      // Læs height igen efter måling
      measuredHeight = submenuEl?.dataset?.height;
    }
    
    if (measuredHeight) {
      let heightNum = parseInt(measuredHeight, 10);
      if (heightNum > 0) {
        // Sæt height til 0 først, så vi kan animere fra 0 til målt højde
        $submenu.css('height', '0px');
        $submenu.addClass('active');
        $link.addClass('active');
        
        // Force reflow
        void submenuEl.offsetHeight;
        
        // Animer til den målte højde
        $submenu.css('height', heightNum + 'px');
      } else {
        // Fallback: brug CSS transition
        $submenu.addClass('active');
        $link.addClass('active');
      }
    } else {
      // Fallback: brug CSS transition
      $submenu.addClass('active');
      $link.addClass('active');
    }
  }
});

// Scroll spy for inpage navigation
jQuery(document).ready(function($) {
  const $inpageNav = $('.inpage-navigation');
  const $navItems = $('.inpage-navigation-item');
  
  // Smooth scroll for anchor links i inpage navigation
  $('.inpage-navigation-item a[href^="#"]').on('click', function(e) {
    const href = $(this).attr('href');
    if (href && href !== '#') {
      e.preventDefault();
      const targetId = href.substring(href.indexOf('#') + 1);
      const $target = $('#' + targetId);
      
      if ($target.length > 0) {
        // Få navigation højde for offset
        const navHeight = $inpageNav.outerHeight() || 0;
        const targetOffset = $target.offset().top - navHeight - 20; // 20px ekstra padding
        
        $('html, body').animate({
          scrollTop: targetOffset
        }, 600, 'swing');
      }
    }
  });
  
  if ($inpageNav.length > 0 && $navItems.length > 0) {
    // Funktion til at opdatere active state
    function updateActiveNavItem() {
      // Få inpage-navigation's højde som offset
      const navHeight = $inpageNav.outerHeight() || 0;
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
      // Offset = scroll position + navigation højde + lidt ekstra padding
      const offset = scrollOffset + navHeight + 40;
      
      let currentActive = null;
      let currentTop = -Infinity;
      
      // Gennemgå alle navigation items fra top til bund
      $navItems.each(function() {
        const $item = $(this);
        const $link = $item.find('a');
        const href = $link.attr('href');
        
        // Tjek om det er en hash link
        if (href && href.indexOf('#') !== -1) {
          const targetId = href.substring(href.indexOf('#') + 1);
          const $target = $('#' + targetId);
          
          if ($target.length > 0) {
            const targetTop = $target.offset().top;
            
            // Hvis target er over offset, og det er det højeste target vi har set
            if (targetTop <= offset && targetTop > currentTop) {
              currentTop = targetTop;
              currentActive = $item;
            }
          }
        }
      });
      
      // Opdater active classes
      $navItems.removeClass('active');
      if (currentActive) {
        currentActive.addClass('active');
      } else {
        // Hvis vi er helt i toppen, marker det første item
        if (scrollOffset < 100) {
          $navItems.first().addClass('active');
        }
      }
    }
    
    // Kør ved scroll (throttled)
    let scrollTimeout;
    $(window).on('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveNavItem, 50);
    });
    
    // Kør ved page load
    updateActiveNavItem();
    
    // Kør også når siden er fuldt loaded
    $(window).on('load', function() {
      setTimeout(updateActiveNavItem, 100);
    });
    
    // Opdater også når window resize (hvis navigation højde ændres)
    $(window).on('resize', function() {
      setTimeout(updateActiveNavItem, 100);
    });
  }

  $('.inpage-toggler').on('click', function() {
    $('.inpage-navigation').toggleClass('mobile-active');
  });
  $('.inpage-navigation-item').on('click', function() {
    $('.inpage-navigation').removeClass('mobile-active');
  });
});