export const initSlider = () => {
    const sliderContent = document.querySelector('.slider-track');
    const buttonNext = document.querySelector('.slider-next');
    const buttonPreview = document.querySelector('.slider-prev');

    let slidesPerView = window.innerWidth >= 768 ? 3 : 1;
    let originalSlides = [...document.querySelectorAll('.slides')];
    let slideItem = [];
    let index = slidesPerView;
    let speed = 3000;
    let intervalID = null;
    let isMoving = false;

    function getWidthSlide() {
        return sliderContent.clientWidth / slidesPerView;
    }

    // ------------------------------
    // 🔁 CREAR CLONES
    // ------------------------------
    function createClones() {
        sliderContent.innerHTML = ""; // limpiar
       
        // agregar clones al inicio
        for (let i = slidesPerView; i > 0; i--) {
            const clone = originalSlides[originalSlides.length - i].cloneNode(true);
            sliderContent.appendChild(clone);
        }

        // agregar slides originales
        originalSlides.forEach(s => sliderContent.appendChild(s.cloneNode(true)));

        // agregar clones al final
        for (let i = 0; i < slidesPerView; i++) {
            const clone = originalSlides[i].cloneNode(true);
            sliderContent.appendChild(clone);
        }

        slideItem = sliderContent.querySelectorAll(".slides");
    }

    // ------------------------------
    // 🔁 POSICIONAR INICIAL
    // ------------------------------
    function resetPosition() {
        index = slidesPerView;
        sliderContent.style.transition = "none";
        sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
    }

    // ------------------------------
    // ▶️ AUTO PLAY
    // ------------------------------
    const startAutoPlay = () => {
        if (intervalID) clearInterval(intervalID);

        intervalID = setInterval(() => {
            if (isMoving) return;
            isMoving = true;

            index += slidesPerView;
            sliderContent.style.transition = "transform .7s cubic-bezier(0.83, 0, 0.17, 1)";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
        }, speed);
    };

    const stopAutoPlay = () => {
        clearInterval(intervalID);
        intervalID = null;
    };

    // ------------------------------
    // 🔁 INICIO
    // ------------------------------
    createClones();
    resetPosition();
    startAutoPlay();

    // ------------------------------
    // 🔁 INFINITE LOOP
    // ------------------------------
    sliderContent.addEventListener("transitionend", () => {
        isMoving = false;
        const total = slideItem.length;

        if (index >= total - slidesPerView) {
            resetPosition(); 
        }

        if (index < slidesPerView) {
            index = total - slidesPerView * 2;
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
        }
    });

    // ------------------------------
    // ⏭️ BOTÓN NEXT
    // ------------------------------
    if (buttonNext) {
        buttonNext.addEventListener("click", () => {
            if (isMoving) return;
            isMoving = true;

            stopAutoPlay();
            index += slidesPerView;
            sliderContent.style.transition = "transform .7s cubic-bezier(0.83, 0, 0.17, 1)";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
            startAutoPlay();
        });
    }

    // ------------------------------
    // ⏮️ BOTÓN PREV
    // ------------------------------
    if (buttonPreview) {
        buttonPreview.addEventListener("click", () => {
            if (isMoving) return;
            isMoving = true;

            stopAutoPlay();
            index -= slidesPerView;
            sliderContent.style.transition = "transform .7s cubic-bezier(0.83, 0, 0.17, 1)";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
            startAutoPlay();
        });
    }

    // ------------------------------
    // ⛔ PAUSAR SI CAMBIA DE PESTAÑA
    // ------------------------------
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAutoPlay();
        else startAutoPlay();
    });

    // ------------------------------
    // 📏 RESIZE — RECREAR TODO
    // ------------------------------
    window.addEventListener("resize", () => {
        stopAutoPlay();

        const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;

        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            createClones();
            resetPosition();
        } else {
            // solo recalcular posición
            resetPosition();
        }

        startAutoPlay();
    });
};
