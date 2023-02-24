class Personagem {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;
  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Personagem {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Personagem {
  constructor(name) {
    super(name);
    this.life = 80;
    this.maxLife = this.life;
    this.attack = 15;
    this.defense = 3;
  }
}

class LittleMonster extends Personagem {
  constructor() {
    super("Little Monster");
    this.attack = 4;
    this.defense = 4;
    this.life = 40;
    this.maxLife = this.life;
  }
}

class BigMonster extends Personagem {
  constructor() {
    super("Big Monster");
    this.attack = 16;
    this.defense = 6;
    this.life = 120;
    this.maxLife = this.life;
  }
}

const container = document.querySelector('.image');
const img = document.querySelector('img');
console.log(container.clientWidth);
let posX = 200;
let direction = 1;

class Stage {
  constructor(fighter1, fighter2, fighter1El, fighter2El, log) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = log;
  }

  start() {
    this.update();
    this.fighter1El.querySelector(".attack").addEventListener("click", () => {
      this.action(this.fighter1, this.fighter2, this.log);
      let teste = setInterval(() => {
        posX += 10 * direction;
        img.style.left = posX + 'px';
      
        if (posX >= container.clientWidth - img.width || posX <= 200) {
          direction *= -1;
        }
        if(posX === 200){
          clearInterval(teste);
        }
      }, 50);
    });
    this.fighter2El.querySelector(".attack").addEventListener("click", () => {
      this.action(this.fighter2, this.fighter1, this.log);
    });
  }

  update() {
    //fighter1
    this.fighter1El.querySelector(
      "#name"
    ).innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP`;
    let perc1 = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector(".bar").style.width = `${perc1}%`;
    //fighter2

    this.fighter2El.querySelector(
      "#name"
    ).innerText = `${this.fighter2.name} - ${this.fighter2.life} HP`;
    let perc2 = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector(".bar").style.width = `${perc2}%`;
  }

  action(attacker, defender, log) {
    if (attacker.life < 0 || defender.life < 0) {
      return;
    }
    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() * 2).toFixed(2);

    let actualAttack = attacker.attack * attackFactor;
    let actualDefense = defender.defense * defenseFactor;
    log.addMessage(this.fighter1.maxLife);
    if (actualAttack > actualDefense && defender.life > 0) {
      defender.life -= actualAttack;
      defender.life = defender.life.toFixed(2);
      log.addMessage(
        `${attacker.name} causou ${actualAttack.toFixed(2)} de dano em ${
          defender.name
        }`
      );
    } else {
      if (defender.life > 0) {
        log.addMessage(`${defender.name} defendeu`);
        return;
      } else {
        log.addMessage(`${defender.name} está morto`);
        return;
      }
    }

    this.update();
  }
}

class Log {
  lista = [];
  constructor(el) {
    this.el = el;
  }

  addMessage(msg) {
    this.lista.push(msg);
    this.render();
  }

  render() {
    this.el.innerHTML = "";
    for (let i in this.lista) {
      this.el.innerHTML += `<li>${this.lista[i]}</li>`;
    }
  }
}
