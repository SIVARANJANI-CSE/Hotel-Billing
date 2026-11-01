// ================================
// FOOD DATABASE
// ================================

const foods = [

    {
        id: 1,
        name: "Idli",
        price: 10,
        category: "breakfast",
        image: "images/idli.jpg"
    },

    {
        id: 2,
        name: "Dosa",
        price: 50,
        category: "breakfast",
        image: "images/dosa.jpg"
    },

    {
        id: 3,
        name: "Meals",
        price: 100,
        category: "rice",
        image: "images/meals.jpg"
    },

    {
        id: 4,
        name: "Chicken Biryani",
        price: 150,
        category: "rice",
        image: "images/biryani.jpg"
    },

    {
        id: 5,
        name: "Parotta",
        price: 20,
        category: "nonveg",
        image: "images/parotta.jpg"
    },

    {
        id: 6,
        name: "Chicken",
        price: 120,
        category: "nonveg",
        image: "images/chicken.jpg"
    },

    {
        id: 7,
        name: "Egg",
        price: 15,
        category: "nonveg",
        image: "images/egg.jpg"
    },

    {
        id: 8,
        name: "Tea",
        price: 15,
        category: "drinks",
        image: "images/tea.jpg"
    },

    {
        id: 9,
        name: "Coffee",
        price: 20,
        category: "drinks",
        image: "images/coffee.jpg"
    },
     {
        id: 10,
        name: "Chicken Fired Rice",
        price: 120,
        category: "nonveg",
        image: "images/Chicken Rice.jpg"
    },
     {
        id: 11,
        name: "Chicken Noodles",
        price: 120,
        category: "nonveg",
        image: "images/Chicken Noodles.jpg"
    },
     {
        id: 12,
        name: "Paneer fried Rice",
        price: 120,
        category: "rice",
        image: "images/panner.jpg"
    }

];


// ================================
// CART
// ================================

let cart = [];


// ================================
// DISPLAY FOOD
// ================================

function displayFoods(category = "all") {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";


    foods
        .filter(food =>
            category === "all" ||
            food.category === category
        )
        .forEach(food => {

            container.innerHTML += `

                <div class="food-card"
                     onclick="addToCart(${food.id})">

                    <img src="${food.image}"
                         alt="${food.name}">

                    <div class="food-info">

                        <h4>${food.name}</h4>

                        <p class="price">
                            ₹${food.price}
                        </p>

                    </div>

                </div>

            `;

        });

}


// ================================
// ADD FOOD TO CART
// ================================

function addToCart(id) {

    const food =
        foods.find(item => item.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    displayCart();

}


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    container.innerHTML = "";


    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    ₹${item.price}

                </div>


                <div class="quantity">

                    <button
                        onclick="decrease(${item.id})">
                        −
                    </button>

                    ${item.quantity}

                    <button
                        onclick="increase(${item.id})">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    calculateTotal();

}


// ================================
// INCREASE QUANTITY
// ================================

function increase(id) {

    const item =
        cart.find(item => item.id === id);

    if (item) {

        item.quantity++;

    }

    displayCart();

}


// ================================
// DECREASE QUANTITY
// ================================

function decrease(id) {

    const item =
        cart.find(item => item.id === id);


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    displayCart();

}


// ================================
// CALCULATE TOTAL
// NO GST
// ================================

function calculateTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    // Subtotal
    document.getElementById("subtotal")
        .innerText =
        total.toFixed(2);


    // Final Total
    document.getElementById("total")
        .innerText =
        total.toFixed(2);

}


// ================================
// CLEAR CART
// ================================

function clearCart() {

    cart = [];

    displayCart();

}


// ================================
// FILTER FOOD
// ================================

function filterFood(category) {

    displayFoods(category);

}


// ================================
// PAGE NAVIGATION
// ================================

function showPage(page) {

    document.getElementById("billingPage")
        .style.display = "none";

    document.getElementById("dashboardPage")
        .style.display = "none";

    document.getElementById("menuPage")
        .style.display = "none";


    // BILLING

    if (page === "billing") {

        document.getElementById("billingPage")
            .style.display = "block";

    }


    // DASHBOARD

    if (page === "dashboard") {

        document.getElementById("dashboardPage")
            .style.display = "block";

        loadDashboard();

    }


    // MENU

    if (page === "menu") {

        document.getElementById("menuPage")
            .style.display = "block";

        loadMenu();

    }

}


// ================================
// PRINT BILL
// PADAYAN MESS
// ================================

function printBill() {

    if (cart.length === 0) {

        alert("Please select food items!");

        return;

    }


    let subtotal = 0;

    let bill = "";


    // BILL HEADER

    bill += "============================\n";
    bill += "        PADAYAN MESS\n";
    bill += "============================\n";
    bill += "             BILL\n";
    bill += "----------------------------\n\n";


    // FOOD ITEMS

    cart.forEach(item => {

        const amount =
            item.price * item.quantity;


        subtotal += amount;


        bill +=
            `${item.name} x ${item.quantity}\n`;

        bill +=
            `₹${amount.toFixed(2)}\n\n`;

    });


    // TOTAL

    const total = subtotal;


    bill += "----------------------------\n";

    bill +=
        `SUBTOTAL : ₹${subtotal.toFixed(2)}\n`;

    bill +=
        `TOTAL    : ₹${total.toFixed(2)}\n`;

    bill += "----------------------------\n";

    bill += "        THANK YOU!\n";

    bill += "     VISIT AGAIN 😊\n";

    bill += "============================";


    // SAVE BILL

    saveBill(total);


    // PRINT WINDOW

    const printWindow =
        window.open(
            "",
            "",
            "width=400,height=600"
        );


    printWindow.document.write(`

        <html>

        <head>

            <title>Padayan Mess Bill</title>

            <style>

                body {

                    font-family:
                        monospace;

                    padding: 20px;

                }

                pre {

                    font-size: 16px;

                    line-height: 1.5;

                    white-space: pre-wrap;

                }

            </style>

        </head>

        <body>

            <pre>${bill}</pre>

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    printWindow.print();

}


// ================================
// SAVE BILL
// ================================

function saveBill(total) {

    let sales =
        JSON.parse(
            localStorage.getItem("sales")
        ) || [];


    const bill = {

        id:
            "BILL-" +
            Date.now(),

        date:
            new Date().toLocaleString(),

        items:
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            ),

        total: total

    };


    sales.push(bill);


    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

}


// ================================
// OWNER DASHBOARD
// ================================

function loadDashboard() {

    const sales =
        JSON.parse(
            localStorage.getItem("sales")
        ) || [];


    let totalSales = 0;

    let totalItems = 0;


    sales.forEach(sale => {

        totalSales +=
            sale.total;

        totalItems +=
            sale.items;

    });


    // TOTAL SALES

    document.getElementById("dashSales")
        .innerText =
        totalSales.toFixed(2);


    // TOTAL ORDERS

    document.getElementById("dashOrders")
        .innerText =
        sales.length;


    // TOTAL ITEMS

    document.getElementById("dashItems")
        .innerText =
        totalItems;


    // SALES TABLE

    const table =
        document.getElementById("salesTable");


    table.innerHTML = "";


    sales
        .slice()
        .reverse()
        .forEach(sale => {

            table.innerHTML += `

                <tr>

                    <td>
                        ${sale.id}
                    </td>

                    <td>
                        ${sale.date}
                    </td>

                    <td>
                        ${sale.items}
                    </td>

                    <td>
                        ₹${sale.total.toFixed(2)}
                    </td>

                </tr>

            `;

        });

}


// ================================
// MENU PAGE
// ================================

function loadMenu() {

    const container =
        document.getElementById("menuList");


    container.innerHTML = "";


    foods.forEach(food => {

        container.innerHTML += `

            <div class="dash-card">

                <b>
                    ${food.name}
                </b>

                <span style="float:right">

                    ₹${food.price}

                </span>

            </div>

        `;

    });

}


// ================================
// TODAY'S DATE
// ================================

const todayElement =
    document.getElementById("today");


if (todayElement) {

    todayElement.innerText =
        new Date().toLocaleDateString();

}


// ================================
// INITIAL LOAD
// ================================

displayFoods();

displayCart();