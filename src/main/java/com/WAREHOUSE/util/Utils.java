package com.WAREHOUSE.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import com.WAREHOUSE.container.Company;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
public class Utils {

  // -----------------------------------------------------------------------------------------------
  private static final Logger log = LoggerFactory.getLogger(Utils.class);
  Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  public Map<String, String> listString2Map(
    List<Map<String, String>> list,
    String key,
    String val
  ) throws Exception {

    Map<String, String> rsList = new HashMap<String, String>();
    for (Integer p = 0; p < list.size(); p++) {
      Map<String, String> row = (Map<String, String>) list.get(p);
      String keys = (String) row.get(key);
      String vals = (String) row.get(val);
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public Map<String, Object> listObject2Map(
    List<Map<String, Object>> list,
    String key,
    String val
  ) throws Exception {

    Map<String, Object> rsList = new HashMap<String, Object>();
    for (Integer p = 0; p < list.size(); p++) {
      Map<String, Object> row = (Map<String, Object>) list.get(p);
      String keys = (String) row.get(key);
      Object vals = row.get(val);
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public String curTm() {

    DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    String curTm = dateFormat.format(new java.util.Date());

    return curTm;
  }

  // -----------------------------------------------------------------------------------------------
  public String curDt() {

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String curDt = dateFormat.format(new java.util.Date());

    return curDt;
  }

  // -----------------------------------------------------------------------------------------------
  public void fileUpload(MultipartFile fileData, String path, String fileName
  ) throws Exception {

    String originalFileName = fileData.getOriginalFilename();
    String contentType = fileData.getContentType();
    long fileSize = fileData.getSize();
    InputStream is = null;
    OutputStream out = null;
    try {
      if (fileSize > 0) {
        is = fileData.getInputStream();
        File realUploadDir = new File(path);
        if (!realUploadDir.exists()) {
          realUploadDir.mkdirs();
        }
        out = new FileOutputStream(path + "/" + fileName);
        FileCopyUtils.copy(is, out);

        // 파일 업로드 성공시
        Map<String, Object> fileMap = new HashMap<String, Object>();
        fileMap = new HashMap<String, Object>() {
          {
            put("originalFileName", originalFileName);
            put("contentType", contentType);
            put("fileSize", fileSize);
            put("path", path);
            put("fileName", fileName);
          }
        };
        log.info("fileUpload success", gson.toJson(fileMap));
      }
      else {
      	new IOException("잘못된 파일을 업로드 하셨습니다.");
      }
    }
    catch(IOException e) {
      e.printStackTrace();
      log.info("IOExcept : " + e.getMessage());
      new IOException("파일 업로드에 실패하였습니다.");
    }
    finally{
      if (out != null) {
        try {
          out.close();
        }
        catch(IOException e) {
          e.printStackTrace();
        }
      }
      if (is != null) {
        try {
          is.close();
        }
        catch(IOException e) {
          e.printStackTrace();
        }
      }
    }
  }

  // -----------------------------------------------------------------------------------------------
  public String deleteUploadFile(String fileDir
  ) throws Exception {

    File file = new File(fileDir);
    String msg;
    try {
      if (file.exists()) {
        if (file.delete()) {
          msg = "삭제 되었습니다.";
        }
        else {
        	msg = "파일 삭제가 실패하였습니다.";
        }
      }
      else {
      	msg = "파일이 존재하지 않습니다.";
      }
    }

    catch(Exception e) {
      e.printStackTrace();
      msg = "파일 삭제가 실패하였습니다.";
    }

    return msg;
  }

  // -----------------------------------------------------------------------------------------------
  public void shipExcel(
    Integer shipCd,
    HashMap<String, Object> shipDetail,
    Company comp,
    ArrayList<HashMap<String, Object>> shippingList,
    HttpServletResponse response,
    Map<String, Object> map
  ) throws IOException, URISyntaxException {

    SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
    String now = format.format(new Date());
    URL urlExcel = getClass().getClassLoader().getResource("xls/ship_Excel.xls");

    if (urlExcel == null) {
      throw new RuntimeException("ship_Excel.xls 리소스를 찾을 수 없습니다.");
    }

    String excelUrl = Paths.get(urlExcel.toURI()).toFile().getAbsolutePath();
    String fileUrl = map.get("fileUrl").toString();
    String gFileDir = map.get("fileDir").toString();
    URL urlNoLogo = getClass().getClassLoader().getResource("images/no-logo.png");

    Map<String, Object> fileData = new HashMap<>();
    fileData.put("fileUrl", fileUrl);
    fileData.put("gFileDir", gFileDir);
    fileData.put("excelUrl", excelUrl);
    log.info("fileData : " + gson.toJson(fileData));

    byte[] imageBytes;
    if (fileUrl == null || fileUrl == "") {
      try (FileInputStream fis = new FileInputStream(Paths.get(urlNoLogo.toURI()).toFile())) {
        imageBytes = new byte[(int) fis.available()];
        fis.read(imageBytes);
      }
    }
    else {
    	try (FileInputStream fis = new FileInputStream(new File(gFileDir + fileUrl))) {
        imageBytes = new byte[(int) fis.available()];
        fis.read(imageBytes);
    }
    }

    // 이미지 형식 확인 후 올바른 타입 지정 (기본값으로 PNG 설정)
    Integer imageType = HSSFWorkbook.PICTURE_TYPE_PNG;
    String fileExtension = "";
    if (fileUrl != null) {
      fileExtension = fileUrl.substring(fileUrl.lastIndexOf('.') + 1).toUpperCase();
    }

    if (fileExtension == "jpg" || fileExtension == "jpeg") {
      imageType = HSSFWorkbook.PICTURE_TYPE_JPEG;
    }
    HSSFWorkbook xlsxWb = null;

    try (FileInputStream file = new FileInputStream(excelUrl)) {
      xlsxWb = new HSSFWorkbook(file);
    }
    HSSFSheet sheet1 = xlsxWb.getSheetAt(0);

    if (imageBytes.length > 0) {
      Integer pictureIdx = xlsxWb.addPicture(imageBytes, imageType);
      CreationHelper helper = xlsxWb.getCreationHelper();
      Drawing drawing = sheet1.createDrawingPatriarch();
      ClientAnchor anchor = helper.createClientAnchor();
      anchor.setCol1(0);
      anchor.setRow1(0);
      anchor.setCol2(2);
      anchor.setRow2(2);
      Integer widthInPixels = (int) (12 * 16.56);
      Integer heightInPixels = (int) (4 * 16.56);
      anchor.setDx1(1);
      anchor.setDy1(1);
      anchor.setDx2(widthInPixels);
      anchor.setDy2(heightInPixels);
      drawing.createPicture(anchor, pictureIdx);
    }
    POIExcelMaker exPOI = new POIExcelMaker();

    try {
      String compNm = Objects.toString(comp.getCompNm(), "");
      String compType = Objects.toString(comp.getCompType(), "");
      String address = Objects.toString(comp.getAddress(), "");
      String compPart = Objects.toString(comp.getCompPart(), "");
      String compNo = Objects.toString(comp.getCompNo(), "");
      String phone = Objects.toString(comp.getPhone(), "");
      String owner = Objects.toString(comp.getOwner(), "");
      String shipMajor = Objects.toString(shipDetail.get("shipMajor"), "");
      String account = Objects.toString(shipDetail.get("compNm"), "");
      String count = Objects.toString(shipDetail.get("cnt"), "");
      Integer cnt = Integer.parseInt(count.isEmpty() ? "0" : count);
      String detailed = "";

      if (shippingList.get(0).get("prodNm") != null) {
        detailed = shippingList.get(0).get("prodNm").toString() + " 외 " + cnt + " 건";
      }
      else {
      	detailed = "외 " + cnt + " 건";
      }

      Integer arraySize = shippingList.size();
      Integer startRow = 14;
      Integer rowNo = 200;
      Row row = null;
      Cell cell = null;

      exPOI.createCellBasic(11, 2, detailed, row, cell, sheet1);
      exPOI.createCellBasic(6, 0, shipMajor, row, cell, sheet1);
      exPOI.createCellBasic(9, 5, phone, row, cell, sheet1);
      exPOI.createCellBasic(6, 7, owner, row, cell, sheet1);
      exPOI.createCellBasic(5, 0, account, row, cell, sheet1);
      exPOI.createCellBasic(8, 5, compType, row, cell, sheet1);
      exPOI.createCellBasic(7, 5, address, row, cell, sheet1);
      exPOI.createCellBasic(8, 7, compPart, row, cell, sheet1);
      exPOI.createCellBasic(5, 5, compNo, row, cell, sheet1);
      exPOI.createCellBasic(6, 5, compNm, row, cell, sheet1);

      for (Integer k = 0; k < arraySize; k++) {
        HashMap<String, Object> detail = shippingList.get(k);
        String shipDt = Objects.toString(detail.get("shipDt"), "");
        String prodNm = Objects.toString(detail.get("prodNm"), "");
        String qty = Objects.toString(detail.get("qty"), "");
        String option1 = Objects.toString(detail.get("option1"), "");
        String option2 = Objects.toString(detail.get("option2"), "");
        exPOI.createCellBasic(8, 0, shipDt, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 0, prodNm, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 4, option2, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 5, option1, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 7, qty, row, cell, sheet1);
      }

      // 배열 크기에 따라서 엑셀 행 추가 및 삭제
      if (arraySize < rowNo) {
        for (Integer j = (rowNo - arraySize); j > 0; j--) {
          Row rowToRemove = sheet1.getRow(startRow + arraySize + j - 1);
          if (rowToRemove != null) {
            sheet1.removeRow(rowToRemove);
          }
        }
      }

      // 엑셀 파일 다운로드
      try {
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=shipExcel_" + now + ".xls");
        try (OutputStream fileOut = response.getOutputStream()) {
          xlsxWb.write(fileOut);
          fileOut.flush();
        }
      }

      catch(FileNotFoundException e) {
        e.printStackTrace();
      }

      catch(IOException e) {
        e.printStackTrace();
      }
    }

    catch(Exception e) {
      e.printStackTrace();
    }
  }
}
