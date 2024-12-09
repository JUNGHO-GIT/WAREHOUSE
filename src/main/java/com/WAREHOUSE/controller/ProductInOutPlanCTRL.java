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
import com.WAREHOUSE.container.ProductInOut;
import com.WAREHOUSE.dao.ProductInOutPlanDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutPlanCTRL {

  private final ProductInOutPlanDAO dao;
  private final Logs logs;

  // 0. 제품 입고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/productInPlan", produces="text/html;charset=UTF-8")
  public ModelAndView productInPlan () throws Exception {

    try {
      logs.info("page", "productInPlan");
      return new ModelAndView("productInPlan");
    }
    catch (Exception e) {
      logs.error("productInPlan", e.getMessage());
      return null;
    }

  }

  // 0. 제품 출고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/productOutPlan", produces="text/html;charset=UTF-8")
  public ModelAndView productOutPlan () throws Exception {

    try {
      logs.info("page", "productOutPlan");
      return new ModelAndView("productOutPlan");
    }
    catch (Exception e) {
      logs.error("productOutPlan", e.getMessage());
      return null;
    }

  }

  // 1-1. 제품 입출고 예정 리스트 -----------------------------------------------------------------
  @PostMapping(value="/act/listProductInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listProductInOutPlan (
    @RequestParam("prodCd") String prodCd
  ) throws Exception {

    try {
      ArrayList<ProductInOut> list = dao.listProductInOutPlan(prodCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listProductInOutPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // 1-2. 제품 입출고 예정 상세 -------------------------------------------------------------------
  @PostMapping(value="/act/showProductInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showProductInOutPlan (
    @RequestParam("inOutSeq") Integer inOutSeq
  ) throws Exception {

    try {
      ProductInOut show = dao.showProductInOutPlan(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showProductInOutPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // 1-3. 제품 입출고 예정 저장 -------------------------------------------------------------------
  @PostMapping(value="/act/saveProductInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveProductInOutPlan (
    @RequestBody ProductInOut param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveProductInOutPlan(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveProductInOutPlan", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

}