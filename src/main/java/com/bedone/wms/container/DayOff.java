package com.bedone.wms.container;

public class DayOff {

  private String userID, userNm, offDate, flagYN, issueID, offDay, findUserNm;
  private Integer restCnt, offSeq;
  public DayOff() {

    super();
  }

  public DayOff(
    String userID,
    String userNm,
    String offDate,
    String flagYN,
    String issueId,
    String offDay,
    String findUserNm,
    Integer restCnt,
    Integer offSeq
  ) {

    super();
    this.userID = userID;
    this.userNm = userNm;
    this.offDate = offDate;
    this.restCnt = restCnt;
    this.flagYN = flagYN;
    this.issueID = issueId;
    this.offDay = offDay;
    this.findUserNm = findUserNm;
    this.offSeq = offSeq;
  }

  public Integer getOffSeq() {

    return offSeq;
  }

  public void setOffSeq(int offSeq) {

    this.offSeq = offSeq;
  }

  public String getUserID() {

    return userID;
  }

  public void setUserID(String userID) {

    this.userID = userID;
  }

  public String getUserNm() {

    return userNm;
  }

  public void setUserNm(String userNm) {

    this.userNm = userNm;
  }

  public String getOffDate() {

    return offDate;
  }

  public void setOffDate(String offDate) {

    this.offDate = offDate;
  }

  public Integer getRestCnt() {

    return restCnt;
  }

  public void setRestCnt(int restCnt) {

    this.restCnt = restCnt;
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

  public void setIssueId(String issueID) {

    this.issueID = issueID;
  }

  public String getOffDay() {

    return offDay;
  }

  public void setOffDay(String offDay) {

    this.offDay = offDay;
  }

  public String getFindUserNm() {

    return findUserNm;
  }

  public void setFindUserNm(String findUserNm) {

    this.findUserNm = findUserNm;
  }
}
