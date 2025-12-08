export const initSlider = () => {
    const sliderContent = document.querySelector('.slider-track');
    const buttonNext = document.querySelector('.slider-next');
    const buttonPreview = document.querySelector('.slider-prev');
    let slidesPerView = window.innerWidth >= 768 ? 3 : 1;
    let slideItem = document.querySelectorAll('.slides');
    let index = slidesPerView;
    let speed = 3000;
    let intervalID = null;
    let isMoving = false;

    function getWidthSlide() {
        return sliderContent.clientWidth / slidesPerView;
    }

    // Crear clones según la cantidad visible
    for (let i = 0; i < slidesPerView; i++) {
        const firstClone = slideItem[i].cloneNode(true);
        const lastClone = slideItem[slideItem.length - 1 - i].cloneNode(true);

        sliderContent.append(firstClone);
        sliderContent.prepend(lastClone);
    }

    slideItem = document.querySelectorAll('.slides');

    sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;

    

    const startAutoPlay = () => {
        if (intervalID) clearInterval(intervalID);
        
        intervalID = setInterval(() => {
            if (isMoving) return;
            isMoving = true;
           
            index += slidesPerView;
            sliderContent.style.transition = "transform .4s ease";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
        }, speed);
    };

    const stopAutoPlay = () => {
        clearInterval(intervalID);
        intervalID = null;
    };

    startAutoPlay();
    /*
    sliderContent.addEventListener("transitionend", () => {
       
        isMoving = false;

        if (index === slideItem.length -1) {
            index = 1;
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
        }

        if (index === 0) {
            index = slideItem.length - 2;
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
        }
    });
    */
    sliderContent.addEventListener("transitionend", () => {
        isMoving = false;

        const total = slideItem.length;
        console.log(`index : ${index} total : ${total} view :${slidesPerView}`)

        if (index >= total - slidesPerView) {
            index = slidesPerView;
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
        }

        if (index < slidesPerView) {
            index = total - slidesPerView * 2;
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
        }
    });

    if (buttonNext) {
        buttonNext.addEventListener("click", () => {
            if (isMoving) return; 
            isMoving = true;

            stopAutoPlay();
            index += slidesPerView;
            sliderContent.style.transition = "transform .4s ease";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
            startAutoPlay();
        });
    }

    if (buttonPreview) {
        buttonPreview.addEventListener("click", () => {
            if (isMoving) return; 
            isMoving = true;

            stopAutoPlay();
            index -= slidesPerView;
            sliderContent.style.transition = "transform .4s ease";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
            startAutoPlay();
        });
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
            startAutoPlay();
        }
    });

    window.addEventListener("resize", () => {
        stopAutoPlay();

        // Recalcular slidesPerView según el nuevo viewport
        const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;

        // Si cambió, hay que reajustar todo
        if (newSlidesPerView !== slidesPerView) {
            // Actualizar valor
            slidesPerView = newSlidesPerView;

            // Recalcular ancho
            const width = getWidthSlide();

            // Recalcular index para que quede alineado
            index = slidesPerView;

            // Quitar transición para evitar saltos visibles
            sliderContent.style.transition = "none";
            sliderContent.style.transform = `translateX(-${width * index}px)`;
        }

        // Reiniciar autoplay
        startAutoPlay();
    });

};
