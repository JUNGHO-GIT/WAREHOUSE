let USER_PERM_CNT = 0;

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "user",
    title: "   사용자 관리",
    width: "100%",
    height: "100%",
    wrap: false,
    hwrap: false,
    editable: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent:true},
    numberCell: {show:true, resizable:false, width:30},
    summaryData: [],
    rowClick: (_, ui) => {
      fnShow (ui.rowData.userId);
    }
  };
  const colModel = [
    {
      title:"사용자 이름", dataIndx:"userNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"사용자 아이디", dataIndx:"userId", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"연락처", dataIndx:"userPhone", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"E-mail", dataIndx:"userEmail", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"회원등급", dataIndx:"userLevel", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"유효여부", dataIndx:"flagYn", dataType:"string", align:"center",
      minWidth:70,
    },
  ];

  $.ajax({
    url: `act/listUser`,
    data: `findUserNm=${$(`#findUserNm`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $grid01.pqGrid({
        ...gridOption,
        dataModel: { data: data },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: fnAjaxErrorHandler
  });
};

// 1-2. 회원등급 -----------------------------------------------------------------------------------
function fnGetPartsUser() {

  $(`#userPerms`).empty();

  $.ajax({
    url: `act/listUserPerm`,
    data: "",
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      if (!data || data.length === 0) {
        return;
      }
      USER_PERM_CNT = data.length;

      for (let i = 0; i < data.length; i++) {
        const detail = data[i];
        const userPermHtml = (/* javascript */`
        <div class="row mt-10px">
          <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-left">
            <div class="fs-0-7rem fw-600 light-black">
              ${detail.pageNm}
            </div>
          </div>
          <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-center">
            <div
              name="${detail.page}${detail.subPage}"
              data-value="${detail.page}${detail.subPage}"
              class="fs-0-7rem fw-500 light on pointer"
              onclick="fnToggleUserPerm(this)"
            >
              ●
            </div>
            <div class="fs-0-7rem fw-400 light-black">
              있음
            </div>
          </div>
          <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-center">
            <div
              name="${detail.page}${detail.subPage}"
              data-value=""
              class="fs-0-7rem fw-500 light off pointer"
              onclick="fnToggleUserPerm(this)"
            >
              ●
            </div>
            <div class="fs-0-7rem fw-400 light-black">
              없음
            </div>
          </div>
        </div>
        `);
        $(`#userPerms`).append(userPermHtml);
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow (userId) {
  $.ajax({
    url: `act/showUser`,
    data: `userId=${userId}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      fnResetPw();

      $(`#userIdCheck`).val("Y");
      $(`#userId`).val(data.userId);
      $(`#userNm`).val(data.userNm);
      $(`#userPhone`).val(data.userPhone);
      $(`#userEmail`).val(data.userEmail);
      $(`#userLevel`).val(data.userLevel);
      $(`#flagYn`).val("Y");
      $(`#userPw`).val("BCryptPassword");

      // 권한 데이터 처리
      const userPerms = data?.userPerm?.split(",");
      if (!userPerms || userPerms.length === 0) {
        return;
      }

      // 기존 모든 권한 초기화
      document.querySelectorAll(`[data-value]`).forEach((el) => {
        el.classList.remove("primary");
        el.classList.add("light");
      });

      // 사용자 권한 활성화
      document.querySelectorAll(`[data-value]`).forEach((el) => {
        const permValue = el.getAttribute("data-value");
        const permName = el.getAttribute("name");

        // 권한이 있을 경우 '있음' 활성화
        if (userPerms.includes(permName.trim())) {
          if (permValue === permName.trim()) {
            el.classList.remove("light");
            el.classList.add("primary");
          }
        }
        // 권한이 없을 경우 '없음' 활성화
        else {
          if (permValue === "") {
            el.classList.remove("light");
            el.classList.add("primary");
          }
        }
      });
    },
    error: fnAjaxErrorHandler
  });
};


// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSave(flagYn) {

	let flagParam = "";

  if (flagYn === "N") {
    flagParam = "N";
    if ($(`#userId`).val() == "") {
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
      $(`#userNm`).trigger("focus");
      return;
    }
    if ($(`#userId`).val() == "") {
      alert("사용자 아이디를 입력해 주세요");
      $(`#userId`).trigger("focus");
      return;
    }
    if ($(`#userIdCheck`).val() == "N") {
      alert("사용자 아이디 중복 체크를 해주세요");
      $(`#userId`).trigger("focus");
      return;
    }
    if ($(`#userPw`).val() == "") {
      alert("비밀번호를 입력해 주세요");
      $(`#userPw`).trigger("focus");
      return;
    }
    if ($(`#userLevel`).val() == "") {
      alert("회원등급을 선택해 주세요");
      $(`#userLevel`).trigger("focus");
      return;
    }
  }

  // 권한 설정
  // 'on' 클래스가 있는 요소만 선택
  let userPerm = "";
  document.querySelectorAll(`[data-value]`).forEach((el) => {
    if (el.classList.contains("primary") && el.classList.contains("on")) {
      userPerm += `${el.getAttribute("name")},`;
    }
  });
  // 마지막 ',' 제거
  userPerm = userPerm.slice(0, -1);

  // 신규등록인지 여부 체크
  const signUpCheck = $(`#signUpCheck`).val();

  // 비밀번호 변경여부 체크
  $(`#changeFlag`).val() === "Y"

  const param = {
    "userId": $(`#userId`).val(),
    "userNm": $(`#userNm`).val(),
    "userPw": $(`#userPw`).val(),
    "userEmail":$(`#userEmail`).val(),
    "userPhone": $(`#userPhone`).val(),
    "userLevel": $(`#userLevel`).val(),
    "compCd": $(`#compCd`).val() || 0,
    "userPerm": userPerm,
    "flagYn": flagParam,
    "signUpCheck": signUpCheck
  };

  $.ajax({
    url: `act/saveUser`,
    data: JSON.stringify(param),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnGetList01();
    },
    error: fnAjaxErrorHandler
  });
};

// 3-2. 아이디 중복 체크 ---------------------------------------------------------------------------
function fnCheckUserId() {

  if ($(`#userId`).val() == "") {
    alert("아이디를 바르게 입력해 주세요");
    $(`#userId`).trigger("focus");
    return;
  }

  $.ajax({
    url: `act/checkUserId`,
    data: `userId=${$(`#userId`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if(data == 0) {
        $(`#userIdCheck`).val("Y");
        alert("사용할 수 있는 아이디 입니다");
      }
      else {
        alert("이미 사용중인 아이디 입니다.\n 다른 아이디를 입력해 주세요");
        $(`#userId`).trigger("focus");
        $(`#userIdCheck`).val("N");
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 3-3. 비밀번호 변경 ------------------------------------------------------------------------------
function fnUpdatePw() {

  const changeFlag = $(`#changeFlag`).val();

  // 비번 입력안한 경우
  if ($(`#userPw`).val() == "") {
    alert("비밀번호를 입력해 주세요");
    $(`#userPw`).trigger("focus");
    return;
  }

  // 비밀번호 필드 활성화
  if (changeFlag === "N") {
    $(`#userPw`).prop("readonly", false);
    $(`#userPw`).val("");
    $(`#changePw`).text("비번저장");
    $(`#changeFlag`).val("Y");
    return;
  }

  if (changeFlag !== "Y") {
    return
  }

  const param = {
    "userId": $(`#userId`).val(),
    "userPw": $(`#userPw`).val(),
  };

  $.ajax({
    url: `act/updatePw`,
    data: JSON.stringify(param),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      if (data) {
        alert(data.result);
        $(`#userPw`).prop("type", "password");
        $(`#userPw`).val("BCryptPassword");
        $(`#userPw`).prop("readonly", true);
        $(`#changePw`).html("비번변경");
        $(`#changeFlag`).val("N");
      }
      else {
        $(`#userPw`).prop("readonly", true);
        $(`#changeFlag`).val("N");
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 권한 초기화
  document.querySelectorAll(`[data-value]`).forEach((el) => {
    el.classList.remove("primary");
    el.classList.add("light");
  });

  // 회원 초기화
  $(`#userId`).val("");
  $(`#userPw`).val("");
  $(`#userNm`).val("");
  $(`#userPhone`).val("");
  $(`#userEmail`).val("");
  $(`#userLevel`).val("");
  $(`#compCd`).val("");
  $(`#userPerm`).val("");
  $(`#flagYn`).val("Y");
  $(`#userIdCheck`).val("N");

  // 입력필드 상태 초기화
  $(`#userNm`).removeAttr("readonly");
  $(`#userPw`).removeAttr("readonly");

  // signUpCheck 설정
  $(`#signUpCheck`).val("Y");

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");
};

// 5-2. 초기화 (비밀번호) --------------------------------------------------------------------------
function fnResetPw() {
  $(`#userPw`).prop("readonly", true);
  $(`#userPw`).val("BCryptPassword");
  $(`#changePw`).html("비번변경");
  $(`#changeFlag`).val("N");
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [{part:"comCode", target:"userLevel", groupCd:"0001", format:"combo"}];
  fnInitCombo(comboStr, function() {
    fnGetList01();
  });

  fnGetPartsUser();
});
