let coins = parseInt(localStorage.getItem('coins')) || 0;
let clickRate = parseInt(localStorage.getItem('clickRate')) || 1;
let clickLimit = parseInt(localStorage.getItem('clickLimit')) || 5;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 100;
let upgradeValueCost = parseInt(localStorage.getItem('upgradeValueCost')) || 100;
let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let lastClickTime = Date.now();
let upgradeClickLevel = parseInt(localStorage.getItem('upgradeClickLevel')) || 1;
let upgradeValueLevel = parseInt(localStorage.getItem('upgradeValueLevel')) || 1;
const maxUpgradeLevel = 50;

document.getElementById('coins').innerText = coins;
document.getElementById('clickRate').innerText = clickRate;
document.getElementById('clickValue').innerText = clickValue;
document.getElementById('upgradeCost').innerText = upgradeCost;
document.getElementById('upgradeValueCost').innerText = upgradeValueCost;
document.getElementById('clicks').innerText = clicks;
document.getElementById('upgradeClickLevel').innerText = upgradeClickLevel;
document.getElementById('upgradeValueLevel').innerText = upgradeValueLevel;

function saveState() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('clickRate', clickRate);
    localStorage.setItem('clickLimit', clickLimit);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('upgradeValueCost', upgradeValueCost);
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('upgradeClickLevel', upgradeClickLevel);
    localStorage.setItem('upgradeValueLevel', upgradeValueLevel);
}

function upgradeClick() {
    if (upgradeClickLevel >= maxUpgradeLevel) {
        alert("شما به حداکثر سطح ارتقا رسیده‌اید.");
        return;
    }
    
    if (coins >= upgradeCost) {
        coins -= upgradeCost;
        clickRate++;
        clickLimit++;
        upgradeCost *= 2;
        upgradeClickLevel++;
        document.getElementById("coins").innerText = coins;
        document.getElementById("clickRate").innerText = clickRate;
        document.getElementById("upgradeCost").innerText = upgradeCost;
        document.getElementById("upgradeClickLevel").innerText = upgradeClickLevel;
        saveState();
    } else {
        alert("شما به اندازه کافی سکه برای ارتقا ندارید.");
    }
}

function upgradeClickValue() {
    if (upgradeValueLevel >= maxUpgradeLevel) {
        alert("شما به حداکثر سطح ارتقا رسیده‌اید.");
        return;
    }
    
    if (coins >= upgradeValueCost) {
        coins -= upgradeValueCost;
        clickValue++;
        upgradeValueCost *= 2;
        upgradeValueLevel++;
        document.getElementById("coins").innerText = coins;
        document.getElementById("clickValue").innerText = clickValue;
        document.getElementById("upgradeValueCost").innerText = upgradeValueCost;
        document.getElementById("upgradeValueLevel").innerText = upgradeValueLevel;
        saveState();
    } else {
        alert("شما به اندازه کافی سکه برای ارتقا ندارید.");
    }
}

function handleClick() {
    let now = Date.now();
    let elapsedTime = now - lastClickTime;
    if (elapsedTime < 1000 / clickLimit) {
        alert("شما به حداکثر تعداد کلیک در ثانیه رسیده‌اید.");
        return;
    }
    clicks++;
    coins += clickValue;
    lastClickTime = now;
    document.getElementById("clicks").innerText = clicks;
    document.getElementById("coins").innerText = coins;

    const button = document.getElementById("coinButton");
    button.classList.add("button-clicked");

    button.addEventListener("animationend", () => {
        button.classList.remove("button-clicked");
    }, { once: true });

    saveState();
}