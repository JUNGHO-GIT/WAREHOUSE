package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.ResourceInOut;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ResourceInOutPlanDAO {

  // 1-1. 자재 입출고 예정 리스트
  public ArrayList<ResourceInOut> listResourceInOutPlan (
    @Param("resrcCd") String resrcCd
  );

  // 1-2. 자재 입출고 예정 상세
  public ResourceInOut showResourceInOutPlan (
    @Param("inOutSeq") Integer inOutSeq
  );

  // 1-3. 자재 입출고 예정 등록
  public void saveResourceInOutPlan (
    ResourceInOut resourceInOut
  );

}
