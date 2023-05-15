import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');
createGallery(galleryItems);

function createGallery(galleryItems) {
    const markap = galleryItems.map(item => `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      alt="${item.description}"
    />
  </a>
</li>`).join("");
    galleryList.insertAdjacentHTML("beforeend", markap);
}

let modalGallery = new SimpleLightbox('.gallery__link',
    {
        captionsData: 'alt',
        captionDelay: 250,
        overlayOpacity: 0.8,
        showCounter: false,
    }
);
modalGallery.on('show.simplelightbox', () => {
  galleryList.addEventListener('click', (e) => {
    e.preventDefault();    
  });
});

