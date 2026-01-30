/* =====================================
   RS PROJECT – FULL WORKING BACKEND
   Uses localStorage (GitHub friendly)
===================================== */

const STORAGE_KEY = "rs_products";

/* ---------- ADMIN LOGIN ---------- */
function openAdmin() {
  const pass = prompt("Enter Admin Passcode");
  if (pass === "@Rsproject") {
    window.location.href = "admin.html";
  } else {
    alert("Wrong passcode");
  }
}

/* ---------- GET PRODUCTS ---------- */
function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/* ---------- SAVE PRODUCTS ---------- */
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* ---------- ADD PRODUCT ---------- */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!name || !price || !description || !image) {
    alert("Please fill all fields");
    return;
  }

  const products = getProducts();

  products.push({
    id: Date.now(),
    name,
    price,
    description,
    image
  });

  saveProducts(products);
  alert("Product added successfully");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";

  renderAdminProducts();
}

/* ---------- DELETE PRODUCT ---------- */
function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);

  renderAdminProducts();
  loadProducts();
}

/* ---------- EDIT PRODUCT ---------- */
function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);

  const name = prompt("Edit Name", product.name);
  const price = prompt("Edit Price", product.price);
  const description = prompt("Edit Description", product.description);
  const image = prompt("Edit Image URL", product.image);

  if (!name || !price || !description || !image) return;

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;

  saveProducts(products);
  renderAdminProducts();
  loadProducts();
}

/* ---------- LOAD PRODUCTS (MAIN PAGE) ---------- */
function loadProducts() {
  const container = document.getElementById("productList");
  if (!container) return;

  const products = getProducts();
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#777;'>No products available</p>";
    return;
  }

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>
          <p>${p.description}</p>
          <a class="contact"
             href="https://wa.me/919719458113?text=I want to order ${encodeURIComponent(p.name)}"
             target="_blank">
             Order on WhatsApp
          </a>
        </div>
      </div>
    `;
  });
}

/* ---------- ADMIN PRODUCT LIST ---------- */
function renderAdminProducts() {
  const wrapper = document.getElementById("adminProducts");
  if (!wrapper) return;

  const products = getProducts();
  wrapper.innerHTML = "<h3>Manage Products</h3>";

  products.forEach(p => {
    wrapper.innerHTML += `
      <div style="
        border:1px solid #ddd;
        padding:10px;
        margin-bottom:10px;
        border-radius:8px;
        display:flex;
        flex-direction:column;
        gap:6px;">
        <strong>${p.name}</strong>
        <span>₹${p.price}</span>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})" style="background:#dc2626;">Delete</button>
      </div>
    `;
  });
}

/* ---------- AUTO LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  renderAdminProducts();
});

