
let log = new Log(document.querySelector('.div_log'));


let dragon = new BigMonster();
let hero = new Hero('Igor');

let nameHero = document.querySelector('.hero');
let nameMonster = document.querySelector('.monster');
let fightArea = document.querySelector('.fightArea');
let logArea = document.querySelector('.div_log');
let endGame = document.querySelector('.end_game');
const scene = new Scene(hero,dragon,nameHero,nameMonster,log,logArea,fightArea,endGame);
scene.start();