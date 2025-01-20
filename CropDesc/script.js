// DOM Elements
const cropContainer = document.getElementById('crop-container');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

// Fetch crop data from the server (PHP)
async function fetchCropData() {
    try {
        const response = await fetch('getCrops.php'); // PHP endpoint to get JSON data
        const data = await response.json();
        return data.crops; // Assuming JSON has a "crops" array
    } catch (error) {
        console.error('Error fetching crop data:', error);
        return [];
    }
}

// Create crop cards dynamically
function createCropCards(crops) {
    cropContainer.innerHTML = ''; // Clear existing cards

    crops.forEach((crop) => {
        const card = document.createElement('div');
        card.classList.add('crop-card');
        card.innerHTML = `
            <img src="${crop.image}" alt="${crop.name}">
            <div class="card-content">
                <h3 class="card-title">${crop.name}</h3>
                <p class="card-desc">${crop.shortDesc}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            // Navigate to cropDetails.html with query parameters
            window.location.href = `cropDetails.html?crop=${encodeURIComponent(crop.name)}&image=${encodeURIComponent(crop.image)}&desc=${encodeURIComponent(crop.fullDesc)}`;
        });
        cropContainer.appendChild(card);
    });
}

// Filter crops based on search input
function filterCrops(crops, query) {
    return crops.filter((crop) =>
        crop.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Event Listeners
searchButton.addEventListener('click', async () => {
    const query = searchBar.value.trim();
    const crops = await fetchCropData();
    const filteredCrops = filterCrops(crops, query);
    createCropCards(filteredCrops); // Update the displayed cards
});

// Initial Load
(async () => {
    const crops = await fetchCropData();
    createCropCards(crops); // Display all crops initially
})();
// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cropName = urlParams.get('crop');
    const cropImage = urlParams.get('image');
    const cropDesc = urlParams.get('desc');
    
    // Set the content dynamically
    document.getElementById('cropName').textContent = cropName;
    document.getElementById('cropImage').src = "images/" + cropImage;
    document.getElementById('cropDesc').textContent = cropDesc;
  
    // Optionally: You can load favorable/unfavorable conditions dynamically too
    // Fetch additional details from JSON or database if needed
  });
  