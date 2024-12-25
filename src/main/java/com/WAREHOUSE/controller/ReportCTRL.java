package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.dao.ReportDAO;
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import com.WAREHOUSE.util.Utils;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ReportCTRL {

  private final ReportDAO dao;
  private final Utils utils;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportIn", produces="text/html")
  public ModelAndView reportIn () throws Exception {
    try {
      return new ModelAndView("reportIn");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportOut", produces="text/html")
  public ModelAndView reportOut () throws Exception {
    try {
      return new ModelAndView("reportOut");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportStock", produces="text/html")
  public ModelAndView reportStock () throws Exception {
    try {
      return new ModelAndView("reportStock");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportHouse", produces="text/html")
  public ModelAndView reportHouse () throws Exception {
    try {
      return new ModelAndView("reportHouse");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdIn", produces="application/json")
  public ResponseEntity<?> listReportProdIn (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportProdIn(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcIn", produces="application/json")
  public ResponseEntity<?> listReportResrcIn (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportResrcIn(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdOut", produces="application/json")
  public ResponseEntity<?> listReportProdOut (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportProdOut(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcOut", produces="application/json")
  public ResponseEntity<?> listReportResrcOut (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportResrcOut(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdStock", produces="application/json")
  public ResponseEntity<?> listReportProdStock (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportProdStock(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcStock", produces="application/json")
  public ResponseEntity<?> listReportResrcStock (
    @RequestParam(value="findYear", required=false) String findYearParam
  ) throws Exception {

    String findYear = findYearParam;
    String curMonth = utils.curDt().substring(0, 7);
    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    try {
      ArrayList<HashMap<String, Object>> list = (
        dao.listReportResrcStock(findYear, curMonth, nextYear)
      );
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}