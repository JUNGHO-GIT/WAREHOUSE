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
import com.WAREHOUSE.container.ProductInOut;
import com.WAREHOUSE.dao.ProductInOutDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutCTRL {

  private final ProductInOutDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/productIn"}, produces={"text/plain; charset=UTF-8"})
  public String productIn () {
    try {
      return "productIn";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/productOut"}, produces={"text/plain; charset=UTF-8"})
  public String productOut () {
    try {
      return "productOut";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listProductInOut"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listProductInOut(
    @RequestParam(value="prodCd", required=false) String prodCd
  ) throws Exception {
    try {
      ArrayList<ProductInOut> list = dao.listProductInOut(prodCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/showProductInOut"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showProductInOut (
    @RequestParam(value="inOutSeq", required=false) Integer inOutSeq
  ) throws Exception {
    try {
      ProductInOut show = dao.showProductInOut(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveProductInOut"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveProductInOut (
    @RequestBody ProductInOut param,
    @SessionAttribute(value="userId", required=false) String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveProductInOut(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}