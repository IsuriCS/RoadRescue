package controllers.ControllerImpl;

import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GarageController {


    public JsonObject getGarageDetails(Connection connection, String garageId) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT phone_number,email,garage_name,status,avg_rating,type,owner_name FROM service_provider WHERE id=?", Integer.parseInt(garageId));
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        JsonObject x = null;
        while (resultSet.next()){
            System.out.println("111111");
            objectBuilder.add("contactNumber",resultSet.getString(1));
            objectBuilder.add("email",resultSet.getString(2));
            objectBuilder.add("garageName",resultSet.getString(3));
            objectBuilder.add("garageStatus",(resultSet.getInt(4) ==1)? "Available" : "Not Available");
            objectBuilder.add("garageRating",resultSet.getString(5));
            objectBuilder.add("garageType",resultSet.getString(6));
            objectBuilder.add("OwnerName",resultSet.getString(7));
            x=objectBuilder.build();
        }

        System.out.println(x);
        return x;
    }

}

