$(document).ready(function() {
  //инициализация slick слайдера
  $(".js-slider").slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="slider__btn slider__prev-btn"><img src="img/left-arrow.svg" alt="Назад" /></button>',
    nextArrow: '<button type="button" class="slider__btn slider__next-btn"><img src="img/right-arrow.svg" alt="Вперед" /></button>'
  });
  //открытие закрытие меню
  let menuBtn = document.querySelector(".menu-btn-js");
  menuBtn.onclick= function () {
    document.querySelector(".menu").classList.toggle("menu_active");
    menuBtn.firstElementChild.classList.toggle("menu-btn__line_active");
    menuBtn.classList.toggle("menu-btn_active");
  }

  
  let textarea=document.querySelector(".js-textarea");

  textarea.addEventListener('keyup', function(){
    if(this.scrollTop > 0){
      this.style.height = this.scrollHeight + "px";
    }
  });
});