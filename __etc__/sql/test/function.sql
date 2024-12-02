/**************************************************************************************************/
CREATE FUNCTION `splitToRow`(
 `@inStr` TEXT,
 `@split` VARCHAR(1),
 `@pos` INT
) RETURNS text CHARSET utf8

RETURN

SUBSTRING_INDEX (
  SUBSTRING_INDEX (
   `@inStr`,
   `@split`,
   `@pos`
  ),
 `@split`, -1
) ;;
DELIMITER ;
