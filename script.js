const services = [
    {
        name: "Initial Acupuncture Consultation",
        duration: "90 minutes",
        price: "$120",
        description: "A comprehensive consultation followed by an individualized acupuncture treatment."
    },
    {
        name: "Follow-Up Acupuncture Treatment",
        duration: "60 minutes",
        price: "$85",
        description: "Continued acupuncture care based on your established treatment plan."
    },
    {
        name: "Cupping Therapy",
        duration: "45 minutes",
        price: "$75",
        description: "A complementary wellness service focused on relaxation and recovery."
    },
    {
        name: "Acupuncture for Stress Support",
        duration: "60 minutes",
        price: "$85",
        description: "A personalized acupuncture session focused on relaxation and stress management."
    },
    {
        name: "Acupuncture for Sleep Support",
        duration: "60 minutes",
        price: "$85",
        description: "Individualized acupuncture care designed to support healthy sleep habits."
    },
    {
        name: "Women's Wellness Acupuncture",
        duration: "60 minutes",
        price: "$85",
        description: "Personalized acupuncture care supporting women's wellness needs."
    },
    {
        name: "Pain Support Acupuncture",
        duration: "60 minutes",
        price: "$85",
        description: "Acupuncture treatment focused on supporting comfort and mobility."
    },
    {
        name: "Wellness Acupuncture Session",
        duration: "60 minutes",
        price: "$85",
        description: "A personalized session designed to support overall wellness and balance."
    },
    {
        name: "Acupuncture and Cupping Session",
        duration: "75 minutes",
        price: "$100",
        description: "A combined session incorporating acupuncture and complementary cupping therapy."
    },
    {
        name: "Extended Acupuncture Session",
        duration: "90 minutes",
        price: "$120",
        description: "An extended individualized acupuncture session with additional time for treatment and care."
    }
];
// Give each service a starting inventory of 5
services.forEach(function(service) {
    service.stock = 5;
});
let cart = JSON.parse(localStorage.getItem("wildRoseCart")) || [];
function getAvailableStock(serviceName) {
    const service = services.find(function(item) {
        return item.name === serviceName;
    });

    if (!service) {
        return 0;
    }

    const cartItem = cart.find(function(item) {
        return item.name === serviceName;
    });

    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return service.stock - quantityInCart;
}
const serviceContainer = document.getElementById("service-container");

function renderServices() {
    if (!serviceContainer) {
        return;
    }

    serviceContainer.innerHTML = "";

    services.forEach(function(service) {
        const availableStock = getAvailableStock(service.name);

        const serviceCard = document.createElement("article");
        serviceCard.className = "card";

        serviceCard.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Duration:</strong> ${service.duration}</p>
            <p>${service.description}</p>
            <p class="price">${service.price}</p>
            <p><strong>Available:</strong> ${availableStock}</p>

            <button
                class="button"
                onclick="addToCart('${service.name}')"
                ${availableStock === 0 ? 'disabled title="Out of Stock"' : ''}
            >
                ${availableStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        `;

        serviceContainer.appendChild(serviceCard);
    });
}

renderServices();
// ==============================
// Contact Form Validation
// ==============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email");
        const message = document.getElementById("message");
        const formMessage = document.getElementById("formMessage");

        let errors = [];

        if (email.value.trim() === "") {
            errors.push("Email address is required.");
        } else if (!email.value.includes("@")) {
            errors.push("Please enter a valid email address.");
        }

        if (message.value.trim() === "") {
            errors.push("Message is required.");
        }

        if (errors.length > 0) {
            formMessage.textContent = errors.join(" ");
            formMessage.style.color = "darkred";
        } else {
            formMessage.textContent = "Thank you! Your message has been submitted.";
            formMessage.style.color = "green";
            contactForm.reset();
        }
    });
}


// ==============================
// Checkout Form Validation
// ==============================

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const requiredFields = [
            "cardholderName",
            "cardNumber",
            "expirationDate",
            "securityCode",
            "shippingName",
            "streetAddress",
            "city",
            "state",
            "zipCode",
            "phoneNumber"
        ];

        const checkoutMessage = document.getElementById("checkoutMessage");

        let missingFields = [];

        requiredFields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);

            if (field && field.value.trim() === "") {
                missingFields.push(field.previousElementSibling.textContent);
            }
        });

        if (missingFields.length > 0) {
            checkoutMessage.textContent =
                "Please complete the following required fields: " +
                missingFields.join(", ");

            checkoutMessage.style.color = "darkred";
            return;
        }

        checkoutMessage.textContent =
            "Order confirmed! Thank you for your purchase.";

        checkoutMessage.style.color = "green";
        cart = [];
    saveCart();
    renderCheckoutSummary();

    checkoutMessage.textContent =
    "Order confirmed! Thank you for your purchase.";
    });
}


// ==============================
// Coupon Code Validation
// ==============================

function applyCoupon(total) {

    const couponInput = document.getElementById("couponCode");

    if (!couponInput) {
        return total;
    }

    const couponCode = couponInput.value.trim().toUpperCase();

    if (couponCode === "SAVE10") {

        const discount = total * 0.10;
        const discountedTotal = total - discount;

        alert("Coupon SAVE10 applied! You saved 10%.");

        return discountedTotal;

    } else if (couponCode !== "") {

        alert("That coupon code is not valid.");

        return total;
    }

    return total;
}
// ==============================
// Smart Cart
// ==============================


function saveCart() {
    localStorage.setItem("wildRoseCart", JSON.stringify(cart));
}

function getNumericPrice(price) {
    return Number(price.replace("$", ""));
}

function addToCart(serviceName) {
    const service = services.find(function(item) {
        return item.name === serviceName;
    });

    if (!service) {
        return;
        const availableStock = getAvailableStock(service.name);

    if (availableStock <= 0) {
    alert("This item is out of stock.");
    renderServices();
    return;
}
    }

    const existingItem = cart.find(function(item) {
        return item.name === service.name;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: service.name,
            price: getNumericPrice(service.price),
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    renderServices();
    alert(service.name + " added to cart!");
}
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.innerHTML = `
            <p>
                <strong>${item.name}</strong><br>
                Price: $${item.price.toFixed(2)}<br>
                Quantity: ${item.quantity}<br>
                Item Total: $${itemTotal.toFixed(2)}
            </p>

            <button type="button" onclick="decreaseQuantity(${index})">-</button>
            <button type="button" onclick="increaseQuantity(${index})">+</button>
            <button type="button" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(index) {
    const cartItem = cart[index];

    const service = services.find(function(item) {
        return item.name === cartItem.name;
    });

    if (!service) {
        return;
    }

    if (cartItem.quantity >= service.stock) {
        alert("This item is out of stock.");
        return;
    }

    cartItem.quantity += 1;

    saveCart();
    renderCart();
    renderServices();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
    renderServices();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    renderServices();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    renderServices();
}

renderCart();
function renderCheckoutSummary() {
    const checkoutItems = document.getElementById("checkout-cart-items");
    const checkoutTotal = document.getElementById("checkout-cart-total");

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement("p");
        itemElement.textContent =
            item.name +
            " — Qty: " +
            item.quantity +
            " — $" +
            itemTotal.toFixed(2);

        checkoutItems.appendChild(itemElement);
    });

    checkoutTotal.textContent = total.toFixed(2);
}

renderCheckoutSummary();