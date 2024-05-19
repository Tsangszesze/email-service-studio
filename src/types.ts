export interface ReqBody {
  email: string;
  name: string;
  sender: string;
}
export class ResBody {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
