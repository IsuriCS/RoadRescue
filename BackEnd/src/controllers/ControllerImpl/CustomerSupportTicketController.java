package controllers.ControllerImpl;



import utils.CrudUtil;

import models.CustomerSupportTicketModels;
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

public class CustomerSupportTicketController {
    public boolean update(Connection connection, int ticketId, String solution) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE support_ticket SET status=?, solution=? WHERE ticket_id=?","closed", solution, ticketId);
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
}
