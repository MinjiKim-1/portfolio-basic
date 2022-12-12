/* sliderText - 변수선언 */
const sliderText = document.querySelector("#role #sliderText");
const innerBox = sliderText.querySelector(".inner");
const btnBox = sliderText.querySelector(".btnBox");

const articles = innerBox.querySelectorAll("article");
let len = articles.length;
let speed = 500;
let enableClick = true;


init();

btnBox.addEventListener("click", (e) => {
    e.preventDefault();

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
        nextSlide(2);
        enableClick = false;
    }

    for (let i = 0; i > len; i++) {
        activation(articles, i);
    }

})



/* 함수 패키징 */

function init() {
    innerBox.style.left = "-100%";
    innerBox.style.width = `${100 * len}%`;
    articles.forEach((el) => {
        el.style.width = `${100 / len}%`;
    })
    innerBox.prepend(innerBox.lastElementChild)
}

function nextSlide(n) {
    new Anim(innerBox, {
        prop: "left",
        value: -100 * n + "%",
        duration: speed,
        callback: () => {
            innerBox.append(innerBox.firstElementChild)
            innerBox.style.left = "-100%";
            enableClick = true;
        }
    })
}

function activation(arr, index) {
    for (let el of arr) el.classList.remove("on");
    arr[index].classList.add("on");
}