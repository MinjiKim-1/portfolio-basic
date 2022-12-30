/* scroll - 변수선언 */
const sections = document.querySelectorAll('section');
const scrollBase = -window.innerHeight / 3;
const speed = 500;
let posArr = [];
// console.log(sections);

/* scroll */
getPos();
window.addEventListener('resize', getPos);

// intro
window.onload = function () {
	sections[0].classList.add('on');
};

window.addEventListener('scroll', () => {
	activation();
});

function getPos() {
	posArr = [];
	for (const el of sections) posArr.push(el.offsetTop);
	// console.log(posArr);
}

function activation() {
	const scroll = window.scrollY || window.pageYOffset;
	// console.log(scroll);

	sections.forEach((_, idx) => {
		if (scroll >= posArr[idx] + scrollBase) {
			for (const el of sections) el.classList.remove('on');
			sections[idx].classList.add('on');
		}
	});
}

function moveScroll(idx) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[idx],
		duration: speed,
	});
}
