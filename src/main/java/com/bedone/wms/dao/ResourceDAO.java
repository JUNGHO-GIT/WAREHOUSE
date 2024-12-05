package com.bedone.wms.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.wms.container.Resource;

// 제품관리(Resource)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ResourceDAO {

	public abstract ArrayList<Resource> listResource (
    @Param("findResrcNm") String findResrcNm
  );

	public abstract Resource showResource (
    @Param("resrcCd") Integer resrcCd
  );

	public abstract void saveResource (
    Resource resource
  );

}
