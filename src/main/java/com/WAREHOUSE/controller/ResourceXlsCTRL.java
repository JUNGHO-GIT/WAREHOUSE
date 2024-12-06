// ResourceXlsCTRL.java

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
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.ResourceXlsDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceXlsCTRL {

  @Autowired
  private ResourceXlsDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceXls", produces="text/html;charset=UTF-8")
  public String resourceXls () throws Exception {

    return "resourceXls";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveResourceXls", produces="application/json;charset=UTF-8")
  public String saveResourceXls (
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

          String resrcNmParam = (String) jsonObj.get("resrcNm");
          String resrcTypeParam = (String) jsonObj.get("resrcType");
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          String makerParam = (String) jsonObj.get("maker");
          String unitParam = (String) jsonObj.get("unit");
          String qualityParam = (String) jsonObj.get("quality");
          String option1Param = (String) jsonObj.get("option1");
          String option2Param = (String) jsonObj.get("option2");
          Integer protectedQtyParam = Integer.parseInt((String) jsonObj.get("protectedQty"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));
          String remarkParam = (String) jsonObj.get("remark");

          Resource resourceParam = new Resource();
          resourceParam.setResrcNm(resrcNmParam);
          resourceParam.setResrcType(resrcTypeParam);
          resourceParam.setHouseCd(houseCdParam);
          resourceParam.setCompCd(compCdParam);
          resourceParam.setMaker(makerParam);
          resourceParam.setUnit(unitParam);
          resourceParam.setQuality(qualityParam);
          resourceParam.setOption1(option1Param);
          resourceParam.setOption2(option2Param);
          resourceParam.setProtectedQty(protectedQtyParam);
          resourceParam.setUnitPrice(unitPriceParam);
          resourceParam.setRemark(remarkParam);
          resourceParam.setIssueID(userID);
          resourceParam.setFlagYN("Y");

          try {
            dao.saveResourceXls(resourceParam);
        	}
          catch (Exception e) {
        	  e.printStackTrace();
        	  msg = "저장 실패";
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