package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Product;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductXlsDAO {

	public abstract void saveProductXls (
    Product product
  );

}