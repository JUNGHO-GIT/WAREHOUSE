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
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.ShippingDAO;
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ShippingCTRL {

  private final ShippingDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipping", produces="text/html;charset=UTF-8")
  public ModelAndView shipping () throws Exception {
    try {
      return new ModelAndView("shipping");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listShipping", produces="application/json;charset=UTF-8")
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
  @PostMapping(value="/act/saveShipping", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveShipping (
    @RequestBody Shipping param,
    @SessionAttribute("userId") String userId
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