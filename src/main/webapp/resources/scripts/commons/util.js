const CALENDAR = {
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  weekHeader: 'Wk',
  dateFormat: 'yy-mm-dd',
  buttonImage: "/img/calendar.png",
  buttonImageOnly: false,
  autoSize: false,
  changeMonth: true,
  changeYear: true,
  showMonthAfterYear: true,
  yearRange: 'c-99:c+99',
  maxDate: '+2Y',
  minDate: '-10y'
};

// 0. 콤마 제거 ------------------------------------------------------------------------------------
const fnRemoveComma = (obj) => {
  return parseInt(obj.replace(/,/g, ''), 10);
};

// 0. 공급가 계산 ----------------------------------------------------------------------------------
const fnSupplyPrice = () => {
  // 콤마를 제거한 후 단가와 수량을 계산
  const unitPrice = fnRemoveComma($(`#unitPrice`).val());
  const qty = fnRemoveComma($(`#qty`).val());

  // 공급가 계산
  const supplyPrice = unitPrice * qty;

  // 계산된 공급가에 콤마 추가
  $(`#supplyPrice`).val(supplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

// 0. 천단위 콤마 추가 (input 태그 내에서 호출) ----------------------------------------------------
const fnInputNum = (() => {
  const MAX_INT_VALUE = 2147483647;
  let debounceTimer = null;

  return (obj) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const inputVal = obj.value.replace(/,/g, '');
      const numericInputVal = parseInt(inputVal);

      // 입력값이 숫자이고 빈 문자열이 아닌 경우
      if (!isNaN(numericInputVal) && inputVal !== '') {
        if (numericInputVal > MAX_INT_VALUE) {
          // 최대값을 초과하는 경우
          alert("입력 가능한 최대값을 초과하였습니다");
          obj.value = 0;
        }
        else {
          // 입력값이 유효한 경우, 콤마 추가하여 형식 지정
          obj.value = numericInputVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
      // 입력값이 숫자가 아닌 경우
      else {
        alert("숫자만 입력 가능합니다");
        obj.value = 0;
      }
    }, 100);
  };
})();

// 0. 천단위 콤마 추가 (js에서 호출) ---------------------------------------------------------------
const fnFormatNum = (num) => {

  if (num === null || num === undefined || num === '') {
    return "0";
  }

  const numericInputVal = parseFloat(num);
  if (isNaN(numericInputVal)) {
    return "0";
  }

  // 숫자를 문자열로 변환하고 천단위 콤마 추가
  return numericInputVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\.00$/, '');
};

// 0. 숫자 비율형식 변환 (소숫점 3자리 - input 태그 내에서 호출) -----------------------------------
const fnInputRate = (() => {
  const MAX_INT_VALUE = 2147483647;
  let debounceTimer = null;

  return (obj) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const inputVal = obj.value.replace(/,/g, '');

      // 입력값에 소수점이 두 개 이상 포함된 경우 체크
      if ((inputVal.match(/\./g) || []).length > 1) {
        alert("유효하지 않은 형식입니다");
        obj.value = '0.000';
        return;
      }

      if (inputVal === '') {
        return;
      }
      else if (!isNaN(parseFloat(inputVal)) && isFinite(inputVal)) {
        const numericInputVal = parseFloat(inputVal);
        if (!isNaN(numericInputVal) && numericInputVal <= MAX_INT_VALUE) {
          const decimalPlaces = (inputVal.split('.')[1] || []).length;
          if (decimalPlaces <= 3) {
            obj.value = inputVal;
          }
          else {
            obj.value = numericInputVal.toFixed(3);
          }
        }
        else {
          alert("입력 가능한 최대값을 초과하였습니다");
          obj.value = '0.000';
        }
      }
      else {
        alert("비율로 변환할 수 없는 값입니다");
        obj.value = '0.000';
      }
    }, 100);
  };
})();

// 0. 숫자 비율형식 변환 (소숫점 3자리 - js에서 호출) ----------------------------------------------
const fnFormatRate = (num) => {
  if (num === null || num === undefined || num === '') {
    return "0.000";
  }

  const numericInputVal = parseFloat(num);
  if (isNaN(numericInputVal)) {
    return "0.000";
  }

  return numericInputVal.toFixed(3);
};

// 0. 날짜 형식 변환 -------------------------------------------------------------------------------
const fnFormatDate = (value) => {

  const validFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (validFormat.test(value)) {
    return value;
  }

  const datePart = value.split(' ')[0];
  const numbersOnly = datePart.replace(/\D/g, '');

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
};

// 0. 날짜 더하기 ----------------------------------------------------------------------------------
const fnAddDate = (sDate, nDays) => {
  const divDt = sDate.split("-");
  let yy = divDt[0];
  let mm = divDt[1];
  let dd = divDt[2];

  const d = new Date(yy, mm - 1, parseInt(dd, 10) + nDays);

  yy = d.getFullYear();
  mm = d.getMonth() + 1;

  if (mm < 10) {
    mm = `0${mm}`;
  }

  dd = d.getDate();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  return `${yy}-${mm}-${dd}`;
};

// 0. time 지정 ------------------------------------------------------------------------------------
const fnSetTime = (time, target) => {
  if (!time) {
    return;
  }

  const divTime = time.split(':');
  if (divTime[0] < 10) {
    divTime[0] = '0' + parseInt(divTime[0], 10);
  }
  if (divTime[1] < 10) {
    divTime[1] = '0' + parseInt(divTime[1], 10);
  }

  const formattedTime = divTime[0] + ':' + divTime[1];
  $(`#${target}`).val(formattedTime);
}

// 0. 현재 시간 ------------------------------------------------------------------------------------
const fnCurDateTime = () => {
  const leadingZeros = (e, t) => {
    let n = "";
    e = e.toString();
    if (e.length < t) {
      for (let i = 0; i < t - e.length; i++) n += "0";
    }
    return n + e;
  }
  const e = new Date();
  const t =
    leadingZeros(e.getFullYear().toString().substr(2, 2), 2) +
    leadingZeros(e.getMonth() + 1, 2) +
    leadingZeros(e.getDate(), 2);
  const n =
    leadingZeros(e.getHours(), 2) +
    leadingZeros(e.getMinutes(), 2) +
    leadingZeros(e.getSeconds(), 2);
  return `${t}_${n}`;
}

// 0. 날짜 지정 ------------------------------------------------------------------------------------
const fnToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const mon = (now.getMonth() + 1) > 9 ? `${now.getMonth() + 1}` : `0${now.getMonth() + 1}`;
  const day = now.getDate() > 9 ? `${now.getDate()}` : `0${now.getDate()}`;

  return `${year}-${mon}-${day}`;
}

// 0. 년월 지정 ------------------------------------------------------------------------------------
const fnYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const mon = (now.getMonth() + 1) > 9 ? `${now.getMonth() + 1}` : `0${now.getMonth() + 1}`;

  return `${year}-${mon}`;
}