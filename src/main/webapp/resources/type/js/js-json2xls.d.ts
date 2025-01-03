import express = require("express");

declare const XLS: any;

declare function json2xls (json: any, options?: json2xls.Config): Buffer;
declare namespace json2xls {
  interface Config {
    fields?: Record<string, string> | string[] | undefined;
    style?: string | undefined;
  }
  function middleware (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void;
}