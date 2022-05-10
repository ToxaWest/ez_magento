import {
    Head, Html, Main, NextScript
} from 'next/document';
import { ReactElement } from 'react';

export default function Document(): ReactElement {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
