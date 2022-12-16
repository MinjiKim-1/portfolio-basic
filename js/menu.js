
/* Media Query - 변수선언 */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

/* Media Query */
btnCall.onclick = function (e) {
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}
