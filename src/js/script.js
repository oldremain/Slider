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

if (slides.length < 10) {
  total.textContent = `/0${slides.length}`;
  current.textContent = `0${sliderIndex}`;
} else {
  total.textContent = `/${slides.length}`;
  current.textContent = sliderIndex;
}

const indicators = document.createElement('ul');
indicators.classList.add('carousel-indicators');
slidesWrapper.append(indicators);

const dots = [];

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
next.addEventListener('click', () => {
  if (offset == +width.slice(0, -2) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += +width.slice(0, -2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (sliderIndex == slides.length) {
    sliderIndex = 1;
  } else {
    sliderIndex++;
  }

  if (slides.length < 10) {
    current.textContent = `0${sliderIndex}`;
  } else {
    current.textContent = sliderIndex;
  }

  dots.forEach((dot) => {
    dot.style.opacity = '0.5';
  });
  dots[sliderIndex - 1].style.opacity = '1';
});

prev.addEventListener('click', () => {
  if (offset == 0) {
    offset = +width.slice(0, -2) * (slides.length - 1);
  } else {
    offset -= +width.slice(0, -2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (sliderIndex == 1) {
    sliderIndex = slides.length;
  } else {
    sliderIndex--;
  }

  if (slides.length < 10) {
    current.textContent = `0${sliderIndex}`;
  } else {
    current.textContent = sliderIndex;
  }

  dots.forEach((dot) => {
    dot.style.opacity = '0.5';
  });
  dots[sliderIndex - 1].style.opacity = '1';
});

dots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    let slideTo = e.target.getAttribute('data-slide-to');

    sliderIndex = slideTo;

    offset = +width.slice(0, -2) * (sliderIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot) => {
      dot.style.opacity = '0.5';
    });
    dots[sliderIndex - 1].style.opacity = '1';

    if (slides.length < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }
  });
});
