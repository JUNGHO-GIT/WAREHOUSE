package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Common;
import com.WAREHOUSE.container.CommonCd;
import java.util.ArrayList;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface CommonCdDAO {

  public ArrayList<CommonCd> listAllCommonCd();

  public List<CommonCd> mappingGroupCd();

  public ArrayList<CommonCd> listCommonCd(
    @Param("findGroupCd") String findGroupCd,
    @Param("findItemNm") String findItemNm
  );

  public CommonCd showCommonCd(
    @Param("groupCd") String groupCd,
    @Param("itemCd") String itemCd
  );

  public ArrayList<Common> listComCodeAll(
    @Param("groupCd") String groupCd,
    @Param("target") String target
  );

  public ArrayList<Common> listComCodeGroupAll(
    @Param("target") String target
  );

  public void saveCommonCd(
    CommonCd commonCd
  );
}
