/* FAQ 라디오버튼 변수 선언 */
const menuFaq = document.querySelector('#faq .inner .container');
const radioBox = menuFaq.querySelectorAll('input[name=acc]');
const close = menuFaq.querySelectorAll('.tab label');
// console.log(radioBox[0].checked);
// console.log(close);

/* Community 긴 글 자르기 변수 선언 */
let titles = document.querySelectorAll('#community td a');
// console.log(titles);

/* scroll - 변수선언 */
const sections = document.querySelectorAll('section');
const base = -300;

/* FAQ 라디오버튼 체크 해제 */
close.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		if (radioBox[index].checked) {
			e.preventDefault();
			radioBox[index].checked = false;
		}
	});
});

/* Community 긴 글 자르기 */
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	console.log(width);
	if (width < 540) {
		titles.forEach((el, index) => {
			if (titles[index].innerText.length > 30) {
				titles[index].innerText = titles[index].innerText.substr(0, 30) + '...';
				// console.log(titles[0].innerText);
			}
		});
	}
});

/* scroll */
let posArr = [];

console.log(sections);
const posBox1 = sections[0].offsetTop;
const posBox2 = sections[1].offsetTop;

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
