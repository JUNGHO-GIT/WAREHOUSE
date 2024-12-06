package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Shipping;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface ShippingDAO {

  public abstract ArrayList<HashMap<String, Object>> listShipping(
    @Param("inOutDt") String inOutDt,
    @Param("findStartDt") String findStartDt,
    @Param("findEndDt") String findEndDt
  );

  public abstract void saveShipping(
    Shipping shipping
  );
}
