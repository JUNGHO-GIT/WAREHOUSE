package com.bedone.warehouse.container;
import java.util.Date;

// Bom관리(Bom)의 VO 객체
// 생성일 : 2021-05-19 19:32:39 by JDFrame

public class Bom {

  // PRI (prodCd, resrcCd, bomType)
  private Integer prodCd, resrcCd;
  private String bomType;
  private Integer qty;
	private Double unitQty;
  private String flagYN, issueID;
	private Date regDate, issueDate;

	public Bom () {
		super();
	}

	public Bom (
    Integer prodCd, Integer resrcCd,
    String bomType,
    Integer qty,
    Double unitQty,
    String flagYN, String issueID,
    Date regDate, Date issueDate
  ) {
    super();
    this.prodCd = prodCd;
    this.resrcCd = resrcCd;
    this.bomType = bomType;
    this.qty = qty;
    this.unitQty = unitQty;
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

  public Integer getResrcCd() {
    return resrcCd;
  }
  public void setResrcCd(Integer resrcCd) {
    this.resrcCd = resrcCd;
  }

  public String getBomType() {
    return bomType;
  }
  public void setBomType(String bomType) {
    this.bomType = bomType;
  }

  public Integer getQty() {
    return qty;
  }
  public void setQty(Integer qty) {
    this.qty = qty;
  }

  public Double getUnitQty() {
    return unitQty;
  }
  public void setUnitQty(Double unitQty) {
    this.unitQty = unitQty;
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
