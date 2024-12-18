// 0. cd 값 구하기 ---------------------------------------------------------------------------------
const fnFindCd = async (targetNm, targetCd, targetId, event) => {

  // ex. house, houseCd, houseNm
  const str = targetId;
  const strCd = `${str}Cd`;
  const strNm = `${str}Nm`;
  const strEl = getById(str);
  const strCdEl = getById(strCd);

  // ex. House, HouseCd, HouseNm
  const upStr = str.charAt(0).toUpperCase() + str.slice(1);
  const upStrCd = `${upStr}Cd`;

  // ex. 창고, 거래처 ...
  const strKo = (
    str === "prod" ? "제품" :
    str === "resrc" ? "자재" :
    str === "house" ? "창고" :
    str === "comp" ? "거래처" :
    str
  );

  // Enter 키를 누르면 페이지 새로고침 방지
  if (event && event.key === "Enter") {
    event.preventDefault();
  }

  // 이벤트 한 번만 설정
  strEl && strEl.removeEventListener("change", () => {
    setValue(strCdEl, getValue(strEl));
  });

  fetch(`act/find${upStrCd}`, {
    method: "POST",
    body: `findNm=${targetNm}&findCd=${targetCd}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    // 0. 일단 해당 인풋에 포커스
    strEl && strEl.focus();

    // 1. targetNm 과 targetCd 가 모두 없는 경우 (전체 조회인 경우)
    if (!targetNm && !targetCd) {
      strEl && (strEl.innerHTML = `<option value="">==${strKo}==</option>`);

      data.forEach((item) => {
        const isSelected = targetCd === item[strCd] ? "selected" : "";
        const option = `<option value="${item[strCd]}" ${isSelected}>${item[strNm]}</option>`;
        strEl && (strEl.innerHTML += option);
      });
    }
    // 2-1. targetNm 과 targetCd 가 있는 경우 (결과 없는 경우)
    else if (!data || data.length === 0) {
      strEl && (strEl.innerHTML = `<option value="">==${strKo}==</option>`);
    }
    // 2-2. targetNm 과 targetCd 가 있는 경우 (결과 있는 경우)
    else if (data && data.length > 0) {
      // 2-2-1. 결과가 1개인 경우
      if (data.length === 1) {
        if (data[0][strNm] === targetNm) {
          setValue(strCdEl, data[0][strCd]);
        }
        else {
          setValue(strCdEl, "");
        }
      }
      // 2-2-2. 결과가 1개 이상인 경우
      else {
        const exactMatch = data.find((item) => item[strNm] === targetNm);
        if (exactMatch) {
          setValue(strCdEl, exactMatch[strCd]);
        }
        else {
          const partialMatches = data.filter((item) => item[strNm].startsWith(targetNm));
          if (partialMatches.length === 1) {
            setValue(strCdEl, partialMatches[0][strCd]);
          }
          else {
            setValue(strCdEl, "");
          }
        }
      }
      // 2-2-3. 결과를 select option 으로 표시
      strEl && (strEl.innerHTML = `<option value="">==${strKo}==</option>`);
      data.forEach((item) => {
        const isSelected = targetCd === item[strCd] ? "selected" : "";
        const option = `<option value="${item[strCd]}" ${isSelected}>${item[strNm]}</option>`;
        strEl && (strEl.innerHTML += option);
      });
    }
    // 선택된 option에 따라 #strCd 값을 갱신
    strEl && strEl.addEventListener("change", () => {
      setValue(strCdEl, getValue(strEl));
    });
  })
  .catch((err) => {
    console.error(err);
  });
};

// 0. nm 으로 cd 값 구하기 -------------------------------------------------------------------------
const fnGetCdWithNm = async (targetNm, targetVal, rowIndx, gridCd) => {

  // ex. grid00
  const gridId = `#${gridCd}`;

  // ex. house, houseCd, houseNm
  const str = targetNm.slice(0, -2);
  const strCd = `${str}Cd`;
  const strNm = `${str}Nm`;

  // ex. House, HouseCd, HouseNm
  const upStr = str.charAt(0).toUpperCase() + str.slice(1);
  const upStrCd = `${upStr}Cd`;

  // ex. 창고, 거래처 ...
  const strKo = (
    str === "prod" ? "제품" :
    str === "resrc" ? "자재" :
    str === "house" ? "창고" :
    str === "comp" ? "거래처" :
    str
  );

  // strNm 값이 변경되었을 경우에는 strCd 값도 변경되어야 함
  const rowData = $(gridId).pqGrid("getRowData", {rowIndx: rowIndx});
  if (rowData[strCd] && rowData[strNm] === targetVal) {
    return;
  }

  fetch(`act/find${upStrCd}`, {
    method: "POST",
    body: `findNm=${targetVal}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    const dynamicRowData = {};

    // 1. 값이 0개인 경우
    if (data.length === 0) {
      alert(`존재하지 않는 ${strKo}가 있습니다. ${strKo}를 다시 입력해주세요`);
      dynamicRowData[strCd] = "";
      dynamicRowData[strNm] = "";
    }
    // 2-1. 값이 1개인 경우
    else if (data.length === 1) {
      if (data[0][strNm] === targetVal) {
        dynamicRowData[strCd] = data[0][strCd];
      }
      else {
        alert(`존재하지 않는 ${strKo}가 있습니다. ${strKo}를 다시 입력해주세요`);
        dynamicRowData[strCd] = "";
        dynamicRowData[strNm] = "";
      }
    }
    // 2-2. 값이 1개 이상인 경우
    else if (data.length > 1) {
      const exactMatch = data.find((item) => item[strNm] === targetVal);
      if (exactMatch) {
        dynamicRowData[strCd] = exactMatch[strCd];
      }
      else {
        const partialMatches = data.filter((item) => item[strNm].startsWith(targetVal));
        if (partialMatches.length === 1) {
          dynamicRowData[strCd] = partialMatches[0][strCd];
        }
        else {
          alert(`일치하는 ${strKo}이 여러개입니다. ${strKo} 이름을 다시 입력해주세요`);
          dynamicRowData[strCd] = "";
          dynamicRowData[strNm] = "";
        }
      }
    }
    // 그리드 업데이트
    $(gridId).pqGrid("updateRow", {
      rowIndx: rowIndx,
      row: dynamicRowData
    });

    $(gridId).pqGrid("refreshDataAndView");
  })
  .catch((err) => {
    console.error(err);
  });
};

// 0. 입고, 출고 탭 전환 ---------------------------------------------------------------------------
let curTab = "in";
const fnSwitchTab = (newTab) => {
  if (curTab === newTab) {
    return;
  }
  // 버튼 스타일 변경
  document.getElementById(curTab + "Tab").classList.remove("active");
  document.getElementById(newTab + "Tab").classList.add("active");

  // 라디오 버튼 체크
  $(`input[name=inOut][value=${curTab}]`).prop("checked", false);
  $(`input[name=inOut][value=${newTab}]`).prop("checked", true);

  // 그리드 제목 변경
  const title = newTab === "in" ? "일괄 입고" : "일괄 출고";
  $(`#grid02`).pqGrid("option", "title", title);
  $(`#grid02`).pqGrid("refreshDataAndView");

  // 현재 탭 업데이트
  curTab = newTab;
}

// 0. 유저 정보, 권한 탭 전환 ----------------------------------------------------------------------
const fnSwitchPage = (page) => {
  if (page === "detail") {
    $("#detailTab").addClass("active");
    $("#permTab").removeClass("active");
    $(".grid-detail").removeClass("d-none");
    $(".grid-perm").addClass("d-none");
  }
  else {
    $("#detailTab").removeClass("active");
    $("#permTab").addClass("active");
    $(".grid-detail").addClass("d-none");
    $(".grid-perm").removeClass("d-none");
  }
}

// 0. 데이터 토클 ----------------------------------------------------------------------------------
const fnToggleUserPerm = (element) => {
  // 클릭된 요소의 부모 컨테이너 안의 모든 항목 찾기
  const parent = element.closest(".row");
  const allToggles = parent.querySelectorAll(`[data-value]`);

  // 모든 항목 초기화
  allToggles.forEach((el) => {
    el.classList.remove("primary");
    el.classList.add("light");
  });

  // 현재 클릭된 항목 활성화
  element.classList.remove("light");
  element.classList.add("primary");
}

// 0. 데이터 토클 ----------------------------------------------------------------------------------
const fnToggleInOut = (element) => {
  // 클릭된 요소의 부모 컨테이너 안의 모든 항목 찾기
  const parent = element.closest(".row");
  const allToggles = parent.querySelectorAll(`[data-value]`);

  // 모든 항목 초기화
  allToggles.forEach((el) => {
    el.classList.remove("primary");
    el.classList.add("light");
  });

  // 현재 클릭된 항목 활성화
  element.classList.remove("light");
  element.classList.add("primary");

  // 현재 클릭된 항목의 값 가져오기
  const inout = element.getAttribute("data-value");

  setValue(getById("inOut"), inout);
};

// 0. 팝업창 열기/닫기 -----------------------------------------------------------------------------
const fnPopup = (target, onOff) => {

  if (onOff === "on") {
    if ($(`#${target}`).hasClass("d-none")) {
      $(`#${target}`).removeClass("d-none");
      $(`#${target}`).addClass("d-block");
    }
  }
  if (onOff === "off") {
    if ($(`#${target}`).hasClass("d-block")) {
      $(`#${target}`).removeClass("d-block");
      $(`#${target}`).addClass("d-none");
    }
  }
};

// 0. 페이지 이동 ----------------------------------------------------------------------------------
const fnGoPage = (page) => {
  window.location.href = page;
};

// 0. ajax 에러 핸들러 -----------------------------------------------------------------------------
const fnAjaxErrorHandler = (request, status, error) => {
  if (request.status && (request.status === 400 || request.status === 477)) {
    alert("세션이 종료 되었습니다");
    fnGoPage("reLogin");
  }
  else {
    alert(`code: ${request.status}\n message: ${request.responseText}\n error: ${error}`);
  }
};

// 0. 엔터일때만 로그인 ----------------------------------------------------------------------------
const fnPressGetLogin = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fnLogin();
  }
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
const fnPressGet01 = (event) => {

  // 1. event가 `onKeyDown`일때 = enter 조건 O
  if (event.keyCode === 13 && event.key === "Enter") {
    event.preventDefault();
    typeof fnReset === 'function' && fnReset();
    typeof fnResetWhenSearch === 'function' && fnResetWhenSearch();
    fnGetList01();
  }

  // 2. event가 `onClick`일때 = enter 조건 X
  if (event.type === "click") {
    event.preventDefault();
    typeof fnReset === 'function' && fnReset();
    typeof fnResetWhenSearch === 'function' && fnResetWhenSearch();
    fnGetList01();
  }
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
const fnPressGet02 = (event) => {
  if (
    (event.keyCode === 13 && event.key === "Enter") ||
    (event.type === "click")
  ) {
    event.preventDefault();
    fnGetList02();
  }
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
const fnPressGetReport = (event) => {
  if (
    (event.key === "Enter") ||
    (event.type === "click") ||
    (event.type === "change")
  ) {
    event.preventDefault();
    fnGetList01();
    fnGetList02();
  }
}

// 0. 로그아웃 -------------------------------------------------------------------------------------
const fnLogOut = () => {
  const encryptedItem = {"loginSession": "false"};
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
  localStorage.setItem("loginSession", encryptedValue.toString());
  fnGoPage("reLogin");
};

// 0. 세션 체크 ------------------------------------------------------------------------------------
const fnCheckSession = () => {
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

// 버전 정보 표시 ----------------------------------------------------------------------------------
const fnShowVersion = () => {
  $.ajax({
    type: "GET",
    url: "showVersion",
    dataType: "JSON",
    success: (data) => {
      const latestDateTime = data.latestDateTime;
      const latestVersion = data.latestVersion;

      const fmtHtml = (/* javascript */`
        <div class="d-row-center">
          <div class="fs-0-6rem fw-500 light-black mr-10px">Test Version</div>
          <div class="fs-0-6rem fw-400 light-black mr-10px">v${latestVersion}</div>
          <div class="fs-0-6rem fw-400 light-black">${latestDateTime}</div>
        </div>
      `);

      $(".showVersion").html(fmtHtml);
    },
    error: fnAjaxErrorHandler
  });
}

// 0. 미디어 별로 마진, 정렬 조정 ------------------------------------------------------------------
const fnDynamicDisplay = () => {

  const xsToSm = window.matchMedia("(min-width: 0px) and (max-width: 576px)");
  const smToXl = window.matchMedia("(min-width: 577px) and (max-width: 10000px)");
  const xsToMd = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
  const mdToXl = window.matchMedia("(min-width: 769px) and (max-width: 10000px)");

  const alignSm = document.querySelectorAll(".align-sm");
  const alignMd = document.querySelectorAll(".align-md");

  const marginSm = document.querySelectorAll(".margin-sm");
  const marginMd = document.querySelectorAll(".margin-md");

  const marginSmDash = document.querySelectorAll(".margin-sm-dash");
  const marginMdDash = document.querySelectorAll(".margin-md-dash");

  marginSm.forEach((el) => {
    if (xsToSm.matches) {
      el?.classList?.add("mb-4vh");
      el?.classList?.remove("pr-2vw");
    }
    else if (smToXl.matches) {
      el?.classList?.remove("mb-4vh");
      el?.classList?.add("pr-2vw");
    }
  });

  marginMd.forEach((el) => {
    if (xsToMd.matches) {
      el?.classList?.add("mb-4vh");
      el?.classList?.remove("pr-2vw");
    }
    else if (mdToXl.matches) {
      el?.classList?.remove("mb-4vh");
      el?.classList?.add("pr-2vw");
    }
  });

  marginSmDash.forEach((el) => {
    if (xsToSm.matches) {
      el?.classList?.add("mb-2vh");
    }
    else if (smToXl.matches) {
      el?.classList?.remove("mb-2vh");
    }
  });

  marginMdDash.forEach((el) => {
    if (xsToMd.matches) {
      el?.classList?.add("mb-2vh");
    }
    else if (mdToXl.matches) {
      el?.classList?.remove("mb-2vh");
    }
  });

  alignSm.forEach((el) => {
    if (xsToSm.matches) {
      el.classList.add("d-center");
    }
    else if (smToXl.matches) {
      el.classList.remove("d-center");
    }
  });

  alignMd.forEach((el) => {
    if (xsToMd.matches) {
      el.classList.add("d-center");
    }
    else if (mdToXl.matches) {
      el.classList.remove("d-center");
    }
  });
}

// 0. test -----------------------------------------------------------------------------------------
const fnInitCombo = (configArray, onComplete, unusedParam) => {
  let partStr = "";
  let targetStr = "";
  let groupCdStr = "";

  for (let i = 0; i < configArray.length; i++) {
    const { part, target, groupCd } = configArray[i];

    if (partStr) {
      partStr += "/";
      targetStr += "/";
    }
    partStr += part;
    targetStr += target;

    if (groupCdStr && groupCd !== undefined) {
      groupCdStr += "/";
    }
    if (groupCd !== undefined) {
      groupCdStr += groupCd;
    }
  }

  const dataParams = `part=${partStr}&groupCd=${groupCdStr}&target=${targetStr}`;
  const requestUrl = "act/initCodeAll";

  $.ajax({
    url: requestUrl,
    type: "POST",
    dataType: "json",
    data: dataParams,
    beforeSend: (req) => {
      req.setRequestHeader("AJAX", "true");
    },
    success: (responseData) => {
      for (let i = 0; i < configArray.length; i++) {
        const {
          target,
          format,
          formID,
          groupCd,
          part,
          cd,
          option
        } = configArray[i];

        const $targetElem = $(`#${target}`);
        $targetElem.html("");

        let optionHtml = "";
        let showStr = "";

        if (part === "comCodeGroup") {
          optionHtml = `<option value="">==그룹==</option>`;
        } else {
          for (let j = 0; j < responseData.length; j++) {
            if (groupCd === responseData[j].groupCd) {
              optionHtml = "";
              showStr = "";

              if (format === "radio") {
                showStr = `(${groupCd})`;
                optionHtml += `<span style="font-size:9px;line-height:18px;">${showStr}</span>`;
              } else if (format === "checkbox") {
                showStr = `(${groupCd})`;
              } else {
                showStr = `${responseData[j].groupNm}(${groupCd})`;
                optionHtml = `<option value="">==${showStr}==</option>`;
              }
            }
          }
        }

        let optionCount = 1;
        let radioIndex = 0;

        for (let k = 0; k < responseData.length; k++) {
          const item = responseData[k];

          if (target === item.target) {
            let selectedAttr = "";
            if (format === "radio") {
              selectedAttr = radioIndex === 0 ? "checked" : "";
              optionHtml += `
                <input type="radio" id="${formID}" name="${formID}" value="${item.cd}" style="float:left;position:relative;" ${selectedAttr}>
                <label style="float:left;margin-right:3px">${decodeURIComponent(item.nm)}</label>`;
              radioIndex++;
            } else if (format === "checkbox") {
              if (option === "addLabel") {
                optionHtml += `
                  <input type="checkbox" id="${formID}" name="${formID}" value="${item.cd}" style="float:left;position:relative;">
                  <label style="float:left;margin-right:3px">${decodeURIComponent(item.nm)}</label>
                  <label style="float:left;margin-right:2px" id="${item.cd}Status"></label>`;
              } else {
                optionHtml += `
                  <input type="checkbox" id="${formID}" name="${formID}" value="${item.cd}" style="float:left;position:relative;">
                  <label style="float:left;margin-right:3px">${decodeURIComponent(item.nm)}</label>`;
              }
            } else {
              if (item.cd === cd) {
                selectedAttr = "SELECTED";
              }
              if (part === "comCodeGroup") {
                optionHtml += `<option value="${item.cd}" ${selectedAttr}>${optionCount}_${item.nm}</option>`;
              } else {
                optionHtml += `<option value="${item.cd}" ${selectedAttr}>${item.nm}</option>`;
              }
            }
          } else {
            optionCount = 0;
          }
          optionCount++;
        }

        $targetElem.append(optionHtml);
      }
    },
    complete: () => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    },
    error: fnAjaxErrorHandler
  });
};

const fnExport = (gridId, fileName) => {
  if (!gridId) {
    alert("그리드 코드가 지정되지 않았습니다");
    return;
  }
  if (!fileName) {
    alert("Excel 파일명이 지정되지 않았습니다");
    return;
  }

  const gridData = $(`#${gridId}`).pqGrid("getData");
  const colModel = $(`#${gridId}`).pqGrid("getColModel");
  const rowCount = gridData.length;
  const columnCount = colModel.length;

  const colTitles = [];
  const colWidths = [];
  const colAlignments = [];
  const colDataTypes = [];

  let totalWidth = 0;
  let baseWidth = 300;

  if (columnCount < 20) baseWidth = 250;
  if (columnCount < 15) baseWidth = 200;
  if (columnCount < 10) baseWidth = 150;
  if (columnCount < 5) baseWidth = 60;

  for (let colIndex = 0; colIndex < columnCount; colIndex++) {
    colTitles[colIndex] = colModel[colIndex].title.replace(/(<([^>]+)>)/gi, "");
    colAlignments[colIndex] = colModel[colIndex].align;
    colDataTypes[colIndex] = colModel[colIndex].dataType;
    totalWidth += parseInt(colModel[colIndex].width, 10);
  }

  for (let colIndex = 0; colIndex < columnCount; colIndex++) {
    const colScaledWidth = Math.ceil(baseWidth * (colModel[colIndex].width / totalWidth));
    if (colModel[colIndex].hidden !== true) {
      colWidths[colIndex] = colScaledWidth;
    }
  }

  const excelObj = MyExcel.newExcel("맑은고딕 9 #3C4752");
  const sheetName = fileName.replace(".xlsx", "");
  excelObj.set({ sheet: 0, value: sheetName });

  for (let rowIndex = 0; rowIndex <= rowCount; rowIndex++) {
    excelObj.set({ row: rowIndex, value: 19.5 });
  }

  let headerStyle = excelObj.addStyle({
    border: "none,none,none,thin #bdbdbd",
    font: "맑은고딕 9 #3C4752 B",
    fill: "#E6E6E6",
    align: "C C",
  });

  for (let headerIndex = 0; headerIndex < colTitles.length; headerIndex++) {
    if (headerIndex === columnCount - 1) {
      headerStyle = excelObj.addStyle({
        border: "none,thin #bdbdbd,none,thin #bdbdbd",
        font: "맑은고딕 9 #3C4752 B",
        fill: "#E6E6E6",
        align: "C C",
      });
    }
    excelObj.set(0, headerIndex, 0, colTitles[headerIndex], headerStyle);
    excelObj.set(0, headerIndex, undefined, colWidths[headerIndex]);
  }

  for (let dataRowIndex = 1; dataRowIndex <= rowCount; dataRowIndex++) {
    for (let dataColIndex = 0; dataColIndex < columnCount; dataColIndex++) {
      const cellValue = gridData[dataRowIndex - 1][colModel[dataColIndex].dataIndx];
      const cellStyle = {};

      cellStyle.align = "C C";
      if (colAlignments[dataColIndex] === undefined) cellStyle.align = "L C";
      if (colAlignments[dataColIndex] === "left") cellStyle.align = "L C";
      if (colAlignments[dataColIndex] === "right") cellStyle.align = "R C";

      if (dataRowIndex % 2 === 0) {
        cellStyle.border = "thin #bdbdbd,thin #bdbdbd,thin #bdbdbd,thin #bdbdbd";
        cellStyle.fill = "";
      } else {
        cellStyle.border = "thin #bdbdbd,thin #bdbdbd,thin #bdbdbd,thin #bdbdbd";
        cellStyle.fill = "#FAFAFA";
      }

      if (colDataTypes[dataColIndex] === "float" || colDataTypes[dataColIndex] === "integer") {
        cellStyle.format = "#,##0 ;[Red](#,##0)";
      } else {
        cellStyle.format = "";
      }

      const styleKey = excelObj.addStyle(cellStyle);
      if (colModel[dataColIndex].hidden !== true) {
        excelObj.set(0, dataColIndex, dataRowIndex, cellValue, styleKey);
      }
    }
  }
  const currentDateTime = fnCurDateTime();
  fileName = `${currentDateTime}_${fileName}`;
  excelObj.generate(fileName);
};

// 0. 화면 로딩시 실행 -----------------------------------------------------------------------------
jQuery(function($) {
  fnShowVersion();
  fnDynamicDisplay();
  fnCheckSession();
});

// 0. 리사이즈 이벤트 ------------------------------------------------------------------------------
window.addEventListener("resize", fnDynamicDisplay);