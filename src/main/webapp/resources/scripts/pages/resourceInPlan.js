// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "resourcePlan.xlsx",
    title: "   자재 입고 예정",
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
      fnGetList02(ui.rowData.resrcCd);
      fnReset();
      fnFindCd("", ui.rowData.resrcCd, "resrc", null);
      fnFindCd("", ui.rowData.houseCd, "house", null);
      fnFindCd("", ui.rowData.compCd, "comp", null);
    },
  };
  const colModel = [
    {
      title:"이미지", dataIndx:"fileUrl", dataType:"string", align:"center",
      minWidth:70, maxWidth: 70,
      render: renderImage,
    },
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"창고", dataIndx:"houseNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"거래처", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"재고부족", dataIndx:"lowStock", dataType:"string", align:"center",
      minWidth:100,
      render: displayLowStock,
    },
    {
      title:"안전재고", dataIndx:"protectedQty", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"입고", dataIndx:"inQty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
    {
      title:"출고", dataIndx:"outQty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
    {
      title:"바코드", dataIndx:"barcode", dataType:"string", align:"center",
      minWidth:100,
    },
  ];

  $.ajax({
    url: "act/listResource",
    data: `findResrcNm=${$(`#findResrcNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      gridOption.title = updateTitle("resourceInPlan", "자재 입고 예정", myJsonData);
      gridOption.summaryData = updateSummary("resrc", myJsonData);

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

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (resrcCd) {

  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "resourceInPlan.xlsx",
    title: "   자재 입출고 예정 내역",
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
      fnShow(ui.rowData.inOutSeq);
    },
  };
  const colModel = [
    {
      title:"일자", dataIndx:"inOutDt", dataType:"string", align:"center",
      minWidth:120
    },
    {
      title:"분류", dataIndx:"inOut", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"창고", dataIndx:"houseNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"거래처", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"수량", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
    {
      title:"표준단가", dataIndx:"unitPrice", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
    {
      title:"공급가", dataIndx:"supplyPrice", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero,
    },
  ];

  $(`#resrcCd`).val(resrcCd || "0");
  $.ajax({
    url: "act/listResourceInOutPlan",
    data: `resrcCd=${$(`#resrcCd`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      gridOption.title = updateTitle("resourceInOutPlan", "제품 입출고 예정 내역", myJsonData);
      $grid02.pqGrid({
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
function fnShow(inOutSeq) {

  $.ajax({
    url: "act/showResourceInOutPlan",
    data: `inOutSeq=${inOutSeq}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 1. 자재 관련 (입출고)
      $(`#remark`).val(data.remark);
      $(`#inOutSeq`).val(data.inOutSeq);
      $(`#inOutDt`).val(data.inOutDt);
      $(`#unitPrice`).val(fnGetNumWithComma(data.unitPrice));
      $(`#supplyPrice`).val(fnGetNumWithComma(data.supplyPrice));
      $(`#qty`).val(fnGetNumWithComma(Math.abs(data.qty)));
      $(`#inOut`).val(data.inOut);

      // 2. 자재 관련 (일반)
      fnFindCd("", data.resrcCd, "resrc", null);

      // 3. 창고 관련
      fnFindCd("", data.houseCd, "house", null);

      // 4. 거래처 관련
      fnFindCd("", data.compCd, "comp", null);
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYN) {

  let flagParam = "";
  let planParam = "";
  let resrcCd = $(`#resrcCd`).val();

  if (flagYN === "N") {
    flagParam = "N";
    planParam = "Y";
    if ($(`#grid02`).pqGrid("getData").length === 0) {
      alert("자재 입출고 예정 내역이 없습니다");
      return;
    }
    if (!confirm("선택하신 입출고 예정 내역을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    planParam = "Y";
    if ($(`#resrc`).val() == "") {
      alert("자재 이름을 입력해 주세요");
      $(`#resrc`).on("focus", function () {});
      return;
    }
    if (!$(`#inOutDt`).val()) {
      alert("날짜를 입력해 주세요");
      $(`#inOutDt`).on("focus", function () {});
      return;
    }
    if ($(`#comp`).val() == "") {
      alert("거래처를 입력해 주세요");
      $(`#comp`).on("focus", function () {});
      return;
    }
    if ($(`#house`).val() == "") {
      alert("창고를 입력해 주세요");
      $(`#house`).on("focus", function () {});
      return;
    }
    if ($(`#qty`).val() == "" || $(`#qty`).val() == "0") {
      alert("수량을 입력해 주세요");
      $(`#qty`).on("focus", function () {});
      return;
    }
    if ($(`#unitPrice`).val() == "" || $(`#unitPrice`).val() == "0") {
      alert("표준단가를 입력해 주세요");
      $(`#unitPrice`).on("focus", function () {});
      return;
    }
  }

  let inOut = $(`#inOut`).val();
  let qty = fnGetNumRemoveComma($(`#qty`).val());
  let unitPrice = fnGetNumRemoveComma($(`#unitPrice`).val());
	if (inOut === "out") {
    qty = qty * -1;
  }
  else if (inOut === "in") {
    qty = qty * 1;
  }

  const param = {
    "inOutSeq": $(`#inOutSeq`).val() || 0,
    "inOutDt": $(`#inOutDt`).val() || "",
    "inOut": inOut || "",
    "resrcCd": $(`#resrc`).val() || 0,
    "resrcNm": $(`#resrcNm`).val() || "",
    "compCd": $(`#comp`).val() || 0,
    "compNm": $(`#compNm`).val() || "",
    "houseCd": $(`#house`).val() || 0,
    "houseNm": $(`#houseNm`).val() || "",
    "remark": $(`#remark`).val() || "",
    "qty": qty || 0,
    "unitPrice": unitPrice || 0,
    "supplyPrice": unitPrice * qty,
    "flagYN": flagParam,
    "planYN": planParam
  };

  $.ajax({
    url: "act/saveResourceInOutPlan",
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

  const curDate = fnToday();

  // 자재 초기화
  $(`#qty`).val("0");
  $(`#unitPrice`).val("0");
  $(`#supplyPrice`).val("0");
  $(`#remark`).val("");
  $(`#inOutSeq`).val("");
  $(`#inOutDt`).val(curDate);
  $(`#inOut`).val("in");

  // 창고 초기화
  $(`#houseCd`).val("");
  $(`#houseNm`).val("");
  $(`#house`).val("");
  $(`#house`).html(`<option value="">==창고==</option>`);

  // 거래처 초기화
  $(`#compCd`).val("");
  $(`#compNm`).val("");
  $(`#comp`).val("");
  $(`#comp`).html(`<option value="">==거래처==</option>`);

  // 그리드 초기화
  $(`#grid02`).pqGrid("setSelection", null);
  $(`#grid02`).pqGrid("refreshDataAndView");
};

// 5-2. 초기화 (검색시) ----------------------------------------------------------------------------
function fnResetWhenSearch() {

	// 자재 초기화
  $(`#resrc`).val("");
  $(`#resrc`).html(`<option value="">==자재==</option>`);

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
	$(`#grid02`).pqGrid("option", "dataModel.data", []);
	$(`#grid02`).pqGrid("refreshDataAndView");
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
  $(`#inOutDt`).datepicker(G_calendar);
  $(`#inOutDt`).val(curDate);

  fnGetList01();
  fnGetList02($(`#resrcCd`).val());

  /* const comboStr = [{part:"comCode", target:"resrcType", groupCd:"0003", format:"combo"}];
  fnInitCombo (comboStr, function() {
    fnGetList01();
    fnGetList02();
  }); */
});
