window.selectCards = 2;

var animating;

window.level = 3;

window.levels = {
	"1" : 5,
	"2" : 10,
	"3" : 20
}

window.cardTypes = [{
	"name" : "genbrug",
	"text" : "Genbrug",
	"file" : "toej.jpg"
},
{
	"name" : "metal",
	"text" : "Metal",
	"file" : "soelvpapir.png"
},
{
	"name" : "metal",
	"text" : "Metal",
	"file" : "skrue.jpg"
},

{
	"name" : "miljøfarligt",
	"text" : "Miljøfarligt Affald",
	"file" : "maling.jpg"
},
{
	"name" : "småt",
	"text" : "Småt brændbart",
	"file" : "flamingo-plade.jpg"
},
{
	"name" : "skraldespanden",
	"text" : "Alm. Skraldespand",
	"file" : "maelkekarton.jpg"
},
{
	"name" : "miljøfarligt",
	"text" : "Miljøfarligt Affald",
	"file" : "Piller.jpg"
},
{
	"name" : "skraldespanden",
	"text" : "Alm. Skraldespand",
	"file" : "pizzabakke.jpg"
},
{
	"name" : "plast",
	"text" : "Plast",
	"file" : "plastikflaske.jpg"
},
{
	"name" : "elektronik",
	"text" : "Elektronik",
	"file" : "Samsung_707443a.jpg"
},
{
	"name" : "skraldespanden",
	"text" : "Alm. Skraldespand",
	"file" : "toiletpapir.jpg"
},
{
	"name" : "metal",
	"text" : "Metal",
	"file" : "UpdateA08_0.jpg"
},
{
	"name" : "elektronik",
	"text" : "Elektronik",
	"file" : "WGDR5964E-No-Reflection.jpg"
},
{
	"name" : "kompost",
	"text" : "Kompost",
	"file" : "æble.jpg"
},
{
	"name" : "pap",
	"text" : "Pap",
	"file" : "aeggebakke.jpg"
},
{
	"name" : "miljøfarligt",
	"text" : "Miljøfarligt Affald",
	"file" : "batteri.jpg"
},
{
	"name" : "papir",
	"text" : "Papir",
	"file" : "avis.jpg"
},
{
	"name" : "kompost",
	"text" : "Kompost",
	"file" : "agurk.jpg"
},
{
	"name" : "glas",
	"text" : "Glas",
	"file" : "glas.jpg"
},
{
	"name" : "træ",
	"text" : "Træ",
	"file" : "spil.jpg"
}
];

(function($){
 
	$.fn.shuffle = function() {
 
		var allElems = this.get(),
			getRandom = function(max) {
				return Math.floor(Math.random() * max);
			},
			shuffled = $.map(allElems, function(){
				var random = getRandom(allElems.length),
					randEl = $(allElems[random]).clone(true)[0];
				allElems.splice(random, 1);
				return randEl;
		   });
 
		this.each(function(i){
			$(this).replaceWith($(shuffled[i]));
		});
 
		return $(shuffled);
 
	};
 
})(jQuery);

$(document).ready(
	function () {
		$("#cards").addClass("level" + window.level );
		createCards(window.levels[window.level]);
	}
);

$(document).on("click", ".card", selectCard);

function randomIntFromInterval ( min, max ) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function createCards ( number, level ) {

	var selected = [];

	for ( var i = 0; i < number; i++ ) {
		var index = randomIntFromInterval(1, window.cardTypes.length);

		while ( selected.indexOf(index) != -1 ) {
			index = randomIntFromInterval(1, window.cardTypes.length);
		}

		selected.push(index);
		
		$("#cards").append('<li class="card image" data-value="' + window.cardTypes[index - 1].name + '"><span></span><span style="background: white url(img/cards/' + window.cardTypes[index - 1].file + ') no-repeat 50% 50%; background-size: contain;" class="back"></span></li>');
		$("#cards").append('<li class="card" data-value="' + window.cardTypes[index - 1].name + '"><span></span><span class="back"><p>' + window.cardTypes[index - 1].text + '</p></span></li>');
	};

	$("#cards li").shuffle();

	window.watch = $("#stopwatch").stopwatch();
	$(window.watch).stopwatch("start");
}

function selectCard () {
	$(".card:not(.card-selected)").removeClass('card-selected');
	
	if ( ! animating ) {
		$(this).addClass('card-selected');
	}
	
	if( $(".card-selected").length >= window.selectCards ) {
		checkCards();
	}
}

function checkCards () {

	var found = 0;

	$(window.cardTypes).each( function ( index, element ) {	
		if( $('.card-selected[data-value="' + element.name + '"]').length > (window.selectCards - 1) && $('.image.card-selected[data-value="' + element.name + '"]').length > 0 ) {
			found = element.name;
		}
	});
	
	if( found.length > 0 )
		foundCards(found);
	
	animating = true;
	setTimeout(function () { $(".card").removeClass('card-selected'); animating = false; }, 1000);
}

function foundCards( type )
{
	$('.card-selected[data-value="' + type + '"]').delay(250).animate(
		{ 
			opacity: 0 
		}, 500,
		function() {
			$(this).addClass("card-found");
		
			if($(".card:not(.card-found)").length == 0) {
				$(".win").fadeIn(250);

				window.watch.stopwatch("reset");
				
				setTimeout(resetBoard, 2500);
			}
		}
	);
	
}

function resetBoard() {
	$("#cards").html("");
	$(".card").removeClass("card-found");
	$(".gameboard").animate({ opacity: 0 }, 400,
		function () {
			createCards(window.levels[window.level]);
			$(".win").fadeOut(250);
			$(".card").css("opacity", 1);
			$(".gameboard").animate({ opacity: 1 }, 400);
		}
	);
}