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

animateStars(document.querySelector(".c-subtitle-block"), 50, 50);

document.querySelectorAll(".c-explore__card").forEach((elem) => {
	animateStars(elem, 20, 20, 3000);
});

// animate big stars

function initializeBigStars(parent, count) {
	for (let i = 0; i < count; i++) {
		const star = document.createElement("div");
		star.classList.add("c-big-star");
		star.innerHTML = `
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="2" height="2" transform="matrix(-1 0 0 1 9 3)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 7 5)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 5 3)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 9 7)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 5 7)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 2 0)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 12 10)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 12 0)" fill="#252926"/>
			<rect width="2" height="2" transform="matrix(-1 0 0 1 2 10)" fill="#252926"/>
		</svg>		
		`;
		parent.appendChild(star);
	}
}

function setBigStarPositions(parent) {
	const stars = parent.querySelectorAll(".c-big-star");

	const parentWidth = parent.offsetWidth;
	const parentHeight = parent.offsetHeight;

	stars.forEach((elem) => {
		elem.style.top = `${getRandomInt(0, parentHeight)}px`;
		elem.style.left = `${getRandomInt(0, parentWidth)}px`;
		elem.style.animationDelay = `${getRandomInt(0, 2000)}ms`;
		elem.style.animationDuration = `${getRandomInt(5000, 10000)}ms`;
		x = Math.floor(Math.random() * 2) == 0;
		if (x) {
			elem.style.animationName = "rotate-stars-reverse";
			console.log("hi");
		} else {
			elem.style.animationName = "rotate-stars";
		}
	});
}

function animateBigStars(parent, count) {
	initializeBigStars(parent, count);
	setBigStarPositions(parent);
}

animateBigStars(document.querySelector(".c-info"), 10);

// DOM Load

document.addEventListener("DOMContentLoaded", function () {
	scrolListener();

	document.getElementById("autoplay").play();

	// On DOM Load initiate the effect
	if (textArray.length) setTimeout(type, newTextDelay + 250);
});
