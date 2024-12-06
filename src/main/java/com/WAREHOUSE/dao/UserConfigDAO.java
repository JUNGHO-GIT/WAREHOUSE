package com.WAREHOUSE.dao;

import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.WAREHOUSE.container.UserConfig;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface UserConfigDAO {

	public abstract UserConfig showUserConfigTab (
    @Param("userConfigID") String userConfigID,
    @Param("pageNm") String pageNm,
    @Param("gridCd") String gridCd
  );

  public abstract UserConfig showUserConfigInfo (
    @Param("userConfigID") String userConfigID
  );

  public abstract void saveUserConfigTab (
    HashMap<String, Object> userConfigTab
  );

  public abstract void saveUserConfigInfo (
    HashMap<String, Object> userConfigInfo
  );

  public abstract void updateUserConfigPw (
    @Param("userConfigID") String userConfigID,
    @Param("userConfigPw") String userConfigPw
  );

}
