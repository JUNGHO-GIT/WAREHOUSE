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
import com.WAREHOUSE.dao.ProductInOutDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutCTRL {

  private final ProductInOutDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productIn", produces="text/html;charset=UTF-8")
  public ModelAndView productIn () throws Exception {

    try {
      logs.info("page", "productIn");
      return new ModelAndView("productIn");
    }
    catch (Exception e) {
      logs.error("productIn", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/productOut", produces="text/html;charset=UTF-8")
  public ModelAndView productOut () throws Exception {

    try {
      logs.info("page", "productOut");
      return new ModelAndView("productOut");
    }
    catch (Exception e) {
      logs.error("productOut", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listProductInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listProductInOut(
    @RequestParam("prodCd") String prodCd
  ) throws Exception {

    try {
      ArrayList<ProductInOut> list = dao.listProductInOut(prodCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listProductInOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showProductInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showProductInOut (
    @RequestParam("inOutSeq") Integer inOutSeq
  ) throws Exception {

    try {
      ProductInOut show = dao.showProductInOut(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showProductInOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveProductInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveProductInOut (
    @RequestBody ProductInOut param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveProductInOut(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveProductInOut", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}