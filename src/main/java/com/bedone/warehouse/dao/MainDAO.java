package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;

// 메인(Main)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface MainDAO {

  public abstract ArrayList<HashMap<String, Object>> listMain (
  );

  public abstract ArrayList<HashMap<String, Object>> listSysMenu (
    @Param("pageNm") String pageNm
  );

}