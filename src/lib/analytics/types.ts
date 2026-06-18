// Event types mirror BigQuery Foundation & Data Contract v4, Appendix A.
// Field names match the data contract exactly — do not rename without updating the contract.

export type ServiceLine = 'residential' | 'commercial' | 'termite' | 'emergency' | 'generic';

export type PageType = 'home' | 'service' | 'location' | 'info' | 'contact' | 'other';

export type FormType = 'quote' | 'booking' | 'contact' | 'callback' | 'emergency';

export type ClickTarget = 'phone' | 'email';

interface BaseEventContext {
  service_line: ServiceLine;
  page_type: PageType;
  page_path: string;
}

export interface FormSubmitEvent extends BaseEventContext {
  event: `form_submit_${FormType}`;
  form_type: FormType;
  // Raw user input — GTM normalizes (E.164 phone, lowercase email) and SHA-256 hashes
  // before forwarding to GA4 / Meta. Never sent to a third party in raw form.
  user_email?: string;
  user_phone?: string;
}

export interface ClickPhoneEvent extends BaseEventContext {
  event: 'click_phone';
  click_target: 'phone';
  phone_number: string;
}

export interface ClickEmailEvent extends BaseEventContext {
  event: 'click_email';
  click_target: 'email';
  email_address: string;
}

export type AnalyticsEvent = FormSubmitEvent | ClickPhoneEvent | ClickEmailEvent;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
