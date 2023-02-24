
let log = new Log(document.querySelector('.div_log'));


let dragon = new BigMonster();
let hero = new Hero('Igor');

let nameHero = document.querySelector('.hero');
let nameMonster = document.querySelector('.monster');
const scene = new Scene(hero,dragon,nameHero,nameMonster,log);
scene.start();