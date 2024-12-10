package com.WAREHOUSE.container;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class User {
  private String userID, passwd, userNm;
  private String phone, email;
  private Integer compCd;
  private String flagYN, issueID;
  private Date regDate, issueDate;

  @JsonProperty("uLevel")
  private String uLevel;

  @JsonProperty("uPerm")
  private String uPerm;
}
