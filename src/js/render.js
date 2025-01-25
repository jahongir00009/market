import { PRODUCTS, SLIDES, LEADER_PRODUCTS, REVIEWS } from "./mock.js";
import { render, Storage } from "./utils.js";

const popover = () => {
  const $popover = document.querySelector(".popover");
  const products = Storage.get("bookmarks") || [];
  $popover.innerHTML = "";

  if (products.length) {
    products.forEach((product) => {
      const $product = document.createElement("div");

      $product.innerHTML = `
        <div class="pop-product flex">
          <img src=${product.imgUrl} alt="product" />
          <div>
            <h1>${product.price} Руб</h1>
            <p>${product.title || "Диван"}</p>
          </div>
          <a href="#">
            <img style="width: 30px" src="../../public/icons/arrow-red.svg" alt="arrow-icon" />
          </a>
        </div>
      `;

      $popover.appendChild($product);
    });
  } else {
    $popover.innerHTML =
      "<h4 style='color: black; font-weight: bold'>Пусто</h4>";
  }
};

const swiperSlides = (slides) => {
  const $sliderWrapper = document.querySelector(".slider .swiper-wrapper");

  slides.forEach((slide) => {
    const $slide = document.createElement("div");
    $slide.setAttribute("class", "swiper-slide");

    $slide.innerHTML = `
      <img src=${slide.imgUrl} loading="lazy" alt="slider-img" />
      <div class="slider-content">
        <div>
          <h1>${slide.title}</h1>
          <p>${slide.text}</p>
        </div>
        <div class="bottom flex">
          <a href="#" class="flex">
            <img src="./public/icons/medal-star.svg" alt="medal-icon" />
            Официальный интернет-магазин
          </a>
          <a href="#" class="flex">
            <img src="./public/images/vivat.png" alt="vivat-logo" />
          </a>
        </div>
      </div>
    `;

    $sliderWrapper?.appendChild($slide);
  });
};

const products = (products) => {
  const $products = document.querySelector(".products");

  products.forEach((product) => {
    const $product = document.createElement("div");
    $product.setAttribute("class", "product");

    $product.innerHTML = `
        <a href=${product.link}><img class="arrow" src='../../public/icons/arrow-red.svg' alt="arrow-icon" /></a>
        <img class="product-img" src=${product.imgUrl} loading="lazy" alt="img" />
        <a href=${product.link}><h1>${product.title}</h1></a>
    `;

    $products?.appendChild($product);
  });
};

const leaderProducts = (products) => {
  const $products = document.querySelector(".leader-products");

  products.forEach((product, index) => {
    const $product = document.createElement("div");
    $product.setAttribute("class", "leader-product swiper-slide");

    $product.innerHTML = `
        <a href="#">
          <img
            width="161"
            height="75"
            src=${product.imgUrl}
            alt="product"
            loading="lazy"
          />
        </a>
        <h5>${product.price} ₽ <span class="old-price">48 990 ₽</span></h5>
        <p>${product.description}</p>
        <div class="stars flex">
          <img src="./public/icons/star.svg" alt="star" />
          <img src="./public/icons/star.svg" alt="star" />
          <img src="./public/icons/star.svg" alt="star" />
          <img src="./public/icons/star.svg" alt="star" />
          <img src="./public/icons/star.svg" alt="star" />
          <span>52</span>
        </div>
        <div class="deliver flex">
          <img src="./public/icons/bus.svg" alt="bus" />
          <p>Быстрая доставка</p>
        </div>
        <div class="buttons">
          <div class="badge ${
            index === 3 || index === 7
              ? "new"
              : index % 2 === 0
              ? "top"
              : "sale"
          }
          ">
            <p style="color: white">${
              index === 3 || index === 7
                ? "НОВИНКА"
                : index % 2 === 0
                ? "ХИТ"
                : "-20%"
            }
            </p>
          </div>
          <svg
            class="like"
            data-id=${product.id}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
          >
            <path
              d="M10.6385 2.18508L11 2.56344L11.3615 2.18508C14.1419 -0.724821 19.0782 0.334257 20.8517 3.86034C21.723 5.59285 21.8418 7.97002 20.4217 10.8225C19.0212 13.6358 16.1244 16.9024 11 20.3961C5.87557 16.9027 2.97881 13.6363 1.57827 10.8231C0.15824 7.97068 0.276994 5.59346 1.14835 3.86086C2.92178 0.334556 7.85819 -0.724781 10.6385 2.18508Z"
              stroke="#D9D9D9"
            />
          </svg>
        </div>
      `;

    const $likeButton = $product.querySelector(".like");

    $likeButton.addEventListener("click", () => {
      const bookmarksBadge = document.querySelector(".bookmarks-badge");

      let temp = Storage.get("bookmarks") || [];
      let productIndex = temp.findIndex((_) => _.id == product.id);

      if (productIndex == -1) {
        temp.push(product);
        Storage.set("bookmarks", temp);
        bookmarksBadge.textContent = temp.length;

        Toastify({
          text: "Вы добавили товар в закладки",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#3BCD98",
          },
        }).showToast();
      } else {
        temp.splice(productIndex, 1);
        Storage.set("bookmarks", temp);
        bookmarksBadge.textContent = temp.length;

        Toastify({
          text: "Вы удалили товар из закладки.",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#FB3146",
          },
        }).showToast();
      }

      $likeButton.classList.toggle("liked");
      popover();
    });

    $products?.appendChild($product);
  });
};

const reviews = (reviews) => {
  const $reviewWrapper = document.querySelector(
    ".review-slider .swiper-wrapper"
  );

  reviews.forEach((review) => {
    const $review = document.createElement("div");
    $review.setAttribute("class", "swiper-slide card");

    $review.innerHTML = `
      <h1>${review.name}</h1>
      <span>Опубликовано ${review.created_date}</span>
      <div class="stars flex">
        <img src="./public/icons/star.svg" alt="star" />
        <img src="./public/icons/star.svg" alt="star" />
        <img src="./public/icons/star.svg" alt="star" />
        <img src="./public/icons/star.svg" alt="star" />
        <img src="./public/icons/star.svg" alt="star" />
      </div>
      <p>${review.text}</p>
      <div class="animated-images">
      ${review.images
        .map(
          (url) => `
      <a href="${url}">
        <img src="${url}" alt="review" loading="lazy" />
      </a>
    `
        )
        .join("")}
      </div>
    `;

    $reviewWrapper?.appendChild($review);
  });
};

export default {
  init: () => {
    render(swiperSlides, SLIDES);
    render(products, PRODUCTS);
    render(leaderProducts, LEADER_PRODUCTS);
    render(reviews, REVIEWS);
    popover();
  },
};
