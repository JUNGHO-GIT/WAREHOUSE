-- WAREHOUSE.viewProdAll source
CREATE
OR REPLACE ALGORITHM = UNDEFINED VIEW `WAREHOUSE`.`viewProdAll` AS
SELECT
  `WAREHOUSE`.`tblProduct`.`prodCd` AS `prodCd`,
  `WAREHOUSE`.`tblProduct`.`prodNm` AS `prodNm`,
  'prod' AS `bomType`
FROM
  `WAREHOUSE`.`tblProduct`
WHERE
  (`WAREHOUSE`.`tblProduct`.`flagYn` = 'Y')
UNION ALL
SELECT
  `WAREHOUSE`.`tblResource`.`resrcCd` AS `prodCd`,
  `WAREHOUSE`.`tblResource`.`resrcNm` AS `prodNm`,
  'resrc' AS `bomType`
FROM
  `WAREHOUSE`.`tblResource`
WHERE
  (`WAREHOUSE`.`tblResource`.`flagYn` = 'Y');