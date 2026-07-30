import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  loadMoreBtn: document.getElementById('load-more-button'),
  gallery: document.getElementById('gallery'),
};

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

refs.form?.addEventListener('submit', onSearch);
refs.loadMoreBtn?.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = refs.input?.value.trim() ?? '';

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();

  await loadImages();
}

async function onLoadMore() {
  currentPage += 1;
  await loadImages();
}

async function loadImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: resultTotalHits = 0 } = data;

    if (!hits || hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    if (currentPage === 1) {
      iziToast.success({
        message: `Hooray! We found ${resultTotalHits} images.`,
        position: 'topRight',
      });
    }

    createGallery(hits);
    totalHits = resultTotalHits;

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (currentPage > 1) {
      scrollOnLoad();
    }
  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function scrollOnLoad() {
  if (!refs.gallery) {
    return;
  }

  const firstCard = refs.gallery.querySelector('.photo-card');

  if (!firstCard) {
    return;
  }

  const { height } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
