// Pronađi modal i sliku
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("close")[0];

// Pronađi sve slike u galeriji
const galleryImages = document.querySelectorAll(".card img");

// Dodaj event listener za svaku sliku
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "block"; // Prikaži modal
    modalImg.src = img.src; // Postavi izvor slike
  });
});

// Kada korisnik klikne na "X" zatvori modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Zatvori modal ako korisnik klikne van slike
modal.onclick = function (event) {
  if (event.target !== modalImg) {
    modal.style.display = "none";
  }
};

console.clear();

gsap.registerPlugin(Draggable, InertiaPlugin);

const cardsContainer = document.querySelector(".cards");
const cards = gsap.utils.toArray(".card");
const snapPoints = cards.map((card, i) => -(card.clientWidth + 50) * i);
const mySnap = gsap.utils.snap(snapPoints);

window.addEventListener("load", () => {
  Draggable.create(cardsContainer, {
    type: "x",
    bounds: {
      maxX: 0,
      minX: window.innerWidth - cardsContainer.scrollWidth - 50
    },
    onDrag: function () {
      direction = this.deltaX;
    },
    inertia: true,
    snap: {
      x: function (v) {
        return mySnap(v);
      }
    }
  });
});