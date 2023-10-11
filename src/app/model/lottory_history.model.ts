// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lottoryHistory = Convert.toLottoryHistory(json);

export interface LottoryHistory {
  buy_date:      string;
  ticket_id:     number;
  amount:        number;
  price:         number;
  total_price:   number;
  detail_buy_id: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLottoryHistory(json: string): LottoryHistory[] {
      return JSON.parse(json);
  }

  public static lottoryHistoryToJson(value: LottoryHistory[]): string {
      return JSON.stringify(value);
  }
}
