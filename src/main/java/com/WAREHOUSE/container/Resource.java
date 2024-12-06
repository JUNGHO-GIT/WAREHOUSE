package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Resource {
  private Integer resrcCd;
  private String resrcNm, resrcType, resrcTypeNm, bomType;
  private String maker, unit, quality, option1, option2;
  private Integer inQty, outQty, protectedQty;
  private Double unitPrice, unitQty;
  private String remark, barcode;
  private Integer compCd, houseCd;
  private String compNm, houseNm;
  private String fileUrl, shipDt, qty;
  private String flagYN, issueID;
  private Date regDate, issueDate;
}
