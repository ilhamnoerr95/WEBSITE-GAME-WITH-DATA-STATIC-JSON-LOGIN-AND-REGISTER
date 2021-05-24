let user_score = 0;
let com_score = 0; 
let score_player = document.querySelector(".score_player");
let score_com = document.querySelector(".score_com");
let result = document.querySelector(".result")
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const result_div = document.querySelector(".versus");
let rock_com = document.getElementById("rock_c");
let paper_com = document.getElementById("paper_c");
let scissors_com = document.getElementById("scissors_c");


let getComputerChoice = ()=>{
    let choices = ["rock","paper","scissors"];
    let randomChoice = Math.floor(Math.random()*3);
    return choices[randomChoice]
}


const win = (user,comp)=> {
    user_score++;
    score_player.innerHTML = user_score; 
     result_div.innerHTML = "PLAYER 1 WIN";
     result_div.classList.add("winner-box");
     result_div.classList.remove("draw-box");
     const smallUserWord = "User".fontsize(3).sub();
     const smallComWord = "Comp".fontsize(3).sub();
     result.innerHTML = `${user}${smallUserWord} BEATS ${comp}${smallComWord}`;
   console.log(`${user}(user) Vs ${comp}(AI)`)
}
const lose = (user,comp)=> {
    com_score++;
    score_com.innerHTML = com_score;
    result_div.innerHTML = "COM WIN";
    result_div.classList.add("winner-box");
    result_div.classList.remove("draw-box");
    const smallUserWord = "User".fontsize(3).sub();
    const smallComWord = "Comp".fontsize(3).sub();
    result.innerHTML = `${comp}${smallComWord} BEATS ${user}${smallUserWord} `;
    console.log(`${user}(user) Vs ${comp}(AI)`)
}
const draw = (user,comp)=> {
    result_div.innerHTML = "DRAW";
    if(user === comp) {
        result_div.classList.add("draw-box");}
        result_div.classList.remove("winner-box")
    // result.innerHTML = `${comp}${smallComWord} Draw ${user}${smallUserWord} `;
    console.log(`${user}(user) Vs ${comp}(AI)`);
}



let mainGame = ()=>{
    rock_div.addEventListener('click', function(){
        game("rock");      
    })

    paper_div.addEventListener('click', function(){  
        game("paper")
   
    })

    scissors_div.addEventListener('click', function(){
        game("scissors")
     
    })
}




let game = (userChoice)=>{
    var computerChoice = getComputerChoice();

    rock_com.classList.remove("ai-choices");
    paper_com.classList.remove("ai-choices");
    scissors_com.classList.remove("ai-choices");

    if (computerChoice === "rock"){
        rock_com.classList.add("ai-choices");
    } else if (computerChoice === "paper") {
        paper_com.classList.add("ai-choices");
    } else if (computerChoice === "scissors") {
        scissors_com.classList.add("ai-choices");
    }
    // CARA IF ELSE
    // if (userChoice === compChoice){
    //     draw(userChoice,compChoice)
    //     ;
    // } else if (userChoice === "rock" && compChoice === "scissors"){
    //     win(userChoice,compChoice);
    // } else if (userChoice === "paper" && compChoice === "rock"){
    //     win(userChoice,compChoice);
    // } else if (userChoice === "scissors" && compChoice === "paper"){
    //     win(userChoice,compChoice);
    // } else {
    //     lose(userChoice,compChoice);
    // }


//Cara Switch Case    
switch(userChoice + computerChoice){
    case "rockscissors":
    case "scissorspaper":
    case "paperrock":
        win(userChoice, computerChoice);
        // document.getElementById("rock_c").classList.add("ai-choices");
        break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
        lose(userChoice, computerChoice);
        break;
    case "rockrock":
    case "scissorsscissors":
    case "paperpaper":
         draw(userChoice,computerChoice);
         break;
    
}  

}


mainGame();


