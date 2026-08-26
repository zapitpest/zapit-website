// Barrel — single import surface for the analytics module.
//   import { trackFormSubmit, getServiceLine } from '@/lib/analytics';

export { trackFormSubmit, trackClickPhone, trackClickEmail, trackBookIntent } from './dataLayer';
export { getServiceLine, getPageType } from './service-line';
export { submitLeadToWhatConverts } from './whatconverts';
export type { WhatConvertsLead } from './whatconverts';
export { submitLeadToFormspree } from './formspree';
export type { FormspreeLead } from './formspree';
export type {
  ServiceLine,
  PageType,
  FormType,
  ClickTarget,
  AnalyticsEvent,
  FormSubmitEvent,
  ClickPhoneEvent,
  ClickEmailEvent,
  BookIntentEvent,
} from './types';
