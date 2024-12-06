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
import com.WAREHOUSE.container.ResourceInOut;
import com.WAREHOUSE.dao.ResourceInOutDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceInOutCTRL {

  @Autowired
  private ResourceInOutDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceIn", produces="text/html;charset=UTF-8")
  public String resourceIn () throws Exception {

    return "resourceIn";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resourceOut", produces="text/html;charset=UTF-8")
  public String resourceOut () throws Exception {

    return "resourceOut";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listResourceInOut", produces="application/json;charset=UTF-8")
  public String listResourceInOut (
    HttpServletRequest request
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    ArrayList<ResourceInOut> resourceInOutList = dao.listResourceInOut(resrcCd);

    return gson.toJson(resourceInOutList);
  }


  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showResourceInOut", produces="application/json;charset=UTF-8")
  public String showResourceInOut (
    HttpServletRequest request
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ResourceInOut resourceInOutShow = dao.showResourceInOut(Integer.valueOf(inOutSeq));

    return gson.toJson(resourceInOutShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveResourceInOut", produces="application/json;charset=UTF-8")
  public String saveResourceInOut (
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
      dao.saveResourceInOut(resourceInOutParam);
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