package com.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.warehouse.container.Company;
import com.warehouse.container.Shipping;
import com.warehouse.dao.CompanyDAO;
import com.warehouse.dao.ShipItemsDAO;
import com.warehouse.util.Logs;
import com.warehouse.util.Utils;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ShipItemsCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/shipItems", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String shipItems () throws Exception {

    return "shipItems";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listShipItems", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listShipItems (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipDt = request.getParameter("shipDt");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipItemsDAO shipItemsDao = sqlSession.getMapper(ShipItemsDAO.class);

    ArrayList<HashMap<String, Object>> listShipItems = shipItemsDao.listShipItems(shipDt, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(listShipItems));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listShipItemsDetail", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listShipItemsDetail (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipItemsDAO shipItemsDao = sqlSession.getMapper(ShipItemsDAO.class);

    ArrayList<HashMap<String, Object>> listShipItemsDetail = shipItemsDao.listShipItemsDetail(shipCd, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(listShipItemsDetail));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/showShipItems", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showShipItems (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipItemsDAO shipItemsDao = sqlSession.getMapper(ShipItemsDAO.class);

    HashMap<String, Object> shipItemsShow = shipItemsDao.showShipItems(shipCd, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(shipItemsShow));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveShipItems", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveShipItems (
    @RequestBody Shipping shippingParam,
    HttpSession session,
    Model model
  ) throws Exception {

    ShipItemsDAO shipItemsDao = sqlSession.getMapper(ShipItemsDAO.class);
    String userID = (String) session.getAttribute("userID");
    shippingParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    logs.info ("shipItemsParam", gson.toJson(shippingParam));

    try {
      shipItemsDao.saveShipItems(shippingParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/shipItemsExcelDown", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
  public void shipItemsExcelDown (
    HttpServletRequest request,
    HttpServletResponse response,
    HttpSession session,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    String fileUrl = session.getAttribute("fileUrl").toString();
    String fileDir = "test";

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("fileUrl", fileUrl);
    map.put("fileDir", fileDir);

    ShipItemsDAO shipItemsDao = sqlSession.getMapper(ShipItemsDAO.class);
    CompanyDAO companyDao = sqlSession.getMapper(CompanyDAO.class);

    HashMap<String, Object> shipDetail = shipItemsDao.showShipItems(shipCd, findStartDt, findEndDt);
    ArrayList<HashMap<String, Object>> shippingList = shipItemsDao.listShipItemsDetail(shipCd, findStartDt, findEndDt);
    Company company = companyDao.showCompany(1);

    utils.shipExcel(Integer.valueOf(shipCd), shipDetail, company, shippingList, response, map);
  }

}
