package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.ProductInOut;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductInOutAllDAO {

	public abstract void saveProductInOut (
    ProductInOut productInOut
  );

}