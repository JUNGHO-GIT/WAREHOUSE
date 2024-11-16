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
import com.bedone.warehouse.container.House;
import com.bedone.warehouse.dao.HouseDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class HouseCTRL {

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
  (value="/warehouse/house", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String warehouse () throws Exception {

    utils.info ("======================house============================");

    return "house";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listHouse", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listHouse (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    Integer parentsHCd = Integer.valueOf(request.getParameter("id"));
    HouseDAO houseDao = sqlSession.getMapper(HouseDAO.class);

    ArrayList<House> houseList = houseDao.listHouse(parentsHCd);
    model.addAttribute("rsltJson", gson.toJson(houseList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showHouse", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showHouse (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    Integer houseCd = Integer.valueOf(request.getParameter("houseCd"));
    HouseDAO houseDao = sqlSession.getMapper(HouseDAO.class);

    ArrayList<HashMap<String, Object>> productPerHouse = houseDao.showHousePerProduct(houseCd);
    ArrayList<HashMap<String, Object>> resourcePerHouse = houseDao.showHousePerResource(houseCd);

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("productPerHouse", productPerHouse);
    result.put("resourcePerHouse", resourcePerHouse);

    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveHouse", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveHouse (
    @RequestBody House houseParam,
    HttpSession session,
    Model model
  ) throws Exception {

    HouseDAO houseDao = sqlSession.getMapper (HouseDAO.class);
    String userID = (String) session.getAttribute("userID");
    houseParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (houseParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
      houseDao.saveHouse(houseParam);
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