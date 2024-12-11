package com.WAREHOUSE.controller;

import java.io.File;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.WAREHOUSE.util.FilesUtil;
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
  private final FilesUtil filesUtil;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listFiles (
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey
  ) throws Exception {

    try {
      ArrayList<Files> list = dao.listFiles(tableNm, tableKey);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listFiles", e.getMessage());
      return ResponseEntity.status(500).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showFiles (
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey
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

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/viewFiles")
  public ResponseEntity<?> viewFiles(
    @RequestParam(value="fileUrl", required=false) String fileUrl
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
  @PostMapping(value="/act/uploadFiles", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> uploadFiles (
    @RequestParam(value="userFile", required=false) MultipartFile multipartFile,
    @RequestParam(value="tableNm", required=false) String tableNm,
    @RequestParam(value="tableKey", required=false) String tableKey,
    @RequestParam(value="keyColumn", required=false) String keyColumn,
    @RequestParam(value="fileSeq", required=false) Integer fileSeq,
    @SessionAttribute("userId") String issueId
  ) throws Exception {

    // 1. 보안을 위해 UUID 사용
    UUID uuid = UUID.randomUUID();
    String uuidStr = uuid.toString().substring(0, 8);

    String fileNm = multipartFile.getOriginalFilename();
    String fileUrl = String.format(
      "%s_%s.webp",
      LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss")),
      uuidStr
    );

    Map<String, Object> map = new HashMap<String, Object>();
    try {
      Files files = new Files();
      files.setFileSeq(fileSeq);
      files.setFileUrl(fileUrl);
      files.setFileNm(fileNm);
      files.setTableNm(tableNm);
      files.setTableKey(tableKey);
      files.setFlagYn("Y");
      files.setIssueId(issueId);

      filesUtil.uploadFiles(multipartFile, tableNm, files);
      dao.saveFiles(files);
      dao.updateIssueDt(tableNm, tableKey, keyColumn);
      map.put("result", "업로드 되었습니다");
    }
    catch (Exception e) {
      logs.error("uploadFiles", e.getMessage());
      map.put("result", "업로드 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveFiles", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveFiles (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    String tableNm = param.get("tableNm").toString();
    String tableKey = param.get("tableKey").toString();
    String keyColumn = param.get("keyColumn").toString();

    Map<String, Object> map = new HashMap<String, Object>();
    try {
      Files file = new Files();
      file.setFileSeq(Integer.parseInt(param.get("fileSeq").toString()));
      file.setTableNm(param.get("tableNm").toString());
      file.setTableKey(param.get("tableKey").toString());
      file.setFileUrl(param.get("fileUrl").toString());
      file.setFileNm(param.get("fileNm").toString());
      file.setFlagYn(param.get("flagYn").toString());
      file.setIssueId(param.get("issueId").toString());

      dao.saveFiles(file);
      dao.updateIssueDt(tableNm, tableKey, keyColumn);

      map.put("result", file.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveFiles", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/downloadFiles")
  public ResponseEntity<?> fileDownload(
    @RequestParam(value="fileUrl", required=false) String fileUrl,
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
        ClassPathResource resource = new ClassPathResource("xls/" + fileUrl);
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
