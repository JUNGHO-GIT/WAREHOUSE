package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.House;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface HouseDAO {

  public ArrayList<House> listHouse(
    @Param("parentsHCd") Integer parentsHCd
  );

  public ArrayList<HashMap<String, Object>> showHousePerProduct(
    @Param("houseCd") Integer houseCd
  );

  public ArrayList<HashMap<String, Object>> showHousePerResource(
    @Param("houseCd") Integer houseCd
  );

  public void saveHouse(
    House House
  );
}
