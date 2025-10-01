package com.bedone.warehouse.container;
import java.util.Date;

// 창고관리(House)의 VO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public class House {

  // PRI (houseCd)
  private Integer houseCd;
  private String houseNm, flagYN, issueID, step;
  private String name, isParent, parentsHNm;
  private Integer  parentsHCd, houseOrder;
  private Integer id, pId, tId, level;
  private Date regDate, issueDate;

  public Integer getHouseCd() {
    return houseCd;
  }
  public void setHouseCd(int houseCd) {
    this.houseCd = houseCd;
  }

  public String getHouseNm() {
    return houseNm;
  }
  public void setHouseNm(String houseNm) {
    this.houseNm = houseNm;
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

  public String getStep() {
    return step;
  }
  public void setStep(String step) {
    this.step = step;
  }

  public Integer getParentsHCd() {
    return parentsHCd;
  }
  public void setParentsHCd(int  parentsHCd) {
    this.parentsHCd = parentsHCd;
  }

  public Integer getHouseOrder() {
    return houseOrder;
  }
  public void setHouseOrder(int houseOrder) {
    this.houseOrder = houseOrder;
  }

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getIsParent() {
    return isParent;
  }
  public void setIsParent(String isParent) {
    this.isParent = isParent;
  }

  public String getParentsHNm() {
    return parentsHNm;
  }
  public void setParentsHNm(String parentsHNm) {
    this.parentsHNm = parentsHNm;
  }

  public Integer getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }

  public Integer getPId() {
    return pId;
  }
  public void setPId(int pId) {
    this.pId = pId;
  }

  public Integer getTId() {
    return tId;
  }
  public void setTId(int tId) {
    this.tId = tId;
  }

  public Integer getLevel() {
    return level;
  }
  public void setLevel(int level) {
    this.level = level;
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
