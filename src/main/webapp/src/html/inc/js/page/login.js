// 1. 로그인 -------------------------------------------------------------------------------------->
var fnAuth = function () {

  if ($("#uid").val() == "") {
    alert("아이디를 입력해 주세요.");
    $("#uid").focus();
    return;
  }
  if ($("#pass").val() == "") {
    alert("비밀번호를 입력해 주세요.");
    $("#pass").focus();
    return;
  }
  if ($("#setId").is(":checked")) {
    $.cookie("uid", $("#uid").val(), {expires: 365});
  }
  else {
    $.cookie("uid", "");
  }

  $.ajax({
    url: "/auth",
    data: `userID=${$("#uid").val()}&passwd=${$("#pass").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      if (data.result == "로그인에 성공하였습니다.") {
        var encryptedItem = {"loginSession": "true"};
        var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
        localStorage.setItem("loginSession", encryptedValue);
        alert(data.result);
        fnGoPage("/warehouse/main");
      }
      else {
        alert(data.result);
      }
    },
    error: ajaxErrorHandler
  });
};

// 0. 엔터일때만 실행 ----------------------------------------------------------------------------->
function onKeyDown (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fnAuth();
  }
};

// 0. 에러처리 ------------------------------------------------------------------------------------>
var ajaxErrorHandler = function (request, status, error) {
  if (request.status === 477) {
    alert("세션이 종료 되었습니다.");
    fnGoPage("/reLogin");
  }
  else {
    alert(`code: ${request.status}\n message: ${request.responseText}\n error: ${error}`);
  }
};

// 0. 화면 로딩시 실행 ---------------------------------------------------------------------------->
$(document).ready(function () {
  if ($.cookie("uid")) {
    $("#uid").val($.cookie("uid"));
    $("#setId").prop("checked", "checked");
    $("#pass").focus();
  }
  else {
    $("#uid").focus();
  }
});
