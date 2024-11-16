package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Shipping;

// 출고현황 및 출하 (Ship)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ShippingDAO {

	public abstract ArrayList<HashMap<String, Object>> listShipping (
    @Param("inOutDt") String inOutDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

	public abstract void saveShipping (
    Shipping shipping
  );

}
