/* ===============================
   RS PROJECT – BACKEND LOGIC
   =============================== */

const STORAGE_KEY = "rs_products";

/* ---------- ADD PRODUCT (ADMIN) ---------- */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!name || !price || !description || !image) {
    alert("Please fill all fields");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    description,
    image
  };

  const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  alert("Product added successfully");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
}

/* ---------- LOAD PRODUCTS (MAIN PAGE) ---------- */
function loadProducts() {
  const container = document.getElementById("productList");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML =
      `<p style="grid-column:1/-1;text-align:center;color:#6b7280;">
        No products available yet.
      </p>`;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" onerror="this.src='https://via.placeholder.com/400'">
      <div class="card-content">
        <h3>${product.name}</h3>
        <div class="price">₹${product.price}</div>
        <p>${product.description}</p>
        <a class="contact"
           href="https://wa.me/919719458113?text=I want to order ${encodeURIComponent(product.name)}"
           target="_blank">
           Order on WhatsApp
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ---------- ADMIN ACCESS ---------- */
function openAdmin() {
  const pass = prompt("Enter admin passcode");
  if (pass === "@Rsproject") {
    window.location.href = "admin.html";
  } else if (pass !== null) {
    alert("Wrong passcode");
  }
}

/* ---------- AUTO LOAD ---------- */
document.addEventListener("DOMContentLoaded", loadProducts);

