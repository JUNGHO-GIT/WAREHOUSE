package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Product;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductDAO {

  public ArrayList<Product> listProduct(
    @Param("findProdNm") String findProdNm
  );

  public Product showProduct(
    @Param("prodCd") Integer prodCd
  );

  public void saveProduct(
    Product product
  );
}
