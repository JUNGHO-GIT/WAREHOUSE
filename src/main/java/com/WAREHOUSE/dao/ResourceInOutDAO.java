package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.ResourceInOut;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceInOutDAO {

  public ArrayList<ResourceInOut> listResourceInOut(
    @Param("resrcCd") String resrcCd
  );

  public ResourceInOut showResourceInOut(
    @Param("inOutSeq") Integer inOutSeq
  );

  public void saveResourceInOut(
    ResourceInOut resourceInOut
  );
}
