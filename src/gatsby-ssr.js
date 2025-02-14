import React from 'react';
import { withPrefix } from 'gatsby';
import defaultOptions from './defaults';
exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    let { output, createLinkInHead } = { ...defaultOptions, ...pluginOptions };

    if (!createLinkInHead) {
        return;
    }

    if (output.charAt(0) !== `/`) {
        output = `/` + output;
    }

    setHeadComponents([
        <link
            key={`gatsby-plugin-advanced-sitemap`}
            rel="sitemap"
            type="application/xml"
            href={withPrefix(output)}
        />,
    ]);
};
