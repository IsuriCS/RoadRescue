package controllers.ControllerImpl;

import utils.CrudUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginController {
    public String garageIsExists(Connection connection, String phoneNumber) throws SQLException, ClassNotFoundException {
        ResultSet resultSet1 = CrudUtil.executeQuery(connection, "SELECT id FROM service_provider WHERE phone_number=? and type=?", phoneNumber,"Garage");
        ResultSet resultSet2 = CrudUtil.executeQuery(connection, "SELECT id FROM service_provider WHERE phone_number=? and type=?", phoneNumber,"Mp");
        ResultSet resultSet3 = CrudUtil.executeQuery(connection, "SELECT id FROM technician WHERE phone_number=?", phoneNumber);
        if (resultSet1.next()) {
            return "sp-"+resultSet1.getInt(1) ;
        }else if (resultSet2.next()){
            return "mp-"+resultSet2.getInt(1);
        } else if (resultSet3.next()) {
            return "t-"+resultSet3.getInt(1);
        }else {
            return null;
        }
    }

    public boolean updateLocationForServiceProvider(Connection connection, String location, String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "UPDATE service_provider set location=? where id=?", location, id);
    }

    public boolean updateLocationForTechnician(Connection connection, String location, String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "UPDATE technician set location=? where id=?", location, id);
    }

    public String RegisterUser(Connection connection, String ownerName, String garageName, String phoneNumber) throws SQLException, ClassNotFoundException {
       // CrudUtil.executeUpdate(connection,"insert into service_provider (phone_number, garage_name, location,type,owner_name) values(?,?,?,?)",phoneNumber,garageName,loca);
        return "null";
    }

    public boolean isExitsServiceProvider(Connection connection, String phoneNumber) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT id FROM service_provider WHERE phone_number=?", phoneNumber);
        if (resultSet.next()){
            return true;
        }else {
            return false;
        }
    }

    public boolean adminLogin(Connection connection, String phoneNumber) throws SQLException, ClassNotFoundException {

        return CrudUtil.executeQuery(connection, "SELECT id admin where phone_number=?", phoneNumber).next();

    }

    public String customerSupportLogin(Connection connection, String csPhoneNumber) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT id customer_support_member where phone_number=?", csPhoneNumber);
        if (resultSet.next()) {
            return resultSet.getInt(1)+"-";
        }else {
            return "You not have in our system.\n Please contact +94763552600";
        }

    }
}
