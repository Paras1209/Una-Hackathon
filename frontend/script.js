// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Watch",
        price: 299.99,
        category: "Fashion",
        description: "Elegant timepiece for any occasion",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 199.99,
        category: "Electronics",
        description: "Premium sound quality",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 249.99,
        category: "Electronics",
        description: "Stay connected",
        image: "https://images.unsplash.com/photo-1596460107916-430662021049"
    },
    {
        id: 4,
        name: "Camera Lens",
        price: 599.99,
        category: "Electronics",
        description: "Professional grade optics",
        image: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e"
    },
    {
        id: 5,
        name: "Vintage Camera",
        price: 399.99,
        category: "Electronics",
        description: "Classic photography",
        image: "https://images.unsplash.com/photo-1616423641454-caa695af6a0f"
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
const categoryDropdownContent = document.getElementById('categoryDropdownContent');
const categoryOptions = document.querySelectorAll('.category-option');
const productTemplate = document.getElementById('product-card-template');
const cartButton = document.getElementById('cartButton');
const cartDropdown = document.getElementById('cartDropdown');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// State
let currentCategory = 'all';
let searchQuery = '';
let cart = [];

// Cart Functions
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Filter products based on search and category
function filterProducts() {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        return matchesSearch && matchesCategory;
    });
}

// Render products
function renderProducts() {
    productGrid.innerHTML = '';
    const filteredProducts = filterProducts();

    filteredProducts.forEach(product => {
        const productCard = productTemplate.content.cloneNode(true);

        const img = productCard.querySelector('img');
        img.src = product.image;
        img.alt = product.name;

        productCard.querySelector('.category-tag').textContent = product.category;
        productCard.querySelector('.product-title').textContent = product.name;
        productCard.querySelector('.product-description').textContent = product.description;
        productCard.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;

        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => addToCart(product));

        productGrid.appendChild(productCard);
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Category dropdown
categoryDropdownBtn.addEventListener('click', () => {
    const dropdown = categoryDropdownBtn.parentElement;
    dropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.category-dropdown')) {
        const dropdown = categoryDropdownBtn.parentElement;
        dropdown.classList.remove('show');
    }
    if (!e.target.closest('.cart-container')) {
        cartDropdown.classList.remove('show');
    }
});

categoryOptions.forEach(option => {
    option.addEventListener('click', () => {
        categoryOptions.forEach(btn => btn.classList.remove('active'));
        option.classList.add('active');
        currentCategory = option.dataset.category;
        categoryDropdownBtn.textContent = option.textContent;
        renderProducts();
        option.parentElement.parentElement.classList.remove('show');
    });
});

// Cart dropdown
cartButton.addEventListener('click', () => {
    cartDropdown.classList.toggle('show');
});

// Initial render
renderProducts();


//chatbot//
const chatWindow = document.querySelector('.chat-window');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');

        // Sample bot responses
        const botResponses = [
            "I understand. How can I help you with that?",
            "That's interesting! Could you tell me more?",
            "I'm here to help. What would you like to know?",
            "Let me assist you with that.",
            "Could you provide more details about your request?"
        ];

        function toggleChat() {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                messageInput.focus();
            }
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function addMessage(content, isBot = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isBot ? 'bot-message' : 'user-message');
            messageDiv.textContent = content;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getRandomResponse() {
            const index = Math.floor(Math.random() * botResponses.length);
            return botResponses[index];
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message === '') return;

            // Add user message
            addMessage(message);
            messageInput.value = '';

            // Simulate bot response after a delay
            setTimeout(() => {
                addMessage(getRandomResponse(), true);
            }, 1000);
        }