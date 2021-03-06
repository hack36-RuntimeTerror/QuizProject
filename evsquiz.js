
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0);
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue);
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine);
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");


    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1;
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 4){ 
        let scoreTag = '<span>and congrats! ????, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 2){ 
        let scoreTag = '<span>and nice ????, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry ????, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

let questions = [
//     What is the water vapor?
// Ans:It is the gaseous phase of water
// a.	It is a rain droplet
// b.	Water vapor is the cloud droplet
// c.	None of the above

    {
    numb: 1,
    question: "What is the water vapor?",
    answer: "It is the gaseous phase of water",
    options: [
      "It is a rain droplet",
      "It is the gaseous phase of water",
      "Water vapor is the cloud droplet",
      "None of the above"
    ]
  },
//   Which of the following gas is present in the air in maximum amount?
//   Ans:Nitrogen
//   a.	Oxygen
//   b.	Carbon dioxide
//   c.	Methane
  

    {
    numb: 2,
    question: "Which of the following gas is present in the air in maximum amount?",
    answer: "Nitrogen",
    options: [
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
      "Methane"
    ]
  },
//  Which of the following is a renewable source of energy?
// a.	Coal
// b.	Uranium
// Ans:Wind
// c.	Petroleum


    {
    numb: 3,
    question: "Which of the following is a renewable source of energy?",
    answer: "Wind",
    options: [
      "Coal",
      "Uranium",
      "Petroleum",
      "Wind"
    ]
  },
//   Which of the following is said to be a biodegradable waste?
//   a.	Plastics
//   b.	Glasses
//   Ans:Eggshell
//   c.	Polythene
  

    {
    numb: 4,
    question: "Which of the following is said to be a biodegradable waste?",
    answer: "Eggshell",
    options: [
      "Eggshell",
      "Plastics",
      "Glasses",
      "Polythene"
    ]
  },
//   The ozone layer is present in -
//   a.	Mesosphere
//   b.	Thermosphere
//   Ans: Stratosphere
//   c.	Troposphere
  

    {
    numb: 5,
    question: "The ozone layer is present in _____",
    answer: "Stratosphere",
    options: [
      "Mesosphere",
      "Troposphere",
      "Stratosphere",
      "Thermosphere"
    ]
  },
//   Which of the following are the negative health effects of noise pollution?
//   a.	Hypertension
//   b.	Hearing loss
//   c.	Stress and headache
//   Ans:All of the above
  


  {
    numb: 6,
    question: "Which of the following are the negative health effects of noise pollution?",
    answer: "All of the above",
    options: [
      "Hypertension",
      "Hearing loss",
      "Stress and headache",
      "All of the above"
    ]
  },
//   On which day the world environment day is celebrated?
//   a.	5th April
//   b.	15th May
//   Ans:5th June
//   c.	25th April
  

    {
    numb: 7,
    question: "On which day the world environment day is celebrated?",
    answer: "5th June",
    options: [
      "5th April",
      "25th April",
      "15th May",
      "5th June"
    ]
  },
//   CNG stands for -
//   a.	Common Natural gas
//   b.	Compressed National gas
//   Ans:Compressed Natural gas
//   c.	Certified National gas
  



  {
    numb: 8,
    question: "CNG stands for ____",
    answer: "Compressed Natural gas",
    options: [
      "Compressed Natural gas",
      "Common Natural gas",
      "Compressed National gas",
      "Certified National gas"
    ]
  },
];
