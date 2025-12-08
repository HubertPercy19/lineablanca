const navButton = document.querySelector('.nav__button');
const navButtonMobile = document.querySelector('.nav__button__mobile');
const navList = document.querySelector('.nav__mobile');
const anchorOption = document.querySelector('.nav__list__mobile');

const activeNavBar = () => {
    navButton.addEventListener('click', () => {
        navButton.classList.add('active');
        navList.classList.toggle('active')
    })
    navButtonMobile.addEventListener('click', () => {
      navButtonMobile.classList.add('hidden');
      navButton.classList.remove('active');
      navList.classList.remove('active')
    })

}

const activeOptionsMovile = () => {
  anchorOption.addEventListener('click', (event) => {
      if (event.target.classList.contains('nav__list__mobile__link')) {
        navButtonMobile.classList.add('hidden');
        navButton.classList.remove('active');
        navList.classList.remove('active')
      } 
  });
}

