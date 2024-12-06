package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.ResourceInOut;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceInOutDAO {

  public abstract ArrayList<ResourceInOut> listResourceInOut(
    @Param("resrcCd") String resrcCd
  );

  public abstract ResourceInOut showResourceInOut(
    @Param("inOutSeq") Integer inOutSeq
  );

  public abstract void saveResourceInOut(
    ResourceInOut resourceInOut
  );
}
