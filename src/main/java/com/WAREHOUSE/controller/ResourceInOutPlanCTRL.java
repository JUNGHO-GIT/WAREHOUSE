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
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutPlanDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ResourceInOutPlanCTRL {

  private final ResourceInOutPlanDAO dao;
  private final Logs logs;

  // 0. 자재 입고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/resourceInPlan", produces="text/html;charset=UTF-8")
  public ModelAndView resourceInPlan () throws Exception {

    try {
      logs.info("page", "resourceInPlan");
      return new ModelAndView("resourceInPlan");
    }
    catch (Exception e) {
      logs.error("resourceInPlan", e.getMessage());
      return null;
    }

  }

  // 0. 자재 출고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/resourceOutPlan", produces="text/html;charset=UTF-8")
  public ModelAndView resourceOutPlan () throws Exception {

    try {
      logs.info("page", "resourceOutPlan");
      return new ModelAndView("resourceOutPlan");
    }
    catch (Exception e) {
      logs.error("resourceOutPlan", e.getMessage());
      return null;
    }

  }

  // 1-1. 자재 입출고 예정 리스트 -----------------------------------------------------------------
  @PostMapping(value="/act/listResourceInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listResourceInOutPlan (
    @RequestParam(value="resrcCd", required=false) String resrcCd
  ) throws Exception {

    try {
      ArrayList<ResourceInOut> list = dao.listResourceInOutPlan(resrcCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listResourceInOutPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // 1-2. 자재 입출고 예정 상세 -------------------------------------------------------------------
  @PostMapping(value="/act/showResourceInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showResourceInOutPlan (
    @RequestParam(value="inOutSeq", required=false) Integer inOutSeq
  ) throws Exception {

    try {
      ResourceInOut resourceInOutShow = dao.showResourceInOutPlan(inOutSeq);
      return ResponseEntity.ok(resourceInOutShow);
    }
    catch (Exception e) {
      logs.error("showResourceInOutPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // 1-3. 자재 입출고 예정 저장 --------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOutPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResourceInOutPlan (
    @RequestBody ResourceInOut param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveResourceInOutPlan(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveResourceInOutPlan", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}