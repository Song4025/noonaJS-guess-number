// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력 그리고 go버튼 클릭
// 3. 유저가 랜덤번호를 맞추면 메세지
// 4. 랜덤번호가 유저번호보다 아래면? down
// 5. 랜덤번호가 유저번호보다 위면? up
// 6. 버튼을 누르면 게임이 reset
// 7. 5번의 기회를 다쓰면 게임이 끝 (더이상 go버튼을 누를 수 없음)
// 8. 유저가 같은숫자를 입력하면? 메세지 (기회를 깎지않음)
// 9. 유저가 1~100 범위를 벗어난 숫자를 입력하면? 메세지 (기회를 깎지않음)
let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답: " + computerNum);
}

function reset() {
  // userinput창이 정리
  userInput.value = "";
  console.log(userInput.value);
  // 새로운 랜덤번호 생성
  pickRandomNum();
  resultArea.textContent = "결과값이 여기 나옴";
  history = [];
}

function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1~100 사이의 숫자만 입력할 수 있습니다.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력했던 숫자입니다. 다른숫자를 입력해주세요.";
    return;
  }
  chances--;
  chanceArea.textContent = `남은기회: ${chances}번`;
  if (userValue < computerNum) {
    resultArea.textContent = "UP";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN";
  } else if (userValue == computerNum) {
    resultArea.textContent = "맞췄습니다!!";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

pickRandomNum();
