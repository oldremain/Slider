const slides = document.querySelectorAll('.slider-content__item'),
  prev = document.querySelector('.header__btn-prev'),
  next = document.querySelector('.header__btn-next'),
  current = document.querySelector('#current'),
  total = document.querySelector('#total'),
  slidesWrapper = document.querySelector('.slider-content'),
  slidesField = document.querySelector('.slider-content__inner'),
  width = window.getComputedStyle(slidesWrapper).width;

slidesField.style.cssText = `display:flex; transition:all 0.5s ease; width:${
  100 * slides.length
}%`;
slides.forEach((slide) => (slide.style.width = width));

// console.log(slidesField.style.width);

let sliderIndex = 1;
let offset = 0;

if (slides.length < 10) {
  total.textContent = `/0${slides.length}`;
  current.textContent = `0${sliderIndex}`;
} else {
  total.textContent = `/${slides.length}`;
  current.textContent = sliderIndex;
}

next.addEventListener('click', () => {
  if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += +width.slice(0, width.length - 2);
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
});

prev.addEventListener('click', () => {
  if (offset == 0) {
    offset = +width.slice(0, width.length - 2) * (slides.length - 1);
  } else {
    offset -= +width.slice(0, width.length - 2);
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
});

//Старый код
// if (slides.length < 10) {
//   total.textContent = `/0${slides.length}`;
// } else {
//   total.textContent = `/${slides.length}`;
// }

// showSlides(sliderIndex);

// function showSlides(n) {
//   if (n > slides.length) {
//     sliderIndex = 1;
//   }

//   if (n < 1) {
//     sliderIndex = slides.length;
//   }

//   slides.forEach((item) => item.classList.add('hide'));
//   slides[sliderIndex - 1].classList.remove('hide');

//   if (sliderIndex < 10) {
//     current.textContent = `0${sliderIndex}`;
//   } else {
//     current.textContent = `${sliderIndex}`;
//   }
// }

// function plusSlides(n) {
//   showSlides((sliderIndex += n));
// }

// prev.addEventListener('click', () => {
//   plusSlides(-1);
//   console.log(sliderIndex);
// });
// next.addEventListener('click', () => {
//   plusSlides(1);
//   console.log(sliderIndex);
// });
