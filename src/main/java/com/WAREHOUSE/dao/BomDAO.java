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

  public abstract ArrayList<Product> listBom(
    @Param("findProdNm") String findProdNm
  );

  public abstract ArrayList<Resource> showBom(
    @Param("prodCd") Integer prodCd,
    @Param("bomType") String bomType
  );

  public abstract void saveBom(
    Bom bom
  );
}
