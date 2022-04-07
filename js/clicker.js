/* Med document.queryselector(selector) kan vi hämta
 * de element som vi behöver från html dokumentet.
 * Vi spearar elementen i const variabler då vi inte kommer att
 * ändra dess värden.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * Viktigt: queryselector ger oss ett html element eller flera om det finns.
 */
const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps'); // money per second
const mpcTracker = document.querySelector('#mpc'); // money per click
const upgradesTracker = document.querySelector('#upgrades');
const upgradeList = document.querySelector('#upgradelist');
const msgbox = document.querySelector('#msgbox');
const sound = document.querySelector('#sound');
const eating = document.querySelector('#eating');

/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let acquiredUpgrades = 0;
let last = 0;


let achievementTest = false;
let achievementTes = false;
let achievementTe = false;
let achievementT = false;
let achievement = false;
let achievemen = false;


/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener(
    'click',
    () => {
        sound.play()
        // vid click öka score med 1
        money += moneyPerClick;
        // console.log(clicker.score);
    },
    false
);

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = moneyPerSecond;
    mpcTracker.textContent = moneyPerClick;
    upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    // exempel på hur vi kan använda värden för att skapa tex 
    // achievements. Titta dock på upgrades arrayen och gör något rimligare om du
    // vill ha achievements.
    // på samma sätt kan du även dölja uppgraderingar som inte kan köpas
    if (acquiredUpgrades == 40 && !achievementTest) {
        achievementTest = true;
        message('You found a GOD apple!', 'achievement');
    }
    if (acquiredUpgrades == 250 && !achievementTes) {
        achievementTes = true;
        message('You are the pickaxe god!', 'achievement');
    }
    if (money > 64000 && !achievementTe){
        achievementTe = true;
        message('You are 90% away from buying notch the god!', 'achievement');
    }
    if (money > 640000 && !achievementT){
        achievementT = true;
        message('You can now buy notch!', 'achievement');
    }
    if (money > 64000000 && !achievement){
        achievement = true;
        message('You Are Minecraft!', 'achievement');
    }
   /* if (last > 3600000 && !achievemen){
        achievemen = true;
        message('Time god!', 'achievement');
    }
*/
    window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    upgrades.forEach((upgrade) => { 
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});

/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */
upgrades = [
    {
        name: 'Coal',
        cost: 16,
        amount: 1,
    },
    {
        name: 'Player',
        cost: 64,
        clicks: 2
    },
    {
        name: 'Lapiz',
        cost: 128,
        amount: 10,
    },
    {
        name: 'Emeralds',
        cost:  1024,
        amount: 100,
    },
    {
        name: 'Netherite',
        cost:  8192,
        amount: 1000,
    },
    {
        name: 'Notch',
        cost:  640000,
        amount: 64000000,
},
];

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */
function createCard(upgrade) {
    const card = document.createElement('div');
    card.classList.add('card');
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');

    if (upgrade.amount) {
        header.textContent = `${upgrade.name}, +${upgrade.amount} per second.`;
    } else {
        header.textContent = `${upgrade.name}, +${upgrade.clicks} per click.`;
    }
    cost.textContent = `Buy for ${upgrade.cost} Diamonds.`;

    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            eating.play()
            acquiredUpgrades++;
            money -= upgrade.cost ;
            upgrade.cost *= 1.5;
            cost.textContent = 'Buy for ' + Math.round(upgrade.cost) + ' Diamonds';
            moneyPerSecond += upgrade.amount ? upgrade.amount : 0;
            moneyPerClick += upgrade.clicks ? upgrade.clicks : 0;
            message('Success! You got more pickaxes!', 'success');
        } else {
            message(`You don't have enough diamonds.`, 'warning');
        }
    });

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}

