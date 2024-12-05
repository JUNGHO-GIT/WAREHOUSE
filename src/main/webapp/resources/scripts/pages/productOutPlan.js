// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
var fnGetList01 = function () {

  var gridCd = "grid01";

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "productPlan.xlsx",
    title: "   제품 출고 예정",
    width: "auto",
    height: "auto",
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
    fnGetList02(ui.rowData.prodCd);
    fnReset();
    fnFindCd("", ui.rowData.prodCd, "prod");
    fnFindCd("", ui.rowData.houseCd, "house");
    fnFindCd("", ui.rowData.compCd, "comp");
  };

  // 이미지 렌더링
  obj.renderImage = function(ui) {
    var imageUrl = "";
    var noImage = "no-image.webp";
    var noGridImage = "noGridImage.webp";
    var rowImage = ui.rowData.fileUrl;if (!rowImage || ui.rowData.fileUrl === noGridImage) {
      imageUrl = (
        `<img
          src="viewFiles?fileUrl=${noImage}"
          class="w-100p h-auto radius-1 shadow-1"
          loading="lazy"
        />`
      );
    }
    else {
      imageUrl = (
        `<img
          src="viewFiles?fileUrl=${rowImage}"
          class="w-100p h-auto radius-1 shadow-1"
          loading="lazy"
        />`
      );
    }
    return imageUrl;
  };

  // 빈값 0으로 출력
  obj.renderZero = function(ui) {
    return ui.cellData ? ui.cellData : "0";
  };

  // 푸터 합계 계산
  obj.calcSum = function (data, dataIndex) {
    if (!data) {
      return "0";
    }
    var sum = data.reduce(function(acc, row) {
      var value = Number(row[dataIndex]);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
    return sum.toLocaleString();
  };

  // 안전재고 이하 갯수 계산
  obj.calcLowStock = function (data) {
    var lowStockCount = 0;
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      row.lowStock = parseInt(row.qty) <= parseInt(row.protectedQty) ? 1 : 0;
      if (row.lowStock === 1) {
        lowStockCount++;
      }
    }
    return lowStockCount;
  };

  // 안전재고 이하 표시
  obj.displayLowStock = function (ui) {
    return ui.rowData.lowStock === 1 ? `<span class="fsr-2.5 red">●</span>` : "";
  };

  obj.colModel = [
    {dataIndx:"fileUrl", title:"이미지", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:70, maxWidth:70, render: obj.renderImage,
    },
    {dataIndx:"prodNm", title:"제품명", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:200
    },
    {dataIndx:"houseNm", title:"창고", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"option1", title:"재질", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"protectedQty", title:"안전재고", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"inQty", title:"입고", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      render: obj.renderZero
    },
    {dataIndx:"outQty", title:"출고", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      render: obj.renderZero
    },
    {dataIndx:"qty", title:"재고", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      render: obj.renderZero
    },
    {dataIndx:"lowStock", title:"재고부족", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      render: obj.displayLowStock
    },
    {dataIndx:"barcode", title:"바코드", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listProduct",
    data: `findProdNm=${$("#findProdNm").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (myJsonData) {

      // 1. 콜백 데이터 할당
      obj.dataModel = {data:myJsonData};

      // 2. title에 안전재고 이하 갯수 표시
      obj.title = `
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-left">
          <span>제품 출고 예정</span>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-right ml-n50px">
          <span class="fsr-1.4 red">●</span>
          <span class="ml-5px mr-5px">안전재고 이하 : </span>
          <span class="red">${obj.calcLowStock(myJsonData)}</span>
        </div>
      </div>
      `;

      // 3. footer에 합계표시
      obj.summaryData = [{
        pq_rowcls: "summary-row",
        fileUrl: "noGridImage.webp",
        prodNm: `<b>Total : </b>`,
        protectedQty: obj.calcSum(myJsonData, "protectedQty"),
        inQty: obj.calcSum(myJsonData, "inQty"),
        outQty: obj.calcSum(myJsonData, "outQty"),
        qty: obj.calcSum(myJsonData, "qty")
      }];

      // 4. 그리드 갱신
      $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
var fnGetList02 = function (prodCd) {

  var gridCd = "grid02";
  $("#prodCd").val(prodCd);

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "productOutPlan.xlsx",
    title: "   제품 출고 예정 내역",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    editable:false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    scrollModel: {autoFit:true},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  // 행 클릭시 실행
  obj.rowClick = function (event, ui) {
    fnShow(ui.rowData.inOutSeq);
  };

  obj.colModel = [
    {dataIndx:"inOutDt", title:"일자", dataType:"string", align:"center"
    },
    {dataIndx:"inOut", title:"분류", dataType:"string", align:"center"
    },
    {dataIndx:"compNm", title:"거래처", dataType:"string", align:"center"
    },
    {dataIndx:"houseNm", title:"창고", dataType:"string", align:"center"
    },
    {dataIndx:"qty", title:"수량", dataType:"string", align:"right", format:"#,###"
    },
    {dataIndx:"unitPrice", title:"표준단가", dataType:"string", align:"right", format:"#,###"
    },
    {dataIndx:"supplyPrice", title:"공급가", dataType:"string", align:"right", format:"#,###"
    }
  ];

	// ajax 호출
  $.ajax({
    url: "act/listProductInOutPlan",
    data: `prodCd=${prodCd}`,
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

// 2. 상세 항목 ------------------------------------------------------------------------------------
var fnShow = function (inOutSeq) {

  $.ajax({
    url: "act/showProductInOutPlan",
    data: `inOutSeq=${inOutSeq}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {

      // 1. 제품 관련 (입출고)
      $("#remark").val(data.remark);
      $("#inOutSeq").val(data.inOutSeq);
      $("#inOutDt").val(data.inOutDt);
      $("#unitPrice").val(fnGetNumWithComma(data.unitPrice));
      $("#supplyPrice").val(fnGetNumWithComma(data.supplyPrice));
      $("#qty").val(fnGetNumWithComma(Math.abs(data.qty)));
      $("#inOut").val(data.inOut);

      // 2. 제품 관련 (일반)
      fnFindCd("", data.prodCd, "prod");

      // 3. 창고 관련
      fnFindCd("", data.houseCd, "house");

      // 4. 거래처 관련
      fnFindCd("", data.compCd, "comp");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
var fnSave = function (flagYN) {

  var flagParam = "";
  var planParam = "";
  var prodCd = $("#prodCd").val();

  if (flagYN === "N") {
    flagParam = "N";
    planParam = "Y";
    if ($("#grid02").pqGrid("getData").length === 0) {
      alert("제품 입출고 예정 내역이 없습니다.");
      return;
    }
    if (!confirm("선택하신 입출고 예정 내역을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    planParam = "Y";
    if ($("#prod").val() == "") {
      alert("제품 이름을 입력해 주세요.");
      $("#prod").on("focus", function () {});
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
    "prodCd": $("#prod").val() || 0,
    "prodNm": $("#prodNm").val() || "",
    "houseCd": $("#house").val() || 0,
    "houseNm": $("#houseNm").val() || "",
    "compCd": $("#comp").val() || 0,
    "compNm": $("#compNm").val() || "",
    "remark": $("#remark").val() || "",
    "qty": qty || 0,
    "unitPrice": unitPrice || 0,
    "supplyPrice": unitPrice * qty,
    "flagYN": flagParam,
    "planYN": planParam
  };

  $.ajax({
    url: "act/saveProductInOutPlan",
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
      fnGetList02(prodCd);
      fnReset();
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
var fnDel = function () {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
var fnReset = function () {

  var curDate = fnToday();

  // 제품 초기화
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
var fnResetWhenSearch = function () {

	// 제품 초기화
  $("#prod").val("");
  $("#prod").html(`<option value="">==제품==</option>`);

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
	$("#grid02").pqGrid("option", "dataModel", {data: []});
	$("#grid02").pqGrid("refreshDataAndView");
};

// 0. 엔터, 클릭, 체인지 이벤트 발생시에만 조회 ----------------------------------------------------
var fnPressGet01 = function (event) {
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
var fnChangeList = function () {
  var findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  var curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  var comboStr = [{part:"comCode", target:"prodType", groupCd:"0002", format:"combo"}];
  fnInitCombo (comboStr, function() {
    fnGetList01();
    fnGetList02();
  });
});
