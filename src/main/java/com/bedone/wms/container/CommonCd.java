package com.bedone.wms.container;

import java.util.Date;
public class CommonCd {

  private String groupCd, itemCd;
  private String groupNm, itemNm;
  private Integer itemSeq;
  private String itemMemo;
  private String flagYN, issueID;
  private Date regDate, issueDate;
  public CommonCd() {

    super();
  }

  public CommonCd(
    String groupCd,
    String itemCd,
    String groupNm,
    String itemNm,
    Integer itemSeq,
    String itemMemo,
    String flagYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.groupCd = groupCd;
    this.itemCd = itemCd;
    this.groupNm = groupNm;
    this.itemNm = itemNm;
    this.itemSeq = itemSeq;
    this.itemMemo = itemMemo;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public String getGroupCd() {

    return groupCd;
  }

  public void setGroupCd(String groupCd) {

    this.groupCd = groupCd;
  }

  public String getItemCd() {

    return itemCd;
  }

  public void setItemCd(String itemCd) {

    this.itemCd = itemCd;
  }

  public String getGroupNm() {

    return groupNm;
  }

  public void setGroupNm(String groupNm) {

    this.groupNm = groupNm;
  }

  public String getItemNm() {

    return itemNm;
  }

  public void setItemNm(String itemNm) {

    this.itemNm = itemNm;
  }

  public Integer getItemSeq() {

    return itemSeq;
  }

  public void setItemSeq(Integer itemSeq) {

    this.itemSeq = itemSeq;
  }

  public String getItemMemo() {

    return itemMemo;
  }

  public void setItemMemo(String itemMemo) {

    this.itemMemo = itemMemo;
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
