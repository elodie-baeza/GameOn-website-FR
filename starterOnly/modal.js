function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += 'responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const closeBtn = document.querySelectorAll('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

// #2 TO DO: implement form entries

// DOM elements
//  const form = document.forms["reserve"];
const form = document.getElementById('reserve');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const checkbox1 = document.getElementById('checkbox1');
const formData = document.getElementsByClassName('formData');
const btnSubmit = document.getElementById('btnSubmit');

// valide si champ de texte n'est pas vide et au mini 2 caractères
function validateText(text) {
	return (text.value !== '' && text.value.length >= 2);
}

// valide syntaxe dans champ email
function validateEmail(email) {
	return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.value));
}

// valide syntaxe dans champ date de naissance
/**
 * valide un champ de type date
 * @param {*} date 
 * @returns 
 */
function validateDate(date) {
	isValid = (date.value !== '');
	refreshErrorMessage(
		date.parentElement,
		isValid,
		'Vous devez entrer votre date de naissance.'
	)
	return isValid;
}

// valide champ nbr de tournois non vide
function validateNbr(nbrTournois) {
	return nbrTournois.value !== '';
}

// valide si ville cochée
function validateRadio(inputName) {
	return document.querySelector('input[name="' + inputName + '"]:checked') !== null;
}

// valide si conditions d'utilisations cochée
function validateCheckbox(checkbox) {
	return (checkbox.checked);
}

function refreshErrorMessage(domElement, isValid, message) {
	if (isValid) {
		domElement.setAttribute('data-error-visible', 'false');
	} else {
		domElement.setAttribute('data-error', message);
		domElement.setAttribute('data-error-visible', 'true');
	}
}

// vérification des contraintes lors de la validation du formulaire
function validateForm() {

	//cré un tableau des contraintes valides et non valides	
	const inputsFormStatus = [
		validateText(firstName),
		validateText(lastName),
		validateEmail(email),
		validateDate(birthDate),
		validateNbr(quantity),
		validateRadio('location'),
		validateCheckbox(checkbox1)
	];

	// Lors de la soumiision: affiche message si date non renseignée
	refreshErrorMessage(
		birthDate.parentElement,
		validateDate(birthDate),
		'Vous devez entrer votre date de naissance.'
	)

	// Lors de la soumission: affiche message si ville non selectionnée
	refreshErrorMessage(
		formData['location'],
		validateRadio('location'),
		'Vous devez choisir une option.'
	)

	// Lors de la soumission: affiche message si termes et conditions non acceptés
	refreshErrorMessage(
		checkbox1.parentElement,
		validateCheckbox(checkbox1),
		'Vous devez vérifier que vous acceptez les termes et conditions.'
	)

	//renvoie false si le tableau des contraintes contient false
	return (inputsFormStatus.includes(false) !== true);
}

//bloque le bouton "c'est partie" si champs non valident à la soumission du formulaire
form.addEventListener('submit', function (event) {
	event.preventDefault();
	if (validateForm()) {
		// @TODO message ok
	}
	return false;
})

// champ prénom: affiche message si texte non valide lors de la saisie
firstName.addEventListener('change', function () {
	refreshErrorMessage(
		firstName.parentElement,
		validateText(firstName),
		'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
	)
})

// champ nom: affiche message si texte non valide lors de la saisie
lastName.addEventListener('change', function () {
	refreshErrorMessage(
		lastName.parentElement,
		validateText(lastName),
		'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
	)
})

// champ adresse mail: affiche message si adresse mail valide
email.addEventListener('change', function () {
	refreshErrorMessage(
		email.parentElement,
		validateText(email),
		'Veuillez entrer une adresse mail valide.'
	)
})