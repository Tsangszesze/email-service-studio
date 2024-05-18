interface RequestWithToken extends Request {
  apiKey: string;
}

export class ResBody {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
