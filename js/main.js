import { scrollAnimationHeader, scrollAnimationSection } from "./animation.js";
import { sendForm } from "./form.js";
import { activeNavBar } from "./nav-bar.js";
import { initSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
    scrollAnimationHeader()
    scrollAnimationSection()
    activeNavBar()
    initSlider()
    sendForm()
    // Aquí ya puedes acceder a tus elementos del HTML
});


