package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.Common;
import com.WAREHOUSE.container.CommonCd;
import com.WAREHOUSE.dao.CommonCdDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class CommonCdCTRL {

  private final CommonCdDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/commonCd", produces="text/html;charset=UTF-8")
  public ModelAndView commonCd () throws Exception {

    try {
      return new ModelAndView("commonCd");
    }
    catch (Exception e) {
      logs.error("commonCd", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/initCodeAll", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> initCodeAll (
    @RequestParam(value="part", required=false) String part,
    @RequestParam(value="groupCd", required=false) String groupCd,
    @RequestParam(value="target", required=false) String target
  ) throws Exception {

    String partArr[] = part.split("/");
    String groupCdArr[] = groupCd.split("/");
    String targetArr[] = target.split("/");

    ArrayList<Common> result = new ArrayList<Common>();

    for (Integer i = 0; i < partArr.length; i++) {
      if (partArr[i].equals("comCode")) {
        result = dao.listComCodeAll(groupCdArr[i], targetArr[i]);
      }
      else if (partArr[i].equals("comCodeGroup")) {
        result = dao.listComCodeGroupAll(targetArr[i]);
      }
    }

    return ResponseEntity.ok(result);
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listCommonCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listCommonCd (
    @RequestParam(value="findGroupCd", required=false) String findGroupCd,
    @RequestParam(value="findItemNm", required=false) String findItemNm
  ) throws Exception {

    try {
      ArrayList<CommonCd> list = dao.listCommonCd(findGroupCd, findItemNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listCommonCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showCommonCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showCommonCd (
    @RequestParam(value="groupCd", required=false) String groupCd,
    @RequestParam(value="itemCd", required=false) String itemCd
  ) throws Exception {

    try {
      CommonCd show = dao.showCommonCd(groupCd, itemCd);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showCommonCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveCommonCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveCommonCd (
    @RequestBody CommonCd param,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    Map<String, Object> map = new HashMap<String, Object>();

    try {
      param.setIssueID(userID);
      dao.saveCommonCd(param);
      map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
    }
    catch (Exception e) {
      logs.error("saveCommonCd", e.getMessage());
      map.put("result", "저장 실패");
    }

    return ResponseEntity.ok(map);
  }
}