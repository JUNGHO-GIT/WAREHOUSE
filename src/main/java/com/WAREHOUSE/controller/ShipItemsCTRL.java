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
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.CompanyDAO;
import com.WAREHOUSE.dao.ShipItemsDAO;
import com.WAREHOUSE.util.ExcelUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class ShipItemsCTRL {

  private final ShipItemsDAO dao;
  private final CompanyDAO companyDao;
  private final ExcelUtil excel;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/shipItems"}, produces={"text/plain; charset=UTF-8"})
  public String shipItems () {
    try {
      return "shipItems";
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listShipItems"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listShipItems (
    @RequestParam(value="shipDt", required=false) String shipDt,
    @RequestParam(value="findStartDt", required=false) String findStartDt,
    @RequestParam(value="findEndDt", required=false) String findEndDt
  ) throws Exception {
    try {
      ArrayList<HashMap<String, Object>> list = dao.listShipItems(shipDt, findStartDt, findEndDt);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/listShipItemsDetail"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> listShipItemsDetail (
    @RequestParam(value="shipCd", required=false) String shipCd,
    @RequestParam(value="findStartDt", required=false) String findStartDt,
    @RequestParam(value="findEndDt", required=false) String findEndDt
  ) throws Exception {
    try {
      ArrayList<HashMap<String, Object>> list = dao.listShipItemsDetail(shipCd, findStartDt, findEndDt);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/showShipItems"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showShipItems (
    @RequestParam(value="shipCd", required=false) String shipCd,
    @RequestParam(value="findStartDt", required=false) String findStartDt,
    @RequestParam(value="findEndDt", required=false) String findEndDt
  ) throws Exception {
    try {
      HashMap<String, Object> show = dao.showShipItems(shipCd, findStartDt, findEndDt);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveShipItems"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveShipItems (
    @RequestBody Shipping param,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueId(userId);
      dao.saveShipItems(param);
      map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/shipItemsExcelDown"})
  public ResponseEntity<?> shipItemsExcelDown (
    @RequestParam(value="shipCd", required=false) String shipCd,
    @RequestParam(value="findStartDt", required=false) String findStartDt,
    @RequestParam(value="findEndDt", required=false) String findEndDt,
    @SessionAttribute(value="fileUrl", required=false) String fileUrl,
    HttpServletResponse response
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      Company company = companyDao.showCompany(1);
      HashMap<String, Object> detail = dao.showShipItems(shipCd, findStartDt, findEndDt);
      ArrayList<HashMap<String, Object>> list = dao.listShipItemsDetail(shipCd, findStartDt, findEndDt);

      excel.shipExcel(
        Integer.valueOf(shipCd),
        detail,
        company,
        list,
        response,
        fileUrl
      );

      map.put("result", "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}