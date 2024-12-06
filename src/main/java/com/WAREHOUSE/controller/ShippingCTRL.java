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
import com.WAREHOUSE.container.Shipping;
import com.WAREHOUSE.dao.ShippingDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ShippingCTRL {

  @Autowired
  private ShippingDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/shipping", produces="text/html;charset=UTF-8")
  public String shipping () throws Exception {

    return "shipping";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listShipping", produces="application/json;charset=UTF-8")
  public String listShipping (
    HttpServletRequest request
  ) throws Exception {

    String inOutDt = request.getParameter("inOutDt");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");
    ArrayList<HashMap<String, Object>> listShipping = (
      dao.listShipping(inOutDt, findStartDt, findEndDt)
    );

    return gson.toJson(listShipping);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveShipping", produces="application/json;charset=UTF-8")
  public String saveShipping (
    @RequestBody Shipping shippingParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    shippingParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (shippingParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveShipping(shippingParam);
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
