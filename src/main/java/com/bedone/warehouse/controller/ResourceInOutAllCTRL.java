package com.bedone.warehouse.controller;

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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.ResourceInOut;
import com.bedone.warehouse.dao.ResourceInOutDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ResourceInOutAllCTRL {

  @Value ("${conf.ex1}")
  private String gUserNm;

  @Value ("${file.dir}")
  private String gFileDir;

  @Value ("${war.dir}")
  private String gWarDir;

  @Autowired
  private SqlSession sqlSession;
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/resourceInOutAll", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceInOutAll () throws Exception {

    utils.info ("=========================resourceInOutAll=============================");

    return "resourceInOutAll";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveResourceInOutAll", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveResourceInOutAll (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = (ArrayList<HashMap<Object, Object>>) obj.get("datas");
    ResourceInOutDAO resourceInOutDao = sqlSession.getMapper(ResourceInOutDAO.class);
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

          utils.info("resourceInOutParam : " + gson.toJson(resourceInOutParam));

          try {
            resourceInOutDao.saveResourceInOut(resourceInOutParam);
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

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

}
