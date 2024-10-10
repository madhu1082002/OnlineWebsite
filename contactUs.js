document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form field values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "red";
            return;
        }

        // Prepare data for the .txt file
        const formData = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

        // Create a Blob from the form data
        const blob = new Blob([formData], { type: 'text/plain' });

        // Create a link element to download the Blob as a .txt file
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'form-data.txt';

        // Programmatically click the download link to trigger the download
        downloadLink.click();

        // Display a success message
        formMessage.textContent = `Thank you, ${name}. Your message has been saved as a .txt file!`;
        formMessage.style.color = "#0066cc";

        // Clear the form
        contactForm.reset();
    });
});
