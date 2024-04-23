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
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM road_rescue.sp_support_ticket WHERE status='pending'");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("id");
            String serviceProviderId= rst.getString("service_provider_id");
            String description = rst.getString("description");
            int createdTime = rst.getInt("created_time");
            String status = rst.getString("status");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("CustomerID", id);
            RecentServices.add("service_provider_id", serviceProviderId);
            RecentServices.add("description", description);
            RecentServices.add("created_time", createdTime);
            RecentServices.add("status", status);


            RecentRequestArrayBuilder.add(RecentServices.build());


        }

        return RecentRequestArrayBuilder.build();
    }
}
