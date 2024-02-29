package controllers.ControllerImpl;

import utils.CrudUtil;
import models.TechnicianModel;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TechnicianController {

    public JsonArray getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "select concat(f_name,\" \",l_name),status from technician;");
        JsonArrayBuilder technicianArray = Json.createArrayBuilder();

        while (rst.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("techName",rst.getString(1));
            objectBuilder.add("techStatus",(rst.getInt(2)==1) ? "Available":"Not Available");
            technicianArray.add(objectBuilder.build());
        }
        return technicianArray.build();
    }

    public boolean add(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"INSERT into technician (service_provider_id, phone_number, f_name, status, l_name) values(?,?,?,?,?)",
                technicianModel.getServiceProviderId(),technicianModel.getContact(),technicianModel.getfName(),technicianModel.getStatus(),technicianModel.getlName());
    }

    public boolean update(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        System.out.println(technicianModel.toString());
        return CrudUtil.executeUpdate(connection,"UPDATE technician SET f_name=?,l_name=?,contact_num=? WHERE technician_id=?",technicianModel.getfName(),technicianModel.getlName(),technicianModel.getContact(),technicianModel.getId());
    }

    public boolean delete(Connection connection,String techId) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"DELETE FROM technician WHERE technician_id=?",techId);
    }
}
