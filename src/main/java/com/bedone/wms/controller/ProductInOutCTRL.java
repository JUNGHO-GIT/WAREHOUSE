package com.bedone.wms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.wms.container.ProductInOut;
import com.bedone.wms.dao.ProductInOutDAO;
import com.bedone.wms.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class ProductInOutCTRL {

  @Autowired
  private SqlSession sqlSession;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/productIn", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productIn () throws Exception {

    return "productIn";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/productOut", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String productOut () throws Exception {

    return "productOut";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/listProductInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listProductInOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    ProductInOutDAO productInOutDao = sqlSession.getMapper(ProductInOutDAO.class);

    ArrayList<ProductInOut> productInOutList = productInOutDao.listProductInOut(prodCd);
    model.addAttribute("rsltJson", gson.toJson(productInOutList));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/showProductInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showProductInOut (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String inOutSeq = request.getParameter("inOutSeq");
    ProductInOutDAO productInOutDao = sqlSession.getMapper(ProductInOutDAO.class);

    ProductInOut productInOutShow = productInOutDao.showProductInOut(Integer.valueOf(inOutSeq));
    model.addAttribute("rsltJson", gson.toJson(productInOutShow));

    return "jsonRs";
  }

  // -----------------------------------------------------------------------------------------------
  @RequestMapping
  (value="/act/saveProductInOut", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveProductInOut (
    @RequestBody ProductInOut productInOutParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ProductInOutDAO productInOutDao = sqlSession.getMapper (ProductInOutDAO.class);
    String userID = (String) session.getAttribute("userID");
    String flagYN = (String) productInOutParam.getFlagYN();

    String msg = "저장되었습니다.";
    if (flagYN.equals("N")) {
      msg = "삭제되었습니다.";
    }

    productInOutParam.setIssueID(userID);

    try {
      productInOutDao.saveProductInOut(productInOutParam);
    }
    catch (Exception e) {
      e.printStackTrace();
      msg = "저장 실패";
    }

    logs.info("productInOutParam", gson.toJson(productInOutParam));

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("result", msg);
    model.addAttribute("rsltJson", gson.toJson(result));

    return "jsonRs";
  }

}
