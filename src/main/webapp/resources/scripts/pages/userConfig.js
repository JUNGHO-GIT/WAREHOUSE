// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnShowUserConfig() {

  $.ajax({
    url: "act/showUserConfigTab",
    data: `gridCd=${""}&pageNm=${"tabs"}`,
    type: "POST",
    dataType:"JSON",
    beforeSend : function(xmlHttpRequest){
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if (data) {
        fnInitializeTabs(data.config);
      }
    },
    error: ajaxErrorHandler
  });
};

// 2. 팝업 화면 유저정보 ---------------------------------------------------------------------------
function fnShowUserConfigInfo() {

  fnGridPopup('popupUserConfig', 'on');

  $.ajax({
    url: "act/showUserConfigInfo",
    data: {},
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 비밀번호 초기화
      fnResetPw();

      // 회원정보 설정
      $(`#userConfigID`).val(data.userConfigID);
      $(`#userConfigPerm`).val(data.userConfigPerm);
      $(`#userConfigNm`).val(data.userConfigNm);
      $(`#userConfigPhone`).val(data.userConfigPhone);
      $(`#userConfigEmail`).val(data.userConfigEmail);
      $(`#userConfigLevel`).val(data.userConfigLevel);
      $(`#userConfigCompCd`).val(data.userConfigCompCd) || 0;
      $(`#flagYn`).val("Y");

      // 암호화된 비밀번호
      $(`#userConfigPw`).val("BCryptPassword");
    },
    error: ajaxErrorHandler
  });
};

// 3-1. 유저정보 저장 ------------------------------------------------------------------------------
function fnSaveUserConfigInfo() {

  if ($(`#userConfigNm`).val() == "") {
    alert("사용자 이름을 입력해 주세요");
    $(`#userNm`).trigger("focus");
    return;
  }
  if ($(`#userConfigID`).val() == "") {
    alert("사용자 아이디를 입력해 주세요");
    $(`#userId`).trigger("focus");
    return;
  }
  if ($(`#userIdCheck`).val() == "N") {
    alert("사용자 아이디 중복 체크를 해주세요");
    $(`#userId`).trigger("focus");
    return;
  }
  if ($(`#userConfigPw`).val() == "") {
    alert("비밀번호를 입력해주세요");
    $(`#userConfigPw`).trigger("focus");
    return;
  }
  if ($(`#userConfigLevel`).val() == "") {
    alert("회원등급을 선택해 주세요");
    $(`#userConfigLevel`).trigger("focus");
    return;
  }

  // 비밀번호 변경여부 체크
  $(`#changeConfigFlag`).val() === "Y"

  const param = {
    "userConfigID": $(`#userConfigID`).val(),
    "userConfigNm": $(`#userConfigNm`).val(),
    "userConfigEmail": $(`#userConfigEmail`).val(),
    "userConfigPhone": $(`#userConfigPhone`).val(),
    "userConfigPw": $(`#userConfigPw`).val(),
    "userConfigLevel": $(`#userConfigLevel`).val(),
    "userConfigCompCd": $(`#userConfigCompCd`).val() || 0,
    "userConfigPerm": $(`#userConfigPerm`).val(),
    "flagYn": "Y",
  };

  $.ajax({
    url: "act/saveUserConfigInfo",
    data: JSON.stringify(param),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
    },
    error: ajaxErrorHandler
  });
};

// 0. 탭 순서 저장 ---------------------------------------------------------------------------------
function fnSaveUserConfigTab() {

  const param = {
    "configSeq": $(`#configSeq`).val() || "0",
    "userId": $(`#userConfigID`).val(),
    "pageNm": "tabs",
    "gridCd": "",
    "config": fnGetTabOrder(),
    "flagYn": "Y",
  };

  $.ajax({
    url: "act/saveUserConfigTab",
    data: JSON.stringify(param),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
    },
    error: ajaxErrorHandler
  });
};

// 3-3. 비밀번호 변경 ------------------------------------------------------------------------------
function fnUpdateConfigPw() {

  var changeConfigFlag = $(`#changeConfigFlag`).val();

  // 비번 입력안한 경우
  if ($(`#userConfigPw`).val() == "") {
    alert("비밀번호를 입력해주세요");
    $(`#userConfigPw`).trigger("focus");
    return;
  }

  // 비밀번호 필드 활성화
  if (changeConfigFlag === "N") {
    $(`#userConfigPw`).prop("readonly", false);
    $(`#userConfigPw`).val("");
    $(`#changeConfigPw`).text("변경하기");
    $(`#changeConfigFlag`).val("Y");
    return;
  }

  if (changeConfigFlag === "Y") {

    var param = {
      "userConfigID": $(`#userConfigID`).val(),
      "userConfigPw": $(`#userConfigPw`).val()
    };

    $.ajax({
      url: "act/updateConfigPw",
      data: JSON.stringify(param),
      type: "POST",
      dataType:"JSON",
      contentType: "application/json; charset=UTF-8",
      beforeSend: (xmlHttpRequest) => {
        xmlHttpRequest.setRequestHeader("AJAX", "true");
      },
      success: (data) => {
        if (data) {
          alert(data.result);
          $(`#userConfigPw`).prop("type", "password");
          $(`#userConfigPw`).val("BCryptPassword");
          $(`#userConfigPw`).prop("readonly", true);
          $(`#changeConfigPw`).html("변경하기");
          $(`#changeConfigFlag`).val("N");
        }
        else {
          $(`#userConfigPw`).prop("readonly", true);
          $(`#changeConfigFlag`).val("N");
        }
      },
      error: ajaxErrorHandler
	  });
	};
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {
  $(`#userConfigID`).val("");
  $(`#userConfigPw`).val("");
  $(`#userConfigNm`).val("");
  $(`#userConfigLevel`).val("");
  $(`#userConfigCompCd`).val("");
  $(`#userConfigPerm`).val("");
  $(`#userConfigEmail`).val("");
  $(`#userConfigPhone`).val("");
};

// 5-2. 초기화 (비밀번호) --------------------------------------------------------------------------
function fnResetPw() {
  // row 클릭했을때 `비번변경`버튼 상태 초기화
  $(`#userConfigPw`).prop("readonly", true);
  $(`#userConfigPw`).val("BCryptPassword");
  $(`#changeConfigPw`).html("변경하기");
  $(`#changeConfigFlag`).val("N");
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  fnShowUserConfig();

  $(`#popupUserConfig`).draggable({
    handle: `#popTop`,
    cursor: "move",
    containment: "window"
  });
});