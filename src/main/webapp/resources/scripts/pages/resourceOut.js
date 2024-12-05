// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const gridCd = "grid01";

  /** @type {pq.gridT.options} **/
  const gridOption = {
    title: "   자재 출고 관리",
    width: "flex",
    height: "flex",
    wrap: false,
    hwrap: false,
    editable: false,
    swipeModel: {on: false},
    pasteModel: {on: false},
    filterModel: {on: true, mode: "AND", header: true},
    selectionModel: {type: "row", mode: "single"},
    pageModel: {type: "local", rPP: 100, rPPOptions: [10, 20, 50, 100]},
    scrollModel: {autoFit: true, theme: true, pace: "fast", horizontal: true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
  };

  /** @type {pq.gridT.colModel} **/
  const colModel = [
    {
      title: "이미지", dataIndx: "fileUrl", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      minWidth: 70, maxWidth: 70,
      render: renderImage,
    },
    {
      title: "자재명", dataIndx: "resrcNm", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      minWidth: 100,
    },
    {
      title: "창고", dataIndx: "houseNm", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "재질", dataIndx: "option1", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "안전재고", dataIndx: "protectedQty", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "입고", dataIndx: "inQty", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderZero,
    },
    {
      title: "출고", dataIndx: "outQty", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderZero,
    },
    {
      title: "재고", dataIndx: "qty", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderZero,
    },
    {
      title: "재고부족", dataIndx: "lowStock", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: displayLowStock,
    },
    {
      title: "바코드", dataIndx: "barcode", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    // footer
    {
      title: "합계", dataIndx: "qty", dataType: "string", align: "center",
      summary: {
        type: "sum",
        edit: false,
      },
      render: calcSum,
    },
  ];

  function rowClick (event, ui) {
    fnGetList02(ui.rowData.resrcCd);
    fnReset();
    fnFindCd("", ui.rowData.resrcCd, "resrc");
    fnFindCd("", ui.rowData.houseCd, "house");
    fnFindCd("", ui.rowData.compCd, "comp");
  };

  function renderImage(ui) {
    const imageUrl = ui.rowData.fileUrl || "noGridImage.webp";
    return (
      `<img
        src="viewFiles?fileUrl=${imageUrl}"
        class="w-100p h-auto radius-1 shadow-1"
        loading="lazy"
      />`
    );
  };

  function renderZero(ui) {
    return ui.cellData ? ui.cellData : "0";
  };

  function calcSum(data, dataIndex) {
    if (!data) {
      return "0";
    }
    const sum = data.reduce(function(acc, row) {
      const value = Number(row[dataIndex]);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
    return sum.toLocaleString();
  };

  function calcLowStock(data) {
    let lowStockCount = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      row.lowStock = parseInt(row.qty) <= parseInt(row.protectedQty) ? 1 : 0;
      if (row.lowStock === 1) {
        lowStockCount++;
      }
    }
    return lowStockCount;
  };

  function displayLowStock(ui) {
    return ui.rowData.lowStock === 1 ? `<span class="fs-1-5rem red">●</span>` : "";
  };

  $.ajax({
    url: "act/listResource",
    data: `findResrcNm=${$("#findResrcNm").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (myJsonData) {
      const title = `
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-left">
          <span>자재 출고 관리</span>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-right ml-n50px">
          <span class="fs-1-4rem red">●</span>
          <span class="ml-5px mr-5px">안전재고 이하 : </span>
          <span class="red">${calcLowStock(myJsonData)}</span>
        </div>
      </div>
      `;
      const summaryData = [{
        pq_rowcls: "summary-row",
        fileUrl: "noGridImage.webp",
        resrcNm: `<b>Total : </b>`,
        protectedQty: calcSum(myJsonData, "protectedQty"),
        inQty: calcSum(myJsonData, "inQty"),
        outQty: calcSum(myJsonData, "outQty"),
        qty: calcSum(myJsonData, "qty"),
      }];
      const dataModel = {data: myJsonData};
      $("#" + gridCd).pqGrid({
        ...gridOption,
        title,
        summaryData,
        dataModel,
        colModel,
        rowClick,
      }).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (resrcCd) {

  $("#resrcCd").val(resrcCd);

  const gridCd = "grid02";

  /** @type {pq.gridT.options} **/
  const gridOption = {
    title: "   자재 입출고 내역",
    width: "flex",
    height: "flex",
    wrap: false,
    hwrap: false,
    editable: false,
    swipeModel: {on: false},
    pasteModel: {on: false},
    filterModel: {on: true, mode: "AND", header: true},
    selectionModel: {type: "row", mode: "single"},
    pageModel: {type: "local", rPP: 100, rPPOptions: [10, 20, 50, 100]},
    scrollModel: {autoFit: true, theme: true, pace: "fast", horizontal: true, flexContent: true},
    numberCell:{show:true, resizable:false, width:30},
  };

  /** @type {pq.gridT.colModel} **/
  const colModel = [
    {
      title: "일자", dataIndx: "inOutDt", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "분류", dataIndx: "inOut", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "거래처", dataIndx: "compNm", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "창고", dataIndx: "houseNm", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
    },
    {
      title: "수량", dataIndx: "qty", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderQty,
    },
    {
      title: "표준단가", dataIndx: "unitPrice", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderPrice,
    },
    {
      title: "공급가", dataIndx: "supplyPrice", dataType: "string", align: "center",
      filter: { options: { type: "textbox", condition: "contain", listeners: ["keyup"]}},
      render: renderPrice,
    },
  ];

  function renderQty(ui) {
    return ui.cellData ? ui.cellData : "0";
  };

  function renderPrice(ui) {
    return ui.cellData ? ui.cellData.toLocaleString() : "0";
  };

  $.ajax({
    url: "act/listResourceInOut",
    data: `resrcCd=${resrcCd}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (myJsonData) {
      const dataModel = {data: myJsonData};
      $(`#${gridCd}`).pqGrid({
        ...gridOption,
        dataModel,
        colModel,
      }).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(inOutSeq) {

  $.ajax({
    url: "act/showResourceInOut",
    data: `inOutSeq=${inOutSeq}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {

      // 1. 자재 관련 (입출고)
      $("#remark").val(data.remark);
      $("#inOutSeq").val(data.inOutSeq);
      $("#inOutDt").val(data.inOutDt);
      $("#unitPrice").val(fnGetNumWithComma(data.unitPrice));
      $("#supplyPrice").val(fnGetNumWithComma(data.supplyPrice));
      $("#qty").val(fnGetNumWithComma(Math.abs(data.qty)));
      $("#inOut").val(data.inOut);

      // 2. 자재 관련 (일반)
      fnFindCd("", data.resrcCd, "resrc");

      // 3. 창고 관련
      fnFindCd("", data.houseCd, "house");

      // 4. 거래처 관련
      fnFindCd("", data.compCd, "comp");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYN) {

  var flagParam = "";
  var planParam = "";
  var resrcCd = $("#resrcCd").val();

  if (flagYN === "N") {
    flagParam = "N";
    planParam = "N";
    if ($("#grid02").pqGrid("getData").length === 0) {
      alert("자재 입출고 내역이 없습니다.");
      return;
    }
    if (!confirm("선택하신 입출고 내역을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    planParam = "N";
    if ($("#resrc").val() == "") {
      alert("자재 이름을 입력해 주세요.");
      $("#resrc").on("focus", function () {});
      return;
    }
    if (!$("#inOutDt").val()) {
      alert("날짜를 입력해 주세요.");
      $("#inOutDt").on("focus", function () {});
      return;
    }
    if ($("#comp").val() == "") {
      alert("거래처를 입력해 주세요.");
      $("#comp").on("focus", function () {});
      return;
    }
    if ($("#house").val() == "") {
      alert("창고를 입력해 주세요.");
      $("#house").on("focus", function () {});
      return;
    }
    if ($("#qty").val() == "" || $("#qty").val() == "0") {
      alert("수량을 입력해 주세요.");
      $("#qty").on("focus", function () {});
      return;
    }
    if ($("#unitPrice").val() == "" || $("#unitPrice").val() == "0") {
      alert("표준단가를 입력해 주세요.");
      $("#unitPrice").on("focus", function () {});
      return;
    }
  }

  var inOut = $("#inOut").val();
  var qty = fnGetNumRemoveComma($("#qty").val());
  var unitPrice = fnGetNumRemoveComma($("#unitPrice").val());
	if (inOut === "out") {
    qty = qty * -1;
  }
  else if (inOut === "in") {
    qty = qty * 1;
  }

  var param = {
    "inOutSeq": $("#inOutSeq").val() || 0,
    "inOutDt": $("#inOutDt").val() || "",
    "inOut": inOut || "",
    "resrcCd": $("#resrc").val() || 0,
    "resrcNm": $("#resrcNm").val() || "",
    "compCd": $("#comp").val() || 0,
    "compNm": $("#compNm").val() || "",
    "houseCd": $("#house").val() || 0,
    "houseNm": $("#houseNm").val() || "",
    "remark": $("#remark").val() || "",
    "qty": qty || 0,
    "unitPrice": unitPrice || 0,
    "supplyPrice": unitPrice * qty,
    "flagYN": flagParam,
    "planYN": planParam
  };

  $.ajax({
    url: "act/saveResourceInOut",
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
      fnGetList02(resrcCd);
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

  var curDate = fnToday();

  // 자재 초기화
  $("#qty").val("0");
  $("#unitPrice").val("0");
  $("#supplyPrice").val("0");
  $("#remark").val("");
  $("#inOutSeq").val("");
  $("#inOutDt").val(curDate);
  $("#inOut").val("out");

  // 창고 초기화
  $("#houseCd").val("");
  $("#houseNm").val("");
  $("#house").val("");
  $("#house").html(`<option value="">==창고==</option>`);

  // 거래처 초기화
  $("#compCd").val("");
  $("#compNm").val("");
  $("#comp").val("");
  $("#comp").html(`<option value="">==거래처==</option>`);

  // 그리드 초기화
  $("#grid02").pqGrid("setSelection", null);
  $("#grid02").pqGrid("refreshDataAndView");
};

// 5-2. 초기화 (검색시) ----------------------------------------------------------------------------
function fnResetWhenSearch() {

	// 자재 초기화
  $("#resrc").val("");
  $("#resrc").html(`<option value="">==자재==</option>`);

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
  $("#grid01").pqGrid("dataModel", {data: []});
  $("#grid01").pqGrid("refreshDataAndView");
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

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  var findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  var curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  var comboStr = [{part:"comCode", target:"resrcType", groupCd:"0003", format:"combo"}];
  fnInitCombo (comboStr, function() {
    fnGetList01();
    fnGetList02();
  });
});
