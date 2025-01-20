import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";


const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

// menuıcona tıklanınca menuye class ekle

menuIcon.addEventListener("click", ()=> {
    menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
    // localstrogaden cart değerini al

    let cart = getFromLocalStorage();

    if (window.location.pathname.includes("/cart.html")) {
//eger sepet sayfasındaysak sepete eklenen ürünleri render et
renderCartItems();
// sepet toplamını render eden fonksiyonu çalıştır
displayCartTotal();
    } else {
// eger anasayfadaysak api ye istek at ve verileri al
const products = await fetchProducts();

// apılerden gelen verileri ekrana render et
renderProducts(products, (e) => {
addToCart(e, products);
});
    }

    // sepet iconunu güncelle
    updateCartIcon(cart);
});
