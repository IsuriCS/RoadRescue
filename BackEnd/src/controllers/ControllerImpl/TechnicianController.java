package controllers.ControllerImpl;

import utils.CrudUtil;
import models.TechnicianModel;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TechnicianController {


    public JsonArray getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "select  id,f_name,l_name,status,phone_number from technician;");
        JsonArrayBuilder technicianArray = Json.createArrayBuilder();

        while (rst.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            if (rst.getInt(1)<10){
                objectBuilder.add("techId","T-00"+rst.getInt(1));
            }else if(rst.getInt(1)<100){
                objectBuilder.add("techId","T-0"+rst.getInt(1));
            }else {
                objectBuilder.add("techId","T-"+rst.getInt(1));
            }

            objectBuilder.add("techFirstName",rst.getString(2));
            objectBuilder.add("techLastName",rst.getString(3));
            objectBuilder.add("techStatus",(rst.getInt(4)==1) ? "Available":"Not Available");
            objectBuilder.add("techContactNumb",rst.getString(5));
            technicianArray.add(objectBuilder.build());
        }
        return technicianArray.build();
    }

    public JsonArray getExpertiseArias(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select  * from expertise;");
        JsonArrayBuilder expertiseList = Json.createArrayBuilder();

        while (resultSet.next()){
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("expertiseId",resultSet.getString(1));
            objectBuilder.add("expertise",resultSet.getString(2));
            expertiseList.add(objectBuilder.build());
        }

        return expertiseList.build();

    }

    public boolean add(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        boolean result_one = CrudUtil.executeUpdate(connection, "INSERT into technician (service_provider_id, phone_number, f_name, status, l_name) values(?,?,?,?,?)",
                technicianModel.getServiceProviderId(), technicianModel.getContact(), technicianModel.getfName(), technicianModel.getStatus(), technicianModel.getlName());

        ResultSet resultSet = CrudUtil.executeQuery(connection, "select max(id) from technician;");

        int technicianId=0;

        while (resultSet.next()){
            technicianId=resultSet.getInt(1);
        }



        boolean result_two = false;

        for (int i = 2; i < technicianModel.getExpertiseArias().size(); i += 3) {

            String expertise_id=technicianModel.getExpertiseArias().get(i);
            String[] parts = expertise_id.split("");
            expertise_id=parts[1];
            int expertise_idCast=Integer.parseUnsignedInt(expertise_id);
            result_two = CrudUtil.executeUpdate(connection, "INSERT into technician_expertise (technician_id,expertise_id) values(?,?);", technicianId, expertise_idCast);
        }

        return result_one && result_two;

    }

    public boolean update(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        System.out.println(technicianModel.toString());
        return CrudUtil.executeUpdate(connection,"UPDATE technician SET f_name=?,l_name=?,contact_num=? WHERE technician_id=?",technicianModel.getfName(),technicianModel.getlName(),technicianModel.getContact(),technicianModel.getId());
    }

    public boolean delete(Connection connection,String techId) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"DELETE FROM technician WHERE technician_id=?",techId);
    }
}
