function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('show');
}


function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (message) {
        const messagesContainer = document.getElementById('chatMessages');

        // Display the user's message
        const messageElement = document.createElement('div');
        messageElement.style.marginBottom = '1rem';
        messageElement.style.textAlign = 'right';
        messageElement.innerHTML = `
    <div style="background: linear-gradient(135deg, #4158D0 0%, #50c85e 100%); color: white; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block; max-width: 80%;">
        ${message}
    </div>
`;
        messagesContainer.appendChild(messageElement);
        input.value = '';

        // Send the message to the Flask server
        fetch('/ask_question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: message
                })
            })
            .then(response => response.json())
            .then(data => {
                // Display the bot's response
                const botMessage = document.createElement('div');
                botMessage.style.marginBottom = '1rem';
                botMessage.innerHTML = `
        <div style="background: #f0f0f0; color: #333; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block; max-width: 80%;">
            ${data.response}
        </div>
    `;
                messagesContainer.appendChild(botMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            })
            .catch(error => console.error('Error:', error));
    }
}


// Allow sending message with Enter key
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});