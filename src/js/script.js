const slides = document.querySelectorAll('.slider-content__item'),
  prev = document.querySelector('.header__btn-prev'),
  next = document.querySelector('.header__btn-next'),
  current = document.querySelector('#current'),
  total = document.querySelector('#total'),
  slidesWrapper = document.querySelector('.slider-content'),
  slidesField = document.querySelector('.slider-content__inner'),
  width = window.getComputedStyle(slidesWrapper).width;

console.log(width);

slidesField.style.cssText = `display:flex; transition:all 0.5s ease; width:${
  100 * slides.length
}%`;
slides.forEach((slide) => (slide.style.width = width));

let sliderIndex = 1;
let offset = 0;

showTotalNumberSlides(slides.length);
showCurrentSliderIndex(sliderIndex);

//Создаем навигацию по слайдам(dot`s)
const indicators = document.createElement('ul');
indicators.classList.add('carousel-indicators');
slidesWrapper.append(indicators);

const dots = []; //Создаём массив элементов, состоящий из элементов навигации

for (let i = 0; i < slides.length; i++) {
  let dot = document.createElement('li');
  dot.classList.add('dot');
  dot.setAttribute('data-slide-to', i + 1);
  indicators.append(dot);
  dots.push(dot);

  if (i == 0) {
    dot.style.opacity = 1;
  }
}

// Логика кнопок NEXT, PREV & DOTS
next.addEventListener('click', () => {
  offset = increaseOffset(offset);
  slidesField.style.transform = `translateX(-${offset}px)`;

  sliderIndex = increaseIndex(sliderIndex);
  showCurrentSliderIndex(sliderIndex);

  showActiveDots();
});

prev.addEventListener('click', () => {
  offset = decreaseOffset(offset);
  slidesField.style.transform = `translateX(-${offset}px)`;

  sliderIndex = decreaseIndex(sliderIndex);
  showCurrentSliderIndex(sliderIndex);

  showActiveDots();
});

dots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    let slideTo = e.target.getAttribute('data-slide-to');

    sliderIndex = slideTo;

    offset = +width.slice(0, -2) * (sliderIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;

    showActiveDots();
    showCurrentSliderIndex(sliderIndex);
  });
});

//=========================================All functions we need=========================================//
function showCurrentSliderIndex(index) {
  if (slides.length < 10) {
    current.textContent = `0${index}`;
  } else {
    current.textContent = index;
  }
}

function showTotalNumberSlides(totalNum) {
  if (slides.length < 10) {
    total.textContent = `/0${totalNum}`;
  } else {
    total.textContent = `/${totalNum}`;
  }
}

function increaseIndex(index) {
  console.log(index);
  if (index == slides.length) {
    return 1;
  } else {
    return ++index;
  }
}

function decreaseIndex(index) {
  if (index == 1) {
    return slides.length;
  } else {
    return --index;
  }
}

function increaseOffset(offset) {
  if (offset == +width.slice(0, -2) * (slides.length - 1)) {
    return 0;
  } else {
    return (offset += +width.slice(0, -2));
  }
}

function decreaseOffset(offset) {
  if (offset == 0) {
    return +width.slice(0, -2) * (slides.length - 1);
  } else {
    return (offset -= +width.slice(0, -2));
  }
}

function showActiveDots() {
  dots.forEach((dot) => {
    dot.style.opacity = '0.5';
  });
  dots[sliderIndex - 1].style.opacity = '1';
}
