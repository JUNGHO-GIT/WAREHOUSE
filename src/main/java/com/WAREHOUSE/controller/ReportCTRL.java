package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  @GetMapping(value={"/reportIn"}, produces={"text/plain; charset=UTF-8"})
  public String reportIn () {
    try {
      return "reportIn";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/reportOut"}, produces={"text/plain; charset=UTF-8"})
  public String reportOut () {
    try {
      return "reportOut";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/reportStock"}, produces={"text/plain; charset=UTF-8"})
  public String reportStock () {
    try {
      return "reportStock";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/reportHouse"}, produces={"text/plain; charset=UTF-8"})
  public String reportHouse () {
    try {
      return "reportHouse";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listReportProdIn"}, produces={"application/json; charset=UTF-8"})
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
  @PostMapping(value={"/act/listReportResrcIn"}, produces={"application/json; charset=UTF-8"})
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
  @PostMapping(value={"/act/listReportProdOut"}, produces={"application/json; charset=UTF-8"})
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
  @PostMapping(value={"/act/listReportResrcOut"}, produces={"application/json; charset=UTF-8"})
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
  @PostMapping(value={"/act/listReportProdStock"}, produces={"application/json; charset=UTF-8"})
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
  @PostMapping(value={"/act/listReportResrcStock"}, produces={"application/json; charset=UTF-8"})
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