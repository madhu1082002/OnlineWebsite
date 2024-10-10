// Firebase Firestore API URL for fetching products
const firestoreProductFetchUrl = "https://firestore.googleapis.com/v1/projects/online-shopping-fd20d/databases/(default)/documents/admin/VBhlfbLADFhPwHo2UJwc";

// Initialize the cart counter to 0 and an array to store added product IDs
let cartCounter = 0;
let addedProductIds = [];

// Create an array to hold the selected products in the cart
let cartItems = [];

// Function to fetch products from Firestore
async function fetchProductsFromFirestore() {
    try {
        const response = await fetch(firestoreProductFetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch products: ' + response.statusText);
        }

        const data = await response.json();
        displayProducts(data.documents);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the previous product list

    if (!products || products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
        return;
    }

    products.forEach(product => {
        const productId = product.fields.cat_id.stringValue;
        const title = product.fields.title.stringValue;
        const description = product.fields.description.stringValue;
        const quantity = product.fields.quantity.integerValue;
        const price = product.fields.price.doubleValue;
        const imageBase64 = product.fields.imageFile.stringValue; // Assuming the image is stored in Base64

        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="data:image/jpeg;base64,${imageBase64}" alt="${title}" />
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Quantity: ${quantity}</p>
            <p>Price: ₹${price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${productId}" data-title="${title}" data-price="${price}" data-quantity="${quantity}">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });

    // Attach click event listeners to "Add to Cart" buttons
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function to handle adding a product to the cart
function addToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    const title = event.target.getAttribute('data-title');
    const price = parseFloat(event.target.getAttribute('data-price'));
    const quantity = parseInt(event.target.getAttribute('data-quantity'));

    // Check if the product ID is already in the addedProductIds array
    if (!addedProductIds.includes(productId)) {
        // If the product ID is unique, add it to the cart
        addedProductIds.push(productId);
        cartCounter++;

        // Update the cart items array
        cartItems.push({ id: productId, title, price, quantity });

        // Update the cart counter in the UI
        document.getElementById('cartCounter').textContent = cartCounter;

        console.log(`Product ${title} added to cart`);
    } else {
        console.log(`Product ${title} is already in the cart`);
    }
}

// Fetch and display products when the page loads
window.onload = () => {
    fetchProductsFromFirestore();

    // Cart button event listener
    document.getElementById('cartButton').addEventListener('click', function() {
        // Redirect to the cart page
        window.location.href = 'cart.html'; // Replace 'cart.html' with the correct cart page URL
    });
};

// Function to display cart items in the cart section
function displayCartItems() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    cartList.innerHTML = ''; // Clear previous items
    cartTotal.innerHTML = ''; // Clear previous total

    if (cartItems.length === 0) {
        cartList.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    let total = 0; // Initialize total price

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartList.appendChild(cartItem);
        total += item.price * item.quantity; // Calculate total price
    });

    // Display total price in the cart section
    cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Call displayCartItems when the page loads to show any existing cart items
window.onload = () => {
    fetchProductsFromFirestore();
    displayCartItems(); // Ensure cart items are displayed when the page loads
};
