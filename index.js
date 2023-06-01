let monsters = [];
let currentPage = 1;

class Monster {
    constructor(data) {
        this.name = data.name;
    }

    log() {
        console.log("Monster " + this.name);
    }

    html() {
        const monsterTemplate = document.getElementById("monster-template");
        const monsterArticle = monsterTemplate.content.cloneNode(true);

        const monsterName = monsterArticle.querySelector("h2.name");
        monsterName.innerHTML = this.name;

        // const monsterDescription = monsterArticle.querySelector("p.description");
        // monsterDescription.innerHTML = `${monster.size} ${monster.alignment} ${monster.type}`;

        // const actionList = monsterArticle.querySelector("ul.actions");
        // for (let action of monster.actions) {
        //     const actionItem = document.createElement("li");
        //     actionItem.innerHTML = action.name;
        //     actionList.appendChild(actionItem);
        // }

        return monsterArticle;
    }
}

let monster1 = new Monster({ 
    name: "Marcel" 
});
monster1.log();

function setup() {
    fetch(
        "https://dl.dropboxusercontent.com/s/iwz112i0bxp2n4a/5e-SRD-Monsters.json"
    )
        .then((response) => response.json())
        .then(parseMonsters);

    document
        .querySelector("#monster-nav .prev")
        .addEventListener("click", prevMonsters);
    document
        .querySelector("#monster-nav .next")
        .addEventListener("click", nextMonsters);
}

function nextMonsters() {
    const page = currentPage * 10 >= monsters.length ? 1 : currentPage + 1;
    showMonsters(page);
}

function prevMonsters() {
    const page =
        currentPage == 1 ? Math.ceil(monsters.length / 10) : currentPage - 1;
    showMonsters(page);
}

function parseMonsters(data) {
    data.pop();

    for(let item of data) {
        const monster = new Monster(item);
        monsters.push(monster);
    }
    // monsters = data;

    showMonsters();
}

function showMonsters(page = 1, count = 10) {
    const firstIndex = (page - 1) * count;
    const lastIndex = firstIndex + count;
    const container = document.getElementById("monsters");
    currentPage = page;

    container.innerHTML = "";

    for (let index = firstIndex; index < lastIndex; index++) {
        if (monsters[index]) {
            addMonster(monsters[index]);
        }
    }
}

function addMonster(monster) {
    const container = document.getElementById("monsters");
    const monsterArticle = monster.html();

    container.appendChild(monsterArticle);
}

window.addEventListener("load", setup);
