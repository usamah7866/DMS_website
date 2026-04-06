const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));

    window.addEventListener("load", () => {
        revealElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add("visible");
            }
        });
    });
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

const campusSelect = document.getElementById("campusSelect");
const targetCampusName = document.getElementById("targetCampusName");
const targetCampusEmail = document.getElementById("targetCampusEmail");
const admissionForm = document.getElementById("admissionForm");
const submissionNote = document.getElementById("submissionNote");
const careerCampusSelect = document.getElementById("careerCampusSelect");
const careerCampusName = document.getElementById("careerCampusName");
const careerTargetEmail = document.getElementById("careerTargetEmail");
const careerForm = document.getElementById("careerForm");
const careerSubmissionNote = document.getElementById("careerSubmissionNote");

if (campusSelect && targetCampusName && targetCampusEmail) {
    const updateCampusRouting = () => {
        const selectedOption = campusSelect.options[campusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus Email";
        const campusEmail = selectedOption?.dataset?.email || "dmchool0077@gmail.com";

        targetCampusName.textContent = campusName === "Selected Campus Email" ? campusName : `${campusName} Email`;
        targetCampusEmail.textContent = campusEmail;
    };

    campusSelect.addEventListener("change", updateCampusRouting);
    updateCampusRouting();
}

if (admissionForm && submissionNote && campusSelect) {
    admissionForm.addEventListener("submit", () => {
        const selectedOption = campusSelect.options[campusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus";
        submissionNote.textContent = `Submitting admission form for ${campusName}. Please wait...`;
    });
}

if (careerCampusSelect && careerCampusName && careerTargetEmail) {
    const updateCareerRouting = () => {
        const selectedOption = careerCampusSelect.options[careerCampusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus Email";
        const campusEmail = selectedOption?.dataset?.email || "dmchool0077@gmail.com";

        careerCampusName.textContent = campusName === "Selected Campus Email" ? campusName : `${campusName} Email`;
        careerTargetEmail.textContent = campusEmail;
    };

    careerCampusSelect.addEventListener("change", updateCareerRouting);
    updateCareerRouting();
}

if (careerForm && careerSubmissionNote) {
    careerForm.addEventListener("submit", () => {
        careerSubmissionNote.textContent = "Submitting your career application and CV to the school career inbox.";
    });
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
    const track = carousel.querySelector("[data-carousel-track]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = document.querySelector("[data-carousel-dots]");
    const cards = track ? Array.from(track.children) : [];
    let currentIndex = 0;

    const getVisibleCards = () => {
        if (window.innerWidth <= 700) return 1;
        if (window.innerWidth <= 1100) return 2;
        return 3;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCards());

    const renderDots = () => {
        if (!dotsContainer) return;

        const dotCount = getMaxIndex() + 1;
        dotsContainer.innerHTML = "";

        for (let index = 0; index < dotCount; index += 1) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
            if (index === currentIndex) {
                dot.classList.add("active");
            }
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    };

    const updateCarousel = () => {
        if (!track || !cards.length) return;

        const maxIndex = getMaxIndex();
        currentIndex = Math.min(currentIndex, maxIndex);

        const cardWidth = cards[0].getBoundingClientRect().width;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0");
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        if (prevButton) prevButton.disabled = currentIndex === 0;
        if (nextButton) nextButton.disabled = currentIndex === maxIndex;

        renderDots();
    };

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
            updateCarousel();
        });
    }

    window.addEventListener("resize", updateCarousel);
    window.addEventListener("load", updateCarousel);
    updateCarousel();
}
