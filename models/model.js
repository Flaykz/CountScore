$(function() {
	$('#addPlayer').click(function() {
		var tabScore = getTabScore();
		var nbJoueur = getNbJoueur();
		var indexJoueur = nbJoueur;
		var chaineBefore = "Joueur_" + nbJoueur;
		nbJoueur = nbJoueur + 1;
		if (nbJoueur < 10) {
			var chaine = "Joueur_" + nbJoueur;
			var monJoueur = new Joueur(chaine, 0);
			tabScore[chaine] = monJoueur;
			setTabScore(tabScore);
			setNbJoueur(nbJoueur);
			$("." + chaine).css("display", "flex");
			var maxWidth = 100 / (nbJoueur);
			$(".col").css("max-width", maxWidth + "vw");
			$('.mymodal-title').text("Nombre de joueurs : " + nbJoueur);
			var value = $('.colour-choice .' + chaine).val();
			var tabColour = {};
			tabColour = getLocalStorage('colour');
			tabColour[chaine] = value;
			setLocalStorage('colour', tabColour);
		}
		else {
			showToast("Impossible to add more than 9 players", 2);
		}
	});
	
	$('#deletePlayer').click(function() {
		var nbJoueur = getNbJoueur();
		var chaine = "Joueur_" + nbJoueur;
		var tabScore = getTabScore();
		if (nbJoueur > 1) {
			$("." + chaine).css("display", "none");
			nbJoueur = nbJoueur - 1;
			setNbJoueur(nbJoueur);
			delete tabScore[chaine];
			setTabScore(tabScore);
			var maxWidth = 100 / (nbJoueur);
			$(".col").css("max-width", maxWidth + "vw");
			$('.mymodal-title').text("Nombre de joueurs : " + nbJoueur);
		} else {
			showToast("Sorry!! Can't remove first player!", 2);
		}
	});
	
	$('.Ligne_score').click(function() {
		var joueur = $(this).children().attr('id');
		setLocalStorage("currentPlayer", joueur);
		$('.Ligne_score, .Ligne_nom').css("background-color", "gray");
		$('.' + joueur).css('background-color', 'orange');
	});
	
	$(".button").click(function() {
		var point = $(this).attr('val');
		var joueur = getLocalStorage('currentPlayer');
		if (joueur != "") {
			var tabScore = getTabScore();
			tabScore[joueur].score = tabScore[joueur].score + parseInt(point);
			setTabScore(tabScore);
			refreshScreen();	
		} else {
			showToast("You must select a player before to add points", "0");
		}
	});
	
	$("#startGame").click(function() {
		var noSleep = new NoSleep();
		noSleep.enable();
		startGame();
	})
	
	$(".joueur").change(function() {
		var name = $(this).attr("name");
		var value = sanitize($(this).text());
		var tabScore = getTabScore();
		tabScore[name].nom = value;
		setTabScore(tabScore);
		var len = value.split(",", 2).length;
		$(this).html(value);
	})
	
	$(".input-colour-choice").change(function() {
		var joueur = $(this).attr("class").replace('input-colour-choice ', '');
		var value = $(this).val();
		var tabColour = {};
		tabColour = getLocalStorage('colour');
		tabColour[joueur] = value;
		setLocalStorage('colour', tabColour);
	})
	
	$('.toast').click(function() {
		$(this).fadeOut("slow");
	})
	
	$("[contenteditable]").on('focus', function() {
		before = $(this).html();
	}).on('blur keypup paste', function() {
		if ($(this).html() != before) {
			$(this).trigger('change');
		}
	});
});

$(window).on("load", function () {
	$('.mymodal').css("display", "block");
	$('.container').css("display", "");
	$('.table-responsive').css("display", "flex");
	$('.loader').fadeOut("slow");
	init();
});

function init() {
	var href = window.location.href;
	var hostname = window.location.hostname;
	var path = href.replace("https://" + hostname, "");
	var nbJoueur = "1";
	var tabScore = new Object();
	var tabColour = {};
	var pending = getLocalStorage("pending");
	
	if (pending == '1') {
		var nbJoueur = getNbJoueur();
		var tabScore = getTabScore();
		var maxWidth = 100 / (nbJoueur);
		var currentPlayer = getLocalStorage('currentPlayer');
		$('.' + currentPlayer).css('background-color', 'orange');
		$(".col").css("max-width", maxWidth + "vw");
		$('.mymodal').css("display", "none");
		refreshScreen();
		var modalStart = "<div class='mymodal-dialog'><div class='mymodal-content'><div class='mymodal-body'>";
		var modalMid = "Continue this game ?"
		var modalEnd = "</div><div class='mymodal-footer'><button id='oui' aria-label='Oui'>Yes</button><button id='non' aria-label='Non'>No</button></div></div></div>";
		$(".modalEndGame").html(modalStart + modalMid + modalEnd);
		$(".modalEndGame").css("display", "block");
		$("#oui").on("click",function() {
			$(".modalEndGame").css("display", "none");
			$('.table-responsive').css("pointer-events", "initial");
			$('.table-responsive').css("cursor", "initial");
		});
		$("#non").on("click",function() {
			var url = "https://" + window.location.hostname;
			// window.location.assign(url);
			window.location.assign(window.location.origin);
			setLocalStorage('pending', "0");
		});
	} else {
		var monJoueur = new Joueur("Joueur_1", 0);
		tabScore["Joueur_1"] = monJoueur;
		for (var i = 1; i < 10; i++) {
			var nomJoueur = "Joueur_" + i;
			$(".joueur[name='" + nomJoueur + "']").html(nomJoueur);
		}
		var value = $('.colour-choice .Joueur_1').val();
		tabColour['Joueur_1'] = value;
		setLocalStorage('colour', tabColour);
		setLocalStorage('pending', "0");
		setLocalStorage('currentPlayer', "");
	}
	
	setTabScore(tabScore);
	setNbJoueur(nbJoueur);
	
	for (var i = 0; i < 10; i++) {
		var chaine = ".Joueur_" + i;
		if (i > parseInt(nbJoueur)) {
			$(chaine).css("display", "none");
		} else {
			$(chaine).css("display", "flex");
		}
	}
}


function Joueur(nom, score) {
	this.nom = nom;
	this.score = score;
}

function getTabScore() {
	var tabScore = JSON.parse(localStorage.getItem("tabScore"));
	return tabScore;
}

function getNbJoueur() {
	var nbJoueur = parseInt(localStorage.getItem("nbJoueur"), 10);
	return nbJoueur;
}

function setTabScore(tabScore) {
	localStorage.setItem("tabScore", JSON.stringify(tabScore));
}

function setNbJoueur(nbJoueur) {
	localStorage.setItem("nbJoueur", nbJoueur);
}

function addLocalStorage(arr, value) {
	var obj = getLocalStorage(arr);
	obj.push(value.toString());
	setLocalStorage(arr, obj);
}

function setLocalStorage(nomVar, value) {
	localStorage.setItem(nomVar, JSON.stringify(value));
}

function getLocalStorage(nomVar) {
	return JSON.parse(localStorage.getItem(nomVar));
}

function getLastValue(arr) {
	if (arr.length > 1) {
		return arr[arr.length - 1];
	} else {
		return arr[0];
	}
}

function addLastValueInArr(arr) {
	arr.push(getLastValue(arr));
}

function arrayMin(arr) {
	var len = arr.length, min = Infinity;
	while (len--) {
		if (arr[len] < min) {
			min = arr[len];
		}
	}
	return min;
};

function allIndexOf(arr, el) {
	var indexArray = [];
	var index = arr.indexOf(el);
	while (index != -1) {
		indexArray.push(index);
		var index = arr.indexOf(el, index + 1);
	}
	return indexArray;
}

function sortByScoreAsc(key1, key2) {
	return getLastValue(key1.score) > getLastValue(key2.score);
}

function sortByScoreDsc(key1, key2) {
	return getLastValue(key1.score) < getLastValue(key2.score);
}

function objectToTab(obj) {
	var tab = [];
	for (var item in obj) {
		tab.push(obj[item]);
	}
	return tab;
}

function sanitize(input) {
	var sanitized = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	return sanitized;
}

function startGame() {
	$('.mymodal').css("display", "none");
	$('.table-responsive').css("pointer-events", "initial");
	$('.table-responsive').css("cursor", "initial");
	setLocalStorage('pending', "1");
}

function refreshScreen() {
	var tabScore = getTabScore();

	for (var joueur in tabScore) {
		for (var row in tabScore[joueur]) {
			switch (row) {
				case "score":
					$('#' + joueur).text(tabScore[joueur][row]);
					break;
				default:
					break;
			}
		}
		$(".joueur[name='" + joueur + "']").html(tabScore[joueur].nom);
	}
}

function showToast(message, timeout) {
	$('#toast').text(message);
	$('.toast').css('display', 'flex').hide().fadeIn('slow');
	if (parseInt(timeout) != 0) {
		timeout = parseInt(timeout) * 1000;
		res = setTimeout(hideToast, timeout);
	}
}

function hideToast() {
  var display = $('.toast').css('display');
  if (display == 'flex') {
	  $('.toast').fadeOut("slow");
  }
}