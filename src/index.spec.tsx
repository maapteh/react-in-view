import React, { CSSProperties } from 'react';
import ReactDOMServer from 'react-dom/server';
import { render, cleanup } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import NoSSRinView from './';

describe('NoSSRinView Component', () => {
    const style: CSSProperties = {
        height: '101vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d1176',
        color: '#fff',
    };

    // TODO add mocking window
    describe('on Client Side', () => {
        afterEach(() => {
            cleanup();
        });

        const MyComp = () => <div>Hello</div>;

        it('should render correctly its inner component when it comes into our view', () => {
            const { queryByText } = render(
                <>
                    <section style={{ ...style }}>above</section>
                    <NoSSRinView>
                        <MyComp />
                    </NoSSRinView>
                </>,
            );
            expect(queryByText(/Hello/)).toBeNull();

            mockAllIsIntersecting(true);

            expect(queryByText(/Hello/)).toBeDefined();
        });

        it('should be able to set its own bounding box', () => {
            const { queryByText } = render(
                <>
                    <section style={{ ...style }}>above</section>
                    <NoSSRinView rootMargin="40px 0px 400px 0px">
                        <MyComp />
                    </NoSSRinView>
                    <section style={{ ...style }}>below</section>
                </>,
            );
            expect(queryByText(/Hello/)).toBeNull();

            mockAllIsIntersecting(true);

            expect(queryByText(/Hello/)).toBeDefined();
        });

        it('should have placeholder first and then component', () => {
            const Loading = () => <div>Loading...</div>;
            const { queryByText, getByText } = render(
                <>
                    <section style={{ ...style }}>above</section>
                    <NoSSRinView
                        rootMargin="40px 0px 400px 0px"
                        fallback={<Loading />}
                    >
                        <MyComp />
                    </NoSSRinView>
                    <section style={{ ...style }}>below</section>
                </>,
            );

            getByText(/Loading/);
            expect(queryByText(/Hello/)).toBeNull();

            mockAllIsIntersecting(true);

            expect(queryByText(/Loading/)).toBeNull();
            expect(queryByText(/Hello/)).toBeDefined();
        });

        // TODO: add scroll test
    });

    describe('on Server Side', () => {
        const MyComp = () => <div>Hello</div>;
        const Loading = () => <div>Loading...</div>;

        it('should render correctly with custom loading', () => {
            const markup = ReactDOMServer.renderToStaticMarkup(
                <NoSSRinView fallback={<Loading />}>
                    <MyComp />
                </NoSSRinView>,
            );
            expect(markup).toBe('<div><div>Loading...</div></div>');
        });

        it('should render correctly with no custom loading', () => {
            const markup = ReactDOMServer.renderToStaticMarkup(
                <NoSSRinView>
                    <MyComp />
                </NoSSRinView>,
            );
            expect(markup).toBe('<div></div>');
        });
    });
});
