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
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.dao.CompanyDAO;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class CompanyCTRL {

  private final CompanyDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/company"}, produces={"text/plain; charset=UTF-8"})
  public String company () {
    try {
      return "company";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listCompany"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listCompany(
    @RequestParam(value="findCompNm", required=false) String findCompNm
  ) throws Exception {
    try {
      ArrayList<Company> list = dao.listCompany(findCompNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/showCompany"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showCompany(
    @RequestParam(value="compCd", required=false) Integer compCd
  ) throws Exception {
    try {
      Company show = dao.showCompany(compCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveCompany"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveCompany (
    @RequestBody Company param,
    @SessionAttribute(value="userId", required=false) String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveCompany(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}