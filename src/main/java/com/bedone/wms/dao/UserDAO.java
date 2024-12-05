package com.bedone.wms.dao;

import com.bedone.wms.container.User;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
public interface UserDAO {

  public abstract ArrayList<User> listUser(@Param ("findUserNm") String findUserNm);
  public abstract ArrayList<HashMap<String, Object>> listUserPerm();
  public abstract User showUser(@Param ("userID") String userID);
  public abstract Integer checkUserID(@Param ("userID") String userID);
  public abstract void saveUser(HashMap<String, Object> map);
  public abstract void updatePw(@Param ("userID") String userID, @Param ("passwd") String passwd);
}
