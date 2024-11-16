package com.bedone.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.ProductInOut;
import com.bedone.warehouse.dao.ProductInOutPlanDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ProductInOutPlanCTRL {

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

  // 0. 제품 입고 예정 ---------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/productInPlan", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productInPlan () throws Exception {

    utils.info ("======================productInPlan============================");

    return "productInPlan";
  }

  // 0. 제품 출고 예정 ---------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/productOutPlan", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productOutPlan () throws Exception {

    utils.info ("======================productOutPlan============================");

    return "productOutPlan";
  }

  // 1-1. 제품 입출고 예정 리스트 ----------------------------------------------------------------->
  @RequestMapping
  (value="/act/listProductInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listProductInOutPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    ProductInOutPlanDAO planDao = sqlSession.getMapper(ProductInOutPlanDAO.class);

    ArrayList<ProductInOut> productInOutList = planDao.listProductInOutPlan(prodCd);
    model.addAttribute("rsltJson", gson.toJson(productInOutList));

    return "jsonRs";
  }

  // 1-2. 제품 입출고 예정 상세 ------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showProductInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showProductInOutPlan (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ProductInOutPlanDAO planDao = sqlSession.getMapper(ProductInOutPlanDAO.class);

    ProductInOut productInOutShow = planDao.showProductInOutPlan(Integer.parseInt(inOutSeq));
    model.addAttribute("rsltJson", gson.toJson(productInOutShow));

    return "jsonRs";
  }

  // 1-3. 제품 입출고 예정 저장 ------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveProductInOutPlan", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveProductInOutPlan (
    @RequestBody ProductInOut productInOutParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ProductInOutPlanDAO planDao = sqlSession.getMapper(ProductInOutPlanDAO.class);
    String userID = (String) session.getAttribute("userID");
    productInOutParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (productInOutParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    utils.info("productInOutParam : " + gson.toJson(productInOutParam));

    try {
      planDao.saveProductInOutPlan(productInOutParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

}
