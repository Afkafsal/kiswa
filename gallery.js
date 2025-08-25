const btns = document.querySelectorAll('.buttons button');
const imgs = document.querySelectorAll('.images img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Filtering logic
for (let i = 1; i < btns.length; i++) {
  btns[i].addEventListener('click', filterImg);
}

function setActiveBtn(e) {
  btns.forEach(btn => btn.classList.remove('btn-clicked'));
  e.target.classList.add('btn-clicked');
}

function filterImg(e) {
  setActiveBtn(e);
  imgs.forEach(img => {
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
    const imgType = parseInt(img.dataset.img);
    const btnType = parseInt(e.target.dataset.btn);
    if (imgType !== btnType) {
      img.classList.remove('img-expand');
      img.classList.add('img-shrink');
    }
  });
}

btns[0].addEventListener('click', (e) => {
  setActiveBtn(e);
  imgs.forEach(img => {
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
  });
});

// Lightbox
imgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

// Fade-in animations for images
gsap.registerPlugin(ScrollTrigger);
imgs.forEach(img => {
  gsap.from(img, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: img,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});