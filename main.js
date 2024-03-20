let answer = generateNumber();

function generateNumber() {
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
        document.getElementById("result").innerText = "3桁の数字を入力してください！";
        return;
    }

    let eats = 0;
    let bites = 0;

    for (let i = 0; i < 3; i++) {
        if (guess[i] === answer[i]) {
            eats++;
        }
        else if (answer.includes(guess[i])) {
            bites++;
        }
    }

    if (eats === 3) {
        document.getElementById("result").innerText = "おめでとう！相手の数字を当てました！";
        // ここに特別な演出を追加します。
        document.body.classList.add("celebrate"); // bodyにcelebrateクラスを追加
    }
    else {
        document.getElementById("result").innerText = eats + "イート・" + bites + "バイト";
    }
}
