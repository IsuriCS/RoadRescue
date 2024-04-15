package controllers.AdminController;




import utils.CrudUtil;


import models.SupportTicket;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
public class SPSupportTicketContraller {

    public JsonArray getAllSupportTicket(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM sp_support_ticket;");

        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        while (resultSet.next()){
            int id=resultSet.getInt(1);
            int SPid= resultSet.getInt(2);
            String status =resultSet.getString(3);
            int customer_support_member_id =resultSet.getInt(4);
            String title =resultSet.getString(5);
            String description =resultSet.getString(6);
            String created_time =resultSet.getString(7);
            String solution = resultSet.getString(8);


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("SPid",SPid);
            objectBuilder.add("status",status);
            objectBuilder.add("customer_support_member_id",customer_support_member_id);
            objectBuilder.add("title",title);
            objectBuilder.add("description",description);
            objectBuilder.add("created_time",created_time);
            objectBuilder.add("solution",solution);
            SupportTickets.add(objectBuilder.build());
        }
        return SupportTickets.build();
    }
}
