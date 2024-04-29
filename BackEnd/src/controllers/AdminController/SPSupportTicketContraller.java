package controllers.AdminController;




import utils.CrudUtil;


import models.SupportTicket;

import javax.json.*;
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
            String customer_support_member_id =resultSet.getString(4);
            String title =resultSet.getString(5);
            String description =resultSet.getString(6);
            String created_time =resultSet.getString(7);
            String solution = resultSet.getString(8);


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("SPid",SPid);
            objectBuilder.add("status",status);

            if (customer_support_member_id != null) {
                objectBuilder.add("customer_support_member_id",customer_support_member_id);
            } else {
                objectBuilder.addNull("customer_support_member_id");
            }
            objectBuilder.add("title",title);
            objectBuilder.add("description",description);
            objectBuilder.add("created_time",created_time);
            if (solution != null) {
                objectBuilder.add("solution",solution);
            } else {
                objectBuilder.addNull("solution");
            }

            SupportTickets.add(objectBuilder.build());
        }
        return SupportTickets.build();
    }

    public JsonArray getSpSupportTicket(Connection connection,String spid) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM sp_support_ticket WHERE service_provider_id=?",spid);

        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        while (resultSet.next()){
            int id=resultSet.getInt(1);
            String SPid= spid;
            String status =resultSet.getString(3);
            String customer_support_member_id =resultSet.getString(4);
            String title =resultSet.getString(5);
            String description =resultSet.getString(6);
            String created_time =resultSet.getString(7);
            String solution = resultSet.getString(8);


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("SPid",SPid);
            objectBuilder.add("status",status);

            if (customer_support_member_id != null) {
                objectBuilder.add("customer_support_member_id",customer_support_member_id);
            } else {
                objectBuilder.addNull("customer_support_member_id");
            }
            objectBuilder.add("title",title);
            objectBuilder.add("description",description);
            objectBuilder.add("created_time",created_time);
            if (solution != null) {
                objectBuilder.add("solution",solution);
            } else {
                objectBuilder.addNull("solution");
            }

            SupportTickets.add(objectBuilder.build());
        }
        return SupportTickets.build();
    }
    public JsonObject getstbyid(Connection connection, String id)throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM sp_support_ticket WHERE id=?",id);

        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        if (resultSet.next()){

            int SPid= resultSet.getInt(2);
            String status =resultSet.getString(3);
            String customer_support_member_id =resultSet.getString(4);
            String title =resultSet.getString(5);
            String description =resultSet.getString(6);
            String created_time =resultSet.getString(7);
            String solution = resultSet.getString(8);


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("SPid",SPid);
            objectBuilder.add("status",status);

            if (customer_support_member_id != null) {
                objectBuilder.add("customer_support_member_id",customer_support_member_id);
            } else {
                objectBuilder.addNull("customer_support_member_id");
            }
            objectBuilder.add("title",title);
            objectBuilder.add("description",description);
            objectBuilder.add("created_time",created_time);
            if (solution != null) {
                objectBuilder.add("solution",solution);
            } else {
                objectBuilder.addNull("solution");
            }

            return objectBuilder.build();
        }
        else {
            return null;
        }

    }
}
