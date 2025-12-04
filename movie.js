const seatContainer = document.getElementById("seatContainer");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const popup = document.getElementById("popup");
const summary = document.getElementById("summary");
const bookBtn = document.getElementById("bookBtn");

let ticketPrice = +movieSelect.value;

/* ---------- Generate Seats (8×6 layout) ---------- */
function createSeats() {
  seatContainer.innerHTML = "";
  for (let i = 0; i < 48; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");

    // Randomly mark some seats occupied
    if (Math.random() < 0.18) {
      seat.classList.add("occupied");
    }

    seatContainer.appendChild(seat);
  }
}

/* ---------- Update Count & Total ---------- */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

/* ---------- Seat Click Event ---------- */
seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

/* ---------- Movie Price Change ---------- */
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

/* ---------- Book Button ---------- */
bookBtn.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seat.selected");

  if (selectedSeats.length === 0) {
    alert("Please select at least 1 seat.");
    return;
  }

  summary.innerHTML = `
    <h3 style="color:#ffd36b">Booking Details</h3>
    <p>Movie: <b>${movieSelect.options[movieSelect.selectedIndex].text}</b></p>
    <p>Seats: <b>${selectedSeats.length}</b></p>
    <p>Total Amount: <b>₹${selectedSeats.length * ticketPrice}</b></p>
    <p>Enjoy your movie! 🎬</p>
  `;

  popup.style.display = "flex";
});

/* ---------- Close Popup ---------- */
function closePopup() {
  popup.style.display = "none";
}

createSeats();
updateSelectedCount();