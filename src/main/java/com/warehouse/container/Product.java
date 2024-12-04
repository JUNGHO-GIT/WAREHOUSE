package com.warehouse.container;

import java.util.Date;
public class Product {

  private Integer prodCd;
  private String prodNm, prodType, prodTypeNm, bomType;
  private String maker, unit, quality, option1, option2;
  private Integer inQty, outQty, protectedQty;
  private Double unitPrice, unitQty;
  private String remark, barcode;
  private Integer compCd, houseCd;
  private String compNm, houseNm;
  private String fileUrl, shipDt, qty;
  private String flagYN, issueID;
  private Date regDate, issueDate;
  public Product() {

    super();
  }

  public Product(
    Integer prodCd,
    String prodNm,
    String prodType,
    String prodTypeNm,
    String bomType,
    String maker,
    String unit,
    String quality,
    String option1,
    String option2,
    Integer inQty,
    Integer outQty,
    Integer protectedQty,
    Double unitPrice,
    Double unitQty,
    String remark,
    String barcode,
    Integer compCd,
    Integer houseCd,
    String compNm,
    String houseNm,
    String fileUrl,
    String shipDt,
    String qty,
    String flagYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.prodCd = prodCd;
    this.prodNm = prodNm;
    this.prodType = prodType;
    this.prodTypeNm = prodTypeNm;
    this.bomType = bomType;
    this.maker = maker;
    this.unit = unit;
    this.quality = quality;
    this.option1 = option1;
    this.option2 = option2;
    this.inQty = inQty;
    this.outQty = outQty;
    this.protectedQty = protectedQty;
    this.unitPrice = unitPrice;
    this.unitQty = unitQty;
    this.remark = remark;
    this.barcode = barcode;
    this.compCd = compCd;
    this.houseCd = houseCd;
    this.compNm = compNm;
    this.houseNm = houseNm;
    this.fileUrl = fileUrl;
    this.shipDt = shipDt;
    this.qty = qty;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getProdCd() {

    return prodCd;
  }

  public void setProdCd(Integer prodCd) {

    this.prodCd = prodCd;
  }

  public String getProdNm() {

    return prodNm;
  }

  public void setProdNm(String prodNm) {

    this.prodNm = prodNm;
  }

  public String getProdType() {

    return prodType;
  }

  public void setProdType(String prodType) {

    this.prodType = prodType;
  }

  public String getProdTypeNm() {

    return prodTypeNm;
  }

  public void setProdTypeNm(String prodTypeNm) {

    this.prodTypeNm = prodTypeNm;
  }

  public String getBomType() {

    return bomType;
  }

  public void setBomType(String bomType) {

    this.bomType = bomType;
  }

  public String getMaker() {

    return maker;
  }

  public void setMaker(String maker) {

    this.maker = maker;
  }

  public String getUnit() {

    return unit;
  }

  public void setUnit(String unit) {

    this.unit = unit;
  }

  public String getQuality() {

    return quality;
  }

  public void setQuality(String quality) {

    this.quality = quality;
  }

  public String getOption1() {

    return option1;
  }

  public void setOption1(String option1) {

    this.option1 = option1;
  }

  public String getOption2() {

    return option2;
  }

  public void setOption2(String option2) {

    this.option2 = option2;
  }

  public Integer getInQty() {

    return inQty;
  }

  public void setInQty(Integer inQty) {

    this.inQty = inQty;
  }

  public Integer getOutQty() {

    return outQty;
  }

  public void setOutQty(Integer outQty) {

    this.outQty = outQty;
  }

  public Integer getProtectedQty() {

    return protectedQty;
  }

  public void setProtectedQty(Integer protectedQty) {

    this.protectedQty = protectedQty;
  }

  public Double getUnitPrice() {

    return unitPrice;
  }

  public void setUnitPrice(Double unitPrice) {

    this.unitPrice = unitPrice;
  }

  public Double getUnitQty() {

    return unitQty;
  }

  public void setUnitQty(Double unitQty) {

    this.unitQty = unitQty;
  }

  public String getRemark() {

    return remark;
  }

  public void setRemark(String remark) {

    this.remark = remark;
  }

  public String getBarcode() {

    return barcode;
  }

  public void setBarcode(String barcode) {

    this.barcode = barcode;
  }

  public Integer getCompCd() {

    return compCd;
  }

  public void setCompCd(Integer compCd) {

    this.compCd = compCd;
  }

  public Integer getHouseCd() {

    return houseCd;
  }

  public void setHouseCd(Integer houseCd) {

    this.houseCd = houseCd;
  }

  public String getCompNm() {

    return compNm;
  }

  public void setCompNm(String compNm) {

    this.compNm = compNm;
  }

  public String getHouseNm() {

    return houseNm;
  }

  public void setHouseNm(String houseNm) {

    this.houseNm = houseNm;
  }

  public String getFileUrl() {

    return fileUrl;
  }

  public void setFileUrl(String fileUrl) {

    this.fileUrl = fileUrl;
  }

  public String getShipDt() {

    return shipDt;
  }

  public void setShipDt(String shipDt) {

    this.shipDt = shipDt;
  }

  public String getQty() {

    return qty;
  }

  public void setQty(String qty) {

    this.qty = qty;
  }

  public String getFlagYN() {

    return flagYN;
  }

  public void setFlagYN(String flagYN) {

    this.flagYN = flagYN;
  }

  public String getIssueID() {

    return issueID;
  }

  public void setIssueID(String issueID) {

    this.issueID = issueID;
  }

  public Date getRegDate() {

    return regDate;
  }

  public void setRegDate(Date regDate) {

    this.regDate = regDate;
  }

  public Date getIssueDate() {

    return issueDate;
  }

  public void setIssueDate(Date issueDate) {

    this.issueDate = issueDate;
  }
}
