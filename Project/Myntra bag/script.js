const bagButton1 = document.querySelector('#bag-button1');
const bagButton2 = document.querySelector('#bag-button2');
const wishlistButton = document.querySelector('#wishlist-button');
const cartSummery = document.querySelector('#cart-summery');

let cartQuantity = 0;

function updateCart() {
    cartSummery.innerText = `My Bag has ${cartQuantity} items`;
}
updateCart();

bagButton1.addEventListener('click', () => {
    cartQuantity ++;
    updateCart();
});

wishlistButton.addEventListener('click', () => {
    if (cartQuantity > 0) {
        cartQuantity --;
    }
    updateCart();
});

bagButton2.addEventListener('click', () => {
    cartQuantity += 2;
    updateCart();
});