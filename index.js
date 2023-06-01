class Monster {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
        this.size = data.size;
        this.alignment = data.alignment;
        this.actions = data.actions;
    }

    log() {
        console.log(`Monster! ${this.name}`);
    }

    html() {
        const monsterTemplate = document.getElementById("monster-template");
        const monsterArticle = monsterTemplate.content.cloneNode(true);

        const monsterName = monsterArticle.querySelector("h2.name");
        monsterName.innerHTML = this.name;

        const monsterDescription =
            monsterArticle.querySelector("p.description");
        monsterDescription.innerHTML = `${this.size} ${this.alignment} ${this.type}`;

        const actionList = monsterArticle.querySelector("ul.actions");
        for (let action of this.actions) {
            const actionItem = document.createElement("li");
            actionItem.innerHTML = action.name;
            actionList.appendChild(actionItem);
        }

        return monsterArticle;
    }
}

class MonsterLijst {
    constructor() {
        this.monsters = [];
        this.currentPage = 1;

        fetch("https://dl.dropboxusercontent.com/s/iwz112i0bxp2n4a/5e-SRD-Monsters.json")
            .then((response) => response.json())
            // .then(this.parse);
            .then((items) => this.parse(items));
    
        document.querySelector("#monster-nav .prev").addEventListener("click", () => this.prev());
        document.querySelector("#monster-nav .next").addEventListener("click", () => this.next());
    }

    next() {
        const page = this.currentPage * 10 >= this.monsters.length ? 1 : this.currentPage + 1;
        this.show(page);
    }

    prev() {
        const page = this.currentPage == 1 ? Math.ceil(this.monsters.length / 10) : this.currentPage - 1;
        this.show(page);
    }

    parse(items) {
        items.pop();

        for (let item of items) {
            const monster = new Monster(item);
            this.monsters.push(monster);
        }

        this.show();
    }

    show(page = 1, count = 10) {
        const container = document.getElementById("monsters");
        container.innerHTML = "";

        const firstIndex = (page - 1) * count;
        const lastIndex = firstIndex + count;
        this.currentPage = page;


        for (let index = firstIndex; index < lastIndex; index++) {
            const monster = this.monsters[index];
            
            if (monster) {
                container.appendChild(monster.html());
            }
        }
    }
}

new MonsterLijst();
