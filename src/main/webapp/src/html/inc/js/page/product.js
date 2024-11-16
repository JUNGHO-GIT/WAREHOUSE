// 1. 그리드 설정 및 리스트 호출 ------------------------------------------------------------------>
var fnGetList01 = function () {

  var gridCd = "grid01";

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "product.xlsx",
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
    fnShow (ui.rowData.prodCd);
  };
  
  // 이미지 렌더링
  obj.renderImage = function(ui) {
    var imageUrl = "";
    var noImage = "no-image.webp";
    var noGridImage = "noGridImage.webp";
    var rowImage = ui.rowData.fileUrl;
    if (rowImage === undefined || rowImage === null) {
      imageUrl=`<img src=/viewFiles?fileUrl=${noImage} class="cards-gridImage" loading="lazy"/>`;
    }
    else if (ui.rowData.fileUrl === noGridImage) {
      imageUrl=`<img src=/viewFiles?fileUrl=${noImage} class="cards-emptyImage" loading="lazy"/>`;
    }
    else {
      imageUrl=`<img src=/viewFiles?fileUrl=${rowImage} class="cards-gridImage" loading="lazy"/>`;
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
    return ui.rowData.lowStock === 1 ? `<span class="fsr-2.0 red">●</span>` : "";
  };
  
  obj.colModel = [
    {dataIndx:"fileUrl", title:"이미지", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:70, maxWidth:70, render: obj.renderImage,
    },
    {dataIndx:"prodNm", title:"제품명", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:200,
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
    url: "/act/listProduct",
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
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 d-left">
          <span>제품 관리</span>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 d-right ms-n50">
          <span class="fsr-1.4 red">●</span>
          <span class="ms-5 me-5">안전재고 이하 : </span>
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

// 2. 상세 항목 ----------------------------------------------------------------------------------->
var fnShow = function (prodCd) {

  $.ajax({
    url: "/act/showProduct",
    data: `prodCd=${prodCd}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {

      // 1. 제품 관련
      $("#prodCd").val(data.prodCd);
      $("#prodNm").val(data.prodNm);
      $("#prodType").val(data.prodType);
      $("#option1").val(data.option1);
      $("#unit").val(data.unit);
      $("#option2").val(data.option2);
      $("#quality").val(data.quality);
      $("#maker").val(data.maker);
      $("#remark").val(data.remark);
      $("#barcode").val(data.barcode);
      $("#flagYN").val("Y");
      $("#protectedQty").val(parseInt(data.protectedQty).toLocaleString());
      $("#unitPrice").val(parseInt(data.unitPrice).toLocaleString());

      // 3. 창고 관련
      fnFindCd("", data.houseCd, "house", null);

      // 4. 거래처 관련
      fnFindCd("", data.compCd, "comp", null);

      // 5. file 관련
      $("#tableNm").val("tblProduct");
      $("#tableKey").val(data.prodCd);
      $("#keyColumn").val("prodCd");
      fnShowFiles("tblProduct", data.prodCd, "files");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 ---------------------------------------------------------------------------------------->
var fnSave = function (flagYN) {

  var flagParam = "";

  if (flagYN === "N") {
    flagParam = "N";
    if ($("#prodCd").val() == "") {
      alert("제품을 선택해 주세요.");
      return;
    }
    if (!confirm("선택하신 제품을 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($("#prodNm").val() == "") {
      alert("제품 이름을 입력해 주세요.");
      $("#prod").focus();
      return;
    }
    if ($("#prodType").val() == "") {
      alert("제품 분류를 입력해 주세요.");
      $("#prodNm").focus();
      return;
    }
    if ($("#comp").val() == "") {
      alert("거래처를 입력해 주세요.");
      $("#comp").focus();
      return;
    }
    if ($("#house").val() == "") {
      alert("창고를 입력해 주세요.");
      $("#house").focus();
      return;
    }
    if ($("#protectedQty").val() == "" || $("#protectedQty").val() == "0") {
      alert("안전재고를 입력해 주세요.");
      $("#protectedQty").focus();
      return;
    }
    if ($("#unitPrice").val() == "" || $("#unitPrice").val() == "0") {
      alert("표준단가를 입력해 주세요.");
      $("#unitPrice").focus();
      return;
    }
  }

  var param = {
    "prodCd": $("#prodCd").val() || "0",
    "prodNm": $("#prodNm").val() || "",
    "prodType": $("#prodType").val() || "",
    "houseCd": $("#house").val() || "0",
    "unit": $("#unit").val() || "",
    "option1": $("#option1").val() || "",
    "option2": $("#option2").val() || "",
    "quality": $("#quality").val() || "",
    "maker": $("#maker").val() || "",
    "compCd": $("#comp").val() || "0",
    "remark": $("#remark").val() || "",
    "protectedQty": parseInt($("#protectedQty").val().replace(/,/gm, "")) || 0,
    "unitPrice": parseInt($("#unitPrice").val().replace(/,/gm, "")) || 0,
    "flagYN": flagParam
  };

  $.ajax({
    url: "/act/saveProduct",
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
      $("#grid01").pqGrid("setSelection", {rowIndxPage:0});
      fnReset();
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 ---------------------------------------------------------------------------------------->
var fnDel = function () {
  fnSave("N");
};

// 5-1. 초기화 ------------------------------------------------------------------------------------>
var fnReset = function () {

  // 제품 초기화
  $("#prodCd").val("0");
  $("#prodNm").val("");
  $("#prodType").val("");
  $("#protectedQty").val("0");
  $("#unit").val("");
  $("#option1").val("");
  $("#option2").val("");
  $("#quality").val("");
  $("#maker").val("");
  $("#unitPrice").val("0");
  $("#compCd").val("");
  $("#remark").val("");
  $("#barcode").val("");
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
  $("#grid01").pqGrid("setSelection", null);
  $("#grid01").pqGrid("refreshDataAndView");

  // 파일 초기화
  $("#userFile").val("");
  $("#tableNm").val("tblProduct");
  $("#tableKey").val("0");
  $("#keyColumn").val("prodCd");
  fnShowFiles("tblProduct", "0", "files");
};

// 0. 엔터, 클릭, 체인지 이벤트 발생시에만 조회 --------------------------------------------------->
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

// 0. 그룹 선택시 그룹코드 표시 ------------------------------------------------------------------->
var fnChangeList = function () {
  var findGroupCd = $("#findGroupCd").val();
  $("#groupCd").val(findGroupCd);
  fnGetList01();
};

// 0. 에러처리 ------------------------------------------------------------------------------------>
var ajaxErrorHandler = function (request, status, error) {
  if (request.status === 477) {
    alert("세션이 종료 되었습니다.");
    fnGoPage("/reLogin");
  }
  else {
    alert(`code: ${request.status}\n message: ${request.responseText}\n error: ${error}`);
  }
};

// 0. 화면 로딩시 실행 ---------------------------------------------------------------------------->
$(document).ready(function () {

  var comboStr = [{part: "comCode", target: "prodType", groupCd: "0002", format: "combo"}];

  fnInitCombo (comboStr, function () {
    fnGetList01();
  });

});
