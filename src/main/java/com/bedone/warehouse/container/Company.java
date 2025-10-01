package com.bedone.warehouse.container;
import java.util.Date;

// 거래처(lCompany)의 VO 객체
// 생성일 : 2021-04-12 10:5:56 by JDFrame

public class Company {

  // PRI (compCd)
  private Integer compCd;
	private String compNm, compNo;
  private String owner, major, phone, taxEmail, address, compType, compPart, remarks;
	private String flagYN, issueID;
  private String fileUrl;
	private Date regDate, issueDate;

	public Company() {
		super();
	}

	public Company (
    Integer compCd,
    String compNm, String compNo,
    String owner, String major, String phone, String taxEmail, String address, String compType, String compPart, String remarks,
    String flagYN, String issueID,
    String fileUrl,
    Date regDate, Date issueDate
  ) {
    super();
    this.compCd = compCd;
    this.compNm = compNm;
    this.compNo = compNo;
    this.owner = owner;
    this.major = major;
    this.phone = phone;
    this.taxEmail = taxEmail;
    this.address = address;
    this.compType = compType;
    this.compPart = compPart;
    this.remarks = remarks;
    this.flagYN = flagYN;
    this.issueID = issueID;
    this.fileUrl = fileUrl;
    this.regDate = regDate;
    this.issueDate = issueDate;
  }

  public Integer getCompCd() {
    return compCd;
  }
  public void setCompCd(Integer compCd) {
    this.compCd = compCd;
  }

  public String getCompNm() {
    return compNm;
  }
  public void setCompNm(String compNm) {
    this.compNm = compNm;
  }

  public String getCompNo() {
    return compNo;
  }
  public void setCompNo(String compNo) {
    this.compNo = compNo;
  }

  public String getOwner() {
    return owner;
  }
  public void setOwner(String owner) {
    this.owner = owner;
  }

  public String getMajor() {
    return major;
  }
  public void setMajor(String major) {
    this.major = major;
  }

  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getTaxEmail() {
    return taxEmail;
  }
  public void setTaxEmail(String taxEmail) {
    this.taxEmail = taxEmail;
  }

  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }

  public String getCompType() {
    return compType;
  }
  public void setCompType(String compType) {
    this.compType = compType;
  }

  public String getCompPart() {
    return compPart;
  }
  public void setCompPart(String compPart) {
    this.compPart = compPart;
  }

  public String getRemarks() {
    return remarks;
  }
  public void setRemarks(String remarks) {
    this.remarks = remarks;
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

  public String getFileUrl() {
    return fileUrl;
  }
  public void setFileUrl(String fileUrl) {
    this.fileUrl = fileUrl;
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
