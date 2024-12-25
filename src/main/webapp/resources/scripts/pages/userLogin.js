// 1. 로그인 ---------------------------------------------------------------------------------------
const fnLogin = () => {
  if ($(`#userId`).val() == "") {
    alert("아이디를 입력해 주세요");
    $(`#userId`).trigger("focus");
    return;
  }
  if ($(`#userPw`).val() == "") {
    alert("비밀번호를 입력해 주세요");
    $(`#userPw`).trigger("focus");
    return;
  }
  if ($(`#setId`).is(":checked")) {
    $.cookie("userId", $(`#userId`).val(), {expires: 365});
  }
  else {
    $.cookie("userId", "");
  }
  $.ajax({
    url: `act/loginUser`,
    data: `userId=${$(`#userId`).val()}&userPw=${$(`#userPw`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if (data.result === "success") {
        const encryptedItem = {"loginSession": "true"};
        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
        localStorage.setItem("loginSession", encryptedValue.toString());
        alert(data.msg);
        fnGoPage("main");
      }
      else {
        alert(data.msg);
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 2. 테스트 로그인 --------------------------------------------------------------------------------
const fnTestLogin = () => {
  $(`#userId`).val("123");
  $(`#userPw`).val("123");
  fnLogin();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  if ($.cookie("userId")) {
    $(`#userId`).val($.cookie("userId"));
    $(`#setId`).prop("checked", "checked");
    $(`#userPw`).trigger("focus");
  }
  else {
    $(`#userId`).trigger("focus");
  }
});
