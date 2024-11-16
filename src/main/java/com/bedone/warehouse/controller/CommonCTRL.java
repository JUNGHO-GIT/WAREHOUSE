package com.bedone.warehouse.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.container.Company;
import com.bedone.warehouse.container.House;
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.container.Resource;
import com.bedone.warehouse.dao.CommonDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class CommonCTRL {

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
  (value="/act/findBom", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findBom (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findBom = request.getParameter("findBom");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Product> productList = commonDao.findBom(findBom);
    model.addAttribute("rsltJson", gson.toJson(productList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findHouseNm", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findHouseNm (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findHouseNm = request.getParameter("findHouseNm");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<House> houseList = commonDao.findHouseNm(findHouseNm);
    model.addAttribute("rsltJson", gson.toJson(houseList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findHouseCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findHouseCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<House> houseList = commonDao.findHouseCd(findNm, findCd);
    model.addAttribute("rsltJson", gson.toJson(houseList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findCompNm", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findCompNm (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findCompNm = request.getParameter("findCompNm");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Company> companyList = commonDao.findCompNm(findCompNm);
    model.addAttribute("rsltJson", gson.toJson(companyList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findCompCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findCompCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Company> companyList = commonDao.findCompCd(findNm, findCd);
    model.addAttribute("rsltJson", gson.toJson(companyList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findProdNm", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findProdNm (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Product> productList = commonDao.findProdNm(findProdNm);
    model.addAttribute("rsltJson", gson.toJson(productList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findProdCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findProdCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Product> productList = commonDao.findProdCd(findNm, findCd);
    model.addAttribute("rsltJson", gson.toJson(productList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findResrcNm", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findResrcNm (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findResrcNm = request.getParameter("findResrcNm");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Resource> resourceList = commonDao.findResrcNm(findResrcNm);
    model.addAttribute("rsltJson", gson.toJson(resourceList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/findResrcCd", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String findResrcCd (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    CommonDAO commonDao = sqlSession.getMapper(CommonDAO.class);

    ArrayList<Resource> resourceList = commonDao.findResrcCd(findNm, findCd);
    model.addAttribute("rsltJson", gson.toJson(resourceList));

    return "jsonRs";
  }
}
