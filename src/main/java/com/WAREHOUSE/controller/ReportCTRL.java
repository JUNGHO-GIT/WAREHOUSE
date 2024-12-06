package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.dao.ReportDAO;
import com.WAREHOUSE.util.Logs;
import com.WAREHOUSE.util.Utils;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ReportCTRL {

  @Autowired
  private ReportDAO dao;
  Logs logs = new Logs();
  Utils utils = new Utils();
  Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportIn", produces="text/html;charset=UTF-8")
  public String reportIn () throws Exception {

    return "reportIn";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportOut", produces="text/html;charset=UTF-8")
  public String reportOut () throws Exception {

    return "reportOut";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportStock", produces="text/html;charset=UTF-8")
  public String reportStock () throws Exception {

    return "reportStock";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/reportHouse", produces="text/html;charset=UTF-8")
  public String reportHouse () throws Exception {

    return "reportHouse";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportProdIn", produces="text/html;charset=UTF-8")
  public String listReportProdIn (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportProdInList = (
      dao.listReportProdIn(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportProdInList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportResrcIn", produces="text/html;charset=UTF-8")
  public String listReportResrcIn (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportResrcInList = (
      dao.listReportResrcIn(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportResrcInList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportProdOut", produces="application/json;charset=UTF-8")
  public String listReportProdOut (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportProdOutList = (
      dao.listReportProdOut(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportProdOutList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportResrcOut", produces="text/html;charset=UTF-8")
  public String listReportResrcOut (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportResrcOutList = (
      dao.listReportResrcOut(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportResrcOutList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportProdStock", produces="text/html;charset=UTF-8")
  public String listReportProdStock (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportStockList = (
      dao.listReportProdStock(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportStockList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listReportResrcStock", produces="text/html;charset=UTF-8")
  public String listReportResrcStock (
    HttpServletRequest request
  ) throws Exception {

    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportStockList = (
      dao.listReportResrcStock(findYear, curMonth, nextYear)
    );

    return gson.toJson(reportStockList);
  }
}