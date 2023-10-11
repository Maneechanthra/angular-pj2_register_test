// To parse this data:
//
//   import { Convert } from "./file";
//
//   const account = Convert.toAccount(json);

export interface Account {
  fname: string;
  lname: string;
  email: string;
  password: string;
  tel_number: string;
  bdate: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toAccount(json: string): Account[] {
    return JSON.parse(json);
  }

  public static accountToJson(value: Account[]): string {
    return JSON.stringify(value);
  }
}
