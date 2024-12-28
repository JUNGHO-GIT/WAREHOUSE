// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "shipPlan.xlsx",
    title: "   출하 계획 관리",
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
      fnShow(ui.rowData.shipCd);
      fnGetList02(ui.rowData.shipCd);
    },
  };
  const colModel = [
    {
      title:"출하코드", dataIndx:"shipCd", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"거래처코드", dataIndx:"compCd", dataType:"string", align:"center",
      hidden:true,
    },
    {
      title:"출하예정일", dataIndx:"shipDt", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"거래처", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"거래처담당자", dataIndx:"toMajor", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"담당자번호", dataIndx:"toPhone", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"출하담당자", dataIndx:"shipMajor", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"항목수", dataIndx:"cnt", dataType:"string", align:"center",
      minWidth:70,
    },
  ];
  $.ajax({
    url: `act/listShipPlan`,
    data:`shipDt=${"P"}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("출하 계획 관리", data);

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
function fnGetList02 (shipCd) {

  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "shipPlanDetail.xlsx",
    title: "   출하 계획 목록",
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
  };
  const colModel = [
    {
      title:"출하예정일", dataIndx:"shipDt", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"출하수량", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:70,
    },
  ];

  $(`#shipCd`).val(shipCd);
  $.ajax({
    url: `act/listShipPlanDetail`,
    data: `shipCd=${shipCd}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $grid02.pqGrid({
        ...gridOption,
        dataModel: { data: data },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: fnAjaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(shipCd) {

  $.ajax({
    url: `act/showShipPlan`,
    data:`shipCd=${shipCd}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 1. 출하 관련
      $(`#shipCd`).val(data.shipCd);
      $(`#toMajor`).val(data.toMajor);
      $(`#toPhone`).val(data.toPhone);
      $(`#shipDt`).val(data.shipDt);
      $(`#shipMajor`).val(data.shipMajor);

      // 2. 거래처 관련
      fnFindCd("", data.compCd, "comp", null);
    },
    error: fnAjaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {

  const $grid01 = $(`#grid01`);
  const getData = $grid01.pqGrid("getData");

  if (getData.length === 0) {
    alert("삭제할 출하 예정 항목이 없습니다");
    return;
  }
  if (!confirm("해당 출하 예정 항목을 삭제하시겠습니까?")) {
    return;
  }

  const param = {
    shipCd: $(`#shipCd`).val() || "0",
    shipDt: $(`#shipDt`).val() || "",
    shipMajor: $(`#shipMajor`).val() || "",
    toMajor: $(`#toMajor`).val() || "",
    toPhone: $(`#toPhone`).val() || "",
    compCd: $(`#compCd`).val() || "",
    flagYn: "N",
    planYn: "Y",
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
      fnGetList02();
      fnReset();
    },
    error: fnAjaxErrorHandler
  });
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

// 0. 엑셀 다운로드 --------------------------------------------------------------------------------
function fnExcelDown() {
  const shipCd = $(`#shipCd`).val();

  if (!shipCd) {
    alert("다운받을 출하 계획 항목을 선택해주세요");
    return;
  }

  const valUrl = `/shipPlanExcelDown?shipCd=${shipCd}`;
  location.href = valUrl;
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {

  // 오늘
  const curDate = fnToday();

  // 2년 전
  const pastDate = fnAddDate(curDate, -730);

  $(`#inOutDt`).datepicker(CALENDAR);
  $(`#inOutDt`).val(curDate);
  $(`#findStartDt`).datepicker(CALENDAR);
  $(`#findEndDt`).datepicker(CALENDAR);
  $(`#findStartDt`).val(pastDate);
  $(`#findEndDt`).val(curDate);

  fnGetList01();
  fnGetList02();
});
