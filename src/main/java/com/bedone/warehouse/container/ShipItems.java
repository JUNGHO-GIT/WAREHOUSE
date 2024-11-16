package com.bedone.warehouse.container;

import java.util.Date;

// 출하 관리 (ShipItems)
// 생성일 : 2021-05-10 14:15:24 by JDFrame

public class ShipItems {

  private Integer shipCd, cnt;
  private String inOutSeq, flagYN, issueID;
  private Date regDate, issueDate;

  public ShipItems() {
    super();
  }

  public ShipItems (
    Integer shipCd, Integer cnt,
    String inOutSeq, String flagYN, String issueID,
    Date regDate, Date issueDate
  ) {
    super();
    this.shipCd = shipCd;
    this.inOutSeq = inOutSeq;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getShipCd() {
    return shipCd;
  }
  public void setShipCd(Integer shipCd) {
    this.shipCd = shipCd;
  }

  public Integer getCnt() {
    return cnt;
  }
  public void setCnt(Integer cnt) {
    this.cnt = cnt;
  }

  public String getInOutSeq() {
    return inOutSeq;
  }
  public void setInOutSeq(String inOutSeq) {
    this.inOutSeq = inOutSeq;
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
