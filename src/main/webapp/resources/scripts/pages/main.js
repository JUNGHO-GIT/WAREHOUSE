let TABS = "/";
let TABS_TARGET = "/";
let TABS_LIMIT = 8;
let HEIGHT = window.innerHeight * 0.7;

// 1. 탭 불러오기 --------------------------------------------------------------------------------->
function fnSetTab(tabs) {

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

  $.ajax({
    url: "act/listSysMenu",
    type: "POST",
    dataType: "json",
    data: `config=${pageUrl}`,
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      let obj = {};
      for (var i = 0; i < data.length; i++) {
        obj[data[i].pageUrl] = data[i].pageNm;
      }
      fnTabInit(obj, tabArray);
    },
    error: ajaxErrorHandler
  });
};

// 2. 탭 초기화 --------------------------------------------------------------------------------->
function fnTabInit(obj, tabArray) {

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
      <div id="tabContents${lastPageNo}">
        <iframe
          id="ifr${lastPageNo}"
          src="${lastPageUrl}"
          width="100%"

          border="0"
          frameborder="0"
          loading="lazy"
        >
        </iframe>
      </div>
    `;
    $("#tabContents").append(resultContents);
  }
};

// 3. 탭 불러오기 ------------------------------------------------------------------------------>
function fnAddTabAll(pageNm, pageUrl, pageNo) {

  var resultTab;

  if (TABS.indexOf("/" + pageNo + "/") > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    var tabs = TABS.split("/");
    for (var k = 0; k < tabs.length; k++) {
      if (tabs[k]) {
        $("#tab" + tabs[k]).prop("class", "");
      }
    }

    fnMkTabCd(pageNo, pageUrl, "add");

    // 탭 생성갯수 제한하기
    var tabCnt = TABS.split("/").length - 1;
    if (tabCnt > TABS_LIMIT) {
      var firstTab = TABS.split("/")[1];
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
function fnMkTabCd(pageNo, pageUrl, pageParam) {

  var newTab = pageNo;
  var divTabCd = TABS.split("/");
  var divTabTarget = TABS_TARGET.split("/");
  var tabCnt = divTabCd.length;

  if (tabCnt - 1 > TABS_LIMIT) {
    TABS = "/";
    TABS_TARGET = "/";
    for (var k = 0; k < tabCnt; k++) {
      if (k > 1) {
        TABS += divTabCd[k] + "/";
        TABS_TARGET += divTabTarget[k] + "/";
      }
      else {
        $("#tab" + divTabCd[k]).remove();
      }
    }
  }
  if (pageParam == "add") {
    if (TABS.indexOf("/" + pageNo + "/") < 0) {
      TABS += pageNo + "/";
    }
    if (TABS_TARGET.indexOf("/" + pageUrl + "/") < 0) {
      TABS_TARGET += pageUrl + "/";
    }
  }
  else {
    TABS = TABS.split("/" + pageNo + "/").join("/");
    TABS_TARGET = TABS_TARGET.split("/" + pageUrl + "/").join("/");
    var divTabs = TABS.split("/");
    var tabSize = divTabs.length;
    newTab = divTabs[tabSize - 2];
  }
  return newTab;
};

// 1-2. 탭 추가 ----------------------------------------------------------------------------------->
function fnAddTab(pageNm, pageUrl, pageNo) {

  var resultTab;
  var resultContents;

  if (TABS.indexOf("/" + pageNo + "/") > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    var tabs = TABS.split("/");
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
        <div id="tabContents${pageNo}">
          <iframe
            id="ifr${pageNo}"
            src="${pageUrl}"
            width="100%"

            border="0"
            frameborder="0"
            loading="lazy"
          >
          </iframe>
        </div>
      `;
      $("#tabContents").append(resultContents);
    }
  }
};

// 1-3. 탭 제거 ----------------------------------------------------------------------------------->
function fnRmTab(pageNo, pageUrl) {

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
function fnShowTab(pageNo, pageUrl) {

  var resultContents = $("#tabContents" + pageNo).html();

  if (resultContents == undefined) {
    resultContents = `
      <div id="tabContents${pageNo}">
        <iframe
          id="ifr${pageNo}"
          src="${pageUrl}"
          width="100%"

          border="0"
          frameborder="0"
          loading="lazy"
        >
        </iframe>
      </div>
    `;
    $("#tabContents").append(resultContents );
  }

  var tabs = TABS.split("/");

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
function fnIfrRefresh() {

  var tabs = TABS.split("/");
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
function fnTabOrder() {

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
function fnCloseAllTab() {

  var tabs = TABS.split("/");
  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $("#tab" + tabs[k]).remove();
      $("#tabContents" + tabs[k]).remove();
    }
  }
  TABS = "/";
  TABS_TARGET = "/";

  fnIfrRefresh();
};

// 3-1. 탭 sort ----------------------------------------------------------------------------------->
function fnTabSortAndDrag() {
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
function fnSaveUserConfigTab() {

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
function fnShowVersion() {
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
function fnLogOut() {
  var encryptedItem = {"loginSession": "false"};
  var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
  localStorage.setItem("loginSession", encryptedValue);
  fnGoPage("reLogin");
};

// 0. 세션 체크 ----------------------------------------------------------------------------------->
function fnCheckSession() {
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
function fnConsoleTabInfo(rmTab) {
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
  console.log("TABS: " + TABS);
};

// 0. 화면 로딩시 실행 ---------------------------------------------------------------------------->
jQuery(function($) {
  fnShowVersion();
  fnCheckSession();
  fnTabSortAndDrag();
});
