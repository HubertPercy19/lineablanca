const navButton = document.querySelector('.nav__button');
const navButtonMobile = document.querySelector('.nav__button__mobile');
const navList = document.querySelector('.nav__mobile');
navButton.addEventListener('click', () => {
    navButton.classList.add('active');
    navList.classList.toggle('active')
})

navButtonMobile.addEventListener('click', () => {
  navButtonMobile.classList.add('hidden');
  navButton.classList.remove('active');
  navList.classList.remove('active')
})

const header = document.querySelector   ('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    console.log('scroll')
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

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
  threshold: 0.5 // porcentaje que debe entrar en pantalla
});

elementos.forEach(el => observer.observe(el));

const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".section__preguntas__card");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

let index = 1;
let autoplaySpeed = 3000;

// Clonar el primero y último para infinito real
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

let items = document.querySelectorAll(".section__preguntas__card");

function cardWidth() {
    return items[0].getBoundingClientRect().width; // width + gap
}

// Posición inicial (después del clon)
function setInitialPosition() {
    track.style.transform = `translateX(-${cardWidth() * index}px)`;
}

setInitialPosition();

// Movimiento del slider
function moveToIndex() {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${cardWidth() * index}px)`;
}

// Botón NEXT
nextBtn.addEventListener("click", () => {
    index++;
    moveToIndex();
    restartAutoplay();
});

// Botón PREV
prevBtn.addEventListener("click", () => {
    index--;
    moveToIndex();
    restartAutoplay();
});

// Reparar salto cuando llega a clones
track.addEventListener("transitionend", () => {
    if (items[index].isSameNode(firstClone)) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${cardWidth() * index}px)`;
    }
    if (items[index].isSameNode(lastClone)) {
        track.style.transition = "none";
        index = cards.length;
        track.style.transform = `translateX(-${cardWidth() * index}px)`;
    }
});

// AUTOPLAY
let autoplay = setInterval(() => {
    index++;
    moveToIndex();
}, autoplaySpeed);

function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
        index++;
        moveToIndex();
    }, autoplaySpeed);
}

// Ajuste al redimensionar
window.addEventListener("resize", () => {
    track.style.transition = "none";
    setInitialPosition();
});
