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
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.dao.CompanyDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class CompanyCTRL {

  private final CompanyDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/company", produces="text/html;charset=UTF-8")
  public ModelAndView company () throws Exception {

    try {
      logs.info("page", "company");
      return new ModelAndView("company");
    }
    catch (Exception e) {
      logs.error("company", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listCompany", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listCompany(
    @RequestParam("findCompNm") String findCompNm
  ) throws Exception {

    try {
      ArrayList<Company> list = dao.listCompany(findCompNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listCompany", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showCompany", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showCompany(
    @RequestParam("compCd") Integer compCd
  ) throws Exception {

    try {
      Company show = dao.showCompany(compCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showCompany", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveCompany", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveCompany (
    @RequestBody Company param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveCompany(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveCompany", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}