// -------------------------------------------------------------------------------------------------
var fnFindCd = function(targetNm, targetCd, targetId, event) {

  // ex. house, houseCd, houseNm
  var str = targetId;
  var strCd = `${str}Cd`;
  var strNm = `${str}Nm`;

  // ex. House, HouseCd, HouseNm
  var upStr = str.charAt(0).toUpperCase() + str.slice(1);
  var upStrCd = `${upStr}Cd`;
  var upStrNm = `${upStr}Nm`;

  // ex. 창고, 거래처 ...
  var strKo;
  if (str === "prod") {
    strKo = "제품";
  }
  else if (str === "resrc") {
    strKo = "자재";
  }
  else if (str === "house") {
    strKo = "창고";
  }
  else if (str === "comp") {
    strKo = "거래처";
  }
  else {
    strKo = str;
  }

  // Enter 키를 누르면 페이지 새로고침 방지
  if (event && event.key === "Enter") {
    event.preventDefault();
  }
  if (event && event.key !== "Enter") {
    return;
  }

  // 이벤트 한 번만 설정
  $(`#${str}`).on("change", function() {
    $(`#${strCd}`).val(this.value);
  });

  $.ajax({
    url: `act/find${upStrCd}`,
    data: `findNm=${targetNm}&findCd=${targetCd}`,
    type: "POST",
    dataType: "JSON",
    beforeSend: function(xmlHttpRequest) {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: function(data) {

      // 1. targetNm 과 targetCd 가 모두 없는 경우 (전체 조회인 경우)
      if (!targetNm && !targetCd) {

        $(`#${str}`).empty();
        $(`#${str}`).html(`<option value="">==${strKo}==</option>`);

        for (var k = 0; k < data.length; k++) {
          var isSelected = targetCd === data[k][strCd] ? "selected" : "";
          var option = `
            <option value="${data[k][strCd]}" ${isSelected}>
              ${data[k][strNm]}
            </option>
          `;
          $(`#${str}`).append(option);
        }
      }
      // 2-1. targetNm 과 targetCd 가 있는 경우 (결과 없는 경우)
      else if (data == null || data.length === 0) {
        $(`#${str}`).empty();
        $(`#${str}`).html(`<option value="">==${strKo}==</option>`);
      }
      // 2-2. targetNm 과 targetCd 가 있는 경우 (결과 있는 경우)
      else if (data != null && data.length > 0) {

        $(`#${str}`).empty();
        $(`#${str}`).html(`<option value="">==${strKo}==</option>`);

        for (var k = 0; k < data.length; k++) {
          var isSelected = targetCd === data[k][strCd] ? "selected" : "";
          var option = `
            <option value="${data[k][strCd]}" ${isSelected}>
              ${data[k][strNm]}
            </option>
          `;
          // append (o)
          $(`#${str}`).append(option);
        }
      }
      // 선택된 option에 따라 #strCd 값을 갱신
      $(`#${strCd}`).val($(`#${str}`).val());
    },
    error: function(request, status, error) {
      if (request.status === 477) {
        alert("세션이 종료 되었습니다.");
        fnGoPage("reLogin");
      }
      else {
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    }
  });
};

// 0.fnGetCdWithNm ---------------------------------------------------------------------------------
var fnGetCdWithNm = function(targetNm, targetVal, rowIndx, gridCd) {
  return new Promise(function(resolve, reject) {

    // ex. grid00
    var gridId = `#${gridCd}`;

    // ex. house, houseCd, houseNm
    var str = targetNm.slice(0, -2);
    var strCd = `${str}Cd`;
    var strNm = `${str}Nm`;

    // ex. House, HouseCd, HouseNm
    var upStr = str.charAt(0).toUpperCase() + str.slice(1);
    var upStrCd = `${upStr}Cd`;
    var upStrNm = `${upStr}Nm`;

    // ex. 창고, 거래처 ...
    var strKo;
    if (str === "prod") {
      strKo = "제품";
    }
    else if (str === "resrc") {
      strKo = "자재명";
    }
    else if (str === "house") {
      strKo = "창고명";
    }
    else if (str === "comp") {
      strKo = "거래처명";
    }
    else {
      strKo = str;
    }

    // 만약 해당 그리드 row에 strCd 값이 있으면 skip
    // strNm 값이 변경되었을 경우에는 strCd 값도 변경되어야 함
    var rowData = $(gridId).pqGrid("getRowData", {rowIndx: rowIndx});
    if (rowData[strCd] && rowData[strNm] === targetVal) {
      resolve(console.log("fnGetCdWithNm : skip"));
      return;
    }

    $.ajax({
      url: `act/find${upStrCd}`,
      data: `findNm=${targetVal}`,
      type: "POST",
      dataType: "JSON",
      success: function(myJsonData) {

        var dynamicRowData = {};
        dynamicRowData[strCd] = "";

        // 1. 값이 0개인 경우 ----------------------------------------------------------------------
        if (myJsonData.length === 0) {
          alert(`존재하지 않는 ${strKo}이 있습니다. ${strKo}를 다시 입력해주세요.`);
          dynamicRowData = {[strCd]:"", [strNm]:""};
        }
        // 2-1. 값이 1개인 경우 --------------------------------------------------------------------
        else if (myJsonData.length === 1) {
          if (myJsonData[0][strNm] === targetVal) {
            dynamicRowData[strCd] = myJsonData[0][strCd];
          }
          else {
            alert(`존재하지 않는 ${strKo}이 있습니다. ${strKo}를 다시 입력해주세요.`);
            dynamicRowData = {[strCd]:"", [strNm]:""};
          }
        }
        // 2-2. 값이 1개 이상인 경우 ---------------------------------------------------------------
        else if (myJsonData.length > 1) {
          var exactMatch = myJsonData.find(function(item) {
            return item[strNm] === targetVal;
          });
          if (exactMatch) {
            dynamicRowData[strCd] = exactMatch[strCd];
          }
          else {
            var partialMatches = myJsonData.filter(function(item) {
              return item[strNm].startsWith(targetVal);
            });
            if (partialMatches.length === 1) {
              dynamicRowData[strCd] = partialMatches[0][strCd];
            }
            else {
              alert(`일치하는 ${strKo}이 여러개입니다. ${strKo} 이름을 다시 입력해주세요.`);
              dynamicRowData = {[strCd]:"", [strNm]:""};
            }
          }
        }
        // 3. 그리드 업데이트 ----------------------------------------------------------------------
        $(gridId).pqGrid("updateRow", {
          rowIndx: rowIndx,
          row: dynamicRowData
        });
        resolve(console.log("fnGetCdWithNm : success"));
      },
      error: function (request, status, error) {
        if (request.status == 477) {
          alert("세션이 종료 되었습니다.");
          fnGoPage("reLogin");
        }
        else {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          reject("fnGetCdWithNm : failed" + error);
        }
      }
    });
  });
};

// 0. 일괄 입출고 탭 전환 --------------------------------------------------------------------------
var curTab = "in";
var fnSwitchTab = function (newTab) {
  if (curTab !== newTab) {

    // 버튼 스타일 변경
    document.getElementById(curTab + "Tab").classList.remove("active");
    document.getElementById(newTab + "Tab").classList.add("active");

    // 라디오 버튼 체크
    document.querySelector(`input[name=inOut][value=${newTab}]`).checked = true;

    // 그리드 제목 변경
    var title = newTab === "in" ? "일괄 입고" : "일괄 출고";
    $("#grid02").pqGrid("option", "title", title);
    $("#grid02").pqGrid("refreshDataAndView");

    // 현재 탭 업데이트
    curTab = newTab;
  }
}

// 0. 콤마 제거 -----------------------------------------------------------------------------------
var fnRemoveComma = function (obj) {
  return parseInt(obj.replace(/,/g, ''), 10);
};

// 0. 공급가 계산 ---------------------------------------------------------------------------------
var fnSupplyPrice = function () {
  // 콤마를 제거한 후 단가와 수량을 계산
  var unitPrice = fnRemoveComma($("#unitPrice").val());
  var qty = fnRemoveComma($("#qty").val());

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
var fnFormatNum = function (num) {
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


// 0. 숫자 비율형식 변환 (소숫점 3자리 - input 태그 내에서 호출) ---------------------------------->
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
var fnFormatRate = function (num) {
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
var fnFormatDate = function (value) {
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
var fnGridPopup = function (target, m) {

  if (m == "on") {
    $("#" + target).css("visibility", "visible");
  }
  else {
    $("#" + target).css("visibility", "hidden");
  }

};

var fnLayerTop = function (layer) {
  $("#" + layer).css("z-index", "100");
  $("#popup2").draggable({
    cursor: "move",
    handle: "#popTop",
    cancel: "#popBody"
  });
};

// -------------------------------------------------------------------------------------------------
var fnSetTm = function (t, target) {
  if (t) {
    var divT = t.split(":");
    if (divT[0] < 10) divT[0] = "0" + parseInt(divT[0], 10);
    if (divT[1] < 10) divT[1] = "0" + parseInt(divT[1], 10);
    t = divT[0] + ":" + divT[1];
    $("#" + target).val(t);
  }
};

var fnSetTmFormat = function (tm) {
  if (tm) {
    var hr = tm.substr(0, 2);
    var min = tm.substr(2, 2);

    return hr + ":" + min;
  }
};

//## 행당월의 처음날과 마지막날을 반환
var fnSetMonth = function (mnth, dt) {
  var divDt = dt.split("-");

  var nextMnth = parseInt(mnth, 10) + 1;
  if (nextMnth < 10) nextMnth = '0' + nextMnth;
  var endDt = divDt[0] + '-' + nextMnth + '-01';
  endDt = fnDateAdd(endDt, -1);

  if (mnth < 10) mnth = '0' + mnth;
  var startDt = divDt[0] + '-' + mnth + '-01';

  $("#startDt").val(startDt);
  $("#endDt").val(endDt);
  //return terms;
};

var fnDateAdd = function (sDate, nDays) {
  var divDt = sDate.split("-");
  var yy = divDt[0];
  var mm = divDt[1];
  var dd = divDt[2];

  d = new Date(yy, mm - 1, parseInt(dd, 10) + nDays);

  yy = d.getFullYear();
  mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
  dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

  return '' + yy + '-' + mm + '-' + dd;
};

var fnToday = function () {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

  var chan_val = year + '-' + mon + '-' + day;

  return chan_val;
};

var fnYearMonth = function () {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  /* var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();*/

  var yyyymm = year + '-' + mon;

  return yyyymm;
};


var fnTodayMin = function () {
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

// 0. 부모의 스크립트와 스타일을 iframe에 추가 -----------------------------------------------------
function fnInjectParentScriptsAndStyles (iframe) {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // 부모의 스크립트를 iframe에 추가 (중복 방지)
  document.querySelectorAll("script").forEach((parentScript) => {
    if (!iframeDoc.querySelector(`script[src="${parentScript.src}"]`)) {
      const script = iframeDoc.createElement("script");
      script.src = parentScript.src;
      iframeDoc.head.appendChild(script);
    }
  });

  // 부모의 스타일을 iframe에 추가 (중복 방지)
  document.querySelectorAll("link[rel='stylesheet']").forEach((parentStyle) => {
    if (!iframeDoc.querySelector(`link[href="${parentStyle.href}"]`)) {
      const style = iframeDoc.createElement("link");
      style.rel = "stylesheet";
      style.href = parentStyle.href;
      iframeDoc.head.appendChild(style);
    }
  });
};