import { scrollAnimationHeader, scrollAnimationSection } from "./animation.js";
import { activeNavBar } from "./nav-bar.js";
import { initSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
    scrollAnimationHeader()
    scrollAnimationSection()
    activeNavBar()
    initSlider()
});


