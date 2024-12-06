package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.Shipping;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
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