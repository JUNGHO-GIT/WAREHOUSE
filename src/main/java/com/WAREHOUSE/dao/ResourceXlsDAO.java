package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Resource;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceXlsDAO {

  public abstract void saveResourceXls(
    Resource resource
  );
}
