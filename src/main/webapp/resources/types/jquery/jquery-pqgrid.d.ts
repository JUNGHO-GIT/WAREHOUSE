/// <reference path="jquery.d.ts" />
/// <reference path="jquery-ui.d.ts" />

interface JQueryStatic {
  active: number;
  paramquery: {
    grid(selector: string | JQuery, options: pq.gridT.options): pq.gridT.instance;
  };
}

// 메서드 타입 정의
type PQGridMethods = (
  | "addClass"
  | "addNodes"
  | "addRow"
  | "attr"
  | "canPaste"
  | "Checkbox"
  | "clearPaste"
  | "collapse"
  | "Columns"
  | "commit"
  | "copy"
  | "createTable"
  | "data"
  | "deleteNodes"
  | "deleteRow"
  | "destroy"
  | "disable"
  | "Drag"
  | "enable"
  | "editCell"
  | "editFirstCellInRow"
  | "expand"
  | "exportData"
  | "exportExcel"
  | "exportCsv"
  | "filter"
  | "flex"
  | "focus"
  | "getCell"
  | "getCellFilter"
  | "getCellHeader"
  | "getCellsByClass"
  | "getCellIndices"
  | "getChanges"
  | "getColIndx"
  | "getColumn"
  | "getColModel"
  | "getCMPrimary"
  | "getData"
  | "getDataCascade"
  | "getEditCell"
  | "getEditCellData"
  | "getInstance"
  | "getRecId"
  | "getRow"
  | "getRowData"
  | "getRowIndx"
  | "getRowsByClass"
  | "getState"
  | "getViewPortIndx"
  | "goToPage"
  | "Group"
  | "hasClass"
  | "hideLoading"
  | "History"
  | "hscrollbar"
  | "importWb"
  | "instance"
  | "isDirty"
  | "isEditableCell"
  | "isEditableRow"
  | "isValid"
  | "isValidChange"
  | "loadState"
  | "moveNodes"
  | "off"
  | "on"
  | "one"
  | "option"
  | "pageData"
  | "pager"
  | "parent"
  | "paste"
  | "quitEditMode"
  | "Range"
  | "refresh"
  | "refreshCell"
  | "refreshCM"
  | "refreshColumn"
  | "refreshDataAndView"
  | "refreshHeader"
  | "refreshHeaderFilter"
  | "refreshRow"
  | "refreshToolbar"
  | "refreshView"
  | "removeAttr"
  | "removeClass"
  | "removeData"
  | "reset"
  | "rollback"
  | "rowCollapse"
  | "rowExpand"
  | "rowInvalidate"
  | "saveEditCell"
  | "saveState"
  | "scrollCell"
  | "scrollColumn"
  | "scrollRow"
  | "scrollX"
  | "scrollY"
  | "scrollXY"
  | "search"
  | "Selection"
  | "SelectRow"
  | "setSelection"
  | "showLoading"
  | "sort"
  | "toggle"
  | "toolbar"
  | "ToolPanel"
  | "Tree"
  | "updateRow"
  | "vscrollbar"
  | "widget"
  | "option"
);

interface JQuery {
  pqGrid(options: pq.gridT.options): JQuery;
  pqGrid(method: PQGridMethods, ...params: any[]): any;
}

declare namespace pq {
  namespace gridT {
    type numberorstring = number | string;
    type colModel = Array<column>;

    type crule = {
      condition?: string;
      value?: any;
      value2?: any;
    };

    type rule = {
      dataIndx: numberorstring;
      condition?: string;
      value?: any;
      value2?: any;
      mode?: string; //5.2.0
      crules?: Array<crule>; //5.2.0
    };

    interface column {
      align?: string;
      cb?: {
        all?: boolean;
        check?: any;
        header?: boolean;
        maxCheck?: number;
        select?: boolean;
        uncheck?: any;
      };
      cbId?: numberorstring;
      cls?: string;
      clsHead?: string;
      collapsible?: {
        last?: boolean;
        on?: boolean;
      };
      colModel?: colModel;
      copy?: boolean;
      dataIndx?: string | number;
      dataType?: string;
      deFormat?: ((val: any) => any);
      denyAgg?: boolean;
      denyGroup?: boolean;
      denyPivot?: boolean;
      editable?: boolean | ((evt: any, ui: cellObject) => boolean);
      editModel?: {
        keyUpDown?: boolean;
        saveKey?: string;
        onBlur?: string;
        cancelBlurCls?: string;
        onTab?: string;
      };
      editor?: editorObj | ((ui: cellObject) => editorObj) | boolean;
      exportRender?: boolean;
      filter?: {
        attr?: string;
        cls?: string;
        conditionExclude?: Array<string>;
        conditionList?: Array<string>;
        conditions?: {
          [condition: string]: {
            compare: (cellData: any, value: any, value2: any) => boolean;
          };
        };
        crules?: Array<crule>;
        diExtra?: Array<string>;
        dpOptions?: object;
        dpOptions2?: object;
        format?: string | ((val: any) => any);
        gridOptions?: object;
        groupIndx?: numberorstring;
        init?: (ui: any) => any;
        labelIndx?: numberorstring;
        listener?: any;
        listeners?: any[];
        maxCheck?: number;
        menuIcon?: boolean;
        mode?: string;
        options?: any | any[];
        selectGridCreated?: (ui: object) => void;
        selectGridObj?: (ui: object) => void;
        style?: string;
        valueIndx?: numberorstring;
      };
      filterFn?: (ui: object) => object;
      format?: string | ((val: any) => any);
      formatRaw?: string;
      formula?: (ui: {rowData: any;}) => any;
      groupable?: boolean;
      groupChange?: ((val: string) => string);
      halign?: "left" | "center" | "right";
      hidden?: boolean;
      maxWidth?: string | number;
      menuIcon?: boolean;
      menuUI?: any;
      menuInClose?: boolean;
      menuInDisable?: boolean;
      menuInHide?: boolean;
      minWidth?: string | number;
      nodrag?: boolean;
      nodrop?: boolean;
      parent?: column;
      pivotSortFn?: ((a: object, b: object) => number);
      postRender?: (string | ((ui: cellObject) => void));
      render?: (string | ((ui: renderObj) => string | {attr?: string; cls?: string; style?: string; text?: string;}));
      renderLabel?: ((ui: renderObj) => string | void);
      resizable?: boolean;
      showifOpen?: boolean;
      sortable?: boolean;
      sortType?: ((rowData1: any, rowData2: any, dataIndx: any) => number);
      summary?: {
        edit?: boolean;
        type?: string;
      };
      title?: string | ((ui: any) => string);
      tpCls?: string;
      tpHide?: boolean;
      type?: string;
      useLabel?: boolean;
      validations?: Array<{
        icon?: string;
        type: any;
        value?: any;
        msg?: string;
        warn?: boolean;
      }>;
      width?: number | string;
    }

    type filterModel = {
      header?: boolean;
      menuIcon?: boolean;
      mode?: "AND" | "OR";
      on?: boolean;
      timeout?: number;
      type?: 'local' | 'remote';
    };

    interface editorObj {
      type?: any;
      init?: ((ui: any) => any);
      prepend?: any;
      options?: any[];
      labelIndx?: string | number;
      valueIndx?: string | number;
      groupIndx?: string | number;
      dataMap?: any[];
      mapIndices?: any;
      getData?: ((ui: any) => any);
      cls?: string;
      select?: boolean;
      style?: string;
      attr?: string;
    }

    interface rowObject {
      rowData?: any;
      rowIndx?: number;
      rowIndxPage?: number;
    }

    interface colObject {
      colIndx?: number;
      column?: column;
      dataIndx?: string | number;
    }

    interface cellObject extends rowObject, colObject {
    }

    interface renderObj extends cellObject {
      cellData: any;
      Export: boolean;
      formatVal: string;
    }

    interface pageModel {
      bubble?: boolean;
      curPage?: number;
      layout?: Array<string>;
      rPPOptions?: Array<number>;
      rPP?: number;
      strDisplay?: string;
      totalPages?: number;
      trigger?: boolean;
      type?: string;
    }

    interface Drag {
      addAcceptIcon(): void;
      addIcon(icon: string): void;
      addRejectIcon(): void;
      getUI(): {
        nodes: Array<any>;
        rowData: any;
        rowIndx: number;
      };
      grid(): pq.gridT.instance;
      over(): void;
      out(): void;
    }

    interface groupModel {
      agg?: object;
      cascade?: boolean;
      cbId?: numberorstring;
      checkbox?: boolean;
      checkboxHead?: boolean;
      collapsed?: Array<boolean>;
      dataIndx?: Array<string | boolean>;
      fixCols?: boolean;
      grandSummary?: boolean;
      groupCols?: Array<string | boolean>;
      header?: boolean;
      headerMenu?: Array<string>;
      icon?: Array<string>;
      ignoreCase?: boolean;
      indent?: number;
      maxCheck?: number;
      menuItems?: Array<string>;
      merge?: boolean;
      on?: boolean;
      pivot?: boolean;
      pivotColsTotal?: string;
      pivotTotalForSingle?: boolean;
      select?: boolean;
      showSummary?: Array<boolean>;
      source?: 'checkboxGroup';
      summaryEdit?: boolean;
      summaryInTitleRow?: string;
      title?: any[];
      titleDefault?: string;
      titleInFirstCol?: boolean;
      useLabel?: boolean;
    }

    interface sortModel {
      cancel?: boolean;
      ignoreCase?: boolean;
      multiKey?: string;
      number?: boolean;
      on?: boolean;
      single?: boolean;
      sorter?: any[];
      space?: boolean;
      type?: string;
    }

    interface toolPanel {
      hideAggPane?: boolean;
      hideColPane?: boolean;
      hidePivotChkBox?: boolean;
      hideRowPane?: boolean;
      show?: boolean;
    }

    interface dataModel {
      beforeSend?: ((jqXHR: JQueryXHR, settings: JQueryAjaxSettings) => void);
      contentType?: string;
      data?: Object[];
      dataUF?: Object[];
      dataType?: string;
      error?: ((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void);
      getData?: (response: any, textStatus: string, jqXHR: JQueryXHR) => {
        curPage?: number;
        data: any[];
        totalRecords?: number;
      };
      getUrl?: ((obj: {
        colModel: colModel,
        dataModel: dataModel,
        filterModel: filterModel,
        groupModel: groupModel,
        pageModel: pageModel,
        sortModel: sortModel;
      }) => {
        url: string;
        data?: any;
      });
      location?: string;
      method?: string;
      postData?: any;
      postDataOnce?: any;
      recIndx?: numberorstring;
      url?: string;
    }

    type citem = {
      action?: ((evt: any, ui: any, citem: citem) => boolean | void);
      cls?: string;
      disabled?: boolean;
      icon?: string;
      name: string;
      shortcut?: string;
      style?: string;
      subItems?: Array<itemX>;
      tooltop?: string;
    };

    type itemX = citem | string;

    type contextMenu = {
      on?: boolean;
      head?: boolean;
      init?: (evt: any, ui: any) => void;
      items?: itemX[] | ((evt: any, ui: any) => itemX[]);
    };

    interface options {
      animModel?: {
        on?: boolean;
        duration?: number;
      };
      autofill?: boolean;
      autoRow?: boolean;
      autoRowHead?: boolean;
      autoRowSum?: boolean;
      fillHandle?: string;
      bootstrap?: any;
      bubble?: boolean;
      collapsible?: {
        on?: boolean;
        collapsed?: boolean;
        toggle?: boolean;
        css?: any;
      };
      colModel?: colModel;
      columnBorders?: boolean;
      columnTemplate?: column;
      contextMenu?: contextMenu;
      copyModel?: any;
      dataModel?: dataModel;
      detailModel?: {
        cache?: boolean,
        height?: number,
        collapseIcon?: "ui-icon-triangle-1-e",
        expandIcon?: "ui-icon-triangle-1-se";
        init: ((ui: rowObject) => JQuery);
      };
      dragColumns?: {
        enabled?: boolean;
        acceptIcon?: string;
        rejectIcon?: string;
        topIcon?: string;
        bottomIcon?: string;
      };
      draggable?: boolean;
      dragModel?: {
        on?: boolean;
        clsDnD?: string;
        contentHelper?: ((diHelper: Array<string>, dragItems: Array<any>) => string);
        cssHelper?: any;
        diDrag?: numberorstring;
        diHelper?: Array<string>;
        dragNodes?: ((rd: any, evt: any) => Array<any>);
        iconAccept?: string;
        iconReject?: string;
        isDraggable?: (ui: any) => boolean;
        options?: any;
        tmplDrag?: string;
        tmplDragN?: string;
        tmplHelper?: string;
      };
      dropModel?: {
        on?: boolean;
        accept?: string;
        isDroppable?: (evt: any, ui: any) => (void | boolean);
        drop?: (evt: any, ui: any) => void;
        options?: any;
      };
      editable?: boolean | ((ui: rowObject) => boolean);
      editModel?: {
        clicksToEdit?: number;
        pressToEdit?: boolean;
        filterKeys?: boolean;
        keyUpDown?: boolean;
        saveKey?: any;
        onSave?: 'nextFocus' | 'nextEdit' | '';
        onTab?: 'nextFocus' | 'nextEdit' | '';
        onBlur?: 'validate' | 'save' | '';
        allowInvalid?: boolean;
        invalidClass?: string;
        warnClass?: string;
      };
      editor?: {
        type?: string;
        cls?: string;
        style?: string;
        select?: boolean;
      };
      filterModel?: filterModel;
      flex?: {
        on?: boolean;
        one?: boolean;
        all?: boolean;
      };
      formulas?: Array<[number | string, (rowData: any, column: column) => any]>;
      formulasModel?: {
        on?: boolean;
      };
      freezeBorders?: boolean;
      freezeCols?: number;
      freezeRows?: number;
      groupModel?: groupModel;
      height?: numberorstring;
      hoverMode?: string;
      hwrap?: boolean;
      locale?: string;
      maxHeight?: numberorstring;
      maxWidth?: numberorstring;
      menuIcon?: boolean;
      menuUI?: {
        buttons?: Array<string>;
        gridOptions?: any;
        singleFilter?: boolean;
        popupOptions?: any;
        tabs?: Array<string>;
      };
      mergeCells?: Array<{
        r1: number;
        c1: number;
        rc: number;
        cc: number;
        attr?: string;
        cls?: string;
        style?: string;
      }>;
      mergeModel?: {
        flex: boolean;
      };
      minWidth?: numberorstring;
      numberCell?: {
        width?: number;
        title?: string;
        resizable?: boolean;
        minWidth?: number;
        show?: boolean;
      };
      pageModel?: pageModel;
      pasteModel?: {
        on?: boolean;
        select?: boolean;
        allowInvalid?: boolean;
        type?: string;
      };
      postRenderInterval?: number;
      reactive?: boolean;
      resizable?: boolean;
      realFocus?: boolean;
      roundCorners?: boolean;
      rowBorders?: boolean;
      rowHt?: number;
      rowHtHead?: number;
      rowHtSum?: number;
      rowInit?: (ui: rowObject) => void | {attr?: string; style?: string; cls?: string;};
      scrollModel?: {
        horizontal?: boolean;
        pace?: string;
        autoFit?: boolean;
        lastColumn?: string;
        theme?: boolean;
        flexContent?: boolean;
      };
      selectionModel?: {
        type?: string;
        mode?: string;
        all?: boolean;
        native?: boolean;
        onTab?: string;
        row?: boolean;
        column?: boolean;
        toggle?: boolean;
      };
      showBottom?: boolean;
      showHeader?: boolean;
      showTitle?: boolean;
      showToolbar?: boolean;
      showTop?: boolean;
      sortable?: boolean;
      sortModel?: sortModel;
      stateColKeys?: object;
      stateKeys?: object;
      stringify?: boolean;
      stripeRows?: boolean;
      summaryData?: any[];
      summaryOptions?: {
        date?: string;
        number?: string;
        string?: string;
      };
      summaryTitle?: any;
      swipeModel?: any;
      title?: string;
      toolbar?: {
        cls?: string;
        items: Array<{
          type: string;
          options?: any[] | any;
          cls?: string;
          style?: string;
          attr?: string;
          label?: string;
          icon?: string;
          listener?: any;
          listeners?: any[];
          value?: any;
        }>;
      };
      toolPanel?: toolPanel;
      trackModel?: {
        on?: boolean;
        dirtyClass?: string;
      };
      trigger?: boolean;
      validation?: {
        icon?: string;
        cls?: string;
        style?: string;
      };
      treeModel?: Object;
      virtualX?: boolean;
      virtualY?: boolean;
      warning?: {
        icon?: string;
        cls?: string;
        style?: string;
      };
      width?: numberorstring;
      wrap?: boolean;

      beforeCellKeyDown?: (evt: any, ui: any) => boolean | void;
      beforeCheck?: (evt: any, ui: any) => boolean | void;
      beforeColumnCollapse?: (evt: any, ui: any) => boolean | void;
      beforeColumnOrder?: (evt: any, ui: any) => boolean | void;
      beforeExport?: (evt: any, ui: any) => boolean | void;
      beforeFillHandle?: (evt: any, ui: any) => boolean | void;
      beforeFilter?: (evt: any, ui: any) => boolean | void;
      beforeGroupExpand?: (evt: any, ui: any) => boolean | void;
      beforeHideCols?: (evt: any, ui: {diHide?: Array<numberorstring>; diShow?: Array<numberorstring>;}) => boolean | void;
      beforePaste?: (evt: any, ui: any) => boolean | void;
      beforeRowExpand?: (evt: any, ui: any) => boolean | void;
      beforeRowSelect?: (evt: any, ui: any) => boolean | void;
      beforeSort?: (evt: any, ui: any) => boolean | void;
      beforeTableView?: (evt: any, ui: any) => boolean | void;
      beforeValidate?: (evt: any, ui: any) => boolean | void;
      cellBeforeSave?: (evt: any, ui: any) => boolean | void;
      cellClick?: (evt: any, ui: any) => any;
      cellDblClick?: (evt: any, ui: any) => any;
      cellKeyDown?: (evt: any, ui: any) => any;
      cellRightClick?: (evt: any, ui: any) => any;
      cellSave?: (evt: any, ui: any) => any;
      change?: (evt: any, ui: any) => any;
      check?: (evt: any, ui: any) => any;
      columnCollapse?: (evt: any, ui: any) => any;
      columnDrag?: (evt: any, ui: any) => any;
      columnOrder?: (evt: any, ui: any) => void | boolean;
      columnResize?: (evt: any, ui: any) => any;
      complete?: (evt: any, ui: any) => void | boolean;
      create?: (evt: any, ui: any) => any;
      customSort?: (evt: any, ui: any) => any;
      dataReady?: (evt: any, ui: any) => any;
      editorBegin?: (evt: any, ui: any) => any;
      editorBlur?: (evt: any, ui: any) => any;
      editorEnd?: (evt: any, ui: any) => any;
      editorFocus?: (evt: any, ui: any) => any;
      editorKeyDown?: (evt: any, ui: any) => any;
      editorKeyPress?: (evt: any, ui: any) => any;
      editorKeyUp?: (evt: any, ui: any) => any;
      exportData?: (evt: any, ui: any) => any;
      filter?: (evt: any, ui: any) => any;
      group?: (evt: any, ui: any) => any;
      groupChange?: (evt: any, ui: any) => any;
      groupOption?: (evt: any, ui: any) => any;
      headerCellClick?: (evt: any, ui: any) => any;
      headRightClick?: (evt: any, ui: any) => any;
      hideCols?: (evt: any, ui: {diHide?: Array<numberorstring>; diShow?: Array<numberorstring>;}) => void;
      history?: (evt: any, ui: {
        canUndo: boolean;
        canRedo: boolean;
        type: string;
        num_undo: number;
        num_redo: number;
      }) => any;
      load?: ((evt: any, ui: any) => void);
      moveNode?: ((evt: any, ui: any) => void);
      pivotCM?: ((evt: any, ui: any) => void);
      refresh?: (evt: any, ui: any) => void | boolean;
      refreshHeader?: (evt: any, ui: any) => any;
      refreshRow?: (evt: any, ui: rowObject) => any;
      render?: (evt: any, ui: any) => any;
      rowClick?: (evt: any, ui: rowObject) => any;
      rowDblClick?: (evt: any, ui: rowObject) => any;
      rowRightClick?: (evt: any, ui: rowObject) => any;
      rowSelect?: (evt: any, ui: any) => void;
      scroll?: (evt: any, ui: any) => void;
      scrollStop?: (evt: any, ui: any) => void;
      selectChange?: (evt: any, ui: {selection: any;}) => any;
      selectEnd?: (evt: any, ui: {selection: any;}) => any;
      selectGridCreated?: (evt: any, ui: object) => void;
      sort?: (evt: any, ui: {
        dataIndx: numberorstring;
        single: boolean;
        oldSorter: any[];
        sorter: any[];
      }) => any;
      toggle?: (evt: any, ui: {state: string;}) => any;
      workbookReady?: (evt: any, ui: {workbook: workbook;}) => any;
    }

    interface objRange {
      r1?: number;
      c1?: number;
      r2?: number;
      c2?: number;
      rc?: number;
      cc?: number;
    }

    interface Range {
      address(): Array<objRange>;
      addressLast(): objRange;
      add(obj?: objRange): void;
      cut(obj?: {dest?: objRange;}): void;
      copy(obj?: {dest?: objRange;}): void;
      clear(): void;
      count(): number;
      merge(): void;
      select(): void;
      unmerge(): void;
      value(val?: any[]): any[];
    }

    interface Selection extends Range {
      getSelection(): cellObject[];
      isSelected(obj: {rowIndx: number; colIndx?: number; dataIndx?: numberorstring;}): boolean;
      removeAll(): void;
      selectAll(obj?: {all: boolean;}): void;
    }

    interface worksheetColumn {
      hidden?: boolean;
      width?: number;
      indx?: number;
    }

    interface worksheetCell {
      align?: string;
      bgColor?: string;
      bold?: boolean;
      color?: string;
      dataIndx?: string | number;
      indx?: number;
      italic?: boolean;
      font?: string;
      fontSize?: number;
      format?: string;
      formula?: string;
      underline?: boolean;
      valign?: string;
      value?: any;
      wrap?: boolean;
    }

    interface worksheetRow {
      indx?: number;
      cells: worksheetCell[];
      hidden?: boolean;
    }

    interface worksheet {
      name?: string;
      columns?: worksheetColumn[];
      frozenRows?: number;
      frozenCols?: number;
      mergeCells?: string[];
      headerRows?: number;
      rows: worksheetRow[];
    }

    interface workbook {
      sheets?: worksheet[];
    }

    interface Checkbox {
      checkAll(): void;
      checkNodes(nodes: any[]): void;
      getCheckedNodes(all?: boolean): any[];
      isHeadChecked(): boolean | null;
      unCheckAll(): void;
      unCheckNodes(nodes: any[]): void;
    }

    interface Columns {
      alter(callback: () => any): void;
      each(callback: (column: column) => any, cm?: colModel): void;
      find(callback: (column: column) => boolean, cm?: colModel): column;
      hide(ui: {diHide?: Array<string>, diShow?: Array<string>; }): void;
      reduce(callback: (column: column) => object | void, cm?: colModel): colModel;
    }

    interface History {
      canRedo(): boolean;
      canUndo(): boolean;
      redo(): void;
      reset(): void;
      undo(): void;
    }

    interface SelectRow {
      add(obj: {rowIndx?: number; isFirst?: boolean; rows?: {rowIndx?: number; rowIndxPage?: number;}[];}): void;
      extend(obj: {rowIndx: number;}): void;
      getFirst(): number;
      getSelection(): rowObject[];
      isSelected(rowObject: rowObject): boolean;
      remove(obj: {rowIndx?: number; rows?: {rowIndx?: number; rowIndxPage?: number;}[];}): void;
      removeAll(obj?: {all: boolean;}): void;
      replace(obj: {rowIndx?: number; isFirst?: boolean; rows?: {rowIndx?: number; rowIndxPage?: number;}[];}): void;
      selectAll(obj?: {all: boolean;}): void;
      setFirst(rowIndx: number): void;
      toggle(obj: {rowIndx: number; isFirst?: boolean;}): void;
      toRange(): Range;
    }

    interface Group {
      addGroup(datIndx: numberorstring, indx?: number): void;
      addNodes(nodes: any[], parent: any, indx?: number): void;
      checkAll(): void;
      checkNodes(nodes: any[]): void;
      collapse(level?: number): void;
      collapseAll(level?: number): void;
      collapseTo(address: string): void;
      deleteNodes(nodes: any[]): void;
      expand(level?: number): void;
      expandAll(level?: number): void;
      expandTo(address: string): void;
      getCheckedNodes(all?: boolean): any[];
      getChildren(node: any): any[];
      getChildrenAll(node: any): any[];
      getNode(id: numberorstring): any;
      getParent(node: any): any;
      getSummary(node: any): any;
      isAncestor(childNode: any, ancestorNode: any): boolean;
      isFolder(any: any): boolean;
      isHeadChecked(): boolean | null;
      moveNodes(nodes: any[], parent: any, indx?: number): void;
      option(options: any): void;
      removeGroup(datIndx: numberorstring): void;
      unCheckAll(): void;
      unCheckNodes(nodes: any[]): void;
    }

    interface Tree {
      addNodes(nodes: any[], parent?: any, indx?: number): void;
      checkAll(): void;
      checkNodes(nodes: any[]): void;
      collapseAll(): void;
      collapseNodes(nodes: any[]): void;
      deleteNodes(nodes: any[]): void;
      eachChild(node: any, cb: ((node: any) => void)): void;
      eachParent(node: any, cb: ((node: any) => void)): void;
      expandAll(): void;
      expandNodes(nodes: any[]): void;
      expandTo(node: any): void;
      getCheckedNodes(all?: boolean): any[];
      getChildren(node: any): any[];
      getChildrenAll(node: any): any[];
      getLevel(node: any): number;
      getNode(id: numberorstring): any;
      getParent(node: any): any;
      getRoots(): any[];
      getSummary(node: any): any;
      isAncestor(childNode: any, ancestorNode: any): boolean;
      isCollapsed(node: any): boolean;
      isFolder(node: any): boolean;
      isHeadChecked(): boolean | null;
      moveNodes(nodes: any[], parent: any, indx?: number): void;
      option(options: any): void;
      unCheckAll(): void;
      unCheckNodes(nodes: any[]): void;
    }

    interface instance {
      addClass(obj: {rowData?: any; rowIndx?: number; dataIndx?: string | number; cls: string; refresh?: boolean;}): void;
      addNodes(nodes: any[], rowIndx?: number): void;
      addRow(obj: {newRow?: any; rowIndx?: number; rowList?: any[]; track?: boolean; source?: string; history?: boolean; checkEditable?: boolean; refresh?: boolean;}): void;
      attr(obj: {rowData?: any; rowIndx?: number; dataIndx: string | number; attr: string;}): void;
      canPaste(): boolean;
      Checkbox(dataIndx: numberorstring): Checkbox;
      clearPaste(): void;
      collapse(): void;
      Columns(): Columns;
      commit(obj?: {type?: string; rows?: any[]}): void;
      copy(): void;
      createTable(obj: {$cont: JQuery; data: any[]}): void;
      data(obj: {rowData: any; rowIndx: number; dataIndx: string | number; data: any;}): void;
      deleteNodes(nodes: any[]): void;
      deleteRow(obj: {rowIndx?: number; rowData?: any; rowList?: any[]; track?: boolean; source?: string; history?: boolean; refresh?: boolean;}): void;
      destroy(): void;
      disable(): void;
      Drag(): Drag;
      enable(): void;
      editCell(obj: cellObject): void;
      editFirstCellInRow(obj: {rowIndx: number;}): void;
      expand(): void;
      exportData(options: {cssRules?: string; filename?: string; format?: string; noheader?: boolean; nopqdata?: boolean; nopretty?: boolean; render?: boolean; sheetName?: string; title?: string; type?: string; url?: string; workbook?: boolean; zip?: boolean;}): string | Blob;
      exportExcel(option?: any): void;
      filter(obj: {mode?: string; oper?: string; rules?: Array<rule>; rule?: rule; data?: any[]}): any[];
      flex(obj?: {dataIndx?: Array<numberorstring>; colIndx?: Array<number>}): void;
      focus(obj?: {rowIndxPage: number; colIndx: number;}): void;
      getCell(obj: {dataIndx?: numberorstring; colIndx?: number; rowIndx?: number; rowIndxPage?: number; vci?: number;}): JQuery;
      getCellFilter(obj: {dataIndx?: numberorstring; colIndx?: number; vci?: number;}): JQuery;
      getCellHeader(obj: {dataIndx?: numberorstring; colIndx?: number; ri?: number; vci?: number;}): JQuery;
      getCellsByClass(obj: {cls: string;}): Array<cellObject>;
      getCellIndices({$td}: {$td: JQuery}): cellObject;
      getChanges(obj?: {format?: string; all?: boolean;}): {addList: any[]; deleteList: any[]; updateList: any[];};
      getColIndx(obj: {dataIndx?: string | number; column?: any;}): number;
      getColumn(obj: {dataIndx?: numberorstring; colIndx?: number;}): any;
      getColModel(): any[];
      getCMPrimary(): any[];
      getData(obj?: {dataIndx?: Array<numberorstring>; data?: any[]}): any[];
      getDataCascade(dataIndx: numberorstring, groupIndx?: numberorstring): Array<{[dataIndx: string]: any;}>;
      getEditCell(): {$td: JQuery; $cell: JQuery; $editor: JQuery;};
      getEditCellData(): any;
      getInstance(): {grid: instance;};
      getRecId(obj: rowObject): any;
      getRow(obj: {rowIndx?: number; rowIndxPage?: number;}): JQuery;
      getRowData(obj: {rowIndx?: number; rowIndxPage?: number; recId?: number; rowData?: any;}): any;
      getRowIndx(obj: {$tr?: JQuery; rowData?: any;}): number;
      getRowsByClass(obj: {cls: string;}): any[];
      getState(): string;
      getViewPortIndx(): {initV: number; finalV: number; initH: number; finalH: number;};
      goToPage(obj: {rowIndx?: number; page?: number;}): void;
      Group(params?: any): Group;
      hasClass(obj: {rowData?: any; rowIndx?: number; dataIndx?: numberorstring; cls: string;}): boolean;
      hideLoading(): void;
      History(): History;
      hscrollbar(): any;
      importWb(obj: {workbook: workbook; sheet?: number | string; extraRows?: number; extraCols?: number; keepCM?: boolean; headerRowIndx?: number;}): void;
      instance(): instance;
      isDirty(obj?: {rowIndx?: number; rowData?: any;}): boolean;
      isEditableCell(obj: {rowIndx?: number; dataIndx?: numberorstring;}): boolean;
      isEditableRow(obj: {rowIndx: number;}): boolean;
      isValid(obj: {rowData?: any; rowIndx?: number; dataIndx?: numberorstring; value?: any; data?: any[]; allowInvalid?: boolean; focusInvalid?: boolean;}): {valid: boolean; msg: string; cells: {dataIndx: string | number; column: column; rowData: any;}[];};
      isValidChange(obj: {allowInvalid?: boolean; focusInvalid?: boolean;}): {valid: boolean; cells: {dataIndx: string | number; column: column; rowData: any;}[];};
      loadState(obj: {state?: string; refresh?: boolean;}): boolean;
      moveNodes(nodes: any[], rowIndx?: number): void;
      off(event: string, fn?: ((evt: any, ui: any) => any)): void;
      on(event: string, fn: ((evt: any, ui: any) => any)): void;
      one(event: string, fn: ((evt: any, ui: any) => any)): void;
      option(): any;
      option(name: string): any;
      option(name: string, value: any): void;
      option(obj: any): void;
      pageData(): any[];
      pager(): any;
      parent(): instance;
      paste(): void;
      quitEditMode(): void;
      Range(obj: objRange): Range;
      refresh(options?: any): void;
      refreshCell(obj: cellObject): void;
      refreshCM(colModel?: colModel): void;
      refreshColumn(obj: cellObject): void;
      refreshDataAndView(): void;
      refreshHeader(): void;
      refreshHeaderFilter(obj: {colIndx?: number; dataIndx?: numberorstring;}): void;
      refreshRow(obj: rowObject): void;
      refreshToolbar(): void;
      refreshView(): void;
      removeAttr(obj: {rowData?: any; rowIndx?: number; dataIndx?: numberorstring; colIndx?: number; attr: any;}): void;
      removeClass(obj: {rowData?: any; rowIndx?: number; dataIndx?: numberorstring; colIndx?: number; cls: string; refresh?: boolean;}): void;
      removeData(obj: {rowData?: any; rowIndx?: number; dataIndx?: numberorstring; colIndx?: number; data: any;}): void;
      reset(obj: {filter?: boolean; group?: boolean; sort?: boolean;}): void;
      rollback(obj?: {type?: string;}): void;
      rowCollapse(obj: {rowIndx?: number; rowIndxPage?: number;}): void;
      rowExpand(obj: {rowIndx?: number; rowIndxPage?: number;}): void;
      rowInvalidate(obj: {rowIndx?: number; rowIndxPage?: number;}): void;
      saveEditCell(): boolean;
      saveState(obj: {save?: boolean;}): string;
      scrollCell(obj: {colIndx?: number; dataIndx?: numberorstring; rowIndxPage?: number; rowIndx?: number;}, fn?: () => void): void;
      scrollColumn(obj: {colIndx?: number; dataIndx?: numberorstring;}, fn?: () => void): void;
      scrollRow(obj: {rowIndxPage?: number; rowIndx?: number;}, fn?: () => void): void;
      scrollX(x?: number, fn?: () => void): number | void;
      scrollY(y?: number, fn?: () => void): number | void;
      scrollXY(x: number, y: number, fn?: () => void): void;
      search(obj: {row: any; first?: boolean;}): Array<{rowIndx: number; rowIndxPage: number;}>;
      Selection(): Selection;
      SelectRow(): SelectRow;
      setSelection(obj: {rowIndx?: number; rowIndxPage?: number; colIndx?: number; focus?: boolean;}, fn?: () => void): void;
      showLoading(): void;
      sort(obj?: {single?: boolean; sorter?: any[]}): void;
      toggle(): void;
      toolbar(): void;
      ToolPanel(): {hide(): void; isVisible(): boolean; show(): void; toggle(): void;};
      Tree(): Tree;
      updateRow(obj: {rowIndx?: number; newRow?: any; rowList?: any[]; track?: boolean; source?: string; history?: boolean; checkEditable?: boolean; allowInvalid?: boolean; refresh?: boolean;}): void;
      vscrollbar(): void;
      widget(): JQuery;
    }
  }

  function escapeHtml(str: string): string;
  function grid(selector: string | JQuery, options: gridT.options): gridT.instance;
  function deFormatNumber(val: string, format: string): number;
  function formatNumber(val: number, format: string): string;

  namespace aggregate {
    function avg(arr: any[], col?: any): number;
    function count(arr: any[], col?: any): number;
    function max(arr: any[], col?: any): number;
    function min(arr: any[], col?: any): number;
    function sum(arr: any[], col?: any): number;
    function stdev(arr: any[], col?: any): number;
    function stdevp(arr: any[], col?: any): number;
  }

  namespace excel {
    function exportWb(obj: {workbook: gridT.workbook; url?: string; type?: string;}): string | Blob;
    function eachCell(collection: Array<gridT.worksheet | gridT.worksheetRow>, fn: ((cell: gridT.worksheetCell) => void)): void;
    function importXl(obj: {file?: File; content?: any; sheets?: Array<number | string>; type?: string; url?: string;}, fn: (wb: gridT.workbook) => void): void;
    function getArray(ws: gridT.worksheet): any[];
    function getCsv(ws: gridT.worksheet): string;
  }

  namespace excelImport {
    function attr(str: string): any;
  }
}
