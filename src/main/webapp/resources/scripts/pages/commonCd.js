// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "commonCd.xlsx",
    title: "   공통 코드 관리",
    width: "auto",
    height: "100%",
    wrap: false,
    hwrap: false,
    editable:false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
    summaryData:  [],
    rowClick: (_, ui) => {
      fnShow (ui.rowData.groupCd, ui.rowData.itemCd);
    },
  };
  const colModel = [
    {
      title:"코드", dataIndx:"commonCd", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"그룹코드", dataIndx:"groupCd", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"그룹명", dataIndx:"groupNm", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"아이템코드", dataIndx:"itemCd", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"아이템", dataIndx:"itemNm", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"순위", dataIndx:"itemSeq", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"유효", dataIndx:"flagYN", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"메모", dataIndx:"itemMemo", dataType:"string", align:"center",
      minWidth: 100,
    },
  ];

  $.ajax({
    url: "act/listCommonCd",
    data: `findGroupCd=${$(`#findGroupCd`).val()}&findItemNm=${$(`#findItemNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      $grid01.pqGrid({
        ...gridOption,
        dataModel: { data: myJsonData },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(groupCd, itemCd) {

  $.ajax({
    url: "act/showCommonCd",
    data: `groupCd=${groupCd}&itemCd=${itemCd}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $(`#groupCd`).val(data.groupCd);
      $(`#groupNm`).val(data.groupNm);
      $(`#itemCd`).val(data.itemCd);
      $(`#itemCd`).prop("disabled", "disabled");
      $(`#itemNm`).val(data.itemNm);
      $(`#itemMemo`).val(data.itemMemo);
      $(`#itemSeq`).val(data.itemSeq);
      $(`#regGroup`).prop("disabled", "disabled");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYN) {

  let flagParam = "";
  let groupCd = $(`#groupCd`).val();
  let regGroup = $(`#regGroup`).val();
  let groupNm = "";

  if (flagYN === "N") {
    flagParam = "N";
    if (!groupCd && !regGroup) {
      alert("그룹을 바르게 선택해 주세요");
      $(`#groupCd`).on("focus", function () {});
      return;
    }
    if (!$(`#itemCd`).val()) {
      alert("아이템 코드를 바르게 선택해 주세요");
      $(`#itemCd`).on("focus", function () {});
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
      $(`#groupCd`).on("focus", function () {});
      return;
    }
    if (!$(`#itemCd`).val()) {
      alert("아이템 코드를 바르게 선택해 주세요");
      $(`#itemCd`).on("focus", function () {});
      return;
    }
    if (!$(`#itemNm`).val()) {
      alert("아이템을 바르게 입력해 주세요");
      $(`#itemNm`).on("focus", function () {});
      return;
    }
    if (regGroup) {
      if (confirm("신규 그룹을 등록하시겠습니까?")) {
        let regSplit = (typeof regGroup === 'string' ? regGroup : '').split("@");
        if (regSplit.length != 2) {
          alert("그룹코드@그룹명 형태로 등록해주세요");
          $(`#regGroup`).on("focus", function () {});
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
    "itemCd": $(`#itemCd`).val() || "",
    "itemNm": $(`#itemNm`).val() || "",
    "itemMemo": $(`#itemMemo`).val() || "",
    "itemSeq": $(`#itemSeq`).val() || 0,
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
  $(`#groupCd`).val("");
  $(`#itemCd`).val("");
  $(`#itemNm`).val("");
  $(`#itemSeq`).val("");
  $(`#regGroup`).val("");
  $(`#itemMemo`).val("");
  $(`#itemCd`).prop("disabled", "");
  $(`#regGroup`).prop("disabled", "");

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
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
