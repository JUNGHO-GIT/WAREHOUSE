// 1. 그리드 설정 및 리스트 호출 ------------------------------------------------------------------>
var fnShowExcel = function (body) {

  var gridCd = "grid01";
  var inputBox = `<input class="mt-5" type="checkbox" id="allCheck" onClick="fnSelectAll()" />`;

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "productInOutXls.xlsx",
    title: "   제품 관리",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    editable: true,
    swipeModel: {on:false},
    pasteModel: {on:false},
    filterModel: {on:true, mode:"AND", header:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true}
  };
  
  // 유효성검사 (제품 o, 창고 o, 거래처 o)
  obj.cellBeforeSave = function(event, ui) {
    if (ui.dataIndx === "prodNm" || ui.dataIndx === "houseNm" || ui.dataIndx === "compNm") {
      fnGetCdWithNm(ui.dataIndx, ui.value, ui.rowIndx, gridCd);
    }
  };
  
  // 체크박스 on/off 및 fnGetCdWithNm 실행
  obj.cellClick = function (event, ui) {
    if (ui.dataIndx === "checkStatus") {
      var isChecked = !ui.rowData.checkStatus;
      ui.rowData.checkStatus = isChecked;
      if (isChecked) {
        ["prodNm", "houseNm", "compNm"].forEach(function(field) {
          if (ui.rowData[field]) {
            fnGetCdWithNm(field, ui.rowData[field], ui.rowIndx, gridCd);
          }
        });
      }
    }
  };
  
  // 체크박스 렌더링
  obj.checkBoxRender = function (ui) {
    var row = ui.rowData;
    return `<input type="checkbox" class="chkBox" ${row.checkStatus ? "checked" : ""}>`;
  };
  
  obj.colModel = [
    {dataIndx:"checkStatus", title:inputBox, dataType:"bool", align:"center", type: "checkBox",
      editable:false, sortable:false, cb: {all:true, header:true, select:true, deselect:true},
      minWidth:30, maxWidth:30, render: obj.checkBoxRender
    },
    {dataIndx:"prodCd", title:"제품코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"prodNm", title:"제품이름", dataType:"string", align:"center",
    },
    {dataIndx:"inOutDt", title:"일자", dataType:"string", align:"center",
      editable:true
    },
    {dataIndx:"houseCd", title:"창고코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"houseNm", title:"창고이름", dataType:"string", align:"center",
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"string", align:"center",
      editable:true, hidden:true,
    },
    {dataIndx:"compNm", title:"거래처이름", dataType:"string", align:"center",
    },
    {dataIndx:"qty", title:"수량", dataType:"string", align:"right", editable:true,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"unitPrice", title:"표준단가", dataType:"string", align:"right", editable:true,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"remark", title:"비고", dataType:"string", align:"center",
    },
    {dataIndx:"inOutCheck", title:"inOutCheck", dataType:"string", align:"center",
      hidden: true,
    },
  ];
  if (body != undefined) {
    obj.dataModel = {data:body};
  }
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 1-2. 전부 선택 --------------------------------------------------------------------------------->
var fnSelectAll = function () {

  var getData = $("#grid01").pqGrid("getData");

  if ($("input:checkbox[id='allCheck']").is(":checked")) {
    // check : true
    $("input:checkbox[class='chkBox']").prop("checked", true);
    // value : true
    for (var i = 0; i < getData.length; i++) {
      var row = getData[i];
      row.checkStatus = true;
      // 체크된 경우 fnGetCdWithNm 함수 실행 (제품 o, 창고 o, 거래처 o)
      ["prodNm", "houseNm", "compNm"].forEach(function(field) {
        if (row[field]) {
          fnGetCdWithNm(field, row[field], i, "grid01");
        }
      });
    }
  }
  if (!$("input:checkbox[id='allCheck']").is(":checked")) {
    // check : false
    $("input:checkbox[class='chkBox']").prop("checked", false);
    // value : false
    for (var i = 0; i < getData.length; i++) {
      var row = getData[i];
      row.checkStatus = false;
    }
  }
};

// 3. 저장 ---------------------------------------------------------------------------------------->
var fnSave = function() {

  // 데이터 불러오기
  var getData = $("#grid01").pqGrid("getData");
  var colData = getData.filter(function (row) {
    return row.checkStatus === true;
  });

  if (colData.length === 0 || colData === undefined || colData === null) {
    alert("제품을 선택해 주세요.");
    return;
  }

  // 유효성 검사 함수 (행, 필드명, 메세지)
  var validateField = function (row, fieldName, message) {
    if (!row[fieldName]) {
      alert(message);
      return false;
    }
    return true;
  }
  
  // 유효성 검사 함수 (숫자 관련)
  var validateNumber = function (row, fieldName, message) {
    if (row[fieldName]) {
      if (isNaN(row[fieldName])) {
        alert(message);
        return false;
      }
    }
    return true;
  }

  var validationPassed = true;

  // 선택된 행만 검증
  var inOut = $(".prodInOut:checked").val();
  for (var i = 0; i < colData.length; i++) {
    var row = colData[i];
    row.prodCd = row.prodCd ? row.prodCd.toString().trim() : "";
    row.houseCd = row.houseCd ? row.houseCd.toString().trim() : "";
    row.compCd = row.compCd ? row.compCd.toString().trim() : "";

    if (
      !validateField(row, "prodNm", "제품명을 입력해 주세요.") ||
      !validateField(row, "inOutDt", "일자를 입력해 주세요.") ||
      !validateField(row, "houseNm", "창고 이름을 입력해 주세요.") ||
      !validateField(row, "compNm", "거래처 이름을 입력해 주세요.") ||
      !validateField(row, "qty", "수량을 입력해 주세요.") ||
      !validateNumber(row, "qty", "수량은 숫자만 입력 가능합니다.") ||
      !validateField(row, "unitPrice", "표준단가를 입력해 주세요.") ||
      !validateNumber(row, "unitPrice", "단가는 숫자만 입력 가능합니다.")
    ) {
      validationPassed = false;
      break;
    }
    row["inOut"] = inOut;
  }

  if (!validationPassed) {
    return;
  }

  if (!confirm("저장 하시겠습니까?")) {
    return;
  }

  $.ajax({
    url: "/act/saveProductInOutXls",
    data: JSON.stringify({datas: colData}),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      alert(data.result);
      fnReset();
    },
    error: ajaxErrorHandler
  });
};

// 5. 초기화 ------------------------------------------------------------------------------------->
var fnReset = function () {
  // 파일 초기화
  $("#productInOutXls").val("");
  // 그리드 초기화
  $("#grid01").pqGrid("option", "dataModel", {data: []});
  $("#grid01").pqGrid("refreshDataAndView");
};

// 0. 엑셀 업로드 --------------------------------------------------------------------------------->
var fnFilePicked = function (oEvent) {

  var oFile = oEvent.target.files[0];
  var sFilename = oFile.name;
  var divFile = sFilename.split(".");

  if (divFile[1] != "xls") {
    alert("xls 파일만 사용가능 합니다.");
    $("#productInOutXls").val("");
    return;
  }

  var reader = new FileReader();

  reader.onload = function (e) {
    var data = e.target.result;
    var cfb = XLS.CFB.read(data, {type: "binary"});
    var wb = XLS.parse_xlscfb(cfb);

    wb.SheetNames.forEach(function(sheetName) {
      var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
      var datas = [];
      var limit = data.length;

      // 동적할당을 위해 prodCd, houseCd, compCd는 비워둔다.
      var keyMap = [
        "prodNm", "inOutDt", "houseNm", "compNm", "qty", "unitPrice", "remark", "inOutCheck"
      ];

      for (var k = 1; k < limit; k++) {
        var vals = {};
        for (var r = 0; r < data[k].length; r++) {
          if (keyMap[r]) {
            Object.assign(vals, { [keyMap[r]]: data[k][r] });
          }
        }
        datas.push(vals);
      }
      fnShowExcel(datas);
    });
  };
  reader.readAsBinaryString(oFile);
};

// 0. 엑셀 다운로드 ------------------------------------------------------------------------------->
var fnExDownload = function () {
  var fileUrl = "productInOut_Xls_sample.xls";
  window.location = "/downloadFiles?fileUrl="+fileUrl;
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
  fnShowExcel();
  var oFileIn = document.getElementById("productInOutXls");
  if (oFileIn.addEventListener) {
    oFileIn.addEventListener("change", fnFilePicked, false);
  }
});
