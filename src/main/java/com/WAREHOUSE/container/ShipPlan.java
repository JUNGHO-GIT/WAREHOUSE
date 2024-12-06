package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class ShipPlan {
  private Integer shipCd, cnt;
  private String inOutSeq, flagYN, issueID;
  private Date regDate, issueDate;

}
