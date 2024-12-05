package com.bedone.wms.container;

import java.util.Date;
public class Files {

  private Integer fileSeq;
  private String tableNm, tableKey, fileUrl, fileNm;
  private String flagYN, issueID;
  private Date regDate, issueDate;
  public Files() {

    super();
  }

  public Files(
    Integer fileSeq,
    String tableNm,
    String tableKey,
    String fileUrl,
    String fileNm,
    String flagYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.fileSeq = fileSeq;
    this.tableNm = tableNm;
    this.tableKey = tableKey;
    this.fileUrl = fileUrl;
    this.fileNm = fileNm;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getFileSeq() {

    return fileSeq;
  }

  public void setFileSeq(Integer fileSeq) {

    this.fileSeq = fileSeq;
  }

  public String getTableNm() {

    return tableNm;
  }

  public void setTableNm(String tableNm) {

    this.tableNm = tableNm;
  }

  public String getTableKey() {

    return tableKey;
  }

  public void setTableKey(String tableKey) {

    this.tableKey = tableKey;
  }

  public String getFileUrl() {

    return fileUrl;
  }

  public void setFileUrl(String fileUrl) {

    this.fileUrl = fileUrl;
  }

  public String getFileNm() {

    return fileNm;
  }

  public void setFileNm(String fileNm) {

    this.fileNm = fileNm;
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
