package com.warehouse.dao;

import com.warehouse.container.DayOff;
import java.util.ArrayList;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
public interface DayOffDAO {

  public abstract ArrayList<DayOff> listDayOff(@Param ("findUserNm") String findUserNm);
  public abstract DayOff showDayOff(@Param ("offSeq") Integer offSeq);
  public abstract void saveDayOff(DayOff dayOff);
  public abstract ArrayList<DayOff> getUser();
  public abstract void saveDayOff(Map<String, Object> map);
  public abstract ArrayList<DayOff> getList(String findUserNm);
  public abstract void saveDayOff(String userID);
}
