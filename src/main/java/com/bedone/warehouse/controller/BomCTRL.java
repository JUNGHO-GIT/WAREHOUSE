package com.bedone.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.Bom;
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.container.Resource;
import com.bedone.warehouse.dao.BomDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class BomCTRL {

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
  (value="/warehouse/bom", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String bom (

  ) throws Exception {

    utils.info ("============================bom================================");

    return "bom";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listBom", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listBom (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    BomDAO bomDao = sqlSession.getMapper(BomDAO.class);

    ArrayList<Product> bomList = new ArrayList<Product>();

    try {
      bomList = bomDao.listBom(findProdNm);
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    model.addAttribute("rsltJson", gson.toJson(bomList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showBom", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showBom (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    Integer prodCd = Integer.valueOf((String) request.getParameter("prodCd"));
    String bomType = (String) request.getParameter("bomType");
    BomDAO bomDao = sqlSession.getMapper(BomDAO.class);

    ArrayList<Resource> showBom = new ArrayList<Resource>();

    try {
      showBom = bomDao.showBom(prodCd, bomType);
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    model.addAttribute("rsltJson", gson.toJson(showBom));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveBom", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveBom (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = (ArrayList<HashMap<Object, Object>>) obj.get("datas");
    BomDAO bomDao = sqlSession.getMapper(BomDAO.class);
    String msg = "저장되었습니다.";
    String objStr = "";

    for (int i = 0; i < dataList.size(); i++) {
      objStr = gson.toJson(dataList.get(i));

      if (!"null".equals(objStr)) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;

          String userIDParam = (String) session.getAttribute("userID");
          String bomTypeParam = (String) jsonObj.get("bomType");
          String flagYNParam = (String) jsonObj.get("flagYN");

          Integer prodCdParam = Integer.parseInt((String) jsonObj.get("prodCd"));
          Integer resrcCdParam = Integer.parseInt((String) jsonObj.get("resrcCd"));
          Integer qtyParam = Integer.parseInt((String) jsonObj.get("qty"));
          Double unitQtyParam = Double.parseDouble((String) jsonObj.get("unitQty"));

          Bom bomParam = new Bom();
          bomParam.setProdCd(prodCdParam);
          bomParam.setResrcCd(resrcCdParam);
          bomParam.setQty(qtyParam);
          bomParam.setUnitQty(unitQtyParam);
          bomParam.setBomType(bomTypeParam);
          bomParam.setFlagYN(flagYNParam);
          bomParam.setIssueID(userIDParam);

          if (flagYNParam.equals("N")) {
            msg = "삭제되었습니다.";
          }

          try {
            bomDao.saveBom(bomParam);
          }
          catch (Exception e) {
            msg = "저장 실패";
            e.printStackTrace();
          }
        }
        catch (ParseException e) {
          e.printStackTrace();
        }
      }
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

}
