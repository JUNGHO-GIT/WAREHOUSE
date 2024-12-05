package com.bedone.wms.dao;

import com.bedone.wms.container.House;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
public interface HouseDAO {

  public abstract ArrayList<House> listHouse(@Param ("parentsHCd") Integer parentsHCd);
  public abstract ArrayList<HashMap<String, Object>> showHousePerProduct(
    @Param ("houseCd") Integer houseCd
  );
  public abstract ArrayList<HashMap<String, Object>> showHousePerResource(
    @Param ("houseCd") Integer houseCd
  );
  public abstract void saveHouse(House House);
}
