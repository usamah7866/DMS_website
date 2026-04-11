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
const admissionRoutingEmail = document.getElementById("admissionRoutingEmail");
const admissionForm = document.getElementById("admissionForm");
const admissionEmail = document.getElementById("admissionEmail");
const admissionConfirmEmail = document.getElementById("admissionConfirmEmail");
const admissionValidationNote = document.getElementById("admissionValidationNote");
const admissionNextUrl = document.getElementById("admissionNextUrl");
const admissionFormUrl = document.getElementById("admissionFormUrl");
const admissionReplyTo = document.getElementById("admissionReplyTo");
const admissionTimestamp = document.getElementById("admissionTimestamp");
const submissionNote = document.getElementById("submissionNote");
const admissionSuccessCard = document.getElementById("admissionSuccessCard");
const careerCampusSelect = document.getElementById("careerCampusSelect");
const careerCampusName = document.getElementById("careerCampusName");
const careerTargetEmail = document.getElementById("careerTargetEmail");
const careerRoutingEmail = document.getElementById("careerRoutingEmail");
const careerForm = document.getElementById("careerForm");
const careerEmail = document.getElementById("careerEmail");
const careerConfirmEmail = document.getElementById("careerConfirmEmail");
const careerValidationNote = document.getElementById("careerValidationNote");
const careerNextUrl = document.getElementById("careerNextUrl");
const careerFormUrl = document.getElementById("careerFormUrl");
const careerReplyTo = document.getElementById("careerReplyTo");
const careerTimestamp = document.getElementById("careerTimestamp");
const careerSubmissionNote = document.getElementById("careerSubmissionNote");
const careerSuccessCard = document.getElementById("careerSuccessCard");

const defaultCampusEmail = "dms.girlcampus@outlook.com";

const setFormRecipient = (formElement, campusEmail) => {
    if (!formElement) return;
    formElement.action = `https://formsubmit.co/${campusEmail || defaultCampusEmail}`;
};

const formatSubmissionTimestamp = () => {
    const now = new Date();
    return now.toLocaleString("en-PK", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
};

const buildFormReturnUrl = (formType) => {
    const current = new URL(window.location.href);
    current.searchParams.set("submitted", formType);
    return current.toString();
};

const initializeFormSubmitFields = () => {
    if (admissionNextUrl) {
        admissionNextUrl.value = buildFormReturnUrl("admission");
    }
    if (admissionFormUrl) {
        admissionFormUrl.value = window.location.href;
    }
    if (careerNextUrl) {
        careerNextUrl.value = buildFormReturnUrl("career");
    }
    if (careerFormUrl) {
        careerFormUrl.value = window.location.href;
    }
};

const showSubmissionSuccessFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const submitted = params.get("submitted");
    let shouldCleanUrl = false;

    if (submitted === "admission" && submissionNote) {
        submissionNote.hidden = true;
        if (admissionSuccessCard) {
            admissionSuccessCard.hidden = false;
        }
        shouldCleanUrl = true;
    }

    if (submitted === "career" && careerSubmissionNote) {
        careerSubmissionNote.hidden = true;
        if (careerSuccessCard) {
            careerSuccessCard.hidden = false;
        }
        shouldCleanUrl = true;
    }

    if (shouldCleanUrl) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("submitted");
        const cleanUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
        window.history.replaceState({}, document.title, cleanUrl);
    }
};

if (campusSelect && targetCampusName && targetCampusEmail) {
    const updateCampusRouting = () => {
        const selectedOption = campusSelect.options[campusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus Email";
        const campusEmail = selectedOption?.dataset?.email || defaultCampusEmail;

        targetCampusName.textContent = campusName === "Selected Campus Email" ? campusName : `${campusName} Email`;
        targetCampusEmail.textContent = campusEmail;
        if (admissionRoutingEmail) {
            admissionRoutingEmail.value = campusEmail;
        }
        setFormRecipient(admissionForm, campusEmail);
    };

    campusSelect.addEventListener("change", updateCampusRouting);
    updateCampusRouting();
}

if (admissionForm && submissionNote && campusSelect) {
    admissionForm.addEventListener("submit", (event) => {
        const primaryEmail = admissionEmail?.value?.trim() || "";
        const confirmEmail = admissionConfirmEmail?.value?.trim() || "";

        if ((primaryEmail || confirmEmail) && primaryEmail !== confirmEmail) {
            event.preventDefault();
            if (admissionValidationNote) {
                admissionValidationNote.hidden = false;
            }
            admissionConfirmEmail?.focus();
            return;
        }

        if (admissionValidationNote) {
            admissionValidationNote.hidden = true;
        }

        if (admissionReplyTo) {
            admissionReplyTo.value = primaryEmail;
        }
        if (admissionTimestamp) {
            admissionTimestamp.value = formatSubmissionTimestamp();
        }

        const selectedOption = campusSelect.options[campusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus";
        const campusEmail = selectedOption?.dataset?.email || defaultCampusEmail;

        setFormRecipient(admissionForm, campusEmail);
        submissionNote.textContent = `Submitting admission form for ${campusName}. Please wait...`;
    });
}

if (careerCampusSelect && careerCampusName && careerTargetEmail) {
    const updateCareerRouting = () => {
        const selectedOption = careerCampusSelect.options[careerCampusSelect.selectedIndex];
        const campusName = selectedOption?.value || "Selected Campus Email";
        const campusEmail = selectedOption?.dataset?.email || defaultCampusEmail;

        careerCampusName.textContent = campusName === "Selected Campus Email" ? campusName : `${campusName} Email`;
        careerTargetEmail.textContent = campusEmail;
        if (careerRoutingEmail) {
            careerRoutingEmail.value = campusEmail;
        }
        setFormRecipient(careerForm, campusEmail);
    };

    careerCampusSelect.addEventListener("change", updateCareerRouting);
    updateCareerRouting();
}

if (careerForm && careerSubmissionNote) {
    careerForm.addEventListener("submit", (event) => {
        const primaryEmail = careerEmail?.value?.trim() || "";
        const confirmEmail = careerConfirmEmail?.value?.trim() || "";

        if (primaryEmail !== confirmEmail) {
            event.preventDefault();
            if (careerValidationNote) {
                careerValidationNote.hidden = false;
            }
            careerConfirmEmail?.focus();
            return;
        }

        if (careerValidationNote) {
            careerValidationNote.hidden = true;
        }

        if (careerReplyTo) {
            careerReplyTo.value = primaryEmail;
        }
        if (careerTimestamp) {
            careerTimestamp.value = formatSubmissionTimestamp();
        }

        const selectedOption = careerCampusSelect.options[careerCampusSelect.selectedIndex];
        const campusEmail = selectedOption?.dataset?.email || defaultCampusEmail;

        setFormRecipient(careerForm, campusEmail);
        careerSubmissionNote.textContent = "Submitting your career application and CV to the school career inbox.";
    });
}

initializeFormSubmitFields();
showSubmissionSuccessFromQuery();

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
        Chat with ${chatbotConfig.assistantName}
    </button>
    <section class="chatbot-panel" id="chatbotPanel" aria-label="DMS school assistant" hidden>
        <div class="chatbot-panel__body">
            <div class="chatbot-panel__topbar">
                <button class="chatbot-panel__close" id="chatbotClose" type="button" aria-label="Close chatbot">&times;</button>
            </div>
            <div class="chatbot-thread" id="chatbotThread" aria-live="polite">
                <article class="chatbot-message chatbot-message--bot">
                    <p>Assalam-o-Alaikum. I am ${chatbotConfig.assistantName}. I can help with admissions, academics, school timings, activities, campus guidance, and teacher career questions. For fee matters, I will guide you to the school office.</p>
                </article>
            </div>
            <div class="chatbot-suggestions" id="chatbotSuggestions"></div>
        </div>
        <form class="chatbot-form" id="chatbotForm">
            <div class="chatbot-composer">
                <textarea id="chatbotInput" name="message" rows="1" placeholder="Ask about admission, school timings, campus, or careers..."></textarea>
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
const containsKeyword = (normalizedText, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    return ` ${normalizedText} `.includes(` ${normalizedKeyword} `);
};

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
    const admissionIntent = ["admission", "apply", "enroll", "enrol", "new student"].some((keyword) => containsKeyword(normalized, keyword));
    const careerIntent = ["job", "career", "teacher", "vacancy", "cv"].some((keyword) => containsKeyword(normalized, keyword));
    const timingIntent = ["timing", "timings", "school time", "school hours"].some((keyword) => containsKeyword(normalized, keyword));

    return knowledge.entries
        .map((entry) => {
            const entryText = normalizeText(`${entry.answer} ${entry.category} ${entry.keywords.join(" ")} ${entry.details.join(" ")}`);
            let score = 0;

            entry.keywords.forEach((keyword) => {
                const normalizedKeyword = normalizeText(keyword);
                if (containsKeyword(normalized, normalizedKeyword)) {
                    score += normalizedKeyword.includes(" ") ? 7 : 4;
                }
            });

            tokens.forEach((token) => {
                if (entryText.includes(token)) {
                    score += 1;
                }
            });

            if (admissionIntent && entry.category === "admissions") score += 5;
            if (careerIntent && entry.category === "careers") score += 5;
            if (timingIntent && entry.id === "school-hours") score += 5;

            return { entry, score };
        })
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 2);
};

const buildClosingPrompt = (category) => {
    if (category === "admissions") {
        return "If you want, I can next guide you about documents, assessment, or the best campus to contact for admission.";
    }

    if (category === "academics") {
        return "If you are considering admission, I can also explain class levels, subjects, and how the school supports academic progress.";
    }

    if (category === "student-life") {
        return "If you are considering DMS for your child, I can also tell you about academics, timings, and the admission process.";
    }

    if (category === "careers") {
        return "If you want, I can also guide you about application requirements, CV preparation, or the expected hiring process.";
    }

    if (category === "contact") {
        return "If you are planning admission, contacting the nearest campus is the best next step.";
    }

    return "If you want, I can guide you further about admission, academics, timings, or campus contact details.";
};

const buildIntro = (category) => {
    if (category === "admissions") return "Certainly.";
    if (category === "academics") return "Of course.";
    if (category === "careers") return "Sure.";
    return "Yes.";
};

const buildKnowledgeReply = async (message) => {
    const knowledge = await loadChatbotKnowledge();
    const normalized = normalizeText(message);

    if (knowledge.guardrails.greeting_keywords.some((topic) => containsKeyword(normalized, topic))) {
        const greetingEntry = knowledge.entries.find((entry) => entry.id === "greeting");
        return `${greetingEntry.answer} ${greetingEntry.details[0]} ${buildClosingPrompt("admissions")}`;
    }

    if (knowledge.guardrails.thanks_keywords.some((topic) => containsKeyword(normalized, topic))) {
        const thanksEntry = knowledge.entries.find((entry) => entry.id === "thanks");
        return `${thanksEntry.answer} ${thanksEntry.details[0]}`;
    }

    if (knowledge.guardrails.blocked_topics.some((topic) => containsKeyword(normalized, topic))) {
        return `${knowledge.guardrails.blocked_response} You can also use ${buildRoute("contact")} or speak with the campus receptionist.`;
    }

    const bestEntries = findBestEntries(message, knowledge);

    if (!bestEntries.length) {
        return `I can help with admissions, school timings, academics, campus guidance, student life, and careers. Please ask in a little more detail, or use ${buildRoute("contact")} to reach the school directly.`;
    }

    const primary = bestEntries[0].entry;
    const secondary = bestEntries[1]?.entry;
    const detailLine = primary.details?.length ? ` ${primary.details[0]}` : "";
    const supportLine = secondary && secondary.category === primary.category && secondary.id !== primary.id
        ? ` ${secondary.answer}`
        : "";
    const intro = buildIntro(primary.category);
    const closing = buildClosingPrompt(primary.category);

    if (primary.id === "campus-contacts") {
        return `${intro} ${primary.answer}${detailLine} For complete details, please visit ${buildRoute("contact")}. ${closing}`;
    }

    if (primary.category === "careers") {
        return `${intro} ${primary.answer}${detailLine}${supportLine} You can also review ${buildRoute("careers")} for school hiring information. ${closing}`;
    }

    if (primary.category === "admissions") {
        return `${intro} ${primary.answer}${detailLine}${supportLine} ${knowledge.school.admission_encouragement} ${closing}`;
    }

    if (primary.category === "academics") {
        return `${intro} ${primary.answer}${detailLine}${supportLine} Many parents prefer this kind of structured academic environment when choosing a school. ${closing}`;
    }

    if (primary.category === "student-life") {
        return `${intro} ${primary.answer}${detailLine}${supportLine} A balanced school environment often helps parents feel more confident about admission. ${closing}`;
    }

    return `${intro} ${primary.answer}${detailLine}${supportLine} ${closing}`;
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
