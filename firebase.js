/* ================================
   RS PROJECT – FIREBASE BACKEND
   ================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 YOUR FIREBASE CONFIG (SAFE TO USE ON FRONTEND) */
const firebaseConfig = {
  apiKey: "AIzaSyDxCmoqn9ODfl-hU2O2OwyuW9UgzUe_oAQ",
  authDomain: "rs-project-a76e1.firebaseapp.com",
  projectId: "rs-project-a76e1",
  storageBucket: "rs-project-a76e1.appspot.com",
  messagingSenderId: "327014242094",
  appId: "1:327014242094:web:9588bed64c4574bade8cbf"
};

/* ---------- INIT ---------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------- ADMIN BUTTON (GLOBAL) ---------- */
window.openAdmin = function () {
  const pass = prompt("Enter Admin Passcode");
  if (pass === "@Rsproject") {
    window.location.href = "admin.html";
  } else if (pass !== null) {
    alert("Wrong passcode");
  }
};

/* ---------- ADD PRODUCT ---------- */
window.addProduct = async function () {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!name || !price || !description || !image) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(collection(db, "products"), {
    name,
    price,
    description,
    image,
    createdAt: Date.now()
  });

  alert("Product added successfully");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";

  loadAdminProducts();
};

/* ---------- LOAD PRODUCTS (MAIN PAGE) ---------- */
async function loadProducts() {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  if (snapshot.empty) {
    container.innerHTML = "<p style='text-align:center;'>No products available</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
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
async function loadAdminProducts() {
  const box = document.getElementById("adminProducts");
  if (!box) return;

  box.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    box.innerHTML += `
      <div class="product-box">
        <strong>${p.name}</strong> — ₹${p.price}
        <button 
          style="margin-top:6px;background:#dc2626;color:white;border:none;padding:8px;border-radius:6px;"
          onclick="deleteProduct('${docSnap.id}')">
          Delete
        </button>
      </div>
    `;
  });
}

/* ---------- DELETE PRODUCT ---------- */
window.deleteProduct = async function (id) {
  if (!confirm("Delete this product?")) return;
  await deleteDoc(doc(db, "products", id));
  loadAdminProducts();
};

/* ---------- AUTO LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadAdminProducts();
});
