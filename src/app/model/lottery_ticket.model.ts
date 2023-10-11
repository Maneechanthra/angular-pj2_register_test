// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lottory = Convert.toLottory(json);

export interface Lottory {
  lot_id:    number;
  round_no:  number;
  set_no:    number;
  ticket_id: string;
  price:     number;
  amount:    number;
  date_lot:  string;
  date_save: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLottory(json: string): Lottory[] {
      return JSON.parse(json);
  }

  public static lottoryToJson(value: Lottory[]): string {
      return JSON.stringify(value);
  }
}
