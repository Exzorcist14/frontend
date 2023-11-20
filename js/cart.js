/*-----------------------------------------------------------*/

var products = [
    {
        name: "RTX 3070 Ti",
        price: 65000
    },

    {
        name: "GTX 1060 6GB",
        price: 24000
    },

    {
        name: "RTX 4060",
        price: 80000
    }
];

cart = {
    selectedProducts: [],
    totalAmount: 0,
    totalQuantity: 0,
}

function updateCartDisplay() {
    var container = document.querySelector(".cart-items-container");
    container.innerHTML = "";

    for (let product of cart.selectedProducts) {
        container.innerHTML += `    
        <div class="cart-item" id="${cart.selectedProducts.indexOf(product)}">
            <img src="img/catalog/GPU/${product.name}.png" width="150" height="150">
            <p class="name">${product.name}</p>

            <div class="quantity-container">
              <button class="minus" onclick="decreaseQuantity('${product.name}')">
                <img src="img/cart/minus.png" width="28px" height="28px">
              </button>

              <p class="quantity">${product.quantity}</p>

              <button class="plus" onclick="increaseQuantity('${product.name}')">
                <img src="img/cart/plus.png" width="25px" height="25px">
              </button>
            </div>

            <div class="delete">
              <button onclick="deleteInCart('${product.name}')">
                <img src="img/cart/delete.png" width="30px" height="30px">
              </button>
              
            </div>

            <div class="price">
              <p>${formatPrice(product.price * product.quantity)}</p>
            </div>

          </div>
        `;
    }

    container = document.querySelector(".total-amount");
    container.innerHTML = `Всего: ${formatPrice(cart.totalAmount)}`;

    container = document.querySelector(".total-quantity");
    container.innerHTML = `Товаров: ${cart.totalQuantity}`;
}

function addToCart(name) {
    var index = findIndexInCart(name);

    if (index == -1) {
        index = findIndexInCatalog(name);
        cart.selectedProducts.unshift(products[index]);
        cart.selectedProducts[0].quantity = 1;

        cart.totalAmount += cart.selectedProducts[0].price;
        cart.totalQuantity ++;
    }

    else {
        increaseQuantity(name);
    }

    updateCartDisplay();
}

function increaseQuantity(name) {
    var index = findIndexInCart(name);

    cart.selectedProducts[index].quantity += 1;
    cart.totalAmount += cart.selectedProducts[index].price;
    cart.totalQuantity++;

    updateCartDisplay();
}

function decreaseQuantity(name) {
    var index = findIndexInCart(name);

    if (cart.selectedProducts[index].quantity > 1) {
        cart.selectedProducts[index].quantity -= 1;

        cart.totalAmount -= cart.selectedProducts[index].price;
        cart.totalQuantity--;
    }

    else {
        deleteInCart(name);
    }

    updateCartDisplay();
}

function deleteInCart(name) {
    id = findIndexInCart(name);

    cart.totalAmount -= cart.selectedProducts[id].price * cart.selectedProducts[id].quantity;
    cart.totalQuantity -= cart.selectedProducts[id].quantity;
    cart.selectedProducts.splice(id, 1);

    updateCartDisplay();
}

function clearCart() {
    cart = {
        selectedProducts: [],
        totalAmount: 0,
        totalQuantity: 0
    }

    updateCartDisplay();
}

/*-----------------------------------------------------------*/

function findIndexInCatalog(name) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == name) {
            return i;
        }
    }

    return -1;
}

function findIndexInCart(name) {
    for (let i = 0; i < cart.selectedProducts.length; i++) {
        if (cart.selectedProducts[i].name == name) {
            return i;
        }
    }

    return -1;
}

function formatPrice(price) {
    if (price == 0) {
        return "0 ₽"
    }

    else {
        let pass = 0;
        let result = "";

        while (price > 0) {
            if (pass == 3) {
                result += " ";
                pass = 0;
            }

            result += price % 10;
            price = Math.floor(price / 10);

            pass++;
        }

        result = result.split('').reverse().join('');

        result += " ₽";

        return result;
    }
}

























/*-----------------------------------------------------------*/



/*
function addToCart(name) {
    var index = findIndexInCart(name);

    if (index == -1) {
        var container = document.querySelector(".cart");

        index = findIndexInCatalog(name);
        container.innerHTML = `
        <div class="cart-item" id="${index}">
            <img src="img/catalog/GPU/RTX 3070 Ti.png" width="150" height="150">
            <p class="name">${products[index].name}</p>

            <div class="quantity-container">
              <button class="minus" type="submit" id="submit" onclick="decreaseQuantity('${name}')">
                <img src="img/cart/minus.png" width="28px" height="28px">
              </button>

              <p class="quantity">1</p>

              <button class="plus" type="submit" id="submit" onclick="increaseQuantity('${name}')">
                <img src="img/cart/plus.png" width="25px" height="25px">
              </button>
            </div>

            <div class="delete">
              <button type="submit" id="submit" onclick="deleteInCart('${name}')">
                <img src="img/cart/delete.png" width="30px" height="30px">
              </button>

            </div>

            <div class="price">
              <p>${formatPrice(products[index].price)}</p>
            </div>

          </div>
        ` + container.innerHTML;

        cart.selectedProducts.unshift(products[index]);
        cart.selectedProducts[0].quantity = 1;
    }

    else {
        increaseQuantity(name);
    }
}

function deleteInCart(name) {
    var container = document.getElementById("cart-container");
    var id = findIndexInCatalog(name);
    var divToRemove = document.getElementById(id);

    if (divToRemove) {
        container.removeChild(divToRemove);
    }

    id = findIndexInCart(name);
    cart.selectedProducts.splice(id, 1);
}

function increaseQuantity(name) {
    var id = findIndexInCatalog(name);
    var container = document.getElementById(id);
    var quantity = container.querySelector(".quantity");
    quantity.textContent = +quantity.textContent + 1;

    id = findIndexInCart(name);
    cart.selectedProducts[id].quantity += 1;
}

function decreaseQuantity(name) {
    var id = findIndexInCart(name);
    if (cart.selectedProducts[id].quantity > 1) {
        cart.selectedProducts[id].quantity -= 1;

        id = findIndexInCatalog(name);
        var container = document.getElementById(id);
        var quantity = container.querySelector(".quantity");
        quantity.textContent = +quantity.textContent - 1;
    }

    else {
        deleteInCart(name);
    }
}
*/
/*-----------------------------------------------------------*/
