document.addEventListener("DOMContentLoaded", () => {
  /** MAIN SLIDER initialization */
  new Swiper(".slider", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /** LEADERS OF SELL */
  new Swiper(".leaders-slider", {
    navigation: {
      nextEl: ".leaders-button-next",
      prevEl: ".leaders-button-prev",
    },
    pagination: {
      el: ".leaders-pagination",
      clickable: true,
    },
    slidesPerView: 5,
    spaceBetween: 10,
    breakpoints: {
      360: {
        slidesPerView: 1,
      },
      370: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });

  /** REVIEWS */
  new Swiper(".review-slider", {
    pagination: {
      el: ".review-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".review-button-next",
      prevEl: ".review-button-prev",
    },
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      360: {
        slidesPerView: 1,
      },
      765: {
        slidesPerView: 2,
      },
      1120: {
        slidesPerView: 3,
      },
    },
  });
});
