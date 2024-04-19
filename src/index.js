import './scss/main.scss';
import './asset/img/logo.svg';

/*import './asset/img/boy-glasses-icon.png';
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
  let savedCards = JSON.parse(localStorage.getItem("flippedCards")) || {};
  
  let cards = document.querySelectorAll('.congrats__card');
  
  cards.forEach(function(card) {
    let cardId = card.id;
    let cardInner = card.querySelector('.congrats__card-wrap');
    let cardElName = card.querySelector('.congrats__name');
    let cardName = card.dataset.name;
    
    if (savedCards[cardId]) {
      cardInner.style.transform = 'rotateY(180deg)';
      card.setAttribute('data-flipped', 'true');
      cardElName.innerText = cardName;
    }

    function openModal(videoPath, cardName) {
    
      let modal = document.getElementById('videoModal');
      let modalVideo = document.getElementById('videoCongrats');
      let closeButton = modal.querySelector('.close');
      let videoText = modal.querySelector('.video__text');
      let body = document.body;
  
      modalVideo.src = videoPath;
      videoText.innerText = cardName;
      modal.style.display = 'block';
      
      body.style.overflow = 'hidden';
  
      closeButton.addEventListener('click', closeModal);
      
      modal.addEventListener('click', function(event) {
          if (event.target === modal) {
              closeModal();
          }
      });
  
      function closeModal() {
          modalVideo.pause(); 
          modal.style.display = 'none';
          body.style.overflow = 'auto';
      }
  
      modal.addEventListener('touchstart', function(event) {
          if (event.target === modal) {
              closeModal();
          }
      });
  
      modal.addEventListener('click', function(event) {
          if (event.target.classList.contains('modal-background')) {
              closeModal();
          }
      });
  }
    
    card.addEventListener("click", function() {
      let flipped = card.getAttribute('data-flipped');
      let videoPath = card.dataset.video;
      
      if (flipped === 'false') {
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