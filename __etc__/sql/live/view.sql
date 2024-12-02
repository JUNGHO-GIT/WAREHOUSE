/**************************************************************************************************/DROP VIEW IF EXISTS `viewProdAll`;
SET @saved_cs_client          = @@character_set_client;
SET @saved_cs_results         = @@character_set_results;
SET @saved_col_connection     = @@collation_connection;
SET character_set_client      = utf8;
SET character_set_results     = utf8;
SET collation_connection      = utf8_general_ci;

CREATE ALGORITHM=UNDEFINED
SQL SECURITY DEFINER
VIEW `viewProdAll` AS
SELECT
  `tblProduct`.`prodCd` AS `prodCd`,
  `tblProduct`.`prodNm` AS `prodNm`,
  'prod' AS `bomType`
FROM `tblProduct`
WHERE (`tblProduct`.`flagYN` = 'Y')
UNION ALL
SELECT
  `tblResource`.`resrcCd` AS `prodCd`,
  `tblResource`.`resrcNm` AS `prodNm`,
  'resrc' AS `bomType`
FROM `tblResource`
WHERE (`tblResource`.`flagYN` = 'Y');