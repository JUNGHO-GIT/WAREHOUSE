package com.bedone.wms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.wms.container.ResourceInOut;
import com.bedone.wms.dao.ResourceInOutDAO;
import com.bedone.wms.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ResourceInOutCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  //-----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/resourceIn", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceIn () throws Exception {

    return "resourceIn";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/resourceOut", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resourceOut () throws Exception {

    return "resourceOut";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listResourceInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listResourceInOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    ResourceInOutDAO resourceInOutDao = sqlSession.getMapper(ResourceInOutDAO.class);

    ArrayList<ResourceInOut> resourceInOutList = resourceInOutDao.listResourceInOut(resrcCd);
    model.addAttribute("rsltJson", gson.toJson(resourceInOutList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/showResourceInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showResourceInOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ResourceInOutDAO resourceInOutDao = sqlSession.getMapper(ResourceInOutDAO.class);

    ResourceInOut resourceInOutShow = resourceInOutDao.showResourceInOut(Integer.valueOf(inOutSeq));
    model.addAttribute("rsltJson", gson.toJson(resourceInOutShow));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveResourceInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveResourceInOut (
    @RequestBody ResourceInOut resourceInOutParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ResourceInOutDAO resourceInOutDao = sqlSession.getMapper (ResourceInOutDAO.class);
    String userID = (String) session.getAttribute("userID");
    resourceInOutParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (resourceInOutParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    logs.info("resourceInOutParam", gson.toJson(resourceInOutParam));

    try {
      resourceInOutDao.saveResourceInOut(resourceInOutParam);
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
