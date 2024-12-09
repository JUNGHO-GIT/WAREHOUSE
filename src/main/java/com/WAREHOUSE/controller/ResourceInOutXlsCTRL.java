// ResourceInOutXlsCTRL.java

package com.WAREHOUSE.controller;

import java.util.HashMap;
import java.util.Map;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutXlsDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ResourceInOutXlsCTRL {

  private final ResourceInOutXlsDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceInOutXls", produces="text/html;charset=UTF-8")
  public ModelAndView resourceInOutXls () throws Exception {

    try {
      logs.info("page", "resourceInOutXls");
      return new ModelAndView("resourceInOutXls");
    }
    catch (Exception e) {
      logs.error("resourceInOutXls", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOutXls", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResourceInOutXls (
    @RequestBody JSONObject obj,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    JSONArray dataList = (JSONArray) obj.get("dataList");
    Map<String, Object> map = new HashMap<String, Object>();

    for (int i = 0; i < dataList.size(); i++) {
      JSONObject jsonObj = (JSONObject) dataList.get(i);

      String userIDParam = (String) userID;
      String inOutDtParam = (String) jsonObj.get("inOutDt");
      String remarkParam = (String) jsonObj.get("remark");
      String inOutParam = (String) jsonObj.get("inOut");
      String planYNParam = (String) jsonObj.get("planYN");
      Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
      Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
      Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
      Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
      Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));

      if ("out".equals(inOutParam)) {
        qtyParam = qtyParam * -1;
      }

      try {
        ResourceInOut param = new ResourceInOut();
        param.setInOutDt(inOutDtParam);
        param.setResrcCd(resrcCdParam);
        param.setQty(qtyParam);
        param.setHouseCd(houseCdParam);
        param.setCompCd(compCdParam);
        param.setUnitPrice(unitPriceParam);
        param.setRemark(remarkParam);
        param.setIssueID(userIDParam);
        param.setPlanYN(planYNParam);
        param.setFlagYN("Y");

        dao.saveResourceInOutXls(param);
        map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        logs.error("saveResourceInOutXls", e.getMessage());
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}