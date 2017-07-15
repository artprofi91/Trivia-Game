$(document).ready(function() {
	// open modal rules
	$('#rules').click(function() {

		$("#rulesModal").modal({
			backdrop: "static",
			keyboard: false});
	});
	// open modal cities
	$('#cities').click(function() {

	$("#citiesModal").modal({
			backdrop: "static",
			keyboard: false});
	});
	
	// click outside modal hide it
	$('#citiesModal').modal('hide');





	//Game object
var triviaGame = {

//Array holds quiz
	quiz:[{
		question: "Samara is the capital city of the region that makes which famous Russian vehicle?",
			ans1: "KAMAZ",
			ans2: "Lada",
			ans3: "Volga",
			ans4: "Pobeda",
			picture: "assets/images/Lada.png"},
	   {
	   	question: "The Urals city of Yekaterinburg holds the world’s record in per capita consumption of what?",
			ans1: "Ketchup",
			ans2: "Vodka",
			ans3: "Pelmeni",
			ans4: "Mayonnaise",
			picture: "assets/images/Mayo.png"},
		{
	   	question: "In Soviet times, the city of Nizhny Novgorod was named after which author?",
			ans1: "Anton Chekhov",
			ans2: "Vladimir Mayakovsky",
			ans3: "Maksim Gorky",
			ans4: "Lev Tolstoy",
			picture: "assets/images/Maks.jpg"},
	   {
	   	question: "Volgograd is home to the world’s biggest statue. What is it of?",
			ans1: "A statue of a woker",
			ans2: "A statue of Lenin",
			ans3: "A statue of Mother Russia",
			ans4: "A statue of Christ",
			picture: "assets/images/Mother.jpg"},
		{
		question: "Kazan is the capital of the Republic of Tatarstan. The symbol of the republic is:",
			ans1: "A snow leopard",
			ans2: "A black horse",
			ans3: "A brown bear",
			ans4: "A red fox",
			picture: "assets/images/Leopard.jpg"},
		{	
		question: "Rostov is the unofficial capital of southern Russia. Which great Russian novel is set there?",
			ans1: "A hero of our time",
			ans2: "Dead souls",
			ans3: "The GULAG archipelago",
			ans4: "And quiet flows the Don",
			picture: "assets/images/Don.jpeg"},
		{
		question: "St Petersburg has been entered in the Guinness Book of Records for having over 400 miles of:",
			ans1: "Rivers and canals",
			ans2: "Tram tracks",
			ans3: "Undeground tunnels",
			ans4: "Subway lines",
			picture: "assets/images/Tram.jpg"},
		{
		question: "Sochi is Russia’s warmest city. It may be hard to believe but the city grows:",
		    ans1: "Mango",
		    ans2: "Tea",
		    ans3: "Sugar cane",
		    ans4: "Cotton",
			picture: "assets/images/Tea.jpg"}],
	//array to hold correct answers
	correctAnswers: ['Lada', 'Mayonnaise', 'Maksim Gorky', 'A statue of Mother Russia', 'A snow leopard', 'And quiet flows the Don', 'Tram tracks', 'Tea'],
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 25,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,

	// begin game function

	beginGame: function(){	
		// if all question answered
		if(triviaGame.questionCount == triviaGame.quiz.length){
			// function game finish
			triviaGame.gameFinished();
			// timer to 25 sec
			triviaGame.timer = 25;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 25;
				$('#time').html(triviaGame.timer); 
			}
			// show question and answers button
			$('.questions').html(triviaGame.quiz[triviaGame.questionCount].question);
			$('.answer1').html(triviaGame.quiz[triviaGame.questionCount].ans1);
			$('.answer2').html(triviaGame.quiz[triviaGame.questionCount].ans2);
			$('.answer3').html(triviaGame.quiz[triviaGame.questionCount].ans3);
			$('.answer4').html(triviaGame.quiz[triviaGame.questionCount].ans4);
			// timer count 1 sec 
			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},
//Count down timer 
	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
			
			triviaGame.answersCorrect();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
		}

	},
//if gamer's answer is correct
	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}
		// change brand logo
		// you see correct message and picture
		$(".logo").attr("src","assets/images/logo2.png");
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.quiz[triviaGame.questionCount].picture).attr('width', '130px','height', '130px').attr('id', 'correctCityImage');
		// push our picture to window
		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;
		// after 2 sec you see next question
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 2000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
		Launch();
	},
//if options by user is incorrect
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}
		// change brand logo
		// you see wrong message and picture
		$(".logo").attr("src","assets/images/logo3.png");
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.quiz[triviaGame.questionCount].picture).attr('width', '115px').attr('id', 'correctCityImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 2000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},
//If the player is out of time 
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}
		// you see out of time message
		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.quiz[triviaGame.questionCount].picture).attr('width', '115px').attr('id', 'correctCityImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 2000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("25");
		$(".logo").attr("src","assets/images/logo.png");
		music.play();
		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},
//Game Ends - Resets the DOM
	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');
		// here need span or we don't see text from paragraph
		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 25;
	}
};

// click on volume off and music stop and change glyphicon
	$('#stop').click(function() {

 		if (music.paused){
            music.play();
            $("#stop span").removeClass("glyphicon-volume-off");
            $("#stop span").addClass("glyphicon-volume-up");
        }else{
            music.pause();
            $("#stop span").removeClass("glyphicon-volume-up");
            $("#stop span").addClass("glyphicon-volume-off");
        }


});


//Game begins on click of the start button
// music starts zabivaka changes 
	$('#begin').on('click', function(){
		music.play();
		$('#stop').show();
		$(".zabivaka").attr("src","assets/images/zabivaka2.png");
		$('#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});
//once the player hits options
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//once the player hits restart - calls function restart
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});

// fireworks
	function g(a, n) {
  		var divs = "";
  		for (var s = 0; s < 50; s++) {
    		divs += '<div class="div ball"  id="' + getRandom() + '"></div>';
  		}
  		document.getElementById(a).innerHTML += divs;
	}
	g('fire');

	function f(x, n, a) {
  		var t = 0;
  		setInterval(function() {
    		if (t < 50) {
      			x.style.bottom = (46 * t * n - t * t) + 'px';
      			
      			x.style.width = 10 - t / 4.6 + 'px';
      			if (t > 15) {
        			x.style.left = (a * t + 150) + 'px';
        			x.style.bottom = (46 * t * n * n - t * t) + 'px';
      			}
      			t += 1.3
    		}
  		}, 50)
	}

	function Launch() {
		$('.ball').show();
    	var i;
    	for (i = 0; i < 150; i++) {
      		var x = $('.div')[i];
      		var a = parseInt(x.id);
      		x.style.left = '150px';
      		f(x, 1 + ((Math.random() * 5) + 1) / 100, a)
    	}
  	}

	function getRandom() {
  		return Math.random() * 10 - 5
	}

});




