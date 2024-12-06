package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class UserConfig {
  private Integer configSeq;
  private String config, userID, pageNm, gridCd;
  private String userConfigID, userConfigPw;
  private String userConfigNm, userConfigPhone, userConfigEmail;
  private String userConfigLevel, userConfigPerm;
  private Integer userConfigCompCd;
  private String flagYN, issueID;
  private Date regDate, issueDate;
}
