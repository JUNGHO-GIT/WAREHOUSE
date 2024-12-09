package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Company;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface CompanyDAO {

  public ArrayList<Company> listCompany(
    @Param("findCompNm") String findCompNm
  );

  public Company showCompany(
    @Param("compCd") Integer compCd
  );

  public void saveCompany(
    Company company
  );
}
