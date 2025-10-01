package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.ProductInOut;

// 제품입출고관리(ProductInOut)의 DAO 객체
// 생성일 : 2021-04-21 20:2:55 by JDFrame

public interface ProductInOutDAO {

	public abstract ArrayList<ProductInOut> listProductInOut(
    @Param("prodCd") String prodCd
  );

	public abstract ProductInOut showProductInOut (
    @Param("inOutSeq") Integer inOutSeq
  );

	public abstract void saveProductInOut (
    ProductInOut productInOut
  );

}