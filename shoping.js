let cart = [];
let currentSlide = 0;
let slideInterval;

// RUN AFTER DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const payBtn = document.getElementById("pay-btn");

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  // ADD TO CART
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  // FILTER PRODUCTS
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      filterProducts(category);

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // DEMO PAYMENT
  payBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add some products.");
      return;
    }

    alert(
      "Demo: Redirecting to test payment page...\n(This is only for your project demo, not real payment.)"
    );

    const demoPaymentLink = "https://securegw-stage.paytm.in/theia/processTransaction";
    window.open(demoPaymentLink, "_blank");
  });

  // SLIDESHOW EVENTS
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlideClick() {
    showSlide(currentSlide - 1);
  }

  prevBtn.addEventListener("click", prevSlideClick);
  nextBtn.addEventListener("click", nextSlide);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // AUTO SLIDE
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Pause on hover
  const heroSlider = document.querySelector(".hero-slider");
  heroSlider.addEventListener("mouseenter", stopAutoSlide);
  heroSlider.addEventListener("mouseleave", startAutoSlide);

  showSlide(0);
  startAutoSlide();

  // INITIAL CART RENDER
  updateCartUI();
});

/* CART FUNCTIONS */
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCartUI();
}

function increaseQty(index) {
  cart[index].qty += 1;
  updateCartUI();
}

function decreaseQty(index) {
  cart[index].qty -= 1;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItemsUl = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  cartItemsUl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.className = "cart-item-name";
    nameSpan.textContent = item.name;

    const qtySpan = document.createElement("span");
    qtySpan.className = "cart-item-qty";
    qtySpan.textContent = 'x ${item.qty}';

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "cart-item-controls";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.onclick = () => decreaseQty(index);

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.onclick = () => increaseQty(index);

    controlsDiv.appendChild(minusBtn);
    controlsDiv.appendChild(plusBtn);

    li.appendChild(nameSpan);
    li.appendChild(qtySpan);
    li.appendChild(controlsDiv);

    cartItemsUl.appendChild(li);

    total += item.price * item.qty;
  });

  cartTotalSpan.textContent = total;
}

/* FILTER PRODUCTS BY CATEGORY */
function filterProducts(category) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || category === cardCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}