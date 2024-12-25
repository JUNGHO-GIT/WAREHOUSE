package com.WAREHOUSE.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.WAREHOUSE.container.Company;

// -------------------------------------------------------------------------------------------------
@Component
public class ExcelUtil {

  @Value("${storage-empty}")
  private String STORAGE_EMPTY;

  // -----------------------------------------------------------------------------------------------
	public void shipExcel(
    Integer shipCd,
    HashMap<String, Object> shipDetail,
    Company company,
    ArrayList<HashMap<String, Object>> shippingList,
    HttpServletResponse response,
    String fileUrl,
    String fileDir
  ) throws IOException, URISyntaxException {

    SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
    String now = format.format(new Date());
    URL urlExcel = getClass().getClassLoader().getResource("xls/ship_Excel.xls");

    if (urlExcel == null) {
      throw new RuntimeException("ship_Excel.xls 리소스를 찾을 수 없습니다");
    }

    String excelUrl = Paths.get(urlExcel.toURI()).toFile().getAbsolutePath();
    URL emptyImageUrl = new URL(STORAGE_EMPTY);

    Map<String, Object> fileData = new HashMap<>();
    fileData.put("fileUrl", fileUrl);
    fileData.put("fileDir", fileDir);
    fileData.put("excelUrl", excelUrl);

    byte[] imageBytes;
    if (fileUrl == null || fileUrl == "") {
      try (FileInputStream fis = new FileInputStream(new File(emptyImageUrl.toURI()))) {
        imageBytes = new byte[(int) fis.available()];
        fis.read(imageBytes);
      }
    }
    else {
      try (FileInputStream fis = new FileInputStream(new File(fileDir + fileUrl))) {
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
    PoiExcelMaker exPOI = new PoiExcelMaker();

    try {
      String compNm = Objects.toString(company.getCompNm(), "");
      String compType = Objects.toString(company.getCompType(), "");
      String compAddr = Objects.toString(company.getCompAddr(), "");
      String compPart = Objects.toString(company.getCompPart(), "");
      String compNo = Objects.toString(company.getCompNo(), "");
      String compPhone = Objects.toString(company.getCompPhone(), "");
      String compOwner = Objects.toString(company.getCompOwner(), "");
      String shipMajor = Objects.toString(shipDetail.get("shipMajor"), "");
      String account = Objects.toString(shipDetail.get("compNm"), "");
      String count = Objects.toString(shipDetail.get("cnt"), "");
      Integer cnt = Integer.parseInt(count.isEmpty() ? "0" : count);
      String detailed = "";

      if (shippingList.get(0).get("prodNm") != null) {
        detailed = String.valueOf(shippingList.get(0).get("prodNm")) + " 외 " + cnt + " 건";
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
      exPOI.createCellBasic(9, 5, compPhone, row, cell, sheet1);
      exPOI.createCellBasic(6, 7, compOwner, row, cell, sheet1);
      exPOI.createCellBasic(5, 0, account, row, cell, sheet1);
      exPOI.createCellBasic(8, 5, compType, row, cell, sheet1);
      exPOI.createCellBasic(7, 5, compAddr, row, cell, sheet1);
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