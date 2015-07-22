////////////////////////////////////////////////////////////////////////////////////////////////////
// Code to enable switching from one tab in the page to another
////////////////////////////////////////////////////////////////////////////////////////////////////

var currentlyVisibleTab = null;

// This function hides the currentlyVisibleTab and makes visible the tab whose id is idOfNewTab.
function switchToTab(idOfNewTab) {
	// If there is a visible tab (i.e. this is not the first time that this function is executing),
	// hide it.
	if (currentlyVisibleTab != null) {
		currentlyVisibleTab.style.setProperty("display", "none", null);
	}

	// Retrieve the new tab HTML element.
	var newTab = document.getElementById(idOfNewTab);
	// Show the new tab.
	newTab.style.setProperty("display", "block", null);
	// Remember that newTab is now visible.
	currentlyVisibleTab = newTab;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// Code to rotate the images on the top-right
////////////////////////////////////////////////////////////////////////////////////////////////////

var listOfRotatingImages = ["img01.png", "img02.jpg", "img03.jpg", "img04.png", "img05.jpg", "img06.jpg"];
var nextDisplayedImage = 0;

// This function changes the image displayed on the top-right corner.
function rotateSummerImage() {
	// Dynamically change the displayed image.
	document.getElementById("img-rotation").setAttribute("src", listOfRotatingImages[nextDisplayedImage]);
	// The next call to this function will switch to the next image.
	nextDisplayedImage += 1;
	// If nextImageToShow has reached the size of the array, start back from image 0, which is the
	// first one.
	if (nextDisplayedImage == listOfRotatingImages.length) {
		nextDisplayedImage = 0;
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// Code for the quiz
////////////////////////////////////////////////////////////////////////////////////////////////////

var indexOfCurrentQuestion;
var quizScore = 0;

// This function starts the quiz by hiding the "start quiz" button and showing the first question.
function beginQuiz() {
	// Otherwise there's no current question, so the user just started the quiz. In this case we
	// hide the "start quiz" button and show the first question.
	document.getElementById("quiz-intro").style.setProperty("display", "none", null);
	// Show the rest of the quiz.
	document.getElementById("quiz"      ).style.setProperty("display", "block", null);

	// Move to the first question.
	indexOfCurrentQuestion = 1;

	// Retrieve the new question HTML element and show it.
	document.getElementById("question" + indexOfCurrentQuestion).style.setProperty("display", "block", null);
}

// This function hides the question whose index is indexOfCurrentQuestion, updates the
// score, and makes visible the question whose index is indexOfCurrentQuestion + 1.
function answerCurrentQuizQuestion() {
	// Get the selected (checked) answer and update the score accordingly.
	var answers = document.getElementsByName("question" + indexOfCurrentQuestion + "-answer");
	for (var i = 0; i < answers.length; ++i) {
		var answer = answers[i];
		if (answer.checked) {
			quizScore += parseInt(answer.getAttribute("value"));
			break;
		}
	}
	document.getElementById("quiz-score").innerHTML = quizScore;

	// Retrieve the HTML element containing the answered question.
	var oldQuestion = document.getElementById("question" + indexOfCurrentQuestion);
	// Hide the answered question.
	oldQuestion.style.setProperty("display", "none", null);

	// Move to the next question.
	++indexOfCurrentQuestion;

	// Retrieve the new question HTML element and show it.
	var newQuestion = document.getElementById("question" + indexOfCurrentQuestion);
	if (newQuestion != null) {
		newQuestion.style.setProperty("display", "block", null);
	} else {
		// There's no question with id equal to indexOfCurrentQuestion: the quiz is over.
		document.getElementById("quiz-next").style.setProperty("display", "none", null);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// Getting things to move from a standstill
////////////////////////////////////////////////////////////////////////////////////////////////////

// Arrange for some code (the content of the function below) to be executed when an event occurs in
// the page. In this case, the DOMContentLoaded event means "when the page contents have loaded",
// which will cause our function to be executed whenever the page is accessed or refreshed.
window.addEventListener("DOMContentLoaded", function() {
	// Switch to the "Introduction" tab.
	switchToTab("introduction-content-tab");

	// Display the first image in the rotation.
	rotateSummerImage();
	// Have rotateSummerImage rotate the image every 3 seconds (the number is expressed in
	// milliseconds).
	setInterval(rotateSummerImage, 3000);
}, false);
