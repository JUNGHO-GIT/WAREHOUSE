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
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutDAO;
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ResourceInOutAllCTRL {

  private final ResourceInOutDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceInOutAll", produces="text/html;charset=UTF-8")
  public ModelAndView resourceInOutAll () throws Exception {
    try {
      return new ModelAndView("resourceInOutAll");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOutAll", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResourceInOutAll (
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
      String inOutParam = String.valueOf(jsonObj.get("inOut"));
      String inOutDtParam = String.valueOf(jsonObj.get("inOutDt"));
      String resrcNmParam  = String.valueOf(jsonObj.get("resrcNm"));
      String compNmParam = String.valueOf(jsonObj.get("compNm"));
      String houseNmParam = String.valueOf(jsonObj.get("houseNm"));
      Integer resrcCdParam = Integer.parseInt(String.valueOf(jsonObj.get("resrcCd")));
      Integer compCdParam = Integer.parseInt(String.valueOf(jsonObj.get("compCd")));
      Integer houseCdParam = Integer.parseInt(String.valueOf(jsonObj.get("houseCd")));
      Integer qtyParam = Integer.parseInt(String.valueOf(jsonObj.get("qty")));
      Double unitPriceParam = Double.parseDouble(String.valueOf(jsonObj.get("unitPrice")));

      if (inOutParam != null && inOutParam.equals("in") == true) {
        qtyParam = qtyParam * 1;
      }
      if (inOutParam != null && inOutParam.equals("out") == true) {
        qtyParam = qtyParam * -1;
      }

      try {
        ResourceInOut param = new ResourceInOut();
        param.setInOutSeq(0);
        param.setResrcCd(resrcCdParam);
        param.setHouseCd(houseCdParam);
        param.setCompCd(compCdParam);
        param.setResrcNm(resrcNmParam);
        param.setHouseNm(houseNmParam);
        param.setCompNm(compNmParam);
        param.setQty(qtyParam);
        param.setUnitPrice(unitPriceParam);
        param.setInOutDt(inOutDtParam);
        param.setFlagYn("Y");
        param.setPlanYn("N");
        param.setRemarks("");
        param.setIssueId(userIdParam);

        dao.saveResourceInOut(param);
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