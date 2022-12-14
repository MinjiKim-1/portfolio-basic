/* sliderText - 변수선언 */
const sliderText = document.querySelector('#role #sliderText');
const innerBox = sliderText.querySelector('.inner');
const btns = sliderText.querySelectorAll('.btnBox li');

/* sliderText */
btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		activation(index);
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
