package controllers.AdminController;

import models.SupportTicket;
import models.TimeStampFormatter;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;


public class dashboardCards {

    public static JsonArray getcountsForCards(Connection connection) throws SQLException, ClassNotFoundException {
        int customerNum,SproviderNum,cusTicketCount,spTicketCount;
        int completedtasks;
        ResultSet rst1 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_count FROM customer");
        ResultSet rst2 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_count FROM service_provider");
        ResultSet cusTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_tickets FROM customer_support_ticket");
        ResultSet spTickects = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_tickets FROM sp_support_ticket");
        ResultSet completedtasksset = CrudUtil.executeQuery(connection,"SELECT COUNT(*) AS completed_tasks FROM service_request WHERE status='5'");

        ResultSet resentReports = CrudUtil.executeQuery(connection,"SELECT *FROM (SELECT s.garage_name AS name,st.title,st.created_time,st.status FROM sp_support_ticket st , service_provider s WHERE st.service_provider_id=s.id UNION ALL SELECT CONCAT(c.f_name,\" \",c.l_name) AS name,ct.title,ct.created_time,ct.status FROM customer_support_ticket ct , customer c WHERE ct.customer_id=c.id) AS combined_tickets ORDER BY created_time LIMIT 5");

        if (rst1.next()) {
            customerNum= rst1.getInt("customer_count");
        } else {
            customerNum=0;
        }

        if (rst2.next()) {
            SproviderNum= rst2.getInt("sp_count");
        } else {
            SproviderNum=0;
        }

        if (cusTickets.next()) {
            cusTicketCount= cusTickets.getInt("customer_tickets");
        } else {
            cusTicketCount=0;
        }

        if (spTickects.next()) {
            spTicketCount= spTickects.getInt("sp_tickets");
        } else {
            spTicketCount=0;
        }

        if (completedtasksset.next()) {
            completedtasks= completedtasksset.getInt("completed_tasks");
        } else {
            completedtasks=0;
        }



        JsonArrayBuilder countersForCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("CustomerNum", customerNum);
        objectBuilder.add("sproviderNum",SproviderNum);

        objectBuilder.add("SupportTicketCount",cusTicketCount+spTicketCount);
        objectBuilder.add("CompletedTaskCount",completedtasks);


        countersForCardsArray.add(objectBuilder.build());
        while (resentReports.next()) {

            SupportTicket supportTicket = new SupportTicket(resentReports.getString(1), resentReports.getString(2), resentReports.getString(3), resentReports.getString(4));
            JsonObjectBuilder recentReportsObjecct = Json.createObjectBuilder();
            recentReportsObjecct.add("name",supportTicket.getTicketOwner());

            recentReportsObjecct.add("title",supportTicket.getTitle());
            Timestamp timestamp = Timestamp.valueOf(supportTicket.getTimestamp());

            TimeStampFormatter formatterdTS = new TimeStampFormatter(timestamp);
            recentReportsObjecct.add("date", formatterdTS.extractDate());
            recentReportsObjecct.add("status",supportTicket.getTicketStatus());
            countersForCardsArray.add(recentReportsObjecct.build());
        }

        return countersForCardsArray.build();
    }


}
