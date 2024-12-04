package com.warehouse.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import com.warehouse.container.Files;
import com.warehouse.dao.FilesDAO;
import com.warehouse.util.Logs;
import com.warehouse.util.Utils;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class FilesCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/uploadFiles", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String uploadFiles (
    MultipartRequest multipartRequest,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    MultipartFile file = multipartRequest.getFile("userFile");
    String fileNm = file.getOriginalFilename();
    String tableNm = request.getParameter("tableNm");
    String tableKey = request.getParameter("tableKey");
    String keyColumn = request.getParameter("keyColumn");
    String issueID = session.getAttribute("userID").toString();
    Integer fileSeq = Integer.parseInt(request.getParameter("fileSeq"));
    String flagYN = "Y";

    try {
      fileNm = new String(fileNm.getBytes("8859_1"), "UTF-8");
    }
    catch (UnsupportedEncodingException e1) {
      e1.printStackTrace();
    }

    String[] exForm = file.getOriginalFilename().split("\\.");
    String ex = exForm[(exForm.length - 1)];

    SimpleDateFormat formData = new SimpleDateFormat("yyyyMMddHHmmss");
    Date time = new Date();

    // 1. 보안을 위해 UUID 사용
    UUID uuid = UUID.randomUUID();
    String UUIDString = uuid.toString().substring(0, 8);
    String fileUrl = formData.format(time) + "-" + UUIDString + "." + ex;

    FilesDAO filesDao = sqlSession.getMapper(FilesDAO.class);
    Files filesParam = new Files();

    filesParam.setFileSeq(fileSeq);
    filesParam.setFileUrl(fileUrl);
    filesParam.setFileNm(fileNm);
    filesParam.setTableNm(tableNm);
    filesParam.setTableKey(tableKey);
    filesParam.setFlagYN(flagYN);
    filesParam.setIssueID(issueID);

    String msg = "업로드 되었습니다";

    try {
      String path = "TODO";
      Utils.fileUpload(file, path, fileUrl);
      filesDao.saveFiles(filesParam);
      filesDao.updateIssueDate(tableNm, tableKey, keyColumn);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "업로드 실패";
    }

    return msg;
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/uploadWarFiles", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String uploadWarFiles (
    MultipartRequest multipartRequest,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    MultipartFile file = multipartRequest.getFile("userFile");
    String fileNm = file.getOriginalFilename();

    try {
      fileNm = new String(fileNm.getBytes("8859_1"), "UTF-8");
    }
    catch (UnsupportedEncodingException e1) {
      e1.printStackTrace();
    }

    String[] exForm = file.getOriginalFilename().split("\\.");
    String ex = exForm[(exForm.length - 1)];

    // 확장자를 제외한 파일 이름 추출
    String fileNameWithoutEx = fileNm.substring(0, fileNm.lastIndexOf('.'));

    // 확장자가 중복되지 않도록 파일 URL 조합
    String fileUrl = fileNameWithoutEx + "." + ex;
    String msg = "업로드 되었습니다";
    String path = "TODO";

    try {
      Utils.fileUpload(file, path, fileUrl);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "업로드 실패";
    }

    return msg;
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listFiles", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listFiles (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String tableNm = request.getParameter("tableNm");
    String tableKey = request.getParameter("tableKey");

    FilesDAO filesDao = sqlSession.getMapper(FilesDAO.class);
    ArrayList<Files> filesList = filesDao.listFiles(tableNm, tableKey);

    model.addAttribute("rsltJson", gson.toJson(filesList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/showFiles", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showFiles (
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    FilesDAO filesDao = sqlSession.getMapper(FilesDAO.class);
    String tableNm = request.getParameter("tableNm");
    String tableKey = request.getParameter("tableKey");

    List<Map<String, Object>> showFiles = filesDao.showFiles(tableNm, tableKey);
    model.addAttribute("rsltJson", gson.toJson(showFiles));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveFiles", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveFiles (
    @RequestBody JSONObject filesParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    FilesDAO filesDao = sqlSession.getMapper(FilesDAO.class);
    String fileUrlParam = filesParam.get("fileUrl").toString();
    String tableNm = filesParam.get("tableNm").toString();
    String tableKey = filesParam.get("tableKey").toString();
    String keyColumn = filesParam.get("keyColumn").toString();
    String userIDParam = session.getAttribute("userID").toString();
    filesParam.put("issueID", userIDParam);

    logs.info ("filesParam", gson.toJson(filesParam));

    String msg = "저장 되었습니다";
    String path = "TODO";

    if (fileUrlParam.equals("")) {
      path += "files/" + fileUrlParam;
    }
    else {
      path += "files/";
    }
    if (filesParam.get("flagYN").equals("N")) {
      msg = "삭제 되었습니다";
    }

    Files file = gson.fromJson(gson.toJson(filesParam), Files.class);

    try {
      filesDao.saveFiles(file);
      filesDao.updateIssueDate(tableNm, tableKey, keyColumn);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

  //-----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/viewFiles", method=RequestMethod.GET)
  public void viewFiles (
    HttpServletRequest request,
    HttpServletResponse response
  ) throws Exception {

    FileInputStream fis = null;
    BufferedOutputStream bos = null;

    String fileUrl = request.getParameter("fileUrl");
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

    if (fileExt.equals(".png")) {
      contentType = "image/png";
    }
    else if (fileExt.equals(".jpg")) {
      contentType = "image/jpeg";
    }
    else if (fileExt.equals(".jpeg")) {
      contentType = "image/jpeg";
    }
    else if (fileExt.equals(".gif")) {
      contentType = "image/gif";
    }
    else if (fileExt.equals(".webp")) {
      contentType = "image/webp";
    }
    else {
      contentType = "application/pdf";
    }

    try {
      response.setContentType(contentType);
      response.setHeader("Content-Description", "JSP Generated Data");
      response.setHeader("Cache-Control", "max-age=2592000, public");

      fis = new FileInputStream(file);
      byte[] buf = new byte[(int) file.length()];
      Integer readCount = fis.read(buf);

      bos = new BufferedOutputStream(response.getOutputStream());
      bos.write(buf, 0, readCount);
      bos.flush();
      response.flushBuffer();
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    finally {
      if (fis != null) {
        fis.close();
      }
      if (bos != null) {
        bos.close();
      }
    }
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/downloadFiles", method=RequestMethod.GET)
  public void fileDownload (
    HttpServletRequest request,
    HttpServletResponse response
  ) throws Exception {

    String header = request.getHeader("User-Agent");
    String fileUrl = request.getParameter("fileUrl");
    String path = "";
    File downloadFile = null;

    if (header.contains("MSIE") || header.contains("Trident")) {
    	fileUrl = URLEncoder.encode(fileUrl, "UTF-8").replaceAll("\\+", "%20");
      response.setHeader("Content-Disposition", "attachment; filename=" + fileUrl + ";");
    }
    else {
    	fileUrl = new String(fileUrl.getBytes("UTF-8"), "ISO-8859-1");
      response.setHeader("Content-Disposition", "attachment; filename=\"" + fileUrl + "\"");
    }

    // 1. 엑셀파일 다운로드인 경우
    if (fileUrl.contains(".xlsx") || fileUrl.contains(".xls")) {
      response.setContentType("application/vnd.ms-excel");
      ClassPathResource resource = new ClassPathResource(fileUrl.toString());
      downloadFile = resource.getFile();
    }

    // 2. 이미지 파일 다운로드인 경우
    else {
      response.setContentType("application/octet-stream; charset=utf-8");
      path = "TODO" + fileUrl;
      downloadFile = new File(path);
    }

    // 3. 원래 파일이 없을 경우 기본 이미지로 대체 (resources/no-image)
    if (!downloadFile.exists()) {
      response.setContentType("application/octet-stream; charset=utf-8");
      ClassPathResource resource = new ClassPathResource("no-image.webp");
      downloadFile = resource.getFile();
    }

    response.setContentLength((int) downloadFile.length());
    response.setHeader("Content-Transfer-Encoding", "binary");

    FileInputStream fin = new FileInputStream(downloadFile);
    ServletOutputStream sout = response.getOutputStream();

    byte[] buf = new byte[1024];
    Integer size = -1;

    while ((size = fin.read(buf, 0, buf.length)) != -1) {
      sout.write(buf, 0, size);
    }
    fin.close();
    sout.close();
  }

}
