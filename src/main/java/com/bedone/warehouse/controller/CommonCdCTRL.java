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
import com.bedone.warehouse.container.Common;
import com.bedone.warehouse.container.CommonCd;
import com.bedone.warehouse.dao.CommonCdDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class CommonCdCTRL {

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
  (value="/warehouse/commonCd", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String commonCd () throws Exception {

    return "commonCd";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listCommonCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listCommonCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findGroupCd = request.getParameter("findGroupCd");
    String findItemNm = request.getParameter("findItemNm");
    CommonCdDAO commonCdDao = sqlSession.getMapper(CommonCdDAO.class);

    ArrayList<CommonCd> commonCdList = commonCdDao.listCommonCd(findGroupCd, findItemNm);
    model.addAttribute("rsltJson", gson.toJson(commonCdList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showCommonCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showCommonCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String groupCd = request.getParameter("groupCd");
    String itemCd = request.getParameter("itemCd");
    CommonCdDAO commonCdDao = sqlSession.getMapper(CommonCdDAO.class);

    CommonCd commonCdShow = commonCdDao.showCommonCd(groupCd, itemCd);
    model.addAttribute("rsltJson", gson.toJson(commonCdShow));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveCommonCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveCommonCd (
    @RequestBody CommonCd commonCdParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    CommonCdDAO commonCdDao = sqlSession.getMapper (CommonCdDAO.class);
    String userID = (String) session.getAttribute("userID");
    commonCdParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (commonCdParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
      commonCdDao.saveCommonCd(commonCdParam);
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

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/initCodeAll", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String initCodeAll (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String part[] = request.getParameter("part").split("/");
    String groupCd[] = request.getParameter("groupCd").split("/");
    String target[] = request.getParameter("target").split("/");

    CommonCdDAO commonCdDao = sqlSession.getMapper(CommonCdDAO.class);
    ArrayList<Common> commonCdResult = new ArrayList<Common>();
		ArrayList<Common> commonCdList = new ArrayList<Common>();

		for (int i = 0; i < part.length; i++) {

			if (part[i].equals("comCode")) {
	 			commonCdList = commonCdDao.listComCodeAll(groupCd[i], target[i]);
	 		}
	 		else if (part[i].equals("comCodeGroup")) {
	 			commonCdList = commonCdDao.listComCodeGroupAll(target[i]);
	 		}
	 		commonCdResult.addAll(commonCdList);
		}

		model.addAttribute("rsltJson",gson.toJson(commonCdResult));

		return "jsonRs";
	}
}
