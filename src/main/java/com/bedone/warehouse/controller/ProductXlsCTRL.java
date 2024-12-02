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
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.dao.ProductXlsDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ProductXlsCTRL {

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
  (value="/productXls", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productXls () throws Exception {

    utils.info ("======================productXls============================");

    return "productXls";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveProductXls", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveProductXls (
    @RequestBody JSONObject obj,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ArrayList<HashMap<Object, Object>> dataList = (ArrayList<HashMap<Object, Object>>) obj.get("datas");
    ProductXlsDAO productXlsDao = sqlSession.getMapper(ProductXlsDAO.class);
    String userID = (String) session.getAttribute("userID");
    String msg = "저장 되었습니다.";
    String objStr = "";

	  for (int i = 0; i < dataList.size(); i++) {
	    objStr = gson.toJson(dataList.get(i));

      if (!"null".equals(objStr)) {
        try {
          JSONParser parser = new JSONParser();
          Object objNew = parser.parse(objStr);
          JSONObject jsonObj = (JSONObject) objNew;

          String prodNmParam = (String) jsonObj.get("prodNm");
          String prodTypeParam = (String) jsonObj.get("prodType");
          Integer houseCdParam = Integer.parseInt((String) jsonObj.get("houseCd"));
          Integer compCdParam = Integer.parseInt((String) jsonObj.get("compCd"));
          String makerParam = (String) jsonObj.get("maker");
          String unitParam = (String) jsonObj.get("unit");
          String qualityParam = (String) jsonObj.get("quality");
          String option1Param = (String) jsonObj.get("option1");
          String option2Param = (String) jsonObj.get("option2");
          Integer protectedQtyParam = Integer.parseInt((String) jsonObj.get("protectedQty"));
          Double unitPriceParam = Double.parseDouble((String) jsonObj.get("unitPrice"));
          String remarkParam = (String) jsonObj.get("remark");

          Product productParam = new Product();
          productParam.setProdNm(prodNmParam);
          productParam.setProdType(prodTypeParam);
          productParam.setHouseCd(houseCdParam);
          productParam.setCompCd(compCdParam);
          productParam.setMaker(makerParam);
          productParam.setUnit(unitParam);
          productParam.setQuality(qualityParam);
          productParam.setOption1(option1Param);
          productParam.setOption2(option2Param);
          productParam.setProtectedQty(protectedQtyParam);
          productParam.setUnitPrice(unitPriceParam);
          productParam.setRemark(remarkParam);
          productParam.setIssueID(userID);
          productParam.setFlagYN("Y");

          try {
        	  productXlsDao.saveProductXls(productParam);
        	}
          catch (Exception e) {
        	  e.printStackTrace();
        	  msg = "저장 실패";
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
