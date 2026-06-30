let isRunnning = false;

self.onmessage = function (event) {
  if (isRunnning) return;
  isRunnning = true;
  const state = event.data;
  const { activeTask, secondsRemaining } = state;
  const endDate = activeTask.startDate + secondsRemaining * 1000;
  let countDownSeconds = Math.ceil((endDate - Date.now()) / 1000);

  function tick() {
    self.postMessage(countDownSeconds);
    countDownSeconds = Math.floor((endDate - Date.now()) / 1000);
    setTimeout(tick, 1000);
  }

  tick();
};
