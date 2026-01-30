<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔴 PASTE YOUR CONFIG HERE */
const firebaseConfig = {
  apiKey: "AIzaSyDxCmoqn9ODfl-hU2O2OwyuW9UgzUe_oAQ",
  authDomain:  "rs-project-a76e1.firebaseapp.com",
  projectId: "rs-project-a76e1",
  storageBucket: "rs-project-a76e1.firebasestorage.app",
  messagingSenderId: "327014242094",
  appId: "1:327014242094:web:9588bed64c4574bade8cbf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------- ADMIN LOGIN ---------- */
window.openAdmin = function () {
  const pass = prompt("Enter Admin Passcode");
  if (pass === "@Rsproject") {
    window.location.href = "admin.html";
  } else {
    alert("Wrong passcode");
  }
};

/* ---------- ADD PRODUCT ---------- */
window.addProduct = async function () {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;

  if (!name || !price || !description || !image) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "products"), {
    name, price, description, image
  });

  alert("Product added");
  loadAdminProducts();
};

/* ---------- LOAD PRODUCTS (MAIN PAGE) ---------- */
window.loadProducts = async function () {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach(docSnap => {
    const p = docSnap.data();
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
          <p>${p.description}</p>
          <a class="contact"
             href="https://wa.me/919719458113?text=I want ${encodeURIComponent(p.name)}"
             target="_blank">
             Order on WhatsApp
          </a>
        </div>
      </div>
    `;
  });
};

/* ---------- ADMIN LIST ---------- */
window.loadAdminProducts = async function () {
  const box = document.getElementById("adminProducts");
  if (!box) return;

  box.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach(d => {
    const p = d.data();
    box.innerHTML += `
      <div class="product-box">
        <strong>${p.name}</strong> - ₹${p.price}
        <button onclick="deleteProduct('${d.id}')">Delete</button>
      </div>
    `;
  });
};

window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  loadAdminProducts();
};

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadAdminProducts();
});
</script>

