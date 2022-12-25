/* 검색바 변수선언 */
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');

/* 이미지프레임, 로딩바 변수선언 */
const body = document.querySelector('body');
const frame = document.querySelector('#imgList');
const loading = document.querySelector('.loading');

/* 데이터 가져오기 변수선언 */
const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const key = '5183eac5b547d63aa66a1e2877f26e22';
const per_page = 50;

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

/* 리스트 데이터 가져오는 함수 호출 */
callData(url);

/* 검색바 */
btnSearch.addEventListener('click', (e) => {
	let tag = input.value;
	tag = tag.trim();

	const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

	if (tag != '') {
		callData(url);
	} else {
		// 리스트 화면 클리어
		frame.innerHTML = '';
		frame.classList.remove('on');
		frame.style.height = 'auto';

		/*에러메세지 중복출력 방지*/
		const errMsgs = frame.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) frame.parentElement.querySelector('p').remove();

		/*에러메세지 출력*/
		const errMsg = document.createElement('p');
		errMsg.append('There are no search words. Please re-enter.');
		frame.parentElement.append(errMsg);
	}
});

/* 검색바 키보드 동작 */
input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		let tag = input.value;
		tag = tag.trim();

		const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

		if (tag != '') {
			callData(url);
		} else {
			frame.innerHTML = '';
			frame.classList.remove('on');
			frame.style.height = 'auto';

			const errMsgs = frame.parentElement.querySelectorAll('p');
			if (errMsgs.length > 0) frame.parentElement.querySelector('p').remove();

			const errMsg = document.createElement('p');
			errMsg.append('There are no search words. Please re-enter.');

			frame.parentElement.append(errMsg);
		}
	}
});

/* 큰 이미지 팝업 */
frame.addEventListener('click', (e) => {
	e.preventDefault();

	if (e.target == frame) return;

	let target = e.target.closest('.item').querySelector('.thumb');

	if (e.target == target) {
		let imgSrc = target.parentElement.getAttribute('href');

		let pop = document.createElement('aside');
		pop.classList.add('pop');

		let pops = `
        <div class="con">
            <img src="${imgSrc}">
        </div>
        <span class="close">close</span>
        `;
		pop.innerHTML = pops;
		body.querySelector('#gallery').append(pop);
		body.style.overflow = 'hidden';
	}
});

/* 팝업 닫기 */
body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');
	if (pop != null) {
		let close = pop.querySelector('.close');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});

/* 리스트 데이터 가져오는 함수 */
function callData(url) {
	fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			let items = json.photos.photo;

			createList(items);

			delayLoading();
		});
}

/* 리스트 만드는 함수 */
function createList(items) {
	let htmls = '';
	items.map((el) => {
		let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

		let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

		htmls += `
            <li class="item">
                <div>
                    <a href=${imgSrcBig}>
                        <img src=${imgSrc} class ="thumb" alt="Thumbnail Image">
                    </a>
                        <div class="content">
                            <p>${el.title}</p>
                            <span>
                                <img src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg" class="profile" alt="Profile Image">
                                <strong>${el.owner}</strong>
                            </span>
                        </div>
                </div>
            </li>
        `;
	});
	frame.innerHTML = htmls;
}

/* 로딩 제어 함수 */
function delayLoading() {
	const imgs = frame.querySelectorAll('img');
	const len = imgs.length;
	let count = 0;
	for (let el of imgs) {
		el.onload = () => {
			count++;
			if (count == len) {
				isoLayout();
			}
		};

		/* 끊긴 이미지 대체 */
		let thumb = el.closest('.item').querySelector('.thumb');
		thumb.onerror = (e) => {
			e.currentTarget.setAttrbute('src', '../img/gallery_replace.jpg');
		};
		let profile = el.closest('.item').querySelector('.profile');
		profile.onerror = (e) => {
			e.currentTarget.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
	}
}

/* isotope 함수 */
function isoLayout() {
	loading.classList.add('off');
	frame.classList.add('on');

	new Isotope('#imgList', {
		itemSelection: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
