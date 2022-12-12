
/* sliderMain - 변수선언 */
const sliderMain = document.querySelector("#visual #sliderMain");
const ul = sliderMain.querySelector("ul");
const btnPrev = sliderMain.querySelector(".btnPrev");
const btnNext = sliderMain.querySelector(".btnNext");
const paging = sliderMain.querySelectorAll(".pagination a");

const lis = sliderMain.querySelectorAll("ul li");
let len = lis.length;
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
const bgPhone = document.querySelector("#concept .bgPhone")
const base = -300;

/* Media Query - 변수선언 */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


// window.onresize = () => {
//     let bSize = window.innerWidth;
//     if (window.offsetWidth > 1180) {
//         btnCall.classList.toggle("off");
//         menuMo.classList.toggle("off");
//     }
// }


window.onresize = function () {
    let bSize = window.innerWidth;
    if (window.offsetWidth > 1180) {
        btnCall.classList.toggle("off");
        menuMo.classList.toggle("off");
    }
}



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


// paging.forEach((el, index) => {
//     el.addEventListener("click", (e) => {

//         // let pageArr = ul.querySelectorAll("li");
//         // let pageNow = pageArr[index].getAttribute("data-index");

//         // console.log(paging.indexOf("a.on"));
//         // console.log(paging);
//         // console.log(pageArr);
//         // console.log(pageNow);
//         // console.log(index);

//         // // nextSlide(index);
//         // // prevSlide(index);

//         for (let el of paging) el.classList.remove("on");
//         new Anim(ul, {
//             prop: "left",
//             value: -100 * (index) + "%",
//             duration: speed,
//             callback: () => {
//                 ul.append(ul.firstElementChild)
//                 ul.style.left = "-100%";
//                 enableClick = true;
//             }
//         })
//         el.classList.add("on");
//     })
// })


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
                                // callback: () => {
                                //     new Anim(_content, {
                                //         prop: "opacity",
                                //         value: 1,
                                //         duration: speed,
                                //     })
                                // }
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
            lis.forEach((el, index) => {
                el.classList.remove("on");
                sections[index].classList.remove("on");
            })

            lis[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
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
    ul.style.width = `${100 * len}%`;
    lis.forEach((el) => {
        el.style.width = `${100 / len}%`;
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



