declare type ExcelType = Excel.ExcelStatic;

declare interface Workbook {
  /**
  * 새로운 시트를 추가합니다.
  * @param name 시트 이름
  * @returns 시트 인덱스(0 기반)
  */
  addSheet (name?: string): number;

  /**
  * 스타일을 추가합니다.
  * @param style 스타일 문자열 (예: 'Calibri Light 12 0000EE')
  * @returns 스타일 인덱스(1 기반)
  */
  addStyle (style: object | string): number;

  /**
  * 셀, 열, 행 또는 시트 속성을 설정합니다.
  * @param sheet 시트 인덱스 또는 {sheet, column, row, value, style} 형태의 객체
  * @param column 열 인덱스
  * @param row 행 인덱스
  * @param value 값
  * @param style 스타일 인덱스
  */
  set (
    sheet: number | {sheet?: number; column?: number; row?: number; value?: any; style?: number;},
    column?: number,
    row?: number,
    value?: any,
    style?: number
  ): void;

  /**
  * 지정한 파일명으로 Excel 파일을 생성합니다.
  * @param filename 저장할 파일명
  */
  generate (filename: string): void;
}

declare namespace Excel {
  interface ExcelStatic {
    /**
    * 지정한 RGB 값을 16진수 색상코드로 변환합니다.
    * @param r 빨강 값(0~255)
    * @param g 초록 값(0~255)
    * @param b 파랑 값(0~255)
    * @returns 16진수 색상 문자열 (예: 'FF00FF') 또는 undefined
    */
    rgbToHex (r?: number, g?: number, b?: number): string | undefined;

    /**
    * 지정한 Date 객체를 Excel 시리얼 값(UTC 기반)으로 변환합니다.
    * @param date Date 객체
    * @returns Excel 시리얼 값
    */
    toExcelUTCTime (date: Date): number;

    /**
    * 지정한 Date 객체를 Excel 시리얼 값(로컬 시간대 기반)으로 변환합니다.
    * @param date Date 객체
    * @returns Excel 시리얼 값
    */
    toExcelLocalTime (date: Date): number;

    /**
    * Excel 기본 형식 배열
    */
    formats: string[];

    /**
    * Excel 테두리 스타일 목록
    */
    borderStyles: string[];

    /**
    * 새로운 Workbook 객체를 생성합니다.
    * @param defaultFont 기본 폰트 설정 문자열 (예: 'Calibri Light 12 0000EE')
    * @returns Workbook 객체
    */
    newExcel (defaultFont ?: string): Workbook;
  }
}
