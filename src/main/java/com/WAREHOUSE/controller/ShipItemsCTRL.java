package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.CompanyDAO;
import com.WAREHOUSE.dao.ShipItemsDAO;
import com.WAREHOUSE.util.Logs;
import com.WAREHOUSE.util.Utils;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ShipItemsCTRL {

  @Autowired
  private ShipItemsDAO dao;

  @Autowired
  private CompanyDAO companyDao;

  Logs logs = new Logs();
  Utils utils = new Utils();
  Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipItems", produces="text/html;charset=UTF-8")
  public String shipItems () throws Exception {

    return "shipItems";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listShipItems", produces="application/json;charset=UTF-8")
  public String listShipItems (
    HttpServletRequest request
  ) throws Exception {

    String shipDt = request.getParameter("shipDt");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");

    ArrayList<HashMap<String, Object>> listShipItems = (
      dao.listShipItems(shipDt, findStartDt, findEndDt)
    );

    return gson.toJson(listShipItems);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listShipItemsDetail", produces="application/json;charset=UTF-8")
  public String listShipItemsDetail (
    HttpServletRequest request
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");

    ArrayList<HashMap<String, Object>> listShipItemsDetail = (
      dao.listShipItemsDetail(shipCd, findStartDt, findEndDt)
    );

    return gson.toJson(listShipItemsDetail);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showShipItems", produces="application/json;charset=UTF-8")
  public String showShipItems (
    HttpServletRequest request
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");

    HashMap<String, Object> shipItemsShow = (
      dao.showShipItems(shipCd, findStartDt, findEndDt)
    );

    return gson.toJson(shipItemsShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveShipItems", produces="application/json;charset=UTF-8")
  public String saveShipItems (
    @RequestBody Shipping shippingParam,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    shippingParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    try {
      dao.saveShipItems(shippingParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipItemsExcelDown", produces="application/json;charset=UTF-8")
  public void shipItemsExcelDown (
    HttpServletRequest request,
    HttpServletResponse response,
    HttpSession session
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    String fileUrl = session.getAttribute("fileUrl").toString();
    String fileDir = "test";

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("fileUrl", fileUrl);
    map.put("fileDir", fileDir);

    HashMap<String, Object> shipDetail = (
      dao.showShipItems(shipCd, findStartDt, findEndDt)
    );
    ArrayList<HashMap<String, Object>> shippingList = (
      dao.listShipItemsDetail(shipCd, findStartDt, findEndDt)
    );

    Company company = companyDao.showCompany(1);

    utils.shipExcel(Integer.valueOf(shipCd), shipDetail, company, shippingList, response, map);
  }
}