// sepete ekleme fonksiyonu
import elements from "./helper.js";
import { calculateCartTotal, getFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js";


// localstroageden cart verisini al
let cart = getFromLocalStorage();

// sepete ekleme yapan fonksiyon
 const addToCart = (e, products) => {
    // tıklanan elamanın ıd sine eriş
const productId = parseInt(e.target.dataset.id);
// product içerisinde id'si bilinen elemana eriş
const product = products.find((product) => product.id === productId);

// eger ürün varsa cart dizisini kontrol 
if(product){
    
    // ürün sepette var mı bunu kontrol et varsa bunu exiitngıtem aktar
    const exitingItem = cart.find((item) => item.id === productId);
    if(exitingItem) {
        exitingItem.quantity++;
    } else {
// erişilen elemanın verileriyle bir cart elemanı objesi oluştur
const cartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
};
// cart dizisine bu cartItem objesini ekle
cart.push(cartItem);


    }
    // cart dizisine localstroage a ekle
saveToLocalStorage(cart);

// sepete ekle butonun içeriğinin güncelle
e.target.textContent = "Added";

// 2 sn sonra elemanın içeriğinin tekrar eski haline getir
setTimeout(() => {
    e.target.textContent = "Add to cart";
},2000);

// sepet iconunu güncelle
updateCartIcon(cart);

}

};



// sepetten ürün kaldıracak fonksiyon
const removeFromCart = (e) => {
    // tıklanan elemanın ıdsine eriş
    const productId = parseInt(e.target.dataset.id);

    // ıd si bilinen elemanı sepette kaldır
    cart = cart.filter((item) => item.id != productId);

    // localstorage güncelle
    saveToLocalStorage(cart);
    // arayüzü tekardan render et
    renderCartItems();

    // sepetteki toplam eleamnı render et
    displayCartTotal();

    
};

// sepetteki ürün miktarını güncelleyen fonksiyon
const onQuantityChange = () => {
    const productId = +e.target.dataset.id;
    const quantity = +e.target.value;
// sepetteki eleman 0 dan buyukse
    if(newQuantity > 0) {
        // sepet içerisinde miktarı değişen elemanı bul
        cart.find((item) =>item.id === productId);

        // bununan elemanın miktarını güncelle
        cartItem.quantity = newQuantity;

        // localstroageye ı güncelle
        saveToLocalStorage(cart);

        // toplam fiyatı güncelle
        displayCartTotal();
    }
};


//sepetteki ürünleri render eden fonksiyon

const renderCartItems = () => {
    elements.cartItemsList.innerHTML = cart.map((item) => `
    <div class="cart-item">
            <img src=" ${item.image} " alt="">
        
            <div class="cart-item-info">
            <h2 class="cart-item-title">${item.title}</h2>
            <input type="number" min="1" class="cart-item-quantity" data-id="${item.id}" value="${item.quantity}">
         </div>
         
         <h2 class="cart-item-price">${item.price}</h2>
         
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
         </div>`
        ) 
        .join("");

        // remove-from-cart clasına sahip olan butona eriş
        const removeButtons = document.querySelectorAll(".remove-from-cart");

        // removebuttons içerisindeki herbir butona ayrı ayrı eriş

        for(let i = 0; i<removeButtons.length; i++) {
            const removeButton = removeButtons[i];

            // bu butonlara bir tıklanma gerçekleştiğinde bir fonksiyon tetikle
            removeButton.addEventListener("click", removeFromCart);
        }

        // cart item quantity clasına sahip tüm eleamanlarına eriş
        const quantityİnputs = document.querySelectorAll(".cart-item-quantity");

        // quantityInputs içerisindeki herbir ınputa ayrı ayrı eriş
        for(let i =0; i < quantityİnputs.length; i++) {
            const quantityInput = quantityİnputs[i];

            // quantityinput lara birer olay izleyicisi ekle
            quantityInput.addEventListener("change", onQuantityChange);
        }
    };

    // Sepetteki toplam ürün mikarını render eden fonksiyon

    const displayCartTotal = () => {
        //calculatecarttotal ile sepetteki toplam fiyatı hesapla
        const total = calculateCartTotal(cart);
        // toplam değeri ekranda render et
        elements.cartTotal.textContent = `Total: $${total.toFixed(2)} `;
    };

   


export {  addToCart, renderCartItems, displayCartTotal };