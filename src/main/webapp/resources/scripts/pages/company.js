// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "company.xlsx",
    title: "   거래처 관리",
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
    fnShow (ui.rowData.compCd);
  };

  const colModel = [
    {dataIndx:"compCd", title:"거래처 코드", dataType:"string", align:"center", hidden: true,
    },
    {dataIndx:"compNm", title:"거래처 이름", dataType:"string", align:"center",,
      minWidth:150, maxWidth:150,
    },
    {dataIndx:"compNo", title:"사업자등록번호", dataType:"string", align:"center",,
      minWidth:150, maxWidth:150,
    },
    {dataIndx:"owner", title:"대표자", dataType:"string", align:"center",
    },
    {dataIndx:"major", title:"담당자", dataType:"string", align:"center",
    },
    {dataIndx:"phone", title:"연락처", dataType:"string", align:"center",
    },
    {dataIndx:"address", title:"주소", dataType:"string", align:"center",
    },
    {dataIndx:"compType", title:"업태", dataType:"string", align:"center",
    },
    {dataIndx:"compPart", title:"종목", dataType:"string", align:"center",
    },
    {dataIndx:"flagYN", title:"유효", dataType:"string", align:"center",
    },
  ];

  $.ajax({
    url: "act/listCompany",
    data: `findCompNm=${$("#findCompNm").val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {

      // compCd가 1인 항목을 찾아 맨위로 이동
      var index = myJsonData.findIndex(function(item) {
        return item.compCd === 1;
      });
      if (index > -1) {
        var selectedItem = myJsonData.splice(index, 1)[0];
        myJsonData.unshift(selectedItem);
      }
      obj.dataModel = {data:myJsonData};
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(compCd) {

  $.ajax({
    url: "act/showCompany",
    data: `compCd=${compCd}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 1. 거래처 관련
      $("#compCd").val(data.compCd);
      $("#compNm").val(data.compNm);
      $("#compNo").val(data.compNo);
      $("#owner").val(data.owner);
      $("#major").val(data.major);
      $("#phone").val(data.phone);
      $("#taxEmail").val(data.taxEmail);
      $("#address").val(data.address);
      $("#compType").val(data.compType);
      $("#compPart").val(data.compPart);
      $("#remarks").val(data.remarks);

      // 2. file 관련
      $("#tableNm").val("tblCompany");
      $("#tableKey").val(data.compCd);
      $("#keyColumn").val("compCd");
      fnShowFiles("tblCompany", data.compCd, "files");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYN) {

  let flagParam = "";

  if (flagYN === "N") {
    flagParam = "N";
    if ($("#compCd").val() == "") {
      alert("거래처를 선택해 주세요");
      return;
    }
    if (!confirm("선택하신 거래처를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($("#compNm").val() == "") {
      alert("거래처 이름을 입력해 주세요");
      $("#compNm").on("focus", function () {});
      return;
    }
    if ($("#compNo").val() == "") {
      alert("사업자 등록번호를 입력해 주세요");
      $("#compNo").on("focus", function () {});
      return;
    }
  }

  const param = {
    "compCd": $("#compCd").val() || "0",
    "compNm": $("#compNm").val() || "",
    "compNo": $("#compNo").val() || "",
    "owner": $("#owner").val() || "",
    "major": $("#major").val() || "",
    "phone": $("#phone").val() || "",
    "taxEmail": $("#taxEmail").val() || "",
    "address": $("#address").val() || "",
    "compType": $("#compType").val() || "",
    "compPart": $("#compPart").val() || "",
    "remarks": $("#remarks").val() || "",
    "flagYN": flagParam
  };

  $.ajax({
    url: "act/saveCompany",
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
      fnReset();
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 거래처 초기화
  $("#compCd").val("0");
  $("#compNm").val("");
  $("#compNo").val("");
  $("#owner").val("");
  $("#major").val("");
  $("#phone").val("");
  $("#taxEmail").val("");
  $("#address").val("");
  $("#addressDetail").val("");
  $("#compType").val("");
  $("#compPart").val("");
  $("#remarks").val("");
  $("#flagYN").val("Y");

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
  $("#grid01").pqGrid("refreshDataAndView");

  // 파일 초기화
  $("#userFile").val("");
  $("#tableNm").val("tblCompany");
  $("#tableKey").val("0");
  $("#keyColumn").val("compCd");
  fnShowFiles("tblCompany", "0", "files");
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
  const findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [
    {part:"comCodeGroup", target:"findGroupCd", cd:""},
    {part:"comCodeGroup", target:"groupCd", cd:""}
  ];
  fnInitCombo (comboStr, function() {
    fnGetList01();
  });
});
