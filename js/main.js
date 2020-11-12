const hockeypuckList = document.getElementById('hockeypucks-list');
const searchBar = document.getElementById('find-hockeypuck');
const clearButton = document.getElementById('clear-search-bar');


let hockeypucks = [
    {
        id: 1,
        name: "Lion",
        amount: 4,
        priceInUAH: 100
    },
    {
        id: 2,
        name: "North",
        amount: 45,
        priceInUAH: 500
    },
    {
        id: 3,
        name: "Bears",
        amount: 65,
        priceInUAH: 700
    },
    {
        id: 4,
        name: "Bull",
        amount: 100,
        priceInUAH: 600
    }
]
let currentHockeypucks = hockeypucks;

searchBar.addEventListener('keyup', (searchString) => {
    const searchFilterString = searchString.target.value.toLowerCase();
    const filteredHockeypuck = hockeypucks.filter(hockeypuck =>{
        return hockeypuck.name.toLowerCase().includes(searchFilterString);
    });
    currentHockeypucks = filteredHockeypuck;
    visualiseSortedHockeyPucks();
})

clearButton.addEventListener('click', ()=> {
    searchBar.value = '';
    currentHockeypucks = hockeypucks;
    visualiseSortedHockeyPucks();
})


function calculatePrice(){
    var priceSum = 0;
    var totalPriceLabel = document.getElementById('total-price');
    currentHockeypucks.forEach(hockeypuck => priceSum += hockeypuck.priceInUAH);
    totalPriceLabel.textContent = 'Total price: ' + priceSum + 'UAH';
}


function visualiseSortedHockeyPucks(){
    var sortType = document.getElementById('sort-select').value;
    console.log(sortType);
    if (sortType === 'none'){
        displayHockeupucks(currentHockeypucks);
        return;
    }
    else if (sortType === 'price'){
        currentHockeypucks.sort(compareByPrice);
    }
    displayHockeupucks(currentHockeypucks);
}


function compareByPrice(firstHockeypuck, secondHockeypuck){
    return firstHockeypuck.priceInUAH - secondHockeypuck.priceInUAH;
}


const displayHockeupucks = (hockeypuckToShow) => {
    const htmlString = hockeypuckToShow.map((hockeypuck)=>{
        return `
        <li class="hockeypuck">
            <h2>${hockeypuck.name}</h2>
            <h3>Amount: ${hockeypuck.amount}</h3>
            <h3>Price: ${hockeypuck.priceInUAH}</h3>
            <div class= "control-buttons">
                <button class="edit-button" id="edit-button" onclick="editRecord(this)">Edit</button>
                <button class="delete-button" id="delete-button" onclick="deleteRecord(this)">Delete</button>
            </div>
        </li>
        `
    }).join('');

    hockeypuckList.innerHTML = htmlString;
}


displayHockeupucks(currentHockeypucks)