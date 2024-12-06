package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.ResourceInOut;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceInOutXlsDAO {

	public abstract void saveResourceInOutXls (
    ResourceInOut resourceInOut
  );

}