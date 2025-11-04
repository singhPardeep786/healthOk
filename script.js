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

function videoLoadOnObserve(){
    document.addEventListener("DOMContentLoaded", function () {
        const videos = document.querySelectorAll('.video_section video[data-src]');
        videos.forEach(video => {
          const src = video.getAttribute('data-src');
          if (!src) return;
          const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (!video.src) {
                  video.src = src;
                }
                video.play();
                obs.unobserve(video);
              }
            });
          }, {threshold: 0.4});
          observer.observe(video);
        });
      });

}
videoLoadOnObserve()

function swiperSlider(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 1200,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
}
swiperSlider();