package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class ShipItems {
  private Integer shipCd, cnt;
  private String inOutSeq, flagYn, issueId;
  private Date regDt, issueDt;
}
