package com.warehouse.dao;

import com.warehouse.container.Shipping;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
public interface ShipItemsDAO {

  public abstract ArrayList<HashMap<String, Object>> listShipItems(
    @Param ("shipDt") String shipDt,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract ArrayList<HashMap<String, Object>> listShipItemsDetail(
    @Param ("shipCd") String shipCd,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract HashMap<String, Object> showShipItems(
    @Param ("shipCd") String shipCd,
    @Param ("findStartDt") String findStartDt,
    @Param ("findEndDt") String findEndDt
  );
  public abstract void saveShipItems(Shipping shipping);
}
