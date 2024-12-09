package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.ProductInOut;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductInOutDAO {

	public ArrayList<ProductInOut> listProductInOut(
    @Param("prodCd") String prodCd
  );

	public ProductInOut showProductInOut (
    @Param("inOutSeq") Integer inOutSeq
  );

	public void saveProductInOut (
    ProductInOut productInOut
  );

}