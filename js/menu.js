
/* Media Query - 모바일 메뉴 변수선언 */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

/* Media Query - 모바일 메뉴 */
btnCall.onclick = function (e) {
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}
