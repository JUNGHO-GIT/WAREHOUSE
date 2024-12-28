// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const $grid01 = $(`#grid01`);

  const gridOption = {
    xlsNm: "reportStock.xlsx",
    title: "   [제품] 연간 재고 현황",
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
      minWidth:200
    },
    {
      title:"1월", dataIndx:"01", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"2월", dataIndx:"02", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"3월", dataIndx:"03", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"4월", dataIndx:"04", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"5월", dataIndx:"05", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"6월", dataIndx:"06", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"7월", dataIndx:"07", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"8월", dataIndx:"08", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"9월", dataIndx:"09", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"10월", dataIndx:"10", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"11월", dataIndx:"11", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"12월", dataIndx:"12", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
  ];

  $.ajax({
    url: `act/listReportProdStock`,
    data: `findYear=${$(`#findYear`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("[제품] 연간 재고 현황", data);
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

// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList02() {

  const $grid02 = $(`#grid02`);

  const gridOption = {
    xlsNm: "reportStock.xlsx",
    title: "   [자재] 연간 재고 현황",
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
  };
  const colModel = [
    {
      title:"자재명", dataIndx:"resrcNm", dataType:"string", align:"center",
      minWidth:200
    },
    {
      title:"1월", dataIndx:"01", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"2월", dataIndx:"02", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"3월", dataIndx:"03", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"4월", dataIndx:"04", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"5월", dataIndx:"05", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"6월", dataIndx:"06", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"7월", dataIndx:"07", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"8월", dataIndx:"08", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"9월", dataIndx:"09", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"10월", dataIndx:"10", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"11월", dataIndx:"11", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
    {
      title:"12월", dataIndx:"12", dataType:"string", align:"center", format:"#,###",
      minWidth:100
    },
  ];

  $.ajax({
    url: `act/listReportResrcStock`,
    data: `findYear=${$(`#findYear`).val()}`,
    type: `POST`,
    dataType: `JSON`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      gridOption.title = fnUpdateTitle("[자재] 연간 재고 현황", data);
      $grid02.pqGrid({
        ...gridOption,
        dataModel: { data: data },
        colModel: colModel,
      })
      .pqGrid("refreshDataAndView");
    },
    error: fnAjaxErrorHandler
  });
};

// -------------------------------------------------------------------------------------------------
function fnSetYears(selectId) {
  const year = new Date().getFullYear();
  const select = $(`#${selectId}`);

  select.empty();
  select.append(`<option value=${year}>${year}</option>`);

  for (let i = year - 1; i >= 2010; i--) {
    select.append($("<option>", {
      value: i,
      text: i
    }));
  }
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {

	// 2010년부터 올해까지
  fnSetYears("findYear");

  fnGetList01();
  fnGetList02();
});