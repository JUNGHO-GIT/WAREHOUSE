package com.bedone.warehouse.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.bedone.warehouse.container.Company;

// 거래처(lCompany)의 DAO 객체
// 생성일 : 2021-04-12 10:5:56 by JDFrame

public interface CompanyDAO {

	public abstract ArrayList<Company> listCompany (
    @Param("findCompNm") String findCompNm
  );

	public abstract Company showCompany (
    @Param("compCd") Integer compCd
  );

	public abstract void saveCompany (
    Company company
  );

}
