// ResourceInOutXlsCTRL.java

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
import com.WAREHOUSE.dao.ResourceInOutXlsDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceInOutXlsCTRL {

  @Autowired
  private ResourceInOutXlsDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceInOutXls", produces="text/html;charset=UTF-8")
  public String resourceInOutXls () throws Exception {

    return "resourceInOutXls";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveResourceInOutXls", produces="application/json;charset=UTF-8")
  public String saveResourceInOutXls (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    JSONArray dataList = (JSONArray) obj.get("datas");
    String userID = (String) session.getAttribute("userID");
    String msg = "저장 되었습니다.";
    String objStr = "";

    for (int i = 0; i < dataList.size(); i++) {
      objStr = gson.toJson(dataList.get(i));

      if (!"null".equals(objStr)) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;

          String inOutDtParam = (String) jsonObj.get("inOutDt");
          Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));
          String remarkParam = (String) jsonObj.get("remark");
          String inOutParam = (String) jsonObj.get("inOut");

          if ("out".equals(inOutParam)) {
            qtyParam = qtyParam * -1;
          }

          ResourceInOut resourceInOutParam = new ResourceInOut();
          resourceInOutParam.setInOutDt(inOutDtParam);
          resourceInOutParam.setResrcCd(resrcCdParam);
          resourceInOutParam.setQty(qtyParam);
          resourceInOutParam.setHouseCd(houseCdParam);
          resourceInOutParam.setCompCd(compCdParam);
          resourceInOutParam.setUnitPrice(unitPriceParam);
          resourceInOutParam.setRemark(remarkParam);
          resourceInOutParam.setFlagYN("Y");
          resourceInOutParam.setIssueID(userID);

          try {
            dao.saveResourceInOutXls(resourceInOutParam);
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
