package controllers.ControllerImpl;

import models.Garage;
import utils.CrudUtil;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GarageController {


    public Garage getGarageDetails(Connection connection, String garageId) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT phone_number,email,garage_name,reg_timestamp,status,avg_rating,type,owner_name,profile_pic_ref FROM service_provider WHERE id=?", Integer.parseInt(garageId));
        Garage garage=null;
        while (resultSet.next()){
            String contactNumber=resultSet.getString(1);
            String email=(resultSet.getString(2)==null)? "example@gmail.com": resultSet.getString(2);
            String garageName=resultSet.getString(3);
            String timeStamp=resultSet.getString(4);
            String status=resultSet.getString(5);
            Float avgRating=resultSet.getFloat(6);
            String type=resultSet.getString(7);
            String ownerName=resultSet.getString(8);
            String imageRef=(resultSet.getString(9).isEmpty())? "0":resultSet.getString(9);
            garage=new  Garage(
                    garageName,contactNumber,email,status,avgRating,type,ownerName,timeStamp,imageRef
            );
        }
        return garage;
    }

    public String garageIsExists(Connection connection,String phoneNumber) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT id FROM service_provider WHERE phone_number=?", phoneNumber);
        if (resultSet.next()) {
            return resultSet.getString(1);
        }
        return null;
    }

    public Boolean update(Connection connection,Garage garageModel) throws SQLException, ClassNotFoundException {
       return CrudUtil.executeUpdate(connection,"UPDATE service_provider SET phone_number=?,email=?,garage_name=?,owner_name=?,profile_pic_ref=? WHERE id=?",
                garageModel.getContactNumber(),garageModel.getEmail(),garageModel.getGarageName(),garageModel.getOwnerName(),garageModel.getImgRef(),garageModel.getId());
    }


}

