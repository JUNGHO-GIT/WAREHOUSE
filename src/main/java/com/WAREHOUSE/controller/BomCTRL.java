package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.Bom;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.BomDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class BomCTRL {

  @Autowired
  private BomDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/bom", produces="text/html;charset=UTF-8")
  public String bom () throws Exception {

    return "bom";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listBom", produces="application/json;charset=UTF-8")
  public String listBom (
    HttpServletRequest request
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    ArrayList<Product> bomList = dao.listBom(findProdNm);

    return gson.toJson(bomList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showBom", produces="application/json;charset=UTF-8")
  public String showBom (
    HttpServletRequest request
  ) throws Exception {

    Integer prodCd = Integer.valueOf((String) request.getParameter("prodCd"));
    String bomType = (String) request.getParameter("bomType");
    ArrayList<Resource> showBom = dao.showBom(prodCd, bomType);

    return gson.toJson(showBom);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveBom", produces="application/json;charset=UTF-8")
  public String saveBom (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = gson.fromJson(obj.get("datas").toString(), new com.google.gson.reflect.TypeToken<ArrayList<HashMap<Object, Object>>>(){}.getType());
    String msg = "저장되었습니다.";
    String objStr = "";

    for (int i = 0; i < dataList.size(); i++) {
      objStr = gson.toJson(dataList.get(i));

      if (!"null".equals(objStr)) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;

          String userIDParam = (String) session.getAttribute("userID");
          String bomTypeParam = (String) jsonObj.get("bomType");
          String flagYNParam = (String) jsonObj.get("flagYN");

          Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
          Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Double unitQtyParam = Double.parseDouble((String) jsonObj.get("unitQty"));

          Bom bomParam = new Bom();
          bomParam.setProdCd(prodCdParam);
          bomParam.setResrcCd(resrcCdParam);
          bomParam.setQty(qtyParam);
          bomParam.setUnitQty(unitQtyParam);
          bomParam.setBomType(bomTypeParam);
          bomParam.setFlagYN(flagYNParam);
          bomParam.setIssueID(userIDParam);

          if (flagYNParam.equals("N")) {
            msg = "삭제되었습니다.";
          }
          try {
            dao.saveBom(bomParam);
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