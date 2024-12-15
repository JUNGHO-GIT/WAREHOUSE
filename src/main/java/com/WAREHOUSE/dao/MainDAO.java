package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface MainDAO {

  public ArrayList<HashMap<String, Object>> listMain();

  public ArrayList<HashMap<String, Object>> listSysMenu(
    @Param("pageNm") String pageNm
  );
}
