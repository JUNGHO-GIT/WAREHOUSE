// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "company",
    title: "   거래처 관리",
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
      fnShow (ui.rowData.compCd);
      fnShowFiles("tblCompany", ui.rowData.compCd, "fileList");
    },
  };
  const colModel = [
    {
      title:"거래처 코드", dataIndx:"compCd", dataType:"string", align:"center",
      hidden: true,
    },
    {
      title:"거래처 이름", dataIndx:"compNm", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"사업자번호", dataIndx:"compNo", dataType:"string", align:"center",
      minWidth:150
    },
    {
      title:"업태", dataIndx:"compType", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"종목", dataIndx:"compPart", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"대표자", dataIndx:"compOwner", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"담당자", dataIndx:"compMajor", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"주소", dataIndx:"compAddr", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"이메일", dataIndx:"compEmail", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"전화번호", dataIndx:"compPhone", dataType:"string", align:"center",
      minWidth:100
    },
    {
      title:"유효", dataIndx:"flagYn", dataType:"string", align:"center",
      minWidth:100
    },
  ];

  $.ajax({
    url: `act/listCompany`,
    data: `findCompNm=${$(`#findCompNm`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("거래처 관리", data);
      // compCd가 1인 항목을 찾아 맨위로 이동
      const index = data.findIndex((item) => item.compCd === 1);
      if (index > -1) {
        const selectedItem = data.splice(index, 1)[0];
        data.unshift(selectedItem);
      }
      gridOption.dataModel = {data:data};
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
function fnShow(compCd) {

  $.ajax({
    url: `act/showCompany`,
    data: `compCd=${compCd}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      // 1. 거래처 관련
      $(`#compCd`).val(data.compCd);
      $(`#compNm`).val(data.compNm);
      $(`#compNo`).val(data.compNo);
      $(`#compOwner`).val(data.compOwner);
      $(`#compMajor`).val(data.compMajor);
      $(`#compPhone`).val(data.compPhone);
      $(`#compEmail`).val(data.compEmail);
      $(`#compAddr`).val(data.compAddr);
      $(`#compType`).val(data.compType);
      $(`#compPart`).val(data.compPart);
      $(`#remarks`).val(data.remarks);

      // 2. file 관련
      $(`#tableNm`).val("tblCompany");
      $(`#tableKey`).val(data.compCd);
      $(`#keyColumn`).val("compCd");
    },
    error: fnAjaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave(flagYn) {

  let flagParam = "";

  if (flagYn === "N") {
    flagParam = "N";
    if ($(`#compCd`).val() == "") {
      alert("거래처를 선택해 주세요");
      return;
    }
    if (!confirm("선택하신 거래처를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($(`#compNm`).val() == "") {
      alert("거래처 이름을 입력해 주세요");
      $(`#compNm`).trigger("focus");
      return;
    }
    if ($(`#compNo`).val() == "") {
      alert("사업자번호를 입력해 주세요");
      $(`#compNo`).trigger("focus");
      return;
    }
  }

  const param = {
    "compCd": $(`#compCd`).val() || "0",
    "compNo": $(`#compNo`).val() || "",
    "compNm": $(`#compNm`).val() || "",
    "compType": $(`#compType`).val() || "",
    "compPart": $(`#compPart`).val() || "",
    "compOwner": $(`#compOwner`).val() || "",
    "compMajor": $(`#compMajor`).val() || "",
    "compAddr": $(`#compAddr`).val() || "",
    "compEmail": $(`#compEmail`).val() || "",
    "compPhone": $(`#compPhone`).val() || "",
    "remarks": $(`#remarks`).val() || "",
    "flagYn": flagParam
  };

  $.ajax({
    url: `act/saveCompany`,
    data: JSON.stringify(param),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);
      fnGetList01();
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

  // 거래처 초기화
  $(`#compCd`).val("0");
  $(`#compNo`).val("");
  $(`#compNm`).val("");
  $(`#compType`).val("");
  $(`#compPart`).val("");
  $(`#compOwner`).val("");
  $(`#compMajor`).val("");
  $(`#compAddr`).val("");
  $(`#compAddrDetail`).val("");
  $(`#compEmail`).val("");
  $(`#compPhone`).val("");
  $(`#remarks`).val("");
  $(`#flagYn`).val("Y");

  // 그리드 초기화
  $(`#grid01`).pqGrid("setSelection", null);
  $(`#grid01`).pqGrid("refreshDataAndView");

  // 파일 초기화
  $(`#userFile`).val("");
  $(`#fileDisplayedName`).html("");
  $(`#tableNm`).val("tblCompany");
  $(`#tableKey`).val("0");
  $(`#keyColumn`).val("compCd");
  fnShowFiles("tblCompany", "0", "fileList");
};

// 0. 그룹 선택시 그룹코드 표시 --------------------------------------------------------------------
function fnChangeList() {
  const findGroupCd = $(`#findGroupCd`).val();
  $(`#groupCd`).val(findGroupCd);
  fnGetList01();
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const comboStr = [
    {part:"comCodeGroup", target:"findGroupCd", cd:""},
    {part:"comCodeGroup", target:"groupCd", cd:""}
  ];
  fnInitCombo (comboStr, function() {
    fnGetList01();
  });
});
