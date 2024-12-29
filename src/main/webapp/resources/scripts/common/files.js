// 1-1. 파일 업로드 (일반) -------------------------------------------------------------------------
const fnUploadFiles = (formParam) => {

  const $grid = $(`#grid01`);
  const fileUploadForm = getFormByName(formParam);
  const tableNm = getValue(getById("tableNm"));
  const tableKey = getValue(getById("tableKey"));

  const formData = new FormData(fileUploadForm);
  const userFileVal = getValue(getById("userFile"));
  const divFile = typeof userFileVal === 'string' ? userFileVal.split(".") : [];
  const fileExt = divFile[(divFile.length - 1)];

  if (!userFileVal) {
    alert("파일을 먼저 선택해 주세요");
    getById("userFile").focus();
    return;
  }
  if (fileExt !== "jpg" && fileExt !== "JPG" && fileExt !== "png" && fileExt !== "PNG") {
    alert("등록 불가능한 파일입니다");
    getById("userFile").focus();
    return;
  }
  getById("fileUpBtn").innerHTML = "ing..";

  fetch(`act/uploadFiles`, {
    method: `POST`,
    body: formData,
    headers: {
      "AJAX": "true"
    }
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    alert(data.result);

    // 요소 초기화
    getById("userFile").innerHTML = "";
    getById("fileDisplayedName").innerHTML = "";
    getById("fileUpBtn").innerHTML = "업로드";

    // 그리드에 이미지 표시
    fnGetList01();

    // 상세정보에 이미지 표시
    fnShowFiles(tableNm, tableKey, "fileList");

    // 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
    if (tableKey !== "0") {
      $grid.pqGrid("setSelection", {rowIndxPage:0});
    }
  })
  .catch((err) => {
    if (err.status === 477) {
      alert("세션이 종료 되었습니다");
      fnGoPage("reLogin");
    }
    else {
      alert(`code: ${err.status}\n message: ${err.statusText}`);
    }
    console.error(err);
  });
};

// 2-1. 특정항목의 파일 리스트 ---------------------------------------------------------------------
const fnShowFiles = (tableNm, tableKey, target) => {

  let currentSelectedRow = null;
  const $target = $(`#${target}`);
  const imgFile = [".jpg", ".JPG", ".png", ".PNG", ".webp", ".WEBP"];

  fetch(`act/showFiles`, {
    method: `POST`,
    body: `tableNm=${tableNm}&tableKey=${tableKey}`,
    headers: {
      "AJAX": "true",
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {

    // 1. 값 초기화
    $target.empty();
    $(`#fileDetail`).empty();

    // 2. 최신순으로 정렬
    data.reverse();

    if (currentSelectedRow) {
      $(`#imageRow${currentSelectedRow}`).css("background-color", "");
    }
    currentSelectedRow = null;

    data.forEach((file, k) => {
      if (!imgFile.includes(`.${file.fileUrl.split(".").pop()}`)) {
        return;
      }
      const imgBox = (/* javascript */`
        <div id="imageRow-${k}" name="imageRow-${k}" class="d-row-left h-30px p-5px">
          <div
            class="fs-0-9rem fa fa-picture-o radius-1 mr-10px success hover"
            onclick="fnPopupImage('${tableNm}', '${file.fileUrl}')"
          ></div>
          <div
            class="fs-0-9rem fa fa-download radius-1 mr-10px primary hover"
            onclick="fnDownloadFiles('${tableNm}', '${file.fileUrl}')"
          ></div>
          <div
            class="fs-0-9rem fa fa-trash radius-1 mr-10px danger hover"
            onclick="fnDeleteFiles('${tableNm}', '${file.fileSeq}', '${file.fileUrl}', '${file.fileNm}')"
          ></div>
          <div
            class="fs-0-7rem fw-600 dark hover"
            onclick="fnShowSelectedFiles('${tableNm}', '${file.fileUrl}', ${k})"
          >
            ${file.fileNm}
          </div>
        </div>
      `);
      $target.append(imgBox);
    });
    const firstImg = data.find((file) => {
      return imgFile.includes(`.${file.fileUrl.split(".").pop().toLowerCase()}`);
    });
    firstImg && fnShowSelectedFiles(tableNm, firstImg.fileUrl, 0);
  })
  .catch((err) => {
    if (err.status === 477) {
      alert("세션이 종료 되었습니다");
      fnGoPage("reLogin");
    }
    else {
      alert(`code: ${err.status}\n message: ${err.statusText}`);
    }
    console.error(err);
  });
};

// 2-2. 리스트 이미지 클릭시 표시 ------------------------------------------------------------------
const fnShowSelectedFiles = (tableNm, fileUrl, rowId) => {

  const img = (/* javascript */`
    <img
      alt="fileDetail"
      src="viewFiles?tableNm=${tableNm}&fileUrl=${fileUrl}"
      class="h-100p radius-1 shadow-1"
      loading="lazy"
    />
  `);

  $(`#fileDetail`).empty().append(img);
  $(`[id^="imageRow"]`).css("background-color", "");
  $(`#imageRow-${rowId}`).css("background-color", "#f1f1f1");
};

// 2-3. 리스트 이미지 클릭시 팝업 ------------------------------------------------------------------
const fnPopupImage = (tableNm, fileUrl) => {
  const popupUrl = `viewFiles?tableNm=${tableNm}&fileUrl=${fileUrl}`;
  window.open(popupUrl, "ImageViewer", "width=800, height=600, scrollbars=yes, resizable=yes");
};

// 3. 파일 다운로드 --------------------------------------------------------------------------------
const fnDownloadFiles = (tableNm, fileUrl) => {
  goPage(`downloadFiles?tableNm=${tableNm}&fileUrl=${fileUrl}`);
};

// 4. 파일 삭제 ------------------------------------------------------------------------------------
const fnDeleteFiles = (tableNm, fileSeq, fileUrl, fileNm) => {

  const $grid = $(`#grid01`);

  if (!confirm("업로드된 파일을 삭제 하시겠습니까?")) {
    return;
  }

  const param = {
    "fileSeq": fileSeq,
    "fileUrl": fileUrl,
    "fileNm": fileNm,
    "tableNm": tableNm,
    "tableKey": $(`#tableKey`).val(),
    "keyColumn": $(`#keyColumn`).val(),
    "flagYn": "N"
  };

  fetch(`act/saveFiles`, {
    method: `POST`,
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json",
      "AJAX": "true"
    }
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    alert(data.result);

    // 요소 초기화
    getById("userFile").innerHTML = "";
    getById("fileDisplayedName").innerHTML = "";
    getById("fileUpBtn").innerHTML = "업로드";

    // 그리드에 이미지 표시
    fnGetList01();

    // 상세정보에 이미지 표시
    fnShowFiles(param.tableNm, param.tableKey, "fileList");

    // 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
    if (param.tableKey !== "0") {
      $grid.pqGrid("setSelection", {rowIndxPage:0});
    }
  })
  .catch((err) => {
    if (err.status === 477) {
      alert("세션이 종료 되었습니다");
      fnGoPage("reLogin");
    }
    else {
      alert(`code: ${err.status}\n message: ${err.statusText}`);
    }
    console.error(err);
  });
};

// 0. 업로드한 파일 이름 표시 ---------------------------------------------------------------------
(() => {
  const userFile = getById("userFile");
  userFile && userFile.addEventListener("change", () => {
    const userFileVal = getValue(userFile);
    const fileName = typeof userFileVal === 'string' ? userFileVal.split("\\").pop() : "";
    getById("fileDisplayedName").innerHTML = fileName;
  });
})();