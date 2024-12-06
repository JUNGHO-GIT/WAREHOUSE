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
import com.WAREHOUSE.dao.ProductInOutPlanDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ProductInOutPlanCTRL {

  @Autowired
  private ProductInOutPlanDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // 0. 제품 입고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/productInPlan", produces="text/html;charset=UTF-8")
  public String productInPlan () throws Exception {

    return "productInPlan";
  }

  // 0. 제품 출고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/productOutPlan", produces="text/html;charset=UTF-8")
  public String productOutPlan () throws Exception {

    return "productOutPlan";
  }

  // 1-1. 제품 입출고 예정 리스트 -----------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listProductInOutPlan", produces="application/json;charset=UTF-8")
  public String listProductInOutPlan (
    HttpServletRequest request
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    ArrayList<ProductInOut> productInOutList = dao.listProductInOutPlan(prodCd);

    return gson.toJson(productInOutList);
  }

  // 1-2. 제품 입출고 예정 상세 -------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showProductInOutPlan", produces="application/json;charset=UTF-8")
  public String showProductInOutPlan (
    HttpServletRequest request
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ProductInOut productInOutShow = dao.showProductInOutPlan(Integer.parseInt(inOutSeq));

    return gson.toJson(productInOutShow);
  }

  // 1-3. 제품 입출고 예정 저장 -------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveProductInOutPlan", produces="application/json;charset=UTF-8")
  public String saveProductInOutPlan (
    @RequestBody ProductInOut productInOutParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    productInOutParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (productInOutParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveProductInOutPlan(productInOutParam);
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