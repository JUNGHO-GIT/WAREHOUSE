var G_myTabs = "/";
var G_myTabTarget = "/";
var G_height = $(window).height() - 60;
var G_tabCnt = 8;

// 1. 탭 불러오기 --------------------------------------------------------------------------------->
var fnSetTab = function (tabs) {
  if (!tabs) {
    return;
  }
  var tabArray = tabs.split(",");

  var pageUrl = "";
  for (var i = 0; i < tabArray.length; i++) {
    var tabSplit = tabArray[i].split("@");
    if (pageUrl) {
      pageUrl += ",";
    }
    pageUrl += tabSplit[1];
  }
  var param = "config=" + pageUrl;
  var obj = {};
  $.ajax({
    url: "act/listSysMenu",
    type: "POST",
    dataType: "json",
    data: param,
    // ajax 호출을 header에 기록
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        obj[data[i].pageUrl] = data[i].pageNm;
      }
      fnTabInit(obj, tabArray);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다.");
        fnGoPage("/reLogin");
      }
      else {
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    },
  });
};

// 2. 탭 초기화 --------------------------------------------------------------------------------->
var fnTabInit = function (obj, tabArray) {

  var lastPageUrl = "";
  var lastPageNo = "";
  var resultContents;

  for (var i = 0; i < tabArray.length; i++) {
    var tabSplit = tabArray[i].split("@");
    var pageUrl = "";
    for (var key in obj) {
      var pageNm = obj[key];
      var pageUrl = key;
      if (pageUrl == tabSplit[1]) {
        fnAddTabAll(pageNm, pageUrl, tabSplit[0]);
        lastPageUrl = pageUrl;
        lastPageNo = tabSplit[0];
      }
    }
  }
  if (lastPageNo) {
    resultContents = `
      <div class="frame_container" id="tabContents${lastPageNo}">
        <iframe
          id="ifr${lastPageNo}"
          src="${lastPageUrl}"
          width="100%"
          height="${G_height}px"
          border="0"
          frameborder="0">
        </iframe>
      </div>
    `;
    $("#tabContents").append(resultContents);
  }
};

// 3. 탭 불러오기 ------------------------------------------------------------------------------>
var fnAddTabAll = function (pageNm, pageUrl, pageNo) {

  var resultTab;

  if (G_myTabs.indexOf("/" + pageNo + "/") > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    var tabs = G_myTabs.split("/");
    for (var k = 0; k < tabs.length; k++) {
      if (tabs[k]) {
        $("#tab" + tabs[k]).prop("class", "");
      }
    }

    fnMkTabCd(pageNo, pageUrl, "add");

    // 탭 생성갯수 제한하기
    var tabCnt = G_myTabs.split("/").length - 1;
    if (tabCnt > G_tabCnt) {
      var firstTab = G_myTabs.split("/")[1];
      fnRmTab(firstTab, "");
    }
    else {
      resultTab = (/* javascript */`
        <li class="active" id="tab${pageNo}" pageUrl="${pageUrl}">
          <div
            class="border-1 shadow-1 p-15px pointer"
            onclick="fnShowTab('${pageNo}', '${pageUrl}')"
            style="display: flex; justify-content: center; align-items: center;"
          >
          <div class="fs-0-8rem fw-500 navy pointer-navy">
            ${pageNm}
          </div>
          <i class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
            onclick="fnRmTab('${pageNo}', '${pageUrl}')"
          >
          </i>
          </div>
        </li>
      `);
      $("#tabs").append(resultTab);
    }
  }
};

// 4. 탭 코드 ----------------------------------------------------------------------------------->
var fnMkTabCd = function (pageNo, pageUrl, pageParam) {

  var newTab = pageNo;
  var divTabCd = G_myTabs.split("/");
  var divTabTarget = G_myTabTarget.split("/");
  var tabCnt = divTabCd.length;

  if (tabCnt - 1 > G_tabCnt) {
    G_myTabs = "/";
    G_myTabTarget = "/";
    for (var k = 0; k < tabCnt; k++) {
      if (k > 1) {
        G_myTabs += divTabCd[k] + "/";
        G_myTabTarget += divTabTarget[k] + "/";
      }
      else {
        $("#tab" + divTabCd[k]).remove();
      }
    }
  }
  if (pageParam == "add") {
    if (G_myTabs.indexOf("/" + pageNo + "/") < 0) {
      G_myTabs += pageNo + "/";
    }
    if (G_myTabTarget.indexOf("/" + pageUrl + "/") < 0) {
      G_myTabTarget += pageUrl + "/";
    }
  }
  else {
    G_myTabs = G_myTabs.split("/" + pageNo + "/").join("/");
    G_myTabTarget = G_myTabTarget.split("/" + pageUrl + "/").join("/");
    var divTabs = G_myTabs.split("/");
    var tabSize = divTabs.length;
    newTab = divTabs[tabSize - 2];
  }
  return newTab;
};

// 1-2. 탭 추가 ----------------------------------------------------------------------------------->
var fnAddTab = function (pageNm, pageUrl, pageNo) {

  var resultTab;
  var resultContents;

  if (G_myTabs.indexOf("/" + pageNo + "/") > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    var tabs = G_myTabs.split("/");
    for (var k = 0; k < tabs.length; k++) {
      if (tabs[k]) {
        $("#tab" + tabs[k]).prop("class", "");
        $("#tabContents" + tabs[k]).css("display", "none");
      }
    }
    fnMkTabCd(pageNo, pageUrl, "add");

    // 탭추가
    resultTab = (/* javascript */`
      <li class="active" id="tab${pageNo}" pageUrl="${pageUrl}">
        <div
          class="border-1 shadow-1 p-15px pointer"
          onclick="fnShowTab('${pageNo}', '${pageUrl}')"
          style="display: flex; justify-content: center; align-items: center;"
        >
          <div class="fs-0-8rem fw-500 navy pointer-navy">
            ${pageNm}
          </div>
          <i class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
            onclick="fnRmTab('${pageNo}', '${pageUrl}')"
          >
          </i>
        </div>
      </li>
    `);
    $("#tabs").append(resultTab);

    if ($("#tabContents" + pageNo).html() == undefined) {
      resultContents = `
        <div class="frame_container" id="tabContents${pageNo}">
          <iframe
            id="ifr${pageNo}"
            src="${pageUrl}"
            width="100%"
            height="${G_height}px"
            border="0"
            frameborder="0">
          </iframe>
        </div>
      `;
      $("#tabContents").append(resultContents);
    }
  }
};

// 1-3. 탭 제거 ----------------------------------------------------------------------------------->
var fnRmTab = function (pageNo, pageUrl) {

  var posit = "";

  if ($("#tab" + pageNo).prop("class") == "active") {
    posit = "last";
  }
  $("#tab" + pageNo).remove();
  $("#tabContents" + pageNo).remove();

  var lastTab = fnMkTabCd(pageNo, pageUrl, "rm");

  if (posit == "last") {
    $("#tab" + lastTab).prop("class", "active");
    $("#tabContents" + lastTab).css("display", "");
  }
};

// 1-4. 탭 활성화 --------------------------------------------------------------------------------->
var fnShowTab = function (pageNo, pageUrl) {

  var resultContents = $("#tabContents" + pageNo).html();

  if (resultContents == undefined) {
    resultContents = `
      <div class="frame_container" id="tabContents${pageNo}">
        <iframe
          id="ifr${pageNo}"
          src="${pageUrl}"
          border="0"
          frameborder="0"
          width="100%"
          height="${G_height}px">
        </iframe>
      </div>
    `;
    $("#tabContents").append(resultContents );
  }

  var tabs = G_myTabs.split("/");

  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $("#tab" + tabs[k]).prop("class", "");
      $("#tab" + tabs[k]).css("z-index", "3");
      $("#tabContents" + tabs[k]).css("display", "none");
    }
  }
  $("#tab" + pageNo).prop("class", "active");
  $("#tab" + pageNo).css("z-index", "10");
  $("#tabContents" + pageNo).css("display", "");
};

// 1-5. 새로고침 ---------------------------------------------------------------------------------->
var fnIfrRefresh = function () {

  var tabs = G_myTabs.split("/");
  var curTab = "";
  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      if ($("#tab" + tabs[k]).prop("class") == "active") {
        curTab = tabs[k];
      }
    }
  }
  if (curTab) {
    $("#ifr" + curTab).attr("src", $("#ifr" + curTab).attr("src"));
  }
};

// 1-6. 탭 순서 저장 ------------------------------------------------------------------------------>
var fnTabOrder = function () {

  var tabs = "";
  for (var i = 0; i < $("#tabs li").length; i++) {
    var tabCd = $("#tabs li").eq(i).attr("id").split("tab").join("");
    var tabPage = $("#tabs li").eq(i).attr("pageUrl");
    if (tabs) {
      tabs += ",";
    }
    tabs += tabCd + "@" + tabPage;
  }
  return tabs;
};

// 1-10. 탭 전부 닫기 ----------------------------------------------------------------------------->
var fnCloseAllTab = function () {

  var tabs = G_myTabs.split("/");
  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $("#tab" + tabs[k]).remove();
      $("#tabContents" + tabs[k]).remove();
    }
  }
  G_myTabs = "/";
  G_myTabTarget = "/";

  fnIfrRefresh();
};

// 3-1. 탭 sort ----------------------------------------------------------------------------------->
var fnTabSortAndDrag = function () {
  $(`#tabs`).sortable({
    direction: 'horizontal',
	  disabled: false,
    // @ts-ignore
    sort: true,
    delay: 0,
    store: null,
    animation: 150,
    easing: "cubic-bezier(1, 0, 0, 1)",
  });

  $(`#tabs`).disableSelection();
};

// 0. 탭 순서 저장 -------------------------------------------------------------------------------->
var fnSaveUserConfigTab = function () {

  var tabs = fnTabOrder();
  var configSeq = $("#configSeq").val();
  var pageNm = "tabs";
  var userID = $("#userConfigID").val();
  var flagYN = "Y";

  var param = {
    "configSeq": configSeq ||"0",
    "userID": userID,
    "pageNm": pageNm,
    "gridCd": "",
    "config": tabs,
    "flagYN": flagYN,
  };

  $.ajax({
    url: "act/saveUserConfigTab",
    data: JSON.stringify(param),
    type: "POST",
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      alert(data.result);
    },
    error: ajaxErrorHandler
  });
};

// 0. 버전정보 표시 ------------------------------------------------------------------------------->
var fnShowVersion = function () {
  $.ajax({
    type: "GET",
    url: "showVersion",
    dataType: "JSON",
    success: function (data) {
      $("#showVersion").html(data);
      $("#showVersion").css("color", "currentColor");
      $("#showVersion").css("font-size", "17px");
      $("#showVersion").css("font-weight", "700px");
      $("#showVersion").css("text-align", "center");
    },
    error: ajaxErrorHandler
  });
};

// 0. 로그아웃 ------------------------------------------------------------------------------------>
var fnLogOut = function () {
  var encryptedItem = {"loginSession": "false"};
  var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
  localStorage.setItem("loginSession", encryptedValue);
  fnGoPage("reLogin");
};

// 0. 세션 체크 ----------------------------------------------------------------------------------->
var fnCheckSession = function () {
  window.addEventListener("storage", function (e) {
    if (e.key === "loginSession") {
      var decryptedItem = localStorage.getItem("loginSession");
      var decryptedValue = CryptoJS.AES.decrypt(decryptedItem, "loginSession");
      var decryptedObj = JSON.parse(decryptedValue.toString(CryptoJS.enc.Utf8));
      if (decryptedObj.loginSession == "false") {
        fnGoPage("reLogin");
      }
    }
  });
};

// 0. 현재 열려있는 탭 정보 console에 표시 -------------------------------------------------------->
var fnConsoleTabInfo = function (rmTab) {
  var tabs = document.querySelectorAll("li[id^='tab']");
  var tabIdRegex = /^tab\d+$/;
  var info = Array.from(tabs).map(function(tab) {
    return tabIdRegex.test(tab.id) ? tab.id : '';
  })
  .filter(function(id) {
    return id !== '';
  })
  .join(', ');

  // 추출된 정보를 console에 표시
  console.log("닫기버튼을 누른 탭: " + rmTab);
  console.log("현재 열려있는 탭 갯수: " + info.split(",").length);
  console.log("현재 열려있는 탭: " + info);
  console.log("G_myTabs: " + G_myTabs);
};

// 0. 화면 로딩시 실행 ---------------------------------------------------------------------------->
jQuery(function($) {
  fnShowVersion();
  fnCheckSession();
  fnTabSortAndDrag();
});
