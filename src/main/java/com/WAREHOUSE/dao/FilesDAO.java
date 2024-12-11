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

  public ArrayList<Files> listFiles (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey
  );

  public List<Map<String, Object>> showFiles (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey
  );

  public void saveFiles (
    Files files
  );

  public void updateIssueDt (
    @Param("tableNm") String tableNm,
    @Param("tableKey") String tableKey,
    @Param("keyColumn") String keyColumn
  );

}
