// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
var fnGetList01 = function () {

  var gridCd = "grid01";
  var showYear = $("#findYear").val();

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "reportStock.xlsx",
    title: "   (제품) 연간 재고 현황",
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

  obj.colModel = [
    {dataIndx:"prodNm", title:"제품명", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:200
    },
    {dataIndx:"01", title: showYear + "년 1월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"02", title: showYear + "년 2월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"03", title: showYear + "년 3월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"04", title: showYear + "년 4월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"05", title: showYear + "년 5월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"06", title: showYear + "년 6월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"07", title: showYear + "년 7월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"08", title: showYear + "년 8월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"09", title: showYear + "년 9월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"10", title: showYear + "년 10월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"11", title: showYear + "년 11월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"12", title: showYear + "년 12월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];

  $.ajax({
    url: "act/listReportProdStock",
    data: `findYear=${$("#findYear").val()}`,
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
  var showYear = $("#findYear").val();

  var obj = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "reportStock.xlsx",
    title: "   (자재) 연간 재고 현황",
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

  obj.colModel = [
    {dataIndx:"resrcNm", title:"제품명", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]},
      minWidth:200
    },
    {dataIndx:"01", title: showYear + "년 1월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"02", title: showYear + "년 2월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"03", title: showYear + "년 3월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"04", title: showYear + "년 4월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"05", title: showYear + "년 5월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"06", title: showYear + "년 6월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"07", title: showYear + "년 7월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"08", title: showYear + "년 8월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"09", title: showYear + "년 9월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"10", title: showYear + "년 10월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"11", title: showYear + "년 11월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"12", title: showYear + "년 12월", dataType:"string", align:"center", format:"#,###",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];
  $.ajax({
    url: "act/listReportResrcStock",
    data: `findYear=${$("#findYear").val()}`,
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

// -------------------------------------------------------------------------------------------------
var fnSetYears = function (selectId) {
  var year = new Date().getFullYear();
  var select = $("#" + selectId);
  select.empty();
  select.append(`<option value=${year}>${year}</option>`);
  for (var i = year - 1; i >= 2010; i--) {
    select.append($("<option>", {
      value: i,
      text: i
    }));
  }
};

// 0. 엔터, 클릭, 체인지 이벤트 발생시에만 조회 ----------------------------------------------------
var fnPressGet01 = function (event) {
  if (
    (event.key === "Enter") ||
    (event.type === "click") ||
    (event.type === "change")
  ) {
    event.preventDefault();
    fnGetList01();
    fnGetList02();
  }
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {

	// 2010년부터 올해까지
  fnSetYears("findYear");

  fnGetList01();
  fnGetList02();
});