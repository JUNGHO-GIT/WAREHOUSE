// ResourceXlsCTRL.java

package com.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.warehouse.container.Resource;
import com.warehouse.dao.ResourceXlsDAO;
import com.warehouse.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceXlsCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/resourceXls", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceXls () throws Exception {

    return "resourceXls";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveResourceXls", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveResourceXls (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = (ArrayList<HashMap<Object, Object>>) obj.get("datas");
    ResourceXlsDAO resourceXlsDao = sqlSession.getMapper(ResourceXlsDAO.class);
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
        	  resourceXlsDao.saveResourceXls(resourceParam);
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

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }
}
