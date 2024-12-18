package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Shipping;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ShipItemsDAO {

  public ArrayList<HashMap<String, Object>> listShipItems(
    @Param("shipDt") String shipDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public ArrayList<HashMap<String, Object>> listShipItemsDetail(
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public HashMap<String, Object> showShipItems(
    @Param("shipCd") String shipCd,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public void saveShipItems(
    Shipping shipping
  );
}
