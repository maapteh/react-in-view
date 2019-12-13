import * as React from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
    children: any; // React.ReactNode
    fallback?: any; // JSX.Element
    // set of values serves to grow or shrink each side of the root element's bounding box before computing intersections
    // @example: '20px 0px 280px 0px'
    rootMargin?: string;
    className?: string;
}

const InView = ({
    children,
    fallback = null,
    rootMargin,
    className,
}: Props) => {
    const margin =
        rootMargin && /((((.\d*)?(px))){4})/.test(rootMargin)
            ? rootMargin
            : '40px 40px 280px 0px';
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true,
        rootMargin: margin,
    });

    return (
        <div ref={ref} className={className}>
            {Boolean(!inView) && fallback}
            {inView && children}
        </div>
    );
};

export default InView;
