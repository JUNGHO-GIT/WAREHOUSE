// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "resource.xlsx",
    title: "   자재 관리",
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
      fnShow (ui.rowData.resrcCd);
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
    url: "act/listResource",
    data: `findResrcNm=${$(`#findResrcNm`).val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {
      gridOption.title = updateTitle("resource", "자재 관리", myJsonData);

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

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(resrcCd) {
  fetch(`act/showResource`, {
    method: "POST",
    body: `resrcCd=${resrcCd}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    }
  })
  .then(async (response) => {
    const data = await response.json();

    // 1. 자재 관련
    $(`#resrcCd`).val(data.resrcCd);
    $(`#resrcNm`).val(data.resrcNm);
    $(`#resrcType`).val(data.resrcType);

    $(`#option1`).val(data.option1);
    $(`#unit`).val(data.unit);
    $(`#option2`).val(data.option2);
    $(`#quality`).val(data.quality);
    $(`#maker`).val(data.maker);
    $(`#remark`).val(data.remark);
    $(`#barcode`).val(data.barcode);
    $(`#flagYN`).val("Y");
    $(`#protectedQty`).val(parseInt(data.protectedQty).toLocaleString());
    $(`#unitPrice`).val(parseInt(data.unitPrice).toLocaleString());

    // 3. 창고 관련
    fnFindCd("", data.houseCd, "house", null);

    // 4. 거래처 관련
    fnFindCd("", data.compCd, "comp", null);

    // 5. file 관련
    $(`#tableNm`).val("tblResource");
    $(`#keyColumn`).val("resrcCd");
    $(`#tableKey`).val(data.resrcCd);
    fnShowFiles("tblResource", data.resrcCd, "files");
  })
  .catch(ajaxErrorHandler);
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave (flagYN) {

  let flagParam = "";

  if (flagYN === "N") {
    flagParam = "N";
    if ($(`#resrcCd`).val() == "") {
      alert("자재을 선택해 주세요");
      return;
    }
    if (!confirm("선택하신 자재을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($(`#resrcNm`).val() == "") {
      alert("자재 이름을 입력해 주세요");
      $(`#resrc`).on("focus", function () {});
      return;
    }
    if ($(`#resrcType`).val() == "") {
      alert("자재 분류를 입력해 주세요");
      $(`#resrcNm`).on("focus", function () {});
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
    if ($(`#protectedQty`).val() == "" || $(`#protectedQty`).val() == "0") {
      alert("안전재고를 입력해 주세요");
      $(`#protectedQty`).on("focus", function () {});
      return;
    }
    if ($(`#unitPrice`).val() == "" || $(`#unitPrice`).val() == "0") {
      alert("표준단가를 입력해 주세요");
      $(`#unitPrice`).on("focus", function () {});
      return;
    }
  }

  const param = {
    "resrcCd": $(`#resrcCd`).val() || "0",
    "resrcNm": $(`#resrcNm`).val() || "",
    "resrcType": $(`#resrcType`).val() || "",
    "houseCd": $(`#house`).val() || "0",
    "compCd": $(`#comp`).val() || "0",
    "unit": $(`#unit`).val() || "",
    "option1": $(`#option1`).val() || "",
    "option2": $(`#option2`).val() || "",
    "quality": $(`#quality`).val() || "",
    "maker": $(`#maker`).val() || "",
    "remark": $(`#remark`).val() || "",
    "protectedQty": parseInt(String($(`#protectedQty`).val()).replace(/,/gm, "")) || 0,
    "unitPrice": parseInt(String($(`#unitPrice`).val()).replace(/,/gm, "")) || 0,
    "flagYN": flagParam
  };

  $.ajax({
    url: "act/saveResource",
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
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 자재 초기화
  $(`#resrcCd`).val("0");
  $(`#resrcNm`).val("");
  $(`#resrcType`).val("");
  $(`#protectedQty`).val("0");
  $(`#unit`).val("");
  $(`#option1`).val("");
  $(`#option2`).val("");
  $(`#quality`).val("");
  $(`#maker`).val("");
  $(`#unitPrice`).val("0");
  $(`#compCd`).val("");
  $(`#remark`).val("");
  $(`#barcode`).val("");
  $(`#flagYN`).val("Y");

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
  $(`#tableNm`).val("tblResource");
  $(`#tableKey`).val("0");
  $(`#keyColumn`).val("resrcCd");
  fnShowFiles("tblResource", "0", "files");
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [{part:"comCode", target:"resrcType", groupCd:"0003", format:"combo"}];
  fnInitCombo (comboStr, function () {
    fnGetList01();
  });
});
