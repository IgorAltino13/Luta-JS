

class Person{
    attack = 0;
    _life = 1;
    maxLife = 1;
    defense = 0;
    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life; 
    }

    set life(newLife){
        this._life = newLife < 0 ? 0: newLife;
    }
}


class Hero extends Person{
    constructor(name){
        super(name);
        this.attack = 10;
        this.defense = 8;
        this.life = 100;
        this.maxLife  = this.life;
    }
}

class Wizard extends Person{
    constructor(name){
        super(name);
        this.attack = 14;
        this.defense = 6;
        this.life = 80;
    }
}

class LittleMonster extends Person{
    constructor(){
        super('Little Monster');
        this.attack = 4;
        this.defense = 4;
        this.life = 60;
        this.maxLife = this.life;
    }
}

class BigMonster extends Person{
    constructor(){
        super('Big Monster');
        this.attack = 11;
        this.defense = 8;
        this.life = 95;
        this.maxLife = this.life;
    }
}

let img = document.querySelector('.hero .image img');
let area_img = document.querySelector('.hero .image');
let posX = 230;
let direction = 1;




const img2 = document.querySelector('.monster .image_2 img');
const area_img2 = document.querySelector('.monster .image_2');

let posX2 = img2.offsetLeft;
let direction2 = 1;


class Scene{
   
    constructor(player1,player2,player1El,player2El,log,logArea,fightArea,endGame){
        this.player1 = player1;
        this.player2 = player2;
        this.player1El = player1El;
        this.player2El = player2El;
        this.log = log;
        this.logArea = logArea;
        this.fightArea = fightArea;
        this.endGame = endGame;

    }

    start(){
        this.update();
        this.player1El.querySelector('.button button').addEventListener('click',()=>{
            this.action(this.player1,this.player2,this.log,this.logArea,this.fightArea,this.endGame);
            let timer = setInterval(()=>{
            posX += 10 * direction;
            img.style.left = `${posX}px`;
            if(posX >= area_img.clientWidth - img.width  || posX <= 230){
                direction *= -1;
            }
            if(posX <= 230){
                clearInterval(timer);
            }
                

            },50);
        });
        this.player2El.querySelector('.button button').addEventListener('click',()=>{
            this.action(this.player2,this.player1,this.log,this.logArea,this.fightArea,this.endGame);
            let timer2 = setInterval(() => {
                posX2 -= 10 * direction2;
                img2.style.left = `${posX2}px`;
                console.log(posX2);
                if(posX2 <= 0 || posX2 >= 130){
                    direction2 *= -1;
                }
                if(posX2 === 130){
                    clearInterval(timer2);
                }
            }, 50);

        });
        this.log.el.addEventListener('click',() => {
            this.log.clear();
        })
       
    }

    update(){
        this.player1El.querySelector('.name strong').innerText = `${this.player1.name} - ${this.player1.life.toFixed(2)}HP`;
        this.player2El.querySelector('.name strong').innerText = `${this.player2.name} - ${this.player2.life.toFixed(2)}HP`;
        let perc = (this.player1.life / this.player1.maxLife)*100;
        let perc2 = (this.player2.life/ this.player2.maxLife)*100;
        let bar = this.player1.maxLife;
        let bar2 = this.player2.maxLife;
        this.player1El.querySelector('.bar .life').style.width = `${perc}%`;
        this.player1El.querySelector('.bar').style.width = `${bar}%`;
        this.player2El.querySelector('.bar').style.width = `${bar2}%`;
        this.player2El.querySelector('.bar .life').style.width = `${perc2}%`;
        
    }

    action(attacker,defender,log,logArea,fightArea,endGame){
       
        if(defender.life <= 0){
            log.armazena(`${defender.name} esta morto`)
            logArea.style.display = 'none';
            fightArea.style.display = 'none'
            endGame.style.display = 'flex';
            endGame.querySelector('.end_game_text .f2 span').textContent = `${attacker.name} venceu o jogo`;
            return;
            
        }

        if(attacker.life <= 0){
            log.armazena(`${attacker.name} está morto, portanto não pode atacar`);
            return
        }
        let attackFactor = (Math.random()*2).toFixed(2);
        let newAttack = (attacker.attack * attackFactor).toFixed(2);

        let defenderFactor = (Math.random()*2).toFixed(2);
        let newDefender = (defender.defense * defenderFactor).toFixed(2);

        if(newAttack > newDefender){
            defender.life -= newAttack;
            defender.life.toFixed(2);
            log.armazena(`${attacker.name} tirou ${newAttack} de dano em ${defender.name}`)
        }
        else{
            log.armazena(`${defender.name} defendeu`);
            return;
        }
        this.update();
    }
}
class Log{

    constructor(el){
        this.el = el;
    }

    armazena(msg){
        let li = document.createElement('li');
        li.innerText = msg;
        this.el.querySelector('.log ul').append(li);
    }

    clear(){
        this.el.querySelectorAll('li').forEach(element => {
            element.innerText = '';
            element.style.listStyle = 'none';
        });
    }
   
    
}