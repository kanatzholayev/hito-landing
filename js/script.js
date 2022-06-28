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
			if (!played) {
				document.querySelector(".c-connection-video--mobile").play();
				played = true;
			}
		}
	}
}

window.addEventListener("scroll", function (e) {
	scrolListener();
});

document.addEventListener("DOMContentLoaded", function () {
	scrolListener();
	document.getElementById("autoplay").play();
	document.querySelector(".c-connection-video--mobile").play();

	// On DOM Load initiate the effect
	if (textArray.length) setTimeout(type, newTextDelay + 250);
});
