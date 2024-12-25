package com.WAREHOUSE.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// -------------------------------------------------------------------------------------------------
@Component
public class Utils {

  @Value("${storage-empty}")
  private String STORAGE_EMPTY;

  // -----------------------------------------------------------------------------------------------
  public Map<String, String> listString2Map(
    List<Map<String, String>> list,
    String key,
    String val
  ) throws Exception {

    Map<String, String> rsList = new HashMap<String, String>();
    for (Integer p = 0; p < list.size(); p++) {
      Map<String, String> row = (Map<String, String>) list.get(p);
      String keys = String.valueOf(row.get(key));
      String vals = String.valueOf(row.get(val));
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public Map<String, Object> listObject2Map(
    List<Map<String, Object>> list,
    String key,
    String val
  ) throws Exception {

    Map<String, Object> rsList = new HashMap<String, Object>();
    for (Integer p = 0; p < list.size(); p++) {
      Map<String, Object> row = (Map<String, Object>) list.get(p);
      String keys = String.valueOf(row.get(key));
      Object vals = row.get(val);
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public String curTm() {

    DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    String curTm = dateFormat.format(new java.util.Date());

    return curTm;
  }

  // -----------------------------------------------------------------------------------------------
  public String curDt() {

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String curDt = dateFormat.format(new java.util.Date());

    return curDt;
  }
}
