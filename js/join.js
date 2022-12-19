
const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]")

btnSubmit.addEventListener("click", (e) => {

    if (!isTxt("userid", 5)) e.preventDefault();
    if (!isPwd("pwd1", "pwd2", 8)) e.preventDefault();
    if (!isEmail("email", 20)) e.preventDefault();
    if (!isSelect("job")) e.preventDefault();
    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("hobby")) e.preventDefault();
    if (!isTxt("comments", 20)) e.preventDefault();

})

/* type이 text인 form 요소 인증함수 */
function isTxt(el, len) {

    if (len === undefined) len = 5;
    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;

    if (txt.length >= len) { // 입력한 value의 글자수가 설정한 len의 값 이상이라면?

        /* 중복 메세지 출력 막기*/
        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
        return true;

    } else {

        /* 중복 메세지 출력 막기*/
        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) return false;

        /* 경고 및 안내 문구 출력 */
        const errMsg = document.createElement("p");
        errMsg.append(`Please enter at least ${len} characters.`);
        input.closest("td").append(errMsg)

        return false;
    }
}

/* type이 text인데 email인 요소 인증함수 */
function isEmail(el) {
    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;

    if (/@/.test(txt)) { // @가 있는가?

        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        return true;

    } else {

        const errMsgs = input.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("Please enter a full email address including '@'");
        input.closest("td").append(errMsg)

        return false;
    }
}

/* check 인증함수 */
function isCheck(el) {
    let inputs = form.querySelectorAll(`[name=${el}]`);
    let isCheck = false;

    for (let el of inputs) {
        if (el.checked) isCheck = true;
    }

    if (isCheck) { // input에 체크가 되어있는가?

        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

        return true;

    } else {

        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("Please check the required items.");
        inputs[0].closest("td").append(errMsg);

        return false;
    }

}

/* select 인증함수 */
function isSelect(el) {
    let sel = form.querySelector(`[name=${el}]`);
    let sel_index = sel.options.selectedIndex;
    let val = sel[sel_index].value;

    if (val !== "") { // 밸류값이 비어있지 않다면? (!== 같지 않다면)

        const errMsgs = sel.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

        return true;

    } else {

        const errMsgs = sel.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("Please check the required items.");
        sel.closest("td").append(errMsg);

        return false;
    }
}

/* password 인증함수 */
// 조건1. 두개의 비밀번호가 같은가?
// 조건2. 몇글자 이상인가?
// 조건3. 숫자가 포함되는가?
// 조건4. 특수문자가 포함되는가?
// 조건5. 영문자가 포함되는가?

function isPwd(el1, el2, len) {

    let pwd1 = form.querySelector(`[name=${el1}]`);
    let pwd2 = form.querySelector(`[name=${el2}]`);
    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;
    console.log(pwd1);

    const num = /[0-9]/; // 0,1,2,3,4,5,6,7,8,9
    const eng = /[a-zA-Z]/; // 소문자 a부터 z까지, 대문자 A부터 Z까지. 
    const spc = /[~!@#$%^&*()_+]?<>/;
    // 정규표현식은 콤마없이 바로 붙혀 써야함

    // 두개의 비밀번호가 같고 & 비밀번호의 글자수가 len개 이상 & 비밀번호에 num이 포함 & 비밀번호에 eng 포함 & 비밀번호에 특수문자 포함하는가?
    if (pwd1_val === pwd2_val && pwd1_val.length >= len && num.text(pwd1_val) && eng.text(pwd1_val) && spc.text(pwd1_val)) {

        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();

        return true;

    } else {

        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if (errMsgs.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append(`Please enter at least ${len} characters, including English, numbers, and special characters.`);
        pwd1.closest("td").append(errMsg);

        return false;
    }

}

