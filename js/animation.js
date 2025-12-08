const scrollAnimationHeader = () => {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        console.log('scroll')
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    });
}

const  scrollAnimationSection = () => {
    const elementos = document.querySelectorAll('.scroll-anim');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Opcional: dejar de observar para que no se repita
        observer.unobserve(entry.target);
        }
    });
    }, {
    threshold: 0.25 // porcentaje que debe entrar en pantalla
    });

    elementos.forEach(el => observer.observe(el));
}


