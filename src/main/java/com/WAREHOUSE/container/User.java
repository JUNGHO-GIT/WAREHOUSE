package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class User {
  private String userID, passwd, userNm;
  private String phone, email;
  private String uLevel, uPerm;
  private Integer compCd;
  private String flagYN, issueID;
  private Date regDate, issueDate;
}
