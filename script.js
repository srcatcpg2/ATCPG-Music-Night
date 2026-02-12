// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// --- LIGHTBOX LOGIC ---
const lightbox = document.getElementById('photo-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const downloadBtn = document.getElementById('download-btn');

function openLightbox(bigImageSrc) {
    lightboxImg.src = bigImageSrc;
    downloadBtn.href = bigImageSrc; // Set the download link
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevents scrolling behind lightbox
}

function closeLightbox(e) {
    // Only close if the background or the 'x' button is clicked
    if (!e || e.target === lightbox || e.target.className === 'close-btn') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enables scrolling
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});


// --- LOAD MORE LOGIC ---
const totalPhotos = 134; 
const batchSize = 12; 
let currentCount = 1; 

const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');

function loadNextBatch() {
    const end = currentCount + batchSize;
    
    for (let i = currentCount; i < end && i <= totalPhotos; i++) {
        
        // TINY VERSION (Grid)
        const thumbName = `thumbs/Music Night (${i}).jpg`; 
        
        // BIG VERSION (Lightbox/Download)
        const bigName = `edited/Music Night (${i}).jpg`; 
        
        const item = document.createElement('div');
        item.className = 'masonry-item fade-in-up';
        
        // CLICK OPENS BIG IMAGE
        item.onclick = function() { openLightbox(bigName); };

        // IMAGE HTML USES TINY VERSION
        item.innerHTML = `
            <img src="${thumbName}" loading="lazy" alt="Gallery Photo ${i}">
        `;

        galleryGrid.appendChild(item);
    }

    currentCount += batchSize;

    // Hide button if all photos loaded
    if (currentCount > totalPhotos) {
        loadMoreBtn.style.display = 'none';
    }
}

// Initial load
loadNextBatch();

// Button click
loadMoreBtn.addEventListener('click', loadNextBatch);