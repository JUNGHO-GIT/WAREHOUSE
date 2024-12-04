package com.warehouse.container;

import java.util.Date;
public class Main {

  private String page, subPage, parentsPage;
  private String pageUrl, pageNm, pageIcon;
  private Integer pageOrder, pageNo;
  private String flagYN, issueID;
  private Date regDate, issueDate;
  public Main() {

    super();
  }

  public Main(
    String page,
    String subPage,
    String parentsPage,
    String pageUrl,
    String pageNm,
    String pageIcon,
    Integer pageOrder,
    Integer pageNo,
    String flagYN,
    String issueID,
    Date regDate,
    Date issueDate
  ) {

    super();
    this.page = page;
    this.subPage = subPage;
    this.parentsPage = parentsPage;
    this.pageUrl = pageUrl;
    this.pageNm = pageNm;
    this.pageIcon = pageIcon;
    this.pageOrder = pageOrder;
    this.pageNo = pageNo;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public String getMainMenu() {

    return page;
  }

  public void setMainMenu(String page) {

    this.page = page;
  }

  public String getSubMenu() {

    return subPage;
  }

  public void setSubMenu(String subPage) {

    this.subPage = subPage;
  }

  public String getParentsMenu() {

    return parentsPage;
  }

  public void setParentsMenu(String parentsPage) {

    this.parentsPage = parentsPage;
  }

  public String getPageUrl() {

    return pageUrl;
  }

  public void setPageUrl(String pageUrl) {

    this.pageUrl = pageUrl;
  }

  public String getPageNm() {

    return pageNm;
  }

  public void setPageNm(String pageNm) {

    this.pageNm = pageNm;
  }

  public String getPageIcon() {

    return pageIcon;
  }

  public void setPageIcon(String pageIcon) {

    this.pageIcon = pageIcon;
  }

  public Integer getMenuOrder() {

    return pageOrder;
  }

  public void setMenuOrder(Integer pageOrder) {

    this.pageOrder = pageOrder;
  }

  public Integer getMenuNo() {

    return pageNo;
  }

  public void setMenuNo(Integer pageNo) {

    this.pageNo = pageNo;
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
