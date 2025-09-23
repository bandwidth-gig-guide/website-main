import { RuntimeConfig } from "./runtimeConfig";

let api: string | null = null;

export async function getServicePublicApiUrl(): Promise<string> {
  if (!api) {
    const res = await fetch("/config/config.runtime.json");
    const config: RuntimeConfig = await res.json();
    api = config.SERVICE_PUBLIC_API_URL;
  }
  return api;
}
