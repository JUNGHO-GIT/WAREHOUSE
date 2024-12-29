// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "product",
    title: "   제품 정보",
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
      fnFindCd("", ui.rowData.prodCd, "prod", null);
      fnShow(ui.rowData.prodCd, ui.rowData.bomType);
    },
  };
  const colModel = [
    {
      title:"bom타입", dataIndx:"bomType", align:"center", dataType:"string",
      hidden: true
    },
    {
      title:"제품코드드", dataIndx:"prodCd", align:"center", dataType:"string",
      hidden: true
    },
    {
      title:"이미지", dataIndx:"fileUrl", dataType:"string", align:"center",
      minWidth:70, maxWidth: 70,
      render: fnRenderImage,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100
    },
  ];

  $.ajax({
    url: `act/listBom`,
    data: `findProdNm=${$(`#findProdNm`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("제품 정보", data);
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
  const $grid03 = $(`#grid03`);
  const insertBtn = `<div class="insertBtn">▼</div>`;

  const gridOption = {
    xlsNm: "resource",
    title: "   자재 정보",
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
      if (ui.colIndx !== 1) {
        return
      }
      const getData03 = $grid03.pqGrid("getData");
      let duplicateFlag = false;

      const newRow = {
        resrcCd: ui.rowData.resrcCd,
        resrcNm: ui.rowData.resrcNm,
        option1: ui.rowData.option1,
        option2: ui.rowData.option2,
        qty: ui.rowData.qty,
        unitQty: "0",
        barcode: ui.rowData.barcode,
      };
      getData03.forEach((row) => {
        if (row.resrcCd === newRow.resrcCd) {
          duplicateFlag = true;
        }
      });

      if (duplicateFlag) {
        alert("이미 추가된 제품입니다");
        return;
      }
      getData03.push(newRow);
      $grid03.pqGrid({
        dataModel: { data: getData03 },
      })
      .pqGrid("refreshDataAndView");
    },
  };
  const colModel = [
    {
      title:"자재코드", dataIndx:"resrcCd", align:"center", dataType:"string",
      hidden: true
    },
    {
      title:insertBtn, dataIndx:"insertBtn", align:"center", dataType:"string",
      minWidth:30, maxWidth:30,
      render: () => insertBtn,
    },
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100
    }
  ];

  $.ajax({
    url: `act/listResource`,
    data: `findResrcNm=${$(`#findResrcNm`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("자재 정보", data);
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

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList03 () {

  const $grid03 = $(`#grid03`);
  const delBtn = `<div class="delBtn">x</div>`;

  const gridOption = {
    xlsNm: "bomList",
    title: "   BOM 항목",
    width: "100%",
    height: "100%",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent:true},
    numberCell: {show:true, resizable:false, width:30},
    summaryData: [],
    cellClick: (_, ui) => {
      if (ui.colIndx === 1) {
        fnDel(ui.rowIndx);
      }
    },
  };
  const colModel = [
    {
      title:"자재코드", dataIndx:"resrcCd", align:"center", dataType:"string",
      hidden: true, editable: false,
    },
    {
      title:delBtn, dataIndx:"delBtn", align:"center", dataType:"string",
      minWidth:30, maxWidth:30, editable: false,
      render: () => delBtn,
    },
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:150, editable: false,
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"소요수량", dataIndx:"unitQty", dataType:"string", align:"right",
      minWidth:100, editable:true, cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다"}],
    }
  ];

  $grid03.pqGrid({
    ...gridOption,
    colModel: colModel,
  })
  .pqGrid("refreshDataAndView");
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(prodCd, bomType) {

  const $grid03 = $(`#grid03`);
  const delBtn = `<div class="delBtn">x</div>`;

  const gridOption = {
    xlsNm: "resource",
    title: "   BOM 정보",
    width: "100%",
    height: "100%",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent:true},
    numberCell: {show:true, resizable:false, width:30},
    summaryData: [],
    cellClick: (_, ui) => {
      if (ui.colIndx === 1) {
        fnDelResrc(ui.rowIndx);
      }
    }
  };
  const colModel = [
    {
      title:"자재코드", dataIndx:"resrcCd", align:"center", dataType:"string",
      hidden: true, editable: false,
    },
    {
      title:delBtn, dataIndx:"delBtn", align:"center", dataType:"string",
      minWidth:30, maxWidth:30, editable: false,
      render: () => delBtn,
    },
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:150, editable: false,
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100, editable: false,
    },
    {
      title:"소요수량", dataIndx:"unitQty", dataType:"string", align:"right",
      minWidth:100, editable:true, cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다"}],
    }
  ];

  $.ajax({
    url: `act/showBom`,
    data: `prodCd=${prodCd}&bomType=${bomType}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("BOM 정보", data);
      $grid03.pqGrid({
        ...gridOption,
        dataModel: { data: data },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: fnAjaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave() {

  const $grid03 = $(`#grid03`);
  const getData03 = $grid03.pqGrid("getData");
  const prodCd = $(`#prod`).val();

  if (!prodCd) {
    alert("제품을 선택해주세요");
    return;
  }
  if (getData03.length === 0) {
    alert("자재를 추가해주세요");
    return;
  }

  for (let key in getData03) {
    const row = getData03[key];

    // 데이터 초기화 및 유효성 검사
    row.resrcCd = row.resrcCd ? row.resrcCd.toString().trim() : "0";
    row.qty = row.qty ? row.qty.toString().trim() : "0";
    row.unitQty = row.unitQty ? row.unitQty.toString().trim() : "0";

    if (!row.unitQty) {
      alert("소요수량을 입력해주세요");
      return;
    }
    if (row.qty === "0" && row.unitQty !== "0") {
      alert("재고가 0인 자재는 소요수량을 0으로 설정해주세요");
      return;
    }
    if (row.qty !== "0" && row.unitQty === "0") {
      alert("소요수량은 0으로 설정할 수 없습니다");
      return;
    }
    if (parseInt(row.qty) < parseInt(row.unitQty)) {
      alert("소요수량이 재고를 초과합니다");
      $grid03.pqGrid("setSelection", {rowIndx: key});
      return;
    }

    getData03["prodCd"] = prodCd || "0";
    getData03["bomType"] = "prod";
    getData03["flagYn"] = "Y";
  }

  if (!confirm("저장 하시겠습니까?")) {
    return;
  }

  $.ajax({
    url: `act/saveBom`,
    data: JSON.stringify({dataList: getData03}),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnShow(prodCd, "prod");
    },
    error: fnAjaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel(rowIdx) {
  $(`#grid03`).pqGrid("deleteRow", {rowIndx: rowIdx});
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDelResrc(rowIdx) {

  const $grid03 = $(`#grid03`);
  const getRowData03 = $grid03.pqGrid("getRowData", {rowIndx: rowIdx});
  const prodCd = $(`#prod`).val();

  if (!confirm("선택한 자재를 삭제하시겠습니까?")) {
    return;
  }

  const bomData = {
    "prodCd": prodCd || "0",
    "resrcCd": getRowData03.resrcCd || "0",
    "bomType": "prod",
    "qty": getRowData03.qty || "0",
    "unitQty": getRowData03.unitQty || "0",
    "flagYn": "N",
  };

  $.ajax({
    url: `act/saveBom`,
    data: JSON.stringify({dataList: [bomData]}),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnShow(prodCd, "prod");
    },
    error: fnAjaxErrorHandler
  });
};

// 5-1. 그리드 초기화 ------------------------------------------------------------------------------
function fnReset() {

  fnReset();

  // 그리드 포커스 제거
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid02`).pqGrid("setSelection", null);
  $(`#grid03`).pqGrid("setSelection", null);

  // 그리드 비우기
  $(`#grid03`).pqGrid({
    dataModel: { data: [] },
  })
  .pqGrid("refreshDataAndView");
};

// 5-2. 그리드 초기화 ------------------------------------------------------------------------------
function fnReset() {

  // 제품 초기화
  $(`#prodNm`).val("");
  $(`#prodCd`).val("");
  $(`#prod`).val("");
  $(`#prod`).html(`<option value="">==제품==</option>`);

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");
};

// 5-3. 그리드 초기화(검색시) ----------------------------------------------------------------------
function fnResetWhenSearch() {

	// 제품 초기화
  $(`#prod`).val("");
  $(`#prod`).html(`<option value="">==제품==</option>`);

  // 그리드 포커스 제거
  $(`#grid03`).pqGrid("setSelection", null);

  // 그리드 초기화
  $(`#grid03`).pqGrid({
    dataModel: { data: [] },
  })
  .pqGrid("refreshDataAndView");
};

// 0. BOM input ------------------------------------------------------------------------------------
function fnBomInput() {

  const $grid03 = $(`#grid03`);

  // bomInput에 엔터 입력시 이벤트 (grid reset)
  $(`.bomInput`).on("keydown", (e) => {
    if (e.key === "Enter") {
      fnReset();
      $grid03.pqGrid({
        dataModel: { data: [] },
      })
      .pqGrid("refreshDataAndView");
    }
  });

  // `prod`셀렉트에 값이 선택되면 이벤트
  $(`#prod`).on("change", () => {
    if ($(`#prod`).val() !== "") {
      fnShow($(`#prod`).val(), "prod");
    }
    $grid03.pqGrid("refreshDataAndView");
  });
}
// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
  fnGetList02();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {

  const curDate = fnToday();
  $(`#inOutDt`).datepicker(CALENDAR);
  $(`#inOutDt`).val(curDate);

  fnBomInput();
  fnGetList01();
  fnGetList02();
  fnGetList03();
});
