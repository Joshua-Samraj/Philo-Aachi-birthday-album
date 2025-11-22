// 1. DATABASE (Simplified)
// Just enter the folder name and how many photos are inside.
// IMPORTANT: Your photos must be named (1).jpg, (2).jpg, (3).jpg ... etc.
const albumData = {
    "Random": {
        folder: "Random",
        count: 126,
        Cover_image: '71'
    },
    "Allen": {
        folder: "Allen",
        count: 13, // Change this to the actual number of photos you have
        Cover_image: '11'
    },
    "Annie": {
        folder: "Annie",
        count: 17,
        Cover_image: '12'
    },
    "fathima": {
        folder: "fathima",
        count: 19,
        Cover_image: '15'
    },
    "feno": {
        folder: "feno",
        count: 47,
        Cover_image: '44'
    },
    "Francy": {
        folder: "Francy",
        count: 23,
        Cover_image: '1'
    },
    "godson": {
        folder: "godson",
        count: 23,
        Cover_image: '12'
    },
    "gowtham": {
        folder: "gowtham",
        count: 29,
        Cover_image: '28'
    },
    "Kiren": {
        folder: "Kiren",
        count: 21,
        Cover_image: '20'
    },
    "Marshal": {
        folder: "Marshal",
        count: 5,
        Cover_image: '4'
    },
    "Rajesh": {
        folder: "Rajesh",
        count: 11,
        Cover_image: '5'
    },
    
    "Sam": {
        folder: "Sam",
        count: 40,
        Cover_image: '31'
    },
    "soundra": {
        folder: "soundra",
        count: 32,
        Cover_image: '26'
    },
    "terin": {
        folder: "terin",
        count: 49,
        Cover_image: '36'
    },
};

// 2. DOM ELEMENTS
const homeSection = document.getElementById('home-section');
const gallerySection = document.getElementById('gallery-section');
const galleryTitle = document.getElementById('gallery-title');
const photoContainer = document.getElementById('photo-container');

// Viewer Elements
const viewer = document.getElementById('image-viewer');
const fullImage = document.getElementById('full-image');
const downloadBtn = document.getElementById('download-btn');

// 3. GLOBAL VARIABLES
let currentImageList = []; // Will store just the filenames: ["(1).jpg", "(2).jpg"...]
let currentFolder = "";    
let currentIndex = 0;      

// 4. ROUTER
function handleRoute() {
    const hash = window.location.hash.substring(1);
    if (hash && albumData[hash]) {
        renderGallery(hash);
    } else {
        renderHome();
    }
}

// 5. RENDER FUNCTIONS
function renderHome() {
    homeSection.classList.remove('hidden');
    gallerySection.classList.add('hidden');
    viewer.classList.add('hidden');
}

function renderGallery(familyName) {
    homeSection.classList.add('hidden');
    gallerySection.classList.remove('hidden');
    galleryTitle.innerText = formatTitle(familyName) + ' Family';
    photoContainer.innerHTML = '';

    const data = albumData[familyName];

    if (data && data.count > 0) {
        // SAVE CONTEXT TO GLOBAL VARIABLES
        currentFolder = data.folder;
        currentImageList = []; 

        // --- NEW LOGIC: GENERATE IMAGES AUTOMATICALLY ---
        // This loop creates the list based on the count
        for (let i = 1; i <= data.count; i++) {
            // Assuming your naming format is "(1).jpg", "(2).jpg"
            // If your files are named "1.jpg", change this to: `${i}.jpg`
            const fileName = `(${i}).webp`; 
            currentImageList.push(fileName);
        }

        // Now Loop through the generated list to display them
        currentImageList.forEach((fileName, index) => {
            const imgElement = document.createElement('img');
            const fullPath = `image/${currentFolder}/${fileName}`;

            imgElement.src = fullPath;
            imgElement.className = "gallery-img";
            imgElement.alt = `Photo ${index + 1}`;

            // Pass the INDEX to openViewer
            imgElement.onclick = () => openViewer(index);

            // Error handling: if a file is missing, hide the broken image icon
            imgElement.onerror = function() {
                this.style.display = 'none';
            };

            photoContainer.appendChild(imgElement);
        });

    } else {
        photoContainer.innerHTML = '<p>No photos found!</p>';
    }
}

// 6. VIEWER FUNCTIONS
function openViewer(index) {
    currentIndex = index; 
    updateViewerImage(); 
    viewer.classList.remove('hidden');
}

function updateViewerImage() {
    // Get filename based on current index
    const fileName = currentImageList[currentIndex];
    const fullPath = `image/${currentFolder}/${fileName}`;

    // Update Image
    fullImage.src = fullPath;
    
    // Since we removed Drive links, the download button now 
    // just downloads the actual image file.
    downloadBtn.href = fullPath;
    downloadBtn.setAttribute('download', fileName); 
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= currentImageList.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImageList.length - 1;
    }

    updateViewerImage();
}

function closeViewer() {
    viewer.classList.add('hidden');
    fullImage.src = "";
}

// Helper
function formatTitle(string) {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Event Listeners
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

viewer.addEventListener('click', (e) => {
    if (e.target === viewer) {
        closeViewer();
    }
});