/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Bom`(
	IN `@prodCd` INT(10),
	IN `@resrcCd` INT(10),
	IN `@bomType` VARCHAR(5),
  IN `@qty` INT(10),
	IN `@unitQty` DECIMAL(5,2),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
	DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblBom
  WHERE prodCd=`@prodCd` AND resrcCd=`@resrcCd` AND bomType=`@bomType`;

	IF `@isCd`=0 THEN
    INSERT INTO tblBom (
      prodCd,
      resrcCd,
      bomType,
      qty,
      unitQty,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@prodCd`,
      `@resrcCd`,
      `@bomType`,
      `@qty`,
      `@unitQty`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
	ELSE
    UPDATE
      tblBom
    SET
      bomType=`@bomType`,
      qty=`@qty`,
      unitQty=`@unitQty`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      prodCd=`@prodCd` AND resrcCd=`@resrcCd` AND bomType=`@bomType`;
	END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Category`(
	IN `@catSeq` INT(10),
	IN `@catNm` VARCHAR(100),
	IN `@parentsCatSeq` INT(10),
	IN `@catOrder` INT(10),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
	DECLARE `@isCd` INTEGER DEFAULT 0;
	DECLARE `@step` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblCategory
  WHERE catSeq=`@catSeq`;

	SELECT (step + 1) INTO `@step`
  FROM tblCategory
  WHERE catSeq=`@parentsCatSeq`;

	IF `@parentsCatSeq`=0 THEN
    SET `@step`=0;
	END IF;

	IF `@isCd`=0 THEN
    INSERT INTO tblCategory (
      catNm,
      parentsCatSeq,
      catOrder,
      step,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@catNm`,
      `@parentsCatSeq`,
      `@catOrder`,
      `@step`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
	ELSE
    UPDATE
      tblCategory
    SET
      catNm=`@catNm`,
      step=`@step`,
      parentsCatSeq=`@parentsCatSeq`,
      catOrder=`@catOrder`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      catSeq=`@catSeq`;
	END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_CommonCd`(
	IN `@groupCd` VARCHAR(4),
	IN `@itemCd` VARCHAR(5),
	IN `@groupNm` VARCHAR(50),
	IN `@itemNm` VARCHAR(50),
	IN `@itemMemo` VARCHAR(400),
	IN `@itemSeq` INT(10),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblCommonCd
  WHERE groupCd=`@groupCd` AND itemCd=`@itemCd`;

	IF `@groupNm`='' THEN
    SELECT groupNm INTO `@groupNm`
    FROM tblCommonCd
    WHERE groupCd=`@groupCd` LIMIT 1;
	END IF;

	IF `@isCd`=0 THEN
    INSERT INTO tblCommonCd (
      groupCd,
      itemCd,
      groupNm,
      itemNm,
      itemMemo,
      itemSeq,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@groupCd`,
      `@itemCd`,
      `@groupNm`,
      `@itemNm`,
      `@itemMemo`,
      `@itemSeq`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
	ELSE
    UPDATE
      tblCommonCd
    SET
      groupNm=`@groupNm`,
      itemNm=`@itemNm`,
      itemMemo=`@itemMemo`,
      itemSeq=`@itemSeq`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      groupCd=`@groupCd` AND itemCd=`@itemCd`;
	END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Company`(
	IN `@compCd` INT(10),
	IN `@compNm` VARCHAR(100),
	IN `@compNo` VARCHAR(20),
	IN `@compType` VARCHAR(1000),
	IN `@compPart` VARCHAR(1000),
	IN `@compOwner` VARCHAR(20),
	IN `@compMajor` VARCHAR(20),
	IN `@compAddr` VARCHAR(100),
	IN `@compPhone` VARCHAR(20),
	IN `@compEmail` VARCHAR(100),
	IN `@remarks` VARCHAR(4000),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblCompany
  WHERE compCd=`@compCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblCompany (
      compNm,
      compNo,
      compType,
      compPart,
      compOwner,
      compMajor,
      compAddr,
      compEmail,
      compPhone,
      remarks,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@compNm`,
      `@compNo`,
      `@compType`,
      `@compPart`,
      `@compOwner`,
      `@compMajor`,
      `@compAddr`,
      `@compEmail`,
      `@compPhone`,
      `@remarks`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
	ELSE
    UPDATE
      tblCompany
    SET
      compNm=`@compNm`,
      compNo=`@compNo`,
      compType=`@compType`,
      compPart=`@compPart`,
      compOwner=`@compOwner`,
      compMajor=`@compMajor`,
      compAddr=`@compAddr`,
      compEmail=`@compEmail`,
      compPhone=`@compPhone`,
      remarks=`@remarks`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      compCd=`@compCd`;
	END IF;

  IF `@compCd`=0 THEN
    SET `@compCd`=LAST_INSERT_ID();
    -- 신규등록시 파일 저장
    UPDATE tblFiles
    SET tableKey=`@compCd`
    WHERE tableNm='tblCompany' AND tableKey=0;
  END IF;

END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Files`(
	IN `@fileSeq` INT(20),
	IN `@tableNm` VARCHAR(20),
	IN `@tableKey` VARCHAR(50),
	IN `@fileUrl` VARCHAR(1000),
	IN `@fileNm` VARCHAR(50),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

  SELECT COUNT(*) INTO `@isCd`
  FROM tblFiles
  WHERE fileSeq=`@fileSeq`;

  IF `@isCd`=0 THEN
    INSERT INTO tblFiles (
      tableNm,
      tableKey,
      fileUrl,
      fileNm,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@tableNm`,
      `@tableKey`,
      `@fileUrl`,
      `@fileNm`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblFiles
    SET
      tableNm=`@tableNm`,
      tableKey=`@tableKey`,
      fileUrl=`@fileUrl`,
      fileNm=`@fileNm`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      fileSeq=`@fileSeq`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_House`(
	IN `@houseCd` INT(10),
	IN `@houseNm` VARCHAR(100),
	IN `@houseParentCd` INT(10),
	IN `@houseOrder` INT(10),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;
  DECLARE `@houseStep` INTEGER DEFAULT 0;

  SELECT COUNT(*) INTO `@isCd`
  FROM tblHouse
  WHERE houseCd=`@houseCd`;

  SELECT (houseStep + 1) INTO `@houseStep`
  FROM tblHouse
  WHERE houseCd=`@houseParentCd`;

  IF `@houseParentCd`=0 THEN
	  SET `@houseStep`=0;
  END IF;

	IF `@isCd`=0 THEN
    INSERT INTO tblHouse (
      houseNm,
      houseParentCd,
      houseOrder,
      houseStep,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@houseNm`,
      `@houseParentCd`,
      `@houseOrder`,
      `@houseStep`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblHouse
    SET
      houseNm=`@houseNm`,
      houseParentCd=`@houseParentCd`,
      houseOrder=`@houseOrder`,
      houseStep=`@houseStep`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      houseCd=`@houseCd`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Product`(
	IN `@prodCd` INT(10),
	IN `@prodNm` VARCHAR(300),
	IN `@prodType` VARCHAR(5),
	IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
	IN `@option1` VARCHAR(50),
	IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@remarks` VARCHAR(3000),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';

	SELECT COUNT(*) INTO `@isCd`
  FROM tblProduct
  WHERE prodCd=`@prodCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblProduct (
      prodNm,
      prodType,
      houseCd,
      compCd,
      protectedQty,
      quality,
      unit,
      option1,
      option2,
      maker,
      unitPrice,
      remarks,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@prodNm`,
      `@prodType`,
      `@houseCd`,
      `@compCd`,
      `@protectedQty`,
      `@quality`,
      `@unit`,
      `@option1`,
      `@option2`,
      `@maker`,
      `@unitPrice`,
      `@remarks`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblProduct
    SET
      prodNm=`@prodNm`,
      prodType=`@prodType`,
      houseCd=`@houseCd`,
      compCd=`@compCd`,
      protectedQty=`@protectedQty`,
      quality=`@quality`,
      unit=`@unit`,
      option1=`@option1`,
      option2=`@option2`,
      maker=`@maker`,
      unitPrice=`@unitPrice`,
      remarks=`@remarks`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      prodCd=`@prodCd`;
  END IF;

	IF `@prodCd`=0 THEN
    SET `@prodCd`=LAST_INSERT_ID();
    -- 신규등록시 파일 저장
    UPDATE tblFiles
    SET  tableKey=`@prodCd`
    WHERE tableNm='tblProduct' AND tableKey=0;
  END IF;

	SET `@barcode`=LPAD(`@prodCd`, 6, '0');
	SET `@barcode`=CONCAT('W', `@barcode`, '0');

	UPDATE tblProduct
  SET barcode=`@barcode`
  WHERE prodCd=`@prodCd` AND barcode='';

END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ProductInOut`(
	IN `@inOutSeq` INT(10),
	IN `@inOutDt` VARCHAR(10),
	IN `@prodCd` INT(10),
	IN `@houseCd` INT(10),
	IN `@compCd` INT(10),
	IN `@qty` INT(10),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remarks` VARCHAR(1000),
	IN `@flagYn` VARCHAR(1),
  IN `@planYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblProductInOut
  WHERE inOutSeq=`@inOutSeq`;

	IF `@isCd`=0 THEN
    INSERT INTO tblProductInOut (
      inOutDt,
      prodCd,
      houseCd,
      compCd,
      qty,
      unitPrice,
      remarks,
      flagYn,
      planYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@inOutDt`,
      `@prodCd`,
      `@houseCd`,
      `@compCd`,
      `@qty`,
      `@unitPrice`,
      `@remarks`,
      `@flagYn`,
      `@planYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblProductInOut
    SET
      inOutDt=`@inOutDt`,
      prodCd=`@prodCd`,
      qty=`@qty`,
      houseCd=`@houseCd`,
      unitPrice=`@unitPrice`,
      remarks=`@remarks`,
      compCd=`@compCd`,
      flagYn=`@flagYn`,
      planYn=`@planYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      inOutSeq=`@inOutSeq`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ProductXls`(
  IN `@prodCd` INT(10),
  IN `@prodNm` VARCHAR(300),
  IN `@prodType` VARCHAR(5),
  IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
  IN `@protectedQty` SMALLINT(10),
  IN `@quality` VARCHAR(50),
  IN `@unit` VARCHAR(5),
  IN `@option1` VARCHAR(50),
  IN `@option2` VARCHAR(50),
  IN `@maker` VARCHAR(50),
  IN `@unitPrice` NUMERIC(18,0),
	IN `@remarks` VARCHAR(3000),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';

	INSERT INTO tblProduct (
    prodCd,
    prodNm,
    prodType,
    houseCd,
    compCd,
    protectedQty,
    quality,
    unit,
    option1,
    option2,
    maker,
    unitPrice,
    remarks,
    flagYn,
    regDt,
    issueDt,
    issueId
  )
  	VALUES (
    `@prodCd`,
    `@prodNm`,
    `@prodType`,
    `@houseCd`,
    `@compCd`,
    `@protectedQty`,
    `@quality`,
    `@unit`,
    `@option1`,
    `@option2`,
    `@maker`,
    `@unitPrice`,
    `@remarks`,
    `@flagYn`,
    NOW(),
    NOW(),
    `@issueId`
  );

	SET `@prodCd`=LAST_INSERT_ID();
	SET `@barcode`=LPAD(`@prodCd`, 6, '0');
	SET `@barcode`=CONCAT('W', `@barcode`, '0');

	UPDATE tblProduct
  SET barcode=`@barcode`
  WHERE prodCd=`@prodCd` AND barcode='';

END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ProductInOutXls`(
	IN `@inOutDt` VARCHAR(10),
  IN `@prodCd` INT(10),
  IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
  IN `@qty` INT(10),
  IN `@unitPrice` NUMERIC(15,0),
  IN `@remarks` VARCHAR(1000),
  IN `@flagYn` VARCHAR(1),
  IN `@planYn` VARCHAR(1),
  IN `@issueId` VARCHAR(20)
)
BEGIN
	INSERT INTO tblProductInOut (
		inOutDt,
    prodCd,
    houseCd,
    compCd,
    qty,
    unitPrice,
    remarks,
    flagYn,
    planYn,
    regDt,
    issueDt,
    issueId
  )
	VALUES (
		`@inOutDt`,
    `@prodCd`,
    `@houseCd`,
    `@compCd`,
    `@qty`,
    `@unitPrice`,
    `@remarks`,
    `@flagYn`,
    `@planYn`,
    NOW(),
    NOW(),
    `@issueId`
  );
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Resource`(
	IN `@resrcCd` INT(10),
	IN `@resrcNm` VARCHAR(300),
	IN `@resrcType` VARCHAR(5),
	IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
	IN `@option1` VARCHAR(50),
  IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@remarks` VARCHAR(3000),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';

	SELECT COUNT(*) INTO `@isCd`
  FROM tblResource
  WHERE resrcCd=`@resrcCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblResource (
      resrcNm,
      resrcType,
      houseCd,
      compCd,
      protectedQty,
      quality,
      unit,
      option1,
      option2,
      maker,
      unitPrice,
      remarks,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@resrcNm`,
      `@resrcType`,
      `@houseCd`,
      `@compCd`,
      `@protectedQty`,
      `@quality`,
      `@unit`,
      `@option1`,
      `@option2`,
      `@maker`,
      `@unitPrice`,
      `@remarks`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblResource
    SET
      resrcNm=`@resrcNm`,
      resrcType=`@resrcType`,
      houseCd=`@houseCd`,
      compCd=`@compCd`,
      protectedQty=`@protectedQty`,
      quality=`@quality`,
      unit=`@unit`,
      option1=`@option1`,
      option2=`@option2`,
      maker=`@maker`,
      unitPrice=`@unitPrice`,
      remarks=`@remarks`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      resrcCd=`@resrcCd`;
  END IF;

	IF `@resrcCd`=0 THEN
		SET `@resrcCd`=LAST_INSERT_ID();
    -- 신규등록시 파일 저장
    UPDATE tblFiles
    SET tableKey=`@resrcCd`
    WHERE tableNm='tblResource' AND tableKey=0;
	END IF;

	SET `@barcode`=LPAD(`@resrcCd`, 6, '0');
	SET `@barcode`=CONCAT('S', `@barcode`, '0');

	UPDATE tblResource
  SET barcode=`@barcode`
  WHERE resrcCd=`@resrcCd` AND barcode='';

END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ResourceInOut`(
	IN `@inOutSeq` INT(10),
	IN `@inOutDt` VARCHAR(10),
	IN `@resrcCd` INT(10),
	IN `@houseCd` INT(10),
	IN `@compCd` INT(10),
	IN `@qty` INT(10),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remarks` VARCHAR(1000),
	IN `@flagYn` VARCHAR(1),
  IN `@planYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblResourceInOut
  WHERE inOutSeq=`@inOutSeq`;

	IF `@isCd`=0 THEN
    INSERT INTO tblResourceInOut (
      inOutDt,
      resrcCd,
      houseCd,
      compCd,
      qty,
      unitPrice,
      remarks,
      flagYn,
      planYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@inOutDt`,
      `@resrcCd`,
      `@houseCd`,
      `@compCd`,
      `@qty`,
      `@unitPrice`,
      `@remarks`,
      `@flagYn`,
      `@planYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblResourceInOut
    SET
      inOutDt=`@inOutDt`,
      resrcCd=`@resrcCd`,
      houseCd=`@houseCd`,
      compCd=`@compCd`,
      qty=`@qty`,
      unitPrice=`@unitPrice`,
      remarks=`@remarks`,
      flagYn=`@flagYn`,
      planYn=`@planYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      inOutSeq=`@inOutSeq`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ResourceInOutXls`(
	IN `@inOutDt` VARCHAR(10),
  IN `@resrcCd` INT(10),
  IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
  IN `@qty` INT(10),
  IN `@unitPrice` NUMERIC(15,0),
  IN `@remarks` VARCHAR(1000),
  IN `@flagYn` VARCHAR(1),
  IN `@planYn` VARCHAR(1),
  IN `@issueId` VARCHAR(20)
)
BEGIN
	INSERT INTO tblResourceInOut (
		inOutDt,
    resrcCd,
    houseCd,
    compCd,
    qty,
    unitPrice,
    remarks,
    flagYn,
    planYn,
    regDt,
    issueDt,
    issueId
  )
	VALUES (
		`@inOutDt`,
    `@resrcCd`,
    `@houseCd`,
    `@compCd`,
    `@qty`,
    `@unitPrice`,
    `@remarks`,
    `@flagYn`,
    `@planYn`,
    NOW(),
    NOW(),
    `@issueId`
  );
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ResourceXls`(
  IN `@resrcCd` INT(10),
  IN `@resrcNm` VARCHAR(300),
  IN `@resrcType` VARCHAR(5),
  IN `@houseCd` INT(10),
  IN `@compCd` INT(10),
  IN `@protectedQty` SMALLINT(10),
  IN `@quality` VARCHAR(50),
  IN `@unit` VARCHAR(5),
  IN `@option1` VARCHAR(50),
  IN `@option2` VARCHAR(50),
  IN `@maker` VARCHAR(50),
  IN `@unitPrice` NUMERIC(18,0),
  IN `@remarks` VARCHAR(3000),
  IN `@flagYn` VARCHAR(1),
  IN `@issueId` VARCHAR(20)
)
BEGIN
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';

	INSERT INTO tblResource (
    resrcCd,
		resrcNm,
    resrcType,
    houseCd,
    compCd,
    protectedQty,
    quality,
    unit,
    option1,
    option2,
    maker,
    unitPrice,
    remarks,
    flagYn,
    regDt,
    issueDt,
    issueId
  )
  	VALUES (
    `@resrcCd`,
    `@resrcNm`,
    `@resrcType`,
    `@houseCd`,
    `@compCd`,
    `@protectedQty`,
    `@quality`,
    `@unit`,
    `@option1`,
    `@option2`,
    `@maker`,
    `@unitPrice`,
    `@remarks`,
    `@flagYn`,
    NOW(),
    NOW(),
    `@issueId`
  );

	SET `@resrcCd`=LAST_INSERT_ID();
	SET `@barcode`=LPAD(`@resrcCd`, 6, '0');
	SET `@barcode`=CONCAT('S', `@barcode`, '0');

	UPDATE tblResource
  SET barcode=`@barcode`
  WHERE resrcCd=`@resrcCd` AND barcode='';

END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Shipping`(
	IN `@shipCd` INT(10),
	IN `@shipDt` VARCHAR(10),
	IN `@shipMajor` VARCHAR(50),
	IN `@toMajor` VARCHAR(50),
	IN `@toPhone` VARCHAR(20),
	IN `@compCd` INT(10),
	IN `@inOutSeqs` VARCHAR(4000),
	IN `@flagYn` VARCHAR(1),
  IN `@planYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblShipping
  WHERE shipCd = `@shipCd`;

	IF `@isCd` = 0 THEN
    INSERT INTO tblShipping (
      shipDt,
      shipMajor,
      toMajor,
      toPhone,
      compCd,
      flagYn,
      planYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@shipDt`,
      `@shipMajor`,
      `@toMajor`,
      `@toPhone`,
      `@compCd`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblShipping
    SET
      shipDt=`@shipDt`,
      shipMajor=`@shipMajor`,
      toMajor=`@toMajor`,
      toPhone=`@toPhone`,
      compCd=`@compCd`,
      flagYn=`@flagYn`,
      planYn=`@planYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      shipCd = `@shipCd`;
  END IF;

	IF `@shipCd` = 0 THEN
    SET `@shipCd` = LAST_INSERT_ID();
  END IF;

	IF `@inOutSeqs` != '' THEN
    IF `@planYn` = 'Y' THEN
      CALL sp_ShipPlan (`@shipCd`, `@inOutSeqs`, `@issueId`);
    ELSE
      CALL sp_ShipItems (`@shipCd`, `@inOutSeqs`, `@issueId`);
    END IF;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ShipItems`(
	IN `@shipCd` INT(10),
	IN `@inOutSeqs` VARCHAR(4000),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@pos` INT(10) DEFAULT 1;
	DECLARE `@inOutSeq` VARCHAR(10) DEFAULT '';
	DECLARE `@seq` INT(10) DEFAULT 0;
	DECLARE `@flagYn` VARCHAR(1) DEFAULT 'Y';
	DECLARE `@now` DATETIME;
	DECLARE `@seqs` VARCHAR(4000) DEFAULT '';

	SET `@now`=NOW();

	UPDATE tblShipItems
  SET flagYn = 'N'
  WHERE shipCd = `@shipCd`;

	WHILE `@pos`!=0 DO
    SET `@inOutSeq`=SUBSTRING_INDEX(SUBSTRING_INDEX(`@inOutSeqs`, ',', `@pos`), ',' , -1);
    IF `@seqs`!=`@inOutSeqs` THEN
      SET `@seq` = CAST(`@inOutSeq` AS UNSIGNED);
      INSERT INTO tblShipItems (
        shipCd,
        inOutSeq,
        flagYn,
        regDt,
        issueDt,
        issueId
      )
      VALUES (
        `@shipCd`,
        `@seq`,
        `@flagYn`,
        `@now`,
        `@now`,
        `@issueId`
      )
      ON DUPLICATE KEY UPDATE
        flagYn=VALUES (`flagYn`),
        issueDt=VALUES (`regDt`),
        issueId=VALUES (`issueId`)
      ;

      SET `@pos`=`@pos` + 1;

      IF `@seqs`!='' THEN
        SET `@seqs`=CONCAT(`@seqs`, ',');
      END IF;

      SET `@seqs`=CONCAT(`@seqs`, `@inOutSeq`);

      ELSE
        SET `@pos`=0;
    END IF;
	END WHILE;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ShipPlan`(
	IN `@shipCd` INT(10),
	IN `@inOutSeqs` VARCHAR(4000),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@pos` INT(10) DEFAULT 1;
	DECLARE `@inOutSeq` VARCHAR(10) DEFAULT '';
	DECLARE `@seq` INT(10) DEFAULT 0;
	DECLARE `@flagYn` VARCHAR(1) DEFAULT 'Y';
	DECLARE `@now` DATETIME;
	DECLARE `@seqs` VARCHAR(4000) DEFAULT '';

	SET `@now`=NOW();

  UPDATE tblShipPlan
  SET flagYn = 'N'
  WHERE shipCd = `@shipCd`;

  WHILE `@pos`!=0 DO
    SET `@inOutSeq`=SUBSTRING_INDEX(SUBSTRING_INDEX(`@inOutSeqs`, ',', `@pos`), ',' , -1);
    IF `@seqs`!=`@inOutSeqs` THEN
      SET `@seq` = CAST(`@inOutSeq` AS UNSIGNED);
      INSERT INTO tblShipPlan (
        shipCd,
        inOutSeq,
        flagYn,
        regDt,
        issueDt,
        issueId
      )
      VALUES (
        `@shipCd`,
        `@seq`,
        `@flagYn`,
        `@now`,
        `@now`,
        `@issueId`
      )
      ON DUPLICATE KEY UPDATE
        flagYn=VALUES (`flagYn`),
        issueDt=VALUES (`regDt`),
        issueId=VALUES (`issueId`)
      ;

      SET `@pos`=`@pos` + 1;

      IF `@seqs`!='' THEN
        SET `@seqs`=CONCAT(`@seqs`, ',');
      END IF;

      SET `@seqs`=CONCAT(`@seqs`, `@inOutSeq`);

      ELSE
        SET `@pos`=0;
    END IF;
  END WHILE;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_User`(
	IN `@userId` VARCHAR(20),
	IN `@userPw` VARCHAR(1000),
	IN `@userNm` VARCHAR(20),
	IN `@userPhone` VARCHAR(100),
	IN `@userEmail` VARCHAR(100),
	IN `@userLevel` VARCHAR(5),
	IN `@userPerm` VARCHAR(1000),
	IN `@compCd` INT(10),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	IF `@userLevel`='' THEN
    SELECT `00100` INTo `@userLevel`;
  END IF;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblUser
  WHERE userId=`@userId`;

	IF `@isCd`=0 THEN
    INSERT INTO tblUser (
      userId,
      userPw,
      userNm,
      userPhone,
      userEmail,
      userLevel,
      userPerm,
      compCd,
      flagYn,
      regDt,
      issueDt,
      issueId
    )
    VALUES (
      `@userId`,
      `@userPw`,
      `@userNm`,
      `@userPhone`,
      `@userEmail`,
      `@userLevel`,
      `@userPerm`,
      `@compCd`,
      `@flagYn`,
      NOW(),
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblUser
    SET
      userPw=`@userPw`,
      userNm=`@userNm`,
      userPhone=`@userPhone`,
      userEmail=`@userEmail`,
      userLevel=`@userLevel`,
      userPerm=`@userPerm`,
      compCd=`@compCd`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      userId=`@userId`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_UserConfig`(
	IN `@configSeq` INT(10),
	IN `@userId` VARCHAR(20),
	IN `@pageNm` VARCHAR(50),
	IN `@gridCd` VARCHAR(10),
	IN `@config` VARCHAR(8000),
	IN `@flagYn` VARCHAR(1),
	IN `@issueId` VARCHAR(20)
)
BEGIN
	DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblUserConfig
  WHERE userId=`@userId` AND pageNm=`@pageNm` AND gridCd=`@gridCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblUserConfig (
      userId,
      pageNm,
      gridCd,
      config,
      flagYn,
      regDt,
      issueId
    )
    VALUES (
      `@userId`,
      `@pageNm`,
      `@gridCd`,
      `@config`,
      `@flagYn`,
      NOW(),
      `@issueId`
    );
  ELSE
    UPDATE
      tblUserConfig
    SET
      config=`@config`,
      flagYn=`@flagYn`,
      issueDt=NOW(),
      issueId=`@issueId`
    WHERE
      userId=`@userId`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_SplitToRow`(
  IN `tempChar` LONGTEXT,
  IN `splitChar` CHAR(1)
)
BEGIN
  DECLARE splitInteger INTEGER DEFAULT 1;
  DECLARE tempResult CHAR(255) DEFAULT '';

  CREATE TEMPORARY TABLE IF NOT EXISTS temp_table (
    splitStr CHAR(255)
  );

  SET splitInteger = 1;

  WHILE splitInteger != 0 DO
    SET tempResult = SUBSTRING_INDEX (
      SUBSTRING_INDEX (tempChar, splitChar, splitInteger),
      splitChar,
      -1
    );
    IF tempResult != '' THEN
      INSERT INTO temp_table (splitStr)
      VALUES (tempResult);
      SET splitInteger=splitInteger + 1;
    ELSE
      SET splitInteger = 0;
    END IF;
  END WHILE;

  SELECT *
  FROM temp_table;
  DROP TEMPORARY TABLE temp_table;

END $$
DELIMITER ;