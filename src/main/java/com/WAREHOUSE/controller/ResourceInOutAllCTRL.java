package com.WAREHOUSE.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceInOutAllCTRL {

  @Autowired
  private ResourceInOutDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceInOutAll", produces="text/html;charset=UTF-8")
  public String resourceInOutAll () throws Exception {

    return "resourceInOutAll";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveResourceInOutAll", produces="application/json;charset=UTF-8")
  public String saveResourceInOutAll (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    JSONArray dataList = (JSONArray) obj.get("datas");
    String msg = "저장되었습니다.";
    String objStr = "";

    for (int i = 0; i < dataList.size(); i++) {
      objStr = gson.toJson(dataList.get(i));

      if (!objStr.equals("null")) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;

          String userIDParam = (String) session.getAttribute("userID");
          String inOutParam = (String) jsonObj.get("inOut");
          String inOutDtParam = (String) jsonObj.get("inOutDt");
          String resrcNmParam = (String) jsonObj.get("resrcNm");
          String compNmParam = (String) jsonObj.get("compNm");
          String houseNmParam = (String) jsonObj.get("houseNm");
          Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));

          if (inOutParam != null && inOutParam.equals("in") == true) {
            qtyParam = qtyParam * 1;
          }
          if (inOutParam != null && inOutParam.equals("out") == true) {
            qtyParam = qtyParam * -1;
          }

          ResourceInOut resourceInOutParam = new ResourceInOut();
          resourceInOutParam.setInOutSeq(0);
          resourceInOutParam.setResrcCd(resrcCdParam);
          resourceInOutParam.setHouseCd(houseCdParam);
          resourceInOutParam.setCompCd(compCdParam);
          resourceInOutParam.setResrcNm(resrcNmParam);
          resourceInOutParam.setHouseNm(houseNmParam);
          resourceInOutParam.setCompNm(compNmParam);
          resourceInOutParam.setQty(qtyParam);
          resourceInOutParam.setUnitPrice(unitPriceParam);
          resourceInOutParam.setInOutDt(inOutDtParam);
          resourceInOutParam.setFlagYN("Y");
          resourceInOutParam.setPlanYN("N");
          resourceInOutParam.setRemark("");
          resourceInOutParam.setIssueID(userIDParam);

          try {
            dao.saveResourceInOut(resourceInOutParam);
          }
          catch (Exception e) {
            msg = "저장 실패";
            e.printStackTrace();
          }
        }
        catch (ParseException e) {
          e.printStackTrace();
        }
      }
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

}