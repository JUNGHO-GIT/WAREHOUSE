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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.SessionAttribute;
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.ResourceDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;
import com.WAREHOUSE.util.Json;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ResourceCTRL {

  private final ResourceDAO dao;
  private final Logs logs;
  private final Json json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resource", produces="text/html;charset=UTF-8")
  public ModelAndView resource () throws Exception {

    try {
      logs.info("page", "resource");
      return new ModelAndView("resource");
    }
    catch (Exception e) {
      logs.error("resource", e.getMessage());
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listResource", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listResource (
    @RequestParam(value="findResrcNm", required=false) String findResrcNm
  ) throws Exception {

    try {
      ArrayList<Resource> list = dao.listResource(findResrcNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listResource", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showResource", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showResource (
    @RequestParam(value="resrcCd", required=false) String resrcCd
  ) throws Exception {

    try {
      Resource show = dao.showResource(Integer.parseInt(resrcCd));
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showResource", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveResource", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveResource (
    @RequestBody Resource param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    logs.info("saveResource", json.toJson(param));

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveResource(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveResource", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}