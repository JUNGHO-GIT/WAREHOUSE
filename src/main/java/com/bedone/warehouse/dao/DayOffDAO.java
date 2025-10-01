package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.DayOff;

// 휴가(DayOff)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface DayOffDAO {

  public abstract ArrayList<DayOff> listDayOff (
    @Param("findUserNm") String findUserNm
  );

  public abstract DayOff showDayOff (
    @Param("offSeq") Integer offSeq
  );

  public abstract void saveDayOff (
    DayOff dayOff
  );

	public abstract ArrayList<DayOff> getUser ();

	public abstract void saveDayOff (
    Map<String, Object> map
  );

	public abstract ArrayList<DayOff> getList (
    String findUserNm
  );

	public abstract void saveDayOff (
    String userID
  );

}