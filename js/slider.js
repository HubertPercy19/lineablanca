export const initSlider = () => {
    const sliderContent = document.querySelector('.slider-track');
    const buttonNext = document.querySelector('.slider-next');
    const buttonPreview = document.querySelector('.slider-prev');
    let slideItem = document.querySelectorAll('.slides');
    let index = 1;
    let speed = 30000;
    let intervalID = null;
    let isMoving = false;

    function getWidthSlide() {
        const slidesPerView = window.innerWidth >= 768 ? 3 : 1;
        return sliderContent.clientWidth / slidesPerView;
    }

    /*
    const firstClone = slideItem[0].cloneNode(true);
    const lastClone = slideItem[slideItem.length -1].cloneNode(true);

    sliderContent.prepend(lastClone);
    sliderContent.append(firstClone);
    */
   const slidesPerView = window.innerWidth >= 768 ? 3 : 1;

    // Crear clones según la cantidad visible
    for (let i = 0; i < slidesPerView; i++) {
        const firstClone = slideItem[i].cloneNode(true);
        const lastClone = slideItem[slideItem.length - 1 - i].cloneNode(true);

        sliderContent.append(firstClone);
        sliderContent.prepend(lastClone);
    }

    slideItem = document.querySelectorAll('.slides');

    if ( window.innerWidth <= 768) {
        sliderContent.style.transform = `translateX(-${getWidthSlide() * index}px)`;
    }
    

    const startAutoPlay = () => {
        if (intervalID) clearInterval(intervalID);
 
        intervalID = setInterval(() => {
            if (isMoving) return;
            isMoving = true;

            index ++;
            sliderContent.style.transition = "transform .4s ease";
            sliderContent.style.transform = `translateX(-${getWidthSlide() * index }px)`;
        }, speed);
    };

    const stopAutoPlay = () => {
        clearInterval(intervalID);
        intervalID = null;
    };

    startAutoPlay();

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

    if (buttonNext) {
        buttonNext.addEventListener("click", () => {
            if (isMoving) return; 
            isMoving = true;

            stopAutoPlay();
            index++;
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
            index--;
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
};
