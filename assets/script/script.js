// Selecting all required elements
const selectBox = document.querySelector(".select_box"),
 selectXBtn = selectBox.querySelector(".playerX"),
 selectOBtn = selectBox.querySelector(".playerO"),
 playBoard = document.querySelector(".play_board"),
 allBox = document.querySelectorAll("section span"),
 players = document.querySelector(".players"),
 resultBox = document.querySelector(".result_box"),
 wonText = resultBox.querySelector(".won_text");
 replayBtn = resultBox.querySelector("button");
var voice = document.getElementById('audio');

//Once Window Loaded
window.onload = () =>{
    for (let i = 0; i < allBox.length; i++) { 
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
	selectOBtn.onclick = () =>{
        players.setAttribute("class","players  player"); 
    }
}

// light and dark
let state = true; 
function changeStyle(){
	var Box = document.getElementsByClassName('box');
	var chngBg = document.getElementsByClassName('chngBg');
	var stateIcon = document.getElementById('stateIcon');
	stateIcon.innerHTML=`<i class="fa-solid fa-moon"></i>`;

	if(state){	
		for (let index = 0; index < Box.length; index++) { 
			const element = Box[index];
			element.style.color = "#000";
		}
		for (let index = 0; index < chngBg.length; index++) {
			const element = chngBg[index];
			element.style.backgroundColor="#000";
			element.style.transition = "2s";
		}
		state = false;
	}else{
		stateIcon.innerHTML=`<i class="fa-solid fa-sun"></i>`;

		for (let index = 0; index < Box.length; index++) { 
			const element = Box[index];
			element.style.color = "#8b008b";
		}
		for (let index = 0; index < chngBg.length; index++) { 
			const element = chngBg[index];
			element.style.backgroundColor="#8b008b";
			element.style.transition = "2s";
		}
		state = true;
	}
}

// audio
function playpause() {
	if (voice.paused) {
	  voice.play(); 
	  document.getElementById('audio-icon').innerHTML=`<i class="fa-solid fa-volume-high"></i>`;
	}
	else {
	  voice.pause();
	  document.getElementById('audio-icon').innerHTML=`<i class="fa-solid fa-volume-xmark"></i>`;
	}
}

//Game Section
let playerXIcon = "X" ; 
let playerOIcon = "O" ; 
let playerSign ="X"; //Suppose player will be X
let runBot = true;

// USER Clicked Function
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<b>${playerOIcon}</b>`; 
		players.innerHTML=`<b>${playerSign}'s Turn</b>`;
    	playerSign ="O"; 
		element.setAttribute("id" , playerSign);    	
    }else{
        element.innerHTML = `<b>${playerXIcon}</b>`; 
		players.innerHTML=`<b>${playerSign}'s Turn</b>`;   
		element.setAttribute("id" , playerSign);
    }
	// Calling the winner
    selectWinner(); 
    playBoard.style.pointerEvents ="none";
    element.style.pointerEvents ="none";  
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); 
    setTimeout(()=>{
    	bot(runBot); 
    }, randomDelayTime);
}

// BOT Clicked Function
function bot(runBot){
	if (runBot){ 
	playerSign="O";
	let array = [];
	for (let i = 0; i < allBox.length; i++) {
		if (allBox[i].childElementCount ==0) {
			array.push(i);
		}
	}
	let randomBox = array[Math.floor(Math.random()*array.length)]; 
	if (array.length > 0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<b>${playerXIcon}</b>`; 
	    	players.innerHTML=`<b>${playerSign}'s Turn</b>`;  
	    	playerSign = "X";
			allBox[randomBox].setAttribute("id",playerSign);
        }else{
            allBox[randomBox].innerHTML = `<b> ${playerOIcon}</b>`;
		    players.innerHTML=`<b>${playerSign}'s Turn</b>`;      
	    	allBox[randomBox].setAttribute("id",playerSign);
        }
        selectWinner();
	}
	allBox[randomBox].style.pointerEvents="none"; 
	playBoard.style.pointerEvents ="auto";
   	playerSign = "X"; 
	}
}

//Choosing the Winner
function getclass(idName){
	return document.querySelector(".box" + idName).id; 
}

function checkClass(val1 , val2, val3 , sign){
	if (getclass(val1) == sign && getclass(val2) == sign && getclass(val3) == sign) {
		return true;
	}
}
function selectWinner(){  
	if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
		console.log(playerSign + " " + "is the Winner!")
		runBot = false;
		bot(runBot);
		setTimeout(() =>{ 
			resultBox.classList.add("show");
		}, 700); 

		wonText.innerHTML = `Player <p> ${playerSign} </p> Won`;
	
	}else{
		if(getclass(1) != ""&& getclass(2) != ""&& getclass(3) != ""&& getclass(4) != ""&& getclass(5) != ""&& getclass(6) != ""&& getclass(7) != ""&& getclass(8) != ""&& getclass(9) != ""){
			runBot = false;
     		bot(runBot);
	    	setTimeout(() =>{ 
				resultBox.classList.add("show");
			}, 700);
	  		wonText.textContent = `Match has been Drawn!`;

		}
	}
}

replayBtn.onclick = ()=>{
	window.location.reload(); 
};