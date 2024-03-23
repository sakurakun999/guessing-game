let input_count = 0
let history = [];
let answer = generateNumber();

function generateNumber() {
    // input要素リセット
    var inputNumber = document.getElementById("inputNumber");
    inputNumber.value = ""; // Clear the input value
    // boxリセット
    document.getElementById("result").innerText = 'Fight!';
    // コール数リセット
    let input_count = 0
    document.getElementById("count").innerText = input_count + "コール";
    // コール履歴リセット
    let history = [];
    // 数値設定
    let num = "";
    while (num.length < 3) {
        let newNum = Math.floor(Math.random() * 10);
        if (!num.includes(newNum)) {
            num += newNum;
        }
    }
    return num;
}

function checkNumber() {
    let guess = document.getElementById("inputNumber").value;

    if (guess.length !== 3 || isNaN(guess)) {
        loadsee();
        document.getElementById("result").innerText = "3桁の数字を入力してください!";
        return;
    }

    if (hasDuplicate(guess)) {
        loadsee();
        document.getElementById("result").innerText = "数字が重複しています";
        return
    }

    let eats = 0;
    let bites = 0;

    for (let i = 0; i < 3; i++) {
        if (guess[i] === answer[i]) {
            eats++;
        } else if (answer.includes(guess[i])) {
            bites++;
        }
    }

    if (eats === 3) {
        loadsee();
        document.getElementById("result").innerText = "おめでとう！相手の数字を当てました！";
        document.body.classList.add("celebrate"); // bodyにcelebrateクラスを追加
    } else {
        input_count = input_count + 1;
        loadsee();
        document.getElementById("result").innerText = eats + "イート・" + bites + "バイト";
        history.push({ guess: guess, eats: eats, bites: bites }); // 現在の入力とイート・バイト数を履歴に追加
        displayHistory(); // 履歴を表示する
    }
}

function hasDuplicate(str) {
    return (/([0-9]).*?\1/).test(str);
}

function convertToHalfWidth(input) {
    input.value = input.value.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function loadsee() {
    const element = document.getElementById("result_box");
    const startColor = [215, 60, 90]; // HSL値 hsl(219, 70%, 96%)
    const endColor = [0, 0, 100]; // 白のHSL値

    const duration = 800; // 合計の変化時間（ミリ秒）
    const interval = 25; // 色の変化間隔（ミリ秒）

    let currentTime = 0;

    function updateBrightness() {
        const progress = currentTime / duration;
        const currentBrightness = startColor[2] + (endColor[2] - startColor[2]) * progress;

        const hslColor = `hsl(${startColor[0]}, ${startColor[1]}%, ${currentBrightness}%)`;
        element.style.backgroundColor = hslColor;

        if (currentTime < duration) {
            currentTime += interval;
            requestAnimationFrame(updateBrightness);
        }
    }
    // 関数を呼び出して色を更新
    updateBrightness();

    document.getElementById("count").innerText = input_count + "コール";

}

function displayHistory() {
    let table = document.getElementById("historyTable");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let latestGuess = history[history.length - 1];
    cell1.innerHTML = latestGuess.guess;
    cell2.innerHTML = latestGuess.eats;
    cell3.innerHTML = latestGuess.bites;
}