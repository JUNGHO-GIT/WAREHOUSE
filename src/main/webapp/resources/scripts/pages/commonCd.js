// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid = $(`#grid01`);

  const gridOption = {
    xlsNm: "commonCd.xlsx",
    title: "   공통 코드 관리",
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
    fnShow (ui.rowData.groupCd, ui.rowData.itemCd);
  };

  obj.colModel = [
    {dataIndx:"commonCd", title:"코드", dataType:"string", align:"center",
      hidden:true,
    },
    {dataIndx:"groupCd", title:"그룹코드", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
    },
    {dataIndx:"groupNm", title:"그룹명", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
    },
    {dataIndx:"itemCd", title:"아이템코드", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"itemNm", title:"아이템", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"itemSeq", title:"순위", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"flagYN", title:"유효", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
    },
    {dataIndx:"itemMemo", title:"메모", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listCommonCd",
    data: `findGroupCd=${$("#findGroupCd").val()}&findItemNm=${$("#findItemNm").val()}`,
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

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(groupCd, itemCd) {

  $.ajax({
    type: "POST",
    url: "act/showCommonCd",
    dataType:"JSON",
    data: `groupCd=${groupCd}&itemCd=${itemCd}`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $("#groupCd").val(data.groupCd);
      $("#groupNm").val(data.groupNm);
      $("#itemCd").val(data.itemCd);
      $("#itemCd").prop("disabled", "disabled");
      $("#itemNm").val(data.itemNm);
      $("#itemMemo").val(data.itemMemo);
      $("#itemSeq").val(data.itemSeq);
      $("#regGroup").prop("disabled", "disabled");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYN) {

  let flagParam = "";
  var groupCd = $("#groupCd").val();
  var regGroup = $("#regGroup").val();
  var groupNm = "";

  if (flagYN === "N") {
    flagParam = "N";
    if (!groupCd && !regGroup) {
      alert("그룹을 바르게 선택해 주세요");
      $("#groupCd").on("focus", function () {});
      return;
    }
    if (!$("#itemCd").val()) {
      alert("아이템 코드를 바르게 선택해 주세요");
      $("#itemCd").on("focus", function () {});
      return;
    }
    if (!confirm("삭제 하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if (!groupCd && !regGroup) {
      alert("그룹을 바르게 선택해 주세요");
      $("#groupCd").on("focus", function () {});
      return;
    }
    if (!$("#itemCd").val()) {
      alert("아이템 코드를 바르게 선택해 주세요");
      $("#itemCd").on("focus", function () {});
      return;
    }
    if (!$("#itemNm").val()) {
      alert("아이템을 바르게 입력해 주세요");
      $("#itemNm").on("focus", function () {});
      return;
    }
    if (regGroup) {
      if (confirm("신규 그룹을 등록하시겠습니까?")) {
        var regSplit = regGroup.split("@");
        if (regSplit.length != 2) {
          alert("그룹코드@그룹명 형태로 등록해주세요");
          $("#regGroup").on("focus", function () {});
          return;
        }
        groupCd = regSplit[0];
        groupNm = regSplit[1];
      }
      else {
        return;
      }
    }
  }

  const param = {
    "groupCd": groupCd,
    "groupNm": groupNm,
    "itemCd": $("#itemCd").val() || "",
    "itemNm": $("#itemNm").val() || "",
    "itemMemo": $("#itemMemo").val() || "",
    "itemSeq": $("#itemSeq").val() || 0,
    "flagYN": flagParam
  };

  $.ajax({
    url: "act/saveCommonCd",
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

  // 공통코드 초기화
  $("#groupCd").val("");
  $("#itemCd").val("");
  $("#itemNm").val("");
  $("#itemSeq").val("");
  $("#regGroup").val("");
  $("#itemMemo").val("");
  $("#itemCd").prop("disabled", "");
  $("#regGroup").prop("disabled", "");

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
  $("#grid01").pqGrid("refreshDataAndView");
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
  fnInitCombo(comboStr, function() {
    fnGetList01();
  });
});
