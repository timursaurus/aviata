import type { Flight } from "./flight"

export interface TicketSearchResult {
  airlines: Record<string, string>
  flights: Flight[]
}

