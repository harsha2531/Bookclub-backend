import { Request, Response } from "express";
import Reader from "../models/Reader";

export const getReaders = async (_: Request, res: Response) => {
    res.json(await Reader.find());
};

export const addReader = async (req: Request, res: Response) => {
    res.json(await Reader.create(req.body));
};

export const updateReader = async (req: Request, res: Response) => {
    res.json(await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteReader = async (req: Request, res: Response) => {
    await Reader.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};
