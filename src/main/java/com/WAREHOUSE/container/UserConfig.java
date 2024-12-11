package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class UserConfig {
  private Integer configSeq;
  private String config, userId, pageNm, gridCd;
  private String userConfigID, userConfigPw;
  private String userConfigNm, userConfigPhone, userConfigEmail;
  private String userConfigLevel, userConfigPerm;
  private Integer userConfigCompCd;
  private String flagYn, issueId;
  private Date regDt, issueDt;
}
