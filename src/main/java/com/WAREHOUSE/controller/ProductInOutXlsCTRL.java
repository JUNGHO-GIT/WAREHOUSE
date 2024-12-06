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
import com.WAREHOUSE.dao.ProductInOutXlsDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ProductInOutXlsCTRL {

  @Autowired
  private ProductInOutXlsDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productInOutXls", produces="text/html;charset=UTF-8")
  public String productInOutXls () throws Exception {

    return "productInOutXls";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveProductInOutXls", produces="application/json;charset=UTF-8")
  public String saveProductInOutXls (
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
          Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));
          String remarkParam = (String) jsonObj.get("remark");
          String inOutParam = (String) jsonObj.get("inOut");

          if ("out".equals(inOutParam)) {
            qtyParam = qtyParam * -1;
          }

          ProductInOut productInOutParam = new ProductInOut();
          productInOutParam.setInOutDt(inOutDtParam);
          productInOutParam.setProdCd(prodCdParam);
          productInOutParam.setQty(qtyParam);
          productInOutParam.setHouseCd(houseCdParam);
          productInOutParam.setCompCd(compCdParam);
          productInOutParam.setUnitPrice(unitPriceParam);
          productInOutParam.setRemark(remarkParam);
          productInOutParam.setFlagYN("Y");
          productInOutParam.setIssueID(userID);

          try {
            dao.saveProductInOutXls(productInOutParam);
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