let pets = []; // 8 elements
let fullPetsList = []; // 48 elements;

const request = new XMLHttpRequest();
request.open('GET', './pets.json');

request.onload = () => {
    pets = JSON.parse(request.response);

    fullPetsList = ( () => {
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = pets;
            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();

    createPets(fullPetsList);

    for (let i = 0; i < 8; i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);
        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if (item.name === stepList[j].name && (ind !== j)) {
                    document.querySelector("#pets").children[(i * 6) + j].style.border = '5px solid red';
                }
            })
        }
    }
}

const createPets = (petsList) => {
    const elem = document.querySelector("#pets");
    elem.innerHTML += createElement(petsList);
}

createElement = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<img src="${petsList[i].img}">`;
    }
    return str;
}

request.send();