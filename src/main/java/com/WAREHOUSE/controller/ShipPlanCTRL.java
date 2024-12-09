package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
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
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.CompanyDAO;
import com.WAREHOUSE.dao.ShipPlanDAO;
import com.WAREHOUSE.util.Logs;
import com.WAREHOUSE.util.Utils;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ShipPlanCTRL {

  private final ShipPlanDAO dao;
  private final CompanyDAO companyDao;
  private final Logs logs;
  private final Utils utils;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipPlan", produces="text/html;charset=UTF-8")
  public ModelAndView shipPlan () throws Exception {

    try {
      logs.info("page", "shipPlan");
      return new ModelAndView("shipPlan");
    }
    catch (Exception e) {
      logs.error("shipPlan", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listShipPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listShipPlan (
    @RequestParam("shipDt") String shipDt,
    @RequestParam("findStartDt") String findStartDt,
    @RequestParam("findEndDt") String findEndDt
  ) throws Exception {

    try {
      ArrayList<HashMap<String, Object>> list = dao.listShipPlan(shipDt, findStartDt, findEndDt);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listShipPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listShipPlanDetail", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listShipPlanDetail (
    @RequestParam("shipCd") String shipCd,
    @RequestParam("findStartDt") String findStartDt,
    @RequestParam("findEndDt") String findEndDt
  ) throws Exception {

    try {
      ArrayList<HashMap<String, Object>> list = dao.listShipPlanDetail(shipCd, findStartDt, findEndDt);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listShipPlanDetail", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showShipPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showShipPlan (
    @RequestParam("shipCd") String shipCd,
    @RequestParam("findStartDt") String findStartDt,
    @RequestParam("findEndDt") String findEndDt
  ) throws Exception {

    try {
      HashMap<String, Object> show = dao.showShipPlan(shipCd, findStartDt, findEndDt);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showShipPlan", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveShipPlan", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveShipPlan (
    @RequestBody Shipping param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveShipPlan(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveShipPlan", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipPlanExcelDown", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> shipPlanExcelDown (
    @RequestParam("shipCd") String shipCd,
    @RequestParam("findStartDt") String findStartDt,
    @RequestParam("findEndDt") String findEndDt,
    @SessionAttribute("fileUrl") String fileUrl,
    HttpServletResponse response
  ) throws Exception {

    String fileDir = "test";
    Map<String, Object> map = new HashMap<String, Object>();

    try {
      Company company = companyDao.showCompany(1);
      HashMap<String, Object> detail = dao.showShipPlan(shipCd, findStartDt, findEndDt);
      ArrayList<HashMap<String, Object>> list = dao.listShipPlanDetail(shipCd, findStartDt, findEndDt);

      utils.shipExcel(
        Integer.valueOf(shipCd),
        detail,
        company,
        list,
        response,
        fileUrl,
        fileDir
      );

      map.put("result", "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("shipItemsExcelDown", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

}