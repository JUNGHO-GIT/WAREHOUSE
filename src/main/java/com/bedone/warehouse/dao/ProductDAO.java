package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Product;

// 제품관리(Product)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ProductDAO {

	public abstract ArrayList<Product> listProduct (
    @Param("findProdNm") String findProdNm
  );

	public abstract Product showProduct (
    @Param("prodCd") Integer prodCd
  );

	public abstract void saveProduct (
    Product product
  );

}
