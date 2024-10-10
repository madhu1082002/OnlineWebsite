// Assuming cartItems is populated in localStorage or by a previous script
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0; // Store total price

// Function to display cart items
function displayCartItems() {
    const cartItemList = document.getElementById('cartItemList');
    cartItemList.innerHTML = ''; // Clear previous items

    if (cartItems.length === 0) {
        cartItemList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    totalPrice = 0; // Reset total price for each display

    cartItems.forEach((item, index) => {
        const { title, price, quantity, image } = item;

        // Create cart item card
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('cart-item-card');
        cartItemCard.innerHTML = `
            <div class="cart-item">
                <img src="${image}" alt="${title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${title}</h3>
                    <p class="price">₹${price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrement" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${quantity}</span>
                        <button class="increment" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <p>Subtotal: ₹${(price * quantity).toFixed(2)}</p>
                </div>
            </div>
        `;

        cartItemList.appendChild(cartItemCard);
        totalPrice += price * quantity; // Update total price
    });

    // Display total price
    document.getElementById('totalPrice').textContent = `Subtotal: ₹${totalPrice.toFixed(2)}`;
    document.getElementById('cartCounter').textContent = cartItems.length; // Update cart counter
}

// Update item quantity
function updateQuantity(index, change) {
    if (cartItems[index].quantity + change > 0) {
        cartItems[index].quantity += change;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Re-render the cart
    }
}

// Apply coupon functionality
document.getElementById('applyCouponBtn').addEventListener('click', function() {
    const couponCode = document.getElementById('couponCode').value;
    const couponMessage = document.getElementById('couponMessage');
    
    // Sample coupon validation (you can modify this as per your requirements)
    if (couponCode === "DISCOUNT10") {
        const discount = totalPrice * 0.10; // 10% discount
        totalPrice -= discount; // Apply discount to total price
        couponMessage.textContent = `Coupon applied! You saved ₹${discount.toFixed(2)}.`;
    } else {
        couponMessage.textContent = 'Invalid coupon code.';
    }

    // Update total price display
    document.getElementById('totalPrice').textContent = `Subtotal: ₹${totalPrice.toFixed(2)}`;
});

// Apply credit limit functionality
document.getElementById('applyCreditBtn').addEventListener('click', function() {
    const creditLimit = parseFloat(document.getElementById('creditLimit').value);
    const creditMessage = document.getElementById('creditMessage');
    
    if (!isNaN(creditLimit) && creditLimit > 0) {
        if (creditLimit <= totalPrice) {
            totalPrice -= creditLimit; // Deduct credit limit from total price
            creditMessage.textContent = `Credit of ₹${creditLimit.toFixed(2)} applied.`;
        } else {
            creditMessage.textContent = 'Credit limit exceeds total price.';
        }
    } else {
        creditMessage.textContent = 'Please enter a valid credit amount.';
    }

    // Update total price display
    document.getElementById('totalPrice').textContent = `Subtotal: ₹${totalPrice.toFixed(2)}`;
});

// Checkout button click event
document.getElementById('checkoutBtn').addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // Implement checkout functionality here
});

// Display cart items on page load
window.onload = displayCartItems;
