/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typing-text");

const words = [
    "Creative Learner",
    "Accounting Student",
    "Web Enthusiast",
    "Future Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );
}


typeEffect();


/* =========================
   MOUSE GLOW
========================= */

const glow = document.createElement("div");

glow.classList.add("mouse-glow");

document.body.appendChild(glow);


document.addEventListener("mousemove", (event) => {

    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";

});


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .glass-card, .gallery-item, .timeline-item"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.classList.add("hidden");

    revealObserver.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNav() {

    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.navbar nav a[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }

    });
}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();

const navbar = document.querySelector(".navbar");

function updateNavbar() {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();

/* =========================================
   REAL-TIME GALAXY CANVAS
========================================= */

const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

const isMobile = window.innerWidth < 768;

const STAR_COUNT = isMobile ? 110 : 280;

function resizeGalaxy() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeGalaxy();

window.addEventListener("resize", () => {
    resizeGalaxy();
    createStars();
});

/* =========================
   MOUSE PARALLAX
========================= */

window.addEventListener("mousemove", (event) => {

    targetMouseX =
        (event.clientX / window.innerWidth - 0.5);

    targetMouseY =
        (event.clientY / window.innerHeight - 0.5);

});


/* =========================
   CREATE STARS
========================= */

function createStars() {

    stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {

        const depth = Math.random();

        let speed;

        // Bintang jauh = sangat pelan
        if (depth < 0.35) {
            speed = Math.random() * 0.025 + 0.005;
        }

        // Bintang tengah
        else if (depth < 0.7) {
            speed = Math.random() * 0.06 + 0.025;
        }

        // Bintang dekat = lebih cepat
        else {
            speed = Math.random() * 0.12 + 0.05;
        }

        stars.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * window.innerHeight,

            radius:
                Math.random() * 1.4 + 0.2,

            depth: depth,

            opacity:
                Math.random() * 0.7 + 0.25,

            twinkle:
                Math.random() * Math.PI * 2,

            twinkleSpeed:
                Math.random() * 0.025 + 0.005,

            drift: speed,

            // arah horizontal sedikit berbeda
            horizontalDrift:
                (Math.random() - 0.5) * speed

        });
    }
}

function createStars() {

    stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {

        const depth = Math.random();

        let speed;

        if (depth < 0.35) {
            speed = Math.random() * 0.025 + 0.005;
        }

        else if (depth < 0.7) {
            speed = Math.random() * 0.06 + 0.025;
        }

        else {
            speed = Math.random() * 0.12 + 0.05;
        }

        stars.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * window.innerHeight,

            radius:
                Math.random() * 1.4 + 0.2,

            depth: depth,

            opacity:
                Math.random() * 0.7 + 0.25,

            twinkle:
                Math.random() * Math.PI * 2,

            twinkleSpeed:
                Math.random() * 0.025 + 0.005,

            drift: speed,

            horizontalDrift:
                (Math.random() - 0.5) * speed
        });
    }
}


/* BUAT BINTANG */
createStars();

/* =========================
   RANDOM SHOOTING STARS
========================= */

function createShootingStar() {
    const startFromLeft = Math.random() < 0.5;

    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
    const speed = Math.random() * 7 + 8;
    const length = Math.random() * 100 + 100;

    shootingStars.push({
        x: startFromLeft
            ? Math.random() * window.innerWidth * 0.7
            : Math.random() * window.innerWidth,

        y: startFromLeft
            ? Math.random() * window.innerHeight * 0.35
            : Math.random() * window.innerHeight * 0.25,

        angle: angle,
        speed: speed,
        length: length,
        opacity: 1
    });
}

function randomShootingStar() {
    const delay = Math.random() * 1200 + 400;

    setTimeout(() => {
        createShootingStar();

        // Kadang muncul shooting star kedua
        if (Math.random() < 0.45) {
            setTimeout(() => {
                createShootingStar();
            }, Math.random() * 500 + 100);
        }

        // Kadang muncul shooting star ketiga
        if (Math.random() < 0.18) {
            setTimeout(() => {
                createShootingStar();
            }, Math.random() * 800 + 200);
        }

        randomShootingStar();
    }, delay);
}

randomShootingStar();

/* =========================
   DRAW STARS
========================= */

function drawStars() {

    stars.forEach(star => {

        /* =========================
           TWINKLE
        ========================= */

        star.twinkle += star.twinkleSpeed;

        const pulse =
            Math.sin(star.twinkle) * 0.22;

        const alpha =
            Math.max(
                0.08,
                Math.min(
                    1,
                    star.opacity + pulse
                )
            );


        /* =========================
           PARALLAX
        ========================= */

        const parallaxX =
            mouseX *
            star.depth *
            18;

        const parallaxY =
            mouseY *
            star.depth *
            18;


        /* =========================
           NATURAL MOVEMENT
        ========================= */

        star.y -= star.drift;

        star.x += star.horizontalDrift;


        /* =========================
           WRAP AROUND
        ========================= */

        if (star.y < -10) {

            star.y =
                window.innerHeight + 10;

            star.x =
                Math.random() *
                window.innerWidth;
        }


        if (star.x < -20) {
            star.x =
                window.innerWidth + 20;
        }

        if (star.x > window.innerWidth + 20) {
            star.x = -20;
        }


        /* =========================
           FINAL POSITION
        ========================= */

        const x =
            star.x + parallaxX;

        const y =
            star.y + parallaxY;


        /* =========================
           SOFT OUTER GLOW
        ========================= */

        if (star.radius > 1) {

            const glow =
                ctx.createRadialGradient(
                    x,
                    y,
                    0,
                    x,
                    y,
                    star.radius * 4
                );

            glow.addColorStop(
                0,
                `rgba(210,225,255,${alpha * 0.28})`
            );

            glow.addColorStop(
                0.45,
                `rgba(170,200,255,${alpha * 0.10})`
            );

            glow.addColorStop(
                1,
                "rgba(150,180,255,0)"
            );

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                star.radius * 4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = glow;

            ctx.fill();
        }


        /* =========================
           STAR CORE
        ========================= */

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.fill();


        /* =========================
           BRIGHT STAR CROSS
        ========================= */

        if (
            star.radius > 1.5 &&
            alpha > 0.55
        ) {

            const crossSize =
                star.radius * 3.5;

            const crossAlpha =
                alpha * 0.35;


            ctx.beginPath();

            ctx.moveTo(
                x - crossSize,
                y
            );

            ctx.lineTo(
                x + crossSize,
                y
            );

            ctx.moveTo(
                x,
                y - crossSize
            );

            ctx.lineTo(
                x,
                y + crossSize
            );

            ctx.strokeStyle =
                `rgba(220,235,255,${crossAlpha})`;

            ctx.lineWidth = 0.6;

            ctx.stroke();
        }

    });

}

/* =========================
   DRAW SHOOTING STARS
========================= */

function drawShootingStars() {

    shootingStars.forEach((star, index) => {

        const dx =
            Math.cos(star.angle) *
            star.length;

        const dy =
            Math.sin(star.angle) *
            star.length;


        // =========================
        // GLOW SHOOTING STAR
        // =========================

        ctx.save();

        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(255,255,255,0.9)";


        // =========================
        // EKOR
        // =========================

        const gradient =
            ctx.createLinearGradient(
                star.x,
                star.y,
                star.x - dx,
                star.y - dy
            );

        gradient.addColorStop(
            0,
            `rgba(255,255,255,${star.opacity})`
        );

        gradient.addColorStop(
            0.25,
            `rgba(220,235,255,${star.opacity * 0.75})`
        );

        gradient.addColorStop(
            0.65,
            `rgba(180,210,255,${star.opacity * 0.35})`
        );

        gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );


        ctx.beginPath();

        ctx.moveTo(
            star.x,
            star.y
        );

        ctx.lineTo(
            star.x - dx,
            star.y - dy
        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.lineCap = "round";

        ctx.stroke();


        // =========================
        // KEPALA BINTANG
        // =========================

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            2.2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        ctx.fill();


        ctx.restore();


        // =========================
        // GERAK
        // =========================

        star.x +=
            Math.cos(star.angle) *
            star.speed;

        star.y +=
            Math.sin(star.angle) *
            star.speed;


        // Fade out lebih perlahan
        star.opacity -= 0.012;


        // =========================
        // HAPUS YANG SUDAH KELUAR
        // =========================

        if (
            star.opacity <= 0 ||
            star.x > window.innerWidth + 250 ||
            star.y > window.innerHeight + 250
        ) {

            shootingStars.splice(index, 1);

        }

    });

}


/* =========================
   ANIMATION LOOP
========================= */

function animateGalaxy() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /* smooth mouse movement */

    mouseX +=
        (targetMouseX - mouseX) * 0.025;

    mouseY +=
        (targetMouseY - mouseY) * 0.025;


    drawStars();

    drawShootingStars();


    requestAnimationFrame(
        animateGalaxy
    );

}

animateGalaxy();

/* =========================================================
   MOUSE PARALLAX
========================================================= */

const heroProfile = document.querySelector(".hero-profile");
const profileCard = document.querySelector(".profile-card");
const heroText = document.querySelector(".hero > div:first-child");

let parallaxX = 0;
let parallaxY = 0;

let targetParallaxX = 0;
let targetParallaxY = 0;


if (window.innerWidth > 768) {

    window.addEventListener("mousemove", (event) => {

        targetParallaxX =
            (event.clientX / window.innerWidth - 0.5);

        targetParallaxY =
            (event.clientY / window.innerHeight - 0.5);

    });


    function animateParallax() {

        parallaxX +=
            (targetParallaxX - parallaxX) * 0.04;

        parallaxY +=
            (targetParallaxY - parallaxY) * 0.04;


        if (heroProfile) {

            heroProfile.style.transform =
                `translate3d(
                    ${parallaxX * 12}px,
                    ${parallaxY * 12}px,
                    0
                )`;

        }


        if (profileCard) {

            profileCard.style.transform =
                `perspective(900px)
                 rotateY(${parallaxX * 5}deg)
                 rotateX(${parallaxY * -5}deg)`;

        }


        if (heroText) {

            heroText.style.transform =
                `translate3d(
                    ${parallaxX * -5}px,
                    ${parallaxY * -5}px,
                    0
                )`;

        }


        requestAnimationFrame(
            animateParallax
        );

    }


    animateParallax();

}

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Tutup menu setelah memilih halaman */

    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}