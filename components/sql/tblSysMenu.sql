DROP TABLE IF EXISTS `jadejava04`.`tblSysMenu`;

CREATE TABLE `tblSysMenu` (
  `menu` varchar(1) DEFAULT '',
  `subMenu` varchar(3) DEFAULT '',
  `parentsMenu` varchar(4) DEFAULT '',
  `pageUrl` varchar(50) DEFAULT '',
  `pageNm` varchar(50) DEFAULT '',
  `pageIcon` varchar(50) DEFAULT '',
  `menuOrder` int(11) DEFAULT '0',
  `menuNo` int(11) DEFAULT '0',
  `flagYN` varchar(1) DEFAULT 'Y',
  `issueID` varchar(20) DEFAULT '',
  `regDate` datetime DEFAULT NULL,
  `issueDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴구성';

INSERT INTO
  jadejava04.tblSysMenu (
    menu,
    subMenu,
    parentsMenu,
    pageUrl,
    pageNm,
    pageIcon,
    menuOrder,
    menuNo,
    flagYN,
    issueID,
    regDate,
    issueDate
  )
VALUES
('A', '00', '', '/warehouse/product', '제품', 'fa-calendar-o', 100, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '01', 'A00', '/warehouse/product', '제품관리', '', 101, 11, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '02', 'A00', '/warehouse/productIn', '제품입고관리', '', 102, 12, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-25 10:21:40'),
('A', '03', 'A00', '/warehouse/productOut', '제품출고관리', '', 103, 13, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-25 10:22:45'),
('A', '04', 'A00', '/warehouse/productInOutAll', '제품입출고관리 (일괄)', '', 104, 14, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '05', 'A00', '/warehouse/productXls', '제품 Excel Up', '', 105, 15, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '06', 'A00', '/warehouse/productInOutXls', '제품입출고 Excel Up', '', 106, 16, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '07', 'A00', '/warehouse/shipping', '제품출고현황 (출하)', '', 107, 17, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('A', '08', 'A00', '/warehouse/shipItems', '제품출하관리', '', 108, 18, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '00', '', '/warehouse/resource', '자재', 'fa-cubes', 200, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '01', 'B00', '/warehouse/resource', '자재관리', '', 201, 21, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '02', 'B00', '/warehouse/resourceIn', '자재입고관리', '', 202, 22, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:18'),
('B', '03', 'B00', '/warehouse/resourceOut', '자재출고관리', '', 203, 23, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '04', 'B00', '/warehouse/resourceInOutAll', '자재입출고관리 (일괄)', '', 204, 24, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '05', 'B00', '/warehouse/resourceXls', '자재 Excel Up', '', 205, 25, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('B', '06', 'B00', '/warehouse/resourceInOutXls', '자재입출고 Excel Up', '', 206, 26, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('D', '00', '', '/warehouse/bom', 'BOM', 'fa-code-fork', 400, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('D', '01', 'D00', '/warehouse/bom', 'BOM', '', 401, 41, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('F', '00', '', '/warehouse/shipPlan', '출하관리', 'fa-cog', 600, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('F', '01', 'F00', '/warehouse/shipPlan', '출하계획관리', '', 601, 61, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('R', '00', '', '/warehouse/report', '리포트', 'fa-signal', 800, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('R', '01', 'R00', '/warehouse/reportStock', '연간재고현황', '', 801, 81, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('R', '02', 'R00', '/warehouse/reportIn', '연간입고현황', '', 802, 82, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('R', '03', 'R00', '/warehouse/reportOut', '연간출고현황', '', 803, 83, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '00', '', '/warehouse/commonCd', '기준정보', 'fa-home', 900, 0, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '01', 'Z00', '/warehouse/commonCd', '공통코드', '', 901, 91, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '02', 'Z00', '/warehouse/company', '거래처', '', 902, 92, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '03', 'Z00', '/warehouse/user', '회원정보', '', 903, 93, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '04', 'Z00', '/warehouse/house', '창고관리', '', 904, 94, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17'),
('Z', '05', 'Z00', '/warehouse/dash', '대시보드', '', 905, 95, 'Y', 'jade', '2023-10-26 14:42:17', '2023-10-26 14:42:17')