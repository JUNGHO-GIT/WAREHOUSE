package com.WAREHOUSE.controller;

import java.io.File;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
import com.WAREHOUSE.util.Logs;
import com.WAREHOUSE.util.Utils;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class FilesCTRL {

  private final FilesDAO dao;
  private final Logs logs;
  private final Utils utils;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/uploadFiles", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> uploadFiles (
    @RequestParam("userFile") MultipartFile file,
    @RequestParam("tableNm") String tableNm,
    @RequestParam("tableKey") String tableKey,
    @RequestParam("keyColumn") String keyColumn,
    @RequestParam("fileSeq") Integer fileSeq,
    @SessionAttribute("userID") String issueID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();
    String fileNm = file.getOriginalFilename();
    fileNm = new String(fileNm.getBytes("8859_1"), "UTF-8");

    String[] exForm = file.getOriginalFilename().split("\\.");
    String ex = exForm[(exForm.length - 1)];

    SimpleDateFormat formData = new SimpleDateFormat("yyyyMMddHHmmss");
    Date time = new Date();

    // 1. 보안을 위해 UUID 사용
    UUID uuid = UUID.randomUUID();
    String UUIDString = uuid.toString().substring(0, 8);
    String fileUrl = formData.format(time) + "-" + UUIDString + "." + ex;

    try {
      Files files = new Files();
      files.setFileSeq(fileSeq);
      files.setFileUrl(fileUrl);
      files.setFileNm(fileNm);
      files.setTableNm(tableNm);
      files.setTableKey(tableKey);
      files.setFlagYN("Y");
      files.setIssueID(issueID);

      String path = "TODO";
      utils.fileUpload(file, path, fileUrl);
      dao.saveFiles(files);
      dao.updateIssueDate(tableNm, tableKey, keyColumn);
      map.put("result", "업로드 되었습니다");
    }
    catch (Exception e) {
      logs.error("uploadFiles", e.getMessage());
      map.put("result", "업로드 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/uploadWarFiles", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> uploadWarFiles (
    @RequestParam("userFile") MultipartFile file
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();
    String fileNm = file.getOriginalFilename();
    fileNm = new String(fileNm.getBytes("8859_1"), "UTF-8");

    String[] exForm = file.getOriginalFilename().split("\\.");
    String ex = exForm[(exForm.length - 1)];

    SimpleDateFormat formData = new SimpleDateFormat("yyyyMMddHHmmss");
    Date time = new Date();

    // 1. 보안을 위해 UUID 사용
    UUID uuid = UUID.randomUUID();
    String UUIDString = uuid.toString().substring(0, 8);
    String fileUrl = formData.format(time) + "-" + UUIDString + "." + ex;

    try {
      String path = "TODO";
      utils.fileUpload(file, path, fileUrl);
      map.put("result", "업로드 되었습니다");
    }
    catch (Exception e) {
      logs.error("uploadWarFiles", e.getMessage());
      map.put("result", "업로드 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listFiles (
    @RequestParam("tableNm") String tableNm,
    @RequestParam("tableKey") String tableKey
  ) throws Exception {

    try {
      ArrayList<Files> filesList = dao.listFiles(tableNm, tableKey);
      return ResponseEntity.ok(filesList);
    }
    catch (Exception e) {
      logs.error("listFiles", e.getMessage());
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showFiles (
    @RequestParam("tableNm") String tableNm,
    @RequestParam("tableKey") String tableKey
  ) throws Exception {

    try {
      List<Map<String, Object>> showFiles = dao.showFiles(tableNm, tableKey);
      return ResponseEntity.ok(showFiles);
    }
    catch (Exception e) {
      logs.error("showFiles", e.getMessage());
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveFiles (
    @RequestBody HashMap<String, Object> files,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    String tableNm = files.get("tableNm").toString();
    String tableKey = files.get("tableKey").toString();
    String keyColumn = files.get("keyColumn").toString();
    /* String fileUrlParam = files.get("fileUrl").toString(); */
    /* String paths = fileUrlParam.equals("") ? "TODO1" : "TODO2"; */

    Map<String, Object> map = new HashMap<String, Object>();
    try {
      Files file = new Files();
      file.setFileSeq(Integer.parseInt(files.get("fileSeq").toString()));
      file.setTableNm(files.get("tableNm").toString());
      file.setTableKey(files.get("tableKey").toString());
      file.setFileUrl(files.get("fileUrl").toString());
      file.setFileNm(files.get("fileNm").toString());
      file.setFlagYN(files.get("flagYN").toString());
      file.setIssueID(files.get("issueID").toString());

      dao.saveFiles(file);
      dao.updateIssueDate(tableNm, tableKey, keyColumn);

      map.put("result", file.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveFiles", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/viewFiles")
  public ResponseEntity<?> viewFiles(
    @RequestParam("fileUrl") String fileUrl
  ) throws Exception {

    String path = "TODO" + fileUrl;
    String contentType = "";
    String fileExt = "";
    File file = new File(path);

    // 원래 파일이 없을 경우 기본 이미지로 대체 (resources/images/no-image)
    if (!file.exists() || fileUrl.equals("no-image.webp")) {
      ClassPathResource resource = new ClassPathResource("images/no-image.webp");
      file = resource.getFile();
    }

    // 확장자 형식이 맞지 않을 경우 기본 이미지로 대체 (resources/images/no-image)
    Integer lastIndex = fileUrl.lastIndexOf(".");
    if (lastIndex == -1) {
      ClassPathResource resource = new ClassPathResource("images/no-image.webp");
      file = resource.getFile();
    }
    else {
      fileExt = fileUrl.substring(lastIndex);
    }

    if (fileExt.toLowerCase().equals(".png")) {
      contentType = "image/png";
    }
    else if (fileExt.toLowerCase().equals(".jpg")) {
      contentType = "image/jpeg";
    }
    else if (fileExt.toLowerCase().equals(".jpeg")) {
      contentType = "image/jpeg";
    }
    else if (fileExt.toLowerCase().equals(".gif")) {
      contentType = "image/gif";
    }
    else if (fileExt.toLowerCase().equals(".webp")) {
      contentType = "image/webp";
    }
    else {
      contentType = "application/pdf";
    }

    try {
      byte[] fileContent = java.nio.file.Files.readAllBytes(file.toPath());
      return ResponseEntity.ok()
      .header("Content-Description", "JSP Generated Data")
      .header("Cache-Control", "max-age=2592000, public")
      .contentType(MediaType.parseMediaType(contentType))
      .body(fileContent);
    }
    catch (Exception e) {
      logs.error("viewFiles", e.getMessage());
      String result = "파일 처리 중 오류가 발생했습니다.";
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value = "/downloadFiles")
  public ResponseEntity<?> fileDownload(
    @RequestParam("fileUrl") String fileUrl,
    @RequestHeader("User-Agent") String userAgent
  ) throws Exception {

    java.io.File downloadFile = null;
    String path = "TODO";

    try {
      // 1. 파일 이름 인코딩
      String encodedFileName;
      if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
        encodedFileName = URLEncoder.encode(fileUrl, "UTF-8").replaceAll("\\+", "%20");
      }
      else {
        encodedFileName = new String(fileUrl.getBytes("UTF-8"), "ISO-8859-1");
      }

      // 2. 엑셀 파일 다운로드인 경우
      if (fileUrl.contains(".xlsx") || fileUrl.contains(".xls")) {
        ClassPathResource resource = new ClassPathResource(fileUrl);
        downloadFile = resource.getFile();
      }

      // 3. 이미지 파일 다운로드인 경우
      else {
        path = "TODO" + fileUrl;
        downloadFile = new File(path);
      }

      // 4. 원래 파일이 없을 경우 기본 이미지로 대체
      if (!downloadFile.exists()) {
        ClassPathResource resource = new ClassPathResource("no-image.webp");
        downloadFile = resource.getFile();
      }

      // 5. 파일 데이터 읽기
      byte[] fileContent = java.nio.file.Files.readAllBytes(downloadFile.toPath());

      // 6. Content-Type 설정
      String contentType = java.nio.file.Files.probeContentType(downloadFile.toPath());
      if (contentType == null) {
        contentType = "application/octet-stream";
      }

      // 7. ResponseEntity로 응답 생성
      return ResponseEntity.ok()
      .header("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"")
      .header("Content-Transfer-Encoding", "binary")
      .contentType(MediaType.parseMediaType(contentType))
      .contentLength(downloadFile.length())
      .body(fileContent);
    }
    catch (Exception e) {
      logs.error("fileDownload", e.getMessage());
      String result = "파일 다운로드 중 오류가 발생했습니다.";
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
    }
  }
}
