// Add any JavaScript interactions here, if needed
// For example, you can add a hover effect or cart counter functionality
document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    cartIcon.addEventListener('click', function () {
        window.location.href = 'cart.html';  // Redirect to cart page when clicked
    });
});

// Example script for handling the subscription form and possibly adding dynamic behavior

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        if (email) {
            alert(`Thank you for subscribing, ${email}!`);
            form.reset();
        } else {
            alert("Please enter a valid email address.");
        }
    });
});
