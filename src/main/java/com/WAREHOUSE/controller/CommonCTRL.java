package com.WAREHOUSE.controller;

import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.House;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import com.WAREHOUSE.dao.CommonDAO;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class CommonCTRL {

  private final CommonDAO dao;
  private final Logs logs;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findBom", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findBom (
    @RequestParam("findBom") String findBom
  ) throws Exception {

    try {
      ArrayList<Product> list = dao.findBom(findBom);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findBom", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findHouseNm", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findHouseNm (
    @RequestParam("findHouseNm") String findHouseNm
  ) throws Exception {

    try {
      ArrayList<House> list = dao.findHouseNm(findHouseNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findHouseNm", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findHouseCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findHouseCd (
    @RequestParam("findNm") String findNm,
    @RequestParam("findCd") String findCd
  ) throws Exception {

    try {
      ArrayList<House> list = dao.findHouseCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findHouseCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findCompNm", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findCompNm (
    @RequestParam("findCompNm") String findCompNm
  ) throws Exception {

    try {
      ArrayList<Company> list = dao.findCompNm(findCompNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findCompNm", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findCompCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findCompCd (
    @RequestParam("findNm") String findNm,
    @RequestParam("findCd") String findCd
  ) throws Exception {

    try {
      ArrayList<Company> list = dao.findCompCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findCompCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findProdNm", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findProdNm (
    @RequestParam("findProdNm") String findProdNm
  ) throws Exception {

    try {
      ArrayList<Product> list = dao.findProdNm(findProdNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findProdNm", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findProdCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findProdCd (
    @RequestParam("findNm") String findNm,
    @RequestParam("findCd") String findCd
  ) throws Exception {

    try {
      ArrayList<Product> list = dao.findProdCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findProdCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findResrcNm", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findResrcNm (
    @RequestParam("findResrcNm") String findResrcNm
  ) throws Exception {

    try {
      ArrayList<Resource> list = dao.findResrcNm(findResrcNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findResrcNm", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findResrcCd", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> findResrcCd (
    @RequestParam("findNm") String findNm,
    @RequestParam("findCd") String findCd
  ) throws Exception {

    try {
      ArrayList<Resource> list = dao.findResrcCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      logs.error("findResrcCd", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }
}
