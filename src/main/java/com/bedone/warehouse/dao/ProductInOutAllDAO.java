package com.bedone.warehouse.dao;

import com.bedone.warehouse.container.ProductInOut;

// 제품입출고(productInOutAll)의 DAO 객체
// 생성일 : 2021-04-21 14:15:24 by JDFrame

public interface ProductInOutAllDAO {

	public abstract void saveProductInOut (
    ProductInOut productInOut
  );

}