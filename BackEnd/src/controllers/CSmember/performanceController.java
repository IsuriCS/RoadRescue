package controllers.CSmember;

import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class performanceController {

    public static JsonArray GetPerformance(Connection connection) throws SQLException, ClassNotFoundException {
        int allPTicketCount, solvedPTicketCount, PendingPTicketCount ,OnReviewPTicketCount;


        ResultSet cusTicketCount = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_ticket_count FROM customer_support_ticket");
        ResultSet spTicketCount = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_ticket_count FROM sp_support_ticket");
        ResultSet allPTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS all_ticket_count FROM customer_support_ticket WHERE customer_support_member_id = 1 ");
        ResultSet solvedPTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS solved_ticket_count FROM customer_support_ticket WHERE status = 'solved' AND customer_support_member_id = 1");
        ResultSet PendingPTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS pending_ticket_count FROM customer_support_ticket WHERE status = 'pending' AND customer_support_member_id = 1");
        ResultSet OnReviewPTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS onreview_ticket_count FROM customer_support_ticket WHERE status = 'On Review' AND customer_support_member_id = 1");

        if (allPTickets.next()) {
            allPTicketCount = allPTickets.getInt("all_ticket_count");
        } else {
            allPTicketCount = 0;
        }


        if (solvedPTickets.next()) {
            solvedPTicketCount = solvedPTickets.getInt("solved_ticket_count");
        } else {
            solvedPTicketCount = 0;
        }

        if (PendingPTickets.next()) {
            PendingPTicketCount = PendingPTickets.getInt("pending_ticket_count");
        } else {
            PendingPTicketCount = 0;
        }

        if (OnReviewPTickets.next()) {
            OnReviewPTicketCount = OnReviewPTickets.getInt("onreview_ticket_count");
        } else {
            OnReviewPTicketCount = 0;
        }



        JsonArrayBuilder countersForPerformanceCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("AllTicketCounts", allPTicketCount);
        objectBuilder.add("SolvedTicketCounts", solvedPTicketCount);
        objectBuilder.add("PendingTicketCounts", PendingPTicketCount);
        objectBuilder.add("OnReviewTicketCounts", OnReviewPTicketCount);

        countersForPerformanceCardsArray.add(objectBuilder.build());
        return countersForPerformanceCardsArray.build();
    }
}


