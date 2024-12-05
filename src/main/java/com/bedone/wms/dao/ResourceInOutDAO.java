package com.bedone.wms.dao;

import com.bedone.wms.container.ResourceInOut;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface ResourceInOutDAO {

  public abstract ArrayList<ResourceInOut> listResourceInOut(@Param ("resrcCd") String resrcCd);
  public abstract ResourceInOut showResourceInOut(@Param ("inOutSeq") Integer inOutSeq);
  public abstract void saveResourceInOut(ResourceInOut resourceInOut);
}
