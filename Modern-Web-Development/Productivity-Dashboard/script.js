function openFeature() {
  let allElem = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let allFullElemBackbtn = document.querySelectorAll(".fullElem .back");

  allElem.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  allFullElemBackbtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemPage[back.id].style.display = "none";
    });
  });
}

openFeature();

function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTasks() {
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark As Completed</button>
            </div>`;
    });
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    allTask.innerHTML = sum;
    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTasks();
      });
    });
  }

  renderTasks();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTasks();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });

  let markCompletedBtn = document.querySelectorAll(".task button");
  markCompletedBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTask.splice(btn.id, 1);
      renderTasks();
    });
  });
}

todoList();

function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 -${7 + idx}:00`
  );

  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    let savedData = dayPlanData[idx] || "";
    wholeDaySum += `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value="${savedData}">
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
      console.log(dayPlanData);
    });
  });
}

dailyPlanner();

function motivationalQoute() {
  let motivationQouteContent = document.querySelector(".motivation-2 p");
  let motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://quotes-api-self.vercel.app/quote");
    let data = await response.json();

    motivationQouteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationalQoute();

function pomodoro() {
  let timeInterval = null;
  let totalSeconds = 25 * 60;
  let isWorkingSession = true;

  let timer = document.querySelector(".pomo-timer h2");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-timer-full-page .session");

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  startBtn.addEventListener("click", function startTimer() {
    clearInterval(timeInterval);
    if (isWorkingSession) {
      timeInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkingSession = false;
          clearInterval(timeInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timeInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkingSession = true;
          clearInterval(timeInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Working Session";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  });

  pauseBtn.addEventListener("click", function pauseTimer() {
    clearInterval(timeInterval);
  });

  resetBtn.addEventListener("click", function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timeInterval);
    updateTimer();
  });
}

pomodoro();