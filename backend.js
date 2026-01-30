const STORAGE_KEY = "rs_products";

/* ---------- ADMIN ACCESS ---------- */
function openAdmin(){
  const pass = prompt("Enter Admin Passcode");
  if(pass === "@Rsproject"){
    window.location.href = "admin.html";
  }else if(pass !== null){
    alert("Wrong passcode");
  }
}

/* ---------- HELPERS ---------- */
function getProducts(){
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProducts(products){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* ---------- ADD PRODUCT ---------- */
function addProduct(){
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  if(!name || !price || !description || !image){
    alert("Fill all fields");
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
  alert("Product Added");

  document.getElementById("name").value="";
  document.getElementById("price").value="";
  document.getElementById("description").value="";
  document.getElementById("image").value="";

  renderAdminProducts();
}

/* ---------- DELETE ---------- */
function deleteProduct(id){
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderAdminProducts();
}

/* ---------- EDIT ---------- */
function editProduct(id){
  const products = getProducts();
  const p = products.find(x => x.id === id);

  const name = prompt("Name", p.name);
  const price = prompt("Price", p.price);
  const description = prompt("Description", p.description);
  const image = prompt("Image URL", p.image);

  if(!name || !price || !description || !image) return;

  p.name = name;
  p.price = price;
  p.description = description;
  p.image = image;

  saveProducts(products);
  renderAdminProducts();
}

/* ---------- MAIN PAGE LOAD ---------- */
function loadProducts(){
  const list = document.getElementById("productList");
  if(!list) return;

  const products = getProducts();
  list.innerHTML = "";

  if(products.length === 0){
    list.innerHTML = "<p>No products yet</p>";
    return;
  }

  products.forEach(p=>{
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
          <p>${p.description}</p>
          <a class="contact"
             href="https://wa.me/919719458113?text=I want ${encodeURIComponent(p.name)}"
             target="_blank">Order on WhatsApp</a>
        </div>
      </div>
    `;
  });
}

/* ---------- ADMIN LIST ---------- */
function renderAdminProducts(){
  const box = document.getElementById("adminProducts");
  if(!box) return;

  const products = getProducts();
  box.innerHTML = "<h3>Manage Products</h3>";

  products.forEach(p=>{
    box.innerHTML += `
      <div class="product-box">
        <strong>${p.name}</strong> - ₹${p.price}
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})"
          style="background:#dc2626;margin-top:5px;">Delete</button>
      </div>
    `;
  });
}

/* ---------- AUTO LOAD ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  loadProducts();
  renderAdminProducts();
});

