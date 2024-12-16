package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Shipping {
  private Integer shipCd, compCd;
  private String toMajor, toPhone, shipDt, shipMajor;
  private Integer inOutSeq;
  private String inOutSeqs;
  private String flagYn, planYn, issueId;
  private Date regDt, issueDt;
}
