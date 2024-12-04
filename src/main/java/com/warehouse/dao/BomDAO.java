package com.warehouse.dao;

import com.warehouse.container.Bom;
import com.warehouse.container.Product;
import com.warehouse.container.Resource;
import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
public interface BomDAO {

  public abstract ArrayList<Product> listBom(@Param ("findProdNm") String findProdNm);
  public abstract ArrayList<Resource> showBom(
    @Param ("prodCd") Integer prodCd,
    @Param ("bomType") String bomType
  );
  public abstract void saveBom(Bom bom);
}
