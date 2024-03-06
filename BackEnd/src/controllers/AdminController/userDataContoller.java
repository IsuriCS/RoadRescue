package controllers.AdminController;

import models.SupportTicket;
import models.TimeStampFormatter;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
public class userDataContoller {

    public static JsonArray getCustomers(Connection connection) throws SQLException, ClassNotFoundException {

        ResultSet rst1 = CrudUtil.executeQuery(connection, "SELECT * AS customer_list FROM customer");




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
