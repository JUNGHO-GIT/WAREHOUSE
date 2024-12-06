package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.User;
import com.WAREHOUSE.dao.UserDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class UserCTRL {

  @Autowired
  private UserDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/", "/login"}, produces="text/html;charset=UTF-8")
  public String login () throws Exception {

    return "userLogin";
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/reLogin", "/logout"}, produces="text/html;charset=UTF-8")
  public String reLogin (
    HttpSession session
  ) throws Exception {
    session.invalidate();

    return "reLogin";
  }

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/user", produces="text/html;charset=UTF-8")
  public String user () throws Exception {

    return "user";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/auth", produces="application/json;charset=UTF-8")
  public String auth (
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = request.getParameter("userID");
    String pwClient = request.getParameter("passwd");
    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    String pwServer = "";
    String msg = "";
    boolean matchPasswd = false;
    User userInfo = dao.showUser(userID);

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

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listUser", produces="application/json;charset=UTF-8")
  public String listUser (
    HttpServletRequest request
  ) throws Exception {

    String findUserNm = request.getParameter("findUserNm");

    ArrayList<User> userList = dao.listUser(findUserNm);

    return gson.toJson(userList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listUserPerm", produces="application/json;charset=UTF-8")
  public String listUserPerm () throws Exception {

    ArrayList<HashMap<String, Object>> userList = dao.listUserPerm();

    return gson.toJson(userList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showUser", produces="application/json;charset=UTF-8")
  public String showUser (
    HttpServletRequest request
  ) throws Exception {

    String userID = request.getParameter("userID");
    User showUser = dao.showUser(userID);

    return gson.toJson(showUser);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/checkUserID", produces="application/json;charset=UTF-8")
  public String checkUserID (
    HttpServletRequest request
  ) throws Exception {

    String userID = request.getParameter("userID");
    Integer checkID = dao.checkUserID(userID);

    return gson.toJson(checkID);
  }

  //------------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveUser", produces="application/json;charset=UTF-8")
  public String saveUser (
    @RequestBody HashMap<String, Object> userParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

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

    User storedUser = dao.showUser(userID);

    // 1. 신규등록인 경우
    if ("Y".equals(signUpCheck)) {

      // 비밀번호 암호화
      passwdNew = passEncoder.encode(passwdOld);
      userParam.put("passwd", passwdNew);
      userParam.put("issueID", issueID);

      try {
        dao.saveUser(userParam);
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

        try {
          userParam.put("passwd", passwdNew);
          userParam.put("issueID", issueID);
          dao.saveUser(userParam);
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

    return gson.toJson(result);
  }

  //------------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/updatePw", produces="application/json;charset=UTF-8")
  public String updatePw (
    @RequestBody User userParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    String userID = userParam.getUserID();
    String passwdOld = userParam.getPasswd();
    String msg = "";

    // 1. 없는 아이디인 경우
    if (userID == null || userID.equals("")) {
      msg = "존재하지 않는 아이디입니다.";
    }
    else {
      String passwdNew = (String) passEncoder.encode(passwdOld);
      msg = "비밀번호를 변경했습니다.";

      try {
        dao.updatePw(userID, passwdNew);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "비밀번호 변경에 실패하셨습니다.";
      }
    }

    Map<String, String> result = new HashMap<String, String>();
    result.put("result", msg);

    return gson.toJson(result);
  }
}