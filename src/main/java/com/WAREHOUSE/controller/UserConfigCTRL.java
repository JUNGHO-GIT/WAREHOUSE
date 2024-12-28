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
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class UserConfigCTRL {

  private final UserConfigDAO dao;
  // private final com.WAREHOUSE.util.LogsUtil logs;
  // private final com.WAREHOUSE.util.JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/showUserConfigTab"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showUserConfigTab (
    @RequestParam(value="pageNm", required=false) String pageNm,
    @RequestParam(value="gridCd", required=false) String gridCd,
    @SessionAttribute("userConfigId") String userConfigId
  ) throws Exception {
    try {
      UserConfig show = dao.showUserConfigTab(userConfigId, pageNm, gridCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // 2-2. 상세 (정보) ------------------------------------------------------------------------------
  @PostMapping(value={"/act/showUserConfigInfo"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> showUserConfigInfo (
    @SessionAttribute("userConfigId") String userConfigId
  ) throws Exception {
    try {
      UserConfig show = dao.showUserConfigInfo(userConfigId);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/updateConfigPw"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> updateConfigPw (
    @RequestBody UserConfig param
  ) throws Exception {

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    String userConfigId = param.getUserConfigId();
    String userPwOld = param.getUserConfigPw();

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      if (userConfigId == null || userConfigId.equals("")) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      else {
        String userPwNew = String.valueOf(passEncoder.encode(userPwOld));
        dao.updateUserConfigPw(userConfigId, userPwNew);
        map.put("result", "비밀번호를 변경했습니다");
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "비밀번호 변경에 실패하셨습니다");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveUserConfigInfo"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveUserConfigInfo (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userConfigId") String idParam
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
      String userId = String.valueOf(idParam);
      String issueId = String.valueOf(idParam);
      String userConfigId = String.valueOf(param.get("userConfigId"));
      String userPwOld = String.valueOf(param.get("userConfigPw"));
      String flagYn = String.valueOf(param.get("flagYn"));
      String userPwNew = "";

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

      UserConfig storedUser = dao.showUserConfigInfo(userConfigId);

      // 1. 없는 아이디인 경우
      if (storedUser == null || storedUser.getUserConfigId() == null) {
        map.put("result", "존재하지 않는 아이디입니다");
      }
      // 2. 존재하는 아이디인 경우
      else {
        // 2-1. 비밀번호를 변경한 직후 저장하는 경우 기존의 암호화된 비밀번호를 그대로 사용
        String storedPasswd = storedUser.getUserConfigPw();
        if (userPwOld.equals("BCryptPassword")) {
          userPwNew = storedPasswd;
        }
        // 2-2. 그렇지 않을경우 새로운 비밀번호를 암호화
        else {
          userPwNew = passEncoder.encode(userPwOld);
        }

        param.put("userId", userId);
        param.put("userConfigId", userConfigId);
        param.put("userConfigPw", userPwNew);
        param.put("issueId", issueId);
        param.put("flagYn", flagYn);

        dao.saveUserConfigInfo(param);
        map.put("result", "저장되었습니다");
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }

  //------------------------------------------------------------------------------------------------
  @PostMapping(value={"/act/saveUserConfigTab"}, produces={"application/json; charset=UTF-8"})
  public ResponseEntity<?> saveUserConfigTab (
    @RequestBody HashMap<String, Object> param,
    @SessionAttribute("userConfigId") String idParam
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      String userId = String.valueOf(idParam);
      String userConfigId = String.valueOf(param.get("userConfigId"));
      String issueId = String.valueOf(param.get("issueId"));
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

      param.put("userId", userId);
      param.put("userConfigId", userConfigId);
      param.put("issueId", issueId);
      param.put("flagYn", flagYn);

      dao.saveUserConfigTab(param);
      map.put("result", "저장되었습니다");
    }
    catch (Exception e) {
      e.printStackTrace();
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}