package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.ProductInOut;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductInOutXlsDAO {

  public void saveProductInOutXls (
    ProductInOut productInOut
  );

}