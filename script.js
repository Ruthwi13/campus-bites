/* ==========================================
   CAMPUS BITES JAVASCRIPT
   All 5 pages use this one file. Each section
   first checks that its elements are on the page.
   ========================================== */


/* ---------- 1. MENU DATA ---------- */

// Change this array to change the food on your website.
// Each image name must match a file in the images folder.
const menuItems = [
  { id: 1, name: "Masala dosa", category: "Meals", price: 70, image: "masala-dosa.jpg", description: "Crispy dosa with potato masala, chutney, and sambar.", special: true },
  { id: 2, name: "Idli and vada", category: "Snacks", price: 50, image: "idli-vada.jpg", description: "Two soft idlis and one crisp vada with chutney.", special: false },
  { id: 3, name: "Veg puff", category: "Snacks", price: 25, image: "veg-puff.jpg", description: "Flaky pastry filled with spiced vegetables.", special: false },
  { id: 4, name: "Samosa", category: "Snacks", price: 20, image: "samosa.jpg", description: "Crisp samosa with potato filling and mint chutney.", special: false },
  { id: 5, name: "Veg biryani", category: "Meals", price: 110, image: "veg-biryani.jpg", description: "Spiced rice and vegetables served with raita.", special: true },
  { id: 7, name: "Paneer butter masala", category: "Meals", price: 130, image: "paneer-butter-masala.jpg", description: "Paneer in tomato gravy, served with two rotis.", special: false },
  { id: 13, name: "Butter naan", category: "Meals", price: 40, image: "butter-naan.jpg", description: "Soft tandoor naan brushed with butter.", special: false },
  { id: 8, name: "Veg noodles", category: "Meals", price: 90, image: "veg-noodles.jpg", description: "Stir-fried noodles with fresh vegetables.", special: false },
  { id: 9, name: "Filter coffee", category: "Drinks", price: 25, image: "filter-coffee.jpg", description: "Strong South Indian coffee with hot milk.", special: true },
  { id: 10, name: "Masala chai", category: "Drinks", price: 20, image: "masala-chai.jpg", description: "Hot tea with ginger and cardamom.", special: false },
  { id: 11, name: "Cold coffee", category: "Drinks", price: 60, image: "cold-coffee.jpg", description: "Chilled coffee blended with milk.", special: false },
  { id: 12, name: "Fresh lime soda", category: "Drinks", price: 40, image: "fresh-lime-soda.jpg", description: "Lime and soda, served sweet or salted.", special: false }
];


/* ---------- 2. SAVING THE CART ---------- */

// localStorage keeps the cart when the user moves between pages.
function getCart() {
  const savedCart = localStorage.getItem("campusBitesCart");
  return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart(cart) {
  localStorage.setItem("campusBitesCart", JSON.stringify(cart));
  updateCartCount();
}

// Updates the number beside "Cart" in the navigation bar.
function updateCartCount() {
  const totalItems = getCart().reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  document.querySelectorAll(".cart-count").forEach(function (count) {
    count.textContent = totalItems;
  });
}

function addToCart(id) {
  const cart = getCart();
  const itemInCart = cart.find(function (item) {
    return item.id === id;
  });

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }

  saveCart(cart);

  const food = menuItems.find(function (item) {
    return item.id === id;
  });
  showToast(food.name + " added to cart");
}


/* ---------- 3. POP-UP MESSAGE ---------- */

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}


/* ---------- 4. FOOD CARDS ---------- */

// Builds the HTML for one dish.
function createFoodCard(item) {
  return `
    <article class="food-card">
      <img class="food-photo" src="images/${item.image}" alt="${item.name}">
      <div class="food-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="food-bottom">
          <span class="food-price">₹${item.price}</span>
          <button class="add-button" type="button" onclick="addToCart(${item.id})">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function displayFood(items, grid) {
  grid.innerHTML = items.map(createFoodCard).join("");
}


/* ---------- 5. HOME PAGE ---------- */

const specialsGrid = document.getElementById("specialsGrid");

if (specialsGrid) {
  const specials = menuItems.filter(function (item) {
    return item.special;
  });

  displayFood(specials, specialsGrid);
}


/* ---------- 6. MENU PAGE: SEARCH AND FILTER ---------- */

const menuGrid = document.getElementById("menuGrid");

if (menuGrid) {
  const searchInput = document.getElementById("searchInput");
  const categoryButtons = document.querySelectorAll(".category-button");
  const menuResults = document.getElementById("menuResults");
  let selectedCategory = "All";

  function updateMenu() {
    const searchText = searchInput.value.trim().toLowerCase();

    const results = menuItems.filter(function (item) {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

    displayFood(results, menuGrid);

    if (results.length === 0) {
      menuResults.textContent = "No dishes found. Try a different word or category.";
    } else if (results.length === 1) {
      menuResults.textContent = "Showing 1 dish";
    } else {
      menuResults.textContent = "Showing " + results.length + " dishes";
    }
  }

  searchInput.addEventListener("input", updateMenu);

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category;

      categoryButtons.forEach(function (otherButton) {
        const isSelected = otherButton === button;
        otherButton.classList.toggle("active", isSelected);
        otherButton.setAttribute("aria-pressed", isSelected);
      });

      updateMenu();
    });
  });

  updateMenu();
}


/* ---------- 7. CART PAGE ---------- */

const cartItems = document.getElementById("cartItems");

function changeQuantity(id, change) {
  const cart = getCart();
  const item = cart.find(function (cartItem) {
    return cartItem.id === id;
  });

  item.quantity += change;

  // If the quantity reaches 0, keep every item except this one.
  const updatedCart = cart.filter(function (cartItem) {
    return cartItem.quantity > 0;
  });

  saveCart(updatedCart);
  displayCart();
}

function displayCart() {
  const cart = getCart();
  const cartSection = document.getElementById("cartSection");
  const emptyCart = document.getElementById("emptyCart");

  document.getElementById("orderConfirmed").hidden = true;
  cartSection.hidden = cart.length === 0;
  emptyCart.hidden = cart.length > 0;

  let subtotal = 0;

  cartItems.innerHTML = cart.map(function (cartItem) {
    const food = menuItems.find(function (item) {
      return item.id === cartItem.id;
    });
    const itemTotal = food.price * cartItem.quantity;
    subtotal += itemTotal;

    return `
      <tr>
        <td>${food.name}</td>
        <td>
          <div class="quantity">
            <button type="button" aria-label="Remove one ${food.name}" onclick="changeQuantity(${food.id}, -1)">-</button>
            <span>${cartItem.quantity}</span>
            <button type="button" aria-label="Add one ${food.name}" onclick="changeQuantity(${food.id}, 1)">+</button>
          </div>
        </td>
        <td>₹${itemTotal}</td>
      </tr>
    `;
  }).join("");

  const gst = Math.round(subtotal * 0.05);

  document.getElementById("subtotal").textContent = "₹" + subtotal;
  document.getElementById("gst").textContent = "₹" + gst;
  document.getElementById("total").textContent = "₹" + (subtotal + gst);
}

if (cartItems) {
  displayCart();

  document.getElementById("clearCart").addEventListener("click", function () {
    saveCart([]);
    displayCart();
  });

  document.getElementById("placeOrder").addEventListener("click", function () {
    const orderConfirmed = document.getElementById("orderConfirmed");

    document.getElementById("tokenNumber").textContent = Math.floor(Math.random() * 900) + 100;
    saveCart([]);

    document.getElementById("cartSection").hidden = true;
    orderConfirmed.hidden = false;
    orderConfirmed.focus();
  });
}


/* ---------- 8. BOOKING PAGE: FORM VALIDATION ---------- */

const bookingForm = document.getElementById("bookingForm");

// Shows an error under one input. An empty message clears the error.
function setError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "Error");

  error.textContent = message;
  input.classList.toggle("invalid", message !== "");
}

// Returns today's date in the format used by date inputs: YYYY-MM-DD.
function getTodayDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return today.getFullYear() + "-" + month + "-" + day;
}

function validateBooking() {
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  const guests = Number(document.getElementById("guests").value);
  let isValid = true;

  // Regular expression: letters and spaces only, at least 2 characters.
  if (!/^[A-Za-z ]{2,}$/.test(fullName)) {
    setError("fullName", "Enter your name using letters only.");
    isValid = false;
  } else {
    setError("fullName", "");
  }

  // Regular expression: 10 digits, starting with 6, 7, 8, or 9.
  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    setError("phone", "Enter a 10-digit mobile number.");
    isValid = false;
  } else {
    setError("phone", "");
  }

  if (date === "" || date < getTodayDate()) {
    setError("bookingDate", "Choose today or a future date.");
    isValid = false;
  } else {
    setError("bookingDate", "");
  }

  if (time === "" || time < "08:00" || time > "21:00") {
    setError("bookingTime", "Choose a time from 8:00 AM to 9:00 PM.");
    isValid = false;
  } else {
    setError("bookingTime", "");
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    setError("guests", "Enter a number from 1 to 10.");
    isValid = false;
  } else {
    setError("guests", "");
  }

  return isValid;
}

if (bookingForm) {
  const bookingSuccess = document.getElementById("bookingSuccess");

  // Stops the date picker from offering past dates.
  document.getElementById("bookingDate").min = getTodayDate();

  bookingForm.addEventListener("submit", function (event) {
    // Stops the page from reloading when the form is submitted.
    event.preventDefault();

    if (!validateBooking()) {
      bookingForm.querySelector(".invalid").focus();
      return;
    }

    const name = document.getElementById("fullName").value.trim();
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const guests = document.getElementById("guests").value;

    document.getElementById("bookingDetails").textContent =
      name + ", your table for " + guests + " is booked for " + date + " at " + time + ".";

    bookingForm.hidden = true;
    bookingSuccess.hidden = false;
    bookingSuccess.focus();
  });

  document.getElementById("newBooking").addEventListener("click", function () {
    bookingForm.reset();
    bookingSuccess.hidden = true;
    bookingForm.hidden = false;
    document.getElementById("fullName").focus();
  });
}


/* ---------- 9. ABOUT PAGE: QUESTIONS AND ANSWERS ---------- */

document.querySelectorAll(".faq-question").forEach(function (question) {
  question.addEventListener("click", function () {
    const answer = question.nextElementSibling;
    const isOpen = question.getAttribute("aria-expanded") === "true";

    question.setAttribute("aria-expanded", !isOpen);
    answer.hidden = isOpen;
  });
});


/* ---------- 10. NAVIGATION AND DARK MODE ---------- */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", function () {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

function setTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem("campusBitesTheme", theme);
}

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// These run on every page when it opens.
setTheme(localStorage.getItem("campusBitesTheme") || "light");
updateCartCount();
