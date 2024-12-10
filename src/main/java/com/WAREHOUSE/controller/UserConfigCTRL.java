package com.WAREHOUSE.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import com.WAREHOUSE.container.UserConfig;
import com.WAREHOUSE.dao.UserConfigDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class UserConfigCTRL {

  private final UserConfigDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showUserConfigTab", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showUserConfigTab (
    @RequestParam(value="pageNm", required=false) String pageNm,
    @RequestParam(value="gridCd", required=false) String gridCd,
    @SessionAttribute("userConfigID") String userConfigID
  ) throws Exception {

    try {
      UserConfig show = dao.showUserConfigTab(userConfigID, pageNm, gridCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showUserConfigTab", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // 2-2. 상세 (정보) ------------------------------------------------------------------------------
  @PostMapping(value="/act/showUserConfigInfo", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showUserConfigInfo (
    @SessionAttribute("userConfigID") String userConfigID
  ) throws Exception {

    try {
      UserConfig show = dao.showUserConfigInfo(userConfigID);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showUserConfigInfo", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/updateConfigPw", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> updateConfigPw (
    @RequestBody UserConfig param
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    String userConfigID = param.getUserConfigID();
    String passwdOld = param.getUserConfigPw();

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      if (userConfigID == null || userConfigID.equals("")) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      else {
        String passwdNew = (String) passEncoder.encode(passwdOld);
        dao.updateUserConfigPw(userConfigID, passwdNew);
        map.put("result", "비밀번호를 변경했습니다");
      }
    }
    catch (Exception e) {
      logs.error("updateConfigPw", e.getMessage());
      map.put("result", "비밀번호 변경에 실패하셨습니다");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveUserConfigInfo", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveUserConfigInfo (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userConfigID") String idParam
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String userID = (String) idParam;
      String issueID = (String) idParam;
      String userConfigID = (String) param.get("userConfigID");
      String passwdOld = (String) param.get("userConfigPw");
      String flagYN = (String) param.get("flagYN");
      String passwdNew = "";

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

      UserConfig storedUser = dao.showUserConfigInfo(userConfigID);

      // 1. 없는 아이디인 경우
      if (storedUser == null || storedUser.getUserConfigID() == null) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      // 2. 존재하는 아이디인 경우
      else {
        // 2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
        String storedPasswd = storedUser.getUserConfigPw();
        if (passwdOld.equals("BCryptPassword")) {
          passwdNew = storedPasswd;
        }
        // 2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
        else {
          passwdNew = passEncoder.encode(passwdOld);
        }

        param.put("userID", userID);
        param.put("userConfigID", userConfigID);
        param.put("userConfigPw", passwdNew);
        param.put("issueID", issueID);
        param.put("flagYN", flagYN);

        dao.saveUserConfigInfo(param);
        map.put("result", "저장되었습니다");
      }
    }
    catch (Exception e) {
      logs.error("saveUserConfigInfo", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveUserConfigTab", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveUserConfigTab (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userConfigID") String idParam
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      String userID = (String) idParam;
      String userConfigID = (String) param.get("userConfigID");
      String issueID = (String) idParam;
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

      param.put("userID", userID);
      param.put("userConfigID", userConfigID);
      param.put("issueID", issueID);
      param.put("flagYN", flagYN);

      dao.saveUserConfigTab(param);
      map.put("result", "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveUserConfigTab", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}