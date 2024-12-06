package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface MainDAO {

  public abstract ArrayList<HashMap<String, Object>> listMain(
  );

  public abstract ArrayList<HashMap<String, Object>> listSysMenu(
    @Param("pageNm") String pageNm
  );
}
