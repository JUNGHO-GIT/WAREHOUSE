// 1. 그리드 설정 및 리스트 호출 -------------------------------------------------------------------
function fnGetList01 () {

  const gridCd = "grid01";

  /** @type {pq.gridT.options} **/
  const gridOption = {
    numberCell:{show:true, resizable:false, width:30},
    xlsNm: "dayOff.xlsx",
    title: "   휴무일 관리",
    width: "flex",
    height: "flex",
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
    fnShow(ui.rowData.offSeq);
  };

  obj.colModel = [
    {dataIndx:"offSeq", title:"offSeq", dataType:"string", align:"center",
      hidden: true,
    },
    {dataIndx:"offDate", title:"날짜", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"offDay", title:"요일", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"userNm", title:"사용자 이름", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
    {dataIndx:"restCnt", title:"잔여휴무일", dataType:"string", align:"center",
      filter:{type:"textbox", condition:"contain", listeners:["keyup"]}
    },
  ];

	// ajax 호출
  $.ajax({
    url: "act/listDayOff",
    data: `findUserNm=${$("#findUserNm").val()}`,
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

// 2. 상세 항목 ------------------------------------------------------------------------------------
function fnShow(offSeq) {

  fnReset();

  $.ajax({
    url: "act/showDayOff",
    data: `offSeq=${offSeq}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      $("#offCntDay").val(data.offDate);
      $("#userID").val(data.userID);
      $("#offSeq").val(data.offSeq);
      $("#userID").prop("disabled", true);
      $("#count").val("1");
    },
    error: ajaxErrorHandler
  });
};

// 3. 저장 -----------------------------------------------------------------------------------------
function fnSave() {
  var userID = $("#userID option:selected").val() || "";
  var flagYN = $("#flagYN").val() || "Y";
  var offSeq = $("#offSeq").val() || 0;
  var offDates = "";

  // 휴가일 증가값
  var countPlus = 0;

  // 하루 선택값
  var offDay = $("#offDay").val();

  // 지정휴무일수
  var count = $("#count").val();

  // for문에서 증가를 위한 값
  var cnt = 0;
  var tempDate = new Date(offDay);

  for (var i = 1;i <= count; i++) {
    var chkDate = new Date(offDay);
    chkDate.setDate(tempDate.getDate() + cnt);
    var tempDay = chkDate.getDay();

    if (tempDay == 0 || tempDay == 6) {
      ++count;
    }
    else {
      // 평일
      if (offDates) {
        offDates += "/";
      }
      offDates += dateFormat(chkDate);
    }
    cnt++;
  }

  if (userID == "") {
    alert("이름을 선택 하세요 ! ");
    $("#userID").on("focus", function () {});
    return;
  }
  if (count == "") {
    alert("휴무일수를 입력하세요 ! ");
    $("#count").on("focus", function () {});
    return;
  }

  var param = {
    "flagYN": flagYN,
    "userID": userID,
    "offSeq": offSeq
  };

  $.ajax({
    url:"act/saveDayOff",
    data: JSON.stringify(param),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      if (data.result == "저장되었습니다.") {
        alert(data.result);
        fnGoPage("dayOff");
      }
      else {
        alert(data.result);
      }
    },
    error: ajaxErrorHandler
  });
};

// 4. 삭제 -----------------------------------------------------------------------------------------
function fnDel() {
  fnSave("N");
};

// 5-1. 초기화 -------------------------------------------------------------------------------------
function fnReset() {
  $("#userID").prop("disabled", false);
  $("#offCntDay").prop("disabled", false);
  $("#count").prop("readonly", false);
  $("#offCntDay").val("");
  $("#count").val("");
  $("#userID").val("");
};

// -------------------------------------------------------------------------------------------------
var dateFormat = function (date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;

  return date.getFullYear() + "-" + month + "-" + day;
}

// -------------------------------------------------------------------------------------------------
function fnCheckUserID() {

  if ($("#userID").val() == "") {
    alert("아이디를 바르게 입력해 주세요");
    $("#userID").on("focus", function () {});
    return;
  }

  $.ajax({
    url: "act/checkUserID",
    data: `userID=${$("#userID").val()}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      if (data.cnt == 0) {
        $("#userIDCheck").val("Y");
        alert("사용 가능한 아이디 입니다.");
      }
      else {
        alert("이미 사용중인 아이디 입니다.\n다른 아이디를 입력해 주세요.");
        $("#userID").on("focus", function () {});
        $("#userIDCheck").val("N");
      }
    },
    error: ajaxErrorHandler
  });
};

// -------------------------------------------------------------------------------------------------
function fnGetUserInfo() {

  $("#userID").html("<option value=''>==사용자==</option>");

  $.ajax({
    url: "act/getUser",
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      if (data == null || data.length == 0) {
        $("#userID").html("<option value=''>결과가 존재하지 않습니다.</option>");
      }
      for (var k = 0; k < data.length; k++) {
        var option = "<option value=" + data[k].userID + ">" + data[k].userNm + "</option>";
        $("#userID").append(option);
      }
    },
    error: ajaxErrorHandler
  });
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
function fnPressGet01(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fnReset();
    fnGetList01();
  }
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  var curDate = fnToday();

  $("#offDay").datepicker(G_calendar);
  $("#offDay").val(curDate);

  fnGetList01();
  fnGetUserInfo();
});
