	$(function(){

		var $imgString = $('#carousel ul'),

			imgWidth =  $('#carousel ul li').first().width(),

			slideshowSpeed = 500,

			currentImg = 1,

			$arrowL = $('#carousel .fa-arrow-left'),

			$arrowR = $('#carousel .fa-arrow-right'),

			$controls = $('.carousel-control'),

			interval; /* tą zmienną definiujemy poza fcją slideshowStart,
			żeby móc się do tej zmiennej odwołać globalnie (również poza fcją slideshowStart)
			*/ 


			
			/* klonujemy pierwszy img na koniec listy img bo bedziemy przesuwac calościowo listę, 
			a bez klona robilby sie brzydki nieplynny przeskok przy resecie margin-left listy do 0 */
			$('#carousel ul li').first().clone().appendTo('#carousel ul');

			var $images = $imgString.find('.carousel-img'); // te zmienna celowo definiujemy dopiero po zrobieniu klona elementu li
			console.log($images.get());

		
			/* Override szerokości css lub ustawienie szerokości dla elementu ul w HTML,
			 dzięki temu niezależnie od liczby img nasza lista zawsze je pomiesci */
			$('#carousel ul').width($('#carousel li').length * imgWidth);






		// START & STOP CAROUSEL FUNCTIONS


		function slideshowStart() {

			interval = setInterval(function() {

				currentImg++;

				console.log(currentImg);

				$imgString.stop(true, true).animate({'margin-left': '-=' + imgWidth}, slideshowSpeed,


					function(){

						if (currentImg === $images.length) {

							$imgString.css('margin-left', '0');

							currentImg = 1;

							console.log(currentImg);

						}
					}
				);
					
			}, 3000);
			
		}

	

		function slideshowStop() {

			clearInterval(interval);
		}



	
		
		// CAROUSEL HOVERING 


		$('#carousel').on('mouseover',

			function() {

				slideshowStop();	
			}
		);


		$('#carousel').on('mouseleave',

			function() {

				slideshowStart();
			}
		);


		

		// CAROUSEL ARROW LEFT


		$arrowL.on('click', function() {

			if (currentImg > 1) {

				currentImg--;

				console.log(currentImg);	

				// stop(true, true) zapobiega sytuacji gdzie przy szybkim 
				// klikaniu img  przestaja sie pokrywac z currentImg(animacje nie nadążają za zmianami currentImg)
				$imgString.stop(true, true).animate({'margin-left': '+=' + imgWidth}, slideshowSpeed);


			} else if (currentImg === 1) {

				currentImg = $images.length-1;

				console.log(currentImg);	

				$imgString.stop(true, true).css('margin-left', (-currentImg) * imgWidth);

				$imgString.stop(true, true).animate({'margin-left': '+=' + imgWidth}, slideshowSpeed);
			}

		});




		// CAROUSEL ARROW RIGHT	


		$arrowR.on('click', function() {

			if (currentImg < $images.length) {

				currentImg++;

				console.log(currentImg);	

				$imgString.stop(true, true).animate({'margin-left': '-=' + imgWidth}, slideshowSpeed);

			} else if (currentImg === $images.length) {

				currentImg = 2;

				console.log(currentImg);	

				$imgString.stop(true, true).css('margin-left', '0');

				$imgString.stop(true, true).animate({'margin-left': '-=' + imgWidth}, slideshowSpeed);
			}	

		});		 
		



		// CAROUSEL CONTROLS
		
		$controls.on('click', function(){

			var wantedControl = $(this).index(".carousel-control") + 1; 

				
			if (currentImg === $images.length) {

				$imgString.css('margin-left', '0');

				currentImg = wantedControl;

				console.log(currentImg);

				($imgString).animate({'margin-left': '-=' + (wantedControl-1) * imgWidth}, slideshowSpeed);

			} else if (wantedControl - currentImg >= 0) {

				($imgString).animate({'margin-left': '-=' + (wantedControl - currentImg) * imgWidth}, slideshowSpeed);

				currentImg = wantedControl;
				
				console.log(currentImg);

			} else if (wantedControl - currentImg < 0) {

				($imgString).animate({'margin-left': '-=' + (wantedControl - currentImg) * imgWidth}, slideshowSpeed);

				currentImg = wantedControl;
				
				console.log(currentImg);
			}

		});	

	


		// CURRENT CAROUSEL CONTROL HIGHTLIGHT


		setInterval(function() {

			if (currentImg === $images.length) {

				$controls.removeClass('hightlighted-carousel-control');
				$controls.eq(0).addClass('hightlighted-carousel-control');

			} else if ($controls.eq(currentImg - 1)) {

				$controls.removeClass('hightlighted-carousel-control');
				$controls.eq(currentImg - 1).addClass('hightlighted-carousel-control'); 
			}

		}, 100);
		

		


		// CAROUSEL INIT

		slideshowStart();



			
	});



