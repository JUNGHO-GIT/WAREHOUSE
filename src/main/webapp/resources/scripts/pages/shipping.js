// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "shipping.xlsx",
    title: "   제품 출고 현황",
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
  };

  // 행 클릭시 실행
  obj.rowClick = function (event, ui) {
    // 1. grid02에 추가
    var getData = $(`#grid02`).pqGrid("getData");
    var newRow = {
      inOutSeq: ui.rowData.inOutSeq,
      prodCd: ui.rowData.prodCd,
      prodNm: ui.rowData.prodNm,
      inOutDt: ui.rowData.inOutDt,
      option1: ui.rowData.option1,
      option2: ui.rowData.option2,
      qty: ui.rowData.qty,
    };
    // 2. 그리드 데이터가 있을 경우 중복체크
    var duplicateFlag = false;
    for (let i = 0; i < getData.length; i++) {
      var row = getData[i];
      if (row.prodCd === newRow.prodCd) {
        duplicateFlag = true;
        break;
      }
    }
    if (duplicateFlag) {
      alert("이미 추가된 제품입니다");
      return;
    }
    getData.push(newRow);
    $(`#grid02`).pqGrid("option", "dataModel", {data: getData});
    $(`#grid02`).pqGrid("refreshDataAndView");
  };

  const colModel = [
    {dataIndx:"inOutSeq", title:"입출고코드", dataType:"string", align:"center",,
      hidden:true,
    },
    {dataIndx:"prodCd", title:"제품코드", dataType:"string", align:"center",,
      hidden:true,
    },
    {dataIndx:"inOutDt", title:"출고일", dataType:"string", align:"center",
    },
    {dataIndx:"prodNm", title:"제품", dataType:"string", align:"center",
    },
    {dataIndx:"option1", title:"재질", dataType:"string", align:"center",
    },
    {dataIndx:"option2", title:"규격", dataType:"string", align:"center",
    },
    {dataIndx:"qty", title:"출고수량", dataType:"string", align:"center",
    },
  ];

  $.ajax({
    url: "act/listShipping",
    data:`inOutDt=${"P"}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      obj.dataModel = {data: myJsonData};
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02() {

  const $grid02 = $(`#grid02`);
  var delBtn = `<button class="btn btn-danger btn-sm delBtn">x</button>`;

  const gridOption = {
    xlsNm: "shipDetail.xlsx",
    title: "   제품 출하 대기 목록",
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
  };

  // 셀 클릭시 실행
  obj.cellClick = function (event, ui) {
    if (ui.colIndx == 2) {
      fnDelProd(ui.rowIndx);
    }
  };

  const colModel = [
    {dataIndx:"inOutSeq", title:"입출고코드", align:"center", dataType:"string",
      hidden:true,
    },
    {dataIndx:"prodCd", title:"제품코드", align:"center", dataType:"string",
      hidden:true,
    },
    {dataIndx:"delBtn", title:delBtn, align:"center", dataType:"string",
      editable:false, sortable:false, minWidth:30, maxWidth:30,
      render:function () {return delBtn;}
    },
    {dataIndx:"inOutDt", title:"출고일", dataType:"string", align:"center"
    },
    {dataIndx:"prodNm", title:"제품명", dataType:"string", align:"center"
    },
    {dataIndx:"option1", title:"재질", dataType:"string", align:"center"
    },
    {dataIndx:"option2", title:"규격", dataType:"string", align:"center"
    },
    {dataIndx:"qty", title:"출하수량", dataType:"string", align:"center"
    },
  ];
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSaveItems() {

  var getData = $(`#grid02`).pqGrid("getData");
  var rowCnt = getData.length;

  if (rowCnt < 1) {
    alert("제품을 추가해 주세요");
    return;
  }
  if ($(`#comp`).val() == "") {
    alert("거래처를 입력해 주세요");
    $(`#compNm`).on("focus", function () {});
    return;
  }
  if ($(`#toMajor`).val() == "") {
    alert("거래처 담당자를 입력해 주세요");
    $(`#toMajor`).on("focus", function () {});
    return;
  }
  if ($(`#toPhone`).val() == "") {
    alert("담당자 번호를 입력해 주세요");
    $(`#toPhone`).on("focus", function () {});
    return;
  }
  if ($(`#shipDt`).val() == "") {
    alert("출하 일자를 입력해 주세요");
    $(`#shipDt`).on("focus", function () {});
    return;
  }
  if ($(`#shipMajor`).val() == "") {
    alert("출하 담당자를 입력해 주세요");
    $(`#shipMajor`).on("focus", function () {});
    return;
  }
  if (!confirm("출하 하시겠습니까?")) {
    return;
  }

  var inOutSeq = "";
  for (let i = 0; i < rowCnt; i++) {
    var gData = $(`#grid02`).pqGrid("getRowData", {rowIndxPage: i});
    if (inOutSeq != "" && i < rowCnt) {
      inOutSeq += ",";
    }
    inOutSeq += gData.inOutSeq;
  };

  var shipCd = 0;
  var compCd = parseInt($(`#comp`).val()) || 0;
  var toMajor = $(`#toMajor`).val() || "";
  var toPhone = $(`#toPhone`).val() || "";
  var shipDt = $(`#shipDt`).val() || "";
  var shipMajor = $(`#shipMajor`).val() || "";
  var flagYN = "Y";
  var planYN = "N";

  const param = {
    "shipCd": shipCd,
    "shipDt": shipDt,
    "shipMajor": shipMajor,
    "toMajor": toMajor,
    "toPhone": toPhone,
    "compCd": compCd,
    "inOutSeq": inOutSeq,
    "flagYN": flagYN,
    "planYN": planYN
  };

  $.ajax({
    url: "act/saveShipItems",
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

// 3-1. 계획 저장 ----------------------------------------------------------------------------------
function fnSavePlan() {

  var getData = $(`#grid02`).pqGrid("getData");
  var rowCnt = getData.length;

  if (rowCnt < 1) {
    alert("제품을 추가해 주세요");
    return;
  }
  if ($(`#comp`).val() == "") {
    alert("거래처를 입력해 주세요");
    $(`#compNm`).on("focus", function () {});
    return;
  }
  if ($(`#toMajor`).val() == "") {
    alert("거래처 담당자를 입력해 주세요");
    $(`#toMajor`).on("focus", function () {});
    return;
  }
  if ($(`#toPhone`).val() == "") {
    alert("담당자 번호를 입력해 주세요");
    $(`#toPhone`).on("focus", function () {});
    return;
  }
  if ($(`#shipDt`).val() == "") {
    alert("출하 일자를 입력해 주세요");
    $(`#shipDt`).on("focus", function () {});
    return;
  }
  if ($(`#shipMajor`).val() == "") {
    alert("출하 담당자를 입력해 주세요");
    $(`#shipMajor`).on("focus", function () {});
    return;
  }
  if (!confirm("출하 계획을 등록 하시겠습니까?")) {
    return;
  }

  // ex. 125,126,127 ...
  var inOutSeq = "";
  for (let i = 0; i < rowCnt; i++) {
    var gData = $(`#grid02`).pqGrid("getRowData", {rowIndxPage: i});
    if (inOutSeq != "" && i < rowCnt) {
      inOutSeq += ",";
    }
    inOutSeq += gData.inOutSeq;
  };

  const param = {
    "shipCd": 0,
    "shipDt": $(`#shipDt`).val() || "",
    "shipMajor": $(`#shipMajor`).val() || "",
    "toMajor": $(`#toMajor`).val() || "",
    "toPhone": $(`#toPhone`).val() || "",
    "compCd": parseInt($(`#comp`).val()) || 0,
    "flagYN": "Y",
    "planYN": "Y",
    "inOutSeq": inOutSeq
  };

  $.ajax({
    url: "act/saveShipPlan",
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
function fnDelProd(rowIdx) {
  $(`#grid02`).pqGrid("deleteRow", {rowIndx: rowIdx});
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  const curDate = fnToday();

  // 출하 초기화
  $(`#toMajor`).val("");
  $(`#toPhone`).val("");
  $(`#shipDt`).val(curDate);
  $(`#shipMajor`).val("");

  // 거래처 초기화
  $(`#compCd`).val("");
  $(`#compNm`).val("");
  $(`#comp`).val("");
  $(`#comp`).html(`<option value="">==거래처==</option>`);

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
	$(`#grid02`).pqGrid("option", "dataModel.data", []);
	$(`#grid02`).pqGrid("refreshDataAndView");
};

// 5-2. 초기화 (검색시) ----------------------------------------------------------------------------
function fnResetWhenSearch() {

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const curDate = fnToday();
  var pastDate = fnDateAdd(curDate, -30);
  $(`#shipDt`).datepicker(G_calendar);
  $(`#shipDt`).val(curDate);
  $(`#findStartDt`).datepicker(G_calendar);
  $(`#findEndDt`).datepicker(G_calendar);
  $(`#findStartDt`).val(pastDate);
  $(`#findEndDt`).val(curDate);

  fnGetList01();
  fnGetList02();
});
