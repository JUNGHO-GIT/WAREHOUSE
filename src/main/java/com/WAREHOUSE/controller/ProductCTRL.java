package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.dao.ProductDAO;
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductCTRL {

  private final ProductDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/product", produces="text/html;charset=UTF-8")
  public ModelAndView product () throws Exception {
    try {
      return new ModelAndView("product");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listProduct", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listProduct(
    @RequestParam(value="findProdNm", required=false) String findProdNm
  ) throws Exception {
    try {
      ArrayList<Product> list = dao.listProduct(findProdNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showProduct", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showProduct (
    @RequestParam(value="prodCd", required=false) Integer prodCd
  ) throws Exception {
    try {
      Product show = dao.showProduct(prodCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveProduct", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveProduct (
    @RequestBody Product param,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveProduct(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}