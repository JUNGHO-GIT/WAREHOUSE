package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Shipping;

// 출하 계획 관리(ShipPlan)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface ShipPlanDAO {

	public abstract ArrayList<HashMap<String, Object>> listShipPlan (
    @Param("shipDt") String shipDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public abstract ArrayList<HashMap<String, Object>> listShipPlanDetail (
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

	public abstract HashMap<String, Object> showShipPlan (
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public abstract void saveShipPlan (
    Shipping shipping
  );

}
