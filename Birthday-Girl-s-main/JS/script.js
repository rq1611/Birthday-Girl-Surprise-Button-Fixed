/* ========================================
   ACCESSIBILITY & MOTION
======================================== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animate = (target, vars) => {
    if (window.gsap && !reduceMotion) gsap.to(target, vars);
    else if (typeof vars.onComplete === "function") vars.onComplete();
};

function scrollToSection(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

/* ========================================
   ELEMENTS
======================================== */

const loader =
    document.getElementById("loader");

const envelope =
    document.getElementById("envelope");

const openButton =
    document.getElementById("openButton");

const letterSection =
    document.getElementById("letterSection");

const nextLetter =
    document.querySelector(".next-letter");

const memories =
    document.getElementById("memories");

const countdownSection =
    document.getElementById("countdown");

const birthdaySection =
    document.getElementById("birthday");

const finalSection =
    document.getElementById("final");

const finalButton =
    document.querySelector(".final-button");

const countdownNumber =
    document.getElementById("countdownNumber");

const musicButton =
    document.getElementById("musicButton");

const bgMusic =
    document.getElementById("bgMusic");


/* ========================================
   LOADER
======================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                loader.style.display = "none";
            }
        });

    }, 1200);

});


/* ========================================
   FLOATING HEARTS
======================================== */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "floating-heart"
    );

    heart.innerHTML =
        Math.random() > 0.5
            ? "♡"
            : "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        12 + Math.random() * 18 + "px";

    heart.style.animationDuration =
        6 + Math.random() * 6 + "s";

    document
        .getElementById("floatingHearts")
        .appendChild(heart);


    setTimeout(() => {
        heart.remove();
    }, 12000);

}


// Batasi dekorasi animasi dan hentikan saat tab tidak aktif.
let heartTimer = null;
function startHeartAnimation() {
    if (heartTimer || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heartTimer = setInterval(createHeart, 2200);
}
function stopHeartAnimation() {
    if (heartTimer) clearInterval(heartTimer);
    heartTimer = null;
}
document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopHeartAnimation();
    else startHeartAnimation();
});
startHeartAnimation();


/* ========================================
   OPEN ENVELOPE
======================================== */

let envelopeOpened = false;

function openEnvelope() {

    if (envelopeOpened) {
        return;
    }

    envelopeOpened = true;

    const flap =
        document.querySelector(
            ".envelope-flap"
        );

    const letter =
        document.querySelector(
            ".letter-preview"
        );

    const heart =
        document.querySelector(
            ".envelope-heart"
        );


    const tl = gsap.timeline();


    tl.to(
        flap,
        {
            rotateX: 180,
            duration: 0.8,
            ease: "power2.inOut"
        }
    )

    .to(
        heart,
        {
            scale: 0,
            opacity: 0,
            duration: 0.3
        },
        "<"
    )

    .to(
        letter,
        {
            y: -100,
            duration: 1,
            ease: "power2.out"
        }
    )

    .to(
        envelope,
        {
            scale: 1.1,
            duration: 0.3
        }
    )

    .to(
        "#opening",
        {
            opacity: 0,
            duration: 0.7,

            onComplete: () => {

                document
                    .getElementById("opening")
                    .style.display = "none";

                letterSection.style.display =
                    "flex";

                gsap.fromTo(
                    letterSection,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,
                        duration: 1
                    }
                );

                typeLetter();

            }
        }
    );

}


envelope.addEventListener(
    "click",
    openEnvelope
);

openButton.addEventListener(
    "click",
    openEnvelope
);


/* ========================================
   TYPING LETTER
======================================== */

async function typeText(
    element,
    text
) {

    element.innerHTML = "";

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        element.innerHTML +=
            text[i];

        await new Promise(
            resolve =>
                setTimeout(resolve, 35)
        );

    }

}

/* ===== MEMORY FLIP CARDS =======
================================ */ 

const memoryCards = document.querySelectorAll( ".memory-card" ); 
memoryCards.forEach(card => 
{ 
        card.addEventListener( 
            "click", () => { 
                /* * Jika card yang diklik * sudah terbuka, tutup card. */ 
                const isFlipped = card.classList.contains( "flipped" ); 
                /* * Tutup semua card lain. */ 
                memoryCards.forEach( otherCard => { 
                    if ( otherCard !== card ) 
                    { otherCard.classList.remove( "flipped" ); 
                    } 
                } 
            ); /* * Toggle card yang diklik. */ 
            if (!isFlipped) 
            { card.classList.add( "flipped" ); } 
            else { card.classList.remove( "flipped" ); 
            } 
        } 
    ); 
});



async function typeLetter() {

    const lines =
        document.querySelectorAll(
            ".typing-line"
        );


    for (const line of lines) {

        await typeText(
            line,
            line.dataset.text
        );

        await new Promise(
            resolve =>
                setTimeout(resolve, 300)
        );

    }

}


/* ========================================
   CONTINUE LETTER
======================================== */

nextLetter.addEventListener(
    "click",
    () => {

        scrollToSection(memories);

    }
);


/* ========================================
   REASON CARDS
======================================== */

const reasonCards =
    document.querySelectorAll(
        ".reason-card"
    );


reasonCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            card.classList.toggle(
                "flipped"
            );

        }
    );

});


/* ========================================
   QUIZ
======================================== */

const quizButtons =
    document.querySelectorAll(
        ".quiz-options button"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );


quizButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const answer =
                button.dataset.answer;


            if (answer === "correct") {

                quizResult.innerHTML =
                    "Correct. You still remember. Good. ♡";

                gsap.fromTo(
                    quizResult,
                    {
                        scale: 0.7,
                        opacity: 0
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5
                    }
                );

                setTimeout(
                    startCountdown,
                    1200
                );

            } else {

                quizResult.innerHTML =
                    "Hmm... suspicious. Try again. 😭";

                gsap.fromTo(
                    quizResult,
                    {
                        x: -10
                    },
                    {
                        x: 10,
                        duration: 0.1,
                        repeat: 5,
                        yoyo: true
                    }
                );

            }

        }
    );

});


/* ========================================
   COUNTDOWN
======================================== */

let countdownStarted = false;

function startCountdown() {

    if (countdownStarted) {
        return;
    }

    countdownStarted = true;

    scrollToSection(countdownSection);


    let number = 3;

    countdownNumber.innerHTML =
        number;


    const interval =
        setInterval(() => {

            number--;

            if (number <= 0) {

                clearInterval(interval);

                countdownNumber.innerHTML =
                    "♡";

                setTimeout(
                    revealBirthday,
                    700
                );

                return;
            }


            gsap.fromTo(
                countdownNumber,
                {
                    scale: 0.3,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out"
                }
            );


            countdownNumber.innerHTML =
                number;

        }, 1000);

}


/* ========================================
   BIRTHDAY REVEAL
======================================== */

function revealBirthday() {

    scrollToSection(birthdaySection);


    gsap.fromTo(
        birthdaySection,
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 1
        }
    );


    createConfetti();


    gsap.fromTo(
        ".birthday-section h2",
        {
            scale: 0.5,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "back.out"
        }
    );


    gsap.fromTo(
        ".cake",
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.5
        }
    );

}


/* ========================================
   CONFETTI
======================================== */

function createConfetti() {

    const symbols = [
        "♥",
        "♡",
        "✦",
        "✧"
    ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        confetti.style.position =
            "fixed";

        confetti.style.left =
            "50%";

        confetti.style.top =
            "50%";

        confetti.style.zIndex =
            "999";

        confetti.style.color =
            Math.random() > 0.5
                ? "#FF8FAB"
                : "#D94F70";

        confetti.style.fontSize =
            12 +
            Math.random() * 18 +
            "px";

        document.body.appendChild(
            confetti
        );


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            200 +
            Math.random() * 500;


        gsap.to(
            confetti,
            {
                x:
                    Math.cos(angle) *
                    distance,

                y:
                    Math.sin(angle) *
                    distance,

                rotation:
                    Math.random() * 720,

                opacity: 0,

                duration:
                    2 +
                    Math.random(),

                ease: "power2.out",

                onComplete: () => {
                    confetti.remove();
                }
            }
        );

    }

}


/* ========================================
   FINAL LETTER
======================================== */

finalButton.addEventListener(
    "click",
    () => {

        finalSection.style.display =
            "flex";


        gsap.fromTo(
            finalSection,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 0.8
            }
        );


        setTimeout(() => {

            scrollToSection(finalSection);

        }, 100);

    }
);


/* ========================================
   MUSIC
======================================== */

let musicPlaying = false;


musicButton.addEventListener(
    "click",
    async () => {

        if (!musicPlaying) {

            try {

                await bgMusic.play();

                musicPlaying = true;

                musicButton.innerHTML =
                    "♫";

            } catch (error) {

                console.log(
                    "Music could not play."
                );

            }

        } else {

            bgMusic.pause();

            musicPlaying = false;

            musicButton.innerHTML =
                "♪";

        }

    }

    

)



/* DIGITAL SCRAPBOOK PHOTO VIEWER */
(() => {
 const modal=document.getElementById("scrapbookModal"), image=document.getElementById("scrapbookImage"), title=document.getElementById("scrapbookTitle"), caption=document.getElementById("scrapbookCaption"), count=document.getElementById("scrapbookCount"), close=document.getElementById("scrapbookClose"), previous=document.getElementById("scrapbookPrev"), next=document.getElementById("scrapbookNext");
 if(!modal||!image)return;
 const photos=[...document.querySelectorAll(".memory-photo img")].map(img=>({src:img.getAttribute("src"),alt:img.alt||"A memory together",title:img.closest(".memory-card-front, .memory-card-back")?.querySelector(".memory-caption h2")?.textContent.trim()||"A little memory",caption:img.closest(".memory-card-front, .memory-card-back")?.querySelector(".memory-caption p")?.textContent.trim()||"A moment worth keeping."}));
 let activeIndex=0,previousFocus=null;
 function showPhoto(index){if(!photos.length)return;activeIndex=(index+photos.length)%photos.length;const photo=photos[activeIndex];image.src=photo.src;image.alt=photo.alt;title.textContent=photo.title;caption.textContent=photo.caption;count.textContent=`${String(activeIndex+1).padStart(2,"0")} / ${String(photos.length).padStart(2,"0")}`;}
 function open(index){previousFocus=document.activeElement;showPhoto(index);modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("scrapbook-open");close.focus();}
 function dismiss(){modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("scrapbook-open");previousFocus?.focus?.();}
 document.querySelectorAll(".memory-photo img").forEach((img,index)=>img.addEventListener("click",event=>{event.stopPropagation();open(index);}));
 document.querySelectorAll("[data-memory-index]").forEach(button=>button.addEventListener("click",()=>open(Number(button.dataset.memoryIndex))));
 close.addEventListener("click",dismiss);previous.addEventListener("click",()=>showPhoto(activeIndex-1));next.addEventListener("click",()=>showPhoto(activeIndex+1));modal.addEventListener("click",event=>{if(event.target===modal)dismiss();});
 document.addEventListener("keydown",event=>{if(!modal.classList.contains("is-open"))return;if(event.key==="Escape")dismiss();if(event.key==="ArrowLeft")showPhoto(activeIndex-1);if(event.key==="ArrowRight")showPhoto(activeIndex+1);});
})();

/* FINAL PERSONAL SURPRISE — keepsake book interaction (robust state handling) */
(() => {
 const trigger = document.getElementById("surpriseButton");
 const overlay = document.getElementById("surpriseNote");
 const book = document.getElementById("lovebook");
 const openBook = document.getElementById("bookOpenButton");
 const closeBook = document.getElementById("lovebookClose");
 if (!trigger || !overlay || !book || !openBook || !closeBook) {
   console.warn("Final surprise elements are incomplete. Check the IDs in index.html.");
   return;
 }
 let lastFocus = null;
 let closeTimer = null;
 const showBook = () => {
   if (!overlay.hidden) return;
   lastFocus = document.activeElement;
   if (closeTimer) window.clearTimeout(closeTimer);
   overlay.hidden = false;
   overlay.setAttribute("aria-hidden", "false");
   trigger.setAttribute("aria-expanded", "true");
   document.body.classList.add("lovebook-open");
   void overlay.offsetWidth;
   requestAnimationFrame(() => { overlay.classList.add("is-visible"); closeBook.focus(); });
 };
 const hideBook = () => {
   if (overlay.hidden) return;
   overlay.classList.remove("is-visible");
   overlay.setAttribute("aria-hidden", "true");
   trigger.setAttribute("aria-expanded", "false");
   document.body.classList.remove("lovebook-open");
   book.classList.remove("is-open");
   openBook.textContent = "Open the book ✧";
   closeTimer = window.setTimeout(() => {
     overlay.hidden = true;
     if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
   }, reduceMotion ? 0 : 360);
 };
 trigger.addEventListener("click", showBook);
 openBook.addEventListener("click", () => {
   book.classList.add("is-open");
   openBook.textContent = "A little love, just for you ♡";
 });
 closeBook.addEventListener("click", hideBook);
 overlay.addEventListener("click", event => { if (event.target === overlay) hideBook(); });
 document.addEventListener("keydown", event => { if (!overlay.hidden && event.key === "Escape") hideBook(); });
})();