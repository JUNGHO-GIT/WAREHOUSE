/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_Bom`(
	IN `@prodCd` INT(10),
	IN `@resrcCd` INT(10),
	IN `@bomType` VARCHAR(5),
	IN `@unitQty` DECIMAL(5,2),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      unitQty,
      bomType,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@prodCd`,
      `@resrcCd`,
      `@unitQty`,
      `@bomType`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
	ELSE
    UPDATE
      tblBom
    SET
      unitQty=`@unitQty`,
      bomType=`@bomType`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
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
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@catNm`,
      `@parentsCatSeq`,
      `@catOrder`,
      `@step`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
	ELSE
    UPDATE
      tblCategory
    SET
      catNm=`@catNm`,
      step=`@step`,
      parentsCatSeq=`@parentsCatSeq`,
      catOrder=`@catOrder`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
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
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@groupCd`,
      `@itemCd`,
      `@groupNm`,
      `@itemNm`,
      `@itemMemo`,
      `@itemSeq`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
	ELSE
    UPDATE
      tblCommonCd
    SET
      groupNm=`@groupNm`,
      itemNm=`@itemNm`,
      itemMemo=`@itemMemo`,
      itemSeq=`@itemSeq`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
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
	IN `@owner` VARCHAR(20),
	IN `@major` VARCHAR(20),
	IN `@phone` VARCHAR(100),
	IN `@taxEmail` VARCHAR(100),
	IN `@address` VARCHAR(100),
	IN `@compType` VARCHAR(1000),
	IN `@compPart` VARCHAR(1000),
	IN `@remarks` VARCHAR(4000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      owner,
      major,
      phone,
      taxEmail,
      address,
      compType,
      compPart,
      remarks,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@compNm`,
      `@compNo`,
      `@owner`,
      `@major`,
      `@phone`,
      `@taxEmail`,
      `@address`,
      `@compType`,
      `@compPart`,
      `@remarks`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
	ELSE
    UPDATE
      tblCompany
    SET
      compNm=`@compNm`,
      compNo=`@compNo`,
      owner=`@owner`,
      major=`@major`,
      phone=`@phone`,
      taxEmail=`@taxEmail`,
      address=`@address`,
      compType=`@compType`,
      compPart=`@compPart`,
      remarks=`@remarks`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      compCd=`@compCd`;
	END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_DayOff`(
	IN `@offSeq` INT(10),
	IN `@userID` VARCHAR(20),
	IN `@offDate` VARCHAR(500),
	IN `@restCnt` INT(10),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblDayOff
  WHERE offSeq=`@offSeq`;

	IF `@isCd`=0 THEN
    INSERT INTO tblDayOff (
      userID,
      offDate,
      unitQty,
      restCnt,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@userID`,
      `@offDate`,
      `@unitQty`,
      `@restCnt`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblDayOff
    SET
      userID=`@userID`,
      offDate=`@offDate`,
      unitQty=`@unitQty`,
      restCnt=`@restCnt`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      offSeq=`@offSeq`;
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
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@tableNm`,
      `@tableKey`,
      `@fileUrl`,
      `@fileNm`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblFiles
    SET
      tableNm=`@tableNm`,
      tableKey=`@tableKey`,
      fileUrl=`@fileUrl`,
      fileNm=`@fileNm`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
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
	IN `@parentsHCd` INT(10),
	IN `@houseOrder` INT(10),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;
  DECLARE `@step` INTEGER DEFAULT 0;

  SELECT COUNT(*) INTO `@isCd`
  FROM tblHouse
  WHERE houseCd=`@houseCd`;

  SELECT (step + 1) INTO `@step`
  FROM tblHouse
  WHERE houseCd=`@parentsHCd`;

  IF `@parentsHCd`=0 THEN
	  SET `@step`=0;
  END IF;

	IF `@isCd`=0 THEN
    INSERT INTO tblHouse (
      houseNm,
      parentsHCd,
      houseOrder,
      step,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@houseNm`,
      `@parentsHCd`,
      `@houseOrder`,
      `@step`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblHouse
    SET
      houseNm=`@houseNm`,
      step=`@step`,
      parentsHCd=`@parentsHCd`,
      houseOrder=`@houseOrder`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
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
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
	IN `@option1` VARCHAR(50),
	IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@compCd` INT(10),
	IN `@remark` VARCHAR(3000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      protectedQty,
      quality,
      unit,
      option1,
      option2,
      maker,
      unitPrice,
      compCd,
      remark,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@prodNm`,
      `@prodType`,
      `@houseCd`,
      `@protectedQty`,
      `@quality`,
      `@unit`,
      `@option1`,
      `@option2`,
      `@maker`,
      `@unitPrice`,
      `@compCd`,
      `@remark`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblProduct
    SET
      prodNm=`@prodNm`,
      prodType=`@prodType`,
      houseCd=`@houseCd`,
      protectedQty=`@protectedQty`,
      quality=`@quality`,
      unit=`@unit`,
      option1=`@option1`,
      option2=`@option2`,
      maker=`@maker`,
      unitPrice=`@unitPrice`,
      compCd=`@compCd`,
      remark=`@remark`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      prodCd=`@prodCd`;
  END IF;

	IF `@prodCd`=0 THEN
    SET `@prodCd`=LAST_INSERT_ID();
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
	IN `@qty` INT(10),
	IN `@houseCd` INT(10),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remark` VARCHAR(1000),
	IN `@compCd` INT(10),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      qty,
      houseCd,
      unitPrice,
      remark,
      compCd,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@inOutDt`,
      `@prodCd`,
      `@qty`,
      `@houseCd`,
      `@unitPrice`,
      `@remark`,
      `@compCd`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
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
      remark=`@remark`,
      compCd=`@compCd`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      inOutSeq=`@inOutSeq`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ProductInOutXls`(
	IN `@inOutDt` VARCHAR(10),
	IN `@prodNm` VARCHAR(1000),
	IN `@qty` INT(10),
  IN `@compNm` VARCHAR(1000),
	IN `@houseNm` VARCHAR(1000),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remark` VARCHAR(1000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@prodCd` INTEGER DEFAULT 0;
	DECLARE `@houseCd` INTEGER DEFAULT 0;
	DECLARE `@compCd` INTEGER DEFAULT 0;

	SELECT prodCd INTO `@prodCd`
  FROM tblProduct
  WHERE prodNm=`@prodNm`;

	SELECT compCd INTO `@compCd`
  FROM tblCompany
  WHERE compNm=`@compNm`;

	SELECT houseCd INTO `@houseCd`
  FROM tblHouse
  WHERE houseNm=`@houseNm`;

	INSERT INTO tblProductInOut (
		inOutDt,
    prodCd,
    qty,
    houseCd,
    unitPrice,
    remark,
    compCd,
    flagYN,
    regDate,
    issueDate,
    issueID
  )
	VALUES (
		`@inOutDt`,
    `@prodCd`,
    `@qty`,
    `@houseCd`,
    `@unitPrice`,
    `@remark`,
    `@compCd`,
    `@flagYN`,
    NOW(),
    NOW(),
    `@issueID`
  );
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ProductXls`(
	IN `@prodNm` VARCHAR(300),
	IN `@prodTypeNm` VARCHAR(50),
	IN `@houseCd` INT(10),
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
	IN `@option1` VARCHAR(50),
	IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@compNm` VARCHAR(50),
	IN `@remark` VARCHAR(3000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';
	DECLARE `@prodType` VARCHAR(5) DEFAULT '';
	DECLARE `@compCd` INTEGER DEFAULT 0;
	DECLARE `@prodCd` INTEGER DEFAULT 0;

	SELECT itemCd INTO `@prodType`
  FROM tblCommonCd
  WHERE groupCd='0002' AND itemNm=`@prodTypeNm`;

	SELECT compCd INTO `@compCd`
  FROM tblCompany
  WHERE compNm=`@compNm`;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblProduct
  WHERE prodCd=`@prodCd`;

	INSERT INTO tblProduct (
		prodNm,
    prodType,
    houseCd,
    protectedQty,
    quality,
    unit,
    option1,
    option2,
    maker,
    unitPrice,
    compCd,
    remark,
    flagYN,
    regDate,
    issueDate,
    issueID
	)
	VALUES (
		`@prodNm`,
    `@prodType`,
    `@houseCd`,
    `@protectedQty`,
    `@quality`,
    `@unit`,
    `@option1`,
    `@option2`,
    `@maker`,
    `@unitPrice`,
    `@compCd`,
    `@remark`,
    `@flagYN`,
    NOW(),
    NOW(),
    `@issueID`
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
CREATE PROCEDURE `sp_Resource`(
	IN `@resrcCd` INT(10),
	IN `@resrcNm` VARCHAR(300),
	IN `@resrcType` VARCHAR(5),
	IN `@houseCd` INT(10),
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
	IN `@option1` VARCHAR(50),
  IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@compCd` INT(10),
	IN `@remark` VARCHAR(3000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      protectedQty,
      quality,
      unit,
      option1,
      option2,
      maker,
      unitPrice,
      compCd,
      remark,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@resrcNm`,
      `@resrcType`,
      `@houseCd`,
      `@protectedQty`,
      `@quality`,
      `@unit`,
      `@option1`,
      `@option2`,
      `@maker`,
      `@unitPrice`,
      `@compCd`,
      `@remark`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblResource
    SET
      resrcNm=`@resrcNm`,
      resrcType=`@resrcType`,
      houseCd=`@houseCd`,
      protectedQty=`@protectedQty`,
      quality=`@quality`,
      unit=`@unit`,
      option1=`@option1`,
      option2=`@option2`,
      maker=`@maker`,
      unitPrice=`@unitPrice`,
      compCd=`@compCd`,
      remark=`@remark`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      resrcCd=`@resrcCd`;
  END IF;

	IF `@resrcCd`=0 THEN
		SET `@resrcCd`=LAST_INSERT_ID();
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
	IN `@qty` INT(10),
	IN `@houseCd` INT(10),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remark` VARCHAR(1000),
	IN `@compCd` INT(10),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
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
      qty,
      houseCd,
      unitPrice,
      remark,
      compCd,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@inOutDt`,
      `@resrcCd`,
      `@qty`,
      `@houseCd`,
      `@unitPrice`,
      `@remark`,
      `@compCd`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblResourceInOut
    SET
      inOutDt=`@inOutDt`,
      resrcCd=`@resrcCd`,
      qty=`@qty`,
      houseCd=`@houseCd`,
      unitPrice=`@unitPrice`,
      remark=`@remark`,
      compCd=`@compCd`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      inOutSeq=`@inOutSeq`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ResourceInOutXls`(
	IN `@inOutDt` VARCHAR(10),
	IN `@resrcNm` VARCHAR(1000),
	IN `@qty` INT(10),
	IN `@houseNm` VARCHAR(1000),
	IN `@compNm` VARCHAR(1000),
	IN `@unitPrice` NUMERIC(15,0),
	IN `@remark` VARCHAR(1000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@resrcCd` INTEGER DEFAULT 0;
	DECLARE `@houseCd` INTEGER DEFAULT 0;
	DECLARE `@compCd` INTEGER DEFAULT 0;

	SELECT resrcCd INTO `@resrcCd`
  FROM tblResource
  WHERE resrcNm=`@resrcNm`;

	SELECT compCd INTO `@compCd`
  FROM tblCompany
  WHERE compNm=`@compNm`;

	SELECT houseCd INTO `@houseCd`
  FROM tblHouse
  WHERE houseNm=`@houseNm`;

	INSERT INTO tblResourceInOut (
		inOutDt,
    resrcCd,
    qty,
    houseCd,
    unitPrice,
    remark,
    compCd,
    flagYN,
    regDate,
    issueDate,
    issueID
	)
	VALUES (
		`@inOutDt`,
    `@resrcCd`,
    `@qty`,
    `@houseCd`,
    `@unitPrice`,
    `@remark`,
    `@compCd`,
    `@flagYN`,
    NOW(),
    NOW(),
    `@issueID`
  );
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ResourceXls`(
	IN `@resrcNm` VARCHAR(300),
	IN `@resrcTypeNm` VARCHAR(50),
	IN `@houseCd` INT(10),
	IN `@protectedQty` SMALLINT(10),
	IN `@quality` VARCHAR(50),
	IN `@unit` VARCHAR(5),
  IN `@option1` VARCHAR(50),
  IN `@option2` VARCHAR(50),
	IN `@maker` VARCHAR(50),
	IN `@unitPrice` NUMERIC(18,0),
	IN `@compNm` VARCHAR(50),
	IN `@remark` VARCHAR(3000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
 	DECLARE `@isCd` INTEGER DEFAULT 0;
	DECLARE `@barcode` VARCHAR(8) DEFAULT '0';
	DECLARE `@resrcType` VARCHAR(5) DEFAULT '';
	DECLARE `@compCd` INTEGER DEFAULT 0;
	DECLARE `@resrcCd` INTEGER DEFAULT 0;

	SELECT itemCd INTO `@resrcType`
  FROM tblCommonCd
  WHERE groupCd='0003' AND itemNm=`@resrcTypeNm`;

	SELECT compCd INTO `@compCd`
  FROM tblCompany
  WHERE compNm=`@compNm`;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblResource
  WHERE resrcCd=`@resrcCd`;

	INSERT INTO tblResource (
		resrcNm,
    resrcType,
    houseCd,
    protectedQty,
    quality,
    unit,
    option1,
    option2,
    maker,
    unitPrice,
    compCd,
    remark,
    flagYN,
    regDate,
    issueDate,
    issueID
	)
	VALUES (
		`@resrcNm`,
    `@resrcType`,
    `@houseCd`,
    `@protectedQty`,
    `@quality`,
    `@unit`,
    `@option1`,
    `@option2`,
    `@maker`,
    `@unitPrice`,
    `@compCd`,
    `@remark`,
    `@flagYN`,
    NOW(),
    NOW(),
    `@issueID`
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
	IN `@compCd` INT(10),
	IN `@toMajor` VARCHAR(50),
	IN `@toPhone` VARCHAR(20),
	IN `@shipDt` VARCHAR(10),
	IN `@shipMajor` VARCHAR(50),
	IN `@inOutSeqs` VARCHAR(4000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblShipping
  WHERE shipCd = `@shipCd`;

	IF `@isCd` = 0 THEN
    INSERT INTO tblShipping (
      compCd,
      toMajor,
      toPhone,
      shipDt,
      shipMajor,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@compCd`,
      `@toMajor`,
      `@toPhone`,
      `@shipDt`,
      `@shipMajor`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblShipping
    SET
      compCd=`@compCd`,
      toMajor=`@toMajor`,
      toPhone=`@toPhone`,
      shipDt=`@shipDt`,
      shipMajor=`@shipMajor`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      shipCd = `@shipCd`;
  END IF;

	IF `@shipCd` = 0 THEN
    SET `@shipCd` = LAST_INSERT_ID();
  END IF;

	IF `@inOutSeqs` != '' THEN
    CALL sp_ShipItems (`@shipCd`, `@inOutSeqs`, `@issueID`);
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_ShipItems`(
	IN `@shipCd` INT(10),
	IN `@inOutSeqs` VARCHAR(4000),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@pos` INT(10) DEFAULT 1;
	DECLARE `@inOutSeq` VARCHAR(10) DEFAULT '';
	DECLARE `@seq` INT(10) DEFAULT 0;
	DECLARE `@flagYN` VARCHAR(1) DEFAULT 'Y';
	DECLARE `@now` DATETIME;
	DECLARE `@seqs` VARCHAR(4000) DEFAULT '';

	SET `@now`=NOW();

	UPDATE tblShipItems
  SET flagYN = 'N'
  WHERE shipCd = `@shipCd`;

	WHILE `@pos`!=0 DO
    SET `@inOutSeq`=SUBSTRING_INDEX(SUBSTRING_INDEX(`@inOutSeqs`, ',', `@pos`), ',' , -1);
    IF `@seqs`!=`@inOutSeqs` THEN
      SET `@seq` = CAST(`@inOutSeq` AS UNSIGNED);
      INSERT INTO tblShipItems (
        shipCd,
        inOutSeq,
        flagYN,
        regDate,
        issueDate,
        issueID
      )
      VALUES (
        `@shipCd`,
        `@seq`,
        `@flagYN`,
        `@now`,
        `@now`,
        `@issueID`
      )
      ON DUPLICATE KEY UPDATE
        flagYN=VALUES (`flagYN`),
        issueDate=VALUES (`regDate`),
        issueID=VALUES (`issueID`)
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
	IN `@shipPlanCd` INT(10),
	IN `@compCd` INT(10),
	IN `@toMajor` VARCHAR(50),
	IN `@toPhone` VARCHAR(20),
	IN `@shipDt` VARCHAR(10),
	IN `@shipMajor` VARCHAR(50),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblShipPlan
  WHERE shipPlanCd=`@shipPlanCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblShipPlan (
      compCd,
      toMajor,
      toPhone,
      shipDt,
      shipMajor,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@compCd`,
      `@toMajor`,
      `@toPhone`,
      `@shipDt`,
      `@shipMajor`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblShipPlan
    SET
      compCd=`@compCd`,
      toMajor=`@toMajor`,
      toPhone=`@toPhone`,
      shipDt=`@shipDt`,
      shipMajor=`@shipMajor`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      shipPlanCd=`@shipPlanCd`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_User`(
	IN `@userID` VARCHAR(20),
	IN `@passwd` VARCHAR(1000),
	IN `@userNm` VARCHAR(20),
	IN `@phone` VARCHAR(100),
	IN `@email` VARCHAR(100),
	IN `@uLevel` VARCHAR(5),
	IN `@compCd` INT(10),
	IN `@uPerm` VARCHAR(1000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
  DECLARE `@isCd` INTEGER DEFAULT 0;

	IF `@uLevel`='' THEN
    SELECT `00100` INTo `@uLevel`;
  END IF;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblUser
  WHERE userID=`@userID`;

	IF `@isCd`=0 THEN
    INSERT INTO tblUser (
      userID,
      passwd,
      userNm,
      phone,
      email,
      uLevel,
      compCd,
      uPerm,
      flagYN,
      regDate,
      issueDate,
      issueID
    )
    VALUES (
      `@userID`,
      `@passwd`,
      `@userNm`,
      `@phone`,
      `@email`,
      `@uLevel`,
      `@compCd`,
      `@uPerm`,
      `@flagYN`,
      NOW(),
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblUser
    SET
      passwd=`@passwd`,
      userNm=`@userNm`,
      phone=`@phone`,
      email=`@email`,
      uLevel=`@uLevel`,
      compCd=`@compCd`,
      uPerm=`@uPerm`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      userID=`@userID`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_UserConfig`(
	IN `@configSeq` INT(10),
	IN `@userID` VARCHAR(20),
	IN `@pageNm` VARCHAR(50),
	IN `@gridCd` VARCHAR(10),
	IN `@config` VARCHAR(8000),
	IN `@flagYN` VARCHAR(1),
	IN `@issueID` VARCHAR(20)
)
BEGIN
	DECLARE `@isCd` INTEGER DEFAULT 0;

	SELECT COUNT(*) INTO `@isCd`
  FROM tblUserConfig
  WHERE userID=`@userID` AND pageNm=`@pageNm` AND gridCd=`@gridCd`;

	IF `@isCd`=0 THEN
    INSERT INTO tblUserConfig (
      userID,
      pageNm,
      gridCd,
      config,
      flagYN,
      regDate,
      issueID
    )
    VALUES (
      `@userID`,
      `@pageNm`,
      `@gridCd`,
      `@config`,
      `@flagYN`,
      NOW(),
      `@issueID`
    );
  ELSE
    UPDATE
      tblUserConfig
    SET
      config=`@config`,
      flagYN=`@flagYN`,
      issueDate=NOW(),
      issueID=`@issueID`
    WHERE
      userID=`@userID`;
  END IF;
END $$
DELIMITER ;

/**************************************************************************************************/
DELIMITER $$
CREATE PROCEDURE `sp_SplitToRow`(
  IN `tempchar` LONGTEXT,
  IN `splitechar` CHAR(1)
)
BEGIN
  DECLARE spliti INTEGER DEFAULT 1;
  DECLARE tempresult CHAR(255) DEFAULT '';

  CREATE TEMPORARY TABLE IF NOT EXISTS temp_table (
    splitestr VARCHAR(255)
  );

  SET spliti=1;

  WHILE spliti != 0 DO
    SET tempresult=SUBSTRING_INDEX (
      SUBSTRING_INDEX (tempchar, splitechar, spliti),
      splitechar,
      -1
    );
    IF tempresult != '' THEN
      INSERT INTO temp_table (splitestr)
      VALUES (tempresult);
      SET spliti=spliti + 1;
    ELSE
      SET spliti=0;
    END IF;
  END WHILE;

  SELECT *
  FROM temp_table;
  DROP TEMPORARY TABLE temp_table;

END $$
DELIMITER ;
