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
 audioIcon = document.getElementById('audio-icon');
 styleIcon = document.getElementById('style-icon');

 window.onload = () =>{//Once Window Loaded
    for (let i = 0; i < allBox.length; i++) {  //add on click attribute in all available section's span
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
	selectOBtn.onclick = () =>{
        players.setAttribute("class","players  player"); //adding three class name in player element
    }
}
{/* <i class="fa-solid fa-moon"></i> */}
// audio
function playpause() {
	if (voice.paused) {
	 voice.play();
	 audioIcon.innerHTML=` <i class="fa-solid fa-volume-high"></i>`;
	 
	}
	else {
	 voice.pause();
	 audioIcon.innerHTML=`<i class="fa-solid fa-volume-xmark"></i>`;

	}
  }


//   change dark and light model
function chngStyle(){
	var chngBgColor = document.getElementsByClassName('chngBg');

	if(styleIcon.innerHTML === <i class="fa-solid fa-sun"></i>){
		styleIcon.style.backgroundColor="red";
	// 	styleIcon.innerHTML=`<i class="fa-solid fa-moon"></i> `;
    //    for (let index = 0; index < chngBgColor.length; index++) {
	// 	const element = chngBgColor[index];
	// 	element.style.backgroundColor = "#111";
	//    }
	}
	else{
		styleIcon.style.backgroundColor="blue";
	// 	styleIcon.innerHTML=` <i class="fa-solid fa-sun"></i> `;
	// 	for (let index = 0; index < chngBgColor.length; index++) {
	// 		const element = chngBgColor[index];
	// 		element.style.backgroundColor = "#8b008b";
	//    }
    }
	
}
// Swaps the stylesheet to achieve dark mode.
// function changeTheme() {
// 	const theme = document.getElementById("theme");
// 	setTimeout(() => {
// 	  toast.innerHTML = "Calculator";
// 	}, 1500);
// 	if (theme.getAttribute("href") === lightTheme) {
// 	  theme.setAttribute("href", darkTheme);
// 	  themeIcon.setAttribute("src", sunIcon);
// 	  toast.innerHTML = "Dark Mode 🌙";
// 	} else {
// 	  theme.setAttribute("href", lightTheme);
// 	  themeIcon.setAttribute("src", moonIcon);
// 	  toast.innerHTML = "Light Mode ☀️";
// 	}
//   }

let playerXIcon = "X" ;  //X Sign
let playerOIcon = "O" ;  //O Sign
let playerSign ="X"; //Suppose player will be X
let runBot = true;


// USER Clicked Function
function clickedBox(element){
    // console.log(element);
    if(players.classList.contains("player")){
        element.innerHTML = `<b>${playerOIcon}</b>`; //adding circle sign when click
		players.innerHTML=`<b>${playerSign}'s Turn</b>`;
		//If player choose O then we will change the sign
        playerSign ="O"; 
    	
		element.setAttribute("id" , playerSign);    	
    }else{
        element.innerHTML = `<b>${playerXIcon}</b>`; //adding cross sign when click
		players.innerHTML=`<b>${playerSign}'s Turn</b>`;   
		element.setAttribute("id" , playerSign);
    }
    selectWinner(); // Calling the winner
    playBoard.style.pointerEvents ="none";
    element.style.pointerEvents ="none";  //once the user selected any box that box can't be selected any more
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();  //Generating Random Time Delay for bot
    // console.log(randomDelayTime);
    setTimeout(()=>{
    	bot(runBot); //calling bot function
    }, randomDelayTime); //passing random delay time 
}

// BOT Clicked Function
function bot(runBot){
	if (runBot){ //if runBot is true then run the following

	// first change the player sign... so if player use X value in id then bot will have the O Value
	playerSign="O";
	let array = [];
	for (let i = 0; i < allBox.length; i++) {
		if (allBox[i].childElementCount ==0) {
			array.push(i);
			// console.log(i + " " + "has no child");
		}
	}
	let randomBox = array[Math.floor(Math.random()*array.length)]; //Getting Random index from array so bot will select random no.
	if (array.length > 0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<b>${playerXIcon}</b>`; //adding circle sign when click
	    	players.innerHTML=`<b>${playerSign}'s Turn</b>`;  
	    	// if user is O then id will be X
	    	playerSign = "X";
			allBox[randomBox].setAttribute("id",playerSign);
        }else{
            allBox[randomBox].innerHTML = `<b> ${playerOIcon}</b>`; //adding cross sign when click
		    players.innerHTML=`<b>${playerSign}'s Turn</b>`;      
	    	allBox[randomBox].setAttribute("id",playerSign);
        }
        selectWinner();
	}
	allBox[randomBox].style.pointerEvents="none"; //Once bot select any box you can't select that again
	playBoard.style.pointerEvents ="auto";
   	playerSign = "X"; //passing the x value
	}
}

//Choosing the Winner
function getclass(idName){
	return document.querySelector(".box" + idName).id; //Returning the id name
}

function checkClass(val1 , val2, val3 , sign){
	if (getclass(val1) == sign && getclass(val2) == sign && getclass(val3) == sign) {
		return true;
	}
}
function selectWinner(){  //If One Combination Of Them IS Select Then choose the winner
	if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
		console.log(playerSign + " " + "is the Winner!")
		//once match won by someone then stop the bot
		runBot = false;
		bot(runBot);
		setTimeout(() =>{ //We'll delay the result box a little bit
			resultBox.classList.add("show");
		}, 700); //700ms delay

		wonText.innerHTML = `Player <p> ${playerSign} </p> Won`;
		//lets show the result box		
	}else{
		// if Match Draws
		// first we'll check all id... if all span has id and no one won the game then we will draw the game
		if(getclass(1) != ""&& getclass(2) != ""&& getclass(3) != ""&& getclass(4) != ""&& getclass(5) != ""&& getclass(6) != ""&& getclass(7) != ""&& getclass(8) != ""&& getclass(9) != ""){
			runBot = false;
     		bot(runBot);
	    	setTimeout(() =>{ //We'll delay the result box a little bit
				resultBox.classList.add("show");
			}, 700); //700ms delay
	  		wonText.textContent = `Match has been Drawn!`;

		}
	}
}

replayBtn.onclick = ()=>{
	window.location.reload(); //reload the page
};

