package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Product {
  private Integer prodCd;
  private String prodNm, prodType, prodTypeNm, bomType;
  private String maker, unit, quality, option1, option2;
  private Integer inQty, outQty, protectedQty;
  private Double unitPrice, unitQty;
  private String remarks, barcode;
  private Integer compCd, houseCd;
  private String compNm, houseNm;
  private String fileUrl, shipDt, qty;
  private String flagYn, issueId;
  private Date regDt, issueDt;
}
