package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.Bom;
import com.WAREHOUSE.container.Product;
import com.WAREHOUSE.container.Resource;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface BomDAO {

  public ArrayList<Product> listBom(
    @Param("findProdNm") String findProdNm
  );

  public ArrayList<Resource> showBom(
    @Param("prodCd") Integer prodCd,
    @Param("bomType") String bomType
  );

  public void saveBom(
    Bom bom
  );
}
