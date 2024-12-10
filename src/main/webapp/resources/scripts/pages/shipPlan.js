// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "shipPlan.xlsx",
    title: "   출하 계획 관리",
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
    fnShow(ui.rowData.shipCd);
    fnGetList02(ui.rowData.shipCd);
  };

  const colModel = [
    {dataIndx:"shipCd", title:"출하코드", dataType:"string", align:"center",,
      hidden:true,
    },
    {dataIndx:"shipDt", title:"출하예정일", dataType:"string", align:"center",
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"string", align:"center",,
      hidden:true,
    },
    {dataIndx:"compNm", title:"거래처", dataType:"string", align:"center",
    },
    {dataIndx:"toMajor", title:"거래처담당자", dataType:"string", align:"center",
    },
    {dataIndx:"toPhone", title:"담당자번호", dataType:"string", align:"center",
    },
    {dataIndx:"shipMajor", title:"출하담당자", dataType:"string", align:"center",
    },
    {dataIndx:"cnt", title:"출하항목수", dataType:"string", align:"center",
    },
  ];

  $.ajax({
    url: "act/listShipPlan",
    data:`shipDt=${"P"}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
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

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (shipCd) {

  const $grid02 = $(`#grid02`);
  $(`#shipCd`).val(shipCd);

  const gridOption = {
    xlsNm: "shippingList.xlsx",
    title: "   출하 계획 관리 목록",
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

  const colModel = [
    {dataIndx:"shipDt", title:"출하예정일", dataType:"string", align:"center"
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

  $.ajax({
    url: "act/listShipPlanDetail",
    data: `shipCd=${shipCd}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      // 제품이 있는 경우만 그리드 표시
      obj.dataModel = {
        data: myJsonData
        ? myJsonData.filter(function (item) {return item.prodNm ? item.prodNm.trim() : ""})
        : []
      };
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(shipCd) {

  $.ajax({
    url: "act/showShipPlan",
    data: `shipCd=${shipCd}&findStartDt=${$(`#findStartDt`).val()}&findEndDt=${$(`#findEndDt`).val()}`,
    type: "POST",
    dataType:"JSON",
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
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {

  var getData = $(`#grid01`).pqGrid("getData");
  var shipCd = "";
  var shipDt = "";
  var shipMajor = "";
  var toMajor = "";
  var toPhone = "";
  var compCd = "";
  var flagYN = "N";
  var planYN = "Y";

  for (let i = 0; i < getData.length; i++) {
    if (getData[i].pq_rowselect == true) {
      shipCd = parseInt(getData[i].shipCd);
      shipDt = getData[i].shipDt;
      shipMajor = getData[i].shipMajor;
      toMajor = getData[i].toMajor;
      toPhone = getData[i].toPhone;
      compCd = parseInt(getData[i].compCd);
    }
  }

  if (!shipCd) {
    alert("삭제할 출하 계획 항목을 선택해주세요");
    return;
  }
  if (!confirm("해당 출하 계획 항목을 삭제하시겠습니까?")) {
    return;
  }

  const param = {
    "shipCd": shipCd || "0",
    "shipDt": shipDt || "",
    "shipMajor": shipMajor || "",
    "toMajor": toMajor || "",
    "toPhone": toPhone || "",
    "compCd": compCd || "0",
    "flagYN": flagYN,
    "planYN": planYN
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
      fnGetList02();
      fnReset();
    },
    error: ajaxErrorHandler
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
	$(`#grid02`).pqGrid("option", "dataModel.data", []);
	$(`#grid02`).pqGrid("refreshDataAndView");
};

// 0. 엑셀 다운로드 --------------------------------------------------------------------------------
function fnExcelDown() {
  var shipCd = $(`#shipCd`).val();

  if (!shipCd) {
    alert("다운받을 출하 계획 항목을 선택해주세요");
    return;
  }
  var valUrl = "/shipPlanExcelDown?shipCd="+shipCd;
  window.open(valUrl);
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const curDate = fnToday();
  var pastDate = fnDateAdd(curDate, -30);
  $(`#inOutDt`).datepicker(G_calendar);
  $(`#inOutDt`).val(curDate);
  $(`#findStartDt`).datepicker(G_calendar);
  $(`#findEndDt`).datepicker(G_calendar);
  $(`#findStartDt`).val(pastDate);
  $(`#findEndDt`).val(curDate);

  fnGetList01();
  fnGetList02();
});
