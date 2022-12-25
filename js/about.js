/* sliderText - 변수선언 */
const sliderText = document.querySelector('#role #sliderText');
const innerBox = sliderText.querySelector('.inner');
const btns = sliderText.querySelectorAll('.btnBox li');

/* scroll - 변수선언 */
const sections = document.querySelectorAll('section');
const base = -300;

/* sliderText */
btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		activation(index);
	});
});

/* scroll */
let posArr = [];

console.log(sections);
const posBox1 = sections[0].offsetTop;
const posBox2 = sections[1].offsetTop;
const posBox3 = sections[2].offsetTop;
const posBox4 = sections[3].offsetTop;

window.onload = function () {
	sections[0].classList.add('on');
};

for (let el of sections) {
	posArr.push(el.offsetTop);
}
console.log(posArr);

window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;

	sections.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			sections.forEach((el, index) => {
				el.classList.remove('on');
				sections[index].classList.remove('on');
			});
			sections[index].classList.add('on');
		}
	});
});

/* 함수 패키징 */
function activation(index) {
	new Anim(innerBox, {
		prop: 'margin-left',
		value: -100 * index + '%',
		duration: 700,
	});

	for (let btn of btns) {
		btn.classList.remove('on');
	}
	btns[index].classList.add('on');
}
