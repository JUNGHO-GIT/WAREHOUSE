package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Resource;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceXlsDAO {

  public abstract void saveResourceXls(
    Resource resource
  );
}
