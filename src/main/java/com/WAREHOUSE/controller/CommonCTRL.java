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
import com.WAREHOUSE.util.LogsUtil;
import com.WAREHOUSE.util.JsonUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class CommonCTRL {

  private final CommonDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findBom", produces="application/json")
  public ResponseEntity<?> findBom (
    @RequestParam(value="findBom", required=false) String findBom
  ) throws Exception {
    try {
      ArrayList<Product> list = dao.findBom(findBom);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findHouseNm", produces="application/json")
  public ResponseEntity<?> findHouseNm (
    @RequestParam(value="findHouseNm", required=false) String findHouseNm
  ) throws Exception {
    try {
      ArrayList<House> list = dao.findHouseNm(findHouseNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findHouseCd", produces="application/json")
  public ResponseEntity<?> findHouseCd (
    @RequestParam(value="findNm", required=false) String findNm,
    @RequestParam(value="findCd", required=false) String findCd
  ) throws Exception {
    try {
      ArrayList<House> list = dao.findHouseCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findCompNm", produces="application/json")
  public ResponseEntity<?> findCompNm (
    @RequestParam(value="findCompNm", required=false) String findCompNm
  ) throws Exception {
    try {
      ArrayList<Company> list = dao.findCompNm(findCompNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findCompCd", produces="application/json")
  public ResponseEntity<?> findCompCd (
    @RequestParam(value="findNm", required=false) String findNm,
    @RequestParam(value="findCd", required=false) String findCd
  ) throws Exception {
    try {
      ArrayList<Company> list = dao.findCompCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findProdNm", produces="application/json")
  public ResponseEntity<?> findProdNm (
    @RequestParam(value="findProdNm", required=false) String findProdNm
  ) throws Exception {
    try {
      ArrayList<Product> list = dao.findProdNm(findProdNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findProdCd", produces="application/json")
  public ResponseEntity<?> findProdCd (
    @RequestParam(value="findNm", required=false) String findNm,
    @RequestParam(value="findCd", required=false) String findCd
  ) throws Exception {
    try {
      ArrayList<Product> list = dao.findProdCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findResrcNm", produces="application/json")
  public ResponseEntity<?> findResrcNm (
    @RequestParam(value="findResrcNm", required=false) String findResrcNm
  ) throws Exception {
    try {
      ArrayList<Resource> list = dao.findResrcNm(findResrcNm);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/findResrcCd", produces="application/json")
  public ResponseEntity<?> findResrcCd (
    @RequestParam(value="findNm", required=false) String findNm,
    @RequestParam(value="findCd", required=false) String findCd
  ) throws Exception {
    try {
      ArrayList<Resource> list = dao.findResrcCd(findNm, findCd);
      return ResponseEntity.ok(list);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
