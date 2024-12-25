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
  // summary 는 건너뛰기
  if (data.rowData.pq_rowcls === `summary-row`) {
    return undefined;
  }
  return data.rowData.lowStock === 1 ? `<div class="fs-1-2rem red">●</div>` : "";
};

// -------------------------------------------------------------------------------------------------
function calcSum (data=[], dataIndx="") {
  return (
    data.reduce((acc, row) => {
      const value = Number(row[dataIndx]);
      return acc + (isNaN(value) ? 0 : value);
    }, 0).toLocaleString()
  );
}

// -------------------------------------------------------------------------------------------------
function renderImage (data) {

  const tableNm = getValue(getById("tableNm"));

  // summary 는 건너뛰기
  if (data.rowData.pq_rowcls === `summary-row`) {
    return "";
  }
  return (/* javascript */`
    <div class="d-center w-70px h-70px p-5px">
      <img
        alt="gridImage"
        src="viewFiles?tableNm=${tableNm}&fileUrl=${data.rowData.fileUrl || 'noGridImage.webp'}"
        class="w-100p h-100p radius-1 border-2"
        loading="lazy"
      />
    </div>
  `);
};

// -------------------------------------------------------------------------------------------------
function renderZero (data) {
  return data.cellData ? data.cellData.toLocaleString() : "0";
}

// -------------------------------------------------------------------------------------------------
function checkBoxRender (data) {
  return (/* javascript */`
    <input type="checkbox" class="chkBox" ${data.rowData.checkStatus ? "checked" : ""} />
  `);
}

// -------------------------------------------------------------------------------------------------
function updateTitle (titleKo, data) {

  const nonCalc = [
    "거래처", "창고", "입출고 내역", "출하", "제품 출고 현황", "연간 입고 현황", "연간 출고 현황", "연간 재고 현황", "예정 내역", "제품 정보", "자재 정보", "BOM",
  ];

  if (nonCalc.some((item) => titleKo.includes(item))) {
    return (/* javascript */`
      <div class="d-row-left">
        <div class="d-row-center">
          <div class="fs-0-8rem fw-600">
            ${titleKo}
          </div>
        </div>
      </div>
    `);
  }
  return (/* javascript */`
    <div class="d-row-left">
      <div class="d-row-center">
        <div class="fs-0-8rem fw-600">
          ${titleKo}
        </div>
      </div>
      <div class="d-row-center ml-auto mr-50px">
        <div class="fs-0-8rem red">●</div>
        <div class="fs-0-8rem ml-5px mr-5px">안전재고: </div>
        <div class="fs-0-8rem red">${calcLowStock(data)}</div>
      </div>
    </div>
  `);
};

// -------------------------------------------------------------------------------------------------
function updateSummary (target="", data=[]) {
  return [{
    pq_rowcls: "summary-row",
    fileUrl: "",
    [`${target}Nm`]: `<div class="fs-1-0rem fw-500 py-2vh">Total</div>`,
    lowStock: calcSum(data, "lowStock"),
    protectedQty: calcSum(data, "protectedQty"),
    inQty: calcSum(data, "inQty"),
    outQty: calcSum(data, "outQty"),
    qty: calcSum(data, "qty")
  }];
};
