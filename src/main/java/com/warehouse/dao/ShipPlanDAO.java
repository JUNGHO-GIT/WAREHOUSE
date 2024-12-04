package com.warehouse.dao;

import com.warehouse.container.Shipping;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
public interface ShipPlanDAO {

  public abstract ArrayList<HashMap<String, Object>> listShipPlan(
    @Param ("shipDt") String shipDt,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract ArrayList<HashMap<String, Object>> listShipPlanDetail(
    @Param ("shipCd") String shipCd,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract HashMap<String, Object> showShipPlan(
    @Param ("shipCd") String shipCd,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract void saveShipPlan(Shipping shipping);
}