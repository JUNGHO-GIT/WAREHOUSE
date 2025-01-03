package com.WAREHOUSE.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import com.WAREHOUSE.container.Files;
import com.WAREHOUSE.dao.FilesDAO;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class FilesCTRL {

  @Value("${storage-path}")
  private String STORAGE_PATH;

  @Value("${storage-main}")
  private String STORAGE_MAIN;

  @Value("${storage-folder}")
  private String STORAGE_FOLDER;

  @Value("${storage-empty}")
  private String STORAGE_EMPTY;

  private final FilesDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listFiles"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listFiles (
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey
  ) throws Exception {
    try {
      ArrayList<Files> list = dao.listFiles(tableNm, tableKey);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/showFiles"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showFiles (
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey
  ) throws Exception {
    try {
      List<Map<String, Object>> showFiles = dao.showFiles(tableNm, tableKey);
      return ResponseEntity.ok(showFiles);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/uploadFiles"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> uploadFiles (
    @RequestParam(value="userFile", required=false) MultipartFile multipartFile,
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey,
    @RequestParam(value="keyColumn", required=false) String keyColumn,
    @RequestParam(value="fileSeq", required=false) Integer fileSeq,
    @SessionAttribute(value="userId", required=false) String issueId
  ) throws Exception {

    // 1. 보안을 위해 UUID 사용
    UUID uuid = UUID.randomUUID();
    String uuidStr = String.valueOf(uuid).substring(0, 8);

    String fileNm = multipartFile.getOriginalFilename();
    String fileExt = fileNm.substring(fileNm.lastIndexOf(".") + 1);
    String fileUrl = String.format(
      "%s_%s.%s",
      LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")),
      uuidStr,
      fileExt
    );

    HashMap<String, Object> map = new HashMap<String, Object>();
    try {
      Files files = new Files();
      files.setFileSeq(fileSeq);
      files.setFileUrl(fileUrl);
      files.setFileNm(fileNm);
      files.setTableNm(tableNm);
      files.setTableKey(tableKey);
      files.setFlagYn("Y");
      files.setIssueId(issueId);

      String fileName = String.valueOf(files.getFileUrl());
      byte[] bytes = multipartFile.getBytes();
      Storage storage = StorageOptions.getDefaultInstance().getService();

      // blobId 생성
      BlobId blobId = BlobId.of(STORAGE_MAIN, STORAGE_FOLDER + "/" + tableNm + "/" + fileName);

      BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
      .setContentType(multipartFile.getContentType())
      .setContentDisposition("inline; filename=\"" + fileName + "\"")
      .build();

      Blob blob = storage.create(blobInfo, bytes);
      blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

      dao.saveFiles(files);
      dao.updateIssueDt(tableNm, tableKey, keyColumn);
      map.put("result", "업로드 되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "업로드 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveFiles"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveFiles (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute(value="userId", required=false) String userId
  ) throws Exception {

    String tableNm = String.valueOf(param.get("tableNm"));
    String tableKey = String.valueOf(param.get("tableKey"));
    String keyColumn = String.valueOf(param.get("keyColumn"));

    Map<String, Object> map = new HashMap<String, Object>();
    try {
      Files file = new Files();
      file.setFileSeq(Integer.parseInt(String.valueOf(param.get("fileSeq"))));
      file.setTableNm(String.valueOf(param.get("tableNm")));
      file.setTableKey(String.valueOf(param.get("tableKey")));
      file.setFileUrl(String.valueOf(param.get("fileUrl")));
      file.setFileNm(String.valueOf(param.get("fileNm")));
      file.setFlagYn(String.valueOf(param.get("flagYn")));
      file.setIssueId(String.valueOf(param.get("issueId")));

      dao.saveFiles(file);
      dao.updateIssueDt(tableNm, tableKey, keyColumn);

      map.put("result", file.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value={"/viewFiles"}, produces={"application/octet-stream; charset=UTF-8"})
  public ResponseEntity<?> viewFiles(
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="fileUrl", required=false) String fileUrl
  ) throws Exception {

    // storage 객체 생성
    Storage storage = StorageOptions.getDefaultInstance().getService();

    // blobId 생성
    BlobId blobId = BlobId.of(STORAGE_MAIN, STORAGE_FOLDER + "/" + tableNm + "/" + fileUrl);
    Blob blob = storage.get(blobId);

    // fileContent 객체 생성
    byte[] fileContent = null;
    String fileExt = fileUrl.substring(fileUrl.lastIndexOf(".") + 1);
    String contentType = "";

    // 파일 확장자에 따른 Content-Type 설정
    if (fileExt.equals("jpg") || fileExt.equals("jpeg")) {
      contentType = "image/jpeg";
    }
    else if (fileExt.equals("png")) {
      contentType = "image/png";
    }
    else if (fileExt.equals("webp")) {
      contentType = "image/webp";
    }
    else if (fileExt.equals("pdf")) {
      contentType = "application/pdf";
    }
    else {
      contentType = "application/octet-stream";
    }

    // 파일이 존재하지 않을 경우 처리
    if (blob == null || !blob.exists()) {
      URL emptyImageUrl = new URL(STORAGE_EMPTY);
      fileContent = emptyImageUrl.openStream().readAllBytes();

      return ResponseEntity.ok()
      .header("Content-Description", "Default Image Data")
      .header("Cache-Control", "max-age=2592000, public")
      .contentType(MediaType.parseMediaType("image/webp"))
      .body(fileContent);
    }

    try {
      // 파일 데이터 읽기
      fileContent = blob.getContent();

      // ResponseEntity로 응답 생성
      return ResponseEntity.ok()
      .header("Content-Description", "File Transfer")
      .header("Content-Disposition", "inline; filename=\"" + fileUrl + "\"")
      .header("Content-Transfer-Encoding", "binary")
      .contentType(MediaType.parseMediaType(contentType))
      .contentLength(fileContent.length)
      .body(fileContent);
    }
    catch (Exception e) {
      e.printStackTrace();
      String result = "파일 다운로드 중 오류가 발생했습니다.";
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/downloadFiles"}, produces={"application/octet-stream; charset=UTF-8"})
  public void downloadFiles(
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="fileUrl", required=false) String fileUrl,
    @RequestHeader(value="User-Agent", required=false) String userAgent,
    HttpServletResponse response
  ) throws Exception {

    try {
      java.io.File downloadFile = null;
      String encodedFileName = "";

      // User-Agent에 따른 파일명 인코딩
      if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
        encodedFileName = URLEncoder.encode(fileUrl, "UTF-8").replaceAll("\\+", "%20");
      }
      else {
        encodedFileName = new String(fileUrl.getBytes("UTF-8"), "ISO-8859-1");
      }

      // 엑셀 파일 다운로드인 경우
      if (fileUrl.contains(".xlsx") || fileUrl.contains(".xls")) {
        ClassPathResource resource = new ClassPathResource("xls/" + fileUrl);
        downloadFile = resource.getFile();
      }

      // 이미지 파일 다운로드인 경우
      else {
        // storage 객체 생성
        Storage storage = StorageOptions.getDefaultInstance().getService();

        // blobId 생성
        BlobId blobId = BlobId.of(STORAGE_MAIN, STORAGE_FOLDER + "/" + tableNm + "/" + fileUrl);
        Blob blob = storage.get(blobId);

        // 파일이 존재하지 않을 경우 처리
        if (blob == null || !blob.exists()) {
          URL emptyImageUrl = new URL(STORAGE_EMPTY);
          downloadFile = java.nio.file.Files.createTempFile("emptyImage", ".tmp").toFile();
          try (
            InputStream in = emptyImageUrl.openStream();
            OutputStream out = new FileOutputStream(downloadFile);
          ) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
              out.write(buffer, 0, bytesRead);
            }
          }
        }
        else {
          downloadFile = java.nio.file.Files.createTempFile("downloadedFile", ".tmp").toFile();
          blob.downloadTo(downloadFile.toPath());
        }
      }

      byte[] fileContent = java.nio.file.Files.readAllBytes(downloadFile.toPath());
      String contentType = java.nio.file.Files.probeContentType(downloadFile.toPath());
      if (contentType == null) {
        contentType = "application/octet-stream";
      }

      // 파일 다운로드 응답 생성
      response.setContentType(contentType);
      response.setContentLength(fileContent.length);
      response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");

      try (OutputStream out = response.getOutputStream()) {
        out.write(fileContent);
      }
      catch (IOException e) {
        e.printStackTrace();
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/exportExcel"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> postExportExcel(
    @RequestParam(value="pq_data", required=false) String pqData,
    @RequestParam(value="pq_ext", required=false) String pqExt,
    @RequestParam(value="pq_decode", required=false) Boolean pqDecode,
    @RequestParam(value="pq_title", required=false) String pqTitle,
    HttpSession session
  ) throws Exception {

    try {
      List<String> allowedExtensions = Arrays.asList("csv", "xlsx", "htm", "zip", "json");
      if (!allowedExtensions.contains(pqExt)) {
        return ResponseEntity.status(400).body(null);
      }

      String filename = pqTitle + "." + pqExt;
      session.setAttribute("pq_data", pqData);
      session.setAttribute("pq_decode", pqDecode);
      session.setAttribute("pq_filename", filename);

      return ResponseEntity.ok()
      .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
      .contentType(MediaType.APPLICATION_OCTET_STREAM)
      .body(filename);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/exportExcel"}, produces={"application/octet-stream; charset=UTF-8"})
  public void getExportExcel(
    @RequestParam(value="pq_filename", required=false) String pqFilename,
    HttpServletResponse response,
    HttpSession session
  ) throws Exception {
    try {

      String sessionFilename = (String) session.getAttribute("pq_filename");
      String pqData = (String) session.getAttribute("pq_data");
      Boolean pqDecode = (Boolean) session.getAttribute("pq_decode");

      if (sessionFilename == null || !sessionFilename.equals(pqFilename) || pqData == null) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid session data or filename.");
        return;
      }

      byte[] fileBytes = (pqDecode != null && pqDecode)
      ? Base64.decodeBase64(pqData)
      : pqData.getBytes(StandardCharsets.UTF_8);

      response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
      response.setHeader("Content-Disposition", "attachment; filename=\"" + pqFilename + "\"");
      response.setContentLength(fileBytes.length);

      try (OutputStream out = response.getOutputStream()) {
        out.write(fileBytes);
      }
      catch (IOException e) {
        e.printStackTrace();
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

}