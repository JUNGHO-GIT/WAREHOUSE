package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class House {
  private Integer houseCd;
  private String houseNm;

  private Integer houseParentCd;
  private String houseParentNm;

  private Integer houseOrder;
  private Integer houseLevel;
  private Integer houseStep;

  private String flagYn, issueId;
  private Date regDt, issueDt;

  // test
  private String name, isParent, step;
  private Integer id, pId, tId, level;
}
