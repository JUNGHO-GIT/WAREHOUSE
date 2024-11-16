package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Shipping;

// 출하 목록 관리(ShipItems)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface ShipItemsDAO {

	public abstract ArrayList<HashMap<String, Object>> listShipItems (
    @Param("shipDt") String shipDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public abstract ArrayList<HashMap<String, Object>> listShipItemsDetail (
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

	public abstract HashMap<String, Object> showShipItems (
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public abstract void saveShipItems (
    Shipping shipping
  );

}
