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
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.ShippingDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ShippingCTRL {

  private final ShippingDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/shipping"}, produces={"text/plain; charset=UTF-8"})
  public String shipping() {
    try {
      return "shipping";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listShipping"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listShipping(
    @RequestParam(value="inOutDt", required=false) String inOutDt,
    @RequestParam(value="findStartDt", required=false) String findStartDt,
    @RequestParam(value="findEndDt", required=false) String findEndDt
  ) throws Exception {
    try {
      ArrayList<HashMap<String, Object>> listShipping = (
        dao.listShipping(inOutDt, findStartDt, findEndDt)
      );
      return ResponseEntity.ok(listShipping);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveShipping"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveShipping (
    @RequestBody Shipping param,
    @SessionAttribute(value="userId", required=false) String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveShipping(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}