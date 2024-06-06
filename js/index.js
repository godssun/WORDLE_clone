const correctAnswer = "APPLE";
let startTime;
let attempts = 0;
let index = 0;
let timer;
let timeStarted = false;

function appStart() {
  // 타이머 시작 함수
  function startTimer() {
    function setTime() {
      const currentTime = new Date();
      const intervalTime = new Date(currentTime - startTime);
      const min = intervalTime.getMinutes().toString().padStart(2, "0");
      const sec = intervalTime.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".timer");
      timeH1.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  }

  // 키다운 이벤트 처리 함수
  function handleKeydown(event) {
    if (!timeStarted) {
      startTime = new Date();
      startTimer();
      timeStarted = true;
    }
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90 && /^[A-Za-z]$/.test(key)) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  }

  // 클릭 이벤트 처리 함수
  function handleKeyClick(event) {
    if (!timeStarted) {
      startTime = new Date();
      startTimer();
      timeStarted = true;
    }
    const key = event.target.getAttribute("data-key");
    const keyCode = key.charCodeAt(0);
    const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`); // 현재 블록

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90 && /^[A-Za-z]$/.test(key)) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  }

  // 백스페이스 키 처리 함수
  function handleBackspace() {
    if (index > 0) {
      const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  }

  // 엔터 키 처리 함수
  function handleEnterKey() {
    let numberOfCorrectAnswer = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
      const enterLetter = block.innerText;
      const correctLetter = correctAnswer[i];
      const keyBlock = document.querySelector(`.keyboard-block[data-key='${enterLetter.toUpperCase()}']`);

      // 글자 비교 후 색상 변경
      if (enterLetter === correctLetter) {
        numberOfCorrectAnswer++;
        block.style.background = "#6AAA64";
        if (keyBlock) keyBlock.style.background = "#6AAA64"; // 키보드 키 색상 변경
      } else if (correctAnswer.includes(enterLetter)) {
        block.style.background = "#C9B458";
        if (keyBlock) keyBlock.style.background = "#C9B458"; // 키보드 키 색상 변경
      } else {
        block.style.background = "#3A3A3B";
        if (keyBlock) keyBlock.style.background = "#3A3A3B"; // 키보드 키 색상 변경
      }
      block.style.color = "white";
    }

    if (numberOfCorrectAnswer === 5) {
      showCorrectMessage();
      gameOver();
    } else nextLine();
  }

  // 다음 줄로 이동하는 함수
  function nextLine() {
    attempts++;
    if (attempts >= 6) gameOver();
    else index = 0;
  }

  // 게임 종료 함수
  function gameOver() {
    window.removeEventListener("keydown", handleKeydown);
    document.querySelectorAll(".keyboard-block").forEach((key) => {
      key.removeEventListener("click", handleKeyClick);
    });
    clearInterval(timer);
  }

  // 정답 메세지 표시 함수
  function showCorrectMessage() {
    const message = document.querySelector(".correctMessage");
    message.classList.add("show");
  }

  document.querySelectorAll(".keyboard-block").forEach((key) => {
    key.addEventListener("click", handleKeyClick);
  }); // 키 클릭 이벤트 리스너

  window.addEventListener("keydown", handleKeydown); //키다운 이벤트 리스너
}

appStart();
