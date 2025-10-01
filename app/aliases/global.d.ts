import { StateCode } from '@/enums';

declare global {
  type uuid = string;
  type url = string;
  type statecode = StateCode;
}

export {};