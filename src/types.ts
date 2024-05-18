import { Request } from "express";

export class ResBody {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
