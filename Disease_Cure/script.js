// Load crop data from crops.json file
fetch('data/crops.json')
    .then(response => response.json())
    .then(data => {
        // Populate crop cards on the main page
        const cropCardsContainer = document.querySelector('.crop-cards-container');
        data.forEach(crop => {
            const cropCard = document.createElement('div');
            cropCard.classList.add('crop-card');
            cropCard.innerHTML = `
                <img src="${crop.image}" alt="${crop.crop}">
                <h3>${crop.crop}</h3>
            `;
            cropCard.onclick = () => {
                // When a crop is clicked, redirect to its disease page
                localStorage.setItem('selectedCrop', JSON.stringify(crop));
                window.location.href = 'crop.html';
            };
            cropCardsContainer.appendChild(cropCard);
        });
    })
    .catch(error => console.error('Error loading crop data:', error));

// Load crop disease details on the crop page
window.addEventListener('DOMContentLoaded', () => {
    const selectedCrop = JSON.parse(localStorage.getItem('selectedCrop'));

    if (selectedCrop) {
        document.getElementById('crop-name').textContent = selectedCrop.crop;

        const diseasesContainer = document.querySelector('.diseases-container');
        selectedCrop.diseases.forEach(disease => {
            const diseaseCard = document.createElement('div');
            diseaseCard.classList.add('disease-card');
            diseaseCard.innerHTML = `
                <img src="${disease.image}" alt="${disease.name}">
                <h3>${disease.name}</h3>
                <p><strong>Symptoms:</strong> ${disease.symptoms}</p>
                <p><strong>Control:</strong> ${disease.control}</p>
            `;
            diseasesContainer.appendChild(diseaseCard);
        });
    }
});
