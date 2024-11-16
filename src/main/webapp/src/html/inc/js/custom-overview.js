$('.carousel').carousel();

// Sparkline Graphs
$(function () {

	$("#total-applications").sparkline([212,257,284,315,365,383,358,371,329,295,321,392,316,423,477,495,419], {
		type: 'line',
		lineWidth: 3,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 40,
		width: 180,
		spotRadius: 5,
	});
});


// Sparkline Graph
$(function () {

	$("#demographyFemale").sparkline([280,320,220,385,450,320,250,400,280,320,220,385,450,320], {
		type: 'bar',
		barWidth: 3,
		height: 60,
		width: 200,    
		barSpacing: 5,
		barColor: '#177bbb',
		negBarColor: '#ffffaa'
	});
	$('#demographyMale').sparkline([320,250,400,380,280,320,220,385,450], {
		type: 'line',
		lineWidth: 3,
		fillColor: false,
		lineColor: '#F782AA',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 60,
		width: 200,
		spotRadius: 6,
	});

	$('#rowOne').sparkline([320,250,400,380,280,320,220,385,450], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#50B432',
		minSpotColor: '#f7b53c',
		maxSpotColor: '#F782AA',
		highlightSpotColor: '#',
		height: 18,
		width: 80,
		spotRadius: 3,
	});
	$('#rowTwo').sparkline([230,210,315,190,250,200,330,280,350], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#50B432',
		minSpotColor: '#f7b53c',
		maxSpotColor: '#F782AA',
		highlightSpotColor: '#',
		height: 18,
		width: 80,
		spotRadius: 3,
	});

	$("#fb-stats").sparkline([6,9], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#tw-stats").sparkline([34,15], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#link-stats").sparkline([12,7], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#gplus-stats").sparkline([2,12], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#pint-stats").sparkline([7,19], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});

	$('#goog').sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#aapl").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#nasdaq").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#yahw").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#sun").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

});



// Sparkline Graphs
$(function () {

	$("#total-applications").sparkline([212,257,284,315,365,383,358,371,329,295,321,392,316,423,477,495,419], {
		type: 'line',
		lineWidth: 3,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 40,
		width: 180,
		spotRadius: 5,
	});
});


// Sparkline Graph
$(function () {

	$("#demographyFemale").sparkline([280,320,220,385,450,320,250,400,280,320,220,385,450,320], {
		type: 'bar',
		barWidth: 3,
		height: 60,
		width: 200,    
		barSpacing: 5,
		barColor: '#177bbb',
		negBarColor: '#ffffaa'
	});
	$('#demographyMale').sparkline([320,250,400,380,280,320,220,385,450], {
		type: 'line',
		lineWidth: 3,
		fillColor: false,
		lineColor: '#F782AA',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 60,
		width: 200,
		spotRadius: 6,
	});

	$('#rowOne').sparkline([320,250,400,380,280,320,220,385,450], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#50B432',
		minSpotColor: '#f7b53c',
		maxSpotColor: '#F782AA',
		highlightSpotColor: '#',
		height: 18,
		width: 80,
		spotRadius: 3,
	});
	$('#rowTwo').sparkline([230,210,315,190,250,200,330,280,350], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#50B432',
		minSpotColor: '#f7b53c',
		maxSpotColor: '#F782AA',
		highlightSpotColor: '#',
		height: 18,
		width: 80,
		spotRadius: 3,
	});

	$("#fb-stats").sparkline([6,9], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#tw-stats").sparkline([34,15], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#link-stats").sparkline([12,7], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#gplus-stats").sparkline([2,12], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});
	$("#pint-stats").sparkline([7,19], {
		type: 'pie',
		width: '24',
		height: '24',
		sliceColors: ['#058DC7','#F782AA'],
	});

	$('#goog').sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#aapl").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#nasdaq").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#yahw").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

	$("#sun").sparkline([280,320,220,385,450,320,345,250,250,250,400,380], {
		type: 'line',
		lineWidth: 2,
		fillColor: false,
		lineColor: '#058DC7',
		spotColor: '#e13f3d',
		minSpotColor: '#50B432',
		maxSpotColor: '#f7b53c',
		highlightSpotColor: '#',
		height: 90,
		width: 300,
		spotRadius: 5,
	});

});

//Todo List
$( '.todo-list' ).on( 'click', 'li.list', function() {
	$(this).toggleClass('completed' );
});
