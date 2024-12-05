// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const gridCd = "grid01";

  /** @type {pq.gridT.options} **/
  const gridOption = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "shipItems.xlsx",
    title: "   제품 출하 관리",
    width: "flex",
    height: "flex",
    wrap: false,
    hwrap: false,
    editable:false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:true},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  // 행 클릭시 실행
  obj.rowClick = function (event, ui) {
    fnShow(ui.rowData.shipCd);
    fnGetList02(ui.rowData.shipCd);
  };

  obj.colModel = [
    {dataIndx:"shipCd", title:"출하코드", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      hidden:true,
    },
    {dataIndx:"shipDt", title:"출하일", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      hidden:true,
    },
    {dataIndx:"compNm", title:"거래처", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"toMajor", title:"거래처담당자", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"toPhone", title:"담당자번호", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"shipMajor", title:"출하담당자", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"cnt", title:"출하항목수", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listShipItems",
    data:`shipDt=${"P"}&findStartDt=${$("#findStartDt").val()}&findEndDt=${$("#findEndDt").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (myJsonData) {
      obj.dataModel = {data:myJsonData};
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (shipCd) {

  const gridCd = "grid02";
  $("#shipCd").val(shipCd);

  /** @type {pq.gridT.options} **/
  const gridOption = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "shippingList.xlsx",
    title: "   제품 출하 상세 목록",
    width: "flex",
    height: "flex",
    wrap: false,
    hwrap: false,
    editable:false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  obj.colModel = [
    {dataIndx:"shipDt", title:"출하일", dataType:"string", align:"center"
    },
    {dataIndx:"prodNm", title:"제품명", dataType:"string", align:"center"
    },
    {dataIndx:"option1", title:"재질", dataType:"string", align:"center"
    },
    {dataIndx:"option2", title:"규격(사이즈)", dataType:"string", align:"center"
    },
    {dataIndx:"qty", title:"출하수량", dataType:"string", align:"center"
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listShipItemsDetail",
    data: `shipCd=${shipCd}&findStartDt=${$("#findStartDt").val()}&findEndDt=${$("#findEndDt").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (myJsonData) {
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
    url: "act/showShipItems",
    data: `shipCd=${shipCd}&findStartDt=${$("#findStartDt").val()}&findEndDt=${$("#findEndDt").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {

      // 1. 출하 관련
      $("#shipCd").val(data.shipCd);
      $("#toMajor").val(data.toMajor);
      $("#toPhone").val(data.toPhone);
      $("#shipDt").val(data.shipDt);
      $("#shipMajor").val(data.shipMajor);

      // 2. 거래처 관련
      fnFindCd("", data.compCd, "comp");
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {

  var getData = $("#grid01").pqGrid("getData");
  var shipCd = "";
  var shipDt = "";
  var shipMajor = "";
  var toMajor = "";
  var toPhone = "";
  var compCd = "";
  var flagYN = "N";
  var planYN = "Y";

  for (var i = 0; i < getData.length; i++) {
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
    alert("삭제할 출하 항목을 선택해주세요.");
    return;
  }
  if (!confirm("해당 출하 항목을 삭제하시겠습니까?")) {
    return;
  }

  var param = {
    "shipCd": shipCd,
    "shipDt": shipDt,
    "shipMajor": shipMajor,
    "toMajor": toMajor,
    "toPhone": toPhone,
    "compCd": compCd,
    "flagYN": flagYN,
    "planYN": planYN,
  };

  $.ajax({
    url: "act/saveShipItems",
    data: JSON.stringify(param),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
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

  var curDate = fnToday();

  // 출하 초기화
  $("#toMajor").val("");
  $("#toPhone").val("");
  $("#shipDt").val(curDate);
  $("#shipMajor").val("");

  // 거래처 초기화
  $("#compCd").val("");
  $("#compNm").val("");
  $("#comp").val("");
  $("#comp").html(`<option value="">==거래처==</option>`);

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
  $("#grid02").pqGrid("dataModel", {data: []});
  $("#grid02").pqGrid("refreshDataAndView");
};

// 0. 엑셀 다운로드 --------------------------------------------------------------------------------
function fnExcelDown() {
  var shipCd = $("#shipCd").val();

  if (!shipCd) {
    alert("다운받을 출하 항목을 선택해주세요.");
    return;
  }
  var valUrl = "/shipItemsExcelDown?shipCd="+shipCd;
  window.open(valUrl);
};

// 0. 엔터, 클릭, 체인지 이벤트 발생시에만 조회 ----------------------------------------------------
function fnPressGet01(event) {
  if (
    (event.key === "Enter") ||
    (event.type === "click") ||
    (event.type === "change")
  ) {
    event.preventDefault();
    fnReset();
    fnGetList01();
  }
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  var curDate = fnToday();
  var pastDate = fnDateAdd(curDate, -30);
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);
  $("#findStartDt").datepicker(G_calendar);
  $("#findEndDt").datepicker(G_calendar);
  $("#findStartDt").val(pastDate);
  $("#findEndDt").val(curDate);

  fnGetList01();
  fnGetList02();
});
