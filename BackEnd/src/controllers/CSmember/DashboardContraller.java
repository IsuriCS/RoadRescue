package controllers.CSmember;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
public class DashboardContraller  {

    public JsonArray getRecentServices(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT t.* FROM road_rescue.service_request t ORDER BY status,request_timestamp limit 10 ");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("customer_id");
            String location = rst.getString("location");
            int status = rst.getInt("status");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("CustomerID", id);
            RecentServices.add("location", location);
            RecentServices.add("status", status);

            RecentRequestArrayBuilder.add(RecentServices.build());


        }

        return RecentRequestArrayBuilder.build();
    }
}

