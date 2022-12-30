/* FAQ 라디오버튼 변수 선언 */
const menuFaq = document.querySelector('#faq .inner .container');
const radioBox = menuFaq.querySelectorAll('input[name=acc]');
const close = menuFaq.querySelectorAll('.tab label');
// console.log(radioBox[0].checked);
// console.log(close);

/* Community 긴 글 자르기 변수 선언 */
let titles = document.querySelectorAll('#community td a');
// console.log(titles);

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
