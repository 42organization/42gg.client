export const GA_ID = `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`;

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
