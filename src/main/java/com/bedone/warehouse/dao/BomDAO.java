package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Bom;
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.container.Resource;

// Bom관리(Bom)의 DAO 객체
// 생성일 : 2021-05-19 19:32:39 by JDFrame

public interface BomDAO {

	public abstract ArrayList<Product> listBom (
    @Param("findProdNm") String findProdNm
  );

	public abstract ArrayList<Resource> showBom (
    @Param("prodCd") Integer prodCd,
    @Param("bomType") String bomType
  );

	public abstract void saveBom (
    Bom bom
  );

}
