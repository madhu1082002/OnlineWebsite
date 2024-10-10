// Firebase Firestore API URL for adding a product
const firestoreProductApiUrl = "https://firestore.googleapis.com/v1/projects/online-shopping-fd20d/databases/(default)/documents/Product";

// Function to convert a file to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result.split(',')[1]); // Return just the Base64 string, not the metadata
        };
        reader.onerror = () => {
            reject("Error converting file to Base64");
        };
        reader.readAsDataURL(file);
    });
}

// Function to add a new product to Firestore
async function addProductToFirestore(productDetails) {
    try {
        const response = await fetch(firestoreProductApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    id: { stringValue: productDetails.id },
                    cat_id: { stringValue: productDetails.cat_id },
                    title: { stringValue: productDetails.title },
                    description: { stringValue: productDetails.description },
                    quantity: { integerValue: productDetails.quantity },
                    price: { doubleValue: productDetails.price },
                    imageFile: { stringValue: productDetails.imageFile }
                }
            })
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error('Failed to add product: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Product added successfully:', data);
        return true; // Product successfully added
    } catch (error) {
        console.error("Error adding product:", error);
        return false; // Indicate failure
    }
}

// Function to handle the form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting the normal way

    const id = document.getElementById('id').value;
    const cat_id = document.getElementById('cat_id').value; // Get value from dropdown
    const title = document.getElementById('title').value;
    const description = document.getElementById('des').value;
    const quantity = parseInt(document.getElementById('qty').value);
    const price = parseFloat(document.getElementById('price').value);
    const imageFile = document.getElementById('image').files[0];

    // Validate the form inputs
    if (!id || !cat_id || !title || !description || !quantity || !price || !imageFile) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const imageBase64 = await convertToBase64(imageFile);

        // Prepare the product details to send to Firestore
        const productDetails = {
            id: id,
            cat_id: cat_id,
            title: title,
            description: description,
            quantity: quantity,
            price: price,
            imageFile: imageBase64
        };

        // Log data before submission for debugging
        console.log("Submitting product with details:", productDetails);

        // Add the product to Firestore
        const success = await addProductToFirestore(productDetails);

        if (success) {
            // Show success message
            alert("Product added successfully!");
            // Optionally clear the form
            document.getElementById('addItemForm').reset();
        } else {
            alert("Failed to add product. Please try again.");
        }
    } catch (error) {
        console.error("Error during product submission:", error);
        alert("An error occurred while adding the product.");
    }
}

// Add event listener to the submit button
document.getElementById('submitItemButton').addEventListener('click', handleFormSubmit);
