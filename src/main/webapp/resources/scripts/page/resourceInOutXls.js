// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnShowExcel(body) {

  const $grid01 = $(`#grid01`);
  const inputBox = `<input class="mt-5px" type="checkbox" id="allCheck" onclick="fnSelectAll()" />`;

  const gridOption = {
    xlsNm: "resourceInOutXls.xlsx",
    title: "   자재 입출고 관리",
    width: "100%",
    height: "100%",
    wrap: false,
    hwrap: false,
    editable: true,
    swipeModel: {on:false},
    pasteModel: {on:false},
    selectionModel: {type:"row", fireSelectChange:true},
    pageModel: {type:"local", rPP:100, strRpp:"{0}", strDisplay:"Total:{2}"},
    scrollModel: {autoFit:true, theme:true, pace:"fast", horizontal:true, flexContent:true},
    numberCell: {show:true, resizable:false, width:30},
    summaryData: [],
    cellClick: (_, ui) => {
      if (ui.dataIndx === "checkStatus") {
        const isChecked = !ui.rowData.checkStatus;
        ui.rowData.checkStatus = isChecked;
        if (!isChecked) {
          return;
        }
        ["houseNm", "compNm"].forEach((field) => {
          if (ui.rowData[field]) {
            fnGetCdWithNm(field, ui.rowData[field], ui.rowIndx, "grid01");
          }
        });
      }
    },
    cellBeforeSave: (_, ui) => {
      if (ui.dataIndx === "houseNm" || ui.dataIndx === "compNm") {
        fnGetCdWithNm(ui.dataIndx, ui.value, ui.rowIndx, "grid01");
      }
    },
  };
  const colModel = [
    {
      title:inputBox, dataIndx:"checkStatus", dataType:"bool", align:"center", type: "checkBox",
      cb: {all:true, header:true, select:true, deselect:true},
      minWidth:30, maxWidth:30, editable: false, sortable:false,
      render: fnRenderCheckBox
    },
    {
      title:"inOutCheck", dataIndx:"inOutCheck", dataType:"string", align:"center",
      hidden: true,
    },
    {
      title:"자재코드", dataIndx:"resrcCd", dataType:"string", align:"center",
      hidden:true
    },
    {
      title:"창고코드", dataIndx:"houseCd", dataType:"string", align:"center",
      hidden:true
    },
    {
      title:"거래처코드", dataIndx:"compCd", dataType:"string", align:"center",
      hidden:true
    },
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:100, required:true,
    },
    {
      title:"자재분류", dataIndx:"resrcType", dataType:"string", align:"center",
      minWidth:100, required:true,
    },
    {
      title:"창고이름", dataIndx:"houseNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"거래처이름", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"제조사", dataIndx:"maker", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"단위", dataIndx:"unit", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"재질", dataIndx:"quality", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"사양", dataIndx:"option1", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"규격", dataIndx:"option2", dataType:"string", align:"center",
      minWidth:100,
    },
    {
      title:"안전재고", dataIndx:"protectedQty", dataType:"string", align:"right",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다"}],
      minWidth:100, required:true,
    },
    {
      title:"표준단가", dataIndx:"unitPrice", dataType:"string", align:"right",
      validations: [{type: "regexp", value: /^([0-9,]+)?$/, msg: "숫자만 입력 가능합니다"}],
      minWidth:100, required:true,
    },
    {
      title:"비고", dataIndx:"remarks", dataType:"string", align:"center",
      minWidth:100,
    },
  ];
  $grid01.pqGrid({
    ...gridOption,
    colModel: colModel,
    dataModel: {data: body || []},
  })
  .pqGrid("refreshDataAndView");
};

// 1-2. 전부 선택 ----------------------------------------------------------------------------------
function fnSelectAll() {

  const getData = $(`#grid01`).pqGrid("getData");

  if ($("input:checkbox[id='allCheck']").is(":checked")) {
    $("input:checkbox[class='chkBox']").prop("checked", true);
    for (let i = 0; i < getData.length; i++) {
      const row = getData[i];
      row.checkStatus = true;
      ["houseNm", "compNm"].forEach((field) => {
        if (row[field]) {
          fnGetCdWithNm(field, row[field], i, "grid01");
        }
      });
    }
  }
  else {
    $("input:checkbox[class='chkBox']").prop("checked", false);
    for (let i = 0; i < getData.length; i++) {
      const row = getData[i];
      row.checkStatus = false;
    }
  }
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave() {

  // 데이터 불러오기
  const getData = $(`#grid01`).pqGrid("getData");
  const colData = getData.filter((row) => row.checkStatus === true);
  const inOut = $(".prodInOut:checked").val();

  if (colData.length === 0) {
    alert("제품을 선택해 주세요");
    return;
  }

  // 유효성 검사 함수 (행, 필드명, 메세지)
  const validateField = (row, fieldName, message) => {
    if (!row[fieldName]) {
      alert(message);
      return false;
    }
    return true;
  };

  // 유효성 검사 함수 (숫자 관련)
  const validateNumber = (row, fieldName, message) => {
    if (row[fieldName] && isNaN(row[fieldName])) {
      alert(message);
      return false;
    }
    return true;
  };

  // 선택된 행만 검증
  let validationPassed = true;
  for (let i = 0; i < colData.length; i++) {
    const row = colData[i];
    row["inOut"] = inOut;

    row.resrcCd = row.resrcCd ? row.resrcCd.toString().trim() : "0";
    row.houseCd = row.houseCd ? row.houseCd.toString().trim() : "0";
    row.compCd = row.compCd ? row.compCd.toString().trim() : "0";

    if (
      !validateField(row, "resrcNm", "자재명을 입력해 주세요") ||
      !validateField(row, "inOutDt", "일자를 입력해 주세요") ||
      !validateField(row, "houseNm", "창고 이름을 입력해 주세요") ||
      !validateField(row, "compNm", "거래처 이름을 입력해 주세요") ||
      !validateField(row, "qty", "수량을 입력해 주세요") ||
      !validateNumber(row, "qty", "수량은 숫자만 입력 가능합니다") ||
      !validateField(row, "unitPrice", "표준단가를 입력해 주세요") ||
      !validateNumber(row, "unitPrice", "표준단가는 숫자만 입력 가능합니다")
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
    url: `act/saveResourceInOutXls`,
    data: JSON.stringify({dataList: colData}),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnReset();
    },
    error: fnAjaxErrorHandler
  });
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {
  // 파일 초기화
  $(`#resourceInOutXls`).val("");

  // 그리드 초기화
  $(`#grid01`).pqGrid({
    dataModel: {data: []},
  })
  .pqGrid("refreshDataAndView");
};

// 0. 엑셀 업로드 ----------------------------------------------------------------------------------
function fnFilePicked(oEvent) {

  const oFile = oEvent.target.files[0];
  const sFilename = oFile.name;
  const divFile = sFilename.split(".");
  const fileReader = new FileReader();

  if (divFile[1] !== "xls") {
    alert("xls 파일만 사용가능 합니다");
    $(`#resourceXls`).val("");
    return;
  }

  fileReader.onload = (e) => {
    const data = e.target.result;
    const cfb = XLS.CFB.read(data, {type: "binary"});
    const wb = XLS.parse_xlscfb(cfb);

    wb.SheetNames.forEach((sheetName) => {
      const data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
      const datas = [];
      const limit = data.length;
      // 동적할당을 위해 resrcCd, houseCd, compCd는 비워둔다.
      const keyMap = [
        "resrcNm", "inOutDt", "houseNm", "compNm", "qty", "unitPrice", "remarks", "inOutCheck"
      ];

      for (let k = 1; k < limit; k++) {
        const vals = {};
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
  fileReader.readAsBinaryString(oFile);
};

// 0. 엑셀 다운로드 --------------------------------------------------------------------------------
function fnExDownload() {
  const fileUrl = "resourceInOut_Xls_sample.xls";
  location.href = `downloadFiles?fileUrl=${fileUrl}`;
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  fnShowExcel();
  const oFileIn = document.getElementById("resourceInOutXls");
  if (oFileIn.addEventListener) {
    oFileIn.addEventListener("change", fnFilePicked, false);
  }
});
