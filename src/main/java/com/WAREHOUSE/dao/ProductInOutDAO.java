package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.ProductInOut;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
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