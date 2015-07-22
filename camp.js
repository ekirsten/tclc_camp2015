////////////////////////////////////////////////////////////////////////////////////////////////////
// Code to enable switching from one tab in the page to another
////////////////////////////////////////////////////////////////////////////////////////////////////

var currentlySelectedTab = null;
var currentlyVisibleContent = null;

// This function hides the currentlyVisibleContent and makes visible the tab whose id is
// idOfNewContent.
function switchToTab(clickedTab, idOfNewContent) {
	// If there is a visible content element (i.e. this is not the first time that this function is
	// executing), hide it.
	if (currentlyVisibleContent != null) {
		currentlyVisibleContent.style.setProperty("display", "none", null);
	}
	// Also deselect the corresponding tab by clearing its CSS class attribute.
	if (currentlySelectedTab != null) {
		currentlySelectedTab.setAttribute("class", "");
	}

	// Select the tab that was just clicked by giving it a CSS class.
	clickedTab.setAttribute("class", "selected");
	// Retrieve the new content HTML element.
	var newContent = document.getElementById(idOfNewContent);
	// Show the new tab.
	newContent.style.setProperty("display", "block", null);
	// Remember that newContent is now visible and clickedTab is selected.
	currentlyVisibleContent = newContent;
	currentlySelectedTab = clickedTab;
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
			// Clear the answer, in case the user reloads the page.
			answer.checked = false;
			// Add to the score. The value (score of the answer) may be 0, in which case the score won't
			// increase.
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
		// Show the "quiz completed" message.
		document.getElementById("quiz-outro").style.setProperty("display", "block", null);
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
	switchToTab(document.getElementById("introduction-tab"), "introduction-content-tab");

	// Display the first image in the rotation.
	rotateSummerImage();
	// Have rotateSummerImage rotate the image every 3 seconds (the number is expressed in
	// milliseconds).
	setInterval(rotateSummerImage, 3000);
}, false);
