function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
 
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// #2 TO DO: implement form entries
 
 // DOM elements
//  const form = document.forms["reserve"];
const form = document.getElementById("reserve");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const birthDate = document.getElementById("birthdate");
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const inputs = form.getElementsByTagName('input');
const formData = document.getElementsByClassName('formData');

// valide si prenom n'est pas vide et au mini 2 caractères
function validateText(t){
	return (t !== '' && t.length >= 2);
}

// valide syntaxe dans champ email
function validateEmail(e){
	return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e));
}

// valide syntaxe dans champ date de naissance
function validateDate(d){
	return (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(d));
} 

// valide champ nbr de tournois non vide
function validateNbr(n){
	return n !== '';
} 

// valide si ville cochée
function validateRadio() {
	return document.querySelector('input[type="radio"]').checked;
}

// valide si conditions d'utilisations cochée
function validateCheckbox(i){
	return (checkbox[i].checked);
}

// vérification des contraintes lors de la validation du formulaire
function validate(){

	//cré un tableau des contraintes valides et non valides	
	const inputsItems = [
		validateText(inputs["first"].value),
		validateText(inputs["last"].value),
		validateEmail(inputs["email"].value),
		validateDate(inputs["birthdate"].value),
		validateNbr(inputs["quantity"].value),
		validateRadio(),
		validateCheckbox(0)
	];

	//si le tableau des contraintes contient false alors retourne !true => false
	return (!inputsItems.includes(false));
}
