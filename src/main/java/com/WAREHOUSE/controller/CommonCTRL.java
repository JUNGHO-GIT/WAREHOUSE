package com.WAREHOUSE.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.House;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.CommonDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class CommonCTRL {

  @Autowired
  private CommonDAO dao;
  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findBom", produces="application/json;charset=UTF-8")
  public String findBom (
    HttpServletRequest request
  ) throws Exception {

    String findBom = request.getParameter("findBom");
    ArrayList<Product> productList = dao.findBom(findBom);

    return gson.toJson(productList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findHouseNm", produces="application/json;charset=UTF-8")
  public String findHouseNm (
    HttpServletRequest request
  ) throws Exception {

    String findHouseNm = request.getParameter("findHouseNm");
    ArrayList<House> houseList = dao.findHouseNm(findHouseNm);

    return gson.toJson(houseList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findHouseCd", produces="application/json;charset=UTF-8")
  public String findHouseCd (
    HttpServletRequest request
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    ArrayList<House> houseList = dao.findHouseCd(findNm, findCd);

    return gson.toJson(houseList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findCompNm", produces="application/json;charset=UTF-8")
  public String findCompNm (
    HttpServletRequest request
  ) throws Exception {

    String findCompNm = request.getParameter("findCompNm");
    ArrayList<Company> companyList = dao.findCompNm(findCompNm);

    return gson.toJson(companyList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findCompCd", produces="application/json;charset=UTF-8")
  public String findCompCd (
    HttpServletRequest request
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    ArrayList<Company> companyList = dao.findCompCd(findNm, findCd);

    return gson.toJson(companyList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findProdNm", produces="application/json;charset=UTF-8")
  public String findProdNm (
    HttpServletRequest request
  ) throws Exception {

    String findProdNm = request.getParameter("findProdNm");
    ArrayList<Product> productList = dao.findProdNm(findProdNm);

    return gson.toJson(productList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findProdCd", produces="application/json;charset=UTF-8")
  public String findProdCd (
    HttpServletRequest request
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    ArrayList<Product> productList = dao.findProdCd(findNm, findCd);

    return gson.toJson(productList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findResrcNm", produces="application/json;charset=UTF-8")
  public String findResrcNm (
    HttpServletRequest request
  ) throws Exception {

    String findResrcNm = request.getParameter("findResrcNm");
    ArrayList<Resource> resourceList = dao.findResrcNm(findResrcNm);

    return gson.toJson(resourceList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/findResrcCd", produces="application/json;charset=UTF-8")
  public String findResrcCd (
    HttpServletRequest request
  ) throws Exception {

    String findNm = request.getParameter("findNm");
    String findCd = request.getParameter("findCd");
    ArrayList<Resource> resourceList = dao.findResrcCd(findNm, findCd);

    return gson.toJson(resourceList);
  }
}
