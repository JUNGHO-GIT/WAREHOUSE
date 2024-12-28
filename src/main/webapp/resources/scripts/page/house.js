// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 (pCd)  {

  const $grid01 = $(`#grid01`);

  const zSettings = {
    data: {
      simpleData: {
        enable: true
      }
    },
    async: {
      enable: true,
      url: `act/listHouse`,
      autoParam: ["id"],
      dataFilter: (treeId, parentNode, childNodes) => {
        if (!childNodes) {
          return null;
        }
        return childNodes;
      }
    },
    callback: {
      onClick: fnShow
    }
  };

  $.ajax({
    url: `act/listHouse`,
    data: `id=${pCd}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      $.fn.zTree.init($grid01, zSettings, data);
    },
    error: fnAjaxErrorHandler
  });
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02 (houseData)  {

  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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
  };
  const colModel = [
    {
      title:"제품명", dataIndx:"prodNm", dataType:"string", align:"center",
      minWidth: 150,
    },
    {
      title:"입고", dataIndx:"inQty", dataType:"string", align:"center",
      minWidth: 100,
      render: fnRenderZero
    },
    {
      title:"출고", dataIndx:"outQty", dataType:"string", align:"center",
      minWidth: 100,
      render: fnRenderZero
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth: 100,
      render: fnRenderZero
    },
  ];

  // 제품이 있는 경우만 그리드 표시
  const data = houseData
  ? houseData.filter((item) => item.prodNm ? item.prodNm.trim() : "")
  : [];

  gridOption.title = (/* javascript */`
    <div class="d-row-left">
      <div class="fs-0-8rem fw-600 mr-10px">
        [${$(`#houseNm`).val()||"창고"}]
      </div>
      <div class="fs-0-8rem fw-500">
        제품 재고현황
      </div>
    </div>
  `);
  $grid02.pqGrid({
    ...gridOption,
    dataModel: { data: data },
    colModel: colModel,
  })
  .pqGrid("refreshDataAndView");
};

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList03 (houseData)  {

  const $grid03 = $(`#grid03`);

  const gridOption = {
    xlsNm: "product.xlsx",
    title: "   창고별 재고 현황",
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
  };
  const colModel = [
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth: 150,
    },
    {
      title:"입고", dataIndx:"inQty", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"출고", dataIndx:"outQty", dataType:"string", align:"center",
      minWidth: 100,
    },
    {
      title:"재고", dataIndx:"qty", dataType:"string", align:"center",
      minWidth: 100,
    },
  ];

  const data = houseData
  ? houseData.filter((item) => item.resrcNm ? item.resrcNm.trim() : "")
  : [];

  gridOption.title = (/* javascript */`
    <div class="d-row-left">
      <div class="fs-0-8rem fw-600 mr-10px">
        [${$(`#houseNm`).val()||"창고"}]
      </div>
      <div class="fs-0-8rem fw-500">
        자재 재고현황
      </div>
    </div>
  `);

  $grid03.pqGrid({
    ...gridOption,
    dataModel: { data: data },
    colModel: colModel,
  })
  .pqGrid("refreshDataAndView");
};

// 2-1. 상세 항목 ----------------------------------------------------------------------------------
function fnShow (event, treeId, treeNode)  {

  $.ajax({
    url: `act/showHouse`,
    data: `houseCd=${treeNode.id}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {

      const productPerHouse = data.productPerHouse;
      const resourcePerHouse = data.resourcePerHouse;

      // 배열 합치기
      const houseData = productPerHouse.concat(resourcePerHouse);

      // 창고 초기화
      $(`#houseParentNm`).val(houseData[0].houseParentNm);
      $(`#houseParentCd`).val(houseData[0].houseParentCd);
      $(`#houseCd`).val(houseData[0].houseCd);
      $(`#houseNm`).val(houseData[0].houseNm);
      $(`#houseOrder`).val(houseData[0].houseOrder);

      // fnGetList02 호출
      fnGetList02(productPerHouse);

      // fnGetList03 호출
      fnGetList03(resourcePerHouse);
    },
    error: fnAjaxErrorHandler
  });
};

// 2-2. 노드트리 새로고침 --------------------------------------------------------------------------
function fnRefreshNode (pId, resultCd)  {

  const treeObj = $.fn.zTree.getZTreeObj("grid01");
  const parentNode = treeObj.getNodeByParam("id", pId, null);

  if (!parentNode) {
    return;
  }

  // 부모 노드의 자식 노드만 다시 로드
  treeObj.reAsyncChildNodes(parentNode, "refresh", true);

  // 자식 노드 로드가 완료된 후 콜백 (새 노드에 포커스)
  treeObj.setting.callback.onAsyncSuccess = function  (event, treeId, treeNode)  {
    const resultNode = treeObj.getNodeByParam("id", resultCd, null);
    if (resultNode) {
      treeObj.setting.callback.onClick(event, treeId, resultNode, null);
      treeObj.selectNode(resultNode);
    }
  };
};

// 3-1. 저장 ---------------------------------------------------------------------------------------
function fnSave (YN)  {

  let flagParam = "";

  if (YN == "N") {
    flagParam = "N";
    if (!confirm("해당 창고를 삭제하시겠습니까?")) {
      return;
    }
  }
  else {
  	flagParam = "Y";
    if ($(`#houseNm`).val() == "") {
      alert("창고이름을 입력해 주세요");
      $(`#houseNm`).trigger("focus");
      return;
  }
    if ($(`#houseOrder`).val() == "") {
      alert("창고순서를 입력해 주세요");
      $(`#houseOrder`).trigger("focus");
      return;
    }
  }

  const param = {
    "houseCd": $(`#houseCd`).val() || "0",
    "houseNm": $(`#houseNm`).val() || "",
    "houseParentCd": $(`#houseParentCd`).val() || "0",
    "houseOrder": $(`#houseOrder`).val() || "99",
    "flagYn": flagParam
  };

  $.ajax({
    url: `act/saveHouse`,
    data: JSON.stringify(param),
    type: `POST`,
    dataType: `JSON`,
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      alert(data.result);

      const pIdParam = $(`#houseParentCd`).val();
      const nameParam = $(`#houseNm`).val();

      // 1. 저장인 경우 (트리노드에 포커스)
      if (flagParam === "Y") {
        const treeObj = $.fn.zTree.getZTreeObj("grid01");
        const parentNode = treeObj.getNodeByParam("id", pIdParam, null);

        /** @type {ITreeNode} */
        const newNode = {
          id: data.houseCd,
          pId: pIdParam,
          name: nameParam.toString(),
          isParent: true
        };
        treeObj.addNodes(parentNode, null, newNode);
        fnRefreshNode(pIdParam, null);
      }

      // 2. 삭제인 경우 (트리노드 새로고침)
      else if (flagParam === "N") {
        fnRefreshNode(pIdParam, null);

        // 창고 초기화
        $(`#houseParentCd`).val("0");
        $(`#houseParentNm`).val("");
        $(`#houseCd`).val("0");
        $(`#houseNm`).val("");
        $(`#houseOrder`).val("99");

        // 그리드 초기화
        fnGetList02(null);
        fnGetList03(null);
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 3-2. 하위 창고 추가 -----------------------------------------------------------------------------
function fnAddCat ()  {

  if ($(`#houseCd`).val() == "0" || $(`#houseCd`).val() == "") {
    alert("하위 창고항목을 생성 할 수 없습니다");
    return;
  }

  $(`#houseParentNm`).val($(`#houseNm`).val());
  $(`#houseParentCd`).val($(`#houseCd`).val());
  $(`#houseCd`).val("0");
  $(`#houseNm`).val("");
  $(`#houseOrder`).val("99");
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel ()  {
  if ($(`#houseCd`).val() == "0") {
    alert("삭제할 창고를 선택해 주세요");
    return;
  }
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset ()  {

  // 창고 그리드 초기화
  $.fn.zTree.destroy("grid01");
  fnGetList01("0");

  // 창고 초기화
  $(`#houseParentCd`).val("0");
  $(`#houseParentNm`).val("");
  $(`#houseCd`).val("0");
  $(`#houseNm`).val("");
  $(`#houseOrder`).val("99");
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function ($) {
  const curDate = fnToday();
  $(`#inOutDt`).datepicker(CALENDAR);
  $(`#inOutDt`).val(curDate);

  fnGetList01("0");
  fnGetList02(null);
  fnGetList03(null);
});