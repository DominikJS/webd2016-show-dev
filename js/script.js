"use strict";

(function(){



$(window).scroll(function() {
	if ($( window ).width() > 1050) {
	    var x = $(this).scrollTop();
	    //console.log('50% ' + parseInt(-x / 6 + 100) + 'px' + ', 50% ' + parseInt(x / 2) + 'px');
	    $('#about').css('background-position', '50% ' + parseInt(-x / 3 + 175 ) + 'px' + ', 50% ' + parseInt(x / 2) + 'px, center center');
    }
});
	// Set up firebase url and variables
	var index,avatar;
	var url = new Firebase('https://humberinfluxdb.firebaseio.com/');
	var projects, projectLinks,resultsLength;

	function getProfile(getIndex){
		projects = [];
		projectLinks = [];
		$('.work-grid').empty();
		$('#social-profiles').empty();

		url.child('students').once('value', function(snapshot) {
			resultsLength = snapshot.val().length;
			var nextIndex = getNextIndex(getIndex, resultsLength);
			var previousIndex = getPreviousIndex(getIndex, resultsLength);
	

		    var name = snapshot.val()[getIndex].name;
		    var myAvatar = snapshot.val()[getIndex].avatar;
		    var careerTitle = snapshot.val()[getIndex].title;
		    var bio = snapshot.val()[getIndex].bio;
		    var website = snapshot.val()[getIndex].website;
		    var nextName = snapshot.val()[nextIndex].name; 
		    var previousName = snapshot.val()[previousIndex].name;  
		    var twitter = snapshot.val()[getIndex].social[0].twitter;
		    var facebook = snapshot.val()[getIndex].social[0].facebook;
		    var instagram = snapshot.val()[getIndex].social[0].instagram;
		    var behance = snapshot.val()[getIndex].social[0].behance;
		   	var art1 = snapshot.val()[getIndex].art1;
		   	var art2 = snapshot.val()[getIndex].art2;
		   	var art3 = snapshot.val()[getIndex].art3;
		   	var artLink1 = snapshot.val()[getIndex].art1link;
		   	var artLink2 = snapshot.val()[getIndex].art2link;
		   	var artLink3 = snapshot.val()[getIndex].art3link;

		   	if($('.work-grid')){
		   		$('.work-grid').remove();
		   	}

		  	
		  	if(getLink(art1) == true || getLink(art2) == true || getLink(art3) == true){

		  		$('<div class="work-grid col-lg-6 col-med-6 col-sm-6 col-xs-12"></div>').insertAfter( ".bio");
		  		
		  			if(getLink(art1) == true){
		   		
				   		if(getLink(artLink1) == true){
					   			$('.work-grid').append('<a class="image" href="'+ artLink1 +'" target="_blank"><img src="'+ art1 +'" alt=""></a>')
					   		}else{
					   			$('.work-grid').append('<img class="image" src="'+ art1 +'" alt="">');
						}	
				   	}

				   	if(getLink(art2) == true){
				   		if(getLink(artLink2) == true){
				   			$('.work-grid').append('<a class="image" href="'+ artLink2 +'" target="_blank"><img src="'+ art2 +'" alt=""></a>')
				   		}else{
				   			$('.work-grid').append('<img class="image" src="'+ art2 +'" alt="">');
				   		}

				   	}

				   	if(getLink(art3) == true){
				   		if(getLink(artLink3) == true){
				   			$('.work-grid').append('<a class="image" href="'+ artLink3 +'" target="_blank"><img src="'+ art3 +'" alt=""></a>')
				   		}else{
				   			$('.work-grid').append('<img class="image" src="'+ art3 +'" alt="">');
				   		}
			  		}
		   		
	   		}

	   		if($('.work-grid').length < 1){
		   		 	$('.profile-block').addClass('no-pics');
		   	} else {
		   		$('.profile-block').removeClass('no-pics');
		   	}

		   if (getLink(twitter) == true){
		   	$('#social-profiles').append('<li><a href="'+twitter+'" target="_blank"><i class="fa fa-twitter"></i></a></li>');
		   } 
		   if (getLink(facebook) == true){
		   $('#social-profiles').append('<li><a href="'+facebook+'" target="_blank"><i class="fa fa-facebook"></i></a></li>');
		   } 
		   if (getLink(instagram) == true){
		   	$('#social-profiles').append('<li><a href="'+instagram+'" target="_blank"><i class="fa fa-instagram"></i></a></li>');
		   } 
		   if (getLink(behance) == true){
		   	$('#social-profiles').append('<li><a href="'+behance+'" target="_blank"><i class="fa fa-behance"></i></a></li>');
		   } 
		    
		    // console.log(" name: "+ name + ", bio: " + bio + ", website: " + website);

		    $('.avatar-pic').find('.pic').attr('src', myAvatar);
		    $('.modal-name').text(name);
		    $('.modal-career').text(careerTitle);
		    $('.next-profile span').text(nextName);
		    $('.last-profile span').text(previousName);
		    $('.bio .website').text(website);
		    $('.bio .website').attr('href','http://'+website);
		    $('.bio .bio-text').text(bio);


 	 	});

 	//  	if ($('.work-grid').children('.image').length < 1) {
		// 	$('.profile-block').addClass('no-pics');
		// } 
	}
	
 	function getLink(link){
    	if (link === undefined){
	    	return false;
	    } else if(link.length > 0) {
	    	return true;
	    }
    }

    function getNextIndex(currentIndex, length) {
    	if (currentIndex == (length-1)) {
    		return 0;
    	}

    	return currentIndex + 1;
    }

    function getPreviousIndex(currentIndex, length) {
    	if (currentIndex == 0) {
    		return length - 1;
    	}

    	return currentIndex - 1;
    }

	// ** replace jquery item with gallery item	
	$('.grid-item').click(function(){
		$('.work-grid').empty();
		$('.modal-container').fadeIn();
		
		// alert(avatar);
		$('.modal .pic').attr('src',avatar);
		$('.modal').addClass('slide-in');
		
		// Get index of item clicked in the DOM
		// index = $(this).index();
		
		// if(index >= resultsLength-1){
		// 	index = 19;
		// 	getProfile(index);
		// } else if(index <= 1){
		// 	index = 0;
		// 	getProfile(index);
		// } 		
		index = $(this).index();
		getProfile(index);

		

		

		
	})

	$('.next-profile').click(function(){
		index = getNextIndex(index, resultsLength);
		getProfile(index);
	})

	$('.last-profile').click(function(){
		index = getPreviousIndex(index, resultsLength);
		getProfile(index);
	})


	// Set up slider functionality

	$('.slider-container').mousedown(function(e){
		var startX = e.clientX;
		var sliderLeftPosX = parseInt($('.slider').css('left'), 10);
		var clicked = true;
		// console.log("startX= " + startX);

		$(this).mousemove(function(e){
			// console.log("slider left position = " + sliderLeftPosX );
			var finishX = e.clientX;
			
			if(finishX <= startX - 60){
				// console.log("newstartX = " + finishX);
				$('.slider').css("left", sliderLeftPosX - 610);
				setInterval(function(){
					$(this).off("mousedown");
				}, 1000);

			}
			if(finishX >= startX + 60){
				// console.log("newstartX = " + finishX);
				$('.slider').css("left", sliderLeftPosX + 610);
				setInterval(function(){
					$(this).off("mousedown");
				}, 1000);
			}
			// console.log("pageLeft:" + e.pageX + "left:" + e.clientX + "right:" + e.clientY);
		});
	});

	$('.slider-container').mouseup(function(e){
		$(this).off("mousemove");
	});

	$('.modal button').click(function(){
		$('.modal-container').fadeOut();
		$('.modal').removeClass('slide-in');
	});
		
	//set up instafeed.js
	// var img_qty;
	// var isStandardWindow = window.matchMedia("(min-width: 640px)").matches;
	// if (window.matchMedia("(min-width: 640px)").matches) {
	//   limit: 10,
	// } else {
	//   limit: 4,
	// }

	var feed = new Instafeed({
	    accessToken: '1691322362.1677ed0.43cc655ed4884ffbb58bb593b185fb6a',
	    get: 'user',
	    userId: '1691322362', //change to "1691322362" when feed is available
	    clientId: '30e90425d4c442bba0ee569e2c31f5b5',
	    template: '<a href="{{link}}"  class="instagram-item instagram-{{orientation}}" target="__blank"><img src="{{image}}" /></a>',
	    limit: 10,
	    resolution: 'standard_resolution'
		});
	feed.run();	

	// function checkPosition() {
 //    if (window.matchMedia('(max-width: 500px)').matches) {
 //        img_qty=4;
 //    } else {
 //        img_qty=10;
 //    }
	// }

	
 

	// var $grid = $('.grid').isotope({
	//   masonry: {
	//     // columnWidth: 50
	//   }
	// });

	// $('.grid').isotope({
	//   // options
	//   itemSelector: '.grid-item',
	//    isFitWidth: true
	//   // layoutMode: 'fitRows'
	// });

	$('li.show-all').on('click', function(){
		// $('.grid-item').removeClass('highlight');
		$('.grid-item').removeClass('hidden');
		
	});
	$('li.show-hyb').on('click', function(){
		$('.grid-item').addClass('hidden');
		$('.grid-item.hyb').removeClass('hidden');
	});
	$('li.show-dev').on('click', function(){

		$('.grid-item').addClass('hidden');
		$('.grid-item.dev').removeClass('hidden');
	});
	$('li.show-des').on('click', function(){

		$('.grid-item').addClass('hidden');
		$('.grid-item.des').removeClass('hidden');
	});

	/////////Toggle active class on selected element and remove from previous
	$(".selection").on("click", "li", function() {				
		var $this = $(this);									
	    $this.addClass("active")								
	    .siblings().removeClass("active");						
	});
	$(".headerNav").on("click", "li", function() {				
		var $this = $(this);									
	    $this.addClass("active")								
	    .siblings().removeClass("active");						
	});
	///////////////

	///Smooth Scroll for nav
	$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});


})();
