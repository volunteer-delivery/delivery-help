import {Request} from "express";
import {User} from "@app/prisma";

export type ISignedRequest = Request & { user?: User };
