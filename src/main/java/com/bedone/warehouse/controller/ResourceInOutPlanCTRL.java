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
import com.bedone.warehouse.container.ResourceInOut;
import com.bedone.warehouse.dao.ResourceInOutPlanDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ResourceInOutPlanCTRL {

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

  // 0. 자재 입고 예정 ---------------------------------------------------------------------------->
  @RequestMapping
  (value="/resourceInPlan", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceInPlan () throws Exception {

    utils.info ("======================resourceInPlan============================");

    return "resourceInPlan";
  }

  // 0. 자재 출고 예정 ---------------------------------------------------------------------------->
  @RequestMapping
  (value="/resourceOutPlan", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceOutPlan () throws Exception {

    utils.info ("======================resourceOutPlan============================");

    return "resourceOutPlan";
  }

  // 1-1. 자재 입출고 예정 리스트 ----------------------------------------------------------------->
  @RequestMapping
  (value="/act/listResourceInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listResourceInOutPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    ResourceInOutPlanDAO planDao = sqlSession.getMapper(ResourceInOutPlanDAO.class);

    ArrayList<ResourceInOut> resourceInOutList = planDao.listResourceInOutPlan(resrcCd);
    model.addAttribute("rsltJson", gson.toJson(resourceInOutList));

    return "jsonRs";
  }

  // 1-2. 자재 입출고 예정 상세 ------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showResourceInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showResourceInOutPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ResourceInOutPlanDAO planDao = sqlSession.getMapper(ResourceInOutPlanDAO.class);

    ResourceInOut resourceInOutShow = planDao.showResourceInOutPlan(Integer.parseInt(inOutSeq));
    model.addAttribute("rsltJson", gson.toJson(resourceInOutShow));

    return "jsonRs";
  }

  // 1-3. 자재 입출고 예정 저장 ------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveResourceInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveResourceInOutPlan (
    @RequestBody ResourceInOut resourceInOutParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ResourceInOutPlanDAO planDao = sqlSession.getMapper(ResourceInOutPlanDAO.class);
    String userID = (String) session.getAttribute("userID");
    resourceInOutParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (resourceInOutParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    utils.info("resourceInOutParam : " + gson.toJson(resourceInOutParam));

    try {
      planDao.saveResourceInOutPlan(resourceInOutParam);
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
