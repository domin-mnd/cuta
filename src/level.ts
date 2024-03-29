import {
  type Ansis,
  cyan,
  green,
  red,
  yellow,
  blue,
  magenta,
  gray,
  white,
  black,
  redBright,
} from "ansis";

export enum LogLevel {
  Log = "LOG",
  Info = "INFO",
  Error = "ERROR",
  Warn = "WARN",
  Debug = "DEBUG",
  Trace = "TRACE",
  Count = "COUNT",
  Timer = "TIMER",
  Dir = "DIR",
  DirXML = "DIRXML",
  Group = "GROUP",
}

export const colors: Record<LogLevel, Ansis> = {
  LOG: cyan,
  INFO: green,
  ERROR: red,
  WARN: yellow,
  DEBUG: blue,
  TRACE: magenta,
  COUNT: gray,
  TIMER: white,
  DIR: black,
  DIRXML: black,
  GROUP: redBright,
};
