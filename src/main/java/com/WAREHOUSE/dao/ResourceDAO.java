package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.Resource;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceDAO {

	public abstract ArrayList<Resource> listResource (
    @Param("findResrcNm") String findResrcNm
  );

	public abstract Resource showResource (
    @Param("resrcCd") Integer resrcCd
  );

	public abstract void saveResource (
    Resource resource
  );

}
