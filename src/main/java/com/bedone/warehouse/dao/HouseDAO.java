package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.House;

// 창고관리(House)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface HouseDAO {

  public abstract ArrayList<House> listHouse (
    @Param("parentsHCd") Integer parentsHCd
  );

  public abstract ArrayList<HashMap<String, Object>> showHousePerProduct (
    @Param("houseCd") Integer houseCd
  );

  public abstract ArrayList<HashMap<String, Object>> showHousePerResource (
    @Param("houseCd") Integer houseCd
  );

  public abstract void saveHouse (
    House House
  );

}