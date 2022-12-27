import AdminJS, {CurrentAdmin} from "adminjs";
import AdminJSExpress from '@adminjs/express';
import express from "express";
import process from "process";
import {Env} from "./modules/common/types";
import {config} from './admin-config';

class AdminServer {
    private PORT = 8081;

    private adminUser: CurrentAdmin = {
        email: process.env.BACKEND_ADMIN_EMAIL,
        password: process.env.BACKEND_ADMIN_PASSWORD
    };

    async start() {
        const app = express()
        const admin = new AdminJS(config);

        app.use(admin.options.rootPath, this.buildRouter(admin))

        app.listen(this.PORT, '0.0.0.0', () => {
            console.log(`AdminJS started on http://localhost:${this.PORT}${admin.options.rootPath}`)
        })
    }

    private buildRouter(admin: AdminJS): express.Router {
        const {BACKEND_ENV, BACKEND_SECRET} = process.env;

        if (BACKEND_ENV === Env.DEVELOPMENT) {
            return AdminJSExpress.buildRouter(admin);
        }

        const auth = {
            authenticate: this.authenticate.bind(this),
            cookieName: 'adminjs',
            cookiePassword: BACKEND_SECRET
        };

        const session = {
            resave: true,
            saveUninitialized: true,
            secret: BACKEND_SECRET
        };

        return AdminJSExpress.buildAuthenticatedRouter(admin, auth, null, session);
    }

    private async authenticate(email: string, password: string): Promise<CurrentAdmin> {
        if (email !== this.adminUser.email) return null;
        if (password !== this.adminUser.password) return null;
        return this.adminUser
    }
}

new AdminServer().start();
