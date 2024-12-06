package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class CommonCd {
  private String groupCd, itemCd;
  private String groupNm, itemNm;
  private Integer itemSeq;
  private String itemMemo;
  private String flagYN, issueID;
  private Date regDate, issueDate;
}
