package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class Files {
  private Integer fileSeq;
  private String tableNm, tableKey, fileUrl, fileNm;
  private String flagYn, issueId;
  private Date regDt, issueDt;
}
