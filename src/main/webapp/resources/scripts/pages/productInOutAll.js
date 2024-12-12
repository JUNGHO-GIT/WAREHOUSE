
// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);
  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "productInOutAll.xlsx",
    title: "   제품 입출고 관리",
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
      const today = fnToday();
      const getData02 = $grid02.pqGrid("getData");
      let duplicateFlag = false;

      const newRow = {
        prodCd: ui.rowData.prodCd,
        prodNm: ui.rowData.prodNm,
        curQty: ui.rowData.qty,
        inOutDt: today
      };
      getData02.forEach((row) => {
        if (row.prodCd === newRow.prodCd) {
          duplicateFlag = true;
        }
      });

      if (duplicateFlag) {
        alert("이미 추가된 제품입니다");
        return;
      }
      getData02.push(newRow);

      $grid02.pqGrid({
        dataModel: { data: getData02 },
      })
      .pqGrid("refreshDataAndView");
    }
  };
  const colModel = [
    {
      title:"이미지", dataIndx:"fileUrl", dataType:"string", align:"center",
      minWidth:70, maxWidth: 70,
      render: renderImage,
    },
    {
      title:"제품코드", dataIndx:"prodCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:"거래처코드", dataIndx:"compCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:"창고코드", dataIndx:"houseCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150,
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
      title:"안전재고", dataIndx:"protectedQty", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"입고", dataIndx:"inQty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero
    },
    {
      title:"출고", dataIndx:"outQty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth:100,
      render: renderZero
    },
    {
      title:"재고부족", dataIndx:"lowStock", dataType:"string", align:"center",
      minWidth:100,
      render: displayLowStock
    },
    {
      title:"바코드", dataIndx:"barcode", dataType:"string", align:"center",
      minWidth:100
    },
  ];

  $.ajax({
    url: "act/listProduct",
    data: `findProdNm=${$(`#findProdNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = updateTitle("제품 입출고 관리", data);
      gridOption.summaryData = updateSummary("prod", data);

      $grid01.pqGrid({
        ...gridOption,
        dataModel: { data: data },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02() {

  const $grid02 = $(`#grid02`);
  const chkBtn = `<div class="btn btn-primary btn-xs chkBtn">v</div>`;
  const delBtn = `<div class="btn btn-danger btn-xs delBtn">x</div>`;

  const gridOption = {
    xlsNm: "productInOutAll.xlsx",
    title: "   일괄 입고",
    width: "auto",
    height: "100%",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
    cellClick: (_, ui) => {
      if (ui.colIndx == 3) {
        fnDel(ui.rowIndx);
      }
    },
    cellBeforeSave: (_, ui) => {
      if (ui.dataIndx === "houseNm" || ui.dataIndx === "compNm") {
        fnGetCdWithNm(ui.dataIndx, ui.newVal, ui.rowIndx, "grid02");
      }
    },
    editable: (ui) => {
      if (ui.rowData && ui.rowData["isVerified"]) {
        return false;
      }
      else {
        return true;
      }
    }
  };
  const colModel = [
    {
      title:"제품코드", dataIndx:"prodCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:"거래처코드", dataIndx:"compCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:"창고코드", dataIndx:"houseCd", dataType:"integer", align:"center",
      hidden:true
    },
    {
      title:delBtn, dataIndx:"delBtn", dataType:"string", align:"center",
      minWidth:30, maxWidth: 30,
      render: () => delBtn,
    },
    {
      title:chkBtn, dataIndx:"chkBtn", dataType:"string", align:"center",
      minWidth:30, maxWidth: 30,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"일자", dataIndx:"inOutDt", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"재고", dataIndx:"curQty", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"창고", dataIndx:"houseNm", dataType:"string", align:"center",
      minWidth:100, editable:true,
    },
    {
      title:"거래처", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100, editable:true,
    },
    {
      title:"수량", dataIndx:"qty", dataType:"string", align:"right",
      minWidth:100, editable:true, cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다"}],
    },
    {
      title:"표준단가", dataIndx:"unitPrice", dataType:"string", align:"right",
      minWidth:100, editable:true, cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg:"숫자만 입력 가능합니다"}],
    },
  ];

  $grid02.pqGrid({
    ...gridOption,
    colModel: colModel,
  })
  .pqGrid("refreshDataAndView");
};

// 1-2. 검증 ---------------------------------------------------------------------------------------
function fnCheck() {

  const $grid02 = $(`#grid02`);
  const getData = $grid02.pqGrid("getData");
  const inOut = $("input[name=inOut]:checked").val();
  const chkBtn = `<div class="btn btn-primary btn-xs chkBtn">v</div>`;

  let validationErrors = [];
  let isVerified = true;

  if (getData.length === 0) {
    alert("제품를 추가해 주세요");
    return;
  }

  for (let key in getData) {
    const row = getData[key];

    // 데이터 초기화 및 유효성 검사
    row.prodCd = row.prodCd ? row.prodCd.toString().trim() : "0";
    row.houseCd = row.houseCd ? row.houseCd.toString().trim() : "0";
    row.compCd = row.compCd ? row.compCd.toString().trim() : "0";
    row.curQty = row.curQty ? row.curQty.toString().trim() :  "0";
    row.qty = row.qty ? row.qty.replace(/,/g, "").trim() : "";
    row.unitPrice = row.unitPrice ? row.unitPrice.replace(/,/g, "").trim() : "";

    if (!row.prodCd) {
      isVerified = false;
      validationErrors.push("제품를 입력해 주세요");
      break;
    }
    else if (!row.houseCd) {
      isVerified = false;
      validationErrors.push("창고를 입력해 주세요");
      break;
    }
    else if (!row.compCd) {
      isVerified = false;
      validationErrors.push("거래처를 입력해 주세요");
      break;
    }
    else if (!row.qty) {
      isVerified = false;
      validationErrors.push("수량을 입력해 주세요");
      break;
    }
    else if (!row.unitPrice) {
      isVerified = false;
      validationErrors.push("표준단가를 입력해 주세요");
      break;
    }
    else if (inOut === "out" && parseInt(row.qty, 10) > parseInt(row.curQty, 10)) {
      isVerified = false;
      validationErrors.push("재고보다 많은 수량이 입력되었습니다");
      break;
    }
  }

  if (!isVerified) {
    validationErrors.length > 0 && validationErrors.filter((item, i) => {
      // 중복된 에러 메시지 1회만 출력
      if (validationErrors.indexOf(item) === i) {
        alert(item);
      }
    });
    return;
  }

  // 검증이 완료된 row에 isVerified 플래그를 설정
  if (isVerified) {
    alert("검증이 완료되었습니다");
    getData.forEach((row) => {
      row["isVerified"] = true;
      row["chkBtn"] = chkBtn;
    });
    $grid02.pqGrid({
      dataModel: { data: getData },
    })
    .pqGrid("refreshDataAndView");
  }
};

// 3-1. 저장 (선택) --------------------------------------------------------------------------------
function fnSave() {
  const $grid02 = $(`#grid02`);

  let getData = $grid02.pqGrid("getData");
  let inOut = $("input[name=inOut]:checked").val();
  let validationError = "";

  if (getData.length === 0) {
    alert("제품를 추가해 주세요");
    return;
  }

  for (let c = 0; c < getData.length; c++) {
    const row = getData[c];
    getData[c].inOut = inOut;
    if (!row.chkBtn) {
      validationError = "검증되지 않은 데이터가 있습니다. 검증 후 저장해 주세요";
      break;
    }
  }

  if (validationError) {
    alert(validationError);
    return;
  }
  if (!confirm("입출고 내역을 저장 하시겠습니까?")) {
    return;
  }

  $.ajax({
    url: "act/saveProductInOutAll",
    data: JSON.stringify({dataList : getData}),
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

// 3-2. 저장 (전체) --------------------------------------------------------------------------------
function fnSaveAll() {

  const $grid02 = $(`#grid02`);
  const getData = $grid02.pqGrid("getData");

  // 모든 행에 일괄적으로 적용할 값을 설정
  const newHouseCd = $(`#house`).val();
  const newHouseNm = $(`#house option:selected`).text().trim();
  const newCompCd = $(`#comp`).val();
  const newCompNm = $(`#comp option:selected`).text().trim();

  // 1. 그리드에 행이 없을 경우
  if (getData.length === 0) {
    alert("제품를 추가해 주세요");
    return;
  }

  // 2. houseCd나 compNm값이 없을 경우
  if (!newHouseCd) {
    alert("창고를 선택해 주세요");
    return;
  }
  if (!newCompCd) {
    alert("거래처를 선택해 주세요");
    return;
  }

  // 3. 정상적으로 저장된 경우
  if (!confirm("입출고 내역을 일괄 저장 하시겠습니까?")) {
    return;
  }
  else {
    for (let i = 0; i < getData.length; i++) {
      getData[i].houseCd = newHouseCd;
      getData[i].houseNm = newHouseNm;
      getData[i].compCd = newCompCd;
      getData[i].compNm = newCompNm;
    }
    fnGridPopup("popupInOutAll","off")
  }

  $grid02.pqGrid("refreshDataAndView");
}

// 4-1. 삭제 (선택) --------------------------------------------------------------------------------
function fnDel(rowIdx) {
  $(`#grid02`).pqGrid("deleteRow", {rowIndx: rowIdx});
};

// 4-2. 삭제 (전체) --------------------------------------------------------------------------------
function fnDelAll() {
  $('#grid02').pqGrid({
    dataModel: { data: [] },
  })
  .pqGrid("refreshDataAndView");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {
  const curDate = fnToday();

  // 제품 초기화
  $(`#qty`).val("0");
  $(`#unitPrice`).val("0");
  $(`#supplyPrice`).val("0");
  $(`#remarks`).val("");
  $(`#inOutSeq`).val("");
  $(`#inOutDt`).val(curDate);
  $(`#flagYn`).val("Y");

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

  // 추가 항목도 초기화
  fnDelAll();
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
  $(`#inOutDt`).datepicker(G_calendar);
  $(`#inOutDt`).val(curDate);

  const comboStr = [{part:"comCode", target:"prodType", groupCd:"0003", format: "combo"}];
  fnInitCombo(comboStr, function() {
    fnGetList01();
    fnGetList02();
  });

  $(`#popupInOutAll`).draggable({
    handle: `#popTop`,
    cursor: "move",
    containment: "document"
  });
});
