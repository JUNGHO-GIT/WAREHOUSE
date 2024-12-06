// 1-1. 파일 업로드 (일반) -------------------------------------------------------------------------
function fnUploadFiles(formParam) {

  var fileUploadForm = formParam;
  var tableNm = $("#tableNm").val();
  var tableKey = $("#tableKey").val();

  var formData = new FormData(fileUploadForm);
  var userFileVal = $("#userFile").val();
  var divFile = typeof userFileVal === 'string' ? userFileVal.split(".") : [];
  var fileExt = divFile[(divFile.length - 1)];

  if (!$("#userFile").val()) {
    alert("파일을 먼저 선택해 주세요");
    $("#userFile").on("focus", function () {});
    return;
  }
  if (fileExt != "jpg" && fileExt != "JPG" && fileExt != "png" && fileExt != "PNG") {
    alert("등록 불가능한 파일입니다. JPG, PNG 파일만 등록 가능합니다.");
    $("#userFile").on("focus", function () {});
    return;
  }
  $("#fileUpBtn").html("ing..");

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
      $("#fileUpBtn").html("업로드");
      $("#userFile").val("");

      // 3. 그리드에 이미지 표시
      fnGetList01();

      // 4. 상세정보에 이미지 표시
      fnShowFiles(tableNm, tableKey, "files");

      // 5. 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
      if (tableKey !== "0") {
        $("#grid01").pqGrid("setSelection", {rowIndxPage:0});
      }
    },
    error: ajaxErrorHandler
  });
};

// 1-2. 파일 업로드 (WAR) --------------------------------------------------------------------------
function fnUploadWarFiles(formParam) {

  var fileUploadForm = formParam;
  var formData = new FormData(fileUploadForm);
  var userFileVal = $("#userFile").val();
  var divFile = typeof userFileVal === 'string' ? userFileVal.split(".") : [];
  var fileExt = divFile[(divFile.length - 1)];

  if (!$("#userFile").val()) {
    alert("파일을 먼저 선택해 주세요");
    $("#userFile").on("focus", function () {});
    return;
  }
  if (fileExt != "war" && fileExt != "WAR") {
    alert("등록 불가능한 파일입니다. WAR 파일만 등록 가능합니다.");
    $("#userFile").on("focus", function () {});
    return;
  }
  $("#fileUpBtn").html("ing..");

  $.ajax({
    url: "act/uploadWarFiles",
    data: formData,
    type: "POST",
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    cache: false,
    success: (data) => {
      alert(data);
      $("#fileUpBtn").html("업로드");
      $("#userFile").val("");
    },
    error: ajaxErrorHandler
  });
};

// 2-1. 특정항목의 파일 리스트 ---------------------------------------------------------------------
function fnShowFiles(tableNm, tableKey, target) {
  var imgStyle = "cursor:pointer; margin-left:2px; border-radius:30%;";
  var imgFile = [".jpg", ".JPG", ".png", ".PNG"];
  var currentSelectedRow = null;

  $.ajax({
    url: "act/showFiles",
    data: `tableNm=${tableNm}&tableKey=${tableKey}`,
    type: "POST",
    dataType:"JSON",
    success: (data) => {

      // 1. 값 초기화
      $("#" + target).empty();
      $("#showImage").empty();

      // 2. 최신순으로 정렬
      data.reverse();

      if (currentSelectedRow !== null) {
        $("#imageRow" + currentSelectedRow).css("background-color", "");
      }
      currentSelectedRow = null;

      data.forEach(function (file, k) {
        if (imgFile.includes(`.${file.fileUrl.split(".").pop()}`)) {
          $("#" + target).append(`
            <div id="imageRow${k}" class="d-inline-block text-left pointer"
            onclick="fnShowSelectedFiles('${file.fileUrl}', ${k})">
              <img src="/imgs/pre.png"
                onclick="fnPopupImage('${file.fileUrl}');"
                style="${imgStyle}"
                loading="lazy"
              />
              <img src="/imgs/download.png"
                onclick="fnDownloadFiles('${file.fileUrl}');"
                style="${imgStyle}"
                loading="lazy"
              />
              <img src="/imgs/del.png"
                onclick="fnDeleteFiles('${file.fileSeq}', '${file.fileUrl}', '${file.fileNm}');"
                style="${imgStyle}"
                loading="lazy"
              />
              <span>${file.fileUrl}</span>
            </div>
          `);
        }
      });
      var firstImg = data.find(function (file) {
        return imgFile.includes(`.${file.fileUrl.split(".").pop().toLowerCase()}`);
      });
      if (firstImg) {
        fnShowSelectedFiles(firstImg.fileUrl, 0);
      }
    },
    error: ajaxErrorHandler
  });
};

// 2-2. 리스트 이미지 클릭시 표시 ------------------------------------------------------------------
function fnShowSelectedFiles(fileUrl, rowId) {

  var imgUrl = "viewFiles?fileUrl=" + fileUrl;

  $("#showImage").html(`<img src="${imgUrl}" class="cards-image" loading="lazy" />`);
  $(`[id^="imageRow"]`).css("background-color", "");
  $("#imageRow" + rowId).css("background-color", "#ccc");

  /* currentSelectedRow = rowId; */
};

// 2-3. 리스트 이미지 클릭시 팝업 ------------------------------------------------------------------
function fnPopupImage(fileUrl) {
  var valUrl = "viewFiles?fileUrl=" + fileUrl;
  window.open(valUrl, "ImageViewer", "width=800, height=600, scrollbars=yes, resizable=yes");
};

// 3. 파일 다운로드 --------------------------------------------------------------------------------
function fnDownloadFiles(fileUrl) {
  location.href = `/downloadFiles?fileUrl=${fileUrl}`;
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
    "tableNm": $("#tableNm").val(),
    "tableKey": $("#tableKey").val(),
    "keyColumn": $("#keyColumn").val(),
    "flagYN": "N"
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
      $("#fileUpBtn").html("업로드");
      $("#userFile").val("");

      // 3. 그리드에 이미지 표시
      fnGetList01();

      // 4. 상세정보에 이미지 표시
      fnShowFiles(tableNm, tableKey, "files");

      // 5. 업로드 이후 해당 row에 포커스 (신규등록이 아닐 경우에만)
      if (tableKey !== "0") {
        $("#grid01").pqGrid("setSelection", {rowIndxPage:0});
      }
    },
    error: ajaxErrorHandler
  });
};