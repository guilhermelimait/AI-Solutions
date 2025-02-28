/* filepath: /c:/Users/ITLimaGu/OneDrive - NESTLE/Documents/Code/LLM/static/main.js */
document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send');
    const themeToggle = document.getElementById('theme-toggle');

    // Theme handling
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
    });

    // Send message function
    function sendMessage() {
        const content = userInput.value.trim();
        if (!content) return;

        addMessage(content, true);
        userInput.value = '';
        userInput.style.height = 'auto';

        showLoading();

        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: document.getElementById('model-select').value,
                prompt: content
            })
        })
        .then(response => response.json())
        .then(data => {
            hideLoading();
            addMessage(data.response, false);
        })
        .catch(error => {
            hideLoading();
            addMessage('Error: Could not get response', false);
        });
    }

    // Add message to chat
    function addMessage(content, isUser) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user' : 'bot'}`;

        const header = document.createElement('div');
        header.className = 'message-header';

        const icon = document.createElement('div');
        icon.className = 'message-icon';
        icon.innerHTML = isUser ? '😊' : '🤖'; // Changed from 👤 to 😊

        const name = document.createElement('span');
        name.textContent = isUser ? 'You' : 'Ollama';

        const timestamp = document.createElement('span');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = new Date().toLocaleTimeString();

        const text = document.createElement('div');
        text.className = 'message-content';
        text.textContent = content;

        header.appendChild(icon);
        header.appendChild(name);
        header.appendChild(timestamp);
        message.appendChild(header);
        message.appendChild(text);
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    // Add loading indicator functions
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = `
            <div class="message-icon">🤖</div>
            <div>Ollama is typing</div>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messages.appendChild(loading);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideLoading() {
        const loading = messages.querySelector('.loading');
        if (loading) loading.remove();
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});