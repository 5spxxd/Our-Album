/* =========================
   YOUR ALBUMS
========================= */

const albums = [
    {
        name: "Our First Hangout",
        photos: [
            "images/Our First Hangout/photo1.jpeg",
            "images/Our First Hangout/photo2.jpeg",
            "images/Our First Hangout/photo3.jpeg",
            "images/Our First Hangout/photo4.jpeg",
            "images/Our First Hangout/photo5.jpeg",
            "images/Our First Hangout/photo6.jpeg",
            "images/Our First Hangout/photo7.jpeg",
            "images/Our First Hangout/photo8.jpeg",
            "images/Our First Hangout/photo9.jpeg"
        ]
    },

    {
        name: "Soon",
        photos: [
            "images/Soon/cat1.png",
        ]
    },

    
];


/* =========================
   VARIABLES
========================= */

let currentAlbumIndex = 0;
let currentPhotoIndex = 0;

let startX = 0;
let currentX = 0;
let dragging = false;


/* =========================
   ELEMENTS
========================= */

const albumButton =
    document.getElementById("albumButton");

const albumName =
    document.getElementById("albumName");

const albumMenu =
    document.getElementById("albumMenu");

const viewer =
    document.getElementById("viewer");

const welcome =
    document.getElementById("welcome");

const currentAlbum =
    document.getElementById("currentAlbum");

const photoCounter =
    document.getElementById("photoCounter");

const photoCard =
    document.getElementById("photoCard");

const currentPhoto =
    document.getElementById("currentPhoto");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


/* =========================
   BUILD ALBUM MENU
========================= */

function buildAlbumMenu() {

    albumMenu.innerHTML = "";

    albums.forEach((album, index) => {

        const option =
            document.createElement("button");

        option.className = "album-option";

        option.textContent = album.name;

        option.addEventListener("click", () => {

            selectAlbum(index);

            albumMenu.classList.remove("show");

        });

        albumMenu.appendChild(option);
    });
}


/* =========================
   SELECT ALBUM
========================= */

function selectAlbum(index) {

    if (!albums[index]) return;

    currentAlbumIndex = index;

    currentPhotoIndex = 0;

    const album = albums[index];

    albumName.textContent = album.name;

    currentAlbum.textContent = album.name;

    viewer.classList.remove("hidden");

    welcome.classList.add("hidden");

    updateActiveAlbum();

    renderPhoto();
}


/* =========================
   ACTIVE ALBUM
========================= */

function updateActiveAlbum() {

    const options =
        document.querySelectorAll(".album-option");

    options.forEach((option, index) => {

        option.classList.toggle(
            "active",
            index === currentAlbumIndex
        );
    });
}


/* =========================
   RENDER PHOTO
========================= */

function renderPhoto() {

    const album =
        albums[currentAlbumIndex];

    if (!album) return;


    const photos =
        album.photos;


    if (!photos.length) {

        currentPhoto.src = "";

        photoCounter.textContent = "0 / 0";

        return;
    }


    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    }


    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }


    currentPhoto.src =
        photos[currentPhotoIndex];


    photoCounter.textContent =
        `${currentPhotoIndex + 1} / ${photos.length}`;
}


/* =========================
   NEXT PHOTO
========================= */

function nextPhoto() {

    const album =
        albums[currentAlbumIndex];

    if (!album || !album.photos.length) return;


    currentPhotoIndex++;

    if (currentPhotoIndex >= album.photos.length) {
        currentPhotoIndex = 0;
    }


    animateCard("right");
}


/* =========================
   PREVIOUS PHOTO
========================= */

function previousPhoto() {

    const album =
        albums[currentAlbumIndex];

    if (!album || !album.photos.length) return;


    currentPhotoIndex--;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = album.photos.length - 1;
    }


    animateCard("left");
}


/* =========================
   CARD ANIMATION
========================= */

function animateCard(direction) {

    photoCard.classList.remove(
        "swipe-left",
        "swipe-right"
    );

    void photoCard.offsetWidth;


    if (direction === "right") {

        photoCard.classList.add(
            "swipe-right"
        );

    } else {

        photoCard.classList.add(
            "swipe-left"
        );
    }


    setTimeout(() => {

        renderPhoto();

        photoCard.classList.remove(
            "swipe-left",
            "swipe-right"
        );

    }, 180);
}


/* =========================
   SWIPE / DRAG
========================= */

photoCard.addEventListener(
    "pointerdown",
    event => {

        dragging = true;

        startX = event.clientX;

        currentX = startX;

        photoCard.setPointerCapture(
            event.pointerId
        );
    }
);


photoCard.addEventListener(
    "pointermove",
    event => {

        if (!dragging) return;

        currentX = event.clientX;

        const distance =
            currentX - startX;


        photoCard.style.transform =
            `translateX(${distance}px)
             rotate(${distance / 25}deg)`;
    }
);


photoCard.addEventListener(
    "pointerup",
    event => {

        if (!dragging) return;

        dragging = false;

        const distance =
            currentX - startX;


        photoCard.style.transform = "";


        if (Math.abs(distance) < 60) {
            return;
        }


        if (distance < 0) {

            nextPhoto();

        } else {

            previousPhoto();
        }
    }
);


/* =========================
   BUTTONS
========================= */

previousButton.addEventListener(
    "click",
    previousPhoto
);


nextButton.addEventListener(
    "click",
    nextPhoto
);


/* =========================
   ALBUM DROPDOWN
========================= */

albumButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        albumMenu.classList.toggle("show");
    }
);


/* =========================
   CLOSE DROPDOWN
========================= */

document.addEventListener(
    "click",
    event => {

        if (
            !albumMenu.contains(event.target) &&
            event.target !== albumButton
        ) {

            albumMenu.classList.remove("show");
        }
    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowLeft") {
            previousPhoto();
        }

        if (event.key === "ArrowRight") {
            nextPhoto();
        }
    }
);


/* =========================
   START
========================= */

function init() {

    if (!albums.length) {

        albumButton.disabled = true;

        albumName.textContent =
            "No albums available";

        return;
    }


    buildAlbumMenu();

    selectAlbum(0);
}


init();