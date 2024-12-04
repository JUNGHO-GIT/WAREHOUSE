// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
var fnGetList01 = function () {

  var gridCd = "grid01";

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "product.xlsx",
    title: "   제품 정보",
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
    fnFindCd ("", ui.rowData.prodCd, "prod", null);
    fnShow (ui.rowData.prodCd, ui.rowData.bomType);
  };

  obj.colModel = [
    {dataIndx:"bomType", title:"bomType", align:"center", dataType:"string",
      hidden: true
    },
    {dataIndx:"prodCd", title:"prodCd", align:"center", dataType:"string",
      hidden: true
    },
    {dataIndx:"prodNm", title:"제품명", align:"center", dataType:"string",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:200
    },
    {dataIndx:"option1", title:"재질", align:"center", dataType:"string",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"option2", title:"규격", align:"center", dataType:"string",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"barcode", title:"바코드", align:"center", dataType:"string",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
    },
  ];

  var param = "findProdNm=" + $("#findProdNm").val();

	// ajax 호출
  $.ajax({
    url: "act/listBom",
    data: param,
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
var fnGetList02 = function () {

  var gridCd = "grid02";
  var insertBtn=`<button type="button" class="btn btn-primary btn-xs insertBtn">&#x25bc;</button>`;

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "resource.xlsx",
    title: "   자재 정보",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  // 셀 클릭시 실행
  obj.cellClick = function (event, ui) {
    if (ui.colIndx == 1) {
      // 1. 자재 추가
      var getData = $("#grid03").pqGrid("getData");
      var newRow = {
        resrcCd: ui.rowData.resrcCd,
        resrcNm: ui.rowData.resrcNm,
        option1: ui.rowData.option1,
        option2: ui.rowData.option2,
        qty: ui.rowData.qty,
        unitQty: "0",
        barcode: ui.rowData.barcode,
      };
      // 2. 자재 중복체크
      var duplicateFlag = false;
      for (var i = 0; i < getData.length; i++) {
        var row = getData[i];
        if (row.resrcCd === newRow.resrcCd) {
          duplicateFlag = true;
          break;
        }
      }
      if (duplicateFlag) {
        alert("이미 추가된 제품입니다.");
        return;
      }
      getData.push(newRow);
      $("#grid03").pqGrid("option", "dataModel", {data: getData});
      $("#grid03").pqGrid("refreshDataAndView");
    }
  };

  obj.colModel = [
    {dataIndx:"resrcCd", title:"자재 코드", align:"center", dataType:"string",
      editable:false, hidden: true
    },
    {dataIndx:"insertBtn", title:insertBtn, align:"center", dataType:"string",
      editable:false, minWidth:30, maxWidth:30,
      render: function () {return insertBtn;}
    },
    {dataIndx:"resrcNm", title:"자재명", align:"center", dataType:"string",
      editable:false, minWidth:100,
    },
    {dataIndx:"option1", title:"재질", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"option2", title:"규격", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"qty", title:"재고", align:"right", dataType:"string",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}],
      editable:false,
    },
    {dataIndx:"barcode", title:"바코드", align:"center", dataType:"string",
      editable:false,
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listResource",
    data: `findResrcNm=${$("#findResrcNm").val()}`,
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
var fnGetList03 = function () {

  var gridCd = "grid03";
  var delBtn = `<button type="button" class="btn btn-danger btn-xs delBtn">x</button>`;

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "bomList.xlsx",
    title: "   BOM 항목",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  // 셀 클릭시 실행
  obj.cellClick = function (event, ui) {
    if (ui.colIndx == 1) {
      fnDel(ui.rowIndx);
    }
  };

  obj.colModel = [
    {dataIndx:"resrcCd", title:"자재코드", align:"center", dataType:"string",
      editable:false, hidden: true
    },
    {dataIndx:"delBtn", title:delBtn, align:"center", dataType:"string",
      editable:false, sortable:false, minWidth:30, maxWidth:30,
      render:function () {return delBtn;}
    },
    {dataIndx:"resrcNm", title:"자재명", align:"center", dataType:"string",
      editable:false, minWidth:100,
    },
    {dataIndx:"option1", title:"재질", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"option2", title:"규격", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"qty", title:"재고", align:"right", dataType:"string", editable:false,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"unitQty", title:"소요수량", align:"right", dataType:"string",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}],
      editable:true, cls:"lightYellow",
    },
    {dataIndx:"barcode", title:"바코드", align:"center", dataType:"string",
      editable:false,
    },
  ]
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 2. 상세 항목 ------------------------------------------------------------------------------------
var fnShow = function (prodCd, bomType) {

  var gridCd = "grid03";
  var delBtn = `<button type="button" class="btn btn-danger btn-xs delBtn">x</button>`;

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "resource.xlsx",
    title: "   BOM 정보",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };

  // 셀 클릭시 실행
  obj.cellClick = function (event, ui) {
    if (ui.colIndx == 1) {
      fnDelResrc(ui.rowIndx);
    }
  };

  obj.colModel = [
    {dataIndx:"resrcCd", title:"자재코드", align:"center", dataType:"string",
      editable:false, hidden: true
    },
    {dataIndx:"delBtn", title:delBtn, align:"center", dataType:"string",
      editable:false, sortable:false, minWidth:30, maxWidth:30,
      render:function () {return delBtn;}
    },
    {dataIndx:"resrcNm", title:"자재명", align:"center", dataType:"string",
      editable:false, minWidth:100,
    },
    {dataIndx:"option1", title:"재질", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"option2", title:"규격", align:"center", dataType:"string",
      editable:false,
    },
    {dataIndx:"qty", title:"재고", align:"right", dataType:"string", editable:false,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"unitQty", title:"소요수량", align:"right", dataType:"string",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}],
      editable:true,  cls:"lightYellow",
    },
    {dataIndx:"barcode", title:"바코드", align:"center", dataType:"string",
      editable:false,
    }
  ];

	// ajax 호출
  $.ajax({
    url: "act/showBom",
    data: `prodCd=${prodCd}&bomType=${bomType}`,
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

// 3. 저장 -----------------------------------------------------------------------------------------
var fnSave = function () {

  var getData = $("#grid03").pqGrid("getData");
  var prodCd = $("#prod").val();
  var bomType = "prod";
  var flagYN = "Y";

  if (!prodCd) {
    alert("제품을 선택해주세요");
    return;
  }
  if (getData.length === 0) {
    alert("자재를 추가해주세요");
    return;
  }

  for (var i = 0; i < getData.length; i++) {
    var qty = parseInt(getData[i].qty, 10);
    var unitQty = parseInt(getData[i].unitQty, 10);
    if (isNaN(unitQty)) {
      alert("소요수량을 입력해주세요");
      return;
    }
    if (qty === 0 && unitQty !== 0) {
      alert("재고가 0인 자재는 소요수량을 0으로 설정해주세요");
      return;
    }
    if (qty !== 0 && unitQty === 0) {
      alert("소요수량은 0으로 설정할 수 없습니다.");
      return;
    }
    if (qty < unitQty) {
      alert("소요수량이 재고를 초과합니다.");
      return;
    }
  }

  if (!confirm("저장 하시겠습니까?")) {
    return;
  }

  for (var c = 0; c < getData.length; c++) {
    getData[c]["prodCd"] = String (prodCd) || "0";
    getData[c]["resrcCd"] = String (getData[c]["resrcCd"]) || "0";
    getData[c]["qty"] = String (getData[c]["qty"]) || "0";
    getData[c]["bomType"] = String (bomType) || "";
    getData[c]["flagYN"] = String (flagYN) || "";
    getData[c]["unitQty"] = String (getData[c]["unitQty"]).replace(/,/g, "") || "0";
  }

  $.ajax({
    url: "act/saveBom",
    data: JSON.stringify({datas: getData}),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      alert(data.result);
      fnShow(prodCd, bomType);
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
var fnDel = function (rowIdx) {
  $("#grid03").pqGrid("deleteRow", {rowIndx: rowIdx});
};

// 4. 삭제 -----------------------------------------------------------------------------------------
var fnDelResrc = function (rowIdx) {

  var getData = $("#grid03").pqGrid("getRowData", {rowIndx: rowIdx});
  var prodCd = $("#prod").val();
  var bomType = "prod";
  var flagYN = "N";

  // 선택한 행이 없을 경우 리턴
  if (rowIdx === null) {
    return;
  }
  if (!confirm("선택한 자재를 삭제하시겠습니까?")) {
    return;
  }

  var bomData = {
    "prodCd": String(prodCd) || "0",
    "resrcCd": String(getData.resrcCd) || "0",
    "qty": String(getData.qty) || "0",
    "bomType": String(bomType) || "",
    "flagYN": String(flagYN) || "",
    "unitQty": String(getData.unitQty).replace(/,/g, "") || "0"
  };

  $.ajax({
    url: "act/saveBom",
    data: JSON.stringify({datas: [bomData]}),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      alert(data.result);
      fnShow(prodCd, bomType);
    },
    error: ajaxErrorHandler
  });
};

// 5-1. 그리드 초기화 ------------------------------------------------------------------------------
var fnNew = function () {

  fnReset();

  // 그리드 비우기
  $("#grid03").pqGrid("option", "dataModel", {data: []});

  // 그리드 포커스 제거
  $("#grid01").pqGrid("setSelection", null);
  $("#grid02").pqGrid("setSelection", null);
  $("#grid03").pqGrid("setSelection", null);

  // 그리드 갱신
  $("#grid03").pqGrid("refreshDataAndView");
};

// 5-2. 그리드 초기화 ------------------------------------------------------------------------------
var fnReset = function () {

  // 제품 초기화
  $("#prodNm").val("");
  $("#prodCd").val("");
  $("#prod").val("");
  $("#prod").html(`<option value="">==제품==</option>`);

  // 그리드 초기화
  $("#grid01").pqGrid("setSelection", null);
  $("#grid01").pqGrid("refreshDataAndView");
};

// 5-3. 그리드 초기화(검색시) ----------------------------------------------------------------------
var fnResetWhenSearch = function () {

	// 제품 초기화
  $("#prod").val("");
  $("#prod").html(`<option value="">==제품==</option>`);

  // 그리드 초기화
  $("#grid03").pqGrid("setSelection", null);
	$("#grid03").pqGrid("option", "dataModel", {data: []});
	$("#grid03").pqGrid("refreshDataAndView");
};

// 0. BOM input ------------------------------------------------------------------------------------
var fnBomInput = function () {

  // bomInput에 엔터 입력시 이벤트 (grid reset)
  $(".bomInput").keydown(function(e) {
    if (e.keyCode === 13) {
      fnReset();
      $("#grid03").pqGrid("setSelection", null);
      $("#grid03").pqGrid("option", "dataModel.data", []);
      $("#grid03").pqGrid("refreshDataAndView");
    }
  });

  // `prod`셀렉트에 값이 선택되면 이벤트
  $("#prod").on("change", function() {
    if ($("#prod").val() !== "") {
      fnShow($("#prod").val(), "prod");
    }
    $("#grid03").pqGrid("refreshDataAndView");
  });
}

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

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
var fnPressGet02 = function (event) {
  if (
    (event.keyCode === 13 && event.key === "Enter") ||
    (event.type === "click")
  ) {
    event.preventDefault();
    fnGetList02();
  }
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
var fnChangeList = function () {
  var findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
  fnGetList02();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  var curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  fnBomInput();
  fnGetList01();
  fnGetList02();
  fnGetList03();
});
