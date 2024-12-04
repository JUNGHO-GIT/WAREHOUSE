package com.warehouse.dao;

import com.warehouse.container.ResourceInOut;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface ResourceInOutDAO {

  public abstract ArrayList<ResourceInOut> listResourceInOut(@Param ("resrcCd") String resrcCd);
  public abstract ResourceInOut showResourceInOut(@Param ("inOutSeq") Integer inOutSeq);
  public abstract void saveResourceInOut(ResourceInOut resourceInOut);
}
