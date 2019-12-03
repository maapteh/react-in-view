import React, { CSSProperties } from 'react';
import ReactDOMServer from "react-dom/server";
import { render, cleanup } from '@testing-library/react';
import { mockAllIsIntersecting, mockIsIntersecting, intersectionMockInstance } from 'react-intersection-observer/test-utils'
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
    }

    // TODO add mocking window
    describe('on Client Side', () => {

        afterEach(() => {
            cleanup();
        });

        const MyComp = () => <div>Hello</div>;

        it('should render correctly its inner component when it comes into our view', () => {

            const { queryByText, debug } = render(
                <>
                    <section style={{ ...style }}>above</section>
                    <NoSSRinView>
                        <MyComp />
                    </NoSSRinView>
                </>
            );
            expect(queryByText(/Hello/)).toBeNull();

            mockAllIsIntersecting(true)

            expect(queryByText(/Hello/)).toBeDefined();
        });
    });

    describe('on Server Side', () => {

        const MyComp = () => <div>Hello</div>;
        const Loading = () => <div>Loading...</div>;

        it('should render correctly with custom loading', () => {
            const markup = ReactDOMServer.renderToStaticMarkup(<NoSSRinView fallback={<Loading />}>
                <MyComp />
            </NoSSRinView>);
            expect(markup).toBe('<div><div>Loading...</div></div>')
        });

        it('should render correctly with no custom loading', () => {
            const markup = ReactDOMServer.renderToStaticMarkup(<NoSSRinView>
                <MyComp />
            </NoSSRinView>);
            expect(markup).toBe('<div></div>')
        });
    });

});
