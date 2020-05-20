import express, { Request, Response } from 'express';
import { body, sanitize, validationResult } from "express-validator";
import { User } from '../models/user.model';
import logger from '../util/logger';



class UserController {

    constructor() { }


    getAllUsers = async(req: Request, res: Response, next: any) => {


        let users = await User.find()
        
        res.status(200).json({
            error: null,
            result: users
        })
    }

    createUser = async (req: Request, res: Response, next: any) => {

        const errors = await this.validateUser(req, res);

        if (!errors.isEmpty()) {

            return res.status(400).json({ error: errors.array(), result: null })

        } else {

            let body = req.body;
            let user = new User()

            user.name = body.name;
            user.password = body.password;
            user.gender = body.gender;
            user.email = body.email;
            user.picture = body.picture;
            user.location = body.location;

            User.findOne({ email: body.email }, (err, existingUser) => {

                if (err) {

                    return res.status(400).json({
                        error: "User is already exist.",
                        result: null
                    })
                }
                else if (existingUser) {
                    let user_json = existingUser.toJSON();

                    res.status(200).json({
                        error: null,
                        result: user_json
                    })
                }
                else {
                    user.save((error) => {
                        if (error) {
                            res.status(400).json({
                                error: error,
                                result: null
                            })
                        } else {
                            let user_json = user.toJSON();

                            res.status(200).json({
                                error: null,
                                result: user_json
                            })
                        }
                    })
                }

            })
        }

    }

    private validateUser = async (req: Request, res: Response) => {

        await body("email").exists({ checkFalsy: true }).withMessage("Email should not be empty").bail().isEmail().withMessage('Email is not valid').run(req);
        await body("name").exists({ checkFalsy: true }).withMessage('Name should not be empty').run(req);
        await body("gender").exists({ checkFalsy: true }).withMessage("Gender should not be empty").run(req);
        await body("password").exists({ checkFalsy: true }).withMessage("Password should not be empty").bail().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").run(req);
        // eslint-disable-next-line @typescript-eslint/camelcase
        await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

        return validationResult(req);
    }

}

export default UserController;