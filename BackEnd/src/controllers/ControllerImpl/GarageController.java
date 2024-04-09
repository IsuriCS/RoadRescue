package controllers.ControllerImpl;

import models.Garage;
import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GarageController {


    public Garage getGarageDetails(Connection connection, String garageId) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT phone_number,email,garage_name,reg_timestamp,status,avg_rating,type,owner_name FROM service_provider WHERE id=?", Integer.parseInt(garageId));
        Garage garage=null;
        while (resultSet.next()){
            String contactNumber=resultSet.getString(1);
            String email=(resultSet.getString(2)==null)? "example@gmail.com": this.toString();
            String garageName=resultSet.getString(3);
            String timeStamp=resultSet.getString(4);
            String status=(resultSet.getInt(5)==1)? "Available" : "Not Available";
            Float avgRating=resultSet.getFloat(6);
            String type=(resultSet.getInt(7)==1)? "Garage" : "Maintain Personal";
            String ownerName=resultSet.getString(8);
            garage=new  Garage(
                    garageName,contactNumber,email,status,avgRating,type,ownerName,timeStamp
            );
        }


        return garage;
    }

}

