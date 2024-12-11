package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Company {
  private Integer compCd;
  private String compNm, compNo;
  private String compType, compPart;
  private String compOwner, compMajor;
  private String compAddr, compEmail, compPhone;
  private String remarks, flagYn, issueId;
  private String fileUrl;
  private Date regDt, issueDt;
}
