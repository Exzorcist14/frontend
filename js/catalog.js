/*-----------------------------------------------------------*/

var products = [
    {
        name: "RTX 3070 Ti",
        price: 65000,
        memoryCapacity: 8,
        memoryType: "GDDR6X",
        gpuFrequency: 1770,
        busBitDepth: 256
    },

    {
        name: "GTX 1060 6GB",
        price: 24000,
        memoryCapacity: 6,
        memoryType: "GDDR5",
        gpuFrequency: 1505,
        busBitDepth: 192
    },

    {
        name: "RTX 4060",
        price: 80000,
        memoryCapacity: 8,
        memoryType: "GDDR6",
        gpuFrequency: 2460,
        busBitDepth: 128
    }
];

var filteredProducts = [];

/*-----------------------------------------------------------*/

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

function updateCatalogDisplay(products) {
    var container = document.querySelector(".catalog");
    container.innerHTML = "";

    for (let product of products) {
        container.innerHTML += `    
            <div class="catalog-item" id="${products.indexOf(product)}">
                <img src="img/catalog/GPU/${product.name}.png" width="150" height="150">
                <p class="name">${product.name}</p>
    
                <div class="specifications">
                  <p>Объём видеопамяти: ${product.memoryCapacity} ГБ</p>
                  <p>Тип памяти: ${product.memoryType}</p>
                  <p>Частота графического процессора: ${product.gpuFrequency} МГц</p>
                  <p>Разрядность шины видеопамяти: ${product.busBitDepth} бит</p>
                </div>
    
                <div class="purchase">
                  <p>${formatPrice(product.price)}</p>
    
                  <button onclick="addToCart('${product.name}')">Купить</button>
                </div>
            </div>
        `;
    }

    container.innerHTML += `
        <div class="control">
            <div class="sort">
                <button onclick="setDefault('default', products)">
                    <img src="img/catalog/sort/default.png" width="28px" height="28px">
                </button>
        
                <button onclick="descendingSort('default', products)">
                    <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                </button>
        
                <button onclick="ascendingSort('default', products)">
                    <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                </button>
            </div>
       
            <form class="form" id="filterForm">
                <label for="number1">От:</label>
                <input type="number" id="number1" name="number1" required>

                <label for="number2">До:</label>
                <input type="number" id="number2" name="number2" required>

                <button type="button" onclick="getNumbers()">Фильтровать по цене</button>
            </form>
        </div>
    `;
}

updateCatalogDisplay(products);

/*-----------------------------------------------------------*/

function setDefault(mode, products) {
    if (mode == 'default') {
        updateCatalogDisplay(products);
    }

    else {
        updateFilteredCatalogDisplay(products);
    }
}

function descendingSort(mode, products) {
    var descendingProducts = products.slice();

    for (let i = 0; i < descendingProducts.length - 1; i++) {
        for (let j = 0; j < descendingProducts.length - 1 - i; j++) {
            if (descendingProducts[j].price < descendingProducts[j + 1].price) {
                const temp = descendingProducts[j];
                descendingProducts[j] = descendingProducts[j + 1];
                descendingProducts[j + 1] = temp;
            }
        }
    }


    if (mode == 'default') {
        updateCatalogDisplay(descendingProducts);
    }

    else {
        updateFilteredCatalogDisplay(descendingProducts);
    }
}

function ascendingSort(mode, products) {
    var ascendingProducts = products.slice();

    for (let i = 0; i < ascendingProducts.length - 1; i++) {
        for (let j = 0; j < ascendingProducts.length - 1 - i; j++) {
            if (ascendingProducts[j].price > ascendingProducts[j + 1].price) {
                const temp = ascendingProducts[j];
                ascendingProducts[j] = ascendingProducts[j + 1];
                ascendingProducts[j + 1] = temp;
            }
        }
    }

    if (mode == 'default') {
        updateCatalogDisplay(ascendingProducts);
    }

    else {
        updateFilteredCatalogDisplay(ascendingProducts);
    }
}

/*-----------------------------------------------------------*/

function getNumbers() {
    var number1 = document.getElementById('number1').value;
    var number2 = document.getElementById('number2').value;

    if (number1 !== '' && number2 !== '') {
        filterProducts(products, Number(number1), Number(number2));
    }
}

function filterProducts(products, min, max) {
    filteredProducts = [];

    for (let product of products) {
        if (product.price >= min && product.price <= max) {
            filteredProducts.push(product);
        }
    }

    updateFilteredCatalogDisplay(filteredProducts);
}

function updateFilteredCatalogDisplay(filteredProducts) {
    var container = document.querySelector(".main");
    var section = document.querySelector(".filtered-catalog")

    if (filteredProducts.length > 0) {
        if (section == undefined) {
            container.innerHTML += ` 
            <section>
                <div class="filtered-catalog">
                    <h2 align="center">Отфильтрованный каталог</h2>
                </div>
            </section>
        `;

            section = document.querySelector(".filtered-catalog");
        }

        else {
            section.innerHTML = '';
        }

        for (let product of filteredProducts) {
            section.innerHTML += `    
                <div class="catalog-item" id="${filteredProducts.indexOf(product)}">
                    <img src="img/catalog/GPU/${product.name}.png" width="150" height="150">
                    <p class="name">${product.name}</p>
        
                    <div class="specifications">
                      <p>Объём видеопамяти: ${product.memoryCapacity} ГБ</p>
                      <p>Тип памяти: ${product.memoryType}</p>
                      <p>Частота графического процессора: ${product.gpuFrequency} МГц</p>
                      <p>Разрядность шины видеопамяти: ${product.busBitDepth} бит</p>
                    </div>
        
                    <div class="purchase">
                      <p>${formatPrice(product.price)}</p>
        
                      <button onclick="addToCart('${product.name}')">Купить</button>
                    </div>
                </div>
            `;
        }

        section.innerHTML += `
            <div class="control">
                <div class="sort">
                    <button onclick="setDefault('filtered', filteredProducts)">
                        <img src="img/catalog/sort/default.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="descendingSort('filtered', filteredProducts)">
                        <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                    </button>
                   
                    <button onclick="ascendingSort('filtered', filteredProducts)">
                        <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                    </button>
                </div>
        `;
    }

    else if (section != undefined) {
        container.removeChild(container.lastChild);
    }
}