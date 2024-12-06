package com.WAREHOUSE.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.ProductInOut;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ProductInOutPlanDAO {

  // 1-1. 제품 입출고 예정 리스트
  public abstract ArrayList<ProductInOut> listProductInOutPlan (
    @Param("prodCd") String prodCd
  );

  // 1-2. 제품 입출고 예정 상세
  public abstract ProductInOut showProductInOutPlan (
    @Param("inOutSeq") Integer inOutSeq
  );

  // 1-3. 제품 입출고 예정 등록
  public abstract void saveProductInOutPlan (
    ProductInOut productInOut
  );

}