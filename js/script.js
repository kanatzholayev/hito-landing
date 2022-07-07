// Accordion

const acc = document.getElementsByClassName("c-accordion__btn");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		const panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}

// Typing text animation

const typedTextSpan = document.querySelector(".c-typed-text");
const cursorSpan = document.querySelector(".c-cursor");

const textArray = [
	"a ten-page manual",
	"a degree in engineering",
	"a geeky friend",
	"to trawl the entire web",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
	if (charIndex < textArray[textArrayIndex].length) {
		if (!cursorSpan.classList.contains("typing"))
			cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	} else {
		cursorSpan.classList.remove("typing");
		setTimeout(erase, newTextDelay);
	}
}

function erase() {
	if (charIndex > 0) {
		if (!cursorSpan.classList.contains("typing"))
			cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(
			0,
			charIndex - 1
		);
		charIndex--;
		setTimeout(erase, erasingDelay);
	} else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if (textArrayIndex >= textArray.length) textArrayIndex = 0;
		setTimeout(type, typingDelay + 1100);
	}
}

// Toggle connection animation on scroll

const block = document.querySelector(".c-info__nfc");
const blockTrigger = block.nextElementSibling;
const connectionVideo = document.querySelector(".c-connection-video");

let played = false;

function scrolListener(e) {
	const screenTop = document.scrollingElement.scrollTop;
	const screenBottom = screenTop + innerHeight;
	const textTop = blockTrigger.getBoundingClientRect().top;

	if (textTop < screenBottom && textTop < screenTop) {
		if (window.innerWidth > 767) {
			block.classList.add("animate");
			setTimeout(() => {
				if (!played) {
					connectionVideo.play();
					played = true;
				}
			}, 6000);
		} else {
			block.classList.remove("animate");
			document.querySelector(".c-connection-video--loop").classList.add("hide");
			document
				.querySelector(".c-connection-video--no-loop")
				.classList.add("show");
		}
	}
}

window.addEventListener("scroll", function (e) {
	scrolListener();
});

// Stars animation

function initializeStars(parent, whiteStarsCount, blueStarsCount) {
	for (let i = 0; i < whiteStarsCount; i++) {
		const starDiv = document.createElement("div");
		starDiv.classList.add("c-white-star");
		parent.appendChild(starDiv);
	}
	for (let i = 0; i < blueStarsCount; i++) {
		const starDiv = document.createElement("div");
		starDiv.classList.add("c-blue-star");
		parent.appendChild(starDiv);
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPositions(parent) {
	const whiteStars = parent.querySelectorAll(".c-white-star");
	const blueStars = parent.querySelectorAll(".c-blue-star");

	const parentWidth = parent.offsetWidth;
	const parentHeight = parent.offsetHeight;

	whiteStars.forEach((elem) => {
		elem.style.top = `${getRandomInt(0, parentHeight)}px`;
		elem.style.left = `${getRandomInt(0, parentWidth)}px`;
		elem.style.animationDelay = `${getRandomInt(0, 4000)}ms`;
	});
	blueStars.forEach((elem) => {
		elem.style.top = `${getRandomInt(0, parentHeight)}px`;
		elem.style.left = `${getRandomInt(0, parentWidth)}px`;
		elem.style.animationDelay = `${getRandomInt(0, 4000)}ms`;
	});
}

function animateStars(parent, whiteStarsCount, blueStarsCount) {
	initializeStars(parent, whiteStarsCount, blueStarsCount);
	setPositions(parent);
}

animateStars(document.querySelector(".c-subtitle-block"), 10, 10);

document.querySelectorAll(".c-explore__card").forEach((elem) => {
	animateStars(elem, 5, 5, 3000);
});

// DOM Load

document.addEventListener("DOMContentLoaded", function () {
	scrolListener();

	document.getElementById("autoplay").play();

	setTimeout(() => {
		checkCookie();
	}, 2000);

	// On DOM Load initiate the effect
	if (textArray.length) setTimeout(type, newTextDelay + 250);
});
