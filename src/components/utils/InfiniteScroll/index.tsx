import { PropsWithChildren, useEffect, useRef } from "react";

import LoadingDots from "../../common/LoadingDots";
import S from "./styledComponent";

interface InfiniteScrollProps extends PropsWithChildren {
  isLoading: boolean;
  handleScroll: () => void;
}

const InfiniteScroll = ({ children, isLoading, handleScroll }: InfiniteScrollProps) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          handleScroll();
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, handleScroll]);

  return (
    <>
      {children}
      <S.FallbackContainer>
        <div ref={loaderRef}>{isLoading && <LoadingDots />}</div>
      </S.FallbackContainer>
    </>
  );
};

export default InfiniteScroll;
