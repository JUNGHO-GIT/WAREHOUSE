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
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.Product;

// -------------------------------------------------------------------------------------------------
@Component
public class Excel {

  // -----------------------------------------------------------------------------------------------
	public void shipExcel(
    Integer shipCd,
		HashMap<String, Object> shipDetail,
		Company comp,
		ArrayList<Product> shipList,
		HttpServletResponse response
	) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		String now = format.format(new Date());
		URL urlExcel = getClass().getClassLoader().getResource("xls/ship_Excel.xls");
		String excelUrl = "";
		File loadfile = null;

		try {
			loadfile = Paths.get(urlExcel.toURI()).toFile();
			excelUrl = loadfile.getAbsolutePath();
		}
		catch(URISyntaxException e) {
			e.printStackTrace();
		}

		POIExcelMaker exPOI = new POIExcelMaker();
		try {
			FileInputStream file = new FileInputStream(excelUrl);
			HSSFWorkbook xlsxWb = new HSSFWorkbook(file);
			HSSFSheet sheet1 = xlsxWb.getSheetAt(0);
			String compNm = comp.getCompNm();
			String compType = comp.getCompType();
			String compAddr = comp.getCompAddr();
			String compPart = comp.getCompPart();
			String compNo = comp.getCompNo();
			String compPhone = comp.getCompPhone();
			String compOwner = comp.getCompOwner();
			String shipMajor = (String) shipDetail.get("shipMajor");
			String account = (String) shipDetail.get("compNm");
			String count = String.valueOf(shipDetail.get("cnt"));
			Integer cnt = Integer.parseInt(count);
			String detailed = "";
			detailed += shipList.get(0).getProdNm();
			detailed += " 외 ";
			detailed += cnt;
			detailed += " 건";
			int arraySize = shipList.size();
			int startRow = 14;
			int rowNo = 200;
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

			for (int k = 0; k < arraySize; k++) {
				Product detail = shipList.get(k);
				String shipDt = detail.getShipDt();
				String prodNm = detail.getProdNm();
				String qty = String.valueOf(detail.getQty());
				String option1 = detail.getOption1();
				String quality = detail.getQuality();
				exPOI.createCellBasic(8, 0, shipDt, row, cell, sheet1);
				exPOI.createCellBasic(startRow + k, 0, prodNm, row, cell, sheet1);
				exPOI.createCellBasic(startRow + k, 4, option1, row, cell, sheet1);
				exPOI.createCellBasic(startRow + k, 5, quality, row, cell, sheet1);
				exPOI.createCellBasic(startRow + k, 7, qty, row, cell, sheet1);
			}

			if (arraySize < rowNo) {
				for (int j = (rowNo - arraySize); j > 0; j--) {
					sheet1.removeRow(sheet1.getRow(startRow + arraySize + j - 1));
					sheet1.shiftRows(startRow + arraySize + j, startRow + arraySize + j + 1, -1);
				}
			}

			// excel 파일 보기
			try {
				response.setContentType("ms-vnd/excel");
				response.setHeader("Content-Disposition", "attachment;filename=shipExcel_" + now + ".xls");
				OutputStream fileOut = response.getOutputStream();
				xlsxWb.write(fileOut);
				fileOut.close();
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