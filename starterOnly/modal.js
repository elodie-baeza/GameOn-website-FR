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
	modalbg.classList.remove('select-hide');
	modalbg.classList.add('select-block');
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal form
function closeModal() {
	modalbg.classList.remove('select-block');
	modalbg.classList.add('select-hide');
}

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
const reserve = document.getElementById('reserve');
// collection des enfants du formulaire d'inscription
const reserveChildren = reserve.children;
// nouveaux bouton pour fermer fenêtre de confirmation d'inscription
const redCloseBtn = document.createElement('button');


// valide si champ de texte n'est pas vide et au mini 2 caractères
function validateText(text) {
	return (text.value !== '' && text.value.length >= 2);
}

// valide syntaxe dans champ email
function validateEmail(email) {
	return (/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(email.value));
}

// valide que champ non vide
function validateValue(val) {
	return val.value !== '';
}

//valide si ville cochée si nbre de tournois > 0 
function validateCheckCity(inputName) {
	if (quantity.value == 0) {
		return document.querySelector('input[name="' + inputName + '"]:checked') == null;
	}
	else if (quantity.value > 0) {
		return document.querySelector('input[name="' + inputName + '"]:checked') !== null;
	}
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

// vérification des contraintes lors de la validation du formulaire
function validateForm() {

	//cré un tableau des champs valides et non valides	
	const inputsFormStatus = [
		validateText(firstName),
		validateText(lastName),
		validateEmail(email),
		validateValue(birthDate),
		validateValue(quantity),
		validateCheckCity('location'),
		validateCheckbox(checkbox1)
	];

	// Lors de la soumission: affiche message si texte non valide
	refreshErrorMessage(
		firstName.parentElement,
		validateText(firstName),
		'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
	)

	// Lors de la soumission: affiche message si texte non valide
	refreshErrorMessage(
		lastName.parentElement,
		validateText(lastName),
		'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
	)

	// Lors de la soumission: affiche message si adresse mail non valide
	refreshErrorMessage(
		email.parentElement,
		validateText(email),
		'Veuillez entrer une adresse mail valide.'
	)

	refreshErrorMessage(
		birthDate.parentElement,
		validateValue(birthDate),
		'Vous devez entrer votre date de naissance.'
	)

	// Lors de la soumission: affiche message si date non renseignée
	refreshErrorMessage(
		birthDate.parentElement,
		validateValue(birthDate),
		'Vous devez entrer votre date de naissance.'
	)

	// Lors de la soumission: affiche message si nbr tournois non renseigné
	refreshErrorMessage(
		quantity.parentElement,
		validateValue(quantity),
		'Veuillez renseigner ce champ.'
	)

	// Lors de la soumission: affiche message si ville non selectionnée
	refreshErrorMessage(
		formData[5],
		validateCheckCity('location'),
		"Si c'est votre premier tournois, décochez toutes les villes."
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

//Vérifie les champs du formulaire à la soumission.
form.addEventListener('submit', function (event) {
	//Ne prend pas en compte l'action par default du bouton de soumission "c'est partie".
	event.preventDefault();

	//Si formulaire valide, transforme le formulaire d'inscription en fenêtre de confirmation de réservation.
	if (validateForm()) {
		//Cache tous les enfants .formData du formulaire #reserve
		for (child of reserveChildren) {
			if (child.className == 'formData') {
				child.classList.add('select-hide');
			}
		}
		//cache le bouton close
		document.querySelector('.close').classList.add('select-hide');
		//cache le bouton btnSubmit de formulaire #reserve
		btnSubmit.classList.add('select-hide');
		//change la classe et le texte du paragraphe "Quelle(s) ville(s)"
		document.querySelector('#reserve>p').classList.replace('text-label','text-label-valid-form');
		document.querySelector('#reserve>p').innerHTML = "Merci pour votre inscription ! Votre réservation a été enregistrée.";
		// ajoute class et texte au nouveau bonton "fermer"
		redCloseBtn.classList.add('btn-submit');
		redCloseBtn.innerHTML = 'fermer';
		// ajoute bouton dans HTML en enfant du formulaire.
		reserve.appendChild(redCloseBtn);
	}
	//si formulaire non validé, retourne FALSE
	return false;
})

// Met en visible et réinitialise tous les champs du formulaire d'inscription
function resumModal(){
	for (child of reserveChildren) {
		//rend visible toutes les div .formData et supprime la classe temporaire
		if (child.className == 'formData select-hide') {
			child.classList.replace('select-hide','select-block');
			child.classList.remove('select-block');
		}
	}
	//affiche le bouton close
	document.querySelector('.close').classList.replace('select-hide','select-block');
	document.querySelector('.close').classList.remove('select-block');
	//remet la class et le texte d'origine au paragraphe du formulaire de reservation.
	document.querySelector('#reserve>p').classList.replace('text-label-valid-form','text-label');
	document.querySelector('#reserve>p').innerHTML = 'Quelle(s) ville(s) ?';
	//supprime le bouton "fermer" du HTML
	reserve.removeChild(redCloseBtn);

	//bouton "C'est parti" passe de caché à visible et supprime la classe temporaire
	btnSubmit.classList.replace('select-hide','select-block');
	btnSubmit.classList.remove('select-block');
}

function initModal(){
	for (child of reserveChildren) {
		//vide les champs de texte
		if (child.querySelector('.text-control')){
			child.querySelector('.text-control').value = '';
		}
	}

	//Décoche les checkboxs cochées
	for (item of document.querySelectorAll('.checkbox-input:checked')){
		item.checked = false
	}	
}

// Lors du click sur le bouton "fermer" de la fenêtre de confirmation d'inscription, ferme et réinitialise de formulaire d'inscription.
redCloseBtn.addEventListener('click', function() {
	closeModal();
	resumModal();
	initModal();
})