package controllers.CSmember;

import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ServiceRequestsController {
    public JsonArray getServiceRequests(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM road_rescue.service_request  WHERE status = 2 OR status = 3 OR status =4 ");

        JsonArrayBuilder RecentRequestArrayBuilder = Json.createArrayBuilder();

        while (rst.next()) {
            int id = rst.getInt("customer_id");
            String location = rst.getString("location");
            String issue = rst.getString("issue_category_id");
            int status = rst.getInt("status");
            JsonObjectBuilder RecentServices = Json.createObjectBuilder();
            RecentServices.add("CustomerID", id);
            RecentServices.add("location", location);
            RecentServices.add("issue", issue);
            RecentServices.add("status", status);

            RecentRequestArrayBuilder.add(RecentServices.build());

        }

        return RecentRequestArrayBuilder.build();
    }
}

//    public boolean cancelRequest(Connection connection)throws SQLException, ClassNotFoundException {
//
//        boolean cancleRequest = CrudUtil.executeUpdate(connection,"DELETE FROM service_request WHERE );
//
//
//        return cancleRequest;
//    }
