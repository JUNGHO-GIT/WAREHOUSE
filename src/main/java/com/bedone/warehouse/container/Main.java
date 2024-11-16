package com.bedone.warehouse.container;

import java.util.Date;

// 메인(Main)의 VO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public class Main {

  // PRI ()
  private String menu, subMenu, parentsMenu;
  private String pageUrl, pageNm, pageIcon;
  private Integer menuOrder, menuNo;
  private String flagYN, issueID;
  private Date regDate, issueDate;

  public Main() {
    super();
  }

  public Main (
    String menu, String subMenu, String parentsMenu,
    String pageUrl, String pageNm, String pageIcon,
    Integer menuOrder, Integer menuNo,
    String flagYN, String issueID,
    Date regDate, Date issueDate
  ) {
    super();
    this.menu = menu;
    this.subMenu = subMenu;
    this.parentsMenu = parentsMenu;
    this.pageUrl = pageUrl;
    this.pageNm = pageNm;
    this.pageIcon = pageIcon;
    this.menuOrder = menuOrder;
    this.menuNo = menuNo;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public String getMainMenu() {
    return menu;
  }
  public void setMainMenu(String menu) {
    this.menu = menu;
  }

  public String getSubMenu() {
    return subMenu;
  }
  public void setSubMenu(String subMenu) {
    this.subMenu = subMenu;
  }

  public String getParentsMenu() {
    return parentsMenu;
  }
  public void setParentsMenu(String parentsMenu) {
    this.parentsMenu = parentsMenu;
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
    return menuOrder;
  }
  public void setMenuOrder(Integer menuOrder) {
    this.menuOrder = menuOrder;
  }

  public Integer getMenuNo() {
    return menuNo;
  }
  public void setMenuNo(Integer menuNo) {
    this.menuNo = menuNo;
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
