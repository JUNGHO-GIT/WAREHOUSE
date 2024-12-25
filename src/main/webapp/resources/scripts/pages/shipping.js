// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "shipping.xlsx",
    title: "   제품 출고 현황",
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
      const getData = $(`#grid02`).pqGrid("getData");
      const newRow = {
        inOutSeq: ui.rowData.inOutSeq,
        prodCd: ui.rowData.prodCd,
        prodNm: ui.rowData.prodNm,
        inOutDt: ui.rowData.inOutDt,
        option1: ui.rowData.option1,
        option2: ui.rowData.option2,
        qty: ui.rowData.qty,
      };
      let duplicateFlag = false;
      getData.forEach((row) => {
        if (row.prodCd === newRow.prodCd) {
          duplicateFlag = true;
        }
      });
      if (duplicateFlag) {
        alert("이미 추가된 제품입니다");
        return;
      }
      getData.push(newRow);
      $(`#grid02`).pqGrid({
        dataModel: {data: getData},
      })
      .pqGrid("refreshDataAndView");
    },
  };
  const colModel = [
    {
      title:"입출고코드", dataIndx:"inOutSeq", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"제품코드", dataIndx:"prodCd", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"출고일", dataIndx:"inOutDt", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150,
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"출고수량", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100,
    },
  ];
  $.ajax({
    url: `act/listShipping`,
    data:`inOutDt=${"P"}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = updateTitle("제품 출고 현황", data);

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

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02() {

  const $grid02 = $(`#grid02`);
  const delBtn = `<div class="delBtn">x</div>`;

  const gridOption = {
    xlsNm: "shipDetail.xlsx",
    title: "   출하 대기 목록",
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
    cellClick: (_, ui) => {
      if (ui.colIndx === 2) {
        fnDelProd(ui.rowIndx);
      }
    },
  };
  const colModel = [
    {
      title:"입출고코드", dataIndx:"inOutSeq", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"제품코드", dataIndx:"prodCd", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:delBtn, dataIndx:"delBtn", dataType:"string", align:"center",
      minWidth:30, maxWidth: 30,
      render: () => delBtn,
    },
    {
      title:"출고일", dataIndx:"inOutDt", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150,
    },
    {
      title:"출하수량", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:70,
    },
  ];
  $grid02.pqGrid({
    ...gridOption,
    colModel: colModel,
  })
  .pqGrid("refreshDataAndView");
};

// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSaveItems() {

  const getData = $(`#grid02`).pqGrid("getData");
  const rowCnt = getData.length;

  if (rowCnt < 1) {
    alert("제품을 추가해 주세요");
    return;
  }
  if ($(`#comp`).val() == "") {
    alert("거래처를 입력해 주세요");
    $(`#compNm`).trigger("focus");
    return;
  }
  if ($(`#toMajor`).val() == "") {
    alert("거래처 담당자를 입력해 주세요");
    $(`#toMajor`).trigger("focus");
    return;
  }
  if ($(`#toPhone`).val() == "") {
    alert("담당자 번호를 입력해 주세요");
    $(`#toPhone`).trigger("focus");
    return;
  }
  if ($(`#shipDt`).val() == "") {
    alert("출하 일자를 입력해 주세요");
    $(`#shipDt`).trigger("focus");
    return;
  }
  if ($(`#shipMajor`).val() == "") {
    alert("출하 담당자를 입력해 주세요");
    $(`#shipMajor`).trigger("focus");
    return;
  }
  if (!confirm("출하 하시겠습니까?")) {
    return;
  }

  let inOutSeqs = "";
  for (let i = 0; i < rowCnt; i++) {
    const gData = $(`#grid02`).pqGrid("getRowData", {rowIndxPage: i});
    if (inOutSeqs !== "" && i < rowCnt) {
      inOutSeqs += ",";
    }
    inOutSeqs += gData.inOutSeq;
  }

  const param = {
    "inOutSeqs": inOutSeqs,
    "shipCd": 0,
    "shipDt": $(`#shipDt`).val() || "",
    "shipMajor": $(`#shipMajor`).val() || "",
    "toMajor": $(`#toMajor`).val() || "",
    "toPhone": $(`#toPhone`).val() || "",
    "compCd": $(`#comp`).val() || 0,
    "flagYn": "Y",
    "planYn": "N"
  };

  $.ajax({
    url: `act/saveShipItems`,
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
      fnReset();
    },
    error: fnAjaxErrorHandler
  });
};

// 3-1. 계획 저장 ----------------------------------------------------------------------------------
function fnSavePlan() {

  const getData = $(`#grid02`).pqGrid("getData");
  const rowCnt = getData.length;

  if (rowCnt < 1) {
    alert("제품을 추가해 주세요");
    return;
  }
  if ($(`#comp`).val() == "") {
    alert("거래처를 입력해 주세요");
    $(`#compNm`).trigger("focus");
    return;
  }
  if ($(`#toMajor`).val() == "") {
    alert("거래처 담당자를 입력해 주세요");
    $(`#toMajor`).trigger("focus");
    return;
  }
  if ($(`#toPhone`).val() == "") {
    alert("담당자 번호를 입력해 주세요");
    $(`#toPhone`).trigger("focus");
    return;
  }
  if ($(`#shipDt`).val() == "") {
    alert("출하 일자를 입력해 주세요");
    $(`#shipDt`).trigger("focus");
    return;
  }
  if ($(`#shipMajor`).val() == "") {
    alert("출하 담당자를 입력해 주세요");
    $(`#shipMajor`).trigger("focus");
    return;
  }
  if (!confirm("출하 계획을 등록 하시겠습니까?")) {
    return;
  }

  let inOutSeqs = "";
  for (let i = 0; i < rowCnt; i++) {
    const gData = $(`#grid02`).pqGrid("getRowData", {rowIndxPage: i});
    if (inOutSeqs !== "" && i < rowCnt) {
      inOutSeqs += ",";
    }
    inOutSeqs += gData.inOutSeq;
  }

  const param = {
    "inOutSeqs": inOutSeqs,
    "shipCd": 0,
    "shipDt": $(`#shipDt`).val() || "",
    "shipMajor": $(`#shipMajor`).val() || "",
    "toMajor": $(`#toMajor`).val() || "",
    "toPhone": $(`#toPhone`).val() || "",
    "compCd": $(`#comp`).val() || 0,
    "flagYn": "Y",
    "planYn": "Y",
  };

  $.ajax({
    url: `act/saveShipPlan`,
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
      fnReset();
    },
    error: fnAjaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDelProd(rowIdx) {
  $(`#grid02`).pqGrid("setSelection", {rowIndx: rowIdx});
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
	$(`#grid02`).pqGrid({
    dataModel: { data: [] },
  })
  .pqGrid("refreshDataAndView");
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

  // 오늘
  const curDate = fnToday();

  // 2년 전
  const pastDate = fnAddDate(curDate, -730);

  $(`#shipDt`).datepicker(CALENDAR);
  $(`#shipDt`).val(curDate);
  $(`#findStartDt`).datepicker(CALENDAR);
  $(`#findEndDt`).datepicker(CALENDAR);
  $(`#findStartDt`).val(pastDate);
  $(`#findEndDt`).val(curDate);

  fnGetList01();
  fnGetList02();
});
