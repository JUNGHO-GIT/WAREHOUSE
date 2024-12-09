package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.User;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface UserDAO {

  public ArrayList<User> listUser(
    @Param("findUserNm") String findUserNm
  );

  public ArrayList<HashMap<String, Object>> listUserPerm(
  );

  public User showUser(
    @Param("userID") String userID
  );

  public Integer checkUserID(
    @Param("userID") String userID
  );

  public void saveUser(
    HashMap<String, Object> map
  );

  public void updatePw(
    @Param("userID") String userID,
    @Param("passwd") String passwd
  );
}
