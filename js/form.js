const buttonSubmit = document.querySelector('form');
const addForm = () => {
    buttonSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('hola')
    })
}
