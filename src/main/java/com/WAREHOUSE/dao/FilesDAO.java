package com.WAREHOUSE.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.Files;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface FilesDAO {

  public abstract ArrayList<Files> listFiles (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey
  );

  public abstract List<Map<String, Object>> showFiles (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey
  );

  public abstract void saveFiles (
    Files files
  );

  public abstract void updateIssueDate (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey,
    @Param("keyColumn") String keyColumn
  );

}
