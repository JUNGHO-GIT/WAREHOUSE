var G_myTabs = "";
var G_myTabTarget = "";
var G_height = parseInt($(window).height(), 10) - 60;
var G_tabCnt = 10;

// ------------------------------------------------------------------------------------------------>
var fnSetTab = function (userConfigTabs) {

  if (!userConfigTabs) {
    return;
  }

  var tabArray = userConfigTabs.split(",");

  var tabUrls = tabArray.map(function(tab) {
    return tab.split("@")[1];
  }).join(",");

  var obj = {};
  $.ajax({
    url: "act/listSysMenu",
    data: `config=${tabUrls}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function (xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        obj[data[i].pageUrl] = data[i].pageNm;
      }
      fnTabInit(obj, tabArray);
    },
    error: ajaxErrorHandler,
  });
};

// ------------------------------------------------------------------------------------------------>
var fnTabInit = function (obj, tabArray) {

  var lastTabUrl;
  var lastTabCd;
  var resultContents;

  tabArray.forEach(function(tab) {
    var [tabCd, tabUrl] = tab.split("@");
    if (obj[tabUrl]) {
      fnAddTabAll(obj[tabUrl], tabUrl, tabCd);
      lastTabUrl = tabUrl;
      lastTabCd = tabCd;
    }
  });

  if (lastTabCd) {
    resultContents = `
    <div class="frame_container" id="tabContents${lastTabCd}">
      <iframe
        id="ifr${lastTabCd}"
        src="${lastTabUrl}?h=${G_height}"
        width="100%"
        height="${G_height}px"
        border="0"
        frameborder="0"
        scrolling="auto"
        loading="lazy"
      >
      </iframe>
    </div>
    `;
    $("#tabContents").append(resultContents);
  }
};

// ------------------------------------------------------------------------------------------------>
var fnAddTabAll = function (tabText, page, pageNo) {
  var resultTab;

  if (G_myTabs.indexOf("/" + pageNo + "/") > -1) {
    fnShowTab(pageNo, page);
  }
  else {
    // 기존 탭의 클래스 및 표시 상태 업데이트
    G_myTabs.split("/").forEach(function(tab) {
      if (tab) {
        $("#tab" + tab).prop("class", "");
        $("#tabContents" + tab).css("display", "none");
      }
    });

    // 새 탭 추가 전 탭 개수 재계산
    var tabCnt = G_myTabs.split("/").filter(function(tab) {
      return tab;
    }).length;

    // 탭 개수 제한을 초과한 경우, 가장 오래된 탭 제거
    if (tabCnt >= G_tabCnt) {
      var firstTab = G_myTabs.split("/").filter(function(tab) {
        return tab;
      })[0];
      fnRmTab(firstTab, "");
    }

    // 새 탭 DOM 요소 추가
    resultTab = `
    <li class="active" id="tab${pageNo}" page="${page}">
      <a class="pointer" onClick="fnShowTab('${pageNo}','${page}')">
        ${tabText}
      </a>
      <span>
        <i class="fa fa-close fs-15 pointer" onClick="fnRmTab('${pageNo}','${page}')"></i>
      </span>
    </li>
    `;
    $("#tabs").append(resultTab);

    fnMkTabCd(pageNo, page, "add");
  }
};

// ------------------------------------------------------------------------------------------------>
var fnMkTabCd = function (pageNo, page, pageAttr) {

  var tabArray = G_myTabs.split("/").filter(function(tab) {
    return tab;
  });

  var targetArray = G_myTabTarget.split("/").filter(function(target) {
    return target;
  });

  if (pageAttr === "add") {
    if (!tabArray.includes(pageNo.toString())) {
      tabArray.push(pageNo);
    }
    if (!targetArray.includes(page)) {
      targetArray.push(page);
    }
  }
  else {
    var tabIndex = tabArray.indexOf(pageNo.toString());
    if (tabIndex > -1) {
      tabArray.splice(tabIndex, 1);
    }
    var targetIndex = targetArray.indexOf(page);
    if (targetIndex > -1) {
      targetArray.splice(targetIndex, 1);
    }
  }

  G_myTabs = tabArray.join("/");
  G_myTabTarget = targetArray.join("/");
};

// ------------------------------------------------------------------------------------------------>
var fnAddTab = function (tabText, page, pageNo) {
  var resultTab;
  var resultContents;
  var tabArray = G_myTabs.split("/").filter(function(tab) {
    return tab;
  });

  // 탭이 이미 존재하는 경우, 해당 탭을 표시
  if (tabArray.includes(pageNo.toString())) {
    fnShowTab(pageNo, page);
  }
  else {
    // 탭 개수 제한 확인
    if (tabArray.length >= G_tabCnt) {
      // 가장 오래된 탭 제거
      var firstTab = tabArray[0];
      fnRmTab(firstTab, "");
    }

    // 기존 탭의 클래스 및 표시 상태 업데이트
    tabArray.forEach(function(tab) {
      $("#tab" + tab).prop("class", "");
      $("#tabContents" + tab).css("display", "none");
    });

    // 새 탭 추가
    fnMkTabCd(pageNo, page, "add");

    resultTab = `
    <li class="active" id="tab${pageNo}" page="${page}">
      <a class="pointer" onClick="fnShowTab('${pageNo}','${page}')">
        ${tabText}
      </a>
      <span>
        <i class="fa fa-close fs-15 pointer" onClick="fnRmTab('${pageNo}','${page}')"></i>
      </span>
    </li>
    `;
    $("#tabs").append(resultTab);

    // 탭 컨텐츠 추가 또는 표시
    if ($("#tabContents" + pageNo).html() === undefined) {
      resultContents = `
      <div class="frame_container" id="tabContents${pageNo}">
        <iframe
          id="ifr${pageNo}"
          src="${page}?h=${G_height}"
          width="100%"
          height="${G_height}px"
          border="0"
          frameborder="0"
          scrolling="auto"
          loading="lazy"
        >
        </iframe>
      </div>
      `;
      $("#tabContents").append(resultContents);
    }
    else {
      $("#tabContents" + pageNo).css("display", "");
    }
  }
};

// ------------------------------------------------------------------------------------------------>
var fnRmTab = function (pageNo, page) {

  var $tab = $("#tab" + pageNo);
  var posit = "";

  if ($tab.hasClass("active")) {
    posit = "last";
  }

  $tab.remove();
  $("#tabContents" + pageNo).remove();

  var lastTab = fnMkTabCd(pageNo, page, "rm");

  if (posit === "last") {
    $("#tab" + lastTab).addClass("active");
    $("#tabContents" + lastTab).css("display", "");
  }

  // 로그 찍기
  fnConsoleTabInfo(pageNo);
};

// ------------------------------------------------------------------------------------------------>
var fnShowTab = function (pageNo, page) {
  var resultContents = $("#tabContents" + pageNo).html();

  if (resultContents === undefined) {
    resultContents = `
    <div class="frame_container" id="tabContents${pageNo}">
      <iframe
        id="ifr${pageNo}"
        src="${page}?h=${G_height}"
        width="100%"
        height="${G_height}px"
        border="0"
        frameborder="0"
        scrolling="auto"
        loading="lazy"
      >
      </iframe>
    </div>
    `;
    $("#tabContents").append(resultContents);
  }

  G_myTabs.split("/").forEach(function(tab) {
    if (tab) {
      $("#tab" + tab).prop("class", "");
      $("#tab" + tab).css("z-index", "3");
      $("#tabContents" + tab).css("display", "none");
    }
  });

  $("#tab" + pageNo).prop("class", "active");
  $("#tab" + pageNo).css("z-index", "10");
  $("#tabContents" + pageNo).css("display", "");
};

// 3. 탭 정렬하기 --------------------------------------------------------------------------------->
var fnTabOrder = function () {
  var tabs = $("#tabs li").map(function() {
    var tabCd = $(this).attr("id").replace("tab", "");
    var tabPage = $(this).attr("page");
    return tabCd + "@" + tabPage;
  })
  .get()
  .join(",");

  return tabs;
};

// 3-1. 탭 drag 가능하게 하기 --------------------------------------------------------------------->
var fnTabDrag = function () {
  $("#tabs").sortable({
    direction: 'horizontal',
	  disabled: false,
    sort: true,
    delay: 0,
    store: null,
    animation: 150,
    easing: "cubic-bezier(1, 0, 0, 1)",
  });

  $("#tabs").disableSelection();
};

// 4. 탭 새로고침 --------------------------------------------------------------------------------->
var fnIfrRefresh = function () {

  var tabs = G_myTabs.split("/");
  var curTab = "";

  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      if ($("#tab" + tabs[k]).prop("class") === "active") {
        curTab = tabs[k];
      }
    }
  }
  if (curTab) {
    $("#ifr" + curTab).attr("src", $("#ifr" + curTab).attr("src"));
  }
};

// 4. 탭 전부 닫기 -------------------------------------------------------------------------------->
var fnCloseAllTab = function () {
  var tabs = G_myTabs.split("/");
  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $("#tab" + tabs[k]).remove();
      $("#tabContents" + tabs[k]).remove();
    }
  }
  // 전역 변수 초기화
  G_myTabs = "";
  G_myTabTarget = "";
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

  // localStorage 이벤트 감지
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

  // ID가 'tab'으로 시작하는 모든 li 요소 찾기
  var tabs = document.querySelectorAll("li[id^='tab']");

  // 정규표현식을 사용하여 ID가 'tab' 뒤에 숫자가 오는 형태인지 확인
  var tabIdRegex = /^tab\d+$/;

  // 조건에 맞는 탭의 ID 추출
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

// 0. 에러처리 ------------------------------------------------------------------------------------>
var ajaxErrorHandler = function (request, status, error) {
  if (request.status === 477) {
    alert("세션이 종료 되었습니다.");
    fnGoPage("reLogin");
  }
  else {
    alert(`code: ${request.status}\n message: ${request.responseText}\n error: ${error}`);
  }
};

// 0. 화면 로딩시 실행 ---------------------------------------------------------------------------->
$(document).ready(function () {
  fnShowVersion();
  fnCheckSession();
  fnTabDrag();
});