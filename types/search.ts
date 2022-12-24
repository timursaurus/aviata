import type { RawFlight } from "./flight.raw"

export interface TicketSearchResult {
  airlines: Record<string, string>
  flights: RawFlight[]
}

