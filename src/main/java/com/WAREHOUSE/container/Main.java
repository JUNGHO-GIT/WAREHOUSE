package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Main {
  private String page, subPage, parentsPage;
  private String pageUrl, pageNm, pageIcon;
  private Integer pageOrder, pageNo;
  private String flagYn, issueId;
  private Date regDt, issueDt;
}
