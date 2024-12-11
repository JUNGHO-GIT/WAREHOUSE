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
    @RequestParam(value="findProdNm", required=false) String findProdNm
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
    @RequestParam(value="prodCd", required=false) Integer prodCd,
    @RequestParam(value="bomType", required=false) String bomType
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
    @RequestBody HashMap<String, Object> obj,
    @SessionAttribute("userId") String userId
  ) throws Exception {

    @SuppressWarnings("unchecked")
    ArrayList<HashMap<Object, Object>> dataList
    = (ArrayList<HashMap<Object, Object>>)obj.get("dataList");

    Map<String, Object> map = new HashMap<String, Object>();

    for (int i = 0; i < dataList.size(); i++) {
      HashMap<Object, Object> jsonObj = dataList.get(i);

      String userIdParam = (String) userId;
      String bomTypeParam = (String) jsonObj.get("bomType");
      String flagYnParam = (String) jsonObj.get("flagYn");
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
        param.setFlagYn(flagYnParam);
        param.setIssueId(userIdParam);

        dao.saveBom(param);
        map.put("result", param.getFlagYn().equals("N") ? "삭제되었습니다" : "저장되었습니다");
      }
      catch (Exception e) {
        logs.error("saveBom", e.getMessage());
        map.put("result", "저장 실패");
      }
    }

    return ResponseEntity.ok(map);
  }
}