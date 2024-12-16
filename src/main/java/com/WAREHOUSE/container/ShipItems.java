package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class ShipItems {
  private Integer shipCd, cnt;
  private Integer inOutSeq;
  private String inOutSeqs;
  private String flagYn, issueId;
  private Date regDt, issueDt;
}
