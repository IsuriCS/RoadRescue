package controllers.AdminController;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
public class dashboardCards {

    public static JsonArray getcountsForCards(Connection connection) throws SQLException, ClassNotFoundException {
        int customerNum,SproviderNum,cusTicketCount,spTicketCount;
        ResultSet rst1 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_count FROM customer");
        ResultSet rst2 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_count FROM service_provider");
        ResultSet cusTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_tickets FROM customer_support_ticket");
        ResultSet spTickects = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_tickets FROM sp_support_ticket");


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


//        ResultSet rst = CrudUtil.executeQuery(connection, query.toString());
        JsonArrayBuilder countersForCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("CustomerNum", customerNum);
        objectBuilder.add("sproviderNum",SproviderNum);

        objectBuilder.add("SupportTicketCount",cusTicketCount+spTicketCount);


        countersForCardsArray.add(objectBuilder.build());

        return countersForCardsArray.build();
    }


}
