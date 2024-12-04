package com.warehouse.dao;

import com.warehouse.container.Common;
import com.warehouse.container.CommonCd;
import java.util.ArrayList;
import java.util.List;
import org.apache.ibatis.annotations.Param;
public interface CommonCdDAO {

  public abstract ArrayList<CommonCd> listAllCommonCd();
  public abstract List<CommonCd> mappingGroupCd();
  public abstract ArrayList<CommonCd> listCommonCd(
    @Param ("findGroupCd") String findGroupCd,
    @Param ("findItemNm") String findItemNm
  );
  public abstract CommonCd showCommonCd(
    @Param ("groupCd") String groupCd,
    @Param ("itemCd") String itemCd
  );
  public abstract ArrayList<Common> listComCodeAll(
    @Param ("groupCd") String groupCd,
    @Param ("target") String target
  );
  public abstract ArrayList<Common> listComCodeGroupAll(@Param ("target") String target);
  public abstract void saveCommonCd(CommonCd commonCd);
}
