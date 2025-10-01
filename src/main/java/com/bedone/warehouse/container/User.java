package com.bedone.warehouse.container;

// 회원정보(User)의 VO 객체
// 생성일 : 2021-04-13 16:38:49 by JDFrame

import java.util.Date;

public class User {

	// PRI (userID)
	private String userID, passwd, userNm;
	private String phone, email;
	private String uLevel, uPerm;
	private Integer compCd;
	private String flagYN, issueID;
  private Date regDate, issueDate;

	public User() {
		super();
	}

	public User (
    String userID, String passwd, String userNm,
    String phone, String email,
    String uLevel, String uPerm,
    Integer compCd,
    String flagYN, String issueID,
    Date regDate, Date issueDate
  ) {
    super();
    this.userID = userID;
    this.passwd = passwd;
    this.userNm = userNm;
    this.phone = phone;
    this.email = email;
    this.uLevel = uLevel;
    this.uPerm = uPerm;
    this.compCd = compCd;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public String getUserID() {
    return userID;
  }
  public void setUserID(String userID) {
    this.userID = userID;
  }

  public String getPasswd() {
    return passwd;
  }
  public void setPasswd(String passwd) {
    this.passwd = passwd;
  }

  public String getUserNm() {
    return userNm;
  }
  public void setUserNm(String userNm) {
    this.userNm = userNm;
  }

  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  public String getULevel() {
    return uLevel;
  }
  public void setULevel(String uLevel) {
    this.uLevel = uLevel;
  }

  public String getUPerm() {
    return uPerm;
  }
  public void setUPerm(String uPerm) {
    this.uPerm = uPerm;
  }

  public Integer getCompCd() {
    return compCd;
  }
  public void setCompCd(Integer compCd) {
    this.compCd = compCd;
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
