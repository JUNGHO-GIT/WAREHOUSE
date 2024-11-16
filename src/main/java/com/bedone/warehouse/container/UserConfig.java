package com.bedone.warehouse.container;

import java.util.Date;

// 사용자설정(UserConfig)의 VO 객체
// 생성일 : 2021-05-10 14:15:24 by JDFrame

public class UserConfig {

  // PRI (configSeq)
  private Integer configSeq;
  private String config, userID, pageNm, gridCd;
  private String userConfigID, userConfigPw, userConfigNm, userConfigPhone, userConfigEmail;
  private String userConfigLevel, userConfigPerm;
  private Integer userConfigCompCd;
  private String flagYN, issueID;
  private Date regDate, issueDate;

	public UserConfig() {
		super();
	}

	public UserConfig (
    Integer configSeq,
    String config, String userID, String pageNm, String gridCd,
    String userConfigID, String userConfigPw, String userConfigNm, String userConfigPhone,
    String userConfigEmail, String userConfigLevel, String userConfigPerm,
    Integer userConfigCompCd,
    String flagYN, String issueID,
    Date regDate, Date issueDate
  ) {
    super();
    this.configSeq = configSeq;
    this.config = config;
    this.userID = userID;
    this.pageNm = pageNm;
    this.gridCd = gridCd;
    this.userConfigID = userConfigID;
    this.userConfigPw = userConfigPw;
    this.userConfigNm = userConfigNm;
    this.userConfigPhone = userConfigPhone;
    this.userConfigEmail = userConfigEmail;
    this.userConfigLevel = userConfigLevel;
    this.userConfigPerm = userConfigPerm;
    this.userConfigCompCd = userConfigCompCd;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getConfigSeq() {
    return configSeq;
  }
  public void setConfigSeq(Integer configSeq) {
    this.configSeq = configSeq;
  }

  public String getConfig() {
    return config;
  }
  public void setConfig(String config) {
    this.config = config;
  }

  public String getUserID() {
    return userID;
  }
  public void setUserID(String userID) {
    this.userID = userID;
  }

  public String getPageNm() {
    return pageNm;
  }
  public void setPageNm(String pageNm) {
    this.pageNm = pageNm;
  }

  public String getGridCd() {
    return gridCd;
  }
  public void setGridCd(String gridCd) {
    this.gridCd = gridCd;
  }

  public String getUserConfigID() {
    return userConfigID;
  }
  public void setUserConfigID(String userConfigID) {
    this.userConfigID = userConfigID;
  }

  public String getUserConfigPw() {
    return userConfigPw;
  }
  public void setUserConfigPw(String userConfigPw) {
    this.userConfigPw = userConfigPw;
  }

  public String getUserConfigNm() {
    return userConfigNm;
  }
  public void setUserConfigNm(String userConfigNm) {
    this.userConfigNm = userConfigNm;
  }

  public String getUserConfigPhone() {
    return userConfigPhone;
  }
  public void setUserConfigPhone(String userConfigPhone) {
    this.userConfigPhone = userConfigPhone;
  }

  public String getUserConfigEmail() {
    return userConfigEmail;
  }
  public void setUserConfigEmail(String userConfigEmail) {
    this.userConfigEmail = userConfigEmail;
  }

  public String getUserConfigLevel() {
    return userConfigLevel;
  }
  public void setUserConfigLevel(String userConfigLevel) {
    this.userConfigLevel = userConfigLevel;
  }

  public String getUserConfigPerm() {
    return userConfigPerm;
  }
  public void setUserConfigPerm(String userConfigPerm) {
    this.userConfigPerm = userConfigPerm;
  }

  public Integer getUserConfigCompCd() {
    return userConfigCompCd;
  }
  public void setUserConfigCompCd(Integer userConfigCompCd) {
    this.userConfigCompCd = userConfigCompCd;
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
