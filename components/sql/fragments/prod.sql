SELECT
  A.prodCd, A.prodNm, A.prodType, A.houseCd, A.compCd, A.maker, A.unit, A.quality,
  A.option1, A.option2, A.protectedQty, A.unitPrice, A.barcode,
  B.houseNm, C.compNm, D.inQty, E.outQty, F.fileUrl,
  (IFNULL(D.inQty, 0) + IFNULL(E.outQty, 0)) AS qty
FROM
  tblProduct A
LEFT JOIN (
  SELECT *
  FROM tblHouse
  WHERE flagYN = "Y"
) B ON B.houseCd = A.houseCd
LEFT JOIN (
  SELECT *
  FROM tblCompany
  WHERE flagYN = "Y"
) C ON C.compCd = A.compCd
LEFT JOIN (
  SELECT IFNULL(SUM(qty), 0) inQty, prodCd, MAX(issueDate) AS issueDate
  FROM tblProductInOut
  WHERE flagYN = "Y" AND planYN = "N" AND qty > 0
  GROUP BY prodCd
) D ON D.prodCd = A.prodCd
LEFT JOIN (
  SELECT IFNULL(SUM(qty), 0) outQty, prodCd, MAX(issueDate) AS issueDate
  FROM tblProductInOut
  WHERE flagYN = "Y" AND planYN = "N" AND qty < 0
  GROUP BY prodCd
) E ON E.prodCd = A.prodCd
WHERE A.flagYN = "Y"