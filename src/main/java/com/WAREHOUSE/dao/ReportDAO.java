package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// -------------------------------------------------------------------------------------------------
@Mapper
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
