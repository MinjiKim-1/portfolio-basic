
/* 변수 선언 */
const sliderMain = document.querySelector("figure #sliderMain");
const ul = sliderMain.querySelector("ul");
const btnPrev = sliderMain.querySelector(".btnPrev");
const btnNext = sliderMain.querySelector(".btnNext");
const paging = sliderMain.querySelectorAll(".pagination a");

const lis = sliderMain.querySelectorAll("ul li");
let len = lis.length;
let speed = 500;
let enableClick = true;

//초기화 함수 호출
init();


btnNext.addEventListener("click", (e) => {
    e.preventDefault();

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
        nextSlide();
        enableClick = false;
    }
})


btnPrev.addEventListener("click", (e) => {
    e.preventDefault();

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
        prevSlide();
        enableClick = false;
    }
})


function init() {
    ul.style.left = "-100%";
    ul.style.width = `${100 * len}%`;
    lis.forEach((el) => {
        el.style.width = `${100 / len}%`;
    })
    ul.prepend(ul.lastElementChild)
}

function nextSlide() {
    new Anim(ul, {
        prop: "left",
        value: "-200%",
        duration: speed,
        callback: () => {
            ul.append(ul.firstElementChild)
            ul.style.left = "-100%";
            enableClick = true;
        }
    })
    pagination(2);
}

function prevSlide() {
    new Anim(ul, {
        prop: "left",
        value: "0%",
        duration: speed,
        callback: () => {
            ul.prepend(ul.lastElementChild)
            ul.style.left = "-100%";
            enableClick = true;
        }
    })
    pagination(0);
}



function activation(arr, index) {
    for (let el of arr) el.classList.remove("on");
    arr[index].classList.add("on");
}

// pagination
function pagination(n) {
    for (let el of paging) el.classList.remove("on");
    let pageArr = ul.querySelectorAll("li");
    let pageNow = pageArr[n].getAttribute("data-index");
    paging[pageNow].classList.add("on");
}
