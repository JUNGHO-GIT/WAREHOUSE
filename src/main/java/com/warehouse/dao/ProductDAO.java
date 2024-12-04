package com.warehouse.dao;

import com.warehouse.container.Product;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface ProductDAO {

  public abstract ArrayList<Product> listProduct(@Param ("findProdNm") String findProdNm);
  public abstract Product showProduct(@Param ("prodCd") Integer prodCd);
  public abstract void saveProduct(Product product);
}