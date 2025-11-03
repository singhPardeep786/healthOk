function toggleHamburgerMenu() {
     // Get toggler button and icon bars
     const toggler = document.querySelector('.navbar-toggler');
     const bar1 = document.getElementById('bar1');
     const bar2 = document.getElementById('bar2');
     // Function to update bars
     function updateBars() {
         const expanded = toggler.getAttribute('aria-expanded') === 'true';
         if (expanded) {
             bar1.style.transform = "rotate(45deg)";
             bar1.style.top = "50%";
             bar2.style.transform = "rotate(-45deg)";
             bar2.style.top = "50%";
         } else {
             bar1.style.transform = "rotate(0deg)";
             bar1.style.top = "25%";
             bar2.style.transform = "rotate(0deg)";
             bar2.style.top = "65%";
         }
     }
     toggler.addEventListener('click', function() {
         // Bootstrap toggler updates aria-expanded after click, so execute after delay
         setTimeout(updateBars, 10);
     });
     // ensure state on load
     document.addEventListener('DOMContentLoaded', updateBars);
}

document.addEventListener('DOMContentLoaded', toggleHamburgerMenu);

function toggleMobileDropdown(e) {
    e.preventDefault();
    var menu = document.getElementById('mobile-products-menu');
    if (menu.classList.contains('opacity-0')) {
        menu.classList.remove('opacity-0', 'invisible');
        menu.classList.add('opacity-100', 'visible', 'top-[100%]');
    } else {
        menu.classList.remove('opacity-100', 'visible', 'top-[100%]');
        menu.classList.add('opacity-0', 'invisible');
    }
}