package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Product;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductXlsDAO {

	public void saveProductXls (
    Product product
  );

}