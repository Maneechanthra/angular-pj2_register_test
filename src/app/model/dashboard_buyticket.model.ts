// To parse this data:
//
//   import { Convert } from "./file";
//
//   const dashboardBuyTicket = Convert.toDashboardBuyTicket(json);

export interface DashboardBuyTicket {
  fname:       string;
  lname:       string;
  ticket_id:   number;
  amount:      number;
  total_price: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toDashboardBuyTicket(json: string): DashboardBuyTicket[] {
      return JSON.parse(json);
  }

  public static dashboardBuyTicketToJson(value: DashboardBuyTicket[]): string {
      return JSON.stringify(value);
  }
}
