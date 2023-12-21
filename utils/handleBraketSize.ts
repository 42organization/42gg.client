export const useContainerSize = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const width = containerRef.current?.clientWidth;
  const height = containerRef.current?.clientHeight;
  return { width, height };
};
