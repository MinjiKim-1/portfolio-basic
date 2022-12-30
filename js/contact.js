/* contact form 변수 선언 */
const form = document.querySelector('#contact #mailform');
const btnSubmit = form.querySelector('input[type=submit]');
console.log(form);
console.log(btnSubmit);

/* kakao map 변수 선언 */
var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('#location .traffic li')[0];
const t_off = document.querySelectorAll('#location .traffic li')[1];
const branch_btns = document.querySelectorAll('#location .branch li');

/* contact form */
btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('name', 1)) e.preventDefault();
	if (!isEmail('email', 20)) e.preventDefault();
	if (!isSelect('purpose')) e.preventDefault();
	if (!isPhone('phone', 7)) e.preventDefault();
	if (!isTxt('message', 20)) e.preventDefault();
	// 텍스트 인증 함수가 참이 아니라면(!) 멈추게 설정
});

/* type이 text인 form 요소 인증함수 */
function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		// 입력한 value의 글자수가 설정한 len의 값 이상이라면?

		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`Please enter at least ${len} characters.`);
		input.closest('td').append(errMsg);

		return false;
	}
}

/* type이 text인데 email인 요소 인증함수 */
function isEmail(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		// @가 있는가?

		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append("Please enter a full email address including '@'");
		input.closest('td').append(errMsg);

		return false;
	}
}

/* select 인증함수 */
function isSelect(el) {
	let sel = form.querySelector(`[name=${el}]`);
	let sel_index = sel.options.selectedIndex;
	let val = sel[sel_index].value;

	if (val !== '') {
		// 밸류값이 비어있지 않다면? (!== 같지 않다면)

		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('Please check the required items.');
		sel.closest('td').append(errMsg);

		return false;
	}
}

/* type이 text인데 phone인 요소 인증함수 */
function isPhone(el, len) {
	let input = form.querySelector(`[name=${el}]`);
	let num = input.value;

	if (num.length >= len && /0-9/.test(num)) {
		// input으로 입력받은 글자가 len개 이상 & 숫자가 있는가?

		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`Please enter at least ${len} numbers.`);
		input.closest('td').append(errMsg);

		return false;
	}
}

mapOption = {
	center: new kakao.maps.LatLng(37.5632348, 126.9846716),
	level: 3,
};

/* 지도 생성 */
var map = new kakao.maps.Map(mapContainer, mapOption);

/* 마커 생성 */
var markerOptions = [
	{
		title: 'Main Store',
		latLng: new kakao.maps.LatLng(37.5632348, 126.9846716),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(152, 85),
		imgPos: { offset: new kakao.maps.Point(76, 55) },
		button: branch_btns[0],
	},
	{
		title: 'Branch 1',
		latLng: new kakao.maps.LatLng(36.3525117, 127.3779744),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(152, 85),
		imgPos: { offset: new kakao.maps.Point(76, 55) },
		button: branch_btns[1],
	},
	{
		title: 'Branch 2',
		latLng: new kakao.maps.LatLng(35.1529425, 129.0595638),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(152, 85),
		imgPos: { offset: new kakao.maps.Point(76, 55) },
		button: branch_btns[2],
	},
];

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latLng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	markerOptions[i].button.onclick = (e) => {
		e.preventDefault();

		for (let k = 0; k < markerOptions.length; k++) {
			markerOptions[k].button.classList.remove('on');
		}
		markerOptions[i].button.classList.add('on');

		moveTo(markerOptions[i].latLng);
	};
}

/* 화면이 resize 될 경우 지도 위치를 자동 재정렬하는 함수 */
window.onresize = () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');

	map.setCenter(markerOptions[active_index].latLng);
};

/* 교통정보 표시 */
t_on.addEventListener('click', (e) => {
	e.preventDefault();
	if (!t_on.classList.contains('on')) {
		t_on.classList.toggle('on');
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	} else {
		t_on.classList.toggle('on');
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}
});

/* 지도타입 전환 */
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* 확대축소이동 막기 */
let drag = true;
let zoom = true;

setDraggable(drag);
setZoomable(zoom);

function setDraggable(draggable) {
	map.setDraggable(draggable);
}
function setZoomable(zoomable) {
	map.setZoomable(zoomable);
}

/* 지도 출력시 좌표값을 중간으로 고정시키는 함수 */
function moveTo(target) {
	var moveLatlng = target;
	map.setCenter(moveLatlng);
}
