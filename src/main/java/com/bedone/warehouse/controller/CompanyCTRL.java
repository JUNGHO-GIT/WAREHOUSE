package com.bedone.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
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
import com.bedone.warehouse.dao.CompanyDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class CompanyCTRL {

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
  (value="/warehouse/company", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String company () throws Exception {

    return "company";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listCompany", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listCompany (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findCompNm = request.getParameter("findCompNm");
    CompanyDAO companyDao = sqlSession.getMapper(CompanyDAO.class);

    ArrayList<Company> companyList = companyDao.listCompany(findCompNm);

    model.addAttribute("rsltJson", gson.toJson(companyList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showCompany", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showCompany (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    Integer compCd = Integer.valueOf(request.getParameter("compCd"));
    CompanyDAO companyDao = sqlSession.getMapper(CompanyDAO.class);

    Company companyShow = companyDao.showCompany(compCd);

    model.addAttribute("rsltJson", gson.toJson(companyShow));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveCompany", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveCompany (
    @RequestBody Company companyParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    CompanyDAO companyDao = sqlSession.getMapper (CompanyDAO.class);
    String userID = (String) session.getAttribute("userID");
    companyParam.setIssueID(userID);

    String msg = "저장되었습니다.";
    if (companyParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
      companyDao.saveCompany(companyParam);
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

}
