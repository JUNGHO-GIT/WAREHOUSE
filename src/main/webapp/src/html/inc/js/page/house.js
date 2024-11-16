// 1. 그리드 설정 및 리스트 호출 ------------------------------------------------------------------>
var fnGetList01 = function (pCd) {

  var gridCd = "grid01";

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
      url: "/act/listHouse",
      autoParam: ["id"],
      dataFilter: filter
    },
    callback: {
      onClick: fnShow
    }
  };

  $.ajax({
    url: "/act/listHouse",
    data: `id=${pCd}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      $.fn.zTree.init($("#" + gridCd), zSetting, data);
    },
    error: ajaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 ------------------------------------------------------------------>
var fnGetList02 = function (houseData) {

  var gridCd = "grid02";

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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

  obj.colModel = [
    {dataIndx: "prodNm", title: "품명", dataType: "string", align: "center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
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
  ];

  // 제품이 있는 경우만 그리드 표시
  obj.dataModel = {
    data:houseData
    ? houseData.filter(function (item) {return item.prodNm ? item.prodNm.trim() : ""})
    : []
  };

  // title 표시
  obj.title = `
    <span class="fs-14 fw-bold me-15">${$("#houseNm").val()||"창고"}</span><b>제품</b> 재고 현황
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

// 1. 그리드 설정 및 리스트 호출 ------------------------------------------------------------------>
var fnGetList03 = function (houseData) {

  var gridCd = "grid03";

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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

  obj.colModel = [
    {dataIndx: "resrcNm", title: "품명", dataType: "string", align: "center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
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
  ];

  // 제품이 있는 경우만 그리드 표시
  obj.dataModel = {
    data:houseData
    ? houseData.filter(function (item) {return item.resrcNm ? item.resrcNm.trim() : ""})
    : []
  };

  // title 표시
  obj.title = `
    <span class="fs-14 fw-bold me-15">${$("#houseNm").val()||"창고"}</span><b>자재</b> 재고 현황
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

// 2-1. 상세 항목 --------------------------------------------------------------------------------->
var fnShow = function (event, treeId, treeNode) {

  $.ajax({
    url: "/act/showHouse",
    data: `houseCd=${treeNode.id}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {

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

// 2-2. 노드트리 새로고침 ------------------------------------------------------------------------->
var fnRefreshNode = function (pId, resultCd) {
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

// 3-1. 저장 -------------------------------------------------------------------------------------->
var fnSave = function (YN) {

  var flagParam = "";

  if (YN == "N") {
    flagParam = "N";
    if (!confirm("해당 창고를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
    flagParam = "Y";
    if ($("#houseNm").val() == "") {
      alert("창고이름을 입력해 주세요.");
      $("#houseNm").focus();
      return;
    }
    if ($("#houseOrder").val() == "") {
      alert("창고순서를 입력해 주세요.");
      $("#houseOrder").focus();
      return;
    }
  }

  var param = {
    "houseCd": $("#houseCd").val() || "0",
    "houseNm": $("#houseNm").val() || "",
    "parentsHCd": $("#parentsHCd").val() || "0",
    "houseOrder": $("#houseOrder").val() || "99",
    "flagYN": flagParam
  };

  $.ajax({
    url: "/act/saveHouse",
    data: JSON.stringify(param),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
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

// 3-2. 하위 창고 추가 ---------------------------------------------------------------------------->
var fnAddCat = function () {

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

// 4. 삭제 ---------------------------------------------------------------------------------------->
var fnDel = function () {
  if ($("#houseCd").val() == "0") {
    alert("삭제할 창고를 선택해 주세요.");
    return;
  }
  fnSave("N");
};

// 5-1. 초기화 ------------------------------------------------------------------------------------>
var fnReset = function () {

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

// 0. 엔터일때만 실행 ----------------------------------------------------------------------------->
var fnPressGet01 = function (event) {
  if (
    (event.keyCode === 13 && event.key === "Enter") ||
    (event.type === "click")
  ) {
    event.preventDefault();
    fnReset();
    fnGetList01("0");
  }
};

// 0. 에러 처리 ----------------------------------------------------------------------------------->
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
  var curDate = fnToday();
  $("#inOutDt").datepicker(G_calendar);
  $("#inOutDt").val(curDate);

  fnGetList01("0");
  fnGetList02(null);
  fnGetList03(null);
});
