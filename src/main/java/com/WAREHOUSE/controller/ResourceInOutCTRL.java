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
import com.WAREHOUSE.dao.ResourceInOutDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ResourceInOutCTRL {

  private final ResourceInOutDAO dao;
  private final Logs logs;

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceIn", produces="text/html;charset=UTF-8")
  public ModelAndView resourceIn () throws Exception {

    try {
      logs.info("page", "resourceIn");
      return new ModelAndView("resourceIn");
    }
    catch (Exception e) {
      logs.error("resourceIn", e.getMessage());
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceOut", produces="text/html;charset=UTF-8")
  public ModelAndView resourceOut () throws Exception {

    try {
      logs.info("page", "resourceOut");
      return new ModelAndView("resourceOut");
    }
    catch (Exception e) {
      logs.error("resourceOut", e.getMessage());
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listResourceInOut (
    @RequestParam("resrcCd") String resrcCd
  ) throws Exception {

    try {
      ArrayList<ResourceInOut> list = dao.listResourceInOut(resrcCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listResourceInOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showResourceInOut (
    @RequestParam("inOutSeq") Integer inOutSeq
  ) throws Exception {

    try {
      ResourceInOut show = dao.showResourceInOut(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showResourceInOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResourceInOut (
    @RequestBody ResourceInOut param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveResourceInOut(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveResourceInOut", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}