package controllers.CSmember;

import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DashboardCardsController {

    public static JsonArray GetCountsForCards(Connection connection) throws SQLException, ClassNotFoundException {
        int allTicketCount, solvedTicketCount, PendingTicketCount ,OnReviewTicketCount;


        ResultSet cusTicketCount = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_ticket_count FROM customer_support_ticket");
        ResultSet spTicketCount = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_ticket_count FROM sp_support_ticket");
        ResultSet allTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS all_ticket_count FROM customer_support_ticket");
        ResultSet solvedTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS solved_ticket_count FROM customer_support_ticket WHERE status = 'solved'");
        ResultSet PendingTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS pending_ticket_count FROM customer_support_ticket WHERE status = 'pending'");
        ResultSet OnReviewTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS onreview_ticket_count FROM customer_support_ticket WHERE status = 'On Review'");

        if (allTickets.next()) {
            allTicketCount = allTickets.getInt("all_ticket_count");
        } else {
            allTicketCount = 0;
        }


        if (solvedTickets.next()) {
            solvedTicketCount = solvedTickets.getInt("solved_ticket_count");
        } else {
            solvedTicketCount = 0;
        }

        if (PendingTickets.next()) {
            PendingTicketCount = PendingTickets.getInt("pending_ticket_count");
        } else {
            PendingTicketCount = 0;
        }

        if (OnReviewTickets.next()) {
            OnReviewTicketCount = OnReviewTickets.getInt("onreview_ticket_count");
        } else {
            OnReviewTicketCount = 0;
        }


        JsonArrayBuilder countersForCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("AllTicketCount", allTicketCount);
        objectBuilder.add("SolvedTicketCount", solvedTicketCount);
        objectBuilder.add("PendingTicketCount", PendingTicketCount);
        objectBuilder.add("OnReviewTicketCount", OnReviewTicketCount);

        countersForCardsArray.add(objectBuilder.build());
        return countersForCardsArray.build();
    }
}
