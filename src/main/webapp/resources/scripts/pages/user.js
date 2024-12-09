// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    numberCell: {width: 30, minWidth: 30, align: "center"},
    xlsNm: "user.xlsx",
    title: "   사용자 관리",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    editable:false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
  };

  // 행 클릭시 실행
  obj.rowClick = function (event, ui) {
    fnShow(ui.rowData.userID);
  };

  const colModel = [
    {dataIndx:"userNm", title:"사용자 이름", dataType:"string", align:"center",
      filter: {type: "textbox", condition: "contain", listeners: ["keyup"]}
    },
    {dataIndx:"userID", title:"사용자 아이디", dataType:"string", align:"center",
      filter: {type: "textbox", condition: "contain", listeners: ["keyup"]}
    },
    {dataIndx:"phone", title:"연락처", dataType:"string", align:"center",
    filter: {type: "textbox", condition: "contain", listeners: ["keyup"]}
    },
    {dataIndx:"email", title:"E-mail", dataType:"string", align:"center",
      filter: {type: "textbox", condition: "contain", listeners: ["keyup"]}
    },
    {dataIndx:"uLevel", title:"회원등급", dataType:"string", align:"center",
      filter: {type: "textbox", condition: "contain", listeners: ["keyup"]}
    },
    {dataIndx:"flagYN", title:"유효여부", dataType:"string", align:"center",,
    },
  ];

  $.ajax({
    url: "act/listUser",
    data: `findUserNm=${$(`#findUserNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      obj.dataModel = {data:myJsonData};
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1-2. 회원등급 -----------------------------------------------------------------------------------
function fnGetPartsUser() {

  $(`#userPerms`).empty();

  $.ajax({
    url: "act/listUserPerm",
    data: "",
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if(data.length == 0) {
        return;
      }
      var oldMenu = "";
      G_permCnt = data.length;

      for (let i = 0; i < data.length; i++) {
        var detail = data[i];
        if (i > 0 && oldMenu != detail.page) {

          var space = `<hr class="hr mt-5px mb-5px"/>`;

          $(`#userPerms`).append(space);
        }
        var userText = `
          <div class="row mt-10px" style="white-space:nowrap;">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              ▷ ${detail.pageNm}
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 ml-10px">
              <input
                type="radio"
                class="user${i}"
                name="${detail.page}${detail.subPage}"
                value="${detail.page}${detail.subPage}"
                onBlur="fnGetPerm();"
              />
              <span>있음</span>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 ml-10px">
              <input
                type="radio"
                class="user${i}"
                name="${detail.page}${detail.subPage}"
                value=""
                onBlur="fnGetPerm();"
                checked
              />
              <span>없음</span>
            </div>
          </div>
        `;
        $(`#userPerms`).append(userText);

        oldMenu = detail.page;
      }
    },
    error: ajaxErrorHandler
  });
};

// 1-3. 권한 체크 ----------------------------------------------------------------------------------
function fnGetPerm() {

  G_uPerm = "";

  for (let k = 0; k < G_permCnt;k++) {
    var obj = "user" + k;
    var val = $("input:radio[class=" + obj + "]:checked").val();
    if(val) {
      if(G_uPerm) {
        G_uPerm += ",";
      }
      G_uPerm += val;
    }
  }
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(userID) {

  $.ajax({
    url: "act/showUser",
    data: `userID=${userID}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 비밀번호 초기화
      fnResetPw();

      // 회원정보 설정
      $(`#userIDCheck`).val("Y");
      $(`#userID`).val(data.userID);
      $(`#userNm`).val(data.userNm);
      $(`#phone`).val(data.phone);
      $(`#email`).val(data.email);
      $(`#uLevel`).val(data.uLevel);
      $(`#flagYN`).val("Y");

      // 암호화된 비밀번호
      $(`#passwd`).val("BCryptPassword");

      // 권한 설정
      var perms = data.uPerm;
      if (perms.indexOf("/") == 0) {
        return;
      }
      var divPerms = perms.split(",");

      for (let c = 0; c < G_permCnt; c++) {
        var val = divPerms[c];

        if (val != undefined && perms != "") {
          var objNm = val.substr(0, 3);
          if (objNm != undefined) {
            $("input:radio[name=" + objNm + "]:radio[value='" + val + "']").prop("checked", true);
          }
        }
      }

      // file upload 관련 파라미터 설정
      $(`#tableNm`).val("tblUser");
      $(`#tableKey`).val(data.userID);
      fnShowFiles("tblUser", data.userID, "files");
    },
    error: ajaxErrorHandler
  });
};

// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSave(flagYN) {

	let flagParam = "";

  if (flagYN === "N") {
    flagParam = "N";
    if ($(`#userID`).val() == "") {
      alert("사용자를 선택해 주세요");
      return;
    }
    if (!confirm("선택하신 사용자를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($(`#userNm`).val() == "") {
      alert("사용자 이름을 입력해 주세요");
      $(`#userNm`).on("focus", function () {});
      return;
    }
    if ($(`#userID`).val() == "") {
      alert("사용자 아이디를 입력해 주세요");
      $(`#userID`).on("focus", function () {});
      return;
    }
    if ($(`#userIDCheck`).val() == "N") {
      alert("사용자 아이디 중복 체크를 해주세요");
      $(`#userID`).on("focus", function () {});
      return;
    }
    if ($(`#passwd`).val() == "") {
      alert("비밀번호를 입력해 주세요");
      $(`#passwd`).on("focus", function () {});
      return;
    }
    if ($(`#uLevel`).val() == "") {
      alert("회원등급을 선택해 주세요");
      $(`#uLevel`).on("focus", function () {});
      return;
    }
  }

  var uPerm = "";
  for (let k = 0; k < G_permCnt; k++) {
    var obj = "user" + k;
    var val = $("input:radio[class=" + obj + "]:checked").val();
    if(val) {
      if(uPerm) {
        uPerm += ",";
      }
      uPerm += val;
    }
  }

  // 신규등록인지 여부 체크
  var signUpCheck = $(`#signUpCheck`).val();

  // 비밀번호 변경여부 체크
  $(`#changeFlag`).val() === "Y"

  const param = {
    "userID": $(`#userID`).val(),
    "userNm": $(`#userNm`).val(),
    "passwd": $(`#passwd`).val(),
    "email":$(`#email`).val(),
    "phone": $(`#phone`).val(),
    "uLevel": $(`#uLevel`).val(),
    "compCd": $(`#compCd`).val() || 0,
    "uPerm": uPerm,
    "flagYN": flagParam,
    "signUpCheck": signUpCheck
  };

  console.log("userParam: "+ JSON.stringify(param))

  $.ajax({
    url: "act/saveUser",
    data: JSON.stringify(param),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnGetList01();
    },
    error: ajaxErrorHandler
  });
};

// 3-2. 아이디 중복 체크 ---------------------------------------------------------------------------
function fnCheckUserID() {

  if ($(`#userID`).val() == "") {
    alert("아이디를 바르게 입력해 주세요");
    $(`#userID`).on("focus", function () {});
    return;
  }

  $.ajax({
    url: "act/checkUserID",
    data: `userID=${$(`#userID`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if(data == 0) {
        $(`#userIDCheck`).val("Y");
        alert("사용할 수 있는 아이디 입니다");
      }
      else {
        alert("이미 사용중인 아이디 입니다.\n 다른 아이디를 입력해 주세요");
        $(`#userID`).on("focus", function () {});
        $(`#userIDCheck`).val("N");
      }
    },
    error: ajaxErrorHandler
  });
};

// 3-3. 비밀번호 변경 ------------------------------------------------------------------------------
function fnUpdatePw() {

  var changeFlag = $(`#changeFlag`).val();

  // 비번 입력안한 경우
  if ($(`#passwd`).val() == "") {
    alert("비밀번호를 입력해 주세요");
    $(`#passwd`).on("focus", function () {});
    return;
  }

  // 비밀번호 필드 활성화
  if (changeFlag === "N") {
    $(`#passwd`).prop("readonly", false);
    $(`#passwd`).val("");
    $(`#changePw`).text("비번저장");
    $(`#changeFlag`).val("Y");
    return;
  }

  if (changeFlag == "Y") {

    var param = {
      "userID": $(`#userID`).val(),
      "passwd": $(`#passwd`).val(),
    };

    $.ajax({
      url: "act/updatePw",
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
          $(`#passwd`).prop("type", "password");
          $(`#passwd`).val("BCryptPassword");
          $(`#passwd`).prop("readonly", true);
          $(`#changePw`).html("비번변경");
          $(`#changeFlag`).val("N");
        }
        else {
          $(`#passwd`).prop("readonly", true);
          $(`#changeFlag`).val("N");
        }
      },
      error: ajaxErrorHandler
  	});
	};
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 권한 초기화
  for (let k = 0; k < G_permCnt;k++) {
    var obj = "user" + k;
    $("input:radio[class=" + obj + "]:radio[value='']").prop("checked", true);
  }

  // 회원 초기화
  $(`#userID`).val("");
  $(`#passwd`).val("");
  $(`#userNm`).val("");
  $(`#phone`).val("");
  $(`#email`).val("");
  $(`#uLevel`).val("");
  $(`#compCd`).val("");
  $(`#uPerm`).val("");
  $(`#flagYN`).val("Y");
  $(`#userIDCheck`).val("N");

  // 입력필드 상태 초기화
  $(`#userNm`).removeAttr("readonly");
  $(`#passwd`).removeAttr("readonly");

  // signUpCheck 설정
  $(`#signUpCheck`).val("Y");

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");
};

// 5-2. 초기화 (비밀번호) --------------------------------------------------------------------------
function fnResetPw() {
  // row 클릭했을때 `비번변경`버튼 상태 초기화
  $(`#passwd`).prop("readonly", true);
  $(`#passwd`).val("BCryptPassword");
  $(`#changePw`).html("비번변경");
  $(`#changeFlag`).val("N");
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
function fnPressGet01(event) {

  // 1. event가 `onKeyDown`일때 = enter 조건 O
  if (event.keyCode === 13 && event.key === "Enter") {
    event.preventDefault();
    fnReset();
    fnResetWhenSearch();
    fnGetList01();
  }

  // 2. event가 `onClick`일때 = enter 조건 X
  if (event.type === "click") {
    event.preventDefault();
    fnReset();
    fnResetWhenSearch();
    fnGetList01();
  }
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [{part:"comCode", target:"uLevel", groupCd:"0001", format:"combo"}];
  fnInitCombo(comboStr, function() {
    fnGetList01();
  });

  fnGetPartsUser();
});
