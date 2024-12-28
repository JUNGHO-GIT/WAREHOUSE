package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import com.WAREHOUSE.container.ProductInOut;
import com.WAREHOUSE.dao.ProductInOutXlsDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutXlsCTRL {

  private final ProductInOutXlsDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/productInOutXls"}, produces={"text/plain; charset=UTF-8"})
  public String productInOutXls () {
    try {
      return "productInOutXls";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveProductInOutXls"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveProductInOutXls (
    @RequestBody HashMap<String, Object> obj,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    @SuppressWarnings("unchecked")
    ArrayList<HashMap<Object, Object>> dataList
    = (ArrayList<HashMap<Object, Object>>)obj.get("dataList");
    Map<String, Object> map = new HashMap<String, Object>();

    for (int i = 0; i < dataList.size(); i++) {
      HashMap<Object, Object> jsonObj = dataList.get(i);

      String userIdParam = String.valueOf(userId);
      String inOutDtParam = String.valueOf(jsonObj.get("inOutDt"));
      String remarksParam = String.valueOf(jsonObj.get("remarks"));
      String inOutParam = String.valueOf(jsonObj.get("inOut"));
      Integer prodCdParam = Integer.parseInt(String.valueOf(jsonObj.get("prodCd")));
      Integer qtyParam = Integer.parseInt(String.valueOf(jsonObj.get("qty")));
      Integer houseCdParam = Integer.parseInt(String.valueOf(jsonObj.get("houseCd")));
      Integer compCdParam = Integer.parseInt(String.valueOf(jsonObj.get("compCd")));
      Double unitPriceParam = Double.parseDouble(String.valueOf(jsonObj.get("unitPrice")));

      if ("out".equals(inOutParam)) {
        qtyParam = qtyParam * -1;
      }

      try {
        ProductInOut param = new ProductInOut();
        param.setInOutDt(inOutDtParam);
        param.setProdCd(prodCdParam);
        param.setQty(qtyParam);
        param.setHouseCd(houseCdParam);
        param.setCompCd(compCdParam);
        param.setUnitPrice(unitPriceParam);
        param.setRemarks(remarksParam);
        param.setIssueId(userIdParam);
        param.setPlanYn("N");
        param.setFlagYn("Y");

        dao.saveProductInOutXls(param);
        map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        e.printStackTrace();
        e.printStackTrace();
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}