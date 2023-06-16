lazyload($('img[data-src]'));

// смена телефона
let phoneChanges = document.querySelectorAll('.phone-change');
phoneChanges.forEach(function (phoneChange) {
	let phoneFirst = phoneChange.firstElementChild;
	let phoneLast = phoneChange.lastElementChild;
	let currentdate = new Date();
	var oneJan = new Date(currentdate.getFullYear(), 0, 1);
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
	var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
	if (result % 2 === 1) {
		phoneFirst.classList.add('d-none');
	} else {
		phoneLast.classList.add('d-none');
	}
})

let header = document.querySelector('header')
// прилипание шапки
window.addEventListener('scroll', function () {
	let btn = header.querySelector('.header__btn');
	if (window.pageYOffset > 90) {
		header.classList.add('header--fixed');
		btn.classList.remove('main-btn--white');
		btn.classList.add('main-btn--green');
	} else {
		header.classList.remove('header--fixed');
		btn.classList.add('main-btn--white');
		btn.classList.remove('main-btn--green');
	}
});


let nav = document.querySelector('.nav');
window.addEventListener('resize', function () {
	if (window.innerWidth > 768 && nav.classList.contains('nav--active')) {
		nav.classList.remove('nav--active');
		header.classList.remove('header--active');
		document.body.classList.remove('lock');
	}
})

let burger = document.querySelector('.header__burger');
burger.addEventListener('click', function () {
	burger.classList.toggle('burger--active');
	nav.classList.toggle('nav--active');
	header.classList.toggle('header--active');
	document.body.classList.toggle('lock');

	let links = nav.querySelectorAll('.nav__link');
	links.forEach(function (link) {
		link.addEventListener('click', function () {
			closeMenu();
			header.classList.remove('header--active');
		})
	})
})

function closeMenu() {
	burger.classList.remove('burger--active');
	nav.classList.remove('nav--active');
	document.body.classList.remove('lock');
}

// checkbox 
let checkbox = document.querySelectorAll('.agree__checkbox');
checkbox.forEach(function (item) {
	let mainBtn = item.closest('form').querySelector('.main-btn');
	item.classList.add('check');

	item.addEventListener('click', function () {
		item.classList.toggle('check');
		if (!item.classList.contains('check')) {
			mainBtn.setAttribute('disabled', 'disabled');
		} else {
			mainBtn.removeAttribute('disabled', 'disabled');
		}
		mainBtn.classList.toggle('disabled');
	})
})

// кнопка наверх
let heightOfHero = document.querySelector('.hero').offsetHeight;
let btnUp = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
	if (window.pageYOffset > heightOfHero - 400) {
		btnUp.classList.add('active')
	} else {
		btnUp.classList.remove('active')
	}
});
if (btnUp) {
	btnUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	})
}

// select
let select = document.querySelectorAll('select');
select.forEach(function (item) {
	if (item) {
		customSelect(item);
	}
})

// select с соцсетями
let selectSocial = document.querySelectorAll('.select-social');
selectSocial.forEach(function (selectWrap) {
	let select = selectWrap.querySelector('select');
	let selectImg = selectWrap.querySelector('.select-social__img');

	select.addEventListener('click', function () {
		selectImg.classList.toggle('active');
	})

	select.addEventListener('change', function () {
		let socialItem = selectImg.querySelectorAll('.social__item');
		socialItem.forEach((item) => {
			item.classList.remove('active');
		})
		if (select.value == "WhatsApp") {
			selectImg.querySelector('.social__item-whatsapp').classList.add('active');
		}
		if (select.value == "Telegram") {
			selectImg.querySelector('.social__item-telegram').classList.add('active');
		}
	});
})

// маска на телефон
$("input[type='tel']").mask('+7(999)999-99-99');
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g.test(value);
});

// tabs
document.querySelectorAll('.catalog__tab').forEach(function (tabsBtn) {
	tabsBtn.addEventListener('click', function (e) {
		const path = e.currentTarget.dataset.path;
		document.querySelectorAll('.catalog__tab').forEach(function (btn) {
			btn.classList.remove('active')
		});
		e.currentTarget.classList.add('active');
		document.querySelectorAll('.catalog__list').forEach(function (tabsBtn) {
			tabsBtn.classList.remove('active')
		});
		document.querySelector(`[data-target="${path}"]`).classList.add('active');
	});
});

// tabs in quiz
document.querySelectorAll('.quiz-item--final .quiz-option').forEach(function (inputBtn) {
	inputBtn.addEventListener('click', function (e) {
		const path = e.currentTarget.dataset.send;
		document.querySelectorAll('.quiz-item--final .quiz-option').forEach(function (btn) {
			btn.classList.remove('active')
		});
		e.currentTarget.classList.add('active');
		document.querySelectorAll('.quiz-item__input-wrap').forEach(function (inputBtn) {
			inputBtn.classList.remove('active')
		});
		document.querySelector(`[data-input="${path}"]`).classList.add('active');
	});
});

// каталог
let catalogItems = document.querySelectorAll('.catalog-item');
catalogItems.forEach(function (catalog) {
	let title = catalog.querySelector('.catalog-item__name');

	title.addEventListener('click', function () {
		catalog.classList.toggle('active');
		let bodyCatalog = catalog.querySelector('.catalog-item__body');
		if (bodyCatalog.style.maxHeight) {
			bodyCatalog.style.maxHeight = null;
		} else {
			bodyCatalog.style.maxHeight = bodyCatalog.scrollHeight / 5 + "rem";
		}
	})
})

// валидация формы
$('[data-form-validate-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true,
			},
			email: {
				required: true
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

$('[data-download-form-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true
			},
			email: {
				required: true
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');
			var link = document.createElement('a');
			var file = form.attr('data-download-form-js');

			link.setAttribute('href', file);
			link.setAttribute('download', '');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
					link.click();
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});


// плавная прокрутка
$("[data-anchor-btn-js]").on("click", function (event) {
	event.preventDefault();
	var headerHeight = $('header').height();

	var target = $(this).attr('href');

	if ($(target).length) {
		if (window.innerWidth > 768) {
			var offset = ($(target).offset().top) - 150;
		} else {
			var offset = ($(target).offset().top) - headerHeight - 50;
		}

		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();

		if (offset > scroll) {
			var time = Math.round(offset / windowHeight) * 500;
		} else {
			var time = Math.round((scroll - offset) / windowHeight) * 300;
		}

		$('body,html').animate({
			scrollTop: offset
		}, time);
	} else {
		window.location.href = "index.html";
	}
});

$('.nav__list a').on("click", handler);
$(function () {
	handler(location.hash);
});

function handler(event) {
	var hash = typeof event === 'string' ? event : event.target.hash;
	var headerHeight = $('header').height();

	if (!hash)
		return

	var tag = $(hash);

	if (tag.length) {
		var offset = tag.offset().top - headerHeight - 50;
		$('html, body').stop().animate({
			scrollTop: offset
		}, 2000);
	}
}

window.onhashchange = locationHashChanged;
function locationHashChanged() {
	if (location.hash) {
		history.pushState("", document.title, window.location.pathname);
	}
}

$('.section-title').not('h1').not('.no-anim').addClass('animation');


// квиз
var number = 0;
var maxNumber = $(".quiz-item").length;
var $element = $(".quiz-item").find("input");
var btnPrev = $(".quiz-btn--prev");
var btnNext = $('.quiz-btn--next');
var isValid;
var dataBlock;
var activeSlide = [];

$element.on('change input', function (e) {
	var value = $(this).val().trim();
	isValid = value !== "";
	btnActive(!isValid);
});

function btnActive(isValid) {
	if (number === 0) {
		btnPrev.prop('disabled', 'false');
		btnNext.prop('disabled', isValid);
	} else {
		btnPrev.prop('disabled', false);
		if (activeSlide[number] === true || isValid === false) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}
	}
}

let quizSingle = document.querySelectorAll('[data-quiz-single-answer]');
quizSingle.forEach(function (item) {
	// let inputs = item.querySelectorAll('input[type="radio"]');
	let inputs = item.querySelectorAll('input');

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("click", function () {
			for (let j = 0; j < inputs.length; j++) {
				if (inputs[j].getAttribute('checked') == 'checked') {
					inputs[j].removeAttribute('checked')
				}
			};
			inputs[i].setAttribute('checked', 'checked')
		});
	}
})

// progressbar
function progress(num) {
	let quizText = [
		"Пояснение от менеджера по 1 вопросу, Пояснение от менеджера по 1 вопросу",
		"Пояснение от менеджера по 2 вопросу, Пояснение от менеджера по 2 вопросу",
		"Пояснение от менеджера по 3 вопросу, Пояснение от менеджера по 3 вопросу",
		"Пояснение от менеджера по 4 вопросу, Пояснение от менеджера по 4 вопросу",
		"Пояснение от менеджера по 5 вопросу, Пояснение от менеджера по 5 вопросу",
	];
	const percent = parseInt((100 / maxNumber) * (num + 1));
	$('.js-quiz').text(num + 1);
	$('.quiz-plate__text').html(quizText[num]);
	$('.quiz__progress-inner').css('width', (percent === 100 ? 98.5 : percent) + '%');
}
progress(0);

// btn
function btnClick() {
	btnPrev.on('click', function (event) {
		event.preventDefault();
		--number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn();
		btnActive(!isValid);
		if (number === 0) {
			btnPrev.hide();
		}
		progress(number);
		// animateTop();
		btnNext.blur();
	});

	btnNext.on('click', function (event) {
		event.preventDefault();
		let quizScroll = $(".quiz__inner").offset().top - 100;

		activeSlide[number] = true;
		++number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn(1000);
		btnActive(!isValid);

		if (activeSlide[number] === true) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}

		if (number > 0) {
			btnPrev.show();
		}

		$('html, body').animate({
			scrollTop: quizScroll
		}, 1000);

		progress(number);

		if (number === maxNumber - 1) {
			$(".quiz__bottom").hide();
			$(".quiz__right").hide();
			$(".quiz__progress-text").html('<b>Тест пройден на 100%</b>');

			// $('.js-quiz').text(number);
			setTimeout(function () {
				quizFinalStep();
			}, 500)
			$('.quiz__inner').addClass('final');
		}

		setTimeout(function () {
			btnNext.trigger("blur");
		}, 500);
	});
}
btnClick();

var quizFinalStep = function () {
	// $('.quiz__loader').addClass('visible');
	$('.quiz__body').addClass('blur');

	setTimeout(function () {
		$('.quiz-item--final').addClass('visible');
	}, 1500)

	setTimeout(function () {
		$('.quiz__body').removeClass('blur');
		// $('.quiz__loader').removeClass('visible');
	}, 1000)
}

$('input[name^="quiz"]').not('input[name^="quiz4"], input[name^="quiz6"]').on('change', function () {
	setTimeout(function () {
		btnNext.click();
	}, 500);
});


function inputValid(item) {
	if (item.value != '' && item.value > 0) {
		item.classList.add('checked')
	} else {
		item.classList.remove('checked')
	}
}

let quiz4Inputs = document.querySelectorAll('input[name="quiz4"]');
if (quiz4Inputs.length > 0) {
	inputWidth = document.getElementById('quiz4-1');
	inputLenght = document.getElementById('quiz4-2');
	inputSkip = document.getElementById('quiz4-3');
	if (inputWidth.value != 0 && inputLenght.value != 0 || inputSkip.getAttribute('checked') == 'checked') {
		btnNext.prop('disabled', false);
	} else {
		btnNext.prop('disabled', true);
	}

	quiz4Inputs.forEach(function (input) {
		input.onchange = function () {
			if (inputWidth.value != 0 && inputLenght.value != 0 || inputSkip.getAttribute('checked') == 'checked') {
				btnNext.prop('disabled', false);
			} else {
				btnNext.prop('disabled', true);
			}
		};
	})
}


const valuesOfWidth = [0, 200, 300, 400, 600, 800, 900, 1000];
const sliderWidth = document.getElementById('quiz4-1');
let sliderRowOfNumbers = document.querySelectorAll('.quiz-option__range');
if (sliderRowOfNumbers.length > 0 && sliderWidth) {
	valuesOfWidth.forEach(function (item) {
		let p = document.createElement('p');
		p.className = "quiz-option__number";
		p.style.left = (100 / valuesOfWidth.length) * valuesOfWidth.indexOf(item) + "%";
		p.innerHTML = item;
		sliderRowOfNumbers[0].append(p);
	})

	sliderWidth.max = valuesOfWidth.length - 1;
	sliderWidth.oninput = function () {
		// console.log(valuesOfWidth[this.value]);
	};
	sliderWidth.oninput();
}


const valuesOfLenght = [0, 1000, 1500, 2000, 3000, 3500, 4000, 4500];
const sliderLenght = document.getElementById('quiz4-2');
if (sliderRowOfNumbers.length > 0 && sliderLenght) {
	valuesOfLenght.forEach(function (item) {
		let p = document.createElement('p');
		p.className = "quiz-option__number";
		p.style.left = (100 / valuesOfLenght.length) * valuesOfLenght.indexOf(item) + "%";
		p.innerHTML = item;

		if (!valuesOfLenght.indexOf(item) == 0 || !valuesOfLenght.indexOf(item) == valuesOfLenght.length - 1) {
			p.style.marginLeft = "-0.6rem";
		}
		sliderRowOfNumbers[1].append(p);
	})

	sliderLenght.max = valuesOfLenght.length - 1;
	sliderLenght.oninput = function () {
		// console.log(valuesOfLenght[this.value]);
	};
	sliderLenght.oninput();
}


// слайдеры
let slidersContacts = document.querySelectorAll('.swiper-scroll');
slidersContacts.forEach(function (slider) {
	let swiper = new Swiper(slider, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,
		mousewheel: true,

		navigation: {
			nextEl: slider.closest('section').querySelector('.slider-btn--next'),
			prevEl: slider.closest('section').querySelector('.slider-btn--prev'),
		},

		pagination: {
			el: slider.closest('section').querySelector('.swiper-pagination'),
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return '0' + number;
			},
			formatFractionTotal: function (number) {
				return '0' + number;
			}
		},
	});
})

var init = false;
var swiper;
function swiperWarranty() {
	if (window.innerWidth <= 768) {
		if (!init) {
			init = true;
			swiper = new Swiper(".warranty__swiper", {
				loop: false,
				speed: 600,
				centeredSlides: false,
				touchRatio: 1,
				slidesPerView: 'auto',
				freeMode: true,
				mousewheel: true,
				navigation: {
					nextEl: document.querySelector('.warranty__swiper').closest('section').querySelector('.slider-btn--next'),
					prevEl: document.querySelector('.warranty__swiper').closest('section').querySelector('.slider-btn--prev'),
				},
				pagination: {
					el: document.querySelector('.warranty__swiper').closest('section').querySelector('.swiper-pagination'),
					type: 'fraction',
					formatFractionCurrent: function (number) {
						return '0' + number;
					},
					formatFractionTotal: function (number) {
						return '0' + number;
					}
				},
			});
		}
	} else if (init) {
		swiper.destroy();
		init = false;
	}
}

if (document.querySelector('.warranty__swiper')) {
	swiperWarranty();
	window.addEventListener("resize", swiperWarranty);
}


// анимация подгрузки контента при скролле
var titleAnimation = function () {
	$('.animation').each(function () {
		var element = $(this);

		if (!(element.hasClass('visible'))) {
			var scroll = $(window).scrollTop(),
				position = element.offset().top,
				windowHeight = $(window).height();

			if ((scroll + (windowHeight * 4 / 5)) > position) {
				element.addClass('visible');
			};
		};
	});
}
$(document).ready(function () {
	titleAnimation();
	setTimeout(function () {
		$('h1').addClass('visible');
	}, 500)
});
$(window).on('scroll', function () {
	titleAnimation();
});

// анимация цифр
$(function () {
	$(".num-anim span").each(function () {
		let numb = $(this);
		let maxNumb = numb.attr('data-max')
		$(window).scroll(function onScroll() {
			if ($(window).scrollTop() > (numb.offset().top - $(window).height())) {
				$(window).off("scroll", onScroll);
				$({ numberValue: 0 }).animate({ numberValue: maxNumb }, {
					duration: 3000,
					easing: "linear",
					step: function (val) {
						numb.html(Math.ceil(val));
					}
				});
			}
		})
	});
})


// faq
let faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(function (faq) {
	faq.addEventListener('click', function () {
		faq.classList.toggle('active');
		let answer = faq.querySelector('.faq__answer');
		if (answer.style.maxHeight) {
			answer.style.maxHeight = null;
		} else {
			answer.style.maxHeight = answer.scrollHeight / 5 + "rem";
		}
	})
})

// popup
let callbackPopup = document.querySelector('.popup-callback');
let openCallbackPopup = document.querySelectorAll('.callback-open');

let confPopup = document.querySelector('.popup-conf');
let openConfPopup = document.querySelectorAll('.conf');

let legalPopup = document.querySelector('.popup-legal');
let openLegalPopup = document.querySelectorAll('.legal-open');

let mapPopup = document.querySelector('.popup-map');
let openMapPopup = document.querySelectorAll('.map-open');

// открытие popup
openPopup(openConfPopup, confPopup);
openPopup(openCallbackPopup, callbackPopup);
openPopup(openLegalPopup, legalPopup);
openPopup(openMapPopup, mapPopup);

function openPopup(btnOpen, popup) {
	btnOpen.forEach(function (item) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			popup.classList.add('active');
			if (!document.body.classList.add('lock')) document.body.classList.add('lock');
		});
	})
}

// закрытие popup
let popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
	let body = popup.querySelector(".popup__body");
	let close = popup.querySelector(".popup__close");

	if (!popup.classList.contains('popup-cookie')) {
		popup.addEventListener('click', (e) => {
			const withinBoundaries = e.composedPath().includes(body);
			if (!withinBoundaries) closePopup(popup);
		})
	}
	close.addEventListener('click', function () {
		closePopup(popup)
	});

})

function closePopup(popup) {
	popup.classList.remove('active');
	if (!nav.classList.contains('nav--active')) document.body.classList.remove('lock');
}


var hideTheModal = $.cookie('hideTheModal');
if (hideTheModal == null) {
	setTimeout(function () {
		$('.popup-cookie').addClass('active');
		$('.popup-cookie').find('.popup__btn').click(function () {
			$.cookie('hideTheModal', 'true', { expires: 30, path: '/' });
			$('.popup-cookie').removeClass('active');
		});
	}, 3000);
}


const sliderEl = document.querySelectorAll("input[type='range']");
sliderEl.forEach(function (range) {
	const tempSliderValue = range.value;
	const progress = (tempSliderValue / range.max) * 100;
	range.style.background = `linear-gradient(to right, #42B214 ${progress}%, #cacaca ${progress}%)`;

	range.addEventListener("input", (event) => {
		const tempSliderValue = event.target.value;
		const progress = (tempSliderValue / range.max) * 100;
		range.style.background = `linear-gradient(to right, #42B214 ${progress}%, #cacaca ${progress}%)`;
	})
})

// липкое боковое меню
let sideMenu = document.querySelector('.sidemenu');
if (sideMenu) {
	let sideClose = sideMenu.querySelector('.sidemenu__close');
	let sideBody = sideMenu.querySelector('.sidemenu__body');
	let sideTop = sideMenu.querySelector('.sidemenu__top');
	sideBody.style.maxHeight = sideBody.scrollHeight + "rem";

	window.addEventListener('resize', function () {
		sideBody.style.maxHeight = sideBody.scrollHeight + "rem";
	})

	sideClose.addEventListener('click', function () {
		if (sideBody.style.maxHeight == null && !sideTop.classList.contains('active')) {
			sideBody.style.maxHeight = sideBody.scrollHeight + "rem";
		} else {
			sideBody.style.maxHeight = null;
			sideMenu.classList.add('hidden');
		}

		setTimeout(function () {
			sideClose.classList.add('close');
			sideTop.classList.add('close');
		}, 1200)

		if (sideMenu.classList.contains('hidden')) {
			setTimeout(function () {
				sideClose.classList.remove('close');
				sideTop.classList.remove('close');
				sideMenu.classList.remove('hidden');
			}, 15000)
		}
	})

	sideTop.addEventListener('click', function () {
		sideTop.classList.toggle('active');
		if (sideBody.style.maxHeight) {
			sideBody.style.maxHeight = null;
		} else {
			sideBody.style.maxHeight = sideBody.scrollHeight + "rem";
		}
	})
}