const menuFaq = document.querySelector("#faq .inner .container");
const radioBox = menuFaq.querySelectorAll("input[name=acc]");
const close = menuFaq.querySelectorAll(".tab label");
// console.log(radioBox[0].checked);
// console.log(close);

/* FAQ 라디오버튼 체크 해제 */
close.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        if (radioBox[index].checked) {
            e.preventDefault();
            radioBox[index].checked = false;
        }
    });
});


