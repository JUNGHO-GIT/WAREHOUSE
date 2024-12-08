// -------------------------------------------------------------------------------------------------
function fnFindCd(targetNm, targetCd, targetId, event) {

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
  .then(async (response) => {
    const data = await response.json();
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
  .catch((error) => {
    console.error("Error:", error);
  });
};

// 0.fnGetCdWithNm ---------------------------------------------------------------------------------
function fnGetCdWithNm(targetNm, targetVal, rowIndx, gridCd) {

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
  .then(async (response) => {
    const data = await response.json();
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
    })
    .pqGrid("refreshDataAndView");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

// 0. 일괄 입출고 탭 전환 --------------------------------------------------------------------------
let curTab = "in";
function fnSwitchTab(newTab) {
  if (curTab !== newTab) {

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
}

// 0. 콤마 제거 -----------------------------------------------------------------------------------
function fnRemoveComma(obj) {
  return parseInt(obj.replace(/,/g, ''), 10);
};

// 0. 공급가 계산 ---------------------------------------------------------------------------------
function fnSupplyPrice() {
  // 콤마를 제거한 후 단가와 수량을 계산
  let unitPrice = fnRemoveComma($("#unitPrice").val());
  let qty = fnRemoveComma($("#qty").val());

  // 공급가 계산
  var supplyPrice = unitPrice * qty;

  // 계산된 공급가에 콤마 추가
  $("#supplyPrice").val(supplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

// 0. 천단위 콤마 추가 (input 태그 내에서 호출) ----------------------------------------------------
var fnInputNum = (function() {
  var MAX_INT_VALUE = 2147483647;
  var debounceTimer = null;

  return function(obj) {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(function() {
      var inputVal = obj.value.replace(/,/g, '');
      var numericInputVal = parseInt(inputVal);

      // 입력값이 숫자이고 빈 문자열이 아닌 경우
      if (!isNaN(numericInputVal) && inputVal !== '') {
        if (numericInputVal > MAX_INT_VALUE) {
          // 최대값을 초과하는 경우
          alert("입력 가능한 최대값을 초과하였습니다.");
          obj.value = 0;
        }
        else {
          // 입력값이 유효한 경우, 콤마 추가하여 형식 지정
          inputVal = numericInputVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          obj.value = inputVal;
        }
      }
      // 입력값이 숫자가 아닌 경우
      else {
        alert("숫자만 입력 가능합니다.");
        obj.value = 0;
      }
    }, 100);
  };
})();

// 0. 천단위 콤마 추가 (js에서 호출) ---------------------------------------------------------------
function fnFormatNum(num) {
  // 값이 null, undefined, 또는 빈 문자열인 경우 0을 반환
  if (num === null || num === undefined || num === '') {
    return "0";
  }

  // 입력값을 숫자로 변환
  var numericInputVal = parseFloat(num);

  // 입력값이 숫자가 아니거나 NaN인 경우 0을 반환
  if (isNaN(numericInputVal)) {
    return "0";
  }

  // 숫자를 문자열로 변환하고 천단위 콤마 추가
  return numericInputVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\.00$/, '');
};


// 0. 숫자 비율형식 변환 (소숫점 3자리 - input 태그 내에서 호출) -----------------------------------
var fnInputRate = (function() {
  var MAX_INT_VALUE = 2147483647;
  var debounceTimer = null;

  return function (obj) {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(function () {
      var inputVal = obj.value.replace(/,/g, '');

      // 입력값에 소수점이 두 개 이상 포함된 경우 체크
      if ((inputVal.match(/\./g) || []).length > 1) {
        alert("유효하지 않은 형식입니다.");
        obj.value = '0.000';
        return;
      }

      if (inputVal === '') {
        return;
      }
      else if (!isNaN(parseFloat(inputVal)) && isFinite(inputVal)) {
        var numericInputVal = parseFloat(inputVal);
        if (!isNaN(numericInputVal) && numericInputVal <= MAX_INT_VALUE) {
          var decimalPlaces = (inputVal.split('.')[1] || []).length;
          if (decimalPlaces <= 3) {
            obj.value = inputVal;
          }
          else {
            obj.value = numericInputVal.toFixed(3);
          }
        }
        else {
          alert("입력 가능한 최대값을 초과하였습니다.");
          obj.value = '0.000';
        }
      }
      else {
        alert("비율로 변환할 수 없는 값입니다.");
        obj.value = '0.000';
      }
    }, 100);
  };
})();

// 0. 숫자 비율형식 변환 (소숫점 3자리 - js에서 호출) ---------------------------------------------
function fnFormatRate(num) {
  // 값이 null, undefined, 또는 빈 문자열인 경우 0을 반환
  if (num === null || num === undefined || num === '') {
    return "0.000";
  }

  // 입력값을 숫자로 변환
  var numericInputVal = parseFloat(num);

  // 입력값이 숫자가 아니거나 NaN인 경우 0을 반환
  if (isNaN(numericInputVal)) {
    return "0.000";
  }

  // 숫자를 문자열로 변환하고 소수점 3자리로 지정
  return numericInputVal.toFixed(3);
};

// 0. 날짜 형식 변환 -------------------------------------------------------------------------------
function fnFormatDate(value) {
  // 입력값이 유효한 날짜 형식인지 확인
  var validFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (validFormat.test(value)) {
    return value;
  }

  // 시간 정보 제거 (공백으로 구분된 첫 번째 부분만 사용)
  var datePart = value.split(' ')[0];

  // 숫자만 남기고 모든 비숫자 문자 제거
  var numbersOnly = datePart.replace(/\D/g, '');

  // YYYY-MM-DD 형식으로 변환
  if (numbersOnly.length <= 4) {
    return numbersOnly;
  }
  else if (numbersOnly.length <= 6) {
    return numbersOnly.slice(0, 4) + '-' + numbersOnly.slice(4);
  }
  else {
    return numbersOnly.slice(0, 4) + '-' + numbersOnly.slice(4, 6) + '-' + numbersOnly.slice(6, 8);
  }
}

// -------------------------------------------------------------------------------------------------
function fnGridPopup (target, onOff) {

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

// -------------------------------------------------------------------------------------------------
function fnLayerTop(layer) {
  $(`#${layer}`).css("z-index", "100");
  $(`#popup2`).draggable({
    cursor: "move",
    handle: "#popTop",
    cancel: "#popBody"
  });
};

// -------------------------------------------------------------------------------------------------
function fnSetTm(t, target) {
  if (t) {
    var divT = t.split(":");
    if (divT[0] < 10) divT[0] = "0" + parseInt(divT[0], 10);
    if (divT[1] < 10) divT[1] = "0" + parseInt(divT[1], 10);
    t = divT[0] + ":" + divT[1];
    $("#" + target).val(t);
  }
};

function fnSetTmFormat(tm) {
  if (!tm) {
    return "";
  }
  var hr = tm.substr(0, 2);
  var min = tm.substr(2, 2);

  return hr + ":" + min;
};

function fnToday() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

  var chan_val = year + '-' + mon + '-' + day;

  return chan_val;
};

function fnYearMonth() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  /* var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();*/

  var yyyymm = year + '-' + mon;

  return yyyymm;
};


function fnTodayMin() {
  var now = new Date();
  var hour = now.getHours() > 9 ? '' + now.getHours() : '0' + now.getHours();
  var min = now.getMinutes() > 9 ? '' + now.getMinutes() : '0' + now.getMinutes();

  var chan_val = hour + ':' + min;

  return chan_val;
};

// 0. 페이지 이동 ----------------------------------------------------------------------------------
function fnGoPage (page) {
  location.href = page;
};

// 0. 에러처리 -------------------------------------------------------------------------------------
function ajaxErrorHandler (request, status, error) {
  if (request.status === 477) {
    alert("세션이 종료 되었습니다.");
    fnGoPage("reLogin");
  }
  else {
    alert(`code: ${request.status}\n message: ${request.responseText}\n error: ${error}`);
  }
};

// 0. 엔터일때만 실행 ------------------------------------------------------------------------------
function onKeyDown (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fnAuth();
  }
};

// -------------------------------------------------------------------------------------------------
// 그리드 옵션 설정 --------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
function calcLowStock(data) {
  let lowStockCount = 0;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    row.lowStock = parseInt(row.qty) <= parseInt(row.protectedQty) ? 1 : 0;
    if (row.lowStock === 1) {
      lowStockCount++;
    }
  }
  return lowStockCount;
}

// -------------------------------------------------------------------------------------------------
function displayLowStock (data) {
  return data.rowData.lowStock === 1 ? `<span class="fs-1-2rem red">●</span>` : "";
};

// -------------------------------------------------------------------------------------------------
function calcSum (data, dataIndex) {
  if (!data) {
    return "0";
  }
  const sum = data.reduce(function(acc, row) {
    const value = Number(row[dataIndex]);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);
  return sum.toLocaleString();
};

// -------------------------------------------------------------------------------------------------
function renderImage (data) {
  // summary 는 건너뛰기
  if (data.rowData.pq_rowcls === `summary-row`) {
    return "";
  }
  return (/* javascript */`
    <img
      src="viewFiles?fileUrl=${data.rowData.fileUrl || 'noGridImage.webp'}"
      class="w-100p h-auto radius-1 shadow-1"
      loading="lazy"
    />`
  );
};

// -------------------------------------------------------------------------------------------------
function renderZero (data) {
  return data.cellData ? data.cellData.toLocaleString() : "0";
}

// -------------------------------------------------------------------------------------------------
function updateTitle (title="", data={}) {
  return (/* javascript */`
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-left">
        <span class="fs-0-8rem">${title}</span>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-right ml-n50px">
        <span class="fs-0-9rem red">●</span>
        <span class="ml-5px mr-5px">안전재고 이하 : </span>
        <span class="red">${calcLowStock(data)}</span>
      </div>
    </div>
  `);
};

// -------------------------------------------------------------------------------------------------
function updateSummary (data={}) {
  return [{
    pq_rowcls: "summary-row",
    fileUrl: "",
    resrcNm: `<div class="fs-1-0rem fw-700 py-2vh">Total</div>`,
    protectedQty: calcSum(data, "protectedQty"),
    inQty: calcSum(data, "inQty"),
    outQty: calcSum(data, "outQty"),
    qty: calcSum(data, "qty")
  }];
};

// -------------------------------------------------------------------------------------------------
function insertSpaceWhenMdViewPort() {
  const dividerMd = document.querySelectorAll(".divider-md");
  const dividerAll = document.querySelectorAll(".divider-all");
  const xsToSm = window.matchMedia("(min-width: 0px) and (max-width: 1189px)");
  const mdToLg = window.matchMedia("(min-width: 1190px) and (max-width: 10000px)");

  dividerMd.forEach((el) => {
    if (xsToSm.matches && !el.classList.contains("my-3vh")) {
      el.classList.remove("d-none");
      el.classList.add("my-3vh");
    }
    else if (mdToLg.matches && !el.classList.contains("d-none")) {
      el.classList.add("d-none");
      el.classList.remove("my-3vh");
    }
  });

  dividerAll.forEach((el) => {
    el.classList.remove("d-none");
    el.classList.add("my-3vh");
  });
}
// 이벤트 리스터 등록
insertSpaceWhenMdViewPort();
window.addEventListener("resize", insertSpaceWhenMdViewPort);
