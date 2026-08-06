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
        { img: "photo1.jpg", caption: "And even if loving you meant the end of me, i would still love you enndlessly❤️" },
        { img: "photo2.jpg", caption: "kaise dekhun mai kisi aur ko, ki meri aankhon mein sirf ap ho . Nazaare laakh haseen sahi , magar meri nazar mein khoobsurat sirf ap ho 🌸" },
        { img: "photo3.jpg", caption: "kabhi jo kehdu mohabbat hai tumse tho mujhko khudaara galat mat samjhna , ki meri zaroorat ho tum , bhaut khoobsurat ho tum  💖" },
        { img: "photo4.jpg", caption: " A face i swear that i could spend my whole life knowing ❤️" }
    ],
    [
        { img: "photo5.jpg", caption: "kabhi lafz bhool jau , kabhi bat bhul jau tujhe iss kadar chahu ki ishq ki awakt bhul jau. khuda se maangu tho itna maangu tujheke sajde mein jhuku aur apni zaat bhul jau, likhne pe aau tho tujhpe puri kitaab likh du mein " },
        { img: "photo6.jpg", caption: "koi naam le tera tho lehjaa apna likh du main teri aankho ke aaine main yun aks dekhu apna ki main kaun ho kaha hu har bat bhul jau kabhi lafz bhool jau , kabhi bat bhul jau teri aawaz mai nam sun apna har awaz bhul jau main  🌹" },
        { img: "photo7.jpg", caption: "mere hisse mein chand bhi aya tho thukra dunga usey, mai humesha tumhe he dekhta rahunga ❤️" },
        { img: "photo8.jpg", caption: "mujhe khud ki liye jagha nhe milti, ap ho mojud iss kadar mujhme" }
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
    `Happy Birthday My Everything ❤️
It is the day the most beautiful soul came into this world.

Thank you for every smile, every laugh, and every sweet moment.
May all your dreams come true.
heyy sweeta , ohh idk where to start, caz you know very well I have said everything before only and now nothing left to say but still no matter how much I explain what you mean to me or how much i love you I’ll never be able to express it through words what you mean to me 
At the very first when i meet you i was scared to like you , then when i liked you , i was scared to love you . Now i am in love with you and I’m scared of losing you 
I wish I will explain what you mean to me. I wish words for enough to express how I feel for you. It’s the way my heart, calm down, You are not someone I admire, but you are the feeling. I never knew I was missing now that I have finally found you. I don’t know without you.

I meet you at the lowest part of life 
But still you loved me , you loved me 
Not when i had everything , especially you loved me when I didn’t 
You held my heart with the gentle hands , teaching me that love was never supposed to hurt . You made me feel like home in the world that had always felt unfamiliar 
I had forgotten what it felt like to be loved , safe . THEN I MET YOU, as long as i have you i have everything i need . You’re an answered prayer of mine i’m really glad you are in my life. If it wouldn’t for you, then I wouldn’t be the person I am .you  have change my life in ways that you would ever imagine.
( you meet thousands of people and none of them really touch you and then you meet one person and you life has changed forever) Thank you, thank you for being patient when I’m not my best. I’m helping me get out of my head when I am overthinking. I’m really grateful for you.
You came in and you like a shot of espresso, like being bathed in sunlight, you’re incredibly energetic and enthusiastic 
And now that life put us together , i wish that the life will be gentle with us and keep us together as long as i breathe .
“I’m gonna be with you for the long haul until they put me in the ground “
And when i die , mix my ashes with the soil of your favourite flowers. I spent my life trying to belong to you , let me try again this time without a heart 
i still remember the way your name started sounding softer in my own head , like my heart had decided to protect it before i even realized i love you 

“I love you in a way that would worry a therapist and thrill a poet “
Even god 

with all his arrogance and galaxies, must have washed his trembling hands in the first holy water before daring to touch the clay that would become you. I picture him kneeling at his own altar, fingers dripping with stars, his palms shaking with a fear older than creation. He dipped them again and again into rivers made of stars, into oceans salted with the tears of saints until his skin was raw and shining, clean enough to carve your name out of dust. That's why when i look at you, i see water rising up the walls of heaven, a God still trying to cleanse himself after the blasphemy of making you.

You’d still be beautiful in a world without me . 
But every beautiful thing about my world began and ended with you 
And anyone who see you they will get a shot of sunshine and that one day they gonna write a book about you how they feel about you . And i get jealous of a stranger , who may see your eyes by chance and fall in love with them . Still they can’t see you the way i do 
They can’t love you the way i do 
“ jab bhi apke baare mein kitaab likhunga main apke honthon ko gulab likhunga apki aankho ko sharab likhunga , likhunga apko rani pariyon ki aur fir khud ko nawab likhunga saleeqa sikhaya jayega mohabbat ka jab kahin , apke har andaz ko adab likhunga hoga sawal jannat ka jab kahi mai apki bahon ko jawab likhunga , jab bhi apke bare mai kitaab likhunga 

And if this curl world pull us apart I would cross stormy seas , fight every monster, and spend years finding my way back to you . ( sorry but movies effect you know right ) 

I can’t love anyone that way i love you , even I don’t want to . I can never take you out of me , you’re living inside my eyes and deep in my heart and soul too
I never held you , never touched you not even once and that’s what that the true love is caz before any kinda touch our soul blend in each other 
“Not even my lungs years for air like i years for you “
I was never like this before but when i am around you i’ve no control on me , i feel powerless 
I walked in with pride and left only with love your eyes did the rest 
Oh my love I sought eternity in your eyes .
When the dirt covers my chest it won’t be heavier than the love i carried for you 
“I love you in a way that religion would forbid. 
Taint me in your sins , love lay your wounds upon me , i worship you in a way that gods would envy “
You’re beautiful like a painting meant to be stared and get completely lost in , as if light forgets roses and choses you instead, as if the sun for one selfish moment wanted to take a glance at you 

And I’m scared of the love i have  for you , 
Because i know it will ruin me . 
And i also know that i will let it .

You made me so humble and a good person a caring person and in life for the first time i wanted to improve myself for you . When i die don’t put flowers with me but just a picture of you in my pocket so i can tell everyone in heaven that who made me a better men and I promise i would be kind for you . I would reject the impulses to indulge in my violent nature for you . I would wake up and get out of bed and hour early every morning to make coffee for you i would be there for you no matter what i would leave the light on for you until you felt safe and i would hold you so tight until you felt at peace.  i would 

And as long as i live i have only one dream and that is to fulfil your every wish that’s my desires 
To build and orphanage on you’re name 
To help the people 
Maybe that’s not enough to say a thank to a god for sending you in life 

Remember on day you asked me what songs reminds me of you but everything ,every song reminds me of you 
Soo , Chahe dukh ho Chahe sukh ho
Dil ne tujhko hi pukara Tune humko hai banaaya Tune humko hai sanvaara
Jahan ko to rab ka hai Hume tera hai sahaara Bas tera saath ho, chaahe jo baat ho
Tere kehne se kar jayenge Hum mar jayenge
This song realised me that we worship the people we love we make them our religion, our god we run to them when we want to heal, love , cry , smile 
I never believed in god god but after you god made believe in him 
 
You always had a problem why i says i love you all the time 
It is because my soul doesn’t know how to stay quiet around you 
It slips out in silence, in the middle of the fight , in between unfinished sentences and in the pause where pain usually lives 
I love you not as a habit but as a confession my body keeps spilling even when my mind is tired of trying to explain 
I love you in a ways I don’t even understand yet like muscle memory like first breath after drowning like gravity refusing to let go and maybe that’s a curse or maybe that’s a gift 
To be haunted and healed by the same three words over and over again 
I love you 
I’m to the point where i needed a stronger word than ily for this woman 
Seeing you happy is that all i want with me or without me no matters where life take me i’ll always love you 
And please don’t push me away even though you’re mad at me caz I can’t handle may self without you I can’t deal with you'r absence I fears that what would I become in your absence or idk even I’ll survive and if i lose you , l lose everything not because you'r everything i have but beacuse you mean everything to me you have become such a big part of my life that imagining a future without you feels impossible and that is how i know how much i love you but i wish i say i miss you in a ways that will make your heart ache as mine does 
You know why i admires you so much not because the way you look or the way you laugh or the way you makes me feels alive but because of your character your soul you’re Soo beautiful from inside even I can’t put it in words and i’ll never find the reason why i love you so much . and on this day the only thing i can give you is that i promise to always be by your side or under you , or on top of you but always with you but i can't promise you that i can always solve all your problems or be able to take them away , but i can promise you that you will never have to face them alone .
and i know you think a lot about us about the end what will happen and all, but i need you to know that whatever happens it was worth it to me. being with you , loving you it was all worth it ,you worth it caz "you'r mine" If there are 14,000,604 ways to lose you...
and only one where I end up with you 
I'll make that one happen. iloveyou in every universe , i love you 3000
 i don't you remember or not but of all the things you've ever said, one still lives in my heart

"Don't come to convince me after a fight... because if you do, I'll be convinced. ignoring all the odds "
You called it a warning.
I heard it as love. is the reason i never give up on you and never will 
okayyy so actually i have a surprise for you and i promise you’ll be so so so happy seeing that , you never accepted anything from me but that will from you . i love you forever end ever. and once again happy birthday from all of us your dad , mom , sister who ever you love, idk i'm in that or not but we all love you , i do a little more 
I love you sarshar 💗 `;

let typingIndex = 0;
const typing = document.getElementById("typing");

function typeLetter() {
    if (!typing) return;
    
    // Calculates delay so the whole text finishes typing in 10 seconds total
    const speed = Math.max(1, Math.floor(10000 / birthdayLetter.length));

    if (typingIndex < birthdayLetter.length) {
        typing.innerHTML += birthdayLetter.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeLetter, speed);
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

