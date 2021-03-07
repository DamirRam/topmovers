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

  // отключение анимации кнопки internet explorer
  let buttons = document.querySelectorAll("button");
  for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function (event){
    event.preventDefault();
  });//end addEventListener
  }//end for

  //увеличение высоты textarea при заполнении текстом
  let textarea=document.querySelector(".js-textarea");

  textarea.addEventListener('keyup', function(){
    if(this.scrollTop > 0){
      this.style.height = this.scrollHeight + "px";
    }
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

  //открытие и закрытие модальных окон, анимация
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

  //стилизация тега select
  if ("ontouchstart" in document.documentElement&&screen.width<=768) {
  }else{
    let select     = document.querySelectorAll("select");

    for(let i=0;i<select.length;i++) {
        selectStyle(select[i]);
    }

    function selectStyle(select) {
      let option     = select.children;
      let divText    = document.createElement("span");
      let divSelect  = document.createElement("div");
      let divOptWrap = document.createElement("div");
      let divTextColor = window.getComputedStyle(select, null).getPropertyValue("color");
      let optionTextColor = window.getComputedStyle(select.lastElementChild, null).getPropertyValue("color");

      select.style.display="none";

      divSelect.setAttribute("class", select.getAttribute("class")+" select");
      divOptWrap.setAttribute("class", "select__wrap");
      divText.setAttribute("class","select__text");
      for(i=0;i<option.length;i++){
        if(option[i].hasAttribute("selected")){
          divText.innerHTML=option[i].innerHTML;
        }else{
          divText.innerHTML=option[0].innerHTML;
        }
        let spanOption = document.createElement("span");
        spanOption.setAttribute("class", "select__option");
        spanOption.innerHTML = option[i].innerHTML;
        if(i===0) {
          spanOption.setAttribute("data-option","first");
        }
        divOptWrap.appendChild(spanOption);
      }
      divSelect.appendChild(divText);
      divSelect.appendChild(divOptWrap);
      select.parentNode.appendChild(divSelect);

      divSelect.onclick=function(){
        let coordinats   = divSelect.getBoundingClientRect();
        let top          = coordinats.top;
        let bottom       = window.innerHeight-(coordinats.bottom-coordinats.top+coordinats.top);
        let headerHeight = document.querySelector(".js-header").offsetHeight;
        bottom = Number(bottom.toFixed(0));
        top    = Number(top.toFixed(0));
        if(top>=bottom) {
          divOptWrap.style.top = "";
          divOptWrap.style.bottom = coordinats.bottom-coordinats.top+1+"px";

          if(top-headerHeight-20>320){
            divOptWrap.style.height="320px";
          }else{
            divOptWrap.style.height = top-headerHeight-20+"px";
          }

        }else {
          divOptWrap.style.bottom = "";
          divOptWrap.style.top = coordinats.bottom-coordinats.top+1+"px";
          divOptWrap.style.height = bottom-20+"px";
        }
        divOptWrap.classList.toggle("select__wrap_active");
        if(!divOptWrap.classList.contains("select__wrap_active")){
          divOptWrap.style.height= "0px";
        }
        divSelect.classList.toggle("on");
      };
      divOptWrap.onclick=function(e){
        if(e.target === divOptWrap) {
          divText.innerHTML = divOptWrap.firstElementChild.innerHTML;
          divText.style.color = divTextColor;
        } else {
          divText.innerHTML = e.target.innerHTML;
            select.value    = e.target.innerHTML;
          if(e.target.hasAttribute("data-option", "first")){
            divText.style.color = divTextColor;
          } else {
            divText.style.color = optionTextColor;
          }
        }
      }
    }
  }

  //валидация данных формы
  let requestStatus = false;
  function validateForm (event) {
    let inputs    = event.target.querySelectorAll("[required]");

    for(let i=0; i<inputs.length; i++) {

      if(inputs[i].value === "") {

        inputs[i].addEventListener ("change", function changeInput(event) {
        inputs[i].removeEventListener("change", changeInput);
          if(event.target.classList.contains("input_error")) {
            event.target.classList.remove("input_error");
          }
        });

        inputs[i].classList.add("input_error");
        if(inputs[i].classList.contains("js-select-one")) {

          let divSelect  = event.target.querySelector("div.js-select-one");
          let selectWrap = divSelect.querySelector(".select__wrap");

          divSelect.classList.add("input_error");

          selectWrap.addEventListener("click", function click(event) {

            if(event.target.hasAttribute("data-option","first")) {
            }else {
              selectWrap.removeEventListener("click", click);
              if(divSelect.classList.contains("input_error")) {
                divSelect.classList.remove("input_error");
              }
            }
          });
        }
        if(inputs[i].classList.contains("js-select-two")) {
          let divSelect = event.target.querySelector("div.js-select-two");
          let selectWrap = divSelect.querySelector(".select__wrap");

          divSelect.classList.add("input_error");

          selectWrap.addEventListener("click", function click(event) {
            if(event.target.hasAttribute("data-option","first")) {
            }else {
              selectWrap.removeEventListener("click", click);
              if(divSelect.classList.contains("input_error")) {
                divSelect.classList.remove("input_error");
              }
            }
          });
        }
      }
    }
    for(let i=0;i<inputs.length;i++) {
      if(inputs[i].value===""){
        return false;
      }
    }
    if(requestStatus === false) {
      ajaxPostHelp(event);
      requestStatus = true;
    }
  }

  //отправка форм на сервер
  function ajaxPost(params, form) {
    let request = new XMLHttpRequest ();

    let button          = form.querySelector("button");
    let buttonText      = button.innerHTML;

    button.innerHTML="отправка..."
    request.onreadystatechange = function () {
      if(request.readyState == 4 && request.status ==200) {

      if(form.classList.contains("modal-form") === true) {
      let modal = form.closest(".modal");
      animClose(modalAnimationTime, modal);
      scroll(form.closest(".modal"));
      }

      setTimeout(function () {
        let modal   = document.querySelector(".modal[data-modal='thanks']");
        animOpen(modalAnimationTime, modal);
        noScroll(modal);
      },500);

      button.innerHTML = buttonText;
      
      form.querySelector("input[name=user_name]").value = "";
      form.querySelector("input[name=user_phone]").value = "";

      if (form.classList.contains("js-cost-form") === true) {
        userEmail   = form.querySelector("input[name=user_email]").value = "";
        countryFrom = form.querySelector("select[name=country_from]").value = "";
        countryTo    = form.querySelector("select[name=country_to]").value = "";
        townFrom    = form.querySelector("input[name=town_from]").value = "";
        townTo      = form.querySelector("input[name=town_to]").value = "";
        weight      = form.querySelector("input[name=weight]").value = "";
        userComment = form.querySelector("textarea[name=user_comment]").value = "";
        }
        requestStatus = false;
      }
      request.onerror = function () {
        if (request.status != 200) {
          button.innerHTML = "ошибка отправки";
          button.classList.add("button_error");
          setTimeout(function (){
          button.innerHTML = buttonText;
          button.classList.remove("button_error");
          requestStatus = false;
          }, 1500);
        }
      }
    }

    request.open("POST" ,"mailer/mail.php");
    request.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
    request.send(params);
  }//end ajaxPost function

  let forms = document.querySelectorAll("form");
  for(let i=0; i<forms.length; i++) {
    forms[i].setAttribute("novalidate","");
    forms[i].addEventListener("submit", function formSubmit(event) {
      event.preventDefault();

      validateForm(event);
    });//end addEventListener
    }//end for

  //получение данных из формы для отправки
  function ajaxPostHelp(event) {
    let form        = event.target;
    let userName    = form.querySelector("input[name=user_name]").value;
    let userPhone   = form.querySelector("input[name=user_phone]").value;
    let userEmail   = "";
    let countryFrom = "";
    let countryTo   = "";
    let townFrom    = "";
    let townTo      = "";
    let weight      = "";
    let userComment = "";
    let params      = "";

    if (form.classList.contains("js-cost-form") === true) {
      userEmail   = form.querySelector("input[name=user_email]").value;
      countryFrom = form.querySelector("select[name=country_from]").value;
      countryTo    = form.querySelector("select[name=country_to]").value;
      townFrom    = form.querySelector("input[name=town_from]").value;
      townTo      = form.querySelector("input[name=town_to]").value;
      weight      = form.querySelector("input[name=weight]").value;
      userComment = form.querySelector("textarea[name=user_comment]").value;
    }

    params = "user_name="+userName+"&"+"user_phone="+userPhone+"&"+"user_email="+userEmail
    +"&"+"country_from="+countryFrom+"&"+"country_to="+countryTo+"&"+"town_from="+townFrom
    +"&"+"town_to="+townTo+"&"+"weight="+weight+"&"+"user_comment="+userComment;

    ajaxPost(params, form);

  }
});