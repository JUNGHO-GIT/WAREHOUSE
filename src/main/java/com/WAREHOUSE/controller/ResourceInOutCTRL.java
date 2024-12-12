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
      return new ModelAndView("resourceIn");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceOut", produces="text/html;charset=UTF-8")
  public ModelAndView resourceOut () throws Exception {

    try {
      return new ModelAndView("resourceOut");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listResourceInOut (
    @RequestParam(value="resrcCd", required=false) String resrcCd
  ) throws Exception {

    try {
      ArrayList<ResourceInOut> list = dao.listResourceInOut(resrcCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showResourceInOut (
    @RequestParam(value="inOutSeq", required=false) Integer inOutSeq
  ) throws Exception {

    try {
      ResourceInOut show = dao.showResourceInOut(inOutSeq);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResourceInOut (
    @RequestBody ResourceInOut param,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveResourceInOut(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}