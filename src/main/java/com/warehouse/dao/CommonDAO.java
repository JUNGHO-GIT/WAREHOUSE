package com.warehouse.dao;

import com.warehouse.container.Company;
import com.warehouse.container.House;
import com.warehouse.container.Product;
import com.warehouse.container.Resource;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface CommonDAO {

  public abstract ArrayList<Product> findBom(@Param ("findBom") String findBom);
  public abstract ArrayList<Company> findCompNm(@Param ("findCompNm") String findCompNm);
  public abstract ArrayList<Company> findCompCd(
    @Param ("findCompNm") String findCompNm,
    @Param ("findCompCd") String findCompCd
  );
  public abstract ArrayList<Product> findProdNm(@Param ("findProdNm") String findProdNm);
  public abstract ArrayList<Product> findProdCd(
    @Param ("findProdNm") String findProdNm,
    @Param ("findProdCd") String findProdCd
  );
  public abstract ArrayList<Resource> findResrcNm(@Param ("findResrcNm") String findResrcNm);
  public abstract ArrayList<Resource> findResrcCd(
    @Param ("findResrcNm") String findResrcNm,
    @Param ("findResrcCd") String findResrcCd
  );
  public abstract ArrayList<House> findHouseNm(@Param ("findHouseNm") String findHouseNm);
  public abstract ArrayList<House> findHouseCd(
    @Param ("findHouseNm") String findHouseNm,
    @Param ("findHouseCd") String findHouseCd
  );
}
