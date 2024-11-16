package com.bedone.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.User;
import com.bedone.warehouse.dao.UserDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class UserCTRL {

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
  (value={"/", "/login"}, method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String login (

  ) throws Exception {

    utils.info ("======================login============================");

    return "login";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/reLogin", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String reLogin (
    HttpSession session
  ) throws Exception {

    utils.info ("======================reLogin============================");

    session.invalidate();

    return "reLogin";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/logout", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String logout (
    HttpSession session
  ) throws Exception {

	  utils.info ("======================logout============================");

    session.invalidate();

    return "reLogin";
  }

  //---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/user", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String user (

  ) throws Exception {

    utils.info ("======================user============================");

    return "user";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/auth", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String auth (
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    String userID = request.getParameter("userID");
    String pwClient = request.getParameter("passwd");

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);
    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    String pwServer;
    String msg;
    boolean matchPasswd = false;
    User userInfo = userDao.showUser(userID);

    // 1. 없는 아이디인 경우
    if (userInfo == null || userInfo.getUserID() == null) {
      msg = "존재하지 않는 아이디입니다.";
      pwServer = "";
    }
    // 2. 존재하는 아이디인 경우
    else {
      pwServer = userInfo.getPasswd();
      // 2-1. (테스트용 입니다) 먼저 평문으로 비밀번호를 비교
      if (pwClient.equals(pwServer)) {
        matchPasswd = true;
      }
      // 2-2. 평문이 일치하지 않으면 암호화된 비밀번호와 비교
      else {
        matchPasswd = passEncoder.matches(pwClient, pwServer);
      }

      if (matchPasswd) {
        session.setAttribute("userID", userInfo.getUserID());
        session.setAttribute("userNm", userInfo.getUserNm());
        session.setAttribute("uLevel", userInfo.getULevel());
        session.setAttribute("uPerm", userInfo.getUPerm());

        session.setAttribute("userConfigID", userInfo.getUserID());
        session.setAttribute("userConfigNm", userInfo.getUserNm());
        session.setAttribute("userConfigLevel", userInfo.getULevel());
        session.setAttribute("userConfigPerm", userInfo.getUPerm());
        msg = "로그인에 성공하였습니다.";
      }
      else {
        msg = "비밀번호가 일치하지 않습니다.";
      }
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listUser", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listUser (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);
    String findUserNm = request.getParameter("findUserNm");

    ArrayList<User> userList = userDao.listUser(findUserNm);
    model.addAttribute("rsltJson", gson.toJson(userList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listUserPerm", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listUserPerm (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);

    ArrayList<HashMap<String, Object>> userList = userDao.listUserPerm();
    model.addAttribute("rsltJson", gson.toJson(userList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showUser", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showUser (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String userID = request.getParameter("userID");
    UserDAO userDao = sqlSession.getMapper(UserDAO.class);

    User showUser = userDao.showUser(userID);
    model.addAttribute("rsltJson", gson.toJson(showUser));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/checkUserID", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String checkUserID (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);
    String userID = request.getParameter("userID");
    Integer checkID = userDao.checkUserID(userID);

    model.addAttribute("rsltJson", gson.toJson(checkID));

    return "jsonRs";
  }

  //----------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveUser", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveUser (
    @RequestBody HashMap<String, Object> userParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);
    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    String userID = (String) userParam.get("userID");
    String issueID = (String) session.getAttribute("userID");
    Object compCdObj = userParam.get("compCd");
    String passwdOld = (String) userParam.get("passwd");
    String signUpCheck = (String) userParam.get("signUpCheck");
    String flagYN = (String) userParam.get("flagYN");
    String passwdNew = "";

    String msg = "저장되었습니다.";
    if ("N".equals(flagYN)) {
      msg = "삭제되었습니다.";
    }

    if (compCdObj == null) {
      userParam.put("compCd", 0);
    }
    else {
      try {
        int compCdInt = Integer.parseInt(compCdObj.toString());
        userParam.put("compCd", compCdInt);
      }
      catch (NumberFormatException e) {
        userParam.put("compCd", 0);
      }
    }

    User storedUser = userDao.showUser(userID);

    // 1. 신규등록인 경우
    if ("Y".equals(signUpCheck)) {

      // 비밀번호 암호화
      passwdNew = passEncoder.encode(passwdOld);
      userParam.put("passwd", passwdNew);
      userParam.put("issueID", issueID);

      try {
        userDao.saveUser(userParam);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "저장 실패";
      }
    }
    // 2. 이미 등록된 아이디인 경우
    else if ("N".equals(signUpCheck)) {

      // 2-1. 없는 아이디인 경우
      if (storedUser == null || storedUser.getUserID() == null) {
        msg = "존재하지 않는 아이디입니다.";
      }
      // 2-2. 존재하는 아이디인 경우
      else {
        String storedPasswd = storedUser.getPasswd();

        // 2-2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
        if ("BCryptPassword".equals(passwdOld)) {
          passwdNew = storedPasswd;
        }
        // 2-2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
        else {
          passwdNew = passEncoder.encode(passwdOld);
        }

        userParam.put("passwd", passwdNew);
        userParam.put("issueID", issueID);

        try {
          userDao.saveUser(userParam);
        }
        catch (Exception e) {
          e.printStackTrace();
          msg = "저장 실패";
        }
      }
    }
    else {
      msg = "저장 실패";
    }

    Map<String, String> result = new HashMap<String, String>();
    result.put("result", msg);
    model.addAttribute("rsltJson",gson.toJson(result));

    return "jsonRs";
  }

  //---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/updatePw", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String updatePw (
    @RequestBody User userParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    UserDAO userDao = sqlSession.getMapper(UserDAO.class);
    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    String userID = userParam.getUserID();
    String passwdOld = userParam.getPasswd();
    String msg;

    // 1. 없는 아이디인 경우
    if (userID == null || userID.equals("")) {
      msg = "존재하지 않는 아이디입니다.";
    }
    else {
      String passwdNew = (String) passEncoder.encode(passwdOld);
      msg = "비밀번호를 변경했습니다.";

      try {
        userDao.updatePw(userID, passwdNew);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "비밀번호 변경에 실패하셨습니다.";
      }
    }

    Map<String, String> result = new HashMap<String, String>();
    result.put("result", msg);
    model.addAttribute("rsltJson",gson.toJson(result));

    return "jsonRs";
  }

}