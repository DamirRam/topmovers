$(document).ready(function() {
  //closest
  !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
  
  //открытие закрытие меню
  let menuBtn = document.querySelector(".menu-btn-js");
  menuBtn.onclick= function () {
    document.querySelector(".menu").classList.toggle("menu_active");
    menuBtn.firstElementChild.classList.toggle("menu-btn__line_active");
    menuBtn.classList.toggle("menu-btn_active");
  }

  //плавная прокрутка до якоря
  $("a[href*='#']").on("click", function(e){
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top-190
    }, 777);
    e.preventDefault();
    return false;
  });

  //jquery masked input
  jQuery(function($){
     $("input[type='tel']").mask("+7(999) 999-99-99");
  });

  //инициализация slick слайдера
  $(".js-slider").slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="slider__btn slider__prev-btn"><img src="img/left-arrow.svg" alt="Назад" /></button>',
    nextArrow: '<button type="button" class="slider__btn slider__next-btn"><img src="img/right-arrow.svg" alt="Вперед" /></button>'
  });

  //модальные окна
  //отключение прокрутки при всплытии модального окна
  const body   = document.body;
  const header = document.querySelector("header");
  let offsetTop;

  function noScroll (modal) {
    offsetTop          = window.pageYOffset;
    let scrollBarWidth = window.innerWidth-body.offsetWidth;
    
    header.style.right = scrollBarWidth+"px";
    modal.style.overflowY ="scroll";
    body.style.overflowY = "hidden";
    body.style.top = "-"+offsetTop+"px";
    body.style.right = scrollBarWidth+"px";
    body.style.left = "0px";
    body.style.position = "fixed";
  };

  function scroll (modal) {
    let scrollBarWidth = window.innerWidth-body.offsetWidth;
    
    header.style.right = 0+"px";
    modal.style.overflowY="hidden"
    body.style.position = "static";
    body.style.right = "0px";
    body.style.overflowY ="scroll";
    window.scroll(0, offsetTop);

  };

  //throttle
  function throttle(fn, interval) {
    let lastTime;
    return function throttled() {
        let timeSinceLastExecution = Date.now() - lastTime;
        if(!lastTime || (timeSinceLastExecution >= interval)) {
            fn.apply(this, arguments);
            lastTime = Date.now();
        }
    };
};

  //открытие и закрытие модальных окон
  let openBtns   = document.querySelectorAll(".js-open-modal");
  let closeBtns  = document.querySelectorAll(".js-close-modal");
  let closeModal = document.querySelectorAll(".modal");
  let modalContent = document.querySelectorAll(".modal__content");
  let modalAnimationTime = 250;

  let animOpen = throttle(function animationOpen(time, modalObj) {
  let opacity = 0;

  let interval = setInterval (function (){
    modalObj.classList.add("modal_active");
    opacity += 0.04;
    modalObj.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(interval);
      modalObj.style.opacity = 1;
    }
  }, time/25);//end setInterval
}, modalAnimationTime);//end throttle

let animClose = throttle(function animationClose (time, modalObj) {
  let opacity = 1;

  let interval = setInterval (function () {
    opacity -= 0.04;
    modalObj.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(interval);
      modalObj.style.opacity = 0;
      modalObj.classList.remove("modal_active");
    };
  }, time/25);//end setInterval
}, modalAnimationTime);//end throttle

    for(let i=0; i<openBtns.length; i++){
        openBtns[i].addEventListener("click", function (event) {
          event.preventDefault();
          let modalId = this.getAttribute("data-modal");
          let modal   = document.querySelector(".modal[data-modal='"+modalId+"']");
          animOpen(modalAnimationTime, modal);
          noScroll(modal);
        });//end addEventListener
    };//end for

  for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      animClose(modalAnimationTime, modal);
      scroll(modal);
    });//end addEventListener
  };

  for(let i=0; i<closeModal.length; i++){
    closeModal[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      animClose(modalAnimationTime, modal);
      scroll(modal);
    }, false);//end addEventListener
  };

  for(let i=0; i<modalContent.length; i++){
    modalContent[i].addEventListener("click", function (event) {
      event.stopPropagation();
    });//end addEventListener
  };

  // отключение анимации кнопки internet explorer
  let buttons = document.querySelectorAll("button");
  for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function (event){
    event.preventDefault();
  });//end addEventListener
  }//end for



  let textarea=document.querySelector(".js-textarea");

  textarea.addEventListener('keyup', function(){
    if(this.scrollTop > 0){
      this.style.height = this.scrollHeight + "px";
    }
  });
});