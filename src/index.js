import './scss/main.scss';
import './asset/img/logo.svg';
/* import './asset/img/photo-1.jpg';
import './asset/img/photo-2.jpg';
import './asset/img/photo-3.jpg';
import './asset/img/photo-4.jpg';
import './asset/img/photo-5.jpg';
import './asset/img/photo-6.jpg';
import './asset/img/photo-7.jpg';
import './asset/img/photo-8.jpg';
import './asset/img/photo-9.jpg';
import './asset/img/photo-10.jpg';
import './asset/img/photo-11.jpg';
import './asset/img/photo-12.jpg';
import './asset/img/photo-13.jpg';
import './asset/img/photo-14.jpg';
import './asset/img/photo-15.jpg';
import './asset/img/photo-16.jpg';
import './asset/img/photo-17.jpg';
import './asset/img/photo-18.jpg';
import './asset/img/photo-19.jpg';
import './asset/img/photo-20.jpg';
import './asset/img/photo-21.jpg';
import './asset/img/photo-22.jpg';
import './asset/img/photo-23.jpg';
import './asset/img/photo-24.jpg';
import './asset/img/photo-25.jpg';
import './asset/img/photo-26.jpg';
import './asset/img/photo-27.jpg';
import './asset/img/photo-28.jpg';
import './asset/img/photo-29.jpg';
import './asset/img/photo-30.jpg';
import './asset/img/photo-31.jpg';
import './asset/img/photo-32.jpg';
import './asset/img/photo-33.jpg';
import './asset/img/photo-34.jpg';
import './asset/img/photo-35.jpg';
import './asset/img/photo-36.jpg';
import './asset/img/photo-37.jpg';
import './asset/img/photo-38.jpg';
import './asset/img/photo-39.jpg';
import './asset/img/photo-40.jpg';

import './asset/img/boy-glasses-icon.png';
import './asset/img/girl-glasses-icon.png';
import './asset/img/example.jpg';
import './asset/img/galochkin-sergey.mp4';*/
//import './asset/img/video.mp4';
//import './asset/fonts/GT-Eesti-Pro-Display-Regular.woff2';

// Banner auto slider
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slider__item");
    const dotsContainer = document.querySelector('.slider__dots');
    let intervalID;
  
    function showSlide(n) {
      slideIndex = (n + slides.length) % slides.length;
  
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex].style.display = "flex";
  
      updateDots();
    }
  
    function nextSlide() {
      showSlide(++slideIndex);
    }
  
    function prevSlide() {
      showSlide(--slideIndex);
    }
  
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === slideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    function autoSlide() {
      nextSlide();
    }
  
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        showSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
  
    showSlide(slideIndex);
    intervalID = setInterval(autoSlide, 3000);
  });

// Photo slider
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    let intervalPhotoID;
    const slides = document.querySelectorAll(".photoslider__item");
    const sliderWrapper = document.querySelector(".photoslider__wrap");

    function showPhotoSlide(n) {
        currentSlide = (n + slides.length) % slides.length;

        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`; // сдвигаем контейнер со слайдами
    }

    function nextPhotoSlide() {
        showPhotoSlide(++currentSlide);
    }

    function prevPhotoSlide() {
        showPhotoSlide(--currentSlide);
    }

    function autoPhotoSlide() {
        nextPhotoSlide();
    }

    window.prevPhotoSlide = prevPhotoSlide;
    window.nextPhotoSlide = nextPhotoSlide;

    showPhotoSlide(currentSlide);
    intervalPhotoID = setInterval(autoPhotoSlide, 3000);
});



// cards
document.addEventListener("DOMContentLoaded", function() {
  // Проверяем, есть ли данные о карточках в локальном хранилище
  let savedCards = JSON.parse(localStorage.getItem("flippedCards")) || {};
  
  // Получаем все карточки на странице
  let cards = document.querySelectorAll('.congrats__card');
  
  // Проходимся по каждой карточке
  cards.forEach(function(card) {
    let cardId = card.id;
    let cardInner = card.querySelector('.congrats__card-wrap');
    let cardElName = card.querySelector('.congrats__name');
    let cardName = card.dataset.name;
    
    // Проверяем, была ли эта карточка открыта ранее
    if (savedCards[cardId]) {
      // Если да, то открываем карточку
      cardInner.style.transform = 'rotateY(180deg)';
      card.setAttribute('data-flipped', 'true');
      cardElName.innerText = cardName;
    }

    function openModal(videoPath, cardName) {
      let modal = document.getElementById('videoModal');
      let modalVideo = document.getElementById('videoCongrats');
      let closeButton = modal.querySelector('.close');
      let videoText = modal.querySelector('.video__text');

      modalVideo.src = videoPath;
      videoText.innerText = cardName;
      modal.style.display = 'block';
  
      closeButton.addEventListener('click', function() {
          modalVideo.pause(); 
          modal.style.display = 'none'; 
      });
  
      window.addEventListener('click', function(event) {
          if (event.target == modal) {
              modalVideo.pause(); 
              modal.style.display = 'none'; 
          }
      });
    }
    
    // Устанавливаем обработчик события клика на карточку
    card.addEventListener("click", function() {
      // При клике, проверяем, открыта ли уже карточка
      let flipped = card.getAttribute('data-flipped');
      let videoPath = card.dataset.video;
      
      if (flipped === 'false') {
        // Если карточка закрыта, открываем её и сохраняем информацию в локальном хранилище
        cardInner.style.transform = 'rotateY(180deg)';
        card.setAttribute('data-flipped', 'true');
        savedCards[cardId] = true;
        localStorage.setItem("flippedCards", JSON.stringify(savedCards));

        cardElName.innerText = cardName;

        setTimeout(function() {
          openModal(videoPath, cardName);
        }, 1000);
      } else {
        openModal(videoPath, cardName);
      }
    });
  });
});