import type {
  AnalyticsEvent,
  FormType,
  ServiceLine,
  PageType,
} from './types';
import { getPageType, getServiceLine } from './service-line';

// Single chokepoint for every analytics event. GTM listens on window.dataLayer
// and turns each push into a GA4 + Meta Pixel event per the GTM blueprint doc.

function push(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event as unknown as Record<string, unknown>);
}

function currentPath(): string {
  return typeof window === 'undefined' ? '/' : window.location.pathname;
}

interface FormSubmitArgs {
  formType: FormType;
  email?: string;
  phone?: string;
  // Allow callers to override detection if needed (e.g. a generic contact form
  // on a termite page should still tag as 'contact', not 'termite' for the form_type).
  serviceLine?: ServiceLine;
  pageType?: PageType;
  pagePath?: string;
}

export function trackFormSubmit(args: FormSubmitArgs): void {
  const pagePath = args.pagePath ?? currentPath();
  push({
    event: `form_submit_${args.formType}`,
    form_type: args.formType,
    service_line: args.serviceLine ?? getServiceLine(pagePath),
    page_type: args.pageType ?? getPageType(pagePath),
    page_path: pagePath,
    ...(args.email ? { user_email: args.email } : {}),
    ...(args.phone ? { user_phone: args.phone } : {}),
  });
}

export function trackClickPhone(phoneNumber: string): void {
  const pagePath = currentPath();
  push({
    event: 'click_phone',
    click_target: 'phone',
    phone_number: phoneNumber,
    service_line: getServiceLine(pagePath),
    page_type: getPageType(pagePath),
    page_path: pagePath,
  });
}

export function trackClickEmail(emailAddress: string): void {
  const pagePath = currentPath();
  push({
    event: 'click_email',
    click_target: 'email',
    email_address: emailAddress,
    service_line: getServiceLine(pagePath),
    page_type: getPageType(pagePath),
    page_path: pagePath,
  });
}
