'use strict';

(function () {

  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }


  window.addEventListener('DOMContentLoaded', function () {
    var goTopBtn = document.querySelector('.topcontrol__link');

    function trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = document.documentElement.clientHeight;

      if (scrolled > coords) {
        goTopBtn.classList.remove('topcontrol__link--hidden');
      }
      if (scrolled < coords) {
        goTopBtn.classList.add('topcontrol__link--hidden');
      }
    }

    function backToTop() {
      var scrollStep = window.pageYOffset / 40;
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -(scrollStep));
        setTimeout(backToTop, 0);
      }
    }

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);


    var links = document.querySelectorAll('a[href^="#"]');

    for (let link of links) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        var id = link.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    };


    const headerBtn = document.querySelector('.header__btn');
    const menuIcon = document.querySelector('.header__btn-icon');
    const menu = document.querySelector('.header__list');

    const headerLink = document.querySelectorAll('.header__link');

    headerBtn.onclick = function () {
      menuIcon.classList.toggle('header__btn-icon--active');
      menu.classList.toggle('header__list--active');
    };

    headerLink.forEach(function (item) {
      item.onclick = function () {
        menuIcon.classList.remove('header__btn-icon--active');
        menu.classList.remove('header__list--active');
      };
    });
  });
})();
