
/// <reference types="jquery" />

interface JQueryStatic
{
  active;
  paramquery;
}

interface JQuery
{
  pqGrid (options: pq.gridT.options | string): any;
  pqGrid (method: string, param: any): any;
}

declare module pq
{

  namespace gridT
  {
    type numberorstring = number | string;
    type colModel = Array<column>;

    type crule = {
      condition?: string;
      value?;
      value2?;
    };
    type rule = {
      dataIndx: numberorstring,
      condition?: string,
      value?,
      value2?,
      mode?: string,//5.2.0
      crules?: Array<crule>; //5.2.0
    };

    interface column
    {
      /** alignment of content in cells */
      /** "left", "center" or "right" */
      align?: string;
      //v7.0.0
      attrHead?: {
        title?: string;
      };
      /** properties of a checkbox column */
      cb?: {
        all?: boolean;
        check?: any;
        header?: boolean;
        maxCheck?: number; //5.3.0
        select?: boolean;
        uncheck?: any;
      };
      /** dataIndx of linked checkbox column */
      cbId?: numberorstring; //5.2.0
      /** Class to be assigned to whole column including header. */
      cls?: string;
      /** Class to be assigned to header. */
      clsHead?: string; //5.2.0
      /** collapse properties for parent grouped columns */
      collapsible?: {
        /**last child of grouped column is visible instead of first column in collapsed state. */
        last?: boolean;
        /**true when collapsed, false when expanded */
        on?: boolean;
      };
      /** nesting of colModel used for grouping of columns */
      colModel?: colModel;
      /** When set to false, this option prevents a column from being copied to the clipboard or exported data */
      copy?: boolean;
      /** fieldname used for data binding */
      dataIndx?: string | number;
      /** data type of the column "bool" | "date" | "float" | "html" | "integer" | "string" | "stringi" */
      dataType?: string;
      deFormat?: ((any) => any); //5.3.0
      /**deny actions in toolPanel */
      denyAgg?: boolean;
      denyGroup?: boolean;
      denyPivot?: boolean;
      /** controls editability of whole column */
      editable?: boolean | ((evt, ui: cellObject) => boolean);
      /** editing behaviour for a column and it overrides the global editModel properties. */
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
        //cache?: boolean
        cls?: string;
        //condition?: string | ((val: any, match: any) => boolean)
        //condition?: string //5.2.0
        conditionExclude?: Array<string>;//5.2.0
        conditionList?: Array<string>;//5.2.0
        conditions?: {//5.2.0
          [condition: string]: {
            compare: (cellData, value, value2) => boolean;
          };
        };
        crules?: Array<crule>;//5.2.0
        diExtra?: Array<string>; //5.3.0
        dpOptions?: object; //5.2.0
        dpOptions2?: object; //5.2.0
        format?: string | ((any) => any); //5.3.0
        gridOptions?: object; //5.2.0
        groupIndx?: numberorstring;
        init?: (ui: any) => any;
        labelIndx?: numberorstring;
        listener?: any;
        listeners?: any[];

        maxCheck?: number; //5.3.0

        menuIcon?: boolean; //5.2.0
        mode?: string; //5.2.0

        //type?: string
        //subtype?: string
        //prepend?: any
        options?: any | any[];
        selectGridCreated?: (ui: object) => void; //5.2.0
        selectGridObj?: (ui: object) => void; //5.3.0
        style?: string;
        //value?: any
        //value2?: any
        valueIndx?: numberorstring;
      };
      filterFn?: (ui: object) => object; //5.2.0
      format?: string | ((any) => any); //5.3.0: callback
      formatRaw?: string; //5.3.0
      formula?: (ui: {rowData: any;}) => any;
      groupable?: boolean;
      groupChange?: ((val: string) => string);
      halign?: "left" | "center" | "right";
      hidden?: boolean;
      //7.0
      hvalign?: "top" | "center" | "bottom";
      maxWidth?: string | number;

      menuIcon?: boolean; //5.2.0
      menuUI?: any; //5.2.0

      menuInClose?: boolean; //5.2.0
      menuInDisable?: boolean; //5.2.0
      menuInHide?: boolean; //5.2.0

      minWidth?: string | number;
      nodrag?: boolean;
      nodrop?: boolean;
      parent?: column;
      pivotSortFn?: ((a: object, b: object) => number); //5.4.0
      //v7.0.0
      /*prop?: {
          align?: string
          valign?: string
      }*/
      postRender?: (string | ((ui: cellObject) => void));
      render?: (string | ((ui: renderObj) => string | {
        attr?: string;
        cls?: string;
        style?: string;
        text?: string;
      }));
      //v7.0.0
      /*renderHead?: ((ui: renderObj) => string | {
          attr?: string
          cls?: string
          style?: string
          text?: string
      })*/
      renderLabel?: ((ui: renderObj) => string | void); //5.3.0
      resizable?: boolean;
      showifOpen?: boolean; //5.3.0
      sortable?: boolean;
      sortType?: ((rowData1: any, rowData2: any, dataIndx: any) => number);

      style?: object;//7.0
      styleHead?: object; //7.0

      summary?: {
        edit?: boolean;
        /** "avg" | "count" | "min" | "max" | "sum" | "stdev" | "stdevp" */
        type?: string;
      };
      title?: string | ((ui: any) => string);
      tpCls?: string;
      tpHide?: boolean;
      type?: string;
      useLabel?: boolean; //5.3.0
      validations?: Array<{
        icon?: string;
        type: any;
        value?: any;
        msg?: string;
        warn?: boolean;
      }>;
      //7.0
      valign?: "top" | "center" | "bottom";
      width?: number | string;
    }

    type filterModel = {
      //clear?: boolean
      header?: boolean;
      hideRows?: boolean; //6.2.0
      menuIcon?: boolean; //5.2.0
      mode?: "AND" | "OR";
      on?: boolean;
      timeout?: number;
      type?: 'local' | 'remote';
    };

    interface editorObj
    {
      type?: any;
      init?: ((ui: any) => any);
      prepend?: any;
      options?: any[];
      labelIndx?: string | number;
      valueIndx?: string | number;
      groupIndx?: string | number;
      dataMap?: any[];
      mapIndices?: any;
      getData?: ((ui) => any);
      cls?: string;
      select?: boolean;
      style?: string;
      attr?: string;
    }
    interface rowObject
    {
      rowData?: any;
      rowIndx?: number;
      rowIndxPage?: number;
    }
    interface colObject
    {
      colIndx?: number;
      column?: column;
      dataIndx?: string | number;
    }
    interface cellObject extends rowObject, colObject
    {
    }
    interface renderObj extends cellObject
    {
      cellData: any;
      Export: boolean;
      formatVal: string;
    }
    interface pageModel
    {
      bubble?: boolean;
      curPage?: number;
      format?: string; //7.4.0
      layout?: Array<string>; //5.2.0
      rPPOptions?: Array<number> | Array<object>; //7.4.0
      rPP?: number;
      strDisplay?: string;
      totalPages?: number;
      trigger?: boolean;
      type?: string;
    }

    interface Drag
    {
      addAcceptIcon ();
      addIcon (icon: string);
      addRejectIcon ();
      getUI ():
        {
          nodes: Array<any>;
          rowData: any;
          rowIndx: number;
        };
      grid (): pq.gridT.instance;
      over ();
      out ();
    }

    interface groupModel
    {
      agg?: object;
      cascade?: boolean; //5.2.0
      cbId?: numberorstring; //5.2.0
      checkbox?: boolean; //5.2.0
      checkboxHead?: boolean; //5.2.0
      collapsed?: Array<boolean>;
      dataIndx?: Array<string | number>;
      //dir?: Array<string>
      fixCols?: boolean;
      grandSummary?: boolean;
      groupCols?: Array<string | boolean>;
      header?: boolean;
      headerMenu?: Array<string>;
      icon?: Array<string>;
      ignoreCase?: boolean;
      indent?: number;
      maxCheck?: number; //5.3.0
      menuItems?: Array<string>;
      merge?: boolean;
      on?: boolean;
      pivot?: boolean;
      pivotColsTotal?: string; //5.4.0 ("after" | "before" | "hideifOpen" | "")
      pivotTotalForSingle?: boolean; //5.6.0
      select?: boolean; //5.2.0
      separator?: string; //6.0.0
      showSummary?: Array<boolean>;
      skipSingleSummary?: boolean; //7.0
      source?: 'checkboxGroup';
      nodeClose?: object; //7.2
      summaryEdit?: boolean;
      summaryInTitleRow?: string;
      title?: any[];
      titleDefault?: string;
      titleIndx?: string; //7.0
      titleInFirstCol?: boolean;
      useLabel?: boolean; //5.3.0
    }
    interface sortModel
    {
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
    interface toolPanel
    {
      hideAggPane?: boolean;
      hideColPane?: boolean;//show when pivot mode is true, hide otherwise, never show when it's false.
      hidePivotChkBox?: boolean;
      hideRowPane?: boolean;
      show?: boolean;
    }
    interface dataModel
    {
      beforeSend?: ((jqXHR, settings) => void);
      contentType?: string;
      data?: Object[];
      /** read only. */
      dataUF?: Object[];
      dataType?: string;
      error?: ((jqXHR, textStatus, errorThrown) => void);
      getData?: (response, textStatus, jqXHR) => {
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
      /** "local" | "remote"*/
      location?: string;
      method?: string;
      postData?: any;
      postDataOnce?: any;
      recIndx?: numberorstring;
      url?: string;
    }

    type citem = {
      action?: ((evt, ui, citem: citem) => boolean | void);
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

    //6.0.0
    type contextMenu = {
      on?: boolean;
      head?: boolean; //7.2.0: ignored.
      init?: (evt, ui) => void;
      cellItems?: itemX[] | ((evt, ui) => itemX[]); //7.2.0
      headItems?: itemX[] | ((evt, ui) => itemX[]); //7.2.0
      imgItems?: itemX[] | ((evt, ui) => itemX[]); //7.2.0
      items?: itemX[] | ((evt, ui) => itemX[]); //7.2.0: updated
      miscItems?: itemX[] | ((evt, ui) => itemX[]); //7.2.0
    };

    /*******************************options **************************************************/

    interface options
    {
      animModel?: { //5.5.0
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
        css?: any;
        collapsed?: boolean;
        on?: boolean;
        toggle?: boolean;
        toggled?: boolean; //7.4.0
      };
      colModel?: colModel;
      columnBorders?: boolean;
      /**common properties for all leaf columns. */
      columnTemplate?: column;
      //6.0.0
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
      //6.0.0
      dragModel?: {
        on?: boolean;
        clsDnD?: string;
        clsNode?: string,//7.4
        contentHelper?: ((diHelper: Array<string>, dragItems: Array<any>) => string);
        cssHelper?: any; //object of css properties applied to helper.
        diDrag?: numberorstring;
        diHelper?: Array<string>;
        dragNodes?: ((rd: any, evt: any) => Array<any>);
        iconAccept?: string;
        iconReject?: string;
        isDraggable?: (ui: any) => boolean;
        options?: any;
        tmplDrag?: string; //template for normal cells.
        tmplDragN?: string; //template for number cell.
        tmplHelper?: string;
      };
      //6.0.0
      dropModel?: {
        accept?: string;
        clsParent?: string; //7.4
        divider?: number; //7.4
        drop?: (evt: any, ui: any) => void;
        isDroppable?: (evt: any, ui: any) => (void | boolean);
        on?: boolean;
        options?: any;
      };
      editable?: boolean | ((ui: rowObject) => boolean);
      editModel?: {
        addDisableCls?: boolean; //7.0
        //cellBorderWidth?: number
        clicksToEdit?: number;
        pressToEdit?: boolean;
        filterKeys?: boolean;
        keyUpDown?: boolean;
        saveKey?: any;
        onSave?: 'nextFocus' | 'nextEdit' | 'downFocus' | '', //7.3.0:downFocus
        onTab?: 'nextFocus' | 'nextEdit' | 'downFocus' | '', //7.3.0:downFocus
        onBlur?: 'validate' | 'save' | '',
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
      formulas?: Array<[number | string, (rowData: any, column: column) => any]>,
      formulasModel?: {
        on?: boolean;
      };
      freezeBorders?: boolean;
      freezeCols?: number;
      freezeRows?: number;
      groupModel?: groupModel;
      /** height of grid can be number in pixels e.g., 500, as string e.g., '50%-10', or 'flex'   */
      height?: numberorstring;
      hoverMode?: string;
      hwrap?: boolean;
      locale?: string; //6.1.0
      maxHeight?: numberorstring;
      maxWidth?: numberorstring;

      menuIcon?: boolean; //5.2.0
      menuUI?: {//5.2.0
        buttons?: Array<string>; //['clear', 'ok']
        gridOptions?: any;
        singleFilter?: boolean;
        popupOptions?: any;
        tabs?: Array<string>; //['hideCols', 'filter']
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
        /**merged cells are wrapped in div when false */
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
        /**replace, append or prepend */
        type?: string;
      };
      //7.2.0
      pics?: Array<{
        name?: string;
        src: string;
        from: [number, number, number, number];
        to?: [number, number, number, number];
        cx?: number;
        cy?: number;
      }>;
      postRenderInterval?: number;
      reactive?: boolean; //6.1.0
      resizable?: boolean;
      realFocus?: boolean;
      roundCorners?: boolean;
      rowBorders?: boolean;
      rowHt?: number;
      rowHtHead?: number;
      rowHtSum?: number;
      rowInit?: (ui: rowObject) => void | {
        attr?: string;
        style?: string;
        cls?: string;
      };
      rowResize?: boolean; //7.4
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

      stateColKeys?: object; //5.4.0
      stateKeys?: object; //5.4.0

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
          attr?: string;
          attrFile?: string; //7.2
          cls?: string;
          icon?: string; //can also be used with type:file(7.2)
          init?: (ele: any) => void;//7.1
          label?: string;
          listener?: any;
          options?: any[] | any;
          listeners?: any[];
          style?: string;
          type: string;
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
      treeModel?: {
        childstr?: string;
        dataIndx?: numberorstring;
        format?: string;
        historyAdd?: boolean; //7.4
        historyDelete?: boolean; //7.4
        historyMove?: boolean; //7.4
        iconCollapse?: string[];
        iconFolder?: string[];
        iconFile?: string;
        icons?: boolean;
        id?: string;
        indent?: number;
        leafIfEmpty?: boolean; //7.4
        parentId?: string;
        render?: (ui: object) => any;
        nodeClose?: object; //7.2
        summary?: boolean;

        cascade?: boolean;
        cbId?: string;
        checkbox?: boolean | ((node: any) => boolean);
        checkboxHead?: boolean;
        maxCheck?: number;
        select?: boolean;
        useLabel?: boolean;
      };
      virtualX?: boolean;
      virtualY?: boolean;
      warning?: {
        icon?: string;
        cls?: string;
        style?: string;
      };
      /** height of grid can be number in pixels e.g., 500, as string e.g., '50%-10', or 'flex'   */
      width?: numberorstring;
      wrap?: boolean;


      //#################################inline Events------------

      beforeCellKeyDown?: (evt, ui) => boolean | void;
      beforeCheck?: (evt, ui) => boolean | void;

      beforeColAdd?: (evt, ui) => boolean | void; //7.0
      beforeColMove?: (evt, ui) => boolean | void; //7.1
      beforeColRemove?: (evt, ui) => boolean | void; //7.0
      beforeColumnCollapse?: (evt, ui) => boolean | void;
      beforeColumnOrder?: (evt, ui) => boolean | void; //5.5.0

      beforeExport?: (evt, ui) => boolean | void;
      beforeFillHandle?: (evt, ui) => boolean | void;
      beforeFilter?: (evt, ui) => boolean | void;
      beforeGroupExpand?: (evt, ui) => boolean | void;
      beforeHideCols?: (evt, ui: { //5.2.0
        diHide?: Array<numberorstring>;
        diShow?: Array<numberorstring>;
      }) => boolean | void;
      beforePaste?: (evt, ui) => boolean | void;
      beforeRowExpand?: (evt, ui) => boolean | void; //5.5.0: updated
      beforeRowSelect?: (evt, ui) => boolean | void;
      beforeSort?: (evt, ui) => boolean | void;
      beforeTableView?: (evt, ui) => boolean | void;
      beforeTreeExpand?: (evt, ui) => boolean | void;
      beforeValidate?: (evt, ui) => boolean | void;
      cellBeforeSave?: (evt, ui) => boolean | void;
      cellClick?: (evt, ui) => any;
      cellDblClick?: (evt, ui) => any;
      cellKeyDown?: (evt, ui) => any;
      cellRightClick?: (evt, ui) => any; //6.0.0: updated to include number cells, 7.2.0: deprecated
      cellSave?: (evt, ui) => any;
      change?: (evt, ui) => any;
      check?: (evt, ui) => any;

      colAdd?: (evt, ui) => any; //7.0
      colMove?: (evt, ui) => any; //7.1
      colRemove?: (evt, ui) => any; //7.0
      columnCollapse?: (evt, ui) => any;
      columnDrag?: (evt, ui) => any;
      columnOrder?: (evt: Object, ui: Object) => void | boolean;
      columnResize?: (evt, ui) => any;

      /**event fired when grid data binding and view is complete. */
      complete?: (evt: Object, ui: Object) => void | boolean;
      context?: (evt, ui) => any; //7.2.0
      create?: (evt, ui) => any;
      customSort?: (evt, ui) => any;
      dataReady?: (evt, ui) => any;
      destroy?: (evt, ui) => any;
      editorBegin?: (evt, ui) => any;
      editorBlur?: (evt, ui) => any;
      editorEnd?: (evt, ui) => any;
      editorFocus?: (evt, ui) => any;
      editorKeyDown?: (evt, ui) => any;
      editorKeyPress?: (evt, ui) => any;
      editorKeyUp?: (evt, ui) => any;
      exportData?: (evt, ui) => any;

      //exportExcel?: (evt, ui) => any

      filter?: (evt, ui) => any;
      group?: (evt, ui) => any;
      groupChange?: (evt, ui) => any;
      groupData?: (evt, ui) => any;
      groupHideRows?: (evt, ui) => any; //7.2.0
      groupOption?: (evt, ui) => any;
      headerCellClick?: (evt, ui) => any;
      headRightClick?: (evt, ui) => any; //6.0.0, 7.2.0: deprecated
      hideCols?: (evt, ui: { //5.2.0
        diHide?: Array<numberorstring>;
        diShow?: Array<numberorstring>;
      }) => void;
      history?: (evt, ui: {
        canUndo: boolean;
        canRedo: boolean;
        type: string;
        num_undo: number;
        num_redo: number;
      }) => any;
      load?: ((evt, ui) => void);
      moveNode?: ((evt, ui) => void); //6.0.0
      pivotCM?: ((evt, ui) => void); //5.3.0

      /**event fired whenever grid is refreshed */
      refresh?: (evt, ui) => void | boolean;

      refreshHeader?: (evt, ui) => any;
      refreshRow?: (evt, ui: rowObject) => any;
      render?: (evt, ui) => any;
      rowClick?: (evt, ui: rowObject) => any;
      rowDblClick?: (evt, ui: rowObject) => any;
      //rowRightClick?: (evt, ui: rowObject) => any //6.0.0: deprecated, 7.2.0: removed.
      rowSelect?: (evt: Object, ui: any) => void;
      scroll?: (evt: Object, ui: any) => void;
      scrollStop?: (evt: Object, ui: any) => void;
      selectChange?: (evt: any, ui: {selection: any;}) => any;
      selectEnd?: (evt, ui: {selection: any;}) => any;
      selectGridCreated?: (evt, ui: object) => void; //5.2.0
      sort?: (evt, ui: {
        dataIndx: numberorstring;
        single: boolean;
        oldSorter: any[];
        sorter: any[];
      }) => any;
      toggle?: (evt, ui: {state: string;}) => any;
      treeExpand?: (evt, ui: any) => any;
      workbookReady?: (evt, ui: {workbook: workbook;}) => any;
    }
    interface objRange
    {
      r1?: number;
      c1?: number;
      r2?: number;
      c2?: number;
      rc?: number;
      cc?: number;
    }
    interface Range
    {
      address (): Array<objRange>;
      addressLast (): objRange;
      add (obj?: objRange);
      align (str?: string): string; //v7.0.0
      clear ();
      comment (text?: string): string; //v7.0.0
      copy (obj?: {
        dest?: objRange;
        render?: boolean;
        header?: boolean; //7.3.0
      });
      count (): number;
      cut (obj?: {
        dest?: objRange;
        render?: boolean;
        header?: boolean; //7.3.0
      });
      enable (enable?: boolean): boolean; //v7.0.0
      //getStyle(key: string): string //v7.0.0
      indexOf (obj?: objRange): number;
      merge ();
      pic (file: any, x?: number, y?: number); //7.2.0
      select ();
      style (key: string, val?: string): string; //v7.0.0
      toggleStyle (key: string, val: any[]); //v7.0.0
      unmerge ();
      valign (str?: string): string; //v7.0.0
      value (val?: any[]): any[];
    }
    interface Selection extends Range
    {
      getSelection (): cellObject[];
      isSelected (obj: {rowIndx: number, colIndx?: number, dataIndx?: numberorstring;}): boolean;
      removeAll ();
      selectAll (obj?: {all: boolean;});
    }

    interface wsStyle
    {
      /**left, center, right */
      align?: string;
      /**background color with hexadecimal 6 digit format i.e., ff0000 for red */
      bgColor?: string;
      bold?: boolean;
      //v7.0.0
      border?: {
        /**same as css style e.g., "1px solid #ff0000" */
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
      };
      /**text color with hexadecimal 6 digit format i.e., ff0000 for red */
      color?: string;
      //v7.0.0
      comment?: string;
      italic?: boolean;
      /**font family */
      font?: string;
      fontSize?: number;
      underline?: boolean;
      /** top, center, bottom  */
      valign?: string;
      wrap?: boolean;
    }
    interface worksheetCell extends wsStyle
    {
      /**dataIndx of cell while export of grid */
      dataIndx?: string | number;
      /**Zero based index of cell*/
      indx?: number;
      /**Excel format string for numbers, dates */
      format?: string;
      /**formula without leading = sign */
      formula?: string;
      value?: any;
    }
    interface worksheetColumn extends wsStyle
    {
      hidden?: boolean;
      width?: number;
      /**Zero based index of column*/
      indx?: number;
    }
    /*interface wsBorder{
        color: string
        style: string
        width: string
    }*/
    interface worksheetRow extends wsStyle
    {
      /**Zero based index of row*/
      indx?: number;
      cells: worksheetCell[];
      hidden?: boolean;
    }
    interface worksheet
    {
      name?: string;
      columns?: worksheetColumn[];
      frozenRows?: number;
      frozenCols?: number;
      mergeCells?: string[];
      /**number of header rows in rows. */
      headerRows?: number;
      rows: worksheetRow[];
    }
    interface workbook
    {
      sheets?: worksheet[];
    }
    interface Checkbox
    {
      checkAll ();
      checkNodes (nodes: any[]);
      getCheckedNodes (all?: boolean): any[];
      isHeadChecked (): boolean | null;
      unCheckAll ();
      unCheckNodes (nodes: any[]);
    }

    interface Columns
    {
      add (columns: Array<column>, ci?: number, cm?: colModel, source?: string): void; //7.0
      alter (callback: () => any);
      each (callback: (column) => any, cm?: colModel);
      find (callback: (column) => boolean, cm?: colModel): column;
      hide (ui: {diHide?: Array<string>, diShow?: Array<string>;});//5.2.0
      move (num: number, fromindx: number, toindx: number, fromParent?: column, toParent?: column, source?: string): column[];//7.1
      reduce (callback: (column) => object | void, cm?: colModel): colModel; //5.3.0
      remove (num: number, ci: number, cm?: colModel, source?: string): void; //7.0
      reverse (): void; //6.2.0
    }

    interface History
    {
      canRedo (): boolean;
      canUndo (): boolean;
      redo ();
      reset ();
      undo ();
    }

    //7.2
    interface Formulas
    {
      exec (string): numberorstring;
    }

    //7.2
    interface Pic
    {
      add (name: string, src: string, from: [number, number, number, number], to?: [number, number, number, number], cx?: number, cy?: number);
      getId (img: any): number;
      remove (id: number);
    }

    interface SelectRow
    {
      add (obj: {rowIndx?: number, isFirst?: boolean, rows?: {rowIndx?: number, rowIndxPage?: number;}[];});
      extend (obj: {rowIndx: number;});
      getFirst (): number;
      getSelection (): rowObject[];
      isSelected (rowObject: rowObject): boolean;
      remove (obj: {rowIndx?: number, rows?: {rowIndx?: number, rowIndxPage?: number;}[];});
      removeAll (obj?: {all: boolean;});
      replace (obj: {rowIndx?: number, isFirst?: boolean, rows?: {rowIndx?: number, rowIndxPage?: number;}[];});//5.4.0
      selectAll (obj?: {all: boolean;});
      setFirst (rowIndx: number);
      toggle (obj: {rowIndx: number, isFirst?: boolean;});
      toRange (): Range;
    }

    interface Group
    {
      addGroup (datIndx: numberorstring, indx?: number);
      addNodes (nodes: any[], parent: any, indx?: number); //6.0.0
      checkAll ();//5.2.0
      checkNodes (nodes: any[]);//5.2.0
      collapse (level?: number);
      collapseAll (level?: number);
      collapseTo (address: string);
      deleteNodes (nodes: any[]); //6.0.0
      expand (level?: number);
      expandAll (level?: number);
      expandTo (address: string);
      getCheckedNodes (all?: boolean): any[];//5.2.0
      getChildren (node: any): any[]; //6.0.0
      getChildrenAll (node: any): any[]; //6.0.0
      getNode (id: numberorstring): any; //6.0.0
      getParent (node: any): any; //6.0.0
      getSummary (node: any): any; //6.0.0
      isAncestor (childNode: any, ancestorNode: any): boolean; //6.0.0
      isFolder (any): boolean; //6.0.0
      isHeadChecked (): boolean | null;//5.2.0
      moveNodes (nodes: any[], parent: any, indx?: number); //6.0.0
      option (options: any);
      removeGroup (datIndx: numberorstring);
      unCheckAll ();//5.2.0
      unCheckNodes (nodes: any[]);//5.2.0
    }

    interface Tree
    {
      addNodes (nodes: any[], parent?: any, indx?: number); //6.0.0, updated.
      checkAll ();//5.2.0
      checkNodes (nodes: any[]);
      collapseAll ();
      collapseNodes (nodes: any[]);
      deleteNodes (nodes: any[]);//5.2.0
      eachChild (node: any, cb: ((node: any, parent: any) => void)); //7.4.0: parent added
      eachParent (node: any, cb: ((node: any) => void));
      expandAll ();
      expandNodes (nodes: any[]);
      expandTo (node: any);
      getCheckedNodes (all?: boolean): any[];
      getChildren (node?: any): any[]; //6.0.0, 7.4.0: node optional
      getChildrenAll (node: any): any[]; //6.0.0
      getLevel (node: any): number;
      getNode (id: numberorstring): any;
      getParent (node: any): any;
      getRoots (): any[];
      getSummary (node: any): any; //6.0.0
      isAncestor (childNode: any, ancestorNode: any): boolean; //6.0.0
      isCollapsed (node: any): boolean;
      isFolder (node: any): boolean;
      isHeadChecked (): boolean | null;//5.2.0
      moveNodes (nodes: any[], parent?: any, indx?: number); //6.0.0, 7.4.0 parent optional
      option (options: any);
      unCheckAll ();//5.2.0
      unCheckNodes (nodes: any[]);
      updateId (node: any, id: numberorstring); //7.4.0
    }

    /******************************************grid methods ***************/
    interface instance
    {

      addClass (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx?: string | number,
        cls: string,
        refresh?: boolean;
      });

      addNodes (nodes: any[], rowIndx?: number);//6.0.0

      addRow (obj: {
        newRow?: any,
        //rowData?: any,
        rowIndx?: number,
        //rowIndxPage?: number,
        rowList?: any[],
        track?: boolean,
        source?: string,
        history?: boolean,
        checkEditable?: boolean,
        refresh?: boolean;
      });

      attr (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx: string | number,
        attr: string;
      });

      canPaste (): boolean; //6.0.0

      //5.2.0
      Checkbox (dataIndx: numberorstring): Checkbox;

      clearPaste (); //6.0.0

      collapse ();

      Columns (): Columns;

      commit (obj?: {
        type?: string,
        rows?: any[];
      });

      copy (obj?: any);

      createTable (obj: {
        $cont: JQuery,
        data: any[];
      });
      data (obj: {
        rowData,
        rowIndx,
        dataIndx,
        data;
      });

      cut (obj?: any);

      deleteNodes (nodes: any[]);//6.0.0

      deleteRow (obj: {
        rowIndx?: number,
        rowData?: any, //6.0.0
        rowList?: any[],
        track?: boolean,
        source?: string,
        history?: boolean,
        refresh?: boolean;
      });

      destroy ();

      disable ();

      //6.0.0
      Drag (): Drag;

      enable ();

      editCell (obj: cellObject);

      editFirstCellInRow (obj: {rowIndx: number;});

      expand ();

      exportData (options: {
        /**String of css rules applicable to Html format. */
        cssRules?: string,
        /**Name of file without extension. */
        filename?: string,
        /**csv, xlsx, json or htm  */
        format?: string,
        /**non-json export: exclude header in export. */
        noheader?: boolean,
        /**json export: exclude pq_ related meta data. */
        nopqdata?: boolean,
        /**json export: skip formatting of exported data. */
        nopretty?: boolean,
        /**include rendered cells. */
        render?: boolean,
        /**Excel export: replace unwanted characters. */
        replace?: [any, string], //6.2.4
        /**Excel sheet name. */
        sheetName?: string,
        /**Applicable to htm format. Title of html page. */
        title?: string,
        /**Excel export: maps to type parameter of jsZip generate method.*/
        type?: string;
        /**Absolute or relative url where grid posts the data to be returned back by server as a download file. The data is not posted when url is not provided. */
        url?: string,
        /**Excel export: generate intermediate json workbook instead of final Excel file. */
        workbook?: boolean;
        /**Applicable to non-xlsx format. Set it true to reduce the size of download file by compressing it. */
        zip?: boolean;
      }): string | Blob;

      exportExcel (option?: any);

      filter (obj: {
        /** 'AND' or 'OR' */
        mode?: string;
        /** 'add', 'remove' or 'replace' */
        oper?: string,
        rules?: Array<rule>,
        rule?: rule,
        data?: any[];
      }): any[];

      flex (obj?: {
        dataIndx?: Array<numberorstring>, colIndx?: Array<number>;
      });

      focus (obj?: {
        rowIndxPage: number,
        colIndx: number;
      });

      Formulas (): Formulas; //7.2.0

      getCell (obj: {
        dataIndx?: numberorstring,
        colIndx?: number;
        rowIndx?: number;
        rowIndxPage?: number;
        vci?: number; //5.4.0
      }): JQuery;

      //5.4.0
      getCellFilter (obj: {
        dataIndx?: numberorstring,
        colIndx?: number;
        vci?: number;
      }): JQuery;

      getCellHeader (obj: {
        dataIndx?: numberorstring,
        colIndx?: number;
        ri?: number; //5.4.0
        vci?: number; //5.4.0
      }): JQuery;

      getCellsByClass (obj: {
        cls: string;
      }): Array<cellObject>;

      getCellIndices ({
        $td: JQuery
      }): cellObject;

      getChanges (obj?: {
        /** 'byVal', 'raw' or null. */
        format?: string,
        /** Applicable only when format is 'byVal', it returns all fields in updateList when true. */
        all?: boolean;
      }):
          {
            addList: any[];
            deleteList: any[];
            oldList: any[];
            updateList: any[];
          };

      getColIndx (obj: {
        dataIndx?: string | number;
        column?: any;
      }): number;

      getColumn (obj: {
        dataIndx?: numberorstring;
        colIndx?: number;
      }): any;

      /** Array of leaf level columns */
      getColModel (): any[];

      getCMPrimary (): any[]; //5.4.0

      /**returns filtered data concatenated with unfiltered data when no params are passed*/
      getData (obj?: {
        dataIndx?: Array<numberorstring>;
        data?: any[];
      }): any[];

      //5.2.0
      getDataCascade (dataIndx: numberorstring, groupIndx?: numberorstring): Array<{
        [dataIndx: string]: any;
      }>;

      getEditCell ():
        {
          $td: JQuery;
          $cell: JQuery;
          $editor: JQuery;
        };

      getEditCellData (): any;

      getInstance ():
        {
          grid: instance;
        };

      //7.2.0
      getHeadIndices (th: any):
        {
          ri: number;
          column: column;
          colIndx: number;
          filterRow: boolean;
        };

      getRecId (obj: rowObject): any;

      getRow (obj: {
        rowIndx?: number;
        rowIndxPage?: number;
      }): JQuery;

      getRowData (obj: {
        rowIndx?: number,
        rowIndxPage?: number,
        recId?: number,
        rowData?: any;
      }): any;

      getRowIndx (obj: {
        $tr?: JQuery;
        rowData?: any;
      }): number;

      getRowsByClass (obj: {cls: string;}): any[];

      getState (): string; //6.0.0

      getViewPortIndx ():
        {
          initV: number,
          finalV: number;
          initH: number;
          finalH: number;
        };
      /** rowIndx of row ( 0 based ) or page number ( 1 based ) */
      goToPage (obj: {rowIndx?: number, page?: number;});

      Group (params?: any): Group;
      //groupOption(obj: any)

      hasClass (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx?: numberorstring,
        cls: string;
      }): boolean;

      hideLoading ();

      //history(obj: { method: string } )
      History (): History;

      hscrollbar (): any;

      /**imports workbook into grid */
      importWb (obj: {
        workbook: workbook,
        /**either specify sheet (name or 0 based index) or the 1st sheet is imported. */
        sheet?: number | string,
        extraRows?: number,
        extraCols?: number,
        keepCM?: boolean,
        /**index of header row. */
        headerRowIndx?: number;
      });

      instance (): instance;

      isDirty (obj?: {
        rowIndx?: number,
        rowData?: any;
      }): boolean;

      isEditableCell (obj: {
        rowIndx?: number,
        dataIndx?: numberorstring;
      }): boolean;

      isEditableRow (obj: {rowIndx: number;}): boolean;

      isValid (obj: {
        rowData?: any;
        rowIndx?: number,
        dataIndx?: numberorstring,
        value?: any,
        data?: any[],
        allowInvalid?: boolean,
        focusInvalid?: boolean;
      }):
          {
            valid: boolean,
            msg: string,
            cells: {
              dataIndx: string | number;
              column: column;
              rowData: any;
            }[];
          };

      isValidChange (obj: {
        allowInvalid?: boolean;
        focusInvalid?: boolean;
      }):
          {
            valid: boolean,
            cells: {
              dataIndx: string | number;
              column: column;
              rowData: any;
            }[];
          };

      loadState (obj: {
        state?: string,
        refresh?: boolean;
      }): boolean;

      moveNodes (nodes: any[], rowIndx?: number);//6.0.0

      off (event: string, fn?: ((evt, ui) => any));

      on (event: string, fn: ((evt, ui) => any));

      one (event: string, fn: ((evt, ui) => any));

      option (): any;

      option (name: String): any;

      option (name: string, value: any);

      option (obj: any);

      pageData (): any[];

      pager (): any;

      parent (): instance;

      paste ();

      Pic (): Pic; //7.2.0

      quitEditMode ();

      //Range(obj: objRange): rangeInstance
      Range (obj: objRange): Range;


      /** refresh the grid. */
      refresh (options?: any);

      refreshCell (obj: cellObject);

      refreshCM (colModel?: colModel);

      refreshColumn (obj: cellObject);

      refreshDataAndView ();

      refreshHeader ();

      refreshHeaderFilter (obj: {colIndx?: number, dataIndx?: numberorstring;});

      refreshRow (obj: rowObject);

      refreshToolbar ();

      /** superset of grid refresh.*/
      refreshView ();

      removeAttr (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx?: numberorstring,
        colIndx?: number;
        attr: any;
      });

      removeClass (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx?: numberorstring,
        colIndx?: number;
        cls: string,
        refresh?: boolean;
      });

      removeData (obj: {
        rowData?: any,
        rowIndx?: number,
        dataIndx?: numberorstring,
        colIndx?: number;
        data: any;
      });

      reset (obj: {
        filter?: boolean,
        group?: boolean,
        sort?: boolean;
      });

      rollback (obj?: {type?: string;});

      rowCollapse (obj: {rowIndx?: number, rowIndxPage?: number;});

      rowExpand (obj: {rowIndx?: number, rowIndxPage?: number;});

      rowInvalidate (obj: {rowIndx?: number, rowIndxPage?: number;});

      saveEditCell (): boolean;

      saveState (obj: {extra?: object, save?: boolean, stringify?: boolean;}): string; //7.3.0: extra parameter

      scrollCell (obj: {colIndx?: number, dataIndx?: numberorstring, rowIndxPage?: number, rowIndx?: number;}, fn?: () => void);

      scrollColumn (obj: {colIndx?: number, dataIndx?: numberorstring;}, fn?: () => void);

      scrollRow (obj: {rowIndxPage?: number, rowIndx?: number;}, fn?: () => void);

      scrollX (x?: number, fn?: () => void): number | void;
      scrollY (y?: number, fn?: () => void): number | void;
      scrollXY (x: number, y: number, fn?: () => void);

      search (obj: {row: any, first?: boolean;}): Array<{
        rowIndx: number;
        rowIndxPage: number;
      }>;

      Selection (): Selection;

      SelectRow (): SelectRow;

      setSelection (obj: {
        rowIndx?: number,
        rowIndxPage?: number,
        colIndx?: number,
        focus?: boolean;
      }, fn?: () => void);

      showLoading ();

      sort (obj?: {single?: boolean, sorter?: any[];});

      toggle ();

      toolbar ();

      ToolPanel ():
        {
          hide ();
          isVisible (): boolean;
          show ();
          toggle ();
        };

      Tree (): Tree;

      updateRow (obj: {
        rowIndx?: number,
        newRow?: any,
        rowList?: any[],
        track?: boolean,
        source?: string,
        history?: boolean,
        checkEditable?: boolean,
        allowInvalid?: boolean;
        refresh?: boolean;
      });

      vscrollbar ();

      widget (): JQuery;
    }

  }

  function escapeHtml (str: string): string;

  /** create pqgrid plugin.  */
  function grid (selector: string | JQuery, options: gridT.options): gridT.instance;

  function deFormatNumber (val: string, format: string): number;
  function formatNumber (val: number, format: string): string;

  function toLetter (indx: number): string;

  namespace aggregate
  {
    function avg (arr: any[], col?: any): number;
    function count (arr: any[], col?: any): number;
    function max (arr: any[], col?: any): number;
    function min (arr: any[], col?: any): number;
    function sum (arr: any[], col?: any): number;
    function stdev (arr: any[], col?: any): number;
    function stdevp (arr: any[], col?: any): number;
  }
  namespace excel
  {
    /**exports js workbook to xlsx format. */
    function exportWb (obj: {
      workbook: gridT.workbook,
      url?: string,
      type?: string;
    }): string | Blob;
    function eachCell (
      collection: Array<gridT.worksheet | gridT.worksheetRow>,
      fn: ((cell: gridT.worksheetCell) => void)
    );
    /**import xlsx into js workbook */
    function importXl (obj: {
      /**File object */
      file?: File,
      /**Blob data of Excel file. */
      content?: any,
      /** specify index numbers or names of sheet to be imported, otherwise all sheets are imported. */
      sheets?: Array<number | string>,
      /** type of content used by jsZip. */
      type?: string,
      /**remote url from where Excel file is to be imported */
      url?: string;
    },
      /**callback function to process the workbook. */
      fn: (wb: gridT.workbook) => void);
    function getArray (ws: gridT.worksheet): any[];
    function getCsv (ws: gridT.worksheet): string;
  }
  namespace excelImport
  {
    function attr (str: string): any;
  }
}