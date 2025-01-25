import { Storage } from "./utils.js";
import App from "./render.js";
import "./swiper.js";

document.addEventListener("DOMContentLoaded", () => {
  const products = Storage.get("bookmarks") || [];
  const likeElements = document.querySelectorAll(".like");
  const bookmarksBadge = document.querySelector(".bookmarks-badge");
  bookmarksBadge.textContent = products.length || 0;

  // Init liked productcs
  likeElements.forEach((likeElement) => {
    const dataId = parseInt(likeElement.getAttribute("data-id"));
    products.forEach((product) => {
      if (dataId === product.id) {
        likeElement.classList.add("liked");
      }
    });
  });

  // Popover
  const $popover = document.querySelector(".popover");
  const $bookmarksBtn = document.querySelector(".bookmark-btn");

  $bookmarksBtn.addEventListener("click", () => {
    $popover.classList.toggle("open");
  });
});

window.addEventListener("load", () => {
  const $openMenuBtn = document.querySelector(".open-menu-btn");
  const $closeMenuBtn = document.querySelector(".close-menu-btn");

  $openMenuBtn.addEventListener("click", () =>
    document.querySelector(".responsive-menu").classList.add("show")
  );

  $closeMenuBtn.addEventListener("click", () =>
    document.querySelector(".responsive-menu").classList.remove("show")
  );

  // Menu dropdown
  const $menuLinks = document.querySelectorAll(".menu-navbar li");

  $menuLinks.forEach(($link) => {
    $link.querySelector("a").addEventListener("click", () => {
      const $submenu = $link.querySelector(".submenu");

      if ($submenu) {
        $submenu.classList.toggle("sub-show");
        $link.querySelector(".arrow-down").classList.toggle("rotate-arrow");
      }
    });
  });
});

App.init();
