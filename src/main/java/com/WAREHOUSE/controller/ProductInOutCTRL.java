package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
public class ProductInOutCTRL {

  @Autowired
  private ProductInOutDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productIn", produces="text/html;charset=UTF-8")
  public String productIn () throws Exception {

    return "productIn";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productOut", produces="text/html;charset=UTF-8")
  public String productOut () throws Exception {

    return "productOut";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listProductInOut", produces="application/json;charset=UTF-8")
  public String listProductInOut (
    HttpServletRequest request
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    ArrayList<ProductInOut> productInOutList = dao.listProductInOut(prodCd);

    return gson.toJson(productInOutList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showProductInOut", produces="application/json;charset=UTF-8")
  public String showProductInOut (
    HttpServletRequest request
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ProductInOut productInOutShow = dao.showProductInOut(Integer.valueOf(inOutSeq));

    return gson.toJson(productInOutShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveProductInOut", produces="application/json;charset=UTF-8")
  public String saveProductInOut (
    @RequestBody ProductInOut productInOutParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    String flagYN = (String) productInOutParam.getFlagYN();
    String msg = "저장되었습니다.";

    if (flagYN.equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      productInOutParam.setIssueID(userID);
      dao.saveProductInOut(productInOutParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }
}