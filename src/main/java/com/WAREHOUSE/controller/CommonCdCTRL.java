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
import com.WAREHOUSE.container.Common;
import com.WAREHOUSE.container.CommonCd;
import com.WAREHOUSE.dao.CommonCdDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class CommonCdCTRL {

  @Autowired
  private CommonCdDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/commonCd", produces="text/html;charset=UTF-8")
  public String commonCd () throws Exception {

    return "commonCd";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listCommonCd", produces="application/json;charset=UTF-8")
  public String listCommonCd (
    HttpServletRequest request
  ) throws Exception {

    String findGroupCd = request.getParameter("findGroupCd");
    String findItemNm = request.getParameter("findItemNm");
    ArrayList<CommonCd> commonCdList = dao.listCommonCd(findGroupCd, findItemNm);

    return gson.toJson(commonCdList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showCommonCd", produces="application/json;charset=UTF-8")
  public String showCommonCd (
    HttpServletRequest request
  ) throws Exception {

    String groupCd = request.getParameter("groupCd");
    String itemCd = request.getParameter("itemCd");
    CommonCd commonCdShow = dao.showCommonCd(groupCd, itemCd);

    return gson.toJson(commonCdShow);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveCommonCd", produces="application/json;charset=UTF-8")
  public String saveCommonCd (
    @RequestBody CommonCd commonCdParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userID");
    commonCdParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (commonCdParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }
    try {
      dao.saveCommonCd(commonCdParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/initCodeAll", produces="application/json;charset=UTF-8")
  public String initCodeAll (
    HttpServletRequest request
  ) throws Exception {

    String part[] = request.getParameter("part").split("/");
    String groupCd[] = request.getParameter("groupCd").split("/");
    String target[] = request.getParameter("target").split("/");

    ArrayList<Common> commonCdResult = new ArrayList<Common>();
		ArrayList<Common> commonCdList = new ArrayList<Common>();

		for (int i = 0; i < part.length; i++) {
			if (part[i].equals("comCode")) {
        commonCdList = dao.listComCodeAll(groupCd[i], target[i]);
	 		}
	 		else if (part[i].equals("comCodeGroup")) {
        commonCdList = dao.listComCodeGroupAll(target[i]);
	 		}
	 		commonCdResult.addAll(commonCdList);
		}

    return gson.toJson(commonCdResult);
  }
}