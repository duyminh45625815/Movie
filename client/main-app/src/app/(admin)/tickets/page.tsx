"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { StatisticsCards } from "@/components/dashboard2/Tickets/statistics-cards"
import { SearchFilter } from "@/components/dashboard2/Tickets/search-filter"
import { TableActions } from "@/components/dashboard2/Tickets/table-actions"
import { TicketTable } from "@/components/dashboard2/Tickets/ticket-table"
import { TicketDetailsDialog } from "@/components/dashboard2/Tickets/ticket-details-dialog"
import { Pagination } from "@/components/dashboard2/Tickets/pagination"

import { formatCurrency } from "@/lib/utils"
import type { Ticket } from "@/types/index"
import { getTicket } from "@/lib/actions"
import { format } from "date-fns"


export default function AdminDashboardTicket() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [ticketsData, setTicketsData] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState(1)

    
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getTicket()
        console.log(tickets)
        if (Array.isArray(tickets)) {
          const formattedTickets = tickets.map((ticket) => ({
            ...ticket,
            showtime: {
              ...ticket.showtime,
              startTime: format(new Date(ticket.showtime.startTime), "yyyy-MM-dd HH:mm"),
            },
            createdAt: new Date(ticket.createdAt).toISOString(),
          }))
          setTicketsData(formattedTickets)
        } else {
          setTicketsData([]) 
        }
      } catch (error) {
        setTicketsData([]) 
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])
    

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }

  const filteredTickets = Array.isArray(ticketsData)
  ? ticketsData.filter((ticket) => {
      const matchesSearch =
        ticket._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.showtime?.films?.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  : [];

  const viewTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setDetailsOpen(true)
  }

  
  const confirmedTickets = ticketsData.filter((t) => t.status === "paid").length
  const pendingTickets = ticketsData.filter((t) => t.status === "pending").length
  const totalRevenue = ticketsData.reduce(
    (sum, ticket) => (ticket.status !== "cancelled" ? sum + ticket.totalPrice : sum),
    0,
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <StatisticsCards
            totalTickets={ticketsData.length}
            confirmedTickets={confirmedTickets}
            pendingTickets={pendingTickets}
            totalRevenue={totalRevenue}
            isLoading={isLoading}
            formatCurrency={formatCurrency}
          />
          <Card className="transition-all duration-300">
            <CardHeader>
              <TableActions isRefreshing={isRefreshing} handleRefresh={handleRefresh} />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <SearchFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
                <TicketTable
                  tickets={filteredTickets}
                  isLoading={isLoading}
                  formatCurrency={formatCurrency}
                  viewTicketDetails={viewTicketDetails}
                />
                <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

