package com.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.warehouse.dao.ReportDAO;
import com.warehouse.util.Logs;
import com.warehouse.util.Utils;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ReportCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/reportIn", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String reportIn () throws Exception {

    return "reportIn";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/reportOut", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String reportOut () throws Exception {

    return "reportOut";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/reportStock", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String reportStock () throws Exception {

    return "reportStock";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/reportHouse", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String reportHouse () throws Exception {

    return "reportHouse";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportProdIn", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String listReportProdIn (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportProdInDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportProdInList = reportProdInDao.listReportProdIn(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportProdInList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportResrcIn", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String listReportResrcIn (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportResrcInDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportResrcInList = reportResrcInDao.listReportResrcIn(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportResrcInList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportProdOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listReportProdOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportProdOutDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportProdOutList = reportProdOutDao.listReportProdOut(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportProdOutList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportResrcOut", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String listReportResrcOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportResrcOutDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportResrcOutList = reportResrcOutDao.listReportResrcOut(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportResrcOutList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportProdStock", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String listReportProdStock (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportStockDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportStockList = reportStockDao.listReportProdStock(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportStockList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listReportResrcStock", method=RequestMethod.POST, produces="text/html;charset=UTF-8")
  public String listReportResrcStock (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    ReportDAO reportStockDao = sqlSession.getMapper(ReportDAO.class);
    String findYear = request.getParameter("findYear");

    String curMonth = utils.curDt();
    curMonth = curMonth.substring(0, 7);

    Integer nYear = Integer.valueOf(findYear) + 1;
    String nextYear = String.valueOf(nYear);

    ArrayList<HashMap<String, Object>> reportStockList = reportStockDao.listReportResrcStock(findYear, curMonth, nextYear);
    model.addAttribute("rsltJson", gson.toJson(reportStockList));

    return "jsonRs";
  }
}