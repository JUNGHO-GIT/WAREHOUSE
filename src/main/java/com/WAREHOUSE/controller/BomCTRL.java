package com.WAREHOUSE.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.container.Bom;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.BomDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class BomCTRL {

  private final BomDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/bom", produces="text/html;charset=UTF-8")
  public ModelAndView bom () throws Exception {

    try {
      logs.info("page", "bom");
      return new ModelAndView("bom");
    }
    catch (Exception e) {
      logs.error("bom", e.getMessage());
      return null;
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listBom", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listBom(
    @RequestParam("findProdNm") String findProdNm
  ) throws Exception {

    try {
      ArrayList<Product> list = dao.listBom(findProdNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("listBom", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/showBom", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showBom (
    @RequestParam("prodCd") Integer prodCd,
    @RequestParam("bomType") String bomType
  ) throws Exception {

    try {
      ArrayList<Resource> show = dao.showBom(prodCd, bomType);
      return ResponseEntity.ok(show);
    }
    catch (Exception e) {
      logs.error("showBom", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/saveBom", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> saveBom (
    @RequestBody JSONObject obj,
    @SessionAttribute("userID") String userID
  ) throws Exception {

    JSONArray dataList = (JSONArray) obj.get("dataList");
    Map<String, Object> map = new HashMap<String, Object>();

    for (int i = 0; i < dataList.size(); i++) {
      JSONObject jsonObj = (JSONObject) dataList.get(i);

      String userIDParam = (String) userID;
      String bomTypeParam = (String) jsonObj.get("bomType");
      String flagYNParam = (String) jsonObj.get("flagYN");
      Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
      Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
      Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
      Double unitQtyParam = Double.parseDouble((String) jsonObj.get("unitQty"));

      try {
        Bom param = new Bom();
        param.setProdCd(prodCdParam);
        param.setResrcCd(resrcCdParam);
        param.setQty(qtyParam);
        param.setUnitQty(unitQtyParam);
        param.setBomType(bomTypeParam);
        param.setFlagYN(flagYNParam);
        param.setIssueID(userIDParam);

        dao.saveBom(param);
        map.put("result", param.getFlagYN().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        logs.error("saveBom", e.getMessage());
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}