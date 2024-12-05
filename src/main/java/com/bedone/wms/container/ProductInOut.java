package com.bedone.wms.container;

import java.util.Date;
public class ProductInOut {

  private Integer inOutSeq;
  private String inOutDt, inOut;
  private Integer prodCd;
  private String prodNm;
  private Integer qty;
  private Double unitPrice, supplyPrice;
  private String remark;
  private Integer houseCd, compCd;
  private String houseNm, compNm;
  private String fileUrl;
  private String flagYN, planYN, issueID;
  private Date regDate, issueDate;
  public ProductInOut() {

    super();
  }

  public ProductInOut(
    Integer inOutSeq,
    String inOutDt,
    String inOut,
    Integer prodCd,
    String prodNm,
    Integer qty,
    Double unitPrice,
    Double supplyPrice,
    String remark,
    Integer houseCd,
    Integer compCd,
    String houseNm,
    String compNm,
    String fileUrl,
    String flagYN,
    String planYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.inOutSeq = inOutSeq;
    this.inOutDt = inOutDt;
    this.inOut = inOut;
    this.prodCd = prodCd;
    this.prodNm = prodNm;
    this.qty = qty;
    this.unitPrice = unitPrice;
    this.supplyPrice = supplyPrice;
    this.remark = remark;
    this.houseCd = houseCd;
    this.compCd = compCd;
    this.houseNm = houseNm;
    this.compNm = compNm;
    this.fileUrl = fileUrl;
    this.flagYN = flagYN;
    this.planYN = planYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getInOutSeq() {

    return inOutSeq;
  }

  public void setInOutSeq(Integer inOutSeq) {

    this.inOutSeq = inOutSeq;
  }

  public String getInOutDt() {

    return inOutDt;
  }

  public void setInOutDt(String inOutDt) {

    this.inOutDt = inOutDt;
  }

  public String getInOut() {

    return inOut;
  }

  public void setInOut(String inOut) {

    this.inOut = inOut;
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

  public Integer getQty() {

    return qty;
  }

  public void setQty(Integer qty) {

    this.qty = qty;
  }

  public Double getUnitPrice() {

    return unitPrice;
  }

  public void setUnitPrice(Double unitPrice) {

    this.unitPrice = unitPrice;
  }

  public Double getSupplyPrice() {

    return supplyPrice;
  }

  public void setSupplyPrice(Double supplyPrice) {

    this.supplyPrice = supplyPrice;
  }

  public String getRemark() {

    return remark;
  }

  public void setRemark(String remark) {

    this.remark = remark;
  }

  public Integer getHouseCd() {

    return houseCd;
  }

  public void setHouseCd(Integer houseCd) {

    this.houseCd = houseCd;
  }

  public Integer getCompCd() {

    return compCd;
  }

  public void setCompCd(Integer compCd) {

    this.compCd = compCd;
  }

  public String getHouseNm() {

    return houseNm;
  }

  public void setHouseNm(String houseNm) {

    this.houseNm = houseNm;
  }

  public String getCompNm() {

    return compNm;
  }

  public void setCompNm(String compNm) {

    this.compNm = compNm;
  }

  public String getFileUrl() {

    return fileUrl;
  }

  public void setFileUrl(String fileUrl) {

    this.fileUrl = fileUrl;
  }

  public String getFlagYN() {

    return flagYN;
  }

  public void setFlagYN(String flagYN) {

    this.flagYN = flagYN;
  }

  public String getPlanYN() {

    return planYN;
  }

  public void setPlanYN(String planYN) {

    this.planYN = planYN;
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
