// 1. 로그인 ---------------------------------------------------------------------------------------
function fnAuth() {

  if ($("#uid").val() == "") {
    alert("아이디를 입력해 주세요");
    $("#uid").on("focus", function () {});
    return;
  }
  if ($("#pass").val() == "") {
    alert("비밀번호를 입력해 주세요");
    $("#pass").on("focus", function () {});
    return;
  }
  if ($("#setId").is(":checked")) {
    $.cookie("uid", $("#uid").val(), {expires: 365});
  }
  else {
    $.cookie("uid", "");
  }

  $.ajax({
    url: `auth`,
    type: "POST",
    data: `userID=${$("#uid").val()}&passwd=${$("#pass").val()}`,
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if (data.result == "로그인에 성공하였습니다.") {
        var encryptedItem = {"loginSession": "true"};
        var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
        localStorage.setItem("loginSession", encryptedValue);
        alert(data.result);
        fnGoPage("main");
      }
      else {
        alert(data.result);
      }
    },
    error: ajaxErrorHandler
  });
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  if ($.cookie("uid")) {
    $("#uid").val($.cookie("uid"));
    $("#setId").prop("checked", "checked");
    $("#pass").on("focus", function () {});
  }
  else {
    $("#uid").on("focus", function () {});
  }
});
