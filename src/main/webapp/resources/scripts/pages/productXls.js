// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnShowExcel(body) {

  const $grid = $(`#grid01`);
  var inputBox = `<input class="mt-5px" type="checkbox" id="allCheck" onclick="fnSelectAll()" />`;

  const gridOption = {
    xlsNm: "productXls.xlsx",
    title: "   제품 관리",
    width: "auto",
    height: "auto",
    wrap: false,
    hwrap: false,
    editable: true,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent: true},
    numberCell: {show: true, resizable: false, width: 30},
  };

  // 유효성검사 (제품 x, 창고 o, 거래처 o)
  obj.cellBeforeSave = function(event, ui) {
    if (ui.dataIndx === "houseNm" || ui.dataIndx === "compNm") {
      fnGetCdWithNm(ui.dataIndx, ui.value, ui.rowIndx, gridCd);
    }
  };

  // 체크박스 on/off 및 fnGetCdWithNm 실행
  obj.cellClick = function (event, ui) {
    if (ui.dataIndx === "checkStatus") {
      var isChecked = !ui.rowData.checkStatus;
      ui.rowData.checkStatus = isChecked;
      if (isChecked) {
        // 체크된 경우 fnGetCdWithNm 함수 실행
        ["houseNm", "compNm"].forEach(function(field) {
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

  const colModel = [
    {dataIndx:"checkStatus", title:inputBox, dataType:"bool", align:"center", type: "checkBox",
      editable:false, sortable:false, cb: {all:true, header:true, select:true, deselect:true},
      minWidth:30, maxWidth:30, render: obj.checkBoxRender
    },
    {dataIndx:"prodCd", title:"제품코드", dataType:"string", align:"center",
      editable:true, hidden:true
    },
    {dataIndx:"prodNm", title:"제품이름", dataType:"string", align:"center",
    },
    {dataIndx:"prodType", title:"제품분류", dataType:"string", align:"center",
    },
    {dataIndx:"houseCd", title:"창고코드", dataType:"string", align:"center",
      editable:true, hidden:true
    },
    {dataIndx:"houseNm", title:"창고이름", dataType:"string", align:"center",
    },
    {dataIndx:"compCd", title:"거래처코드", dataType:"string", align:"center",
      editable:true, hidden:true
    },
    {dataIndx:"compNm", title:"거래처이름", dataType:"string", align:"center",
    },
    {dataIndx:"maker", title:"제조사", dataType:"string", align:"center",
    },
    {dataIndx:"unit", title:"단위", dataType:"string", align:"center",
    },
    {dataIndx:"quality", title:"재질", dataType:"string", align:"center",
    },
    {dataIndx:"option1", title:"사양", dataType:"string", align:"center",
    },
    {dataIndx:"option2", title:"규격", dataType:"string", align:"center",
    },
    {dataIndx:"protectedQty", title:"안전재고", dataType:"string", align:"right", editable:true,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"unitPrice", title:"표준단가", dataType:"string", align:"right", editable:true,
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다."}]
    },
    {dataIndx:"remark", title:"비고", dataType:"string", align:"center",
    },
  ];
  if (body != undefined) {
    obj.dataModel = {data:body};
  }
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 1-2. 전부 선택 ----------------------------------------------------------------------------------
function fnSelectAll() {

  var getData = $("#grid01").pqGrid("getData");

  if ($("input:checkbox[id='allCheck']").is(":checked")) {
    // check : true
    $("input:checkbox[class='chkBox']").prop("checked", true);
    // value : true
    for (let i = 0; i < getData.length; i++) {
      var row = getData[i];
      row.checkStatus = true;
      // 체크된 경우 fnGetCdWithNm 함수 실행 (제품 x, 창고 o, 거래처 o)
      ["houseNm", "compNm"].forEach(function(field) {
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
    for (let i = 0; i < getData.length; i++) {
      var row = getData[i];
      row.checkStatus = false;
    }
  }
};



// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave() {

  // 데이터 불러오기
  var getData = $("#grid01").pqGrid("getData");
  var colData = getData.filter(function (row) {
    return row.checkStatus === true;
  });

  if (colData.length === 0) {
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
    if (row[fieldName] && isNaN(row[fieldName])) {
      alert(message);
      return false;
    }
    return true;
  }

  var validationPassed = true;

  // 선택된 행만 검증
  for (let i = 0; i < colData.length; i++) {

    var row = colData[i];
    row.prodCd = row.prodCd ? row.prodCd.toString().trim() : "";
    row.houseCd = row.houseCd ? row.houseCd.toString().trim() : "";
    row.compCd = row.compCd ? row.compCd.toString().trim() : "";

    if (
      !validateField(row, "prodNm", "제품명을 입력해 주세요.") ||
      !validateField(row, "prodType", "제품분류를 입력해 주세요.") ||
      !validateField(row, "houseNm", "창고 이름을 입력해 주세요.") ||
      !validateField(row, "compNm", "거래처 이름을 입력해 주세요.") ||
      !validateField(row, "protectedQty", "안전재고를 입력해 주세요.") ||
      !validateNumber(row, "protectedQty", "안전재고는 숫자만 입력 가능합니다.") ||
      !validateField(row, "unitPrice", "표준단가를 입력해 주세요.") ||
      !validateNumber(row, "unitPrice", "단가는 숫자만 입력 가능합니다.")
    ) {
      validationPassed = false;
      break;
    }
  }

  if (!validationPassed) {
    return;
  }

  if (!confirm("저장 하시겠습니까?")) {
    return;
  }

  $.ajax({
    url: "act/saveProductXls",
    data: JSON.stringify({datas: colData}),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnReset();
    },
    error: ajaxErrorHandler
  });
};

// 0. 엑셀 업로드 ----------------------------------------------------------------------------------
function fnFilePicked(oEvent) {

  var oFile = oEvent.target.files[0];
  var sFilename = oFile.name;
  var divFile = sFilename.split(".");

  if (divFile[1] != "xls") {
    alert("xls 파일만 사용가능 합니다.");
    $("#productXls").val("");
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

      // 동적할당을 위해 houseCd, compCd는 비워둔다.
      var keyMap = [
        "prodNm", "prodType", "houseNm", "compNm", "maker", "unit", "quality", "option1", "option2", "protectedQty", "unitPrice", "remark"
      ];

      for (let k = 1; k < limit; k++) {
        var vals = {};
        for (let r = 0; r < data[k].length; r++) {
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

// 0. 엑셀 다운로드 --------------------------------------------------------------------------------
function fnExDownload() {
  var fileUrl = "product_Xls_sample.xls";
  window.location = "/downloadFiles?fileUrl="+fileUrl;
};

// 0. 초기화 ---------------------------------------------------------------------------------------
function fnReset() {
  // 파일 초기화
  $("#productXls").val("");
  // 그리드 초기화
  $("#grid01").pqGrid("option", "dataModel.data", []);
  $("#grid01").pqGrid("refreshDataAndView");
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  fnShowExcel();
  var oFileIn = document.getElementById("productXls");
  if (oFileIn.addEventListener) {
    oFileIn.addEventListener("change", fnFilePicked, false);
  }
});
