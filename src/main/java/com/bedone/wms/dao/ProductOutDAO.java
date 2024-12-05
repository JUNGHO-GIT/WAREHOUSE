package com.bedone.wms.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.wms.container.Shipping;

// 출고(ProductOut)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ProductOutDAO {

	public abstract ArrayList<HashMap<String, Object>> listProductOut (
    @Param("inOutDt") String inOutDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

	public abstract void saveProductOut (
    Shipping ship
  );

}