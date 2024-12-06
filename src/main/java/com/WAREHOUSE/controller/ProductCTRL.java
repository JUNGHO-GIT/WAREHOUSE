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
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.dao.ProductDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ProductCTRL {

  @Autowired
  private ProductDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/product", produces="text/html;charset=UTF-8")
  public String product () throws Exception {

    return "product";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listProduct", produces="application/json;charset=UTF-8")
  public String listProduct (
    HttpServletRequest request
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    ArrayList<Product> productList = dao.listProduct(findProdNm);

    return gson.toJson(productList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showProduct", produces="application/json;charset=UTF-8")
  public String showProduct (
    HttpServletRequest request
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    Product productShow = dao.showProduct(Integer.valueOf(prodCd));

    return gson.toJson(productShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveProduct", produces="application/json;charset=UTF-8")
  public String saveProduct (
    @RequestBody Product productParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    productParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (productParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveProduct(productParam);
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