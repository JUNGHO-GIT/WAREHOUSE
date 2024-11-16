package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Company;
import com.bedone.warehouse.container.House;
import com.bedone.warehouse.container.Product;
import com.bedone.warehouse.container.Resource;

// 공통(Common)의 DAO 객체
// 생성일 : 2021-05-01 19:14:54 by JDFrame

public interface CommonDAO {

  public abstract ArrayList<Product> findBom (
    @Param("findBom")String findBom
  );

	public abstract ArrayList<Company> findCompNm (
    @Param("findCompNm")String findCompNm
  );
	public abstract ArrayList<Company> findCompCd (
    @Param("findCompNm") String findCompNm,
    @Param("findCompCd") String findCompCd
  );

	public abstract ArrayList<Product> findProdNm (
    @Param("findProdNm")String findProdNm
  );
	public abstract ArrayList<Product> findProdCd (
    @Param("findProdNm") String findProdNm,
    @Param("findProdCd") String findProdCd
  );

	public abstract ArrayList<Resource> findResrcNm (
    @Param("findResrcNm")String findResrcNm
  );
	public abstract ArrayList<Resource> findResrcCd (
    @Param("findResrcNm") String findResrcNm,
    @Param("findResrcCd") String findResrcCd
  );

	public abstract ArrayList<House> findHouseNm (
    @Param("findHouseNm")String findHouseNm
  );
	public abstract ArrayList<House> findHouseCd (
    @Param("findHouseNm") String findHouseNm,
    @Param("findHouseCd") String findHouseCd
  );

}
