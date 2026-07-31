/* ===========================================
        PAGE CONTROLLER & INTRO
=========================================== */
const pages = document.querySelectorAll(".page");
let currentPage = 0;

function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    pages[currentPage].classList.remove("active");
    pages[currentPage].classList.add("previous");

    currentPage = index;

    pages[currentPage].classList.remove("previous");
    pages[currentPage].classList.add("active");

    // Automatically start letter typing when opening Page 5
    if (currentPage === 4 && typingIndex === 0) {
        typeLetter();
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const loading = document.getElementById("loading");
        if (loading) {
            loading.style.opacity = "0";
            loading.style.transition = "1s";
            setTimeout(() => loading.style.display = "none", 1000);
        }
    }, 2500);
});

setTimeout(() => {
    const title = document.querySelector(".birthdayTitle");
    if (title) title.style.opacity = "1";
}, 2200);

setTimeout(() => showPage(1), 7000);

/* ===========================================
        NAVIGATION EVENT LISTENERS
=========================================== */
const enterBtn = document.getElementById("enterBtn");
if (enterBtn) enterBtn.addEventListener("click", () => showPage(2));

function nextPage() {
    if (currentPage < pages.length - 1) showPage(currentPage + 1);
}

function previousPage() {
    if (currentPage > 0) showPage(currentPage - 1);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") previousPage();
});

/* Touch Swipe Support */
let touchStart = 0;
let touchEnd = 0;
document.addEventListener("touchstart", (e) => touchStart = e.changedTouches[0].screenX);
document.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;
    if (touchEnd < touchStart - 80) nextPage();
    if (touchEnd > touchStart + 80) previousPage();
});

/* ===========================================
        BACKGROUND MUSIC
=========================================== */
const music = document.getElementById("music");

document.body.addEventListener("click", () => {
    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(() => { });
    }
}, { once: true });

const musicBtn = document.createElement("div");
musicBtn.className = "musicBtn";
musicBtn.innerHTML = "🎵";
document.body.appendChild(musicBtn);

let playing = true;
musicBtn.onclick = () => {
    if (!music) return;
    if (playing) {
        music.pause();
        musicBtn.innerHTML = "🔇";
    } else {
        music.play();
        musicBtn.innerHTML = "🎵";
    }
    playing = !playing;
};

/* ===========================================
        PARTICLE GENERATION ENGINES
=========================================== */
const flowersContainer = document.getElementById("flowers");
const flowerTypes = ["🌹", "🌸", "🌼", "🌷", "💮", "🌺", "🍀"];

function createFlower() {
    if (!flowersContainer) return;
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerHTML = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = 18 + Math.random() * 25 + "px";
    flower.style.animationDuration = 4 + Math.random() * 6 + "s";
    flowersContainer.appendChild(flower);
    setTimeout(() => flower.remove(), 10000);
}
setInterval(createFlower, 120);

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 15 + Math.random() * 25 + "px";
    heart.style.animationDuration = 5 + Math.random() * 6 + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 400);

/* Cursor Heart Trail */
document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.fontSize = "12px";
    heart.style.transition = "1s";
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.style.transform = "translateY(-40px)";
        heart.style.opacity = "0";
    }, 20);
    setTimeout(() => heart.remove(), 1000);
});

/* ===========================================
        LOVE QUESTION & CONFETTI
=========================================== */
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
}

if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        confetti();
        if (noBtn) noBtn.style.display = "none";
        currentSlide = 0;
        loadGallery(0);
        setTimeout(() => showPage(3), 1500);
    });
}

function confetti() {
    const colors = ["#ff4d6d", "#ffd93d", "#6bcBff", "#ffffff", "#ff80ab"];
    for (let i = 0; i < 150; i++) {
        const c = document.createElement("div");
        c.style.position = "fixed";
        c.style.width = "10px";
        c.style.height = "15px";
        c.style.left = Math.random() * 100 + "vw";
        c.style.top = "-20px";
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.zIndex = "9999";
        document.body.appendChild(c);
        c.animate([
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: `translateY(${window.innerHeight + 50}px) rotate(720deg)`, opacity: 0 }
        ], { duration: (2 + Math.random() * 3) * 1000 });
        setTimeout(() => c.remove(), 5000);
    }
}

/* ===========================================
        GALLERY LOGIC
=========================================== */
let currentSlide = 0;
const gallery = document.querySelector(".gallery");

// Matching your exact file names from VS Code
const galleryPages = [
    [
        { img: "assets/photo1.jpg", caption: "And even if loving you meant the end of me, i would still love you enndlessly❤️" },
        { img: "assets/photo2.jpg", caption: "kaise dekhun mai kisi aur ko, ki meri aankhon mein sirf ap ho . Nazaare laakh haseen sahi , magar meri nazar mein khoobsurat sirf ap ho 🌸" },
        { img: "assets/photo3.jpg", caption: "kabhi jo kehdu mohabbat hai tumse tho mujhko khudaara galat mat samjhna , ki meri zaroorat ho tum , bhaut khoobsurat ho tum  💖" },
        { img: "assets/photo4.jpg", caption: "  ki marte waqt likhunga apka nam apni hatali pr, mujhe iss duniya se khali hath nhe jana ❤️" }
    ],
    [
        { img: "assets/photo5.jpg", caption: "mere hisse mein chand bhi aya tho thukra dunga usey, mai humesha tumhe he dekhta rahunga 🥰" },
        { img: "assets/photo6.jpg", caption: "kabhi lafz bhool jau , kabhi bat bhul jau tujhe iss kadar chahu ki ishq ki awakt bhul jau🌹" },
        { img: "assets/photo7.jpg", caption: "ki meri mohabbat ko ap ky aazmaoge , jan se zadya mujhse aur ky he manghoge . meri mohabbat sitaaro jaise hai , ky app unn sitaro ko ginn pauge ❤️" },
        { img: "assets/photo8.jpg", caption: "ki mujhko khud ki liye jagha nhe milti, ap ho mojud iss kadar mujhme" }
    ]
];

function loadGallery(index) {
    if (!gallery) return;
    gallery.innerHTML = "";
    galleryPages[index].forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo";
        card.innerHTML = `<img src="${photo.img}" alt="memory"><p>${photo.caption}</p>`;
        gallery.appendChild(card);
    });
}
loadGallery(0);

const nextG = document.getElementById("nextGallery");
const prevG = document.getElementById("prevGallery");

if (nextG) {
    nextG.onclick = () => {
        currentSlide++;
        if (currentSlide >= galleryPages.length) {
            showPage(4); // Advance to Letter Page
            currentSlide = galleryPages.length - 1;
            return;
        }
        loadGallery(currentSlide);
    };
}

if (prevG) {
    prevG.onclick = () => {
        if (currentSlide > 0) {
            currentSlide--;
            loadGallery(currentSlide);
        }
    };
}

/* ===========================================
        TYPEWRITER LETTER
=========================================== */
const birthdayLetter =
    `Happy Birthday My Aaira ❤️

Today is not just another day.
It is the day the most beautiful soul came into this world.

Thank you for every smile, every laugh, and every sweet moment.
May all your dreams come true.

No matter where life takes us...
I'll always love you.

Happy Birthday ❤️`;

let typingIndex = 0;
const typing = document.getElementById("typing");

function typeLetter() {
    if (!typing) return;
    if (typingIndex < birthdayLetter.length) {
        typing.innerHTML += birthdayLetter.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeLetter, 35);
    }
}

const surprise = document.getElementById("surprise");
if (surprise) {
    surprise.onclick = () => showPage(5); // Advance to Canvas Final
}

/* ===========================================
        MATHEMATICAL HEART CANVAS (PAGE 6)
=========================================== */
const treeCanvas = document.getElementById('treeCanvas');
const treeCtx = treeCanvas ? treeCanvas.getContext('2d') : null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let heartPoints = [];
function generateHeart() {
    heartPoints = [];
    const scale = Math.min(canvas.width, canvas.height) / 42;
    for (let i = 0; i <= 360; i += 1) {
        const t = i * Math.PI / 180;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        heartPoints.push({
            x: canvas.width / 2 + x * scale,
            y: canvas.height / 2 - y * scale
        });
    }
}
generateHeart();

let visiblePoints = 0;
function renderCanvasFrame() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff5ca8";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";

    for (let i = 0; i < visiblePoints; i++) {
        const p = heartPoints[i];
        ctx.fillText("I Love You", p.x, p.y);
    }

    if (visiblePoints < heartPoints.length) {
        visiblePoints++;
    } else {
        visiblePoints = 0;
    }

    requestAnimationFrame(renderCanvasFrame);
}
requestAnimationFrame(renderCanvasFrame);
function startSurprise() {
    // 1. Hide the "Ready for your surprise?" card
    const startCard = document.getElementById("start-card");
    if (startCard) {
        startCard.style.display = "none";
    }

    // 2. Reveal the surprise container with the text and tree
    const container = document.getElementById("container");
    if (container) {
        container.classList.add("active");
    }

    // 3. Start the tree/heart animation
    if (typeof drawTree === "function") {
        drawTree();
    } else if (typeof renderCanvasFrame === "function") {
        renderCanvasFrame();
    }
}
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "💖";

    // Random horizontal position across the full screen width
    heart.style.left = Math.random() * 100 + "vw";

    // Size around finger-spacing size (20px to 35px)
    const size = Math.random() * 15 + 20;
    heart.style.fontSize = `${size}px`;

    // Random speed (4s to 8s) for a gentle bubble float
    const duration = Math.random() * 4 + 4;
    heart.style.animationDuration = `${duration}s`;

    // Soft opacity so they feel light and transparent
    heart.style.opacity = Math.random() * 0.4 + 0.3;

    document.body.appendChild(heart);

    // Remove heart after animation finishes to prevent lag
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Spawn a new heart every 600ms
setInterval(createFloatingHeart, 600);