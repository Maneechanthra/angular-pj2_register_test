// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lottoryBuyTicket = Convert.toLottoryBuyTicket(json);

export interface LottoryBuyTicket {
  buy_id:      number;
  buy_date:    string;
  grand_total: number;
  ac_id:       number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLottoryBuyTicket(json: string): LottoryBuyTicket[] {
      return JSON.parse(json);
  }

  public static lottoryBuyTicketToJson(value: LottoryBuyTicket[]): string {
      return JSON.stringify(value);
  }
}
