// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 (pCd) {

  const $grid01 = $(`#grid01`);

  var filter = function (treeId, parentNode, childNodes) {
    if (!childNodes) {
      return null;
    }
    return childNodes;
  }

  var zSetting = {
    data: {
      simpleData: {
        enable: true
      },
    },
    async: {
      enable: true,
      url: "act/listHouse",
      autoParam: ["id"],
      dataFilter: filter
    },
    callback: {
      onClick: fnShow
    }
  };

  $.ajax({
    url: "act/listHouse",
    data: `id=${pCd}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $.fn.zTree.init($("#" + gridCd), zSetting, data);
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (houseData) {

  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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

  // 빈값 0으로 출력
  obj.renderZero = function(ui) {
    return ui.cellData ? ui.cellData : "0";
  };

  // 푸터 합계 계산
  obj.calcSum = function (data, dataIndex) {
	  if (!data) return "0";
	  var sum = data.reduce(function(acc, row) {
	    var value = Number(row[dataIndex]);
	    return acc + (isNaN(value) ? 0 : value);
	  }, 0);
	  return sum.toLocaleString();
	};

  const colModel = [
    {dataIndx:"prodNm", title:"품명", dataType:"string", align:"center",,
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
  ];

  // 제품이 있는 경우만 그리드 표시
  obj.dataModel = {
    data:houseData
    ? houseData.filter(function (item) {return item.prodNm ? item.prodNm.trim() : ""})
    : []
  };

  // title 표시
  obj.title = `
    <span class="fs-0-8rem fw-600 mr-15px">${$("#houseNm").val()||"창고"}</span><b>제품</b> 재고 현황
  `;

  // footer 합계표시
  obj.summaryData = [{
    pq_rowcls: "summary-row",
    prodNm: `<b>Total : </b>`,
    inQty: obj.calcSum(houseData, "inQty"),
    outQty: obj.calcSum(houseData, "outQty"),
    qty: obj.calcSum(houseData, "qty")
  }];
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList03 (houseData) {

  const gridCd = "grid03";

  const gridOption = {
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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

  // 빈값 0으로 출력
  obj.renderZero = function(ui) {
    return ui.cellData ? ui.cellData : "0";
  };

  // 푸터 합계 계산
  obj.calcSum = function (data, dataIndex) {
	  if (!data) return "0";
	  var sum = data.reduce(function(acc, row) {
	    var value = Number(row[dataIndex]);
	    return acc + (isNaN(value) ? 0 : value);
	  }, 0);
	  return sum.toLocaleString();
	};

  const colModel = [
    {dataIndx:"resrcNm", title:"품명", dataType:"string", align:"center",,
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
  ];

  // 제품이 있는 경우만 그리드 표시
  obj.dataModel = {
    data:houseData
    ? houseData.filter(function (item) {return item.resrcNm ? item.resrcNm.trim() : ""})
    : []
  };

  // title 표시
  obj.title = `
    <span class="fs-0-8rem fw-600 mr-15px">${$("#houseNm").val()||"창고"}</span><b>자재</b> 재고 현황
  `;

  // footer 합계표시
  obj.summaryData = [{
    pq_rowcls: "summary-row",
    resrcNm: `<b>Total : </b>`,
    inQty: obj.calcSum(houseData, "inQty"),
    outQty: obj.calcSum(houseData, "outQty"),
    qty: obj.calcSum(houseData, "qty")
  }];
  $("#" + gridCd).pqGrid(obj).pqGrid("refreshDataAndView");
};

// 2-1. 상세 항목 ----------------------------------------------------------------------------------
function fnShow(event, treeId, treeNode) {

  $.ajax({
    url: "act/showHouse",
    data: `houseCd=${treeNode.id}`,
    type: "POST",
    dataType:"JSON",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      var productPerHouse = data.productPerHouse;
      var resourcePerHouse = data.resourcePerHouse;

      // 배열 합치기
      var houseData = productPerHouse.concat(resourcePerHouse);

      // 창고 초기화
      $("#parentsHNm").val(houseData[0].parentsHNm);
      $("#parentsHCd").val(houseData[0].parentsHCd);
      $("#houseCd").val(houseData[0].houseCd);
      $("#houseNm").val(houseData[0].houseNm);
      $("#houseOrder").val(houseData[0].houseOrder);

      // fnGetList02 호출
      fnGetList02(productPerHouse);

      // fnGetList03 호출
      fnGetList03(resourcePerHouse);
    },
    error: ajaxErrorHandler
  });
};

// 2-2. 노드트리 새로고침 --------------------------------------------------------------------------
function fnRefreshNode(pId, resultCd) {
  var treeObj = $.fn.zTree.getZTreeObj("grid01");

  // 부모 노드 찾기
  var parentNode = treeObj.getNodeByParam("id", pId, null);

  if (parentNode) {
    // 부모 노드의 자식 노드만 다시 로드
    treeObj.reAsyncChildNodes(parentNode, "refresh", true);

    // 자식 노드 로드가 완료된 후 실행될 콜백
    treeObj.setting.callback.onAsyncSuccess = function (event, treeId, treeNode) {

      // 새 노드에 포커스
      var resultNode = treeObj.getNodeByParam("id", null, null);
      if (resultNode) {
        treeObj.setting.callback.onClick(event, treeId, resultNode);
        treeObj.selectNode(resultNode);
      }
    };
  }
};

// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSave(YN) {

  let flagParam = "";

  if (YN == "N") {
    flagParam = "N";
    if (!confirm("해당 창고를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($("#houseNm").val() == "") {
      alert("창고이름을 입력해 주세요");
      $("#houseNm").on("focus", function () {});
      return;
    }
    if ($("#houseOrder").val() == "") {
      alert("창고순서를 입력해 주세요");
      $("#houseOrder").on("focus", function () {});
      return;
    }
  }

  const param = {
    "houseCd": $("#houseCd").val() || "0",
    "houseNm": $("#houseNm").val() || "",
    "parentsHCd": $("#parentsHCd").val() || "0",
    "houseOrder": $("#houseOrder").val() || "99",
    "flagYN": flagParam
  };

  $.ajax({
    url: "act/saveHouse",
    data: JSON.stringify(param),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);

      var pIdParam = $("#parentsHCd").val();
      var nameParam = $("#houseNm").val();

      // 1. 저장인 경우 (트리노드에 포커스)
      if (flagParam === "Y") {
        var treeObj = $.fn.zTree.getZTreeObj("grid01");
        var parentNode = treeObj.getNodeByParam("id", pIdParam, null);
        var newNode = {
          id: null,
          pId: pIdParam,
          name: nameParam,
          isParent: true
        };
        treeObj.addNodes(parentNode, newNode);
        fnRefreshNode(pIdParam, null);
      }

      // 2. 삭제인 경우 (트리노드 새로고침)
      else if (flagParam === "N") {
        fnRefreshNode(pIdParam, null);
        // 창고 초기화
			  $("#parentsHCd").val("0");
			  $("#parentsHNm").val("");
			  $("#houseCd").val("0");
			  $("#houseNm").val("");
			  $("#houseOrder").val("99");
			  fnGetList02(null);
			  fnGetList03(null);
      }
    },
    error: ajaxErrorHandler
  });
};

// 3-2. 하위 창고 추가 -----------------------------------------------------------------------------
function fnAddCat() {

  if ($("#houseCd").val() == "0" || $("#houseCd").val() == "") {
    alert("하위 창고항목을 생성 할 수 없습니다.");
    return;
  }

  $("#parentsHNm").val($("#houseNm").val());
  $("#parentsHCd").val($("#houseCd").val());
  $("#houseCd").val("0");
  $("#houseNm").val("");
  $("#houseOrder").val("99");
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  if ($("#houseCd").val() == "0") {
    alert("삭제할 창고를 선택해 주세요");
    return;
  }
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {

  // 창고 그리드 초기화
  $.fn.zTree.destroy("grid01");
  fnGetList01("0");

  // 창고 초기화
  $("#parentsHCd").val("0");
  $("#parentsHNm").val("");
  $("#houseCd").val("0");
  $("#houseNm").val("");
  $("#houseOrder").val("99");
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
function fnPressGet01(event) {
  if (
    (event.keyCode === 13 && event.key === "Enter") ||
    (event.type === "click")
  ) {
    event.preventDefault();
    fnReset();
    fnGetList01("0");
  }
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  const curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  fnGetList01("0");
  fnGetList02(null);
  fnGetList03(null);
});
