export const GTM_ID = `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`;

export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string;
    page: string;
  }

  const pageEvent: PageEventProps = {
    event: 'pageview',
    page: url,
  };
  //@ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};
