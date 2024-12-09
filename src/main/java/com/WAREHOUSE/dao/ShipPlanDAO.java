package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Shipping;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ShipPlanDAO {

  public ArrayList<HashMap<String, Object>> listShipPlan(
    @Param("shipDt") String shipDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public ArrayList<HashMap<String, Object>> listShipPlanDetail(
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public HashMap<String, Object> showShipPlan(
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public void saveShipPlan(
    Shipping shipping
  );
}
