
SELECT
  A.houseCd, A.houseNm, A.parentsHCd, A.houseOrder, A.step, B.houseNm AS parentsHNm,
  IFNULL(G.inQty, 0) + IFNULL(G.outQty, 0) AS qty,
  G.prodCd, C.prodNm
FROM
  tblHouse A
LEFT JOIN (
  SELECT houseCd, houseNm
  FROM tblHouse
  WHERE flagYN = "Y"
) B ON B.houseCd = A.parentsHCd
LEFT JOIN (
  SELECT
    prodCd, houseCd,
    IFNULL(SUM(CASE WHEN qty > 0 THEN qty ELSE 0 END), 0) AS inQty,
    IFNULL(SUM(CASE WHEN qty < 0 THEN qty ELSE 0 END), 0) AS outQty
  FROM
    tblProductInOut
  WHERE
    flagYN = "Y" AND planYN = "N" AND houseCd = #{houseCd}
  GROUP BY
    prodCd, houseCd
) G ON G.houseCd = A.houseCd
LEFT JOIN (
  SELECT prodCd, prodNm
  FROM tblProduct
  WHERE flagYN = "Y"
) C ON C.prodCd = G.prodCd
WHERE
  A.flagYN = "Y" AND A.houseCd = #{houseCd}
GROUP BY
  G.prodCd, A.houseCd


SELECT
  A.houseCd, A.houseNm, A.parentsHCd, A.houseOrder, A.step, B.houseNm AS parentsHNm,
  C.resrcNm, G.resrcCd,
  G.inQty, G.outQty, (IFNULL(G.inQty, 0) + IFNULL(G.outQty, 0)) AS qty
FROM (
  SELECT *
  FROM tblHouse
  WHERE flagYN = "Y" AND houseCd = #{houseCd}
) A
LEFT JOIN (
  SELECT houseCd, houseNm
  FROM tblHouse
  WHERE flagYN = "Y"
) B ON B.houseCd = A.parentsHCd
LEFT JOIN (
  SELECT resrcCd, houseCd,
  IFNULL(SUM(CASE WHEN qty > 0 THEN qty ELSE 0 END), 0) AS inQty,
  IFNULL(SUM(CASE WHEN qty < 0 THEN qty ELSE 0 END), 0) AS outQty
  FROM tblResourceInOut
  WHERE flagYN = "Y" AND planYN = "N" AND houseCd = #{houseCd}
  GROUP BY resrcCd, houseCd
) G ON G.houseCd = A.houseCd
LEFT JOIN (
  SELECT resrcCd, resrcNm
  FROM tblResource
  WHERE flagYN = "Y"
) C ON C.resrcCd = G.resrcCd
]]>
GROUP BY
  G.resrcCd, A.houseCd