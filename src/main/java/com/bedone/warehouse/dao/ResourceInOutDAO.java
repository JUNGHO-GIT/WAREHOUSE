package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.ResourceInOut;

// 자재입출고(ResourceInOut)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface ResourceInOutDAO {

	public abstract ArrayList<ResourceInOut> listResourceInOut (
    @Param("resrcCd") String resrcCd
  );

	public abstract ResourceInOut showResourceInOut (
    @Param("inOutSeq") Integer inOutSeq
  );

	public abstract void saveResourceInOut (
    ResourceInOut resourceInOut
  );

}