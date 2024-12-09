package com.WAREHOUSE.util;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;

// -------------------------------------------------------------------------------------------------
@Component
public class POIExcelMaker {

  // -----------------------------------------------------------------------------------------------
	public void createLoopCell(
    Integer rowNo,
    Integer cellStartNo,
    Integer cellEndNo,
    String text,
    Row row,
    Cell cell,
		HSSFWorkbook xlsxWb,
		HSSFSheet sheet
  ) throws Exception {

		row = sheet.getRow(rowNo);
		Integer cellCnt = cellEndNo - cellStartNo;
		CellStyle cellStyleBorderLeft = borderSumLeft(xlsxWb, "right");
		CellStyle cellStyleBorderMiddle = borderSumMiddle(xlsxWb, "none");
		CellStyle cellStyleBorderRight = borderSumRight(xlsxWb, "none");

		for (Integer k = 0; k < cellCnt; k++) {
			cell = row.createCell(cellStartNo + k);
			if (k == 0) {
				cell.setCellValue(text);
				cell.setCellStyle(cellStyleBorderLeft);
			}
      else if (k == cellCnt - 1) {
        cell.setCellStyle(cellStyleBorderMiddle);
      }
      else {
        cell.setCellStyle(cellStyleBorderRight);
      }
		}
	}

  // -----------------------------------------------------------------------------------------------
	public void createCellLine(
    Integer rowNo,
    Integer cellNo,
    String text,
    Row row,
    Cell cell,
		CellStyle cellStyle,
		HSSFSheet sheet
	) throws Exception {

		row = sheet.getRow(rowNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);
		cell.setCellStyle(cellStyle);
	}

  // -----------------------------------------------------------------------------------------------
	public void createCellBasic(
    Integer rowNo,
    Integer cellNo,
    String text,
    Row row,
    Cell cell,
		HSSFSheet sheet
	) throws Exception {

		row = sheet.getRow(rowNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);
	}

  // -----------------------------------------------------------------------------------------------
	public void createCell(
    Integer rowNo,
    Integer cellNo,
    String text,
		Row row,
		Cell cell,
		CellStyle cellStyle,
		HSSFSheet sheet
	) throws Exception {

		row = sheet.getRow(rowNo);
		cell = row.getCell(cellNo);
		cell.setCellValue(text);
		cell.setCellStyle(cellStyle);
	}

  // -----------------------------------------------------------------------------------------------
	public CellStyle textAlign(
    HSSFWorkbook xlsxWb,
    String align
  ) {

		CellStyle cellStyle = xlsxWb.createCellStyle();
		cellStyle.setBorderTop((short) 1);
		cellStyle.setBorderBottom((short) 1);
		cellStyle.setBorderLeft((short) 1);
		cellStyle.setBorderRight((short) 1);

		if (align == "left") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }
    else {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    }
		return cellStyle;
	}

  // -----------------------------------------------------------------------------------------------
  public CellStyle borderTopBottom(
    HSSFWorkbook xlsxWb,
    String align
  ) {

    CellStyle cellStyleBorder = xlsxWb.createCellStyle();
    cellStyleBorder.setBorderTop((short) 1);
    cellStyleBorder.setBorderBottom((short) 1);

    if (align == "left") {
      cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }
    else {
      cellStyleBorder.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    }

    return cellStyleBorder;
  }

  // -----------------------------------------------------------------------------------------------
  public CellStyle wrapLine(
    HSSFWorkbook xlsxWb,
    String align
  ) {

    CellStyle cellStyle = xlsxWb.createCellStyle();
    cellStyle.setBorderTop((short) 1);
    cellStyle.setBorderBottom((short) 1);
    cellStyle.setBorderLeft((short) 1);
    cellStyle.setBorderRight((short) 1);
    cellStyle.setWrapText(true);

    if (align == "left") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }
    else if (align == "center") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    }
    else {
      cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    }

    return cellStyle;
  }

  // -----------------------------------------------------------------------------------------------
  public CellStyle borderSumLeft(
    HSSFWorkbook xlsxWb,
    String align
  ) {

    CellStyle cellStyle = xlsxWb.createCellStyle();
    cellStyle.setBorderTop((short) 1);
    cellStyle.setBorderBottom((short) 1);
    cellStyle.setBorderLeft((short) 1);

    if (align == "left") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }

    return cellStyle;
  }

  // -----------------------------------------------------------------------------------------------
  public CellStyle borderSumMiddle(
    HSSFWorkbook xlsxWb,
    String align
  ) {

    CellStyle cellStyle = xlsxWb.createCellStyle();
    cellStyle.setBorderTop((short) 1);
    cellStyle.setBorderBottom((short) 1);

    if (align == "left") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }

    return cellStyle;
  }

  // -----------------------------------------------------------------------------------------------
  public CellStyle borderSumRight(
    HSSFWorkbook xlsxWb,
    String align
  ) {

    CellStyle cellStyle = xlsxWb.createCellStyle();
    cellStyle.setBorderTop((short) 1);
    cellStyle.setBorderBottom((short) 1);
    cellStyle.setBorderRight((short) 1);

    if (align == "left") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    }
    else if (align == "right") {
      cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    }

    return cellStyle;
  }
}
