/**
 * Created by igor on 20.02.17.
 */
import Koa from 'koa';
import path from 'path';
import React from 'react';
import cookie from 'koa-cookie';
import staticF from 'koa-static';
import convert from 'koa-convert';
import session from 'koa-session2';
import Helmet from 'react-helmet';
import body from 'koa-better-body';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';

import storeCreate from './../store';
import routes from './../routes';
import route from './route';
import PhoneBook from './model';

const app = new Koa();

app.keys = ['some secret hurr'];
app.use(session({
    key: 'session',
    maxAge: 86400000
}, app));
app.use(convert(body()));
app.use(cookie());
app.use(staticF(path.resolve(__dirname, 'public')));

// uses async arrow functions
app.use(async(ctx, next) => {
    try {
        if (ctx.cookies.get('session') == null) ctx.session.user = {};
        await next(); // next is now a function
    } catch (err) {
        ctx.body = {message: err.message};
        ctx.status = err.status || 500;
    }
});

route(app.use.bind(app));

app.use(async ctx => {
    //const store = storeCreate({phoneBook: {userAgent: ctx.request.header['user-agent']}});
    const userId = ctx.cookie.session;
    const fields = await PhoneBook.find({userId}).select('name second phones').lean().exec() || [];
    const store = storeCreate({phoneBook: {fields}});
    const data = store.getState();
    const {url} = ctx.request;
    const location = createMemoryHistory(url);

    match({routes, location}, (err, redirectLocation, renderProps) => {
        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        const componentHTML = renderToString(InitialComponent);
        let head = Helmet.rewind();

        const HTML = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${head.title.toString()}
                ${head.meta.toString()}
                ${head.link.toString()}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
              </head>
              <body>
                <div id="app">${componentHTML}</div>
                <script type="application/javascript">
                  window.defaultState = ${JSON.stringify(data)};
                </script>
                <script src="/assets/bundle.js"></script>
              </body>
            </html>    
        `;
        ctx.body = HTML;
    });
});

export default app;
