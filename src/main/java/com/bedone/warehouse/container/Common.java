package com.bedone.warehouse.container;

// 공통관리(Common)의 VO 객체
// 생성일 : 2021-04-12 10:5:56 by JDFrame

public class Common {

	private String groupCd, groupNm, cd, nm, target;

  public Common() {
		super();
	}

	public Common (
    String groupCd, String groupNm, String cd, String nm, String target
  ) {
		super();
		this.groupCd = groupCd;
		this.groupNm = groupNm;
		this.cd = cd;
		this.nm = nm;
		this.target = target;
	}

	public String getGroupCd() {
		return groupCd;
	}

	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}

	public String getGroupNm() {
		return groupNm;
	}

	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}

	public String getCd() {
		return cd;
	}

	public void setCd(String cd) {
		this.cd = cd;
	}

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}
}