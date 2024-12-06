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
import com.WAREHOUSE.container.ProductInOut;
import com.WAREHOUSE.dao.ProductInOutDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ProductInOutAllCTRL {

  @Autowired
  private ProductInOutDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productInOutAll", produces="text/html;charset=UTF-8")
  public String productInOutAll () throws Exception {

    return "productInOutAll";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveProductInOutAll", produces="application/json;charset=UTF-8")
  public String saveProductInOutAll (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    JSONArray dataList = (JSONArray) obj.get("datas");
    String msg = "저장되었습니다.";
    String objStr = "";

    for (int i = 0; i < dataList.size(); i++) {
      objStr = gson.toJson(dataList.get(i));

      if (objStr != null && objStr.length() > 0) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;
          String userIDParam = (String) session.getAttribute("userID");
          String inOutParam = (String) jsonObj.get("inOut");
          String inOutDtParam = (String) jsonObj.get("inOutDt");
          String prodNmParam = (String) jsonObj.get("prodNm");
          String compNmParam = (String) jsonObj.get("compNm");
          String houseNmParam = (String) jsonObj.get("houseNm");
          Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));

          if (inOutParam != null && inOutParam.equals("in") == true) {
            qtyParam = qtyParam * 1;
          }
          else if (inOutParam != null && inOutParam.equals("out") == true) {
            qtyParam = qtyParam * -1;
          }

          ProductInOut productInOutParam = new ProductInOut();
          productInOutParam.setInOutSeq(0);
          productInOutParam.setProdCd(prodCdParam);
          productInOutParam.setHouseCd(houseCdParam);
          productInOutParam.setCompCd(compCdParam);
          productInOutParam.setProdNm(prodNmParam);
          productInOutParam.setHouseNm(houseNmParam);
          productInOutParam.setCompNm(compNmParam);
          productInOutParam.setQty(qtyParam);
          productInOutParam.setUnitPrice(unitPriceParam);
          productInOutParam.setInOutDt(inOutDtParam);
          productInOutParam.setFlagYN("Y");
          productInOutParam.setPlanYN("N");
          productInOutParam.setRemark("");
          productInOutParam.setIssueID(userIDParam);

          try {
            dao.saveProductInOut(productInOutParam);
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
