////////////////////////////////////////////////////////////////////////////////////////////////////
// Code to enable switching from one tab in the page to another
////////////////////////////////////////////////////////////////////////////////////////////////////

var currentlyVisibleTab = null;

// This function hides the currentlyVisibleTab and makes visible the tab whose id is idOfNewTab.
function switchToTab(idOfNewTab) {
	// Retrieve the new tab HTML element.
	var newTab = document.getElementById(idOfNewTab);
	// If there is a visible tab (i.e. this is not the first time that this function is executing),
	// hide it.
	if (currentlyVisibleTab != null) {
		currentlyVisibleTab.style.setProperty("display", "none", null);
	}
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

var score = 0;

function change_question(question_number, value) {
	var elements = document.getElementsByClassName('questions');
	for(var i=0; i<elements.length; i++) { 
  		elements[i].style.display='none'};
  	document.getElementById(question_number).style.display="block";
  	document.getElementById(question_number).style.color="blue";

  	if (value === "true"){
  		score+=1;
  	document.getElementById(score).innerHTML= score;
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
