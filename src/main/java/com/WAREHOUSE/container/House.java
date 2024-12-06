package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class House {
  private Integer houseCd;
  private String houseNm, flagYN, issueID, step;
  private String name, isParent, parentsHNm;
  private Integer parentsHCd, houseOrder;
  private Integer id, pId, tId, level;
  private Date regDate, issueDate;
}
