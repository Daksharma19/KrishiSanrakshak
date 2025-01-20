document.getElementById('getRecommendation').addEventListener('click', function() {
    let state = document.getElementById('state').value;
    let soilTexture = document.getElementById('soilTexture').value;
    console.log(state);
    console.log(soilTexture);

    if (state && soilTexture) {
        let cropPlan = getCropRotationPlan(state, soilTexture);
        console.log(cropPlan);
        let cropPlanArray = cropPlan.split('Year').filter(item => item.trim() !== ''); 

        // Clear previous content
        document.getElementById('cropPlan').innerHTML = ''; 


        cropPlanArray.forEach(function(item, index) {
            let pTag = document.createElement('h3');
            // Add 'Year' back to the beginning of each item (after splitting)
            pTag.innerHTML = 'Year ' + item.trim(); 
            document.getElementById('cropPlan').appendChild(pTag);
        });

        // Optionally, remove the 'hidden' class from 'recommendation' to make it visible
        document.getElementById('recommendation').classList.remove('hidden');
    } else {
        alert('Please select both state and soil texture.');
    }
});


function getCropRotationPlan(state, soilTexture) {
    let plan = '';

    switch(state) {
        case 'andhraPradesh':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Soybean';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Maize\nYear 2: Groundnut\nYear 3: Pulses';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Cotton\nYear 2: Soybean\nYear 3: Rice';
            } else if (soilTexture === 'saline') {
                plan = 'Year 1: Salt-tolerant crops (Barley)\nYear 2: Rice\nYear 3: Pulses';
            } else if (soilTexture === 'peat') {
                plan = 'Year 1: Rice\nYear 2: Tuber crops\nYear 3: Mustard';
            }
            break;
        case 'arunachalPradesh':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Legumes';
            }
            break;
        case 'assam':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Tea\nYear 3: Legumes';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Pulses';
            } else if (soilTexture === 'peat') {
                plan = 'Year 1: Rice\nYear 2: Mustard\nYear 3: Pulses';
            }
            break;
        case 'bihar':
            if (soilTexture === 'sandy') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Pulses';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Maize\nYear 2: Wheat\nYear 3: Groundnut';
            } else if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Mustard';
            }
            break;
        case 'chhattisgarh':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Soybean';
            } else if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Sorghum\nYear 3: Groundnut';
            }
            break;
        case 'goa':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Groundnut';
            } else if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Pepper';
            }
            break;
        case 'gujarat':
            if (soilTexture === 'sandy') {
                plan = 'Year 1: Cotton\nYear 2: Groundnut\nYear 3: Wheat';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Sorghum\nYear 2: Wheat\nYear 3: Cotton';
            } else if (soilTexture === 'saline') {
                plan = 'Year 1: Salt-tolerant crops (like Barley)\nYear 2: Rice\nYear 3: Pulses';
            }
            break;
        case 'haryana':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Legumes';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Wheat\nYear 2: Rice\nYear 3: Groundnut';
            } else if (soilTexture === 'chalk') {
                plan = 'Year 1: Barley\nYear 2: Wheat\nYear 3: Peas';
            }
            break;
        case 'himachalPradesh':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Wheat\nYear 2: Rice\nYear 3: Apple (Hilly regions)';
            }
            break;
        case 'jharkhand':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Maize';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Maize\nYear 2: Pulses\nYear 3: Soybean';
            }
            break;
        case 'karnataka':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Cotton';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Maize\nYear 2: Groundnut\nYear 3: Soybean';
            } else if (soilTexture === 'saline') {
                plan = 'Year 1: Salt-tolerant crops (like Barley)\nYear 2: Rice\nYear 3: Mustard';
            }
            break;
        case 'kerala':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Pepper';
            } else if (soilTexture === 'peat') {
                plan = 'Year 1: Rice\nYear 2: Tuber crops\nYear 3: Pepper';
            }
            break;
        case 'madhyaPradesh':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Wheat\nYear 2: Soybean\nYear 3: Cotton';
            } else if (soilTexture === 'loamy') {
                plan = 'Year 1: Sorghum\nYear 2: Soybean\nYear 3: Wheat';
            }
            break;
        case 'maharashtra':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Soybean\nYear 2: Cotton\nYear 3: Sorghum';
            } else if (soilTexture === 'saline') {
                plan = 'Year 1: Salt-tolerant crops (like Barley)\nYear 2: Rice\nYear 3: Legumes';
            }
            break;
        case 'manipur':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Pulses';
            }
            break;
        case 'meghalaya':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Mustard\nYear 3: Pulses';
            }
            break;
        case 'mizoram':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Vegetables';
            }
            break;
        case 'nagaland':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Maize\nYear 2: Rice\nYear 3: Soybean';
            }
            break;
        case 'odisha':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Soybean';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Maize';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Soybean';
            }
            break;
        case 'punjab':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Soybean';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Maize\nYear 2: Wheat\nYear 3: Legumes';
            }
            break;
        case 'rajasthan':
            if (soilTexture === 'sandy') {
                plan = 'Year 1: Cotton\nYear 2: Wheat\nYear 3: Groundnut';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Sorghum\nYear 2: Mustard\nYear 3: Soybean';
            }
            break;
        case 'sikkim':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Mustard\nYear 3: Maize';
            }
            break;
        case 'tamilnadu':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Mustard';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Sorghum\nYear 2: Cotton\nYear 3: Pulses';
            }
            break;
        case 'telangana':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Cotton\nYear 2: Soybean\nYear 3: Groundnut';
            }
            break;
        case 'tripura':
            if (soilTexture === 'loam') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Legumes';
            }
            break;
        case 'uttarPradesh':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Wheat\nYear 2: Rice\nYear 3: Soybean';
            } else if (soilTexture === 'loam') {
                plan = 'Year 1: Maize\nYear 2: Wheat\nYear 3: Groundnut';
            }
            break;
        case 'uttarakhand':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Wheat\nYear 2: Rice\nYear 3: Barley';
            }
            break;
        case 'westBengal':
            if (soilTexture === 'clay') {
                plan = 'Year 1: Rice\nYear 2: Wheat\nYear 3: Mustard';
            } else if (soilTexture === 'sandy') {
                plan = 'Year 1: Maize\nYear 2: Groundnut\nYear 3: Soybean';
            }
            break;

        // Union Territories
        case 'andamanNicobar':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Vegetables';
            }
            break;
        case 'chandigarh':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Mustard\nYear 2: Wheat\nYear 3: Barley';
            }
            break;
        case 'dadraNagarHaveli':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Maize\nYear 3: Soybean';
            }
            break;
        case 'damanDiu':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Groundnut';
            }
            break;
        case 'delhi':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Mustard\nYear 2: Wheat\nYear 3: Barley';
            }
            break;
        case 'lakshadweep':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Coconut\nYear 3: Vegetables';
            }
            break;
        case 'puducherry':
            if (soilTexture === 'loamy') {
                plan = 'Year 1: Rice\nYear 2: Groundnut\nYear 3: Mustard';
            }
            break;
        default:
            plan = 'Crop rotation plan not available for selected state/soil texture.';
            break;
    }

    return plan;
}