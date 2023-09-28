let timeInSecond = 1500;
let donePomodoro = parseInt(localStorage.getItem("donePomodoro")) || 0;
let countDownInterval;
const timer = document.querySelector(".timer");
const title = document.title;
const selectTrackerType = document.querySelector(".select-tracker-type");
let trackerTypeValue;

function getTrackerTypeValue() {
  trackerTypeValue = selectTrackerType.value;
  if (trackerTypeValue === `25min Focus`) {
    timer.innerHTML = `<h1>25:00</h1>`;
    timeInSecond = 1500;
  } else if (trackerTypeValue === `5min Short Break`) {
    timer.innerHTML = `<h1>05:00</h1>`;
    timeInSecond = 300;
  } else if (trackerTypeValue === `15min Long Break`) {
    timer.innerHTML = `<h1>15:00</h1>`;
    timeInSecond = 900;
  }
  updateCountDown();
}
getTrackerTypeValue();
selectTrackerType.addEventListener("change", getTrackerTypeValue);

function updateCountDown() {
  const minutes = Math.floor(timeInSecond / 60);
  const seconds = timeInSecond % 60;

  timer.innerHTML = `<h1>${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}</h1>`;
  document.title = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timeInSecond--;

  if (timeInSecond < 0) {
    clearInterval(countDownInterval);
    document.title = `Pomowork`;
    if (trackerTypeValue === "25min Focus") {
      donePomodoro++;
      localStorage.setItem("donePomodoro", donePomodoro);
      timeInSecond = 300;
      timer.innerHTML = `<h1>05:00</h1>`;
      alert(`${trackerTypeValue} finished`);
      trackerTypeValue = `5min Short Break`;
    } else if (trackerTypeValue === `15min Long Break` || `5min Short Break`) {
      timeInSecond = 1500;
      timer.innerHTML = `<h1>25:00</h1>`;
      alert(`${trackerTypeValue} finished`);
      trackerTypeValue = `25min Focus`;
    }

    timerIsRunning = false;
  }
  const status = document.querySelector(".status");
  status.innerHTML = `<p>Todays Total Pomodoro : ${donePomodoro}</p>`;
}

const startBtn = document.querySelector(".startBtn");

let timerIsRunning = false;

startBtn.addEventListener("click", () => {
  if (!timerIsRunning) {
    updateCountDown();
    countDownInterval = setInterval(updateCountDown, 1000);
    timerIsRunning = true;
  }
});

const pauseBtn = document.querySelector(".pauseBtn");
pauseBtn.addEventListener("click", () => {
  clearInterval(countDownInterval);
  timerIsRunning = false;
});

const resetBtn = document.querySelector(".resetBtn");
resetBtn.addEventListener("click", function resetTimer() {
  timer.innerHTML = `<h1>25:00</h1>`;
  clearInterval(countDownInterval);
  timerIsRunning = false;
  timeInSecond = 1500;
  document.title = `Pomowork`;
});

function newDay() {
  let now = new Date ();
  console.log(now);
  console.log(now.getDate());
  let night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,0,0
  );
  console.log(night);
  let msToMidnight = night.getTime() - now.getTime();
  console.log(msToMidnight);
    setTimeout(function() {
      localStorage.removeItem("donePomodoro")
    }, msToMidnight)
}
newDay()