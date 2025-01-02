// -------------------------------------------------------------------------------------------------
let TABS = "/";
let TABS_TARGET = "/";
let TABS_LIMIT = 5;
let HEIGHT = window.innerHeight * 0.9;

// 탭 관련 함수 ------------------------------------------------------------------------------------
const fnGetTabList = () => {
  return TABS.split("/").filter(tab => tab.trim() !== "");
}

const fnGetTargetList = () => {
  return TABS_TARGET.split("/").filter(target => target.trim() !== "");
}

const fnSetTabsAndTargets = (tabList, targetList) => {
  TABS = "/";
  TABS_TARGET = "/";
  tabList.forEach((tab, index) => {
    TABS += `${tab}/`;
    TABS_TARGET += `${targetList[index]}/`;
  });
}

// 현재 TABS_LIMIT을 기준으로 탭을 조정 ------------------------------------------------------------
const fnAdjustTabsToLimit = () => {
  const tabList = fnGetTabList();
  const targetList = fnGetTargetList();

  while (tabList.length > TABS_LIMIT) {
    const removedTabNo = tabList.shift();
    targetList.shift();
    $(`#tab${removedTabNo}`).remove();
    $(`#tabContents${removedTabNo}`).remove();
  }

  fnSetTabsAndTargets(tabList, targetList);
}

// 반응형 규칙에 따라 TABS_LIMIT 설정 --------------------------------------------------------------
const fnUpdateTabsLimitBasedOnMediaQuery = () => {
  const xs = window.matchMedia("(min-width: 0px) and (max-width: 576px)");
  const sm = window.matchMedia("(min-width: 577px) and (max-width: 768px)");
  const md = window.matchMedia("(min-width: 769px) and (max-width: 992px)");
  const lg = window.matchMedia("(min-width: 993px) and (max-width: 1200px)");
  const xl = window.matchMedia("(min-width: 1201px) and (max-width: 10000px)");

  if (xs.matches) {
    TABS_LIMIT = 1;
  }
  else if (sm.matches) {
    TABS_LIMIT = 2;
  }
  else if (md.matches) {
    TABS_LIMIT = 3;
  }
  else if (lg.matches) {
    TABS_LIMIT = 4;
  }
  else if (xl.matches) {
    TABS_LIMIT = 5;
  }

  fnAdjustTabsToLimit();
}

// 탭 추가, 제거 함수 ------------------------------------------------------------------------------
const fnModifyTabs = (pageNo, pageUrl, action) => {
  const tabList = fnGetTabList();
  const targetList = fnGetTargetList();
  let currentTab = pageNo;

  if (action === "add") {
    if (!tabList.includes(pageNo)) {
      tabList.push(pageNo);
      targetList.push(pageUrl);
    }

    if (tabList.length > TABS_LIMIT) {
      const removedTabNo = tabList.shift();
      targetList.shift();
      $(`#tab${removedTabNo}`).remove();
      $(`#tabContents${removedTabNo}`).remove();
    }
    fnSetTabsAndTargets(tabList, targetList);
  }

  if (action === "rm") {
    const idx = tabList.indexOf(pageNo);
    if (idx > -1) {
      tabList.splice(idx, 1);
      targetList.splice(idx, 1);
    }

    fnSetTabsAndTargets(tabList, targetList);

    // 마지막 탭 활성화
    currentTab = tabList.length > 0 ? tabList[tabList.length - 1] : null;
  }

  return currentTab;
}

// 탭 활성화 함수 ----------------------------------------------------------------------------------
const fnShowTab = (pageNo, pageUrl) => {

  // 해당 탭 콘텐츠가 없는 경우 생성
  if (!$(`#tabContents${pageNo}`).length) {
    const iframeContent = `
      <div id="tabContents${pageNo}">
        <iframe
          id="ifr${pageNo}"
          src="${pageUrl}"
          width="100%"
          height="${HEIGHT}px"
          frameborder="0"
          loading="lazy">
        </iframe>
      </div>
    `;
    $("#tabContents").append(iframeContent);
  }

  // 모든 탭 비활성화 후 현재 탭 활성화
  const tabList = fnGetTabList();
  tabList.forEach((t) => {
    $(`#tab${t}`).removeClass("active");
    $(`#tabContents${t}`).hide();
  });

  $(`#tab${pageNo}`).addClass("active");
  $(`#tabContents${pageNo}`).show();

  // fnLogTabInfo(pageNo);
}

// 탭 초기 로딩 및 생성 ----------------------------------------------------------------------------
const fnInitializeTabs = (tabs) => {

  if (!tabs) {
    return;
  }

  const tabArray = tabs.split(",");
  const pageUrls = tabArray.map(item => item.split("@")[1]).join(",");

  $.ajax({
    url: `act/listSysMenu`,
    type: `POST`,
    dataType: "json",
    data: `config=${pageUrls}`,
    beforeSend: (xhr) => xhr.setRequestHeader("AJAX", "true"),
    success: (data) => {
      const urlToNameMap = {};
      data.forEach(item => {
        urlToNameMap[item.pageUrl] = item.pageNm;
      });
      fnInitializeTabElements(urlToNameMap, tabArray);
    },
    error: fnAjaxErrorHandler
  });
}

// 탭 초기화 함수 ----------------------------------------------------------------------------------
const fnInitializeTabElements = (urlToNameMap, tabArray) => {

  let lastTabNo = "";
  let lastTabUrl = "";

  tabArray.forEach((tabInfo) => {
    const [pageNo, pageUrl] = tabInfo.split("@");
    if (urlToNameMap[pageUrl]) {
      fnAddTabWithoutActivation(urlToNameMap[pageUrl], pageUrl, pageNo);
      lastTabNo = pageNo;
      lastTabUrl = pageUrl;
    }
  });

  if (!lastTabNo) {
    return;
  }

  const iframeContent = (/* javascript */`
    <div id="tabContents${lastTabNo}">
      <iframe
        id="ifr${lastTabNo}"
        src="${lastTabUrl}"
        width="100%"
        height="${HEIGHT}px"
        frameborder="0"
        loading="lazy">
      </iframe>
    </div>
  `);
  $("#tabContents").append(iframeContent);
}

// 탭을 비활성화된 상태로 추가 (초기화용) ----------------------------------------------------------
const fnAddTabWithoutActivation = (pageName, pageUrl, pageNo) => {
  const tabList = fnGetTabList();
  if (tabList.includes(pageNo)) {
    fnShowTab(pageNo, pageUrl);
    return;
  }

  tabList.forEach(t => $(`#tab${t}`).removeClass("active"));
  fnModifyTabs(pageNo, pageUrl, "add");

  const tabElement = (/* javascript */`
    <li class="active tabEl" id="tab${pageNo}" pageUrl="${pageUrl}">
      <div
        class="border-1 shadow-1 p-15px pointer"
        style="display: flex; justify-content: center; align-items: center;"
      >
        <div
          class="fs-0-8rem fw-500 navy pointer-navy"
          onclick="fnShowTab('${pageNo}', '${pageUrl}')"
        >
          ${pageName}
        </div>
        <div
          class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
          onclick="fnRemoveTab('${pageNo}', '${pageUrl}')"
        >
        </div>
      </div>
    </li>
  `);
  $("#tabs").append(tabElement);
}

// 사용자가 직접 탭을 추가할 때 호출 ---------------------------------------------------------------
const fnAddTab = (pageName, pageUrl, pageNo) => {
  const tabList = fnGetTabList();

  // 모든 탭 비활성화
  tabList.forEach((t) => {
    $(`#tab${t}`).removeClass("active");
    $(`#tabContents${t}`).hide();
  });

  const wasExist = tabList.includes(pageNo);
  fnModifyTabs(pageNo, pageUrl, "add");

  if (wasExist) {
    fnShowTab(pageNo, pageUrl);
    return
  }

  if ($(`#tab${pageNo}`).length) {
    $(`#tab${pageNo}`).addClass("active");
    $(`#tabContents${pageNo}`).show();
    return;
  }

  const tabElement = (/* javascript */`
    <li class="active tabEl" id="tab${pageNo}" pageUrl="${pageUrl}">
      <div
        class="border-1 shadow-1 p-15px pointer"
        style="display: flex; justify-content: center; align-items: center;"
      >
        <div
          class="fs-0-8rem fw-500 navy pointer-navy"
          onclick="fnShowTab('${pageNo}', '${pageUrl}')"
        >
          ${pageName}
        </div>
        <div
          class="fs-0-8rem fa fa-close dark-grey pointer-red ml-10px"
          onclick="fnRemoveTab('${pageNo}', '${pageUrl}')"
        >
        </div>
      </div>
    </li>
  `);
  $("#tabs").append(tabElement);

  const iframeContent = (/* javascript */`
    <div id="tabContents${pageNo}">
      <iframe
        id="ifr${pageNo}"
        src="${pageUrl}"
        width="100%"
        height="${HEIGHT}px"
        frameborder="0"
        loading="lazy">
      </iframe>
    </div>
  `);
  $("#tabContents").append(iframeContent);

  // fnLogTabInfo(pageNo);
}

// 탭 제거 -----------------------------------------------------------------------------------------
const fnRemoveTab = (pageNo, pageUrl) => {
  const wasActive = $(`#tab${pageNo}`).hasClass("active");
  $(`#tab${pageNo}`).remove();
  $(`#tabContents${pageNo}`).remove();

  const lastActiveTab = fnModifyTabs(pageNo, pageUrl, "rm");
  if (wasActive && lastActiveTab) {
    $(`#tab${lastActiveTab}`).addClass("active");
    $(`#tabContents${lastActiveTab}`).show();
  }
}

// 탭 전체 새로고침 --------------------------------------------------------------------------------
const fnRefreshAllTabs = () => {
  const tabList = fnGetTabList();
  tabList.forEach(t => {
    const src = $(`#ifr${t}`).attr("src");
    $(`#ifr${t}`).attr("src", src);
  });
}

// 현재 탭 순서를 문자열로 반환 --------------------------------------------------------------------
const fnGetTabOrder = () => {
  const tabs = [];
  $("#tabs li").each(function() {
    const tabNo = $(this).attr("id").replace("tab", "");
    const pageUrl = $(this).attr("pageUrl");
    tabs.push(`${tabNo}@${pageUrl}`);
  });
  return tabs.join(",");
}

// 모든 탭 닫기 ------------------------------------------------------------------------------------
const fnCloseAllTabs = () => {
  const tabList = fnGetTabList();
  tabList.forEach(t => {
    $(`#tab${t}`).remove();
    $(`#tabContents${t}`).remove();
  });
  TABS = "/";
  TABS_TARGET = "/";
}

// 탭 순서 변경 가능하도록 설정 --------------------------------------------------------------------
const fnEnableTabSorting = () => {
  $("#tabs").sortable({
    axis: 'x',
    cursor: 'move',
    zIndex: 9999,
    delay: 0,
    dropOnEmpty: true,
    helper: 'clone'
  }).disableSelection();
}

// 탭 정보 콘솔 출력 -------------------------------------------------------------------------------
const fnLogTabInfo = (tabNo) => {
  console.log(`
    =============================
    누른 탭: ${tabNo}
    현재 열려있는 탭 갯수: ${fnGetTabList().length}
    현재 탭 제한 갯수: ${TABS_LIMIT}
    TABS: ${TABS}
    =============================
  `);
}

// 초기 로딩 ---------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  fnEnableTabSorting();
  fnUpdateTabsLimitBasedOnMediaQuery();
});

// 리사이즈 이벤트 ---------------------------------------------------------------------------------
window.addEventListener("resize", () => {
  fnUpdateTabsLimitBasedOnMediaQuery();
});
