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
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.dao.CompanyDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class CompanyCTRL {

  @Autowired
  private CompanyDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/company", produces="text/html;charset=UTF-8")
  public String company () throws Exception {

    return "company";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listCompany", produces="application/json;charset=UTF-8")
  public String listCompany (
    HttpServletRequest request
  ) throws Exception {

    String findCompNm = request.getParameter("findCompNm");
    ArrayList<Company> companyList = dao.listCompany(findCompNm);

    return gson.toJson(companyList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showCompany", produces="application/json;charset=UTF-8")
  public String showCompany (
    HttpServletRequest request
  ) throws Exception {

    Integer compCd = Integer.valueOf(request.getParameter("compCd"));
    Company companyShow = dao.showCompany(compCd);

    return gson.toJson(companyShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveCompany", produces="application/json;charset=UTF-8")
  public String saveCompany (
    @RequestBody Company companyParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    companyParam.setIssueID(userID);

    String msg = "저장되었습니다.";
    if (companyParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveCompany(companyParam);
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