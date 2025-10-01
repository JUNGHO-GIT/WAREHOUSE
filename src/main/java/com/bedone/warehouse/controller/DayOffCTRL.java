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
import org.springframework.web.bind.annotation.ResponseBody;
import com.bedone.warehouse.container.DayOff;
import com.bedone.warehouse.dao.DayOffDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class DayOffCTRL {

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
  (value="/dayOff", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String dayOff () throws Exception {

    utils.info ("============================dayOff================================");

    return "dayOff";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/getUser", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String getUser (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    DayOffDAO dayOffDao = sqlSession.getMapper(DayOffDAO.class);
    ArrayList<DayOff> datOffList = dayOffDao.getUser();

    model.addAttribute("rsltJson", gson.toJson(datOffList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @ResponseBody
  @RequestMapping
  (value="/act/saveDayOff", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public Map<String, Object> saveDayOff (
    @RequestBody DayOff dayOffParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    String[] offDates = dayOffParam.getOffDate ().toString().split("/");
    DayOffDAO dayOffDao = sqlSession.getMapper(DayOffDAO.class);
    String issueID = (String) session.getAttribute("userID");
    String msg = "저장되었습니다.";

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("issueID", issueID);
    map.put("flagYN", dayOffParam.getFlagYN());
    map.put("userID", dayOffParam.getUserID());
    map.put("restCnt", dayOffParam.getRestCnt());
    map.put("offSeq", dayOffParam.getOffSeq());

    for (int i = 0; i < offDates.length; i++) {

      if (dayOffParam.getFlagYN().equals("N")) {
        msg = "저장되지 않았습니다.";
      }

      try {
        dayOffDao.saveDayOff(map);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "저장 실패";
      }
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return result;
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listDayOff", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listDayOff (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findUserNm = request.getParameter("findUserNm");
    DayOffDAO dayOffDao = sqlSession.getMapper(DayOffDAO.class);

    ArrayList<DayOff> dayOffList = dayOffDao.getList(findUserNm);
    model.addAttribute("rsltJson", gson.toJson(dayOffList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showDayOff", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showDayOff (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    Integer offSeq = Integer.parseInt(request.getParameter("offSeq"));
    DayOffDAO dayOffDao = sqlSession.getMapper(DayOffDAO.class);

    DayOff dayOffShow = dayOffDao.showDayOff(offSeq);
    model.addAttribute("rsltJson", gson.toJson(dayOffShow));

    return "jsonRs";
  }
}
