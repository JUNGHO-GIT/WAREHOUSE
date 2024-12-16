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
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class UserCTRL {

  private final UserDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value={"/", "/login"}, produces="text/html;charset=UTF-8")
  public ModelAndView login () throws Exception {
    try {
      return new ModelAndView("userLogin");
    }
    catch (Exception e) {
      e.printStackTrace();
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
      e.printStackTrace();
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
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/auth", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> auth (
    @RequestParam(value="userId", required=false) String userId,
    @RequestParam(value="userPw", required=false) String pwClient,
    HttpSession session
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    boolean matchPasswd = false;
    String pwServer = "";

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      User userInfo = dao.showUser(userId);
      if (userInfo == null || userInfo.getUserId() == null) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      else {
        pwServer = userInfo.getUserPw();
        if (pwClient.equals(pwServer)) {
          matchPasswd = true;
        }
        else {
          matchPasswd = passEncoder.matches(pwClient, pwServer);
        }

        if (matchPasswd) {
          session.setAttribute("userId", userInfo.getUserId());
          session.setAttribute("userNm", userInfo.getUserNm());
          session.setAttribute("userLevel", userInfo.getUserLevel());
          session.setAttribute("userPerm", userInfo.getUserPerm());

          session.setAttribute("userConfigId", userInfo.getUserId());
          session.setAttribute("userConfigNm", userInfo.getUserNm());
          session.setAttribute("userConfigLevel", userInfo.getUserLevel());
          session.setAttribute("userConfigPerm", userInfo.getUserPerm());

          map.put("result", "success");
          map.put("msg", "로그인에 성공하였습니다");
        }
        else {
          map.put("result", "fail");
          map.put("msg", "비밀번호가 일치하지 않습니다");
        }
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "fail");
      map.put("msg", "로그인에 실패하였습니다");
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
      e.printStackTrace();
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
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showUser", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showUser (
    @RequestParam(value="userId", required=false) String userId
  ) throws Exception {
    try {
      User show = dao.showUser(userId);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/checkUserId", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> checkUserId (
    @RequestParam(value="userId", required=false) String userId
  ) throws Exception {
    try {
      Integer checkID = dao.checkUserId(userId);
      return ResponseEntity.ok(checkID);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveUser", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveUser (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userId") String idParam
  ) throws Exception {


    Map<String, String> map = new HashMap<String, String>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String userPwOld = String.valueOf(param.get("userPw"));
      String userPwNew = String.valueOf(passEncoder.encode(userPwOld));
      String userId = String.valueOf(param.get("userId"));
      String issueId = String.valueOf(idParam);
      String signUpCheck = String.valueOf(param.get("signUpCheck"));
      String flagYn = String.valueOf(param.get("flagYn"));

      Object configSeqObj = param.get("configSeq");
      Object compCdObj = param.get("userConfigCompCd");

      if (configSeqObj == null) {
        param.put("configSeq", 0);
      }
      else {
        Integer configSeqInt = Integer.parseInt(String.valueOf(configSeqObj));
        param.put("configSeq", configSeqInt);
      }

      if (compCdObj == null) {
        param.put("compCd", 0);
      }
      else {
        Integer compCdInt = Integer.parseInt(String.valueOf(compCdObj));
        param.put("compCd", compCdInt);
      }
      User storedUser = dao.showUser(userId);

      // 1. 신규등록인 경우
      if (signUpCheck.equals("Y")) {
        userPwNew = passEncoder.encode(userPwOld);
        param.put("userPw", userPwNew);
        param.put("issueId", issueId);
        dao.saveUser(param);
        map.put("result", "저장되었습니다");
      }
      // 2. 이미 등록된 아이디인 경우
      else {
        // 2-1. 없는 아이디인 경우
        if (storedUser == null || storedUser.getUserId() == null) {
          map.put("result", "존재하지 않는 아이디입니다");
        }
        // 2-2. 존재하는 아이디인 경우
        else {
          // 2-2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
          String storedPasswd = storedUser.getUserPw();
          if (userPwOld.equals("BCryptPassword")) {
            userPwNew = storedPasswd;
          }
          // 2-2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
          else {
            userPwNew = passEncoder.encode(userPwOld);
          }

          param.put("userId", userId);
          param.put("userPw", userPwNew);
          param.put("issueId", issueId);
          param.put("flagYn", flagYn);
          dao.saveUser(param);
          map.put("result", "저장되었습니다");
        }
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/updatePw", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> updatePw (
    @RequestBody User param,
    @SessionAttribute("userId") String userId
  ) throws Exception {


    Map<String, String> result = new HashMap<String, String>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String userPwOld = param.getUserPw();
      String userPwNew = "";
      User storedUser = dao.showUser(userId);
      String storedPasswd = storedUser.getUserPw();

      // 1. 없는 아이디인 경우
      if (storedUser == null || storedUser.getUserId() == null) {
        result.put("result", "존재하지 않는 아이디입니다");
      }
      // 2. 존재하는 아이디인 경우
      else {
        if (userPwOld.equals("BCryptPassword")) {
          userPwNew = storedPasswd;
        }
        else {
          userPwNew = passEncoder.encode(userPwOld);
        }

        param.setUserPw(userPwNew);
        dao.updatePw(userId, userPwNew);
        result.put("result", "비밀번호를 변경했습니다");
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      result.put("result", "비밀번호 변경에 실패하셨습니다");
    }

    return ResponseEntity.ok(result);
  }
}