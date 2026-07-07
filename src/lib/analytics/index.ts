// Barrel — single import surface for the analytics module.
//   import { trackFormSubmit, getServiceLine } from '@/lib/analytics';

export { trackFormSubmit, trackClickPhone, trackClickEmail, trackBookIntent } from './dataLayer';
export { getServiceLine, getPageType } from './service-line';
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
