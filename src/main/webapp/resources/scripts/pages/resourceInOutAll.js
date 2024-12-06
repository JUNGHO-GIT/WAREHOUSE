// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid = $(`#grid01`);

  const gridOption = {
    xlsNm: "resource.xlsx",
    title: "   자재 입출고 관리",
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
    // 1. grid02에 추가 (resrcCd, resrcNm, qty)
    var today = fnToday();
    var getData = $("#grid02").pqGrid("getData");
    var newRow = {
      resrcCd: ui.rowData.resrcCd,
      resrcNm: ui.rowData.resrcNm,
      curQty: ui.rowData.qty,
      inOutDt: today
    };
    // 2. 그리드 데이터가 있을 경우 중복체크
    var duplicateFlag = false;
    for (let i = 0; i < getData.length; i++) {
      var row = getData[i];
      if (row.resrcCd === newRow.resrcCd) {
        duplicateFlag = true;
        break;
      }
    }
    if (duplicateFlag) {
      alert("이미 추가된 자재입니다.");
      return;
    }
    getData.push(newRow);
    $("#grid02").pqGrid("option", "dataModel", {data: getData});
    $("#grid02").pqGrid("refreshDataAndView");
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
    for (let i = 0; i < data.length; i++) {
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

  const colModel = [
    {dataIndx:"fileUrl", title:"이미지", dataType:"string", align:"center",,
      minWidth:70, maxWidth:70, render: obj.renderImage,
    },
    {dataIndx:"resrcCd", title:"자재코드", dataType:"integer", align:"center",
      hidden:true, editable:false,
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"integer", align:"center",
      hidden:true, editable:false,
    },
    {dataIndx:"houseCd", title:"창고코드", dataType:"integer", align:"center",
      hidden:true, editable:false,
    },
    {dataIndx:"resrcNm", title:"자재명", dataType:"string", align:"center",,
      minWidth:200, hidden:false, editable:false,
    },
    {dataIndx:"houseNm", title:"창고", dataType:"string", align:"center",,
    },
    {dataIndx:"option1", title:"재질", dataType:"string", align:"center",
    },
    {dataIndx:"protectedQty", title:"안전재고", dataType:"string", align:"center",
    },
    {dataIndx:"inQty", title:"입고", dataType:"string", align:"center",,
      render: obj.renderZero
    },
    {dataIndx:"outQty", title:"출고", dataType:"string", align:"center",,
      render: obj.renderZero
    },
    {dataIndx:"qty", title:"재고", dataType:"string", align:"center",,
      render: obj.renderZero
    },
    {dataIndx:"lowStock", title:"재고부족", dataType:"string", align:"center",,
      render: obj.displayLowStock
    },
    {dataIndx:"barcode", title:"바코드", dataType:"string", align:"center",
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listResource",
    data: `findResrcNm=${$("#findResrcNm").val()}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (myJsonData) => {

      // 1. 콜백 데이터 할당
      obj.dataModel = {data:myJsonData};

      // 2. title에 안전재고 이하 갯수 표시
      obj.title = `
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-left">
          <span>자재 입출고 관리</span>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-right ml-n50px">
          <span class="fs-0-9rem red">●</span>
          <span class="ml-5px mr-5px">안전재고 이하 : </span>
          <span class="red">${obj.calcLowStock(myJsonData)}</span>
        </div>
      </div>
      `;

      // 3. footer에 합계표시
      obj.summaryData = [{
        pq_rowcls: "summary-row",
        fileUrl: "noGridImage.webp",
        resrcNm: `<b>Total : </b>`,
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
function fnGetList02() {

  const $grid = $(`#grid02`);
  var chkBtn = `<button type="button" class="btn btn-primary btn-xs chkBtn">v</button>`;
  var delBtn = `<button type="button" class="btn btn-danger btn-xs delBtn">x</button>`;

  const gridOption = {
    xlsNm: "resourceInOutAll.xlsx",
    title: "   일괄 입고",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
  };

  // 셀 클릭시 실행
  obj.cellClick = function (event, ui) {
    if (ui.colIndx == 3) {
      fnDel(ui.rowIndx);
    }
  };

  obj.cellBeforeSave = function(event, ui) {
    if (ui.dataIndx === "houseNm" || ui.dataIndx === "compNm") {
      fnGetCdWithNm(ui.dataIndx, ui.newVal, ui.rowIndx, gridCd);
    }
  };

  obj.editable = function(ui) {
    // 편집 불가능하게
    if (ui.rowData && ui.rowData["isVerified"]) {
      return false;
    }
    // 편집 가능하게
    else {
      return true;
    }
  };

  const colModel = [
    {dataIndx:"resrcCd", title:"자재코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"houseCd", title:"창고코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"delBtn", title: delBtn, dataType:"string", align:"center",
      editable:false, sortable:false, minWidth:30, maxWidth:30,
      render:function () {return delBtn;}
    },
    {dataIndx:"chkBtn", title: chkBtn, dataType:"string", align:"center",
      editable:false, sortable:false, minWidth:30, maxWidth:30,
    },
    {dataIndx:"resrcNm", title:"자재명", dataType:"string", align:"center"
    },
    {dataIndx:"inOutDt", title:"일자", dataType:"string", align:"center",
    },
    {dataIndx:"curQty", title:"재고", dataType:"string", align:"center",
      editable:false,
    },
    {dataIndx:"houseNm", title:"창고", dataType:"string", align:"center", cls:"lightYellow",
      editable:true,
    },
    {dataIndx:"compNm", title:"거래처", dataType:"string", align:"center", cls:"lightYellow",
      editable:true,
    },
    {dataIndx:"qty", title:"수량", dataType:"string", align:"right", cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}],
      editable:true,
    },
    {dataIndx:"unitPrice", title:"표준단가", dataType:"string", align:"right", cls:"lightYellow",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}],
      editable:true,
    },
  ];
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 1-2. 검증 ---------------------------------------------------------------------------------------
function fnCheck() {

  var getData = $("#grid02").pqGrid("getData");
  var chkBtn = `<button type="button" class="btn btn-primary btn-xs chkBtn">v</button>`;
  let inOut = $("input[name=inOut]:checked").val();

  var validationErrors = [];
  var isVerified = true;

  if (getData.length === 0) {
    alert("자재를 추가해 주세요.");
    return;
  }

  for (let c = 0; c < getData.length; c++) {
    var row = getData[c];

    // 데이터 초기화 및 유효성 검사
    row.resrcCd = row.resrcCd ? row.resrcCd.toString().trim() : "";
    row.houseCd = row.houseCd ? row.houseCd.toString().trim() : "";
    row.compCd = row.compCd ? row.compCd.toString().trim() : "";
    row.curQty = row.curQty ? row.curQty.toString().trim() : "";
    row.qty = row.qty ? row.qty.replace(/,/g, "").trim() : "";
    row.unitPrice = row.unitPrice ? row.unitPrice.replace(/,/g, "").trim() : "";

    let qty = parseInt(row.qty, 10);
    var curQty = parseInt(row.curQty, 10);

    if (!row.houseCd) {
      isVerified = false;
      alert("창고를 입력해 주세요.");
      break;
    }
    else if (!row.compCd) {
      isVerified = false;
      alert("거래처를 입력해 주세요.");
      break;
    }
    else if (!row.qty) {
      isVerified = false;
      alert("수량을 입력해 주세요.");
      break;
    }
    else if (!row.unitPrice) {
      isVerified = false;
      alert("표준단가를 입력해 주세요.");
      break;
    }
    else if (inOut === "out" && curQty < qty) {
      isVerified = false;
      validationErrors.push("재고보다 많은 수량이 입력되었습니다.");
      break;
    }
  }

  // 검증이 완료된 row에 isVerified 플래그를 설정
  if (isVerified) {
    alert("검증이 완료되었습니다.");
    getData.forEach(function(row) {
      row["isVerified"] = true;
      row["chkBtn"] = chkBtn;
    });
    $("#grid02").pqGrid("refreshDataAndView");
  }
  else {
    if (validationErrors.length > 0) {
      alert(validationErrors.join(", "));
    }
  }
};

// 3-1. 저장 (선택) --------------------------------------------------------------------------------
function fnSave() {

  var getData = $("#grid02").pqGrid("getData");
  let inOut = $("input[name=inOut]:checked").val();

  // 모든 항목에 대해 inOut 값을 설정
  for (let i = 0; i < getData.length; i++) {
    getData[i]["inOut"] = inOut;
  }

  var validationError = "";

  if (getData.length === 0) {
    alert("제품을 추가해 주세요.");
    return;
  }
  for (let c = 0; c < getData.length; c++) {
    var row = getData[c];
    if (row.chkBtn === "" || row.chkBtn === null || typeof row.chkBtn === "undefined") {
      validationError = "검증되지 않은 데이터가 있습니다. 검증 후 저장해 주세요.";
      break;
    }
  }
  if (validationError) {
    alert(validationError);
    return;
  }
  if (!confirm("입출고 내역을 일괄 저장 하시겠습니까?")) {
    return;
  }

  $.ajax({
    url: "act/saveResourceInOutAll",
    data: JSON.stringify({datas : getData}),
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

  var grid = $("#grid02").pqGrid("getInstance").grid;
  var data = grid.option("dataModel.data");

  // 모든 행에 일괄적으로 적용할 값을 설정
  var newHouseCd = $("#house").val();
  var newHouseNm = $("#house option:selected").text().trim();
  var newCompCd = $("#comp").val();
  var newCompNm = $("#comp option:selected").text().trim();

  // 1. 그리드에 행이 없을 경우
  if (data.length === 0) {
    alert("제품을 추가해 주세요.");
    return;
  }

  // 2. houseCd나 compNm값이 없을 경우
  if (!newHouseCd) {
    alert("창고를 선택해 주세요.");
    return;
  }
  if (!newCompCd) {
    alert("거래처를 선택해 주세요.");
    return;
  }

  // 3. 정상적으로 저장된 경우
  if (!confirm("창고 및 거래처를 일괄 적용 하시겠습니까?")) {
    return;
  }
  else {
    for (let i = 0; i < data.length; i++) {
      data[i].houseCd = newHouseCd;
      data[i].houseNm = newHouseNm;
      data[i].compCd = newCompCd;
      data[i].compNm = newCompNm;
    }
    fnGridPopup("popupInOutAll","off")
  }

  grid.refreshDataAndView();
}

// 4-1. 삭제 (선택) --------------------------------------------------------------------------------
function fnDel(rowIdx) {
  $("#grid02").pqGrid("deleteRow", {rowIndx: rowIdx});
};

// 4-2. 삭제 (전체) --------------------------------------------------------------------------------
function fnDelAll() {
	$("#grid02").pqGrid("option", "dataModel.data", []);
	$("#grid02").pqGrid("refreshDataAndView");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {
  const curDate = fnToday();

  // 자재 초기화
  $("#qty").val("0");
  $("#unitPrice").val("0");
  $("#supplyPrice").val("0");
  $("#remark").val("");
  $("#inOutSeq").val("");
  $("#inOutDt").val(curDate);
  $("#flagYN").val("Y");

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

  // 추가 항목도 초기화
  fnDelAll();
};

// 5-2. 초기화 (검색시) ----------------------------------------------------------------------------
function fnResetWhenSearch() {
  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
function fnPressGet01(event) {

  // 1. event가 `onKeyDown`일때 = enter 조건 O
  if (event.keyCode === 13 && event.key === "Enter") {
    event.preventDefault();
    fnReset();
    fnResetWhenSearch();
    fnGetList01();
  }

  // 2. event가 `onClick`일때 = enter 조건 X
  if (event.type === "click") {
    event.preventDefault();
    fnReset();
    fnResetWhenSearch();
    fnGetList01();
  }
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  const comboStr = [{part:"comCode", target:"resrcType", groupCd:"0003", format: "combo"}];
  fnInitCombo(comboStr, function() {
    fnGetList01();
    fnGetList02();
  });

  $("#popupInOutAll").draggable({ handle: "#popTop" });
  $("#popTop").css("cursor", "move");
});
