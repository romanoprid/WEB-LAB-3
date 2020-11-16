const hockeypuckList = document.getElementById('hockeypucks-list');
const searchBar = document.getElementById('find-hockeypuck');
const clearButton = document.getElementById('clear-search-bar');

const createHockeypuckID = document.getElementById('create_id');
const createHockeypuckName = document.getElementById('create_name');
const createHockeypuckAmount = document.getElementById('create_amount');
const createHockeypuckPrice = document.getElementById('create_priceInUAH');

var editActive = false;


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
    const filteredHockeypuck = hockeypucks.filter(hockeypuck => {
        return hockeypuck.name.toLowerCase().includes(searchFilterString);
    });
    currentHockeypucks = filteredHockeypuck;
    visualiseSortedHockeyPucks();
})

clearButton.addEventListener('click', () => {
    searchBar.value = '';
    currentHockeypucks = hockeypucks;
    visualiseSortedHockeyPucks();
})


function calculatePrice() {
    var priceSum = 0;
    var totalPriceLabel = document.getElementById('total-price');
    currentHockeypucks.forEach(hockeypuck => priceSum += hockeypuck.priceInUAH);
    totalPriceLabel.textContent = 'Total price: ' + priceSum + 'UAH';
}


function visualiseSortedHockeyPucks() {
    var sortType = document.getElementById('sort-select').value;
    console.log(sortType);
    if (sortType === 'none') {
        displayHockeypucks(currentHockeypucks);
        return;
    } else if (sortType === 'price') {
        currentHockeypucks.sort(compareByPrice);
    }
    displayHockeypucks(currentHockeypucks);
}


function compareByPrice(firstHockeypuck, secondHockeypuck) {
    return firstHockeypuck.priceInUAH - secondHockeypuck.priceInUAH;
}

const displayHockeypucks = (hockeypucksToShow) => {
    const htmlString = hockeypucksToShow.map((hockeypuck)=>{
        return `
        <li class="hockeypuck">
            <div>            
                <h2 class="hockeypuck_id"> ${hockeypuck.id}</h2>
                <h2> ${hockeypuck.name}</h2>
                <h3 class="amount">Amount: ${hockeypuck.amount}</h3>
                <h3 class="priceInUAH">Price: ${hockeypuck.priceInUAH}</h3>
            </div>
            <form class="form__edit_hockeypuck" id="form__edit_hockeypuck">
                    <input id="edit_name" name="name" type="text" placeholder="Name">
                    <input id="edit_amount" name="amount" type="number" step=0.1 placeholder="Amount">
                    <input id="edit_priceInUAH" name="priceInUAH" type="number" placeholder="Price">
            </form>
            <div class= "control-buttons">
                <button class="edit-button" id="edit-button" onclick="editRecord(this)">Edit</button>
                <button class="delete-button" id="delete-button" onclick="deleteRecord(this)">Delete</button>
            </div>
        </li>
        `
    }).join('');

    hockeypuckList.innerHTML = htmlString;
}
function deleteRecord(record){
    const list_to_delete = record.parentNode.parentNode;
    let hockeypuckId = parseInt(list_to_delete.childNodes[1].childNodes[1].innerHTML);
    let indexToDeleteFromAll = hockeypucks.findIndex(obj => obj.id==hockeypuckId);
    hockeypucks.splice(indexToDeleteFromAll, 1);
    if (searchBar.value != ''){
        let indexToDeleteFromCurrent = currentHockeypucks.findIndex(obj => obj.id==hockeypuckId);
        console.log(indexToDeleteFromCurrent);
        currentHockeypucks.splice(indexToDeleteFromCurrent, 1);
    }
    visualiseSortedHockeyPucks();
    console.log(hockeypucks, currentHockeypucks);
    return list_to_delete;
}
function editRecord(record){
    const nodeList = record.parentNode.parentNode.childNodes;
    const editBar = nodeList[3];
    const infoBar = nodeList[1];
    let hockeypuckId = parseInt(infoBar.childNodes[1].innerHTML);
    let hockeypuckName = infoBar.childNodes[3].innerHTML;
    let hockeypuckAmount = parseFloat(infoBar.childNodes[5].innerHTML);
    let hockeypuckPrice = parseFloat(infoBar.childNodes[7].innerHTML);
    const editedHockeypuckName = nodeList[3][0];
    const editedHockeypuckAmount = nodeList[3][1];
    const editedHockeypuckPrice = nodeList[3][2];

    let indexToEdit = hockeypucks.findIndex(obj => obj.id==hockeypuckId);
    if (editActive == false){
        editBar.classList.add('open');
        editBar.classList.remove('hide');
        infoBar.classList.add('hide');
        infoBar.classList.remove('open');
        editActive = true
    } else if (editActive == true){
        editBar.classList.add('hide');
        editBar.classList.remove('open');
        infoBar.classList.add('open');
        infoBar.classList.remove('hide');

        if (validateAmountAndPrice(editedHockeypuckAmount.value, editedHockeypuckPrice.value) == false){
            editedHockeypuckAmount.value = '';
            editedHockeypuckPrice.value = '';
            return;
        }

        if (editedHockeypuckName.value != "") {
            hockeypucks[indexToEdit]["name"] = editedHockeypuckName.value;
        } else {
            hockeypucks[indexToEdit]["name"] = hockeypuckName;
        }
        if (editedHockeypuckAmount.value != "") {
            hockeypucks[indexToEdit]["amount"] = parseFloat(editedHockeypuckAmount.value);
        } else{
            hockeypucks[indexToEdit]["amount"] = hockeypuckAmount;
        }
        if (editedHockeypuckPrice.value != "") {
            hockeypucks[indexToEdit]["priceInUAH"] =  parseFloat(editedHockeypuckPrice.value)
        } else{
            hockeypucks[indexToEdit]["priceInUAH"] =  hockeypuckPrice
        }

        editActive = false;
        visualiseSortedHockeyPucks();
    }
}
function createHockeypuck(){
    if(validateFormRequirements(createHockeypuckID.value, createHockeypuckName.value, createHockeypuckAmount.value, createHockeypuckPrice.value) == false){
        console.log('error');
        return;
    }
    if(validateAmountAndPrice(createHockeypuckAmount.value, createHockeypuckPrice.value) == false){
        console.log('error');
        return;
    }
    let json = createJSON(createHockeypuckID.value, createHockeypuckName.value, createHockeypuckAmount.value, createHockeypuckPrice.value);

    hockeypucks.push(json)

    visualiseSortedHockeyPucks();
    return json;
}

function createJSON(id, name, amount, price){
    let createdHockeyPuck = {
        "id": parseInt(id),
        "name": name,
        "amount": parseFloat(amount),
        "priceInUAH": parseFloat(price)
    }
    return createdHockeyPuck;

}
function validateAmountAndPrice(amount, price){
    if (parseFloat(amount) <=0){
        alert('amount cannot be less then zero');
        return false;
    }
    if (parseFloat(price) <=0){
        alert('price cannot be less then zero');
        return false;
    }
    return true;
}
function validateFormRequirements(id, name, amount, price){
    if(id == ''){
        alert('id field is requiered')
        return false;
    }
    if(name == ''){
        alert('name field is requiered')
        return false;
    }
    if (amount == ''){
        alert('amount field is requiered');
        return false;
    }
    if (price == 0){
        alert('price  field is requiered');
        return false;
    }
    return true;
}



displayHockeypucks(currentHockeypucks)







