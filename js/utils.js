// localstroageye ekleme yapan fonskyon

import elements from "./helper.js";


const saveToLocalStorage = (cart) =>{
    // dışarıdan verilen elemanı stringe çevir ve localstorageye ekle
    localStorage.setItem("cart",JSON.stringify(cart));
};

// localstroagedan eleman çagıran fonksiyon

const getFromLocalStorage = () => {
    // cart keyindeki tüm elemanları localstorage den al
    const strData = localStorage.getItem("cart");

    // eger strdata varsa bunu json.parse ile donustur ve return et değer yoksa boş bir dizi return et
    return strData ? JSON.parse(strData) : [];
};

//sepet toplamnı hesaplayan fonskyion

const calculateCartTotal = (cart) => {
// cart'daki ürünlerin miktar ve fiyatını çarparak toplam sonucu elde et
    return cart.reduce((sum,item) => sum + item.price * item.quantity, 0);

// ! reduce ==> Bir dizi üzerindeki tüm elemanları dönerek bir işleme tabi tutar.Bu metot belirtilen işlevi gerçekleştirdikten sonra geriye toplu bir sonuç döndürür

  // ! Bu metot diziAdı.reduce((1,2)=>{},3) şeklinde kullanılır Buradaki 1.değer toplam sonucun aktarılacağı bir değişkendir 2.değerse currentValue'ya karşılık gelir.Buda her dönülen elemanın değerini alır

  // ! reduce'un 3. parametresi bir başlangıç değeri vardır. Bu değer, reduce'un başladığında dizi elemanları dönmek için ilk değerdir. Bu değer varsayılan olarak 0'dır.


};

const updateCartIcon = (cart) => {
    // sepetteki toplam ürün miktarını hesapla
  let totalQuantity=  cart.reduce((sum,item)=> {
    return sum + item.quantity;
}, 0);

// sepetteki ürün miktarını dinamik şekilde render et
elements.icon.setAttribute("data-quantity", totalQuantity);

// setattiribu bir elemana attribute eklemek için kullanılır
};


export { saveToLocalStorage, getFromLocalStorage, calculateCartTotal, updateCartIcon };