package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class User {
  private String userId, userPw, userNm;
  private String userPhone, userEmail;
  private Integer compCd;
  private String flagYn, issueId;
  private Date regDt, issueDt;
  private String userLevel;
  private String userPerm;
}
