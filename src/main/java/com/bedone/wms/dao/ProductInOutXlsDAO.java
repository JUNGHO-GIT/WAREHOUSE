package com.bedone.wms.dao;

import com.bedone.wms.container.ProductInOut;

// 제품입출고(ProductInOutXls)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ProductInOutXlsDAO {

  public abstract void saveProductInOutXls (
    ProductInOut productInOut
  );

}