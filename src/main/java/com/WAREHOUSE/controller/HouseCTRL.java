package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.House;
import com.WAREHOUSE.dao.HouseDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class HouseCTRL {

  private final HouseDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/house", produces="text/html;charset=UTF-8")
  public ModelAndView house () throws Exception {

    try {
      logs.info("page", "house");
      return new ModelAndView("house");
    }
    catch (Exception e) {
      logs.error("house", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listHouse", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listHouse (
    @RequestParam("id") Integer id
  ) throws Exception {

    try {
      ArrayList<House> list = dao.listHouse(id);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listHouse", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showHouse", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showHouse (
    @RequestParam("houseCd") Integer houseCd
  ) throws Exception {

    try {
      ArrayList<HashMap<String, Object>> productPerHouse = dao.showHousePerProduct(houseCd);
      ArrayList<HashMap<String, Object>> resourcePerHouse = dao.showHousePerResource(houseCd);

      Map<String, Object> map = new HashMap<String, Object>();
      map.put("productPerHouse", productPerHouse);
      map.put("resourcePerHouse", resourcePerHouse);

      return ResponseEntity.ok(map);
    }
    catch (Exception e) {
      logs.error("showHouse", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveHouse", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveHouse (
    @RequestBody House param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveHouse(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveHouse", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

}