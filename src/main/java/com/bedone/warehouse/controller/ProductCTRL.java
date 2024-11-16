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
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.dao.ProductDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class ProductCTRL {

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
  (value="/warehouse/product", method=RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String product () throws Exception {

    utils.info ("============================product================================");

    return "product";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listProduct", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listProduct (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    ProductDAO productDao = sqlSession.getMapper(ProductDAO.class);

    ArrayList<Product> productList = productDao.listProduct(findProdNm);
    model.addAttribute("rsltJson", gson.toJson(productList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/showProduct", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String showProduct (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String prodCd = request.getParameter("prodCd");
    ProductDAO productDao = sqlSession.getMapper(ProductDAO.class);

    Product productShow = productDao.showProduct(Integer.valueOf(prodCd));
    model.addAttribute("rsltJson", gson.toJson(productShow));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/saveProduct", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String saveProduct (
    @RequestBody Product productParam,
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    ProductDAO productDao = sqlSession.getMapper (ProductDAO.class);
    String userID = (String) session.getAttribute("userID");
    productParam.setIssueID(userID);
    String msg = "저장되었습니다.";

    if (productParam.getFlagYN().equals("N")) {
      msg = "삭제되었습니다.";
    }

    try {
      productDao.saveProduct(productParam);
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
