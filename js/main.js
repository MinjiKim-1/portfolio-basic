
/* sliderMain - 변수선언 */
const sliderMain = document.querySelector("#visual #sliderMain");
const ul = sliderMain.querySelector("ul");
const btnPrev = sliderMain.querySelector(".btnPrev");
const btnNext = sliderMain.querySelector(".btnNext");
const paging = sliderMain.querySelectorAll(".pagination a");
const slideLis = sliderMain.querySelectorAll("ul li");
let slideLen = slideLis.length;

let speed = 500;
let enableClick = true;

/* lineBox - 변수선언 */
const lineBox = document.querySelector("#visual .lineBox")
const _top = lineBox.querySelector(".top");
const _right = lineBox.querySelector(".right");
const _bottom = lineBox.querySelector(".bottom");
const _left = lineBox.querySelector(".left");
const _content = lineBox.querySelector(".content")

/* subTab - 변수선언 */
const subTab = document.querySelectorAll("#introduce #subTab li");
const subPage = document.querySelectorAll("#introduce article");

/* slideSub - 변수선언 */
const sliderSub = document.querySelector("#magazine #sliderSub");
const btnBox = sliderSub.querySelector(".btnBox");
const imgSub = sliderSub.querySelectorAll(".pic img");
const imgLen = imgSub.length - 1;
let i = 0;

/* scroll - 변수선언 */
const sections = document.querySelectorAll("section");
const scrView = document.querySelector("h1");
const base = -300;
const bgWatch = document.querySelector("#introduce .inner .bgWatch");
const bgPhone = document.querySelector("#concept .bgPhone");
const numbers = document.querySelectorAll("#record .inner article strong span"
);


/* Media Query - 변수선언 */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


/* sliderMain */
init();

btnNext.addEventListener("click", (e) => {
    e.preventDefault();

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
        nextSlide(2);
        enableClick = false;
    }
})


btnPrev.addEventListener("click", (e) => {
    e.preventDefault(e);

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
        prevSlide(0);
        enableClick = false;
    }
})


paging.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        new Anim(ul, {
            prop: "left",
            value: -100 * index + "%",
            duration: speed,
        });
        activation(paging, index);
    });
});



/* lineBox */
window.onload = function () {
    new Anim(_content, {
        prop: "opacity",
        value: 1,
        duration: speed,
    })
    new Anim(_top, {
        prop: "width",
        value: "100%",
        duration: speed,
        callback: () => {
            new Anim(_right, {
                prop: "height",
                value: "100%",
                duration: speed,
                callback: () => {
                    new Anim(_bottom, {
                        prop: "width",
                        value: "100%",
                        duration: speed,
                        callback: () => {
                            new Anim(_left, {
                                prop: "height",
                                value: "100%",
                                duration: speed,
                            })
                        }
                    })
                }
            })
        }
    })
}




/* subTab */
subTab.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if (isOn) return;

        activation(subTab, index);
        activation(subPage, index);
    })
})



/* slideSub */
btnBox.addEventListener("click", (e) => {
    e.preventDefault();

    if (i == imgLen) {
        i = 0;
    } else {
        i++;
    }
    activation(imgSub, i);
})



/* scroll */

let posArr = [];

console.log(sections);
const posBox1 = sections[0].offsetTop;
const posBox2 = sections[1].offsetTop;
const posBox3 = sections[2].offsetTop;
const posBox4 = sections[3].offsetTop;
const posBox5 = sections[4].offsetTop;
const posBox6 = sections[5].offsetTop;
const posBox7 = sections[6].offsetTop;
const posBox8 = sections[7].offsetTop;


for (let el of sections) {
    posArr.push(el.offsetTop);
}
console.log(posArr);


window.addEventListener("scroll", () => {
    let scroll = window.scrollY || window.pageYOffset;

    // scrView.innerText = scroll;

    sections.forEach((el, index) => {

        if (scroll >= posArr[index] + base) {
            sections.forEach((el, index) => {
                el.classList.remove("on");
                sections[index].classList.remove("on");
            })
            sections[index].classList.add("on");
        }
        if (scroll >= posArr[6] + base) {
            counter(numbers[0], 348, 1200);
            counter(numbers[1], 12, 3000);
            counter(numbers[2], 618, 1000);
            counter(numbers[3], 1192, 0);
        }
        // else {
        //     numbers.forEach((el, index) => {
        //         numbers[index].innerText = 0;
        //     });
        // };
    })
    // bgWatch.style.transform = `rotate(${scroll - posArr[1] + 300}deg)`;
    bgPhone.style.left = `${scroll - posArr[5]}px`;
})



/* Media Query */
btnCall.onclick = function (e) {
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}



/* 함수 패키징 */

function init() {
    ul.style.left = "-100%";
    ul.style.width = `${100 * slideLen}%`;
    slideLis.forEach((el) => {
        el.style.width = `${100 / slideLen}%`;
    })
    ul.prepend(ul.lastElementChild)
}

function nextSlide(n) {
    new Anim(ul, {
        prop: "left",
        value: -100 * n + "%",
        duration: speed,
        callback: () => {
            ul.append(ul.firstElementChild)
            ul.style.left = "-100%";
            enableClick = true;
        }
    })
    pagination(n);
}

function prevSlide(n) {
    new Anim(ul, {
        prop: "left",
        value: -100 * n + "%",
        duration: speed,
        callback: () => {
            ul.prepend(ul.lastElementChild)
            ul.style.left = "-100%";
            enableClick = true;
        }
    })
    pagination(n);
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


function counter(el, num, time) {
    let current_num = parseInt(el.innerText);
    let count_num = num - current_num
    let interval = parseInt(time / count_num);
    let timer = setInterval(() => {
        current_num++;
        if (current_num == num) {
            clearInterval(timer);
        }
        el.innerText = current_num;
    }, interval)


}

