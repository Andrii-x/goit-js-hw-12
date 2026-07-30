import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.getElementById('gallery');
const loadMoreBtnRef = document.getElementById('load-more-button');
const loaderRef = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function createGallery(images) {
  if (!galleryRef) {
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="photo-card">
        <a class="photo-card__link" href="${largeImageURL}">
          <img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="photo-card__info">
            <p>
              <b>Likes</b>
              <span>${likes}</span>
            </p>
            <p>
              <b>Views</b>
              <span>${views}</span>
            </p>
            <p>
              <b>Comments</b>
              <span>${comments}</span>
            </p>
            <p>
              <b>Downloads</b>
              <span>${downloads}</span>
            </p>
          </div>
        </a>
      </li>`,
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (!galleryRef) {
    return;
  }

  galleryRef.innerHTML = '';
}

export function showLoader() {
  if (!loaderRef) {
    return;
  }

  loaderRef.classList.remove('is-hidden');
}

export function hideLoader() {
  if (!loaderRef) {
    return;
  }

  loaderRef.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  if (!loadMoreBtnRef) {
    return;
  }

  loadMoreBtnRef.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (!loadMoreBtnRef) {
    return;
  }

  loadMoreBtnRef.classList.add('is-hidden');
}
