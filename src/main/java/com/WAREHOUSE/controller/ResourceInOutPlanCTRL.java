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
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutPlanDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceInOutPlanCTRL {

  @Autowired
  private ResourceInOutPlanDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // 0. 자재 입고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/resourceInPlan", produces="text/html;charset=UTF-8")
  public String resourceInPlan () throws Exception {

    return "resourceInPlan";
  }

  // 0. 자재 출고 예정 -----------------------------------------------------------------------------
  @GetMapping(value="/resourceOutPlan", produces="text/html;charset=UTF-8")
  public String resourceOutPlan () throws Exception {

    return "resourceOutPlan";
  }

  // 1-1. 자재 입출고 예정 리스트 ------------------------------------------------------------------
  @PostMapping(value="/act/listResourceInOutPlan", produces="application/json;charset=UTF-8")
  public String listResourceInOutPlan (
    HttpServletRequest request
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    ArrayList<ResourceInOut> resourceInOutList = dao.listResourceInOutPlan(resrcCd);

    return gson.toJson(resourceInOutList);
  }

  // 1-2. 자재 입출고 예정 상세 --------------------------------------------------------------------
  @PostMapping(value="/act/showResourceInOutPlan", produces="application/json;charset=UTF-8")
  public String showResourceInOutPlan (
    HttpServletRequest request
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ResourceInOut resourceInOutShow = dao.showResourceInOutPlan(Integer.parseInt(inOutSeq));

    return gson.toJson(resourceInOutShow);
  }

  // 1-3. 자재 입출고 예정 저장 --------------------------------------------------------------------
  @PostMapping(value="/act/saveResourceInOutPlan", produces="application/json;charset=UTF-8")
  public String saveResourceInOutPlan (
    @RequestBody ResourceInOut resourceInOutParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    resourceInOutParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (resourceInOutParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveResourceInOutPlan(resourceInOutParam);
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