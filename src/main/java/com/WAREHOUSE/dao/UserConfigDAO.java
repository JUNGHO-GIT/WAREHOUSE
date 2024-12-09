package com.WAREHOUSE.dao;

import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.UserConfig;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface UserConfigDAO {

	public UserConfig showUserConfigTab (
    @Param("userConfigID") String userConfigID,
    @Param("pageNm") String pageNm,
    @Param("gridCd") String gridCd
  );

  public UserConfig showUserConfigInfo (
    @Param("userConfigID") String userConfigID
  );

  public void saveUserConfigTab (
    HashMap<String, Object> userConfigTab
  );

  public void saveUserConfigInfo (
    HashMap<String, Object> userConfigInfo
  );

  public void updateUserConfigPw (
    @Param("userConfigID") String userConfigID,
    @Param("userConfigPw") String userConfigPw
  );

}
