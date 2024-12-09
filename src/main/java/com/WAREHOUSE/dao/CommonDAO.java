package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Company;
import com.WAREHOUSE.container.House;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface CommonDAO {

  public ArrayList<Product> findBom(
    @Param("findBom") String findBom
  );

  public ArrayList<Company> findCompNm(
    @Param("findCompNm") String findCompNm
  );
  public ArrayList<Company> findCompCd(
    @Param("findCompNm") String findCompNm,
    @Param("findCompCd") String findCompCd
  );

  public ArrayList<Product> findProdNm(
    @Param("findProdNm") String findProdNm
  );
  public ArrayList<Product> findProdCd(
    @Param("findProdNm") String findProdNm,
    @Param("findProdCd") String findProdCd
  );

  public ArrayList<Resource> findResrcNm(
    @Param("findResrcNm") String findResrcNm
  );
  public ArrayList<Resource> findResrcCd(
    @Param("findResrcNm") String findResrcNm,
    @Param("findResrcCd") String findResrcCd
  );

  public ArrayList<House> findHouseNm(
    @Param("findHouseNm") String findHouseNm
  );
  public ArrayList<House> findHouseCd(
    @Param("findHouseNm") String findHouseNm,
    @Param("findHouseCd") String findHouseCd
  );
}