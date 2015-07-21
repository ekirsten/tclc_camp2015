function switchvalues (showvalue) {
 	listofpages = ["introduction", "html", "example", "css", "javascript", "files", "resources"];
	for (i in listofpages) {
		document.getElementById(listofpages[i]).style.display="none";
};
	document.getElementById(showvalue).style.display="block"};

score = 0;

function change_question(question_number, value){

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


var rotating_images = new Array ("img01.png", "img04.png", "img05.jpg", "img06.jpg", "img07.jpg", "img08.jpg");

var i = 0


function slideshow_summer()
{
    document.getElementById("img_rotation").src = (rotating_images[i]);

    if (i<rotating_images.length-1)
    {
        i++;
    }

    else

        i = 0;

    setTimeout("slideshow_summer()", 3000);

}
slideshow_summer()