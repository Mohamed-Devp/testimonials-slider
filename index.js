let slides = Array.from(document.querySelectorAll('.slide'));
let comments = Array.from(document.querySelectorAll('.comment'));
let persons = Array.from(document.querySelectorAll('.person'));

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function rotateArray(array, direction) {
    let shiftedElement;

    if (direction == -1) {
        shiftedElement = array.shift();
        return [...array, shiftedElement]
    }

    shiftedElement = array.pop();
    return [shiftedElement, ...array]
}

function renderSlides() {
    // Update the slides
    slides.forEach((slide, index) => {
        slide.style.zIndex = slides.length - index;
    });

    // Update the comment & person
    for (let i = 0; i < slides.length; i++) {
        const updatedDisplay = i == 0 ? 'block' : 'none';
        comments[i].style.display = updatedDisplay;
        persons[i].style.display = updatedDisplay;
    }
}

function changeSlide(direction) {
    // Animate the top slide
    const animatedSlide = slides[0];

    animatedSlide.classList.add(direction === 1 ? 'forward' : 'backward');
    void animatedSlide.offsetWidth;

    setTimeout(() => {
        animatedSlide.classList.remove('forward', 'backward');

        // Change the slide
        slides = rotateArray(slides, direction);
        comments = rotateArray(comments, direction);
        persons = rotateArray(persons, direction);

        renderSlides();
    }, 1000)
}

function onMount() {
    renderSlides();

    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1))

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            changeSlide(event.key === 'ArrowLeft' ? -1 : 1);
        }
    });
}

document.addEventListener('DOMContentLoaded', onMount);