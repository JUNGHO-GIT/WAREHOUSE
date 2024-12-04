package com.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;

// 보고서(Report)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface ReportDAO {

	public abstract ArrayList<HashMap<String, Object>> listReportProdIn (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );
  public abstract ArrayList<HashMap<String, Object>> listReportResrcIn (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );

	public abstract ArrayList<HashMap<String, Object>> listReportProdOut (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );
  public abstract ArrayList<HashMap<String, Object>> listReportResrcOut (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );

  public abstract ArrayList<HashMap<String, Object>> listReportProdStock (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );
  public abstract ArrayList<HashMap<String, Object>> listReportResrcStock (
    @Param("curYear") String curYear,
    @Param("curMonth") String curMonth,
    @Param("nextYear") String nextYear
  );

}