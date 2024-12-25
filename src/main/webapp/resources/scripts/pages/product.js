// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "product.xlsx",
    title: "   제품 관리",
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
      fnShow (ui.rowData.prodCd);
      fnFindCd("", ui.rowData.houseCd, "house", null);
      fnFindCd("", ui.rowData.compCd, "comp", null);
      fnShowFiles("tblProduct", ui.rowData.prodCd, "fileList");
    },
  };
  const colModel = [
    {
      title:"이미지", dataIndx:"fileUrl", dataType:"string", align:"center",
      minWidth:70, maxWidth: 70,
      render: renderImage,
    },
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"창고", dataIndx:"houseNm", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"거래처", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"재질", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100
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
    url: "act/listProduct",
    data: `findProdNm=${$(`#findProdNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = updateTitle("제품 관리", data);
      gridOption.summaryData = updateSummary("prod", data);
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

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow (prodCd="0") {
  fetch(`act/showProduct`, {
    method: "POST",
    body: `prodCd=${prodCd}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    }
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {

    // 1. 제품 관련
    $(`#prodCd`).val(data.prodCd);
    $(`#prodNm`).val(data.prodNm);
    $(`#prodType`).val(data.prodType);
    $(`#option1`).val(data.option1);
    $(`#unit`).val(data.unit);
    $(`#option2`).val(data.option2);
    $(`#quality`).val(data.quality);
    $(`#maker`).val(data.maker);
    $(`#remarks`).val(data.remarks);
    $(`#barcode`).val(data.barcode);
    $(`#flagYn`).val("Y");
    $(`#protectedQty`).val(parseInt(data.protectedQty).toLocaleString());
    $(`#unitPrice`).val(parseInt(data.unitPrice).toLocaleString());

    // 5. file 관련
    $(`#tableNm`).val("tblProduct");
    $(`#keyColumn`).val("prodCd");
    $(`#tableKey`).val(data.prodCd);
  })
  .catch((err) => {
    if (err.status === 477) {
      alert("세션이 종료 되었습니다");
      fnGoPage("reLogin");
    }
    else {
      alert(`code: ${err.status}\n message: ${err.statusText}`);
    }
    console.error(err);
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave (flagYn) {

  let flagParam = "";

  if (flagYn === "N") {
    flagParam = "N";
    if ($(`#prodCd`).val() == "") {
      alert("제품을 선택해 주세요");
      return;
    }
    if (!confirm("선택하신 제품을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($(`#prodNm`).val() == "") {
      alert("제품 이름을 입력해 주세요");
      $(`#prodNm`).trigger("focus");
      return;
    }
    if ($(`#prodType`).val() == "") {
      alert("제품 분류를 입력해 주세요");
      $(`#prodType`).trigger("focus");
      return;
    }
    if ($(`#comp`).val() == "") {
      alert("거래처를 입력해 주세요");
      $(`#comp`).trigger("focus");
      return;
    }
    if ($(`#house`).val() == "") {
      alert("창고를 입력해 주세요");
      $(`#house`).trigger("focus");
      return;
    }
    if ($(`#protectedQty`).val() == "" || $(`#protectedQty`).val() == "0") {
      alert("안전재고를 입력해 주세요");
      $(`#protectedQty`).trigger("focus");
      return;
    }
    if ($(`#unitPrice`).val() == "" || $(`#unitPrice`).val() == "0") {
      alert("표준단가를 입력해 주세요");
      $(`#unitPrice`).trigger("focus");
      return;
    }
  }

  const param = {
    "prodCd": $(`#prodCd`).val() || "0",
    "prodNm": $(`#prodNm`).val() || "",
    "prodType": $(`#prodType`).val() || "",
    "houseCd": $(`#house`).val() || "0",
    "compCd": $(`#comp`).val() || "0",
    "unit": $(`#unit`).val() || "",
    "option1": $(`#option1`).val() || "",
    "option2": $(`#option2`).val() || "",
    "quality": $(`#quality`).val() || "",
    "maker": $(`#maker`).val() || "",
    "remarks": $(`#remarks`).val() || "",
    "protectedQty": parseInt(String($(`#protectedQty`).val()).replace(/,/gm, "")) || 0,
    "unitPrice": parseInt(String($(`#unitPrice`).val()).replace(/,/gm, "")) || 0,
    "flagYn": flagParam
  };

  $.ajax({
    url: "act/saveProduct",
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
      $(`#grid01`).pqGrid("setSelection", {rowIndxPage:0});
      fnReset();
    },
    error: fnAjaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 제품 초기화
  $(`#prodCd`).val("0");
  $(`#prodNm`).val("");
  $(`#prodType`).val("");
  $(`#protectedQty`).val("0");
  $(`#unit`).val("");
  $(`#option1`).val("");
  $(`#option2`).val("");
  $(`#quality`).val("");
  $(`#maker`).val("");
  $(`#unitPrice`).val("0");
  $(`#compCd`).val("");
  $(`#remarks`).val("");
  $(`#barcode`).val("");
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
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");

  // 파일 초기화
  $(`#userFile`).val("");
  $(`#tableNm`).val("tblProduct");
  $(`#tableKey`).val("0");
  $(`#keyColumn`).val("prodCd");
  fnShowFiles("tblProduct", "0", "fileList");
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [{part:"comCode", target:"prodType", groupCd:"0002", format:"combo"}];
  fnInitCombo (comboStr, function () {
    fnGetList01();
  });
});
