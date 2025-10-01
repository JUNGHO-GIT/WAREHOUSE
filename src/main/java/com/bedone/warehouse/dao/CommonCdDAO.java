package com.bedone.warehouse.dao;

import java.util.ArrayList;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Common;
import com.bedone.warehouse.container.CommonCd;

// 공통코드(CommonCd)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface CommonCdDAO {

	public abstract ArrayList<CommonCd> listAllCommonCd();

  public abstract List<CommonCd> mappingGroupCd();

	public abstract ArrayList<CommonCd> listCommonCd (
    @Param("findGroupCd") String findGroupCd,
    @Param("findItemNm") String findItemNm
  );

	public abstract CommonCd showCommonCd (
    @Param("groupCd") String groupCd,
    @Param("itemCd") String itemCd
  );

	public abstract ArrayList<Common> listComCodeAll (
    @Param("groupCd") String groupCd,
    @Param("target") String target
  );

	public abstract ArrayList<Common> listComCodeGroupAll (
    @Param("target") String target
  );

  public abstract void saveCommonCd (
    CommonCd commonCd
  );

}
