package controllers.CSmember;

import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportsController {
    public JsonArray getTicketList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT t.id, t.customer_id,t.customer_support_member_id, t.title, t.created_time, t.status, c.phone_number FROM road_rescue.customer_support_ticket t JOIN road_rescue.customer c ON t.customer_id = c.id WHERE t.status = 'Solved' and t.status = 'On Review'");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("id");
            int customerId= rst.getInt("customer_id");
            int csmemberId = rst.getInt("customer_support_member_id");
            String problem = rst.getString("title");
            String createdTime = rst.getString("created_time");
            String status = rst.getString("status");
            String phoneNumber = rst.getString("phone_number");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("ticketId", id);
            RecentServices.add("customer_id", customerId);
            RecentServices.add("csmember_id", csmemberId);
            RecentServices.add("title", problem);
            RecentServices.add("created_time", createdTime);
            RecentServices.add("status", status);
            RecentServices.add("phone_number", phoneNumber);


            RecentRequestArrayBuilder.add(RecentServices.build());


        }

        return RecentRequestArrayBuilder.build();
    }

//     public boolean UpdateSolutionTicket(Connection connection, String solution) throws SQLException, ClassNotFoundException {
//         return CrudUtil.executeUpdate(connection, "update customer_support_ticket set solution=? where id=?", solution, 8);
//     }
 }
