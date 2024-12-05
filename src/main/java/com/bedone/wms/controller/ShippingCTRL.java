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
import com.bedone.wms.container.Shipping;
import com.bedone.wms.dao.ShippingDAO;
import com.bedone.wms.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ShippingCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/shipping", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String shipping () throws Exception {

    return "shipping";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listShipping", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listShipping (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String inOutDt = request.getParameter("inOutDt");
    String findStartDt = request.getParameter("findStartDt");
    String findEndDt = request.getParameter("findEndDt");

    ShippingDAO shippingDao = sqlSession.getMapper(ShippingDAO.class);
    ArrayList<HashMap<String, Object>> shippingList = shippingDao.listShipping(inOutDt, findStartDt, findEndDt);
    model.addAttribute("rsltJson", gson.toJson(shippingList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveShipping", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveShipping (
    @RequestBody Shipping shippingParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ShippingDAO shippingDao = sqlSession.getMapper (ShippingDAO.class);
    String userID = (String) session.getAttribute("userID");
    shippingParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (shippingParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
    	shippingDao.saveShipping(shippingParam);
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
