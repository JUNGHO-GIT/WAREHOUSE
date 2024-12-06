package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;

public interface DashDAO {

  // 0. 공통 ---------------------------------------------------------------------------------------
  public abstract ArrayList<HashMap<String, Object>> getInOutData (
    @Param("paramMap") HashMap<String, Object> paramMap,
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );
  public abstract ArrayList<HashMap<String, Object>> getShipData (
    @Param("paramMap") HashMap<String, Object> paramMap,
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );

  // -----------------------------------------------------------------------------------------------
  // 1-1. 금일 입고 예정 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdInPlanToday (
    @Param("inOutDt") String inOutDt
  );
  // 1-2. 금일 출고 예정 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdOutPlanToday (
    @Param("inOutDt") String inOutDt
  );
  // 1-3. 금일 출하 예정 (제품)
  public abstract ArrayList<HashMap<String, Object>> getShipPlanToday (
    @Param("shipDt") String shipDt
  );

  // -----------------------------------------------------------------------------------------------
  // 2-1. 금일 입고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdInToday (
    @Param("inOutDt") String inOutDt
  );
  // 2-2. 금일 출고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdOutToday (
    @Param("inOutDt") String inOutDt
  );
  // 2-3. 금일 출하 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getShipToday (
    @Param("shipDt") String shipDt
  );

  // -----------------------------------------------------------------------------------------------
  // 3-1. 금주 입고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdInWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );
  // 3-2. 금주 출고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdOutWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );
  // 3-3. 금주 출하 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getShipWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );

  // -----------------------------------------------------------------------------------------------
  // 4-1. 안전 재고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdProtected (
    @Param("todayDt") String todayDt
  );

  // -----------------------------------------------------------------------------------------------
  // 5-1. 주간 입고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdInChartWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );
  // 5-2. 주간 출고 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getProdOutChartWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );
  // 5-3. 주간 출하 현황 (제품)
  public abstract ArrayList<HashMap<String, Object>> getShipChartWeek (
    @Param("startDt") String startDt,
    @Param("endDt") String endDt
  );

}
