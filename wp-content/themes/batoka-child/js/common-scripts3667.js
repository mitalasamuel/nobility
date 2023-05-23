;(function ($) {
	$(function () {
		if ($(window).width() > 767) {
			if ($('.nav-hover-image').length > 0) {
				var target_even = $('.nav-target-even')
				;(target_even_img_src = $('.nav-wrap .nav-target-even img')), (target_even_srcset = $('.nav-even-image-src')), (target_odd = $('.nav-target-odd'))
				;(target_odd_img_src = $('.nav-wrap .nav-target-odd img')), (target_odd_srcset = $('.nav-odd-image-src'))

				$('.nav-hover-image').each(function () {
					var $this = $(this)
					$this.find('a').on('mouseover', function () {
						var hover_srcset = $this.data('img-srcset'),
							hover_src = $this.data('img-src')
						object = $this.data('img-object')

						if (object == 'even') {
							target_even_img_src.attr('src', hover_src)
							target_even_srcset.attr('srcset', hover_srcset)
							// target_even.fadeIn();
							target_even.addClass('show')
						} else {
							target_odd_img_src.attr('src', hover_src)
							target_odd_srcset.attr('srcset', hover_srcset)
							// target_odd.fadeIn();
							target_odd.addClass('show')
						}
					})
					$this.find('a').on('mouseout', function () {
						object = $this.data('img-object')
						if (object == 'even') {
							// target_even.fadeOut();
							target_even.removeClass('show')
						} else {
							// target_odd.fadeOut();
							target_odd.removeClass('show')
						}
					})
				})
			}
		}

		if ($('.testimonials-wrap').length > 0) {
			$('.review-form-trigger a').on('click', function (e) {
				e.preventDefault()
				$('#respond').slideToggle()
			})
		}
		$(window).on('load', function () {
			$('body').addClass('page-in')
		})

		if ($('header').length) {
			var header = new Headroom(document.querySelector('header'), {
				tolerance : {
					up : 5,
					down : 0
				},
				offset: 40,
				classes: {
					initial: 'animated',
					pinned: 'slideDown',
					unpinned: 'slideUp',
				},
			})
			header.init()
		}

		if ($('.destination-overview-content-wrap').length > 0) {
			//$('.destination-overview-content-wrap').find('p').addClass('split-content')
		}

		/* Page Transition */
		//.not('[href*="#"]')
		$('a[href]')
			.not('[href="#"]')
			.not('[href*="#"]')
			.not('[href="#0"]')
			.not('[href*="mailto:"]')
			.not('[href*="tel:"]')
			.on('click', function (event) {
				var target = $(this).attr('target')
				if (target != '_blank') {
					event.preventDefault()
					var newPage = $(this).attr('href')
					$('body').addClass('page-out')
					setTimeout(function () {
						window.location.href = newPage
					}, 500)
				}
			})

		/* End Page Transistion*/

		$('a[href*="#"]')
			.not('[href="#"]')
			.not('[href="#0"]')
			.click(function (event) {
				// On-page links
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					// Figure out element to scroll to
					var target = $(this.hash)
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
					// Does a scroll target exist?
					if (target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault()
						$('html, body').animate(
							{
								scrollTop: target.offset().top - 75,
							},
							1000,
							function () {}
						)
					}
				}
			})

		// direct browser to top right away
		// if (window.location.hash)
		//     scroll(0,0);
		// // takes care of some browsers issue
		// setTimeout(function(){scroll(0,0);},1);

		// // if we have anchor on the url (calling from other page)
		// if(window.location.hash){
		//     // smooth scroll to the anchor id
		//     $('html,body').delay(1000).animate({
		//         scrollTop:$(window.location.hash).offset().top + 'px'
		//     },1000,'swing');
		// }

		/* Plant your trip form */
		if ($('.gfield .datepicker').length > 0) {
			$('.gfield .datepicker').attr('autocomplete', 'off')
		}
		function saveFromBackBtn() {
			if ($('.form_saved_message .form_saved_message_emailform').length > 0) {
				var backBtn = '<div class="trip-prev"><button class="gform_previous_button button">BACK</div>'
				$('.form_saved_message .form_saved_message_emailform')
					.append(backBtn)
					.on('click', '.trip-prev', function () {
						var url = window.location.href
						if (url.indexOf('?') > -1) {
							url += '&plan-trip=1'
						} else {
							url += '?plan-trip=1'
						}
						window.location.href = url
					})
			}
		}
		saveFromBackBtn()

		// Check for parameter 'plan-trip' and open plan trip form
		var urlParams = new URLSearchParams(window.location.search)
		var foo = urlParams.get('plan-trip')
		if (foo == '1') {
			$('.trip-wrap').fadeIn()
		}

		function addQtyBtns() {
			var decreaseBtn = '<span class="button decrease-input-btn"></span>',
				increaseBtn = '<span class="button increase-input-btn"></span>'
			$('.trip-wrap .form-quantity-field .ginput_container').prepend(decreaseBtn)
			$('.trip-wrap .form-quantity-field .ginput_container').append(increaseBtn)
			$('.lodge-trip-wrap .form-quantity-field .ginput_container').prepend(decreaseBtn)
			$('.lodge-trip-wrap .form-quantity-field .ginput_container').append(increaseBtn)
			$('.increase-input-btn').on('click', function () {
				var input = $(this).parent().find('input'),
					inputVal = input.val(),
					newVal = parseInt(inputVal) + 1
				input.val(newVal)
			})
			$('.decrease-input-btn').on('click', function () {
				var input = $(this).parent().find('input'),
					inputVal = input.val(),
					newVal = parseInt(inputVal) - 1
				if (inputVal < 1) {
					input.val(0)
				} else {
					input.val(newVal)
				}
			})
		}
		addQtyBtns()
		/* End Plant your trip form */

		if ($('.gform_wrapper').length) {
			$('.gform_wrapper').each(function () {
				$(this)
					.find('.gform_page')
					.each(function (e) {
						var index = e + 1,
							total = $(this).parent().find('.gform_page').length
						var pagination = '<div class="count-wrap"><em>STEP ' + index + '/' + total + '</em></div>'
						$(this).find('.gform_page_footer').append(pagination)
					})
			})
		}

		$(document).on('gform_page_loaded', function (event, form_id, current_page) {
			var total = $('#gform_' + form_id).find('.gform_page').length
			var pagination = '<div class="count-wrap"><em>STEP ' + current_page + '/' + total + '</em></div>'
			$('.gform_page_footer').append(pagination)
			if ($('.gfield .datepicker').length > 0) {
				$('.gfield .datepicker').attr('autocomplete', 'off')
			}
			if ($('.gfield_select').length > 0) {
				$('.gfield_select').selectric({})
			}
			saveFromBackBtn()
			addQtyBtns()
		})

		$(window).on('load', function () {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		})
		// window.addEventListener('resize', () => {
		// 	let vh = window.innerHeight * 0.01
		// 	document.documentElement.style.setProperty('--vh', `${vh}px`)
		// })

		/* HIDE AND REVEAL NAV ON SCROLL */
		var lastScrollTop = 0,
			px = 0,
			topHeader = $('.header-wrap')
		if ($('.hero-wrap').length > 0) {
			var scrollH = $('.hero-wrap').outerHeight() - 100
		} else {
			var scrollH = $(window).height() - 100
		}

		$(window).scroll(function (event) {
			var st = $(this).scrollTop()

			// if(st > scrollH) {
			// topHeader.addClass('light-header');

			$('body').addClass('nav-transform')
			$('body').addClass('nav-scrolled')

			if (st > lastScrollTop) {
				// Scrolling down
				$('body').removeClass('nav-reveal')
				// topHeader.addClass('scroll-header');
			} else {
				// scrolling up
				$('body').addClass('nav-reveal')
				// topHeader.removeClass('scroll-header');
			}
			lastScrollTop = st
			// } else {
			//      $("body").removeClass('nav-transform');
			//      $("body").removeClass('nav-scrolled');
			// }
		})
		/* END HIDE AND REVEAL NAV ON SCROLL */

		if ($('#gdprWrapper').length > 0) {
			if (Cookies.get('batoka_gdpr') !== 'true') {
				setTimeout(function () {
					$('#gdprWrapper').fadeIn()
				}, 5000)
			}
			$('#gdprClose').on('click', function () {
				Cookies.set('batoka_gdpr', 'true', { expires: 30, path: '/' })
				$('#gdprWrapper').fadeOut()
			})
		}

		if ($('.batoka_form').length > 0) {
			function focusFormFields() {
				$('.gfield input, .gfield textarea').focus(function () {
					$(this).parents('.gfield').addClass('focused')
				})
				$('.gfield input, .gfield textarea').blur(function () {
					if ($(this).val().length > 0) {
					} else {
						$(this).parents('.gfield').removeClass('focused')
					}
				})
			}
			focusFormFields()
			$(document).on('gform_post_render', function (event, form_id, current_page) {
				focusFormFields()
			})
		}

		// menu toggle
		if ($(window).width() > 769) {
			$('.menu-toggle button').click(function (e) {
				e.preventDefault()
				$('.nav-wrap').fadeToggle()
				$('body').toggleClass('navshown')
			})
		} else {
			$('.menu-toggle').click(function (e) {
				e.preventDefault()
				$('body').toggleClass('navshown')
			})
		}

		$('.video-item-wrap').click(function (e) {
			e.preventDefault()
			$(this).closest('.video-wrapper').find('.video-lightbox').addClass('showlightbox')
		})

		$('.video-lightbox-close').click(function (e) {
			e.preventDefault()
			$(this).closest('.video-wrapper').find('.video-lightbox').removeClass('showlightbox')
		})

		// plan a trip toggle
		$('.enquireTrig').on('click', function (e) {
			e.preventDefault()


			//TODO: bring back the popup
			// var top = document.documentElement.scrollTop

			// document.querySelector('.smooth-scroll').style.position = 'fixed';
			// document.querySelector('.smooth-scroll').style.top = `-${top}px`;

			// $('.trip-wrap').fadeIn()
		})

		$('.lodgeTrig').on('click', function (e) {
			e.preventDefault()

			var top = document.documentElement.scrollTop

			document.querySelector('.smooth-scroll').style.position = 'fixed';
			document.querySelector('.smooth-scroll').style.top = `-${top}px`;

			$('.lodge-trip-wrap').fadeIn()
		})

		$('.trip-close a, .trip-wrap-bg').on('click', function (e) {
			e.preventDefault()

			const scrollY = document.querySelector('.smooth-scroll').style.top;
			document.querySelector('.smooth-scroll').style.position = '';
			document.querySelector('.smooth-scroll').style.top = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);

			$('.trip-wrap').fadeOut()
			$('.lodge-trip-wrap').fadeOut()
		})
		

		// add body classes on pages
		if ($('.about-section').length) {
			$('body').addClass('about-page')
		}

		if ($('.blog-summary').length) {
			$('body').addClass('blog-summary-main')
		}

		if ($('.blog-post').length) {
			$('body').addClass('blog-post-main')
		}

		if ($('.contact-section').length) {
			$('body').addClass('contact-page')
		}

		if ($('.specials-page').length) {
			$('body').addClass('specials')
		}

		if ($('.error').length) {
			$('body').addClass('error-page')
		}

		/*
        $('.itinerary-accordion').on('click',function() {
            var $this = $(this);
            setTimeout(function () {
                $('html,body').animate({
                    scrollTop: $this.offset().top - 50
                }, 1000);
            }, 500);
        });
*/
		// ANIMATION CHECK IF IN VIEW
		var $animation_elements = $('.anim-el')
		var $window = $(window)

		function check_if_in_view() {
			var window_height = $window.height()
			var insetAmount = window_height / 15 // fifth of the screen
			var window_top_position = $window.scrollTop()
			var window_bottom_position = window_top_position + window_height - insetAmount

			$.each($animation_elements, function () {
				var $element = $(this)
				var element_height = $element.outerHeight()
				var element_top_position = $element.offset().top
				var element_bottom_position = element_top_position + element_height

				//check to see if this current container is within viewport
				if (element_top_position <= window_bottom_position) {
					$element.addClass('in-view')
				}
				/* else {
                                    if(!$element.hasClass('anim-once')) {
                                        $element.removeClass('in-view');
                                    }
                                }*/
			})
		}
		$window.on('scroll orientationchange resize', check_if_in_view)
		$window.trigger('scroll')

		const updateProperties = (elem, state) => {
			elem.style.setProperty('--x', `${state.x}px`)
			elem.style.setProperty('--y', `${state.y}px`)
			elem.style.setProperty('--width', `${state.width}px`)
			elem.style.setProperty('--height', `${state.height}px`)
			elem.style.setProperty('--radius', state.radius)
			elem.style.setProperty('--scale', state.scale)
		}

		if ($('.accommodation-item-wrap').length) {
			$('.accommodation-item-wrap').slick({
				arrows: false,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 4300,
				speed: 1000,
				navigation: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				centerMode: false,
				focusOnSelect: false,
				fade: true,
			})
			$(window).on('resize', function () {
				$('.accommodation-item-wrap').slick('resize')
			})
		}

		// SPLIT TEXT ANIMATE LINES IN

		if ($('.split-heading').length) {
			splitText('.split-heading', 'lines', true)
			inView.threshold(0.5)
			inView('.split-heading').on('enter', function (el) {
				if (!el.classList.contains('has-animated')) {
					var all = el.getElementsByClassName('line')
					for (var i = 0; i < all.length; i++) {
						var j = i + 1
						all[i].style.setProperty('--index', j)
						all[i].classList.add('animate-heading')
					}
					//el.classList.add("has-animated");
				}
			})
		}

		if ($('.split-content').length) {
			splitText('.split-content', 'lines', true)
			inView.threshold(0.25)
			inView('.split-content').on('enter', function (el) {
				if (!el.classList.contains('has-animated')) {
					var all = el.getElementsByClassName('line')
					for (var i = 0; i < all.length; i++) {
						var j = i + 1
						all[i].style.setProperty('--index', j)
						all[i].classList.add('animate')
					}
					//el.classList.add("has-animated");
				}
			})
		}

		//Animate heading
		/*if ($('.split-heading').length) {
            var res = Splitting({
                target: '.split-heading',
                by: 'lines',
            });
            Splitting();
            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="wrapper"><span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });
            inView.threshold(0.50);
            inView(".split-heading").on("enter", function (el) {
                if (!el.classList.contains("has-animated")) {
                    var all = el.getElementsByClassName('line');
                    for (var i = 0; i < all.length; i++) {
                      var j = i+1;
                      all[i].style.setProperty('--index', j);
                      all[i].classList.add("animate-heading");
                    }
                    el.classList.add("has-animated");
                }
            });
        }*/

		//Animate paragraph
		/*if ($('.split-content').length) {
            var res = Splitting({
                target: '.split-content',
                by: 'lines',
            });

            Splitting();

            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="wrapper"><span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });

            inView.threshold(0.50);
            inView(".split-content").on("enter", function (el) {
                if (!el.classList.contains("has-animated")) {

                    var all = el.getElementsByClassName('line');
                    for (var i = 0; i < all.length; i++) {
                      var j = i+1;

                      all[i].style.setProperty('--index', j);
                      all[i].classList.add("animate");
                    }
                    el.classList.add("has-animated");
                }
            });
        }*/

		if ($('.discover-left-thumb').length) {
			$(window).on('load scroll', function () {
				var parallaxElement = $('.discover-left-thumb.is-inview'),
					parallaxQuantity = parallaxElement.length
				window.requestAnimationFrame(function () {
					for (var i = 0; i < parallaxQuantity; i++) {
						var currentElement = parallaxElement.eq(i),
							windowTop = $(window).scrollTop(),
							elementTop = currentElement.offset().top,
							elementHeight = currentElement.height(),
							viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
							scrolled = windowTop - elementTop + viewPortHeight
						currentElement.css({
							transform: 'translate3d(0,' + scrolled * -0.11 + 'px, 0)',
						})
					}
				})
			})
		}

		$('.cta-wrap a').bind('click', 'touchend', function (e) {
			e.preventDefault()
			$('.cta-content-wrap').slideToggle()
		})

		$(window).scroll(function () {
		    var theta = $(window).scrollTop() / 300 % Math.PI;
		    $('.discover-left-tittle img, .rotating-sun, .package-main-content img, .animated-sun img, .unique-content img').css({
		        transform: 'rotate(' + theta + 'rad)'
		    });
		});

		if ($('.special-package').length) {
			if ($('.special-package > .package-item').length > 1) {
				$('.special-package').slick({
					arrows: false,
					infinite: true,
					autoplay: false,
					navigation: false,
					dots: false,
					centerMode: false,
					focusOnSelect: true,
					responsive: [
						{
							breakpoint: 9999999,
							settings: 'unslick',
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								autoplay: false,
								speed: 1500,
								swipe: true,
							},
						},
					],
				})
				$(window).on('resize', function () {
					$('.special-package').slick('resize')
				})
			}
		}

		// ANIMATION CHECK IF IN VIEW
		// var $animation_elements = $('.anim-el')
		// var $window = $(window)

		// function check_if_in_view() {
		// 	var window_height = $window.height()
		// 	var insetAmount = window_height / 10
		// 	var window_top_position = $window.scrollTop()
		// 	var window_bottom_position = window_top_position + window_height - insetAmount

		// 	$.each($animation_elements, function () {
		// 		var $element = $(this)
		// 		var element_height = $element.outerHeight()
		// 		var element_top_position = $element.offset().top
		// 		var element_bottom_position = element_top_position + element_height

		// 		//check to see if this current container is within viewport
		// 		if (element_top_position <= window_bottom_position) {
		// 			$element.addClass('is-inview')
		// 		}
		// 	})
		// }
		// $window.on('scroll orientationchange resize', check_if_in_view)
		// $window.trigger('scroll')

		// ANIMATION IN-VIEW REPLACEMENT
		let targets = document.querySelectorAll('.anim-el');
		function handleIntersection(entries) {
			entries.map((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-inview')
				} else {
					//entry.target.classList.remove('is-inview')
				}
			});
		}
		let observer = new IntersectionObserver(handleIntersection, {rootMargin: '-10%'});
		targets.forEach(target => observer.observe(target));

		// journey
		if ($('.itinerary-accordion').length > 0) {
			$('.itinerary-accordion').each(function () {
				var accordion = $(this)
				accordion.find(' > .itinerary-accordion-heading').on('click', function () {
					accParent = $(this).parent()
					$('.itinerary-accordion').removeClass('accordion-active')
					$('.itinerary-accordion-content').slideUp()
					if (accordion.find('.itinerary-accordion-content:visible').length) {
						$('.itinerary-accordion-content').removeClass('accordion-active')
						$('.itinerary-accordion-content').slideUp()
					} else {
						accParent.addClass('accordion-active')
						accParent.find(' > .itinerary-accordion-content').slideDown()
						// Slide to accordion
						setTimeout(function () {
							$('html, body').animate(
								{
									scrollTop: accParent.offset().top - 100,
								},
								1000
							)
						}, 500)
					}
				})
			})

			$('.add-accordion .itinerary-accordion').slice(0, 3).addClass('shown')
			$('.add-accordion .itinerary-accordion').not('.shown').hide()
			$('.show-all-btn-wrap').hide()
			if ($('.itinerary-accordion').length > 3) {
				$('.show-all-btn-wrap').show()
				$('.show-all-btn-wrap').on('click', function () {
					$('.add-accordion .itinerary-accordion').not('.shown').slideToggle(800)
					$(this).toggleClass('showLess')
				})
			}
			/*
            if ($(window).width() < 769){
                $('.itinerary-accordion-wrap-btn a').on('click',function(e){
                    e.preventDefault();
                    $('.add-accordion .itinerary-accordion').not('.shown').slideToggle(800);
                    $(this).toggleClass('showLess');
                });
            }*/
		}

		//itinerary-slider-item-wrap
		var $slider = $('.itinerary-slider-item-wrap')
		if ($slider.length) {
			// var currentSlide;
			// var slidesCount;
			// var sliderCounter = document.createElement('div');
			// sliderCounter.classList.add('slide-count-wrap');

			// var updateSliderCounter = function (slick, currentIndex) {
			//     currentSlide = slick.slickCurrentSlide() + 1;
			//     slidesCount = slick.slideCount;
			//     $(sliderCounter).html('<span class="current">' + '0' + currentSlide + '</span>' + '<em>' + ' / ' + '</em>' + '<span class="total">' + '0' + slidesCount + '</span>')
			// };

			// $slider.on('init', function (event, slick) {
			//     $slider.append(sliderCounter);
			//     updateSliderCounter(slick);
			// });

			// $slider.on('afterChange', function (event, slick, currentSlide) {
			//     updateSliderCounter(slick, currentSlide);
			// });

			$slider.slick({
				dots: false,
				arrows: false,
				// autoplay: false,
				// fade: true,
				infinite: true,
				navigation: false,
				slidesToShow: 1,
				variableWidth: true,
				swipeToSlide: true,
				draggable: true,
			})
		}

		$(function () {
			if ($('.check-in').length) {
				$('.check-in').datepicker({
					dateFormat: 'd MM yy',
					duration: 'medium',
				})
			}
			if ($('.check-out').length) {
				$('.check-out').datepicker({
					dateFormat: 'd MM yy',
					duration: 'medium',
				})
			}
		})

		// Cursor

		if ($('.animated-cursor').length) {
			$('.animated-cursor').mouseenter(function () {
				$('.circle-cursor').css({
					opacity: 1,
					visibility: 'visible',
				})
				$('.circle-scroll-cursor').css({
					opacity: 0,
					visibility: 'hidden',
				})
			})
			$('.animated-cursor').mouseleave(function () {
				$('.circle-cursor').css({
					opacity: 0,
					visibility: 'hidden',
				})
			})
		}

		/* Cart */
		if ($('select.styled-select').length) {
			$('select.styled-select').selectric({})
		}

		var $_tripContainer = $('div.trip-content-inner')
		var $_tripNav = $('.trip-nav ul li')
		$('.trip-nav ul li').eq(0).addClass('active')
		$_tripContainer.hide()
		$_tripContainer.eq(0).show()
		if ($(window).width() > 767) {
			$('.trip-nav ul li').eq(0).addClass('active')
			$_tripContainer.hide()
			$_tripContainer.eq(0).show()
			$('.trip-nav ul li a').click(function (e) {
				e.preventDefault()
				$_tripNav.removeClass('active')
				$(this).parent().addClass('active')
				$_tripContainer.hide()
				var activeTab = $(this).attr('href')
				$(activeTab).fadeIn(700)
				return false
			})
		}

		$_tripContainer.each(function (i) {
			var $_this = $(this)
			$_this.find('div.trip-prev > a').click(function (e) {
				e.preventDefault()
				$_tripNav.removeClass('active')
				$_tripNav.eq(i - 1).addClass('active')
				$_tripContainer.hide()
				var tabActive = $(this).attr('href')
				$(tabActive).fadeIn(700)
			})
			$_this.find('div.trip-next > a').click(function () {
				$_tripNav.removeClass('active')
				$_tripNav.eq(i + 1).addClass('active')
				$_tripContainer.hide()
				var tabActive = $(this).attr('href')
				$(tabActive).fadeIn(700)
			})
		})

		$('.destination div.trip-next > a, .activities div.trip-next > a, .date-guest div.trip-next > a').click(function (e) {
			e.preventDefault()
		})

		$('.enquire .trip-checkbox').click(function () {
			$('.enquire .trip-checkbox input').prop('checked', true)
		})

		$(".destination .trip-checkbox input[type='checkbox']").click(function () {
			var checkBoxes = []
			$.each($("input[name='tripCheckbox']:checked"), function () {
				checkBoxes.push($(this).val())
			})

			$('.trip-content p dfn').html(checkBoxes.join(', '))
		})

		$('.get-in-touch-input-row, .popup-input-row, .input-col').each(function () {
			var $_this = this
			$('.get-in-touch-input-row, .popup-input-row, .input-col')
				.find('input, textarea')
				.on('keyup', function () {
					var $$_this = $(this)

					if ($$_this.val() == '') {
						$$_this.parent('.get-in-touch-input-row, .popup-input-row, .input-col').removeClass('add_border')
					} else {
						$$_this.parent('.get-in-touch-input-row, .popup-input-row, .input-col').addClass('add_border')
					}
				})
		})
	}) // End ready function.
})(jQuery)

function increaseCount(e, el) {
	var input = el.previousElementSibling
	var value = parseInt(input.value, 10)
	value = isNaN(value) ? 0 : value
	value++
	input.value = value
}

function decreaseCount(e, el) {
	var input = el.nextElementSibling
	var value = parseInt(input.value, 10)
	if (value > 1) {
		value = isNaN(value) ? 0 : value
		value--
		input.value = value
	}
}
