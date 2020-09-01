// Variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.products-center');

cartBtn.addEventListener('click', function() {
    ui.displayCart();
})

closeCartBtn.addEventListener('click', function() {
    ui.removeCart();
})

// Cart
var  cart = [''];
var count = 0;
// if (cart.length>1){
//     localStorage.setItem('details', JSON.stringify(cart));
// }else{
//     cart = JSON.parse(localStorage.getItem('details'));
// }

var totalItems = ['']

// Produt getting Class

class Products{
    addItem(ID) {
        var selectedElement = document.getElementById(ID).parentElement.parentElement;
        let itemImage = selectedElement.querySelector('img').src;
        let itemName = selectedElement.querySelector('h3').textContent;
        let itemPrice = selectedElement.querySelector('h4').textContent;
        for (var i = 0; i <itemImage.length; i++){
            if (itemImage.slice(i, i+6) == '/image'){
                var link = '.' + itemImage.slice(i);
            }
        }
        
        const storage = new Storage(ID, itemName, itemPrice, link);
        storage.addToCart();
    }
}

// Product displaying Class

class UI{

    displayCart() {
        document.querySelector('.cart-overlay').classList.add('transparentBcg');
        document.querySelector('.cart').classList.add('showCart');
        
        var printCart =     JSON.parse(localStorage.getItem('details'));
        printCart.forEach(element => {
            if (element !==""){
            var html = '<div class="cart-item"> <img src="'+element.url+'"> <div> <h4>'+element.name+'</h4> <h5>'+element.price+'</h5> <span class="remove-item">Remove Item</span> </div><div> <i class="fas fa-chevron-up"></i> <p class="item-amount">1</p><i class="fas fa-chevron-down"></i> </div></div>'    
            document.getElementById('after').insertAdjacentHTML('afterend', html);
        }});
        
        
    }

    removeCart() {
        document.querySelector('.cart-overlay').classList.remove('transparentBcg');
        document.querySelector('.cart').classList.remove('showCart');
    }

    clearCart() {
        totalItems = [''];
        cart = [''];
        localStorage.setItem('details', JSON.stringify(totalItems));
        location.reload()
    }
    
}

// Local Storage Class

class Storage{
    constructor(uniqueKey, name, price, imageUrl){
        this.key = uniqueKey;
        this.price = price;
        this.name = name;
        this.imgURL = imageUrl;
        this.state = false;
    }



    addToCart(){
        for (var j = 0; j<cart.length; j++){
            if (cart[j] == this.key){
                this.state = true;
        }}

        if (this.state == false){
            cart.push(this.key);
            this.state = true;
            this.storeData();
            count++;
            cartItems.textContent = count;
        }          
    }

    storeData(){

        var ItemDetails = {
            id: this.key,
            name: this.name,
            price: this.price,
            url: this.imgURL
        }

        totalItems.push(ItemDetails);
        localStorage.setItem('details', JSON.stringify(totalItems));
        
        

    }
        


}

const products = new Products();
const ui = new UI;
// Event Listener
document.addEventListener('DOMContentLoaded', function(){
    var storedCart =     JSON.parse(localStorage.getItem('details'));
    if(storedCart!== null){
        totalItems = storedCart
    }
})
    