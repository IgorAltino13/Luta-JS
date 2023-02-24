let log = new Log(document.querySelector('.log'));

let person = new Knight('Igor');
let monster = new LittleMonster();


let el1 = document.querySelector('.person');
let el2 = document.querySelector('.monster');
const stage = new Stage(person,monster,el1,el2,log);
stage.start();