package com.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.warehouse.container.ResourceInOut;

public interface ResourceInOutPlanDAO {

  // 1-1. 자재 입출고 예정 리스트
  public abstract ArrayList<ResourceInOut> listResourceInOutPlan (
    @Param("resrcCd") String resrcCd
  );

  // 1-2. 자재 입출고 예정 상세
  public abstract ResourceInOut showResourceInOutPlan (
    @Param("inOutSeq") Integer inOutSeq
  );

  // 1-3. 자재 입출고 예정 등록
  public abstract void saveResourceInOutPlan (
    ResourceInOut resourceInOut
  );

}
