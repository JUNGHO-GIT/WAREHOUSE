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
function checkBoxRender (data) {
  return (/* javascript */`
    <input type="checkbox" class="chkBox" ${data.rowData.checkStatus ? "checked" : ""} />
  `);
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
function updateSummary (target="", data={}) {
  return [{
    pq_rowcls: "summary-row",
    fileUrl: "",
    [`${target}Nm`]: `<div class="fs-1-0rem fw-700 py-2vh">Total</div>`,
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
