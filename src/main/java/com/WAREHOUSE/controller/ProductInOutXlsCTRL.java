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
import com.WAREHOUSE.container.ProductInOut;
import com.WAREHOUSE.dao.ProductInOutXlsDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutXlsCTRL {

  private final ProductInOutXlsDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productInOutXls", produces="text/html;charset=UTF-8")
  public ModelAndView productInOutXls () throws Exception {

    try {
      return new ModelAndView("productInOutXls");
    }
    catch (Exception e) {
      logs.error("productInOutXls", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveProductInOutXls", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveProductInOutXls (
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
      String inOutDtParam = (String) jsonObj.get("inOutDt");
      String remarkParam = (String) jsonObj.get("remark");
      String inOutParam = (String) jsonObj.get("inOut");
      Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
      Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
      Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
      Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
      Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));

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
        param.setRemark(remarkParam);
        param.setIssueID(userIDParam);
        param.setPlanYN("N");
        param.setFlagYN("Y");

        dao.saveProductInOutXls(param);
        map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        e.printStackTrace();
        logs.error("saveProductInOutXls", e.getMessage());
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}