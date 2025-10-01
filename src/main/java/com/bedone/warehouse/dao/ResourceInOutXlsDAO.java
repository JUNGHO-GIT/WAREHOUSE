package com.bedone.warehouse.dao;

import com.bedone.warehouse.container.ResourceInOut;

// 자재입출고(ResourceInOutXls)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface ResourceInOutXlsDAO {

	public abstract void saveResourceInOutXls (
    ResourceInOut resourceInOut
  );

}