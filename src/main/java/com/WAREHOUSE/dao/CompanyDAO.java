package com.WAREHOUSE.dao;

import com.WAREHOUSE.container.Company;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

// -------------------------------------------------------------------------------------------------
@Mapper
public interface CompanyDAO {

  public abstract ArrayList<Company> listCompany(
    @Param("findCompNm") String findCompNm
  );

  public abstract Company showCompany(
    @Param("compCd") Integer compCd
  );

  public abstract void saveCompany(
    Company company
  );
}
