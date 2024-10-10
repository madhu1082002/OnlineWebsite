// Function to show a message when hovering over a button
function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
}

// Function to clear the message when the user moves away from the button
function clearMessage() {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = 'Hover over the buttons to see more details!';
}