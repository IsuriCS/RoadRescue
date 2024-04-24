package controllers.ControllerImpl;

import models.RegisterModel;
import utils.CrudUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RegisterController {


    public String RegisterServiceProvider(Connection connection, RegisterModel registerModel) throws SQLException, ClassNotFoundException {
        boolean b = CrudUtil.executeUpdate(connection, "insert into service_provider (phone_number, garage_name, location,type,owner_name) values(?,?,?,?,?)"
                , registerModel.getContactNumber(), registerModel.getGarageName(), (registerModel.getLatitude() + "," + registerModel.getLongitude()), "Garage", registerModel.getOwnerName()
        );

        String id = null;
        if (b) {
           id =getNewUserId(connection);
        }

        return id;
    }

    private String getNewUserId(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select MAX(id) from  service_provider");
        if (resultSet.next()) {
            return resultSet.getInt(1)+"";
        }else {
            return null;
        }
    }
}
