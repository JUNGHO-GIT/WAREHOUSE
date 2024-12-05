package com.bedone.wms.util;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;

public class POIExcelMaker {

	// Sheet 생성 : Sheet sheet1 = xlsxWb.createSheet("firstSheet");
    // Sheet 조회 : XSSFSheet sheet1 = xlsxWb.getSheetAt(0);

	// read : FileInputStream file = new FileInputStream(path);
	// 				Workbook xlsxWb = new XSSFWorkbook(file);
	// write : Workbook xlsxWb = new XSSFWorkbook();

	// 컬럼 너비 설정 ( create 경우 )
    //sheet1.setColumnWidth(0, 10000);
    //sheet1.setColumnWidth(9, 10000);

	// Cell 스타일 생성
    //CellStyle cellStyle = xlsxWb.createCellStyle();

	// 줄 바꿈
    //cellStyle.setWrapText(true);

	// Cell 색깔, 무늬 채우기
    //cellStyle.setFillForegroundColor(HSSFColor.LIME.index);
    //cellStyle.setFillPattern(CellStyle.BIG_SPOTS);

	// border 채우기
	//	CellStyle cellStyle = xlsxWb.createCellStyle();
	//	cellStyle.setBorderTop((short) 1);

	public void createLoopCell(int rowNo, int cellStartNo, int cellEndNo, String text, Row row, Cell cell, HSSFWorkbook xlsxWb, HSSFSheet sheet) throws Exception {

		row = sheet.getRow(rowNo);

		int cellCnt = cellEndNo-cellStartNo;

		CellStyle cellStyleBorderLeft = borderSumLeft(xlsxWb, "right");
		CellStyle cellStyleBorderMiddle = borderSumMiddle(xlsxWb, "none");
		CellStyle cellStyleBorderRight = borderSumRight(xlsxWb, "none");

		for (int k=0; k<cellCnt; k++) {
			cell = row.createCell(cellStartNo+k);

			if(k==0) {
				cell.setCellValue(text);
				cell.setCellStyle(cellStyleBorderLeft);
			} else if(k==cellCnt-1) {
				cell.setCellStyle(cellStyleBorderMiddle);
			} else {
				cell.setCellStyle(cellStyleBorderRight);
			}
		}

	}

	public void createCellLine(int rowNo, int cellNo, String text, Row row, Cell cell, CellStyle cellStyle, HSSFSheet sheet) throws Exception {

		row = sheet.getRow(rowNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);
		cell.setCellStyle(cellStyle);

	}

	// XSSFSheet
	public void createCellBasic(int rowNo, int cellNo, String text, Row row, Cell cell, HSSFSheet sheet) throws Exception {

		row = sheet.getRow(rowNo);
		//cell = row.createCell(cellNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);

	}
	// XSSFSheet
	public void createCell(int rowNo, int cellNo, String text, Row row, Cell cell, CellStyle cellStyle, HSSFSheet sheet) throws Exception {

		row = sheet.getRow(rowNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);
		cell.setCellStyle(cellStyle);

	}
	// XSSFWorkbook
	public CellStyle textAlign(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);
		cellStyle.setBorderLeft((short) 1);
		cellStyle.setBorderRight((short) 1);
		// XSSFCellStyle.ALIGN_LEFT)
    	if(align == "left") cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		else cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    	return cellStyle;
	}


	// XSSFWorkbook
	public CellStyle borderTopBottom(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyleBorder = xlsxWb.createCellStyle();
		cellStyleBorder.setBorderTop((short) 1);
		cellStyleBorder.setBorderBottom((short) 1);

		if(align == "left") cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		else cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_CENTER);


    	return cellStyleBorder;
	}

	public CellStyle wrapLine(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);
		cellStyle.setBorderLeft((short) 1);
		cellStyle.setBorderRight((short) 1);
		cellStyle.setWrapText(true);

		//

    	if(align == "left") cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		else if(align == "center") cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		else cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		//cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    	return cellStyle;
	}

	public CellStyle borderSumLeft(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);
		cellStyle.setBorderLeft((short) 1);

		if(align == "left") cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		//else cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    	return cellStyle;
	}

	public CellStyle borderSumMiddle(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);

		if(align == "left") cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		//else cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    	return cellStyle;
	}

	public CellStyle borderSumRight(HSSFWorkbook xlsxWb, String align) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);
		cellStyle.setBorderRight((short) 1);

		if(align == "left") cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		else if(align == "right") cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		//else cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    	return cellStyle;
	}


}
