package controllers.CSmember;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
public class DashboardController {


    public JsonArray getRecentReports(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM road_rescue.service_request WHERE status = 5 ORDER BY request_timestamp limit 5");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("customer_id");
            String title = rst.getString("issue_category_id");
            String timestamp = rst.getString("request_timestamp");
//            String acceptedTime = rst.getString("accepted_timestamp");
            String status = rst.getString("status");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("CustomerID", id);
            RecentServices.add("title", title);
            RecentServices.add("Rtimestamp", timestamp);
//            RecentServices.add("Atimestamp", acceptedTime);
            RecentServices.add("status", status);

            RecentRequestArrayBuilder.add(RecentServices.build());


        }

        return RecentRequestArrayBuilder.build();
    }
}

