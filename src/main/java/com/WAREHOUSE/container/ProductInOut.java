package com.WAREHOUSE.container;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

// -------------------------------------------------------------------------------------------------
@Getter
@Setter
public class ProductInOut {
  private Integer inOutSeq;
  private String inOutDt, inOut;
  private Integer prodCd;
  private String prodNm;
  private Integer qty;
  private Double unitPrice, supplyPrice;
  private String remarks;
  private Integer houseCd, compCd;
  private String houseNm, compNm;
  private String fileUrl;
  private String flagYn, planYn, issueId;
  private Date regDt, issueDt;
}
