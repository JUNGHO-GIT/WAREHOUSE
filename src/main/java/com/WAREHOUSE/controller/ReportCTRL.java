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
import com.WAREHOUSE.util.Logs;
import com.WAREHOUSE.util.Utils;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ReportCTRL {

  private final ReportDAO dao;
  private final Logs logs;
  private final Utils utils;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportIn", produces="text/html;charset=UTF-8")
  public ModelAndView reportIn () throws Exception {

    try {
      logs.info("page", "reportIn");
      return new ModelAndView("reportIn");
    }
    catch (Exception e) {
      logs.error("reportIn", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportOut", produces="text/html;charset=UTF-8")
  public ModelAndView reportOut () throws Exception {

    try {
      logs.info("page", "reportOut");
      return new ModelAndView("reportOut");
    }
    catch (Exception e) {
      logs.error("reportOut", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportStock", produces="text/html;charset=UTF-8")
  public ModelAndView reportStock () throws Exception {

    try {
      logs.info("page", "reportStock");
      return new ModelAndView("reportStock");
    }
    catch (Exception e) {
      logs.error("reportStock", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportHouse", produces="text/html;charset=UTF-8")
  public ModelAndView reportHouse () throws Exception {

    try {
      logs.info("page", "reportHouse");
      return new ModelAndView("reportHouse");
    }
    catch (Exception e) {
      logs.error("reportHouse", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdIn", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> listReportProdIn (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportProdIn", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcIn", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> listReportResrcIn (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportResrcIn", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdOut", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listReportProdOut (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportProdOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcOut", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> listReportResrcOut (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportResrcOut", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportProdStock", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> listReportProdStock (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportProdStock", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listReportResrcStock", produces="text/html;charset=UTF-8")
  public ResponseEntity<?> listReportResrcStock (
    @RequestParam("findYear") String findYearParam
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
      logs.error("listReportResrcStock", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }
}