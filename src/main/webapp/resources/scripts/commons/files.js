// 1-1. 파일 업로드 (일반) -------------------------------------------------------------------------
function fnUploadFiles(formParam) {

  const fileUploadForm = formParam;
  const tableNm = $(`#tableNm`).val();
  const tableKey = $(`#tableKey`).val();

  const formData = new FormData(fileUploadForm);
  const userFileVal = $(`#userFile`).val();
  const divFile = typeof userFileVal === 'string' ? userFileVal.split(".") : [];
  const fileExt = divFile[(divFile.length - 1)];

  if (!$(`#userFile`).val()) {
    alert("파일을 먼저 선택해 주세요");
    $(`#userFile`).trigger("focus");
    return;
  }
  if (fileExt != "jpg" && fileExt != "JPG" && fileExt != "png" && fileExt != "PNG") {
    alert("등록 불가능한 파일입니다");
    $(`#userFile`).trigger("focus");
    return;
  }
  $(`#fileUpBtn`).html("ing..");

  $.ajax({
    url: "act/uploadFiles",
    data: formData,
    type: "POST",
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    cache: false,
    success: (data) => {
      // 1. alert
      alert(data);

      // 2. 요소 초기화
      $(`#fileUpBtn`).html("업로드");
      $(`#userFile`).val("");

      // 3. 그리드에 이미지 표시
      fnGetList01();

      // 4. 상세정보에 이미지 표시
      fnShowFiles(tableNm, tableKey, "files");

      // 5. 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
      if (tableKey !== "0") {
        $(`#grid01`).pqGrid("setSelection", {rowIndxPage:0});
      }
    },
    error: fnAjaxErrorHandler
  });
};

// 2-1. 특정항목의 파일 리스트 ---------------------------------------------------------------------
function fnShowFiles(tableNm, tableKey, target) {

  const $target = $(`#${target}`);
  const imgStyle = `style="cursor:pointer; margin-left:2px; border-radius:30%;"`;
  const imgFile = [".jpg", ".JPG", ".png", ".PNG", ".webp", ".WEBP"];
  let currentSelectedRow = null;

  $.ajax({
    url: "act/showFiles",
    data: `tableNm=${tableNm}&tableKey=${tableKey}`,
    type: "POST",
    dataType:"JSON",
    success: (data) => {

      // 1. 값 초기화
      $target.empty();
      $(`#showImage`).empty();

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
          <div
            id="imageRow${k}"
            name="imageRow"
            class="d-inline-block text-left pointer"
            onclick="fnShowSelectedFiles('${file.fileUrl}', ${k})"
          >
            <i class="fas fa-image" onclick="fnPopupImage('${file.fileUrl}');" ${imgStyle}></i>
            <i class="fas fa-download" onclick="fnDownloadFiles('${file.fileUrl}');" ${imgStyle}></i>
            <i class="fas fa-trash-alt" onclick="fnDeleteFiles('${file.fileSeq}', '${file.fileUrl}', '${file.fileNm}');" ${imgStyle}></i>
            <span>${file.fileUrl}</span>
          </div>
        `);
        $target.append(imgBox);
      });
      const firstImg = data.find((file) => {
        return imgFile.includes(`.${file.fileUrl.split(".").pop().toLowerCase()}`);
      });
      firstImg && fnShowSelectedFiles(firstImg.fileUrl, 0);
    },
    error: fnAjaxErrorHandler
  });
};

// 2-2. 리스트 이미지 클릭시 표시 ------------------------------------------------------------------
function fnShowSelectedFiles (fileUrl, rowId) {

  const imgUrl = `viewFiles?fileUrl=${fileUrl}`;

  $(`#showImage`).html(`<img src="${imgUrl}" class="cards-image" loading="lazy" />`);
  $(`[id^="imageRow"]`).css("background-color", "");
  $(`#imageRow${rowId}`).css("background-color", "#ccc");
};

// 2-3. 리스트 이미지 클릭시 팝업 ------------------------------------------------------------------
function fnPopupImage (fileUrl) {
  const popupUrl = `viewFiles?fileUrl=${fileUrl}`;
  window.open(popupUrl, "ImageViewer", "width=800, height=600, scrollbars=yes, resizable=yes");
};

// 3. 파일 다운로드 --------------------------------------------------------------------------------
function fnDownloadFiles(fileUrl) {
  location.href = `downloadFiles?fileUrl=${fileUrl}`;
};

// 4. 파일 삭제 ------------------------------------------------------------------------------------
function fnDeleteFiles(fileSeq, fileUrl, fileNm) {

  if (!confirm("업로드된 파일을 삭제 하시겠습니까?")) {
    return;
  }

  const param = {
    "fileSeq": fileSeq,
    "fileUrl": fileUrl,
    "fileNm": fileNm,
    "tableNm": $(`#tableNm`).val(),
    "tableKey": $(`#tableKey`).val(),
    "keyColumn": $(`#keyColumn`).val(),
    "flagYn": "N"
  };

  $.ajax({
    url: "act/saveFiles",
    data: JSON.stringify(param),
    type: "POST",
    dataType:"JSON",
    contentType: "application/json; charset=UTF-8",
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true");
    },
    success: (data) => {
      // 1. alert
      alert(data.result);

      // 2. 요소 초기화
      $(`#fileUpBtn`).html("업로드");
      $(`#userFile`).val("");

      // 3. 그리드에 이미지 표시
      fnGetList01();

      // 4. 상세정보에 이미지 표시
      fnShowFiles(param.tableNm, param.tableKey, "files");

      // 5. 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
      if (param.tableKey !== "0") {
        $(`#grid01`).pqGrid("setSelection", {rowIndxPage:0});
      }
    },
    error: fnAjaxErrorHandler
  });
};