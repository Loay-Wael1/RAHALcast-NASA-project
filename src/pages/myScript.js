// Using ES Module syntax
export function initVideoSlider() {
    let vidBtn = document.querySelectorAll(".video-btn");
    vidBtn.forEach(slide => {
        slide.addEventListener("click", function () {
            document.querySelector(".controls .blue").classList.remove("blue");
            slide.classList.add("blue");
            let src = slide.getAttribute("data-src");
            document.querySelector("#video-slider").src = src;
        });
    });
}

export function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        return new Swiper(".review-slider", {
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2000
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}