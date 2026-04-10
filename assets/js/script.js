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

const chatbotConfig = {
    suggestedPrompts: [
        "How can I apply for admission?",
        "What documents are required for admission?",
        "Is there an admission test?",
        "What are the school timings?",
        "How can I apply for a teacher job?"
    ],
    assistantName: "Nova"
};

const getPageDepth = () => Number(document.body?.dataset?.pageDepth || "0");
const buildRoute = (slug) => `${getPageDepth() > 0 ? "../" : ""}${slug}/`;
const buildAssetPath = (assetPath) => `${getPageDepth() > 0 ? "../" : ""}${assetPath}`;
let chatbotKnowledgeBase = null;

const createChatbotMarkup = () => `
    <button class="chatbot-launcher" id="chatbotLauncher" type="button" aria-controls="chatbotPanel" aria-expanded="false">
        <span class="chatbot-launcher-dot"></span>
        ${chatbotConfig.assistantName}
    </button>
    <section class="chatbot-panel" id="chatbotPanel" aria-label="DMS school assistant" hidden>
        <div class="chatbot-panel__header">
            <div>
                <p class="chatbot-panel__eyebrow">${chatbotConfig.assistantName}</p>
                <h3>Admissions and school help</h3>
            </div>
            <button class="chatbot-panel__close" id="chatbotClose" type="button" aria-label="Close chatbot">&times;</button>
        </div>
        <div class="chatbot-panel__body">
            <div class="chatbot-thread" id="chatbotThread" aria-live="polite">
                <article class="chatbot-message chatbot-message--bot">
                    <p>Assalam-o-Alaikum. I am ${chatbotConfig.assistantName}. I can help with admissions, academics, school timings, activities, campus guidance, and teacher career questions. For fee matters, I will guide you to the school office.</p>
                </article>
            </div>
            <div class="chatbot-suggestions" id="chatbotSuggestions"></div>
        </div>
        <form class="chatbot-form" id="chatbotForm">
            <textarea id="chatbotInput" name="message" rows="1" placeholder="Ask about admission, school timings, campus, or careers..."></textarea>
            <div class="chatbot-form__actions">
                <button class="chatbot-send" type="submit" aria-label="Send message">&#10148;</button>
            </div>
        </form>
    </section>
`;

const escapeHtml = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const addChatMessage = (thread, text, sender) => {
    thread.insertAdjacentHTML(
        "beforeend",
        `
            <article class="chatbot-message chatbot-message--${sender}">
                <p>${escapeHtml(text)}</p>
            </article>
        `
    );

    thread.scrollTop = thread.scrollHeight;
};

const normalizeText = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const tokenize = (value) => normalizeText(value).split(" ").filter((token) => token.length > 1);

const loadChatbotKnowledge = async () => {
    if (chatbotKnowledgeBase) return chatbotKnowledgeBase;

    const response = await fetch(buildAssetPath("assets/data/chatbot-knowledge.json"));
    if (!response.ok) {
        throw new Error("Unable to load chatbot knowledge.");
    }

    chatbotKnowledgeBase = await response.json();
    return chatbotKnowledgeBase;
};

const findBestEntries = (message, knowledge) => {
    const normalized = normalizeText(message);
    const tokens = tokenize(message);

    return knowledge.entries
        .map((entry) => {
            const entryText = normalizeText(`${entry.answer} ${entry.category} ${entry.keywords.join(" ")} ${entry.details.join(" ")}`);
            let score = 0;

            entry.keywords.forEach((keyword) => {
                const normalizedKeyword = normalizeText(keyword);
                if (normalized.includes(normalizedKeyword)) {
                    score += normalizedKeyword.includes(" ") ? 7 : 4;
                }
            });

            tokens.forEach((token) => {
                if (entryText.includes(token)) {
                    score += 1;
                }
            });

            return { entry, score };
        })
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 2);
};

const buildKnowledgeReply = async (message) => {
    const knowledge = await loadChatbotKnowledge();
    const normalized = normalizeText(message);

    if (knowledge.guardrails.blocked_topics.some((topic) => normalized.includes(normalizeText(topic)))) {
        return `${knowledge.guardrails.blocked_response} You can also use ${buildRoute("contact")} or speak with the campus receptionist.`;
    }

    const bestEntries = findBestEntries(message, knowledge);

    if (!bestEntries.length) {
        return `I can help with admissions, school timings, academics, campus guidance, student life, and careers. Please ask in a little more detail, or use ${buildRoute("contact")} to reach the school directly.`;
    }

    const primary = bestEntries[0].entry;
    const secondary = bestEntries[1]?.entry;
    const detailLine = primary.details?.length ? ` ${primary.details[0]}` : "";

    if (primary.id === "campus-contacts") {
        return `${primary.answer} ${detailLine} For complete details, please visit ${buildRoute("contact")}.`;
    }

    if (primary.category === "careers") {
        return `${primary.answer}${detailLine} You can also review ${buildRoute("careers")} for school hiring information.`;
    }

    if (primary.category === "admissions") {
        return `${primary.answer}${detailLine} If you want, you can also ask about documents, tests, school timings, or campus contact details.`;
    }

    if (secondary && secondary.category === primary.category && secondary.id !== primary.id) {
        return `${primary.answer}${detailLine} ${secondary.answer}`;
    }

    return `${primary.answer}${detailLine}`;
};

const initializeChatbot = () => {
    if (document.getElementById("chatbotLauncher")) return;

    document.body.insertAdjacentHTML("beforeend", createChatbotMarkup());

    const launcher = document.getElementById("chatbotLauncher");
    const panel = document.getElementById("chatbotPanel");
    const closeButton = document.getElementById("chatbotClose");
    const form = document.getElementById("chatbotForm");
    const input = document.getElementById("chatbotInput");
    const thread = document.getElementById("chatbotThread");
    const suggestions = document.getElementById("chatbotSuggestions");
    let suggestionsHidden = false;

    const hideSuggestions = () => {
        if (suggestionsHidden) return;
        suggestions.innerHTML = "";
        suggestions.hidden = true;
        suggestionsHidden = true;
    };

    const setOpen = async (isOpen) => {
        panel.hidden = !isOpen;
        launcher.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("chatbot-open", isOpen);

        if (isOpen) {
            if (!chatbotKnowledgeBase) {
                try {
                    await loadChatbotKnowledge();
                } catch (error) {}
            }
            input.focus();
        }
    };

    const submitChatMessage = async (message) => {
        addChatMessage(thread, message, "user");
        input.value = "";
        hideSuggestions();

        try {
            const reply = await buildKnowledgeReply(message);
            window.setTimeout(() => {
                addChatMessage(thread, reply, "bot");
            }, 250);
        } catch (error) {
            addChatMessage(
                thread,
                `I could not load the school knowledge right now. Please try again, or use ${buildRoute("contact")} to reach the campus directly.`,
                "bot"
            );
        }
    };

    chatbotConfig.suggestedPrompts.forEach((prompt) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chatbot-chip";
        button.textContent = prompt;
        button.addEventListener("click", async () => {
            await setOpen(true);
            submitChatMessage(prompt);
        });
        suggestions.appendChild(button);
    });

    launcher.addEventListener("click", () => {
        setOpen(panel.hidden);
    });
    closeButton.addEventListener("click", () => setOpen(false));

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = input.value.trim();
        if (!message) return;

        submitChatMessage(message);
    });
};

initializeChatbot();
