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
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.dao.ProductXlsDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductXlsCTRL {

  private final ProductXlsDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productXls", produces="text/html;charset=UTF-8")
  public ModelAndView productXls () throws Exception {

    try {
      logs.info("page", "productXls");
      return new ModelAndView("productXls");
    }
    catch (Exception e) {
      logs.error("productXls", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveProductXls", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveProductXls (
    @RequestBody HashMap<String, Object> obj,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    @SuppressWarnings("unchecked")
    ArrayList<HashMap<Object, Object>> dataList
    = (ArrayList<HashMap<Object, Object>>)obj.get("dataList");
    Map<String, Object> map = new HashMap<String, Object>();

    for (int i = 0; i < dataList.size(); i++) {
      HashMap<Object, Object> jsonObj = dataList.get(i);

      String userIDParam = (String) userID;
      String prodNmParam = (String) jsonObj.get("prodNm");
      String prodTypeParam = (String) jsonObj.get("prodType");
      String qualityParam = (String) jsonObj.get("quality");
      String option1Param = (String) jsonObj.get("option1");
      String option2Param = (String) jsonObj.get("option2");
      String remarkParam = (String) jsonObj.get("remark");
      String makerParam = (String) jsonObj.get("maker");
      String unitParam = (String) jsonObj.get("unit");
      Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
      Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
      Integer protectedQtyParam = Integer.parseInt((String) jsonObj.get("protectedQty"));
      Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));

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
        param.setRemark(remarkParam);
        param.setIssueID(userIDParam);
        param.setFlagYN("Y");

        dao.saveProductXls(param);
        map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        logs.error("saveProductXls", e.getMessage());
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}