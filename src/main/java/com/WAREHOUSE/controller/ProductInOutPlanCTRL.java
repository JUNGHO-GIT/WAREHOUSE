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
import com.WAREHOUSE.dao.ProductInOutPlanDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ProductInOutPlanCTRL {

  private final ProductInOutPlanDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // 0. 제품 입고 예정 -----------------------------------------------------------------------------
  @GetMapping(value={"/productInPlan"}, produces={"text/plain; charset=UTF-8"})
  public String productInPlan () {
    try {
      return "productInPlan";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // 0. 제품 출고 예정 -----------------------------------------------------------------------------
  @GetMapping(value={"/productOutPlan"}, produces={"text/plain; charset=UTF-8"})
  public String productOutPlan () {
    try {
      return "productOutPlan";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // 1-1. 제품 입출고 예정 리스트 -----------------------------------------------------------------
  @PostMapping(value={"/act/listProductInOutPlan"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listProductInOutPlan (
    @RequestParam(value="prodCd", required=false) String prodCd
  ) throws Exception {
    try {
      ArrayList<ProductInOut> list = dao.listProductInOutPlan(prodCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // 1-2. 제품 입출고 예정 상세 -------------------------------------------------------------------
  @PostMapping(value={"/act/showProductInOutPlan"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showProductInOutPlan (
    @RequestParam(value="inOutSeq", required=false) Integer inOutSeq
  ) throws Exception {
    try {
      ProductInOut show = dao.showProductInOutPlan(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // 1-3. 제품 입출고 예정 저장 -------------------------------------------------------------------
  @PostMapping(value={"/act/saveProductInOutPlan"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveProductInOutPlan (
    @RequestBody ProductInOut param,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveProductInOutPlan(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

}