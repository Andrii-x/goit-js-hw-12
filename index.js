/* empty css                      */import{a as B,S as v,i as c}from"./assets/vendor-S2qh7U4E.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const E="",h=15,I=B.create({baseURL:"https://pixabay.com/api/",params:{key:E,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h}});function _(){throw new Error("Missing VITE_PIXABAY_API_KEY environment variable")}async function M(o,t=1){return _(),(await I.get("",{params:{q:o,page:t}})).data}const d=document.getElementById("gallery"),f=document.getElementById("load-more-button"),p=document.getElementById("loader"),R=new v(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function A(o){if(!d)return;const t=o.map(({webformatURL:n,largeImageURL:a,tags:e,likes:r,views:i,comments:w,downloads:P})=>`
      <a class="photo-card" href="${a}">
        <img class="photo-card__image" src="${n}" alt="${e}" loading="lazy" />
        <div class="photo-card__info">
          <p>
            <b>Likes</b>
            <span>${r}</span>
          </p>
          <p>
            <b>Views</b>
            <span>${i}</span>
          </p>
          <p>
            <b>Comments</b>
            <span>${w}</span>
          </p>
          <p>
            <b>Downloads</b>
            <span>${P}</span>
          </p>
        </div>
      </a>`).join("");d.insertAdjacentHTML("beforeend",t),R.refresh()}function S(){d&&(d.innerHTML="")}function q(){p&&p.classList.remove("is-hidden")}function $(){p&&p.classList.add("is-hidden")}function O(){f&&f.classList.remove("is-hidden")}function u(){f&&f.classList.add("is-hidden")}const l={form:document.querySelector("#search-form"),input:document.querySelector('[name="searchQuery"]'),loadMoreBtn:document.getElementById("load-more-button"),gallery:document.getElementById("gallery")};let b="",s=1,m=0;var g;(g=l.form)==null||g.addEventListener("submit",H);var y;(y=l.loadMoreBtn)==null||y.addEventListener("click",T);async function H(o){var n;o.preventDefault();const t=((n=l.input)==null?void 0:n.value.trim())??"";if(!t){c.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}b=t,s=1,m=0,S(),u(),await L()}async function T(){s+=1,await L()}async function L(){q();try{const o=await M(b,s),{hits:t,totalHits:n=0}=o;if(!t||t.length===0){u(),c.info({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}s===1&&c.success({message:`Hooray! We found ${n} images.`,position:"topRight"}),A(t),m=n;const a=Math.ceil(m/h);s<a?O():(u(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),s>1&&x()}catch(o){console.error(o),u(),c.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{$()}}function x(){if(!l.gallery)return;const o=l.gallery.querySelector(".photo-card");if(!o)return;const{height:t}=o.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
