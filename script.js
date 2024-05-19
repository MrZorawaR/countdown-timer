let timer;
let time = 0;
let isRunning = false;
let duration = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');
const fireworksContainer = document.getElementById('fireworks');

function startTimer() {
  if (!isRunning && duration > 0) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
    timeInput.value = ''; 
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  time = duration;
  updateTimer();
}

function updateTimer() {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (time <= 0) {
    clearInterval(timer);
    isRunning = false;
    showCompletionMessage();
    return;
  }
  time--;
}

function showCompletionMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = 'Time Up';
  document.querySelector('.card').appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 2000);

  for (let i = 0; i < 50; i++) {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');
    explosion.style.left = Math.random() * 100 + 'vw';
    explosion.style.top = Math.random() * 100 + 'vh';
    fireworksContainer.appendChild(explosion);
    setTimeout(() => {
      explosion.remove();
    }, 1000);
  }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
timeInput.addEventListener('change', function() {
  const parts = this.value.split(':');
  duration = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  time = duration;
  updateTimer();
});


