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
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM road_rescue.customer_support_ticket WHERE status='pending'");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("id");
            int customerId= rst.getInt("customer_id");
            int csmemberId = rst.getInt("customer_support_member_id");
            String problem = rst.getString("title");
            String createdTime = rst.getString("created_time");
            String status = rst.getString("status");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("ticketId", id);
            RecentServices.add("customer_id", customerId);
            RecentServices.add("csmember_id", csmemberId);
            RecentServices.add("title", problem);
            RecentServices.add("created_time", createdTime);
            RecentServices.add("status", status);


            RecentRequestArrayBuilder.add(RecentServices.build());


        }

        return RecentRequestArrayBuilder.build();
    }
}
