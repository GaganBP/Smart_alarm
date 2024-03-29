// for display time...

var currTime = document.getElementById("current-time");

function currentTime(){
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss ;

    currTime.innerText = time;
    let t = setTimeout(function(){
        currentTime()
        if(alarm_List.includes(time)){
            ringing(time);
        }
    }, 1000);
}
currentTime();

// Put '0' before singal digit of hours, min or sec ...

function formatTime(time){
    if(time < 10 && time.length != 2){
        return "0" + time;
    }
    return time;
}
const myList = document.querySelector(".set-alarms-list");

// Adding alarm input form users
let alarm_List = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", function(e){
    e.preventDefault();
    const hour = userInput.hour.value;
    const min = userInput.min.value;
    const sec = userInput.sec.value;
    let new_h = formatTime(hour);
    if(new_h === "0"){
        new_h = "00";
    }
    let new_m = formatTime(min);
    if(new_m === "0"){
        new_m = "00";
    }
    let new_s = formatTime(sec);
    if(new_s === "0"){
        new_s = "00";
    }

    const new_Alarm = `${new_h}:${new_m}:${new_s}`;
    if(isNaN(new_Alarm)){
        if(!alarm_List.includes(new_Alarm)){
            alarm_List.push(new_Alarm);
            shownew_Alarm(new_Alarm);
            addAlarm.reset();
        }
        else{
            alert(`Alarm for ${new_Alarm} already set.`);
        }
    }
    else{
        alert("Invalid Time Entered");
    }
});

// showing new Alarm function
// And new Alarm in new list with delete button

function shownew_Alarm(new_Alarm){
    const html = `
        <li class = "time-list">
            <span class = "time">${new_Alarm}</span>
            <button class = "deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${new_Alarm}>Delete</button>
        </li>
        <br>`;
    myList.innerHTML += html;    
}

//audio to ring alarm
const audio = new Audio("alarm.mp3");

//Adding loop to continue alarm
audio.loop = true;

// Ring the audio at the perfect time
function ringing(time){
    audio.play();
    showPopup()
    alert(`Alarm Triggered, it is ${time}`);
}

// Function for stop the alarm
const clearAlarm = () => {
    audio.pause();
    clearTimeout(alarmTimeout);
    alert("Alarm cleared");
};

//Function for stop the alarm
const mylist = document.getElementsByClassName("set-alarms-list");
myList.addEventListener("click", (e) => {
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }
});

// Remove alarm from arryList when "Delete Alarm" button is clicked
const remove = (value) => {
    let newList = alarm_List.filter((time) => time != value);
    alarm_List.length = 0;
    alarm_List.push.apply(alarm_List, newList);
};

let difficulty;

function showPopup() {
  generateQuestions(difficulty);

  // display the popup
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function checkAnswers() {
  // get the user's answers
  const answer1 = parseInt(document.getElementById('answer1').value);
  const answer2 = parseInt(document.getElementById('answer2').value);
  const answer3 = parseInt(document.getElementById('answer3').value);

  // check the answers
  if (answer1 === num1 + num2 && answer2 === num2 - num3 && answer3 === num3 * num1) {
    // stop the alarm
    alert('Alarm stopped.');
    closePopup()
  } else {
    // show error message
    alert('Incorrect answers. Please try again.');
  }
}

function generateQuestions(difficulty) {
  let num1, num2, num3;

  if (difficulty === 'easy') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    num3 = Math.floor(Math.random() * 10) + 1;
  } else if (difficulty === 'medium') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    num3 = Math.floor(Math.random() * 10) + 1;
  } else if (difficulty === 'hard') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    num3 = Math.floor(Math.random() * 10) + 1;
  }

  // set the math questions
  document.getElementById('question1').innerHTML = num1 + " + " + num2 + " = ";
  document.getElementById('question2').innerHTML = num2 + " - " + num3 + " = ";
  document.getElementById('question3').innerHTML = num3 + " x " + num1 + " = ";
  return { num1, num2, num3 };
}

const easyBtn = document.getElementById('easy-btn');
easyBtn.addEventListener('click', function() {
  difficulty = 'easy';
  easyBtn.classList.add('active');
  mediumBtn.classList.remove('active');
  hardBtn.classList.remove('active');
  ({ num1, num2, num3 } = generateQuestions(difficulty));
});

const mediumBtn = document.getElementById('medium-btn');
mediumBtn.addEventListener('click', function() {
  difficulty = 'medium';
  easyBtn.classList.remove('active');
  mediumBtn.classList.add('active');
  hardBtn.classList.remove('active');
  ({ num1, num2, num3 } = generateQuestions(difficulty));
});

const hardBtn = document.getElementById('hard-btn');
hardBtn.addEventListener('click', function() {
  difficulty = 'hard';
  easyBtn.classList.remove('active');
  mediumBtn.classList.remove('active');
  hardBtn.classList.add('active');
  ({ num1, num2, num3 } = generateQuestions(difficulty));
});

({ num1, num2, num3 } = generateQuestions(difficulty));
currentTime();
