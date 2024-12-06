package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Product;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductDAO {

  public abstract ArrayList<Product> listProduct(
    @Param("findProdNm") String findProdNm
  );

  public abstract Product showProduct(
    @Param("prodCd") Integer prodCd
  );

  public abstract void saveProduct(
    Product product
  );
}
