let TABS = "/";
let TABS_TARGET = "/";
let TABS_LIMIT = 8;
let HEIGHT = window.innerHeight * 0.9;

// 0. 탭 코드 ------------------------------------------------------------------------------------
function fnMkTabCd(pageNo, pageUrl, pageParam) {

  let newTab = pageNo;
  let divTabCd = TABS.split("/");
  let divTabTarget = TABS_TARGET.split("/");
  let tabCnt = divTabCd.length;

  if (tabCnt - 1 > TABS_LIMIT) {
    TABS = "/";
    TABS_TARGET = "/";
    for (let k = 0; k < tabCnt; k++) {
      if (k > 1) {
        TABS += `${divTabCd[k]}/`;
        TABS_TARGET += `${divTabTarget[k]}/`;
      }
      else {
        $(`#tab${divTabCd[k]}`).remove();
      }
    }
  }
  if (pageParam == "add") {
    if (TABS.indexOf(`/${pageNo}/`) < 0) {
      TABS += `${pageNo}/`;
    }
    if (TABS_TARGET.indexOf(`/${pageUrl}/`) < 0) {
      TABS_TARGET += `${pageUrl}/`;
    }
  }
  else {
    TABS = TABS.split(`/${pageNo}/`).join("/");
    TABS_TARGET = TABS_TARGET.split(`/${pageUrl}/`).join("/");
    const divTabs = TABS.split("/");
    const tabSize = divTabs.length;
    newTab = divTabs[tabSize - 2];
  }
  return newTab;
};

// 1. 탭 불러오기 ----------------------------------------------------------------------------------
function fnSetTab(tabs) {

  if (!tabs) {
    return;
  }

  let pageUrl = "";
  const tabArray = tabs.split(",");
  for (let i = 0; i < tabArray.length; i++) {
    const tabSplit = tabArray[i].split("@");
    if (pageUrl) {
      pageUrl += ",";
    }
    pageUrl += tabSplit[1];
  }

  $.ajax({
    url: "act/listSysMenu",
    type: "POST",
    dataType:"json",
    data: `config=${pageUrl}`,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[data[i].pageUrl] = data[i].pageNm;
      }
      fnTabInit(obj, tabArray);
    },
    error: ajaxErrorHandler
  });
};

// 2. 탭 초기화 ----------------------------------------------------------------------------------
function fnTabInit(obj, tabArray) {

  const lastPage = {
    url: "",
    no: "",
  };

  for (var i = 0; i < tabArray.length; i++) {
    let tabSplit = tabArray[i].split("@");
    let pageUrl = "";
    let pageNm = "";
    for (var key in obj) {
      pageNm = obj[key];
      pageUrl = key;
      if (pageUrl == tabSplit[1]) {
        fnAddTabAll(pageNm, pageUrl, tabSplit[0]);
        lastPage.url = pageUrl;
        lastPage.no = tabSplit[0];
      }
    }
  }

  if (lastPage.no) {
    const resultContents = (/* javascript */`
      <div id="tabContents${lastPage.no}">
        <iframe
          id="ifr${lastPage.no}"
          src="${lastPage.url}"
          width="100%"
          height="${HEIGHT}px"
          border="0"
          frameborder="0"
          loading="lazy"
        >
        </iframe>
      </div>
    `);
    $(`#tabContents`).append(resultContents);
  }
};

// 3. 탭 불러오기 -------------------------------------------------------------------------------
function fnAddTabAll(pageNm, pageUrl, pageNo) {

  if (TABS.indexOf(`/${pageNo}/`) > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    const tabs = TABS.split("/");
    for (let k = 0; k < tabs.length; k++) {
      if (tabs[k]) {
        $(`#tab${tabs[k]}`).prop("class", "");
      }
    }
    fnMkTabCd(pageNo, pageUrl, "add");

    const tabCnt = TABS.split("/").length - 1;
    if (tabCnt > TABS_LIMIT) {
      const firstTab = TABS.split("/")[1];
      fnRmTab(firstTab, "");
    }
    else {
      const resultTab = (/* javascript */`
        <li class="active tabEl" id="tab${pageNo}" pageUrl="${pageUrl}">
          <div
            class="border-1 shadow-1 p-15px pointer"
            style="display: flex; justify-content: center; align-items: center;"
          >
            <div
              class="fs-0-8rem fw-500 navy pointer-navy"
              onclick="fnShowTab('${pageNo}', '${pageUrl}')"
            >
              ${pageNm}
            </div>
            <div
              class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
              onclick="fnRmTab('${pageNo}', '${pageUrl}')"
            >
            </div>
          </div>
        </li>
      `);
      $(`#tabs`).append(resultTab);
    }
  }
};

// 1-2. 탭 추가 ------------------------------------------------------------------------------------
function fnAddTab(pageNm, pageUrl, pageNo) {

  if (TABS.indexOf(`/${pageNo}/`) > -1) {
    fnShowTab(pageNo, pageUrl);
  }
  else {
    const tabs = TABS.split("/");
    for (let k = 0; k < tabs.length; k++) {
      if (tabs[k]) {
        $(`#tab${tabs[k]}`).prop("class", "");
        $(`#tabContents${tabs[k]}`).css("display", "none");
      }
    }
    fnMkTabCd(pageNo, pageUrl, "add");

    const resultTab = (/* javascript */`
      <li class="active tabEl" id="tab${pageNo}" pageUrl="${pageUrl}">
        <div
          class="border-1 shadow-1 p-15px pointer"
          style="display: flex; justify-content: center; align-items: center;"
        >
          <div
            class="fs-0-8rem fw-500 navy pointer-navy"
            onclick="fnShowTab('${pageNo}', '${pageUrl}')"
          >
            ${pageNm}
          </div>
          <div
            class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
            onclick="fnRmTab('${pageNo}', '${pageUrl}')"
          >
          </div>
        </div>
      </li>
    `);
    $(`#tabs`).append(resultTab);

    if ($(`#tabContents${pageNo}`).html() == undefined) {
      const resultContents = (/* javascript */`
        <div id="tabContents${pageNo}">
          <iframe
            id="ifr${pageNo}"
            src="${pageUrl}"
            width="100%"
            height="${HEIGHT}px"
            border="0"
            frameborder="0"
            loading="lazy"
          >
          </iframe>
        </div>
      `);
      $(`#tabContents`).append(resultContents);
    }
  }

  fnConsoleTabInfo(pageNo);
};

// 1-4. 탭 활성화 ----------------------------------------------------------------------------------
function fnShowTab(pageNo, pageUrl) {

  const tabContents = $(`#tabContents${pageNo}`).html();

  if (!tabContents) {
    const resultContents = (/* javascript */`
      <div id="tabContents${pageNo}">
        <iframe
          id="ifr${pageNo}"
          src="${pageUrl}"
          width="100%"
          height="${HEIGHT}px"
          border="0"
          frameborder="0"
          loading="lazy"
        >
        </iframe>
      </div>
    `);
    $(`#tabContents`).append(resultContents);
  }

  const tabs = TABS.split("/");
  for (let k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $(`#tab${tabs[k]}`).prop("class", "");
      $(`#tabContents${tabs[k]}`).css("display", "none");
    }
  }
  $(`#tab${pageNo}`).prop("class", "active");
  $(`#tabContents${pageNo}`).css("display", "");

  fnConsoleTabInfo(pageNo);
};

// 1-3. 탭 제거 ------------------------------------------------------------------------------------
function fnRmTab(pageNo, pageUrl) {

  let posit = "";

  if ($(`#tab${pageNo}`).prop("class") === "active") {
    posit = "last";
  }
  $(`#tab${pageNo}`).remove();
  $(`#tabContents${pageNo}`).remove();

  const lastTab = fnMkTabCd(pageNo, pageUrl, "rm");

  if (posit === "last") {
    $(`#tab${lastTab}`).prop("class", "active");
    $(`#tabContents${lastTab}`).css("display", "");
  }

  fnConsoleTabInfo(pageNo);
};

// 1-5. 새로고침 -----------------------------------------------------------------------------------
function fnIfrRefresh() {
  const tabs = TABS.split("/");
  for (let k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $(`#ifr${tabs[k]}`).attr("src", $(`#ifr${tabs[k]}`).attr("src"));
    }
  }
};

// 1-6. 탭 순서 저장 -------------------------------------------------------------------------------
function fnTabOrder() {

  let tabs = "";
  let tabsLi = document.querySelectorAll(`#tabs li`);

  for (let i = 0; i < tabsLi.length; i++) {
    const tabCd = tabsLi[i].id.split("tab").join("");
    const tabPage = tabsLi[i].getAttribute("pageUrl");
    if (tabs) {
      tabs += ",";
    }
    tabs += `${tabCd}@${tabPage}`;
  }
  return tabs;
};

// 1-10. 탭 전부 닫기 ------------------------------------------------------------------------------
function fnCloseAllTab() {

  const tabs = TABS.split("/");
  for (let k = 0; k < tabs.length; k++) {
    if (tabs[k]) {
      $(`#tab${tabs[k]}`).remove();
      $(`#tabContents${tabs[k]}`).remove();
    }
  }
  TABS = "/";
  TABS_TARGET = "/";
};

// 3-1. 탭 sort ------------------------------------------------------------------------------------
function fnTabSortAndDrag() {
  $(`#tabs`).sortable({
    axis: 'x',
    cursor: 'move',
    zIndex: 9999,
    delay: 0,
    dropOnEmpty: true,
    helper: 'clone',
  }).disableSelection();
};

// 0. 버전정보 표시 --------------------------------------------------------------------------------
function fnShowVersion() {
  $.ajax({
    type: "GET",
    url: "showVersion",
    dataType:"JSON",
    success: (data) => {
      $(`#showVersion`).html(data);
      $(`#showVersion`).css("color", "currentColor");
      $(`#showVersion`).css("font-size", "17px");
      $(`#showVersion`).css("font-weight", "700px");
      $(`#showVersion`).css("text-align", "center");
    },
    error: ajaxErrorHandler
  });
};

// 0. 로그아웃 -------------------------------------------------------------------------------------
function fnLogOut() {
  const encryptedItem = {"loginSession": "false"};
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
  localStorage.setItem("loginSession", encryptedValue.toString());
  fnGoPage("reLogin");
};

// 0. 세션 체크 ------------------------------------------------------------------------------------
function fnCheckSession() {
  window.addEventListener("storage", (e) => {
    if (e.key === "loginSession") {
      const decryptedItem = localStorage.getItem("loginSession");
      const decryptedValue = CryptoJS.AES.decrypt(decryptedItem, "loginSession");
      const decryptedObj = JSON.parse(decryptedValue.toString(CryptoJS.enc.Utf8));
      if (decryptedObj.loginSession == "false") {
        fnGoPage("reLogin");
      }
    }
  });
};

// 0. 현재 열려있는 탭 정보 console에 표시 ---------------------------------------------------------
function fnConsoleTabInfo (tabNo) {
  const tabs = document.querySelectorAll(`.tabEl`);
  const tabIdRegex = /^tab\d+$/;
  const info = Array.from(tabs).map((tab) => {
    return tabIdRegex.test(tab.id) ? tab.id : '';
  })
  .filter((id) => {
    return id !== '';
  })
  .join(', ');

  console.log(`
    =============================
    닫기버튼을 누른 탭: ${tabNo}
    현재 열려있는 탭 갯수: ${info.split(",").length}
    현재 열려있는 탭: ${info}
    TABS: ${TABS}
    =============================
  `);
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  fnShowVersion();
  fnCheckSession();
  fnTabSortAndDrag();
});
