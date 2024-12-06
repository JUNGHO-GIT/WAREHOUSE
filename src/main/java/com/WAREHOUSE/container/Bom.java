package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Bom {
  private Integer prodCd, resrcCd;
  private String bomType;
  private Integer qty;
  private Double unitQty;
  private String flagYN, issueID;
  private Date regDate, issueDate;
}
