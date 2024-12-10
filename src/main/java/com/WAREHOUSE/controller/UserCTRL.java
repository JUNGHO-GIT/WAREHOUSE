package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.User;
import com.WAREHOUSE.dao.UserDAO;
import com.WAREHOUSE.util.Json;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class UserCTRL {

  private final UserDAO dao;
  private final Logs logs;
  private final Json json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/", "/login"}, produces="text/html;charset=UTF-8")
  public ModelAndView login () throws Exception {

    try {
      return new ModelAndView("userLogin");
    }
    catch (Exception e) {
      logs.error("login", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/reLogin", "/logout"}, produces="text/html;charset=UTF-8")
  public ModelAndView reLogin () throws Exception {

    try {
      return new ModelAndView("reLogin");
    }
    catch (Exception e) {
      logs.error("reLogin", e.getMessage());
      return null;
    }

  }

  //-----------------------------------------------------------------------------------------------
  @GetMapping(value="/user", produces="text/html;charset=UTF-8")
  public ModelAndView user () throws Exception {

    try {
      return new ModelAndView("user");
    }
    catch (Exception e) {
      logs.error("user", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/auth", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> auth (
    @RequestParam(value="userID", required=false) String userID,
    @RequestParam(value="passwd", required=false) String pwClient,
    HttpSession session
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    boolean matchPasswd = false;
    String pwServer = "";

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      User userInfo = dao.showUser(userID);
      if (userInfo == null || userInfo.getUserID() == null) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      else {
        pwServer = userInfo.getPasswd();
        if (pwClient.equals(pwServer)) {
          matchPasswd = true;
        }
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

          map.put("result", "로그인에 성공하였습니다");
        }
        else {
          map.put("result", "비밀번호가 일치하지 않습니다");
        }
      }
    }
    catch (Exception e) {
      logs.error("auth", e.getMessage());
      map.put("result", "로그인에 실패하였습니다");
    }

    return ResponseEntity.ok(map);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listUser", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listUser (
    @RequestParam(value="findUserNm", required=false) String findUserNm
  ) throws Exception {

    try {
      ArrayList<User> list = dao.listUser(findUserNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listUser", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listUserPerm", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listUserPerm () throws Exception {

    try {
      ArrayList<HashMap<String, Object>> list = dao.listUserPerm();
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listUserPerm", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showUser", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showUser (
    @RequestParam(value="userID", required=false) String userID
  ) throws Exception {

    try {
      User show = dao.showUser(userID);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showUser", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/checkUserID", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> checkUserID (
    @RequestParam(value="userID", required=false) String userID
  ) throws Exception {

    try {
      Integer checkID = dao.checkUserID(userID);
      return ResponseEntity.ok(checkID);
    }
    catch (Exception e) {
      logs.error("checkUserID", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveUser", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveUser (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userID") String idParam
  ) throws Exception {


    Map<String, String> map = new HashMap<String, String>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String passwdOld = param.get("passwd").toString();
      String passwdNew = passEncoder.encode(passwdOld);
      String userID = (String) param.get("userID");
      String issueID = (String) idParam;
      String signUpCheck = (String) param.get("signUpCheck");
      String flagYN = (String) param.get("flagYN");

      Object configSeqObj = param.get("configSeq");
      Object compCdObj = param.get("userConfigCompCd");

      if (configSeqObj == null) {
        param.put("configSeq", 0);
      }
      else {
        Integer configSeqInt = Integer.parseInt(configSeqObj.toString());
        param.put("configSeq", configSeqInt);
      }

      if (compCdObj == null) {
        param.put("compCd", 0);
      }
      else {
        Integer compCdInt = Integer.parseInt(compCdObj.toString());
        param.put("compCd", compCdInt);
      }
      User storedUser = dao.showUser(userID);

      // 1. 신규등록인 경우
      if (signUpCheck.equals("Y")) {
        passwdNew = passEncoder.encode(passwdOld);
        param.put("passwd", passwdNew);
        param.put("issueID", issueID);
        dao.saveUser(param);
        map.put("result", "저장되었습니다");
      }
      // 2. 이미 등록된 아이디인 경우
      else {
        // 2-1. 없는 아이디인 경우
        if (storedUser == null || storedUser.getUserID() == null) {
          map.put("result", "존재하지 않는 아이디입니다");
        }
        // 2-2. 존재하는 아이디인 경우
        else {
          // 2-2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
          String storedPasswd = storedUser.getPasswd();
          if (passwdOld.equals("BCryptPassword")) {
            passwdNew = storedPasswd;
          }
          // 2-2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
          else {
            passwdNew = passEncoder.encode(passwdOld);
          }

          param.put("userID", userID);
          param.put("passwd", passwdNew);
          param.put("issueID", issueID);
          param.put("flagYN", flagYN);
          dao.saveUser(param);
          map.put("result", "저장되었습니다");
        }
      }
    }
    catch (Exception e) {
      logs.error("saveUser", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/updatePw", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> updatePw (
    @RequestBody User param,
    @SessionAttribute("userID") String userID
  ) throws Exception {


    Map<String, String> result = new HashMap<String, String>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String passwdOld = param.getPasswd();
      String passwdNew = "";
      User storedUser = dao.showUser(userID);
      String storedPasswd = storedUser.getPasswd();

      // 1. 없는 아이디인 경우
      if (storedUser == null || storedUser.getUserID() == null) {
        result.put("result", "존재하지 않는 아이디입니다");
      }
      // 2. 존재하는 아이디인 경우
      else {
        if (passwdOld.equals("BCryptPassword")) {
          passwdNew = storedPasswd;
        }
        else {
          passwdNew = passEncoder.encode(passwdOld);
        }

        param.setPasswd(passwdNew);
        dao.updatePw(userID, passwdNew);
        result.put("result", "비밀번호를 변경했습니다");
      }
    }
    catch (Exception e) {
      logs.error("updatePw", e.getMessage());
      result.put("result", "비밀번호 변경에 실패하셨습니다");
    }

    return ResponseEntity.ok(result);
  }
}