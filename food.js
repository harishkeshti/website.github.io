// CART DATA
const cart = {};

// SELECTORS
const cartList = document.getElementById("cart-list");
const subtotalEl = document.getElementById("subtotal");

// ADD TO CART
document.querySelector(".menu").addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    const id = e.target.dataset.id;
    const card = e.target.closest(".card");

    const name = card.querySelector("h3").textContent;
    const price = Number(card.querySelector(".price").textContent.replace("₹", ""));

    if (!cart[id]) cart[id] = { name, price, qty: 1 };
    else cart[id].qty++;

    updateCart();
  }
});

// UPDATE UI
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  if (Object.keys(cart).length === 0) {
    document.getElementById("empty-msg").style.display = "block";
    subtotalEl.textContent = "₹0.00";
    return;
  }

  document.getElementById("empty-msg").style.display = "none";

  for (let id in cart) {
    const item = cart[id];
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div>${item.name} × ${item.qty}</div>
      <div>₹${item.price * item.qty}</div>
    `;
    cartList.appendChild(row);
  }

  subtotalEl.textContent = `₹${total + 40}.00`; // including delivery
}

// CHECKOUT MODAL
document.getElementById("checkout-btn").onclick = () => {
  if (Object.keys(cart).length === 0) return alert("Your cart is empty!");
  document.getElementById("overlay").style.display = "flex";
};

document.getElementById("close-checkout").onclick = () => {
  document.getElementById("overlay").style.display = "none";
};

// DEMO PAYMENT
document.getElementById("pay-now").onclick = () => {
  payDemo(true);
};

document.getElementById("demo-pay").onclick = () => {
  payDemo(false);
};

// PROCESS PAYMENT
function payDemo(fromCheckout) {
  if (fromCheckout) {
    if (!name.value || !email.value || !address.value) {
      alert("Fill all details!");
      return;
    }
  }

  const txn = Math.random().toString(36).substring(2, 10).toUpperCase();

  document.getElementById("overlay").style.display = "none";

  const receipt = `
    <h4>DEMO PAYMENT SUCCESSFUL</h4>
    <p>Transaction ID: <b>${txn}</b></p>
    <p>No real money was charged — this is a demo.</p>
  `;

  document.getElementById("receipt").innerHTML = receipt;
  document.getElementById("overlay2").style.display = "flex";

  // clear cart
  for (let k in cart) delete cart[k];
  updateCart();
}

// CLOSE RECEIPT
document.getElementById("close-receipt").onclick =
  document.getElementById("done").onclick = () => {
    document.getElementById("overlay2").style.display = "none";
  };
