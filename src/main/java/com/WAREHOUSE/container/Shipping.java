package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Shipping {
  private Integer shipCd, compCd;
  private String toMajor, toPhone, shipDt, shipMajor, inOutSeq;
  private String flagYN, planYN, issueID;
  private Date regDate, issueDate;
}
