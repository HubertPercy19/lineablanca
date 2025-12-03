export const activeNavBar = () => {
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

}