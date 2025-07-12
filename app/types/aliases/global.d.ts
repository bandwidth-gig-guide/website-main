import { type URL } from 'node:url';
import { StateCode } from '../enums/StateCode';

declare global {
  type uuid = string;
  type url = URL;
  type statecode = StateCode;
}

export {};