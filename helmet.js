// Simple cart functionality

let cart = [];

const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const cartCount2El = document.getElementById("cart-count-2");
const cartTotal2El = document.getElementById("cart-total-2");
const cartItemsEl = document.getElementById("cart-items");

const viewCartBtn = document.getElementById("view-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSection = document.getElementById("cart-section");
const checkoutBtn = document.getElementById("checkout-btn");

function updateCartUI() {
  let total = 0;
  let count = 0;

  cartItemsEl.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement("li");
    li.textContent = '${item.name}' * '${item.qty}';
    const priceSpan = document.createElement("span");
    priceSpan.textContent = '₹${item.price * item.qty}';
    li.appendChild(priceSpan);
    cartItemsEl.appendChild(li);
  });

  cartCountEl.textContent = count;
  cartTotalEl.textContent = total;
  cartCount2El.textContent = count;
  cartTotal2El.textContent = total;
}

// Add to cart buttons
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = parseInt(this.getAttribute("data-price"));

    // Check if already in cart
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    updateCartUI();
    alert(name + " added to cart!");
  });
});

// Show and hide cart panel
viewCartBtn.addEventListener("click", function () {
  cartSection.classList.remove("hidden");
});

closeCartBtn.addEventListener("click", function () {
  cartSection.classList.add("hidden");
});

// Demo payment link (frontend only)
checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  alert("Redirecting to demo payment page. Amount: ₹" + totalAmount);

  // 🔗 DEMO PAYMENT LINK (for project only)
  // You can replace this with any third-party payment test link like Paytm / Razorpay demo.
  const paymentUrl = "https://paytm.com"; // just for showing in project

  window.open(paymentUrl, "_blank");
});