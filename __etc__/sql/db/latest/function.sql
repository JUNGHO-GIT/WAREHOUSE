/**************************************************************************************************/
DELIMITER $$
CREATE FUNCTION `splitToRow`(
 `inStr` TEXT,
 `split` VARCHAR(1),
 `pos` INT
) RETURNS TEXT CHARSET utf8
BEGIN
  RETURN SUBSTRING_INDEX(
    SUBSTRING_INDEX(inStr, split, pos),
    split, -1
  )
END $$
DELIMITER ;