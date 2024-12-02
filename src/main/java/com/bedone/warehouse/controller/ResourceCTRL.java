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
import com.bedone.warehouse.container.Resource;
import com.bedone.warehouse.dao.ResourceDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ResourceCTRL {

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
  (value="/resource", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String resource () throws Exception {

    utils.info ("======================resource============================");

    return "resource";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listResource", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listResource (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findResrcNm = request.getParameter("findResrcNm");
    ResourceDAO resourceDao = sqlSession.getMapper(ResourceDAO.class);

    ArrayList<Resource> resourceList = resourceDao.listResource(findResrcNm);
    model.addAttribute("rsltJson", gson.toJson(resourceList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showResource", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showResource (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String resrcCd = request.getParameter("resrcCd");
    ResourceDAO resourceDao = sqlSession.getMapper(ResourceDAO.class);

    Resource resourceShow = resourceDao.showResource(Integer.valueOf(resrcCd));
    model.addAttribute("rsltJson", gson.toJson(resourceShow));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveResource", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveResource (
    @RequestBody Resource resourceParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ResourceDAO resourceDao = sqlSession.getMapper(ResourceDAO.class);
    String userID = (String) session.getAttribute("userID");
    resourceParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (resourceParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
      resourceDao.saveResource(resourceParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<Object, Object> result = new HashMap<Object, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

}
