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

const serviceContainer = document.getElementById("service-container");

services.forEach(function(service) {

    const serviceCard = document.createElement("article");

    serviceCard.className = "card";

    serviceCard.innerHTML = `
        <h3>${service.name}</h3>
        <p><strong>Duration:</strong> ${service.duration}</p>
        <p>${service.description}</p>
        <p class="price">${service.price}</p>
        <button class="button" onclick="addToCart('${service.name}')">Add to Cart</button>
    `;

    serviceContainer.appendChild(serviceCard);
});
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
            "All required information has been completed.";

        checkoutMessage.style.color = "green";
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

let cart = JSON.parse(localStorage.getItem("wildRoseCart")) || [];

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
    alert(service.name + " added to cart!");
}