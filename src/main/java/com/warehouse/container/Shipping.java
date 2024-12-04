package com.warehouse.container;

import java.util.Date;
public class Shipping {

  private Integer shipCd, compCd;
  private String toMajor, toPhone, shipDt, shipMajor, inOutSeq;
  private String flagYN, planYN, issueID;
  private Date regDate, issueDate;
  public Shipping() {

    super();
  }

  public Shipping(
    Integer shipCd,
    Integer compCd,
    String toMajor,
    String toPhone,
    String shipDt,
    String shipMajor,
    String inOutSeq,
    String flagYN,
    String planYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.shipCd = shipCd;
    this.compCd = compCd;
    this.toMajor = toMajor;
    this.toPhone = toPhone;
    this.shipDt = shipDt;
    this.shipMajor = shipMajor;
    this.inOutSeq = inOutSeq;
    this.flagYN = flagYN;
    this.planYN = planYN;
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

  public Integer getCompCd() {

    return compCd;
  }

  public void setCompCd(Integer compCd) {

    this.compCd = compCd;
  }

  public String getToMajor() {

    return toMajor;
  }

  public void setToMajor(String toMajor) {

    this.toMajor = toMajor;
  }

  public String getToPhone() {

    return toPhone;
  }

  public void setToPhone(String toPhone) {

    this.toPhone = toPhone;
  }

  public String getShipDt() {

    return shipDt;
  }

  public void setShipDt(String shipDt) {

    this.shipDt = shipDt;
  }

  public String getShipMajor() {

    return shipMajor;
  }

  public void setShipMajor(String shipMajor) {

    this.shipMajor = shipMajor;
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
