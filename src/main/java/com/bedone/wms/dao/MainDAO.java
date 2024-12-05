package com.bedone.wms.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
public interface MainDAO {

  public abstract ArrayList<HashMap<String, Object>> listMain();
  public abstract ArrayList<HashMap<String, Object>> listSysMenu(@Param ("pageNm") String pageNm);
}
