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
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.ResourceDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceCTRL {

  @Autowired
  private ResourceDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/resource", produces="text/html;charset=UTF-8")
  public String resource () throws Exception {

    return "resource";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listResource", produces="application/json;charset=UTF-8")
  public String listResource (
    HttpServletRequest request
  ) throws Exception {

    String findResrcNm = request.getParameter("findResrcNm");
    ArrayList<Resource> resourceList = dao.listResource(findResrcNm);

    return gson.toJson(resourceList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showResource", produces="application/json;charset=UTF-8")
  public String showResource (
    HttpServletRequest request
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    Resource resourceShow = dao.showResource(Integer.parseInt(resrcCd));

    return gson.toJson(resourceShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveResource", produces="application/json;charset=UTF-8")
  public String saveResource (
    @RequestBody Resource resourceParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    resourceParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (resourceParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveResource(resourceParam);
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