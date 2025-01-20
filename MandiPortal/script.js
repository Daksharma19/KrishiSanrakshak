document.getElementById('btn').addEventListener('click', loadAPI);
document.getElementById('btn_sort').addEventListener('click', sortDetails);
document.getElementById('btn_sort_district').addEventListener('click', sortDetailsDistrict);
document.getElementById('btn_sort_state').addEventListener('click', sortDetailsState);
document.getElementById('textbtn').addEventListener('click', Searching);

const apiUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
const apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const limit = 50;

// Fetch data from the API
async function fetchData() {
    const response = await fetch(`${apiUrl}?api-key=${apiKey}&format=json&offset=0&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    console.log(data); // Log the fetched data
    return data;
}

// Render data
function renderData(records, lastUpdated) {
    const output = records.map(record => `
        <div class="mandi_location">
            <ul>
                <h3 style="color: Tomato; font-family: Lucida Console, Courier, monospace;">
                    ${record.district}, ${record.state}
                </h3>
                <h2 style="color: grey; font-family: Lucida Console, Courier, monospace;">
                    Rs${record.modal_price}/quintal, ${record.commodity}
                </h2>
                <li style="color: SaddleBrown;">Arrival Date: ${record.arrival_date}</li>
                <li style="color: SaddleBrown;">Market: ${record.market}</li>
                <li style="color: SaddleBrown;">Variety: ${record.variety}</li>
                <li style="color: SaddleBrown;">Maximum Rate: Rs ${record.max_price}</li>
                <li style="color: SaddleBrown;">Minimum Rate: Rs ${record.min_price}</li>
            </ul>
        </div>
    `).join('');

    document.getElementById('display_mandi').innerHTML = output;
    document.getElementById('lastUpdated').innerHTML = lastUpdated;
}

// Load all details
async function loadAPI() {
    try {
        const data = await fetchData();
        renderData(data.records, data.updated_date);
    } catch (error) {
        console.error(error);
    }
}

// Sort data
async function sortDetails(sortBy) {
    try {
        const data = await fetchData();
        const sortedRecords = data.records.sort((a, b) => {
            if (sortBy === 'price') return a.modal_price - b.modal_price;
            return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
        });
        renderData(sortedRecords, data.updated_date);
    } catch (error) {
        console.error(error);
    }
}

function sortDetailsState() {
    sortDetails('state');
}

function sortDetailsDistrict() {
    sortDetails('district');
}

function sortDetailsPrice() {
    sortDetails('price');
}

// Search data
async function Searching() {
    const searchTerm = document.getElementById('text1').value.toLowerCase();
    try {
        const data = await fetchData();
        const filteredRecords = data.records.filter(record =>
            [record.market, record.commodity].some(field =>
                field.toLowerCase().includes(searchTerm)
            )
        );

        if (filteredRecords.length > 0) {
            renderData(filteredRecords, data.updated_date);
        } else {
            document.getElementById('display_mandi').innerHTML = `<div class="mandi_location"><br><br><center>No Result Matched!</center></div>`;
        }
    } catch (error) {
        console.error(error);
    }
}
