// Mobile Navbar Toggle
const bar = document.getElementById('bar');
const navbar = document.getElementById('navbar');

bar.addEventListener('click', () => {
    if (navbar.style.right === '0px') {
        navbar.style.right = '-300px';
    } else {
        navbar.style.right = '0px';
    }
});

// Close navbar when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !bar.contains(e.target)) {
        navbar.style.right = '-300px';
    }
});

// Smooth Scroll for "Shop Now" button
const shopBtn = document.querySelector('#hero button');
shopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: document.querySelector('#product1').offsetTop,
        behavior: 'smooth'
    });
});

// Newsletter Signup (basic)
const newsletterBtn = document.querySelector('#newsletter button');
newsletterBtn.addEventListener('click', () => {
    const emailInput = document.querySelector('#newsletter input');
    const email = emailInput.value.trim();
    if(email === ''){
        alert('Please enter your email address.');
    } else {
        alert(`Thank you for signing up, ${email}!`);
        emailInput.value = '';
    }
});

// Cart Icon Click (basic placeholder)
const cartIcons = document.querySelectorAll('.fa-cart-shopping');
cartIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default link behavior
        alert('Added to cart! (This is a placeholder)');
    });
});
