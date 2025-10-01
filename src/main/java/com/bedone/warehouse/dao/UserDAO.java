package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.User;

// 회원정보(User)의 DAO 객체
// 생성일 : 2021-04-13 16:38:49 by JDFrame

public interface UserDAO {

  public abstract ArrayList<User> listUser (
    @Param("findUserNm") String findUserNm
  );

  public abstract ArrayList<HashMap<String, Object>> listUserPerm (
  );

	public abstract User showUser (
    @Param("userID") String userID
  );

  public abstract Integer checkUserID (
    @Param("userID") String userID
  );

	public abstract void saveUser (
    HashMap<String, Object> map
  );

	public abstract void updatePw (
    @Param("userID") String userID,
    @Param("passwd") String passwd
  );

}