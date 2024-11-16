package com.bedone.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.Company;
import com.bedone.warehouse.container.Shipping;
import com.bedone.warehouse.dao.CompanyDAO;
import com.bedone.warehouse.dao.ShipPlanDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ShipPlanCTRL {

  @Value ("${conf.ex1}")
  private String gUserNm;

  @Value ("${file.dir}")
  private String gFileDir;

  @Value ("${war.dir}")
  private String gWarDir;

  @Autowired
  private SqlSession sqlSession;
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/shipPlan", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String shipPlan () throws Exception {

    utils.info ("======================shipPlan============================");

    return "shipPlan";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listShipPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listShipPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipDt = request.getParameter("shipDt");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipPlanDAO shipPlanDao = sqlSession.getMapper(ShipPlanDAO.class);

    ArrayList<HashMap<String, Object>> listShipPlan = shipPlanDao.listShipPlan(shipDt, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(listShipPlan));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listShipPlanDetail", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listShipPlanDetail (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipPlanDAO shipPlanDao = sqlSession.getMapper(ShipPlanDAO.class);

    ArrayList<HashMap<String, Object>> listShipPlanDetail = shipPlanDao.listShipPlanDetail(shipCd, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(listShipPlanDetail));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showShipPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showShipPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ShipPlanDAO shipPlanDao = sqlSession.getMapper(ShipPlanDAO.class);

    HashMap<String, Object> shipPlanShow = shipPlanDao.showShipPlan(shipCd, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(shipPlanShow));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveShipPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveShipPlan (
    @RequestBody Shipping shippingParam,
    HttpSession session,
    Model model
  ) throws Exception {

    ShipPlanDAO shipPlanDao = sqlSession.getMapper(ShipPlanDAO.class);
    String userID = (String) session.getAttribute("userID");
    shippingParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    try {
      shipPlanDao.saveShipPlan(shippingParam);
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

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/shipPlanExcelDown", method=RequestMethod.GET, produces="application/json;charset=UTF-8")
  public void shipPlanExcelDown (
    HttpServletRequest request,
    HttpServletResponse response,
    HttpSession session,
    Model model
  ) throws Exception {

    String shipCd = request.getParameter("shipCd");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    String fileUrl = session.getAttribute("fileUrl").toString();
    String fileDir = gFileDir;

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("fileUrl", fileUrl);
    map.put("fileDir", fileDir);

    ShipPlanDAO shipPlanDao = sqlSession.getMapper(ShipPlanDAO.class);
    CompanyDAO companyDao = sqlSession.getMapper(CompanyDAO.class);

    HashMap<String, Object> shipDetail = shipPlanDao.showShipPlan(shipCd, findStartDt, findEndDt);
    ArrayList<HashMap<String, Object>> shippingList = shipPlanDao.listShipPlanDetail(shipCd, findStartDt, findEndDt);
    Company company = companyDao.showCompany(1);

    utils.shipExcel(Integer.valueOf(shipCd), shipDetail, company, shippingList, response, map);
  }
}
