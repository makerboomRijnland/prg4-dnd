let monsters = [];

function setup() {
    fetch('https://dl.dropboxusercontent.com/s/iwz112i0bxp2n4a/5e-SRD-Monsters.json')
        .then((response) => response.json())
        .then(parseMonsters);

}

function parseMonsters(data) {
    monsters = data;

    showMonster(monsters[0]);
}

function showMonsters() {
    document.body.innerHTML = "";

    for(let monster of monsters) {
        showMonster(monster);
    }
}

function showMonster(monster) {
    const monsterTemplate = document.getElementById('monster-template');
    const monsterArticle = monsterTemplate.content.cloneNode(true);

    const monsterName = monsterArticle.querySelector('h2.name');
    monsterName.innerHTML = monster.name;

    const monsterDescription = monsterArticle.querySelector('p.description');
    monsterDescription.innerHTML = `${monster.size} ${monster.alignment} ${monster.type}`;

    document.body.appendChild(monsterArticle);
}

window.addEventListener('load', setup);