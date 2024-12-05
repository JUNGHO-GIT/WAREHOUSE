package com.bedone.wms.dao;

import com.bedone.wms.container.Company;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface CompanyDAO {

  public abstract ArrayList<Company> listCompany(@Param ("findCompNm") String findCompNm);
  public abstract Company showCompany(@Param ("compCd") Integer compCd);
  public abstract void saveCompany(Company company);
}
