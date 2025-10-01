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
import com.bedone.warehouse.container.ProductInOut;
import com.bedone.warehouse.dao.ProductInOutXlsDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ProductInOutXlsCTRL {

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
  (value="/productInOutXls", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productInOutXls () throws Exception {

    utils.info ("======================productInOutXls============================");

    return "productInOutXls";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveProductInOutXls", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveProductInOutXls (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = (ArrayList<HashMap<Object, Object>>) obj.get("datas");
    ProductInOutXlsDAO productInOutXlsDao = sqlSession.getMapper(ProductInOutXlsDAO.class);
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

          utils.info("productInOutParam : " + gson.toJson(productInOutParam));

          try {
            productInOutXlsDao.saveProductInOutXls(productInOutParam);
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
