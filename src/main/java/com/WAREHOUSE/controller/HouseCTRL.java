package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.House;
import com.WAREHOUSE.dao.HouseDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class HouseCTRL {

  @Autowired
  private HouseDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/house", produces="text/html;charset=UTF-8")
  public String warehouse () throws Exception {

    return "house";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listHouse", produces="application/json;charset=UTF-8")
  public String listHouse (
    HttpServletRequest request
  ) throws Exception {

    Integer parentsHCd = Integer.valueOf(request.getParameter("id"));
    ArrayList<House> houseList = dao.listHouse(parentsHCd);

    return gson.toJson(houseList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showHouse", produces="application/json;charset=UTF-8")
  public String showHouse (
    HttpServletRequest request
  ) throws Exception {

    Integer houseCd = Integer.valueOf(request.getParameter("houseCd"));
    ArrayList<HashMap<String, Object>> productPerHouse = dao.showHousePerProduct(houseCd);
    ArrayList<HashMap<String, Object>> resourcePerHouse = dao.showHousePerResource(houseCd);

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("productPerHouse", productPerHouse);
    map.put("resourcePerHouse", resourcePerHouse);

    return gson.toJson(map);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveHouse", produces="application/json;charset=UTF-8")
  public String saveHouse (
    @RequestBody House houseParam,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    houseParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (houseParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveHouse(houseParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

}