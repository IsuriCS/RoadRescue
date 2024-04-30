package controllers.ControllerImpl;



import utils.CrudUtil;

import models.CustomerSupportTicketModels;
import models.SupportTicket;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomerSupportTicketController {
    public boolean update(Connection connection, int ticketId, String solution) throws SQLException, ClassNotFoundException {
        String status = "solved";
        return CrudUtil.executeUpdate(connection,"UPDATE customer_support_ticket SET status=?, solution=? WHERE id=?",status, solution, ticketId);
    }

    public boolean add(Connection connection, SupportTicket supportTicket, CustomerSupportTicketModels customerSupportTicket) throws SQLException, ClassNotFoundException, ParseException {

        // Custommergen or cs Report thanedi hadena support ticket eka

        Timestamp timestamp = dateConvert(supportTicket.getTimestamp());

        boolean boolValue1 = CrudUtil.executeUpdate(connection, "INSERT INTO support_ticket values(?,?,?,?,?)",
                supportTicket.getTicketId(), supportTicket.getTitle(), supportTicket.getDescription(), supportTicket.getTicketStatus(), timestamp);

       /* boolean boolValue2 = CrudUtil.executeUpdate(connection, "INSERT INTO customer_support_ticket values(?,?,?)",
                customerSupportTicket.getTicketId(), customerSupportTicket.getCustomerId(), customerSupportTicket.getSupportMemberId());*/

        if (boolValue1){

            //methana table deken ekkata hari data watune nathi nm data watuna table data eka remove karanna mathaka athuwa

            return true;
        }else {
            return false;
        }

    }

    private Timestamp dateConvert(String timestamp) throws ParseException {
        String dateFormat = "dd.MM.yyyy";

        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        Date utilDate = sdf.parse(timestamp);

        return new Timestamp(utilDate.getTime());

    }

    public JsonArray getAllPendingSupportTicket(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT id,status,description,title,customer_support_member_id,created_time,customer_id,solution FROM customer_support_ticket;");

        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        while (resultSet.next()){
            int id=resultSet.getInt(1);

           String status =resultSet.getString(2);
           String description =resultSet.getString(3);
           String title =resultSet.getString(4);
           int customer_support_member_id =resultSet.getInt(5);
            String created_time =resultSet.getString(6);
            int customerId= resultSet.getInt(7);
            String solution = resultSet.getString(8);



            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("status",status);
            objectBuilder.add("description",description);
            objectBuilder.add("title",title);
            objectBuilder.add("customer_support_member_id",customer_support_member_id);
            objectBuilder.add("created_time",created_time);
            objectBuilder.add("customerID",customerId);
            objectBuilder.add("solution",solution);
            SupportTickets.add(objectBuilder.build());
        }
        return SupportTickets.build();
    }

    public JsonArray getAllSupportTicketOrderByStatus(Connection connection,String cusid) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM customer_support_ticket WHERE customer_id=? and(status IN ('Pending', 'On Review')OR (status = 'Solved' AND created_time >= DATE_SUB(NOW(), INTERVAL 3 MONTH))) ORDER BY FIELD(status, 'Pending', 'On Review', 'Solved'), created_time DESC;",cusid);

        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        while (resultSet.next()){
            int id=resultSet.getInt("id");

            String status =resultSet.getString("status");
            String description =resultSet.getString("description");
            String title =resultSet.getString("title");
            int customer_support_member_id =resultSet.getInt("customer_support_member_id");
            String created_time =resultSet.getString("created_time");
            int customerId= resultSet.getInt("customer_id");
            String solution = resultSet.getString("solution");


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("status",status);
            objectBuilder.add("description",description);
            objectBuilder.add("title",title);
            objectBuilder.add("customer_support_member_id",customer_support_member_id);
            objectBuilder.add("created_time",created_time);
            objectBuilder.add("customerID",customerId);
            objectBuilder.add("solution",solution);
            SupportTickets.add(objectBuilder.build());
        }
        return SupportTickets.build();
    }

    public boolean assignCSM(Connection connection, String ticketId,String csmid) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE  customer_support_ticket SET customer_support_member_id=?,status='On Review' WHERE id=?",csmid,ticketId);
    }

    public boolean solveTicket(Connection connection, String ticketId,String solution) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE  customer_support_ticket SET solution=?,status='Solved' WHERE id=?",solution,ticketId);
    }

    public JsonObject getSupportTicketByid(Connection connection, String id) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT id,status,description,title,customer_support_member_id,created_time,customer_id,solution FROM customer_support_ticket WHERE id=?", id);

        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        if (rst.next()) {


            String status =rst.getString(2);
            String description =rst.getString(3);
            String title =rst.getString(4);
            String customer_support_member_id =rst.getString(5);
            String created_time =rst.getString(6);
            String  customerId= rst.getString(7);
            String solution = rst.getString(8);



            objectBuilder.add("ticketId",id);
            objectBuilder.add("status",status);
            objectBuilder.add("description",description);
            objectBuilder.add("title",title);
            if (customer_support_member_id==null){
                objectBuilder.addNull("customer_support_member_id");
            }
            else {
                objectBuilder.add("customer_support_member_id",customer_support_member_id);
            }

            objectBuilder.add("created_time",created_time);
            objectBuilder.add("customerID",customerId);
            objectBuilder.add("solution",solution);

            return objectBuilder.build();
        } else {
            return null;
        }
    }


}
