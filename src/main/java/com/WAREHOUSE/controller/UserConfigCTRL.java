package com.WAREHOUSE.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.WAREHOUSE.container.UserConfig;
import com.WAREHOUSE.dao.UserConfigDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@RestController
public class UserConfigCTRL {

  @Autowired
  private UserConfigDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showUserConfigTab", produces="application/json;charset=UTF-8")
  public String showUserConfigTab (
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userConfigID = (String) session.getAttribute("userConfigID");
    String pageNm = request.getParameter("pageNm");
    String gridCd = request.getParameter("gridCd");

    UserConfig userConfigShow = (
      dao.showUserConfigTab(userConfigID, pageNm, gridCd)
    );

    return gson.toJson(userConfigShow);
  }

  // 2-2. 상세 (정보) ------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/showUserConfigInfo", produces="application/json;charset=UTF-8")
  public String showUserConfigInfo (
    HttpSession session
  ) throws Exception {

    String userConfigID = (String) session.getAttribute("userConfigID");

    UserConfig userConfigShow = (
      dao.showUserConfigInfo(userConfigID)
    );

    return gson.toJson(userConfigShow);
  }

  //------------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/updateConfigPw", produces="application/json;charset=UTF-8")
  public String updateConfigPw (
    @RequestBody UserConfig userConfigParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    String userConfigID = userConfigParam.getUserConfigID();
    String passwdOld = userConfigParam.getUserConfigPw();
    String msg = "";

    // 1. 없는 아이디인 경우
    if (userConfigID == null || userConfigID.equals("")) {
      msg = "존재하지 않는 아이디입니다.";
    }
    else {
      String passwdNew = (String) passEncoder.encode(passwdOld);
      msg = "비밀번호를 변경했습니다.";

      try {
        dao.updateUserConfigPw(userConfigID, passwdNew);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "비밀번호 변경에 실패하셨습니다.";
      }
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

  //------------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveUserConfigInfo", produces="application/json;charset=UTF-8")
  public String saveUserConfigInfo (
    @RequestBody HashMap<String, Object> userConfigParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userConfigID");
    String userConfigID = (String) userConfigParam.get("userConfigID");
    String issueID = (String) session.getAttribute("userConfigID");
    String flagYN = (String) userConfigParam.get("flagYN");
    Object configSeqObj = userConfigParam.get("configSeq");
    Object compCdObj = userConfigParam.get("userConfigCompCd");
    String passwdOld = (String) userConfigParam.get("userConfigPw");
    String passwdNew = "";
    String msg = "저장되었습니다.";
    if ("N".equals(flagYN)) {
      msg = "삭제되었습니다.";
    }

    if (configSeqObj == null) {
      userConfigParam.put("configSeq", 0);
    }
    else {
      try {
        int configSeqInt = Integer.parseInt(configSeqObj.toString());
        userConfigParam.put("configSeq", configSeqInt);
      }
      catch (NumberFormatException e) {
        userConfigParam.put("configSeq", 0);
      }
    }
    if (compCdObj == null) {
      userConfigParam.put("compCd", 0);
    }
    else {
      try {
        int compCdInt = Integer.parseInt(compCdObj.toString());
        userConfigParam.put("compCd", compCdInt);
      }
      catch (NumberFormatException e) {
        userConfigParam.put("compCd", 0);
      }
    }

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    UserConfig storedUser = dao.showUserConfigInfo(userConfigID);

    // 1. 없는 아이디인 경우
    if (storedUser == null || storedUser.getUserConfigID() == null) {
      msg = "존재하지 않는 아이디입니다.";
    }
    // 2. 존재하는 아이디인 경우
    else {
      String storedPasswd = storedUser.getUserConfigPw();

      // 2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
      if ("BCryptPassword".equals(passwdOld)) {
        passwdNew = storedPasswd;
      }
      // 2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
      else {
        passwdNew = passEncoder.encode(passwdOld);
      }

      userConfigParam.put("userID", userID);
      userConfigParam.put("userConfigID", userConfigID);
      userConfigParam.put("userConfigPw", passwdNew);
      userConfigParam.put("issueID", issueID);
      userConfigParam.put("flagYN", flagYN);

      try {
        dao.saveUserConfigInfo(userConfigParam);
      }
      catch (Exception e) {
        e.printStackTrace();
        msg = "저장 실패";
      }
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }

  //------------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/saveUserConfigTab", produces="application/json;charset=UTF-8")
  public String saveUserConfigTab (
    @RequestBody HashMap<String, Object> userConfigParam,
    HttpServletRequest request,
    HttpSession session
  ) throws Exception {

    String userID = (String) session.getAttribute("userConfigID");
    String userConfigID = (String) userConfigParam.get("userConfigID");
    String issueID = (String) session.getAttribute("userConfigID");
    String flagYN = (String) userConfigParam.get("flagYN");
    Object configSeqObj = userConfigParam.get("configSeq");
    Object compCdObj = userConfigParam.get("userConfigCompCd");
    String msg = "저장되었습니다.";
    if ("N".equals(flagYN)) {
      msg = "삭제되었습니다.";
    }

    if (configSeqObj == null) {
      userConfigParam.put("configSeq", 0);
    }
    else {
      try {
        int configSeqInt = Integer.parseInt(configSeqObj.toString());
        userConfigParam.put("configSeq", configSeqInt);
      }
      catch (NumberFormatException e) {
        userConfigParam.put("configSeq", 0);
      }
    }
    if (compCdObj == null) {
      userConfigParam.put("compCd", 0);
    }
    else {
      try {
        int compCdInt = Integer.parseInt(compCdObj.toString());
        userConfigParam.put("compCd", compCdInt);
      }
      catch (NumberFormatException e) {
        userConfigParam.put("compCd", 0);
      }
    }

    userConfigParam.put("userID", userID);
    userConfigParam.put("userConfigID", userConfigID);
    userConfigParam.put("issueID", issueID);
    userConfigParam.put("flagYN", flagYN);

    try {
      dao.saveUserConfigTab(userConfigParam);
    }
    catch (Exception e) {
      msg = "저장 실패";
      e.printStackTrace();
    }

    Map<String, Object> map = new HashMap<String, Object>();
    map.put("result", msg);

    return gson.toJson(map);
  }
}