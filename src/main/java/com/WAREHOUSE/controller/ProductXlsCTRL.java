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
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.dao.ProductXlsDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductXlsCTRL {

  private final ProductXlsDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/productXls"}, produces={"text/plain; charset=UTF-8"})
  public String productXls() {
    try {
      return "productXls";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveProductXls"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveProductXls (
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
      String prodNmParam = String.valueOf(jsonObj.get("prodNm"));
      String prodTypeParam = String.valueOf(jsonObj.get("prodType"));
      String qualityParam = String.valueOf(jsonObj.get("quality"));
      String option1Param = String.valueOf(jsonObj.get("option1"));
      String option2Param = String.valueOf(jsonObj.get("option2"));
      String remarksParam = String.valueOf(jsonObj.get("remarks"));
      String makerParam = String.valueOf(jsonObj.get("maker"));
      String unitParam = String.valueOf(jsonObj.get("unit"));
      Integer houseCdParam = Integer.parseInt(String.valueOf(jsonObj.get("houseCd")));
      Integer compCdParam = Integer.parseInt(String.valueOf(jsonObj.get("compCd")));
      Integer protectedQtyParam = Integer.parseInt(String.valueOf(jsonObj.get("protectedQty")));
      Double unitPriceParam = Double.parseDouble(String.valueOf(jsonObj.get("unitPrice")));

      try {
        Product param = new Product();
        param.setProdNm(prodNmParam);
        param.setProdType(prodTypeParam);
        param.setHouseCd(houseCdParam);
        param.setCompCd(compCdParam);
        param.setMaker(makerParam);
        param.setUnit(unitParam);
        param.setQuality(qualityParam);
        param.setOption1(option1Param);
        param.setOption2(option2Param);
        param.setProtectedQty(protectedQtyParam);
        param.setUnitPrice(unitPriceParam);
        param.setRemarks(remarksParam);
        param.setIssueId(userIdParam);
        param.setFlagYn("Y");

        dao.saveProductXls(param);
        map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        e.printStackTrace();
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}