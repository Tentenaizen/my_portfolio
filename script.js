const btn = document.getElementById('theme-btn');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateButton(savedTheme);
}

// Theme toggle
if (btn) {
    btn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateButton(newTheme);
    });
}

// Update theme button icon
function updateButton(theme) {
    if (!btn) return;

    btn.innerHTML = theme === 'dark'
        ? '<span class="material-symbols-outlined">light_mode</span>'
        : '<span class="material-symbols-outlined">dark_mode</span>';
}

// Share page
async function sharePage() {
    const url = window.location.href;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Aries - Profile',
                text: 'Check out my profile!',
                url: url
            });
        } catch (error) {
            // User cancelled sharing — no action needed
        }
    } else if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard! ✅');
        } catch (error) {
            alert('Unable to copy the link.');
        }
    } else {
        alert('Sharing is not supported on this browser.');
    }
}