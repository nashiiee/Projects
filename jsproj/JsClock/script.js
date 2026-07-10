const hourHand = document.querySelector('.hour-hand');
const minutesHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const hoursDegrees = ((hours / 12) * 360) + 90;
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  const secondsDegrees = ((seconds / 60) * 360) + 90;

  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
}

setInterval(setDate, 1000);