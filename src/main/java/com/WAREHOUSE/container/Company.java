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
  private String owner, major, phone, taxEmail, address, compType, compPart, remarks;
  private String flagYN, issueID;
  private String fileUrl;
  private Date regDate, issueDate;
}
