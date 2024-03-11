package controllers.ControllerImpl;

import utils.CrudUtil;
import models.TechnicianModel;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TechnicianController {


    public JsonArray getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "select  id,f_name,l_name,status,phone_number from technician;");
        JsonArrayBuilder technicianArray = Json.createArrayBuilder();

        while (rst.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            int techId=rst.getInt(1);


            if (techId<10){
                objectBuilder.add("techId","T-00"+techId);
            }else if(techId<100){
                objectBuilder.add("techId","T-0"+techId);
            }else {
                objectBuilder.add("techId","T-"+techId);
            }

            List<String> expertiseList = fetchExpertiseArias(connection, techId);

            objectBuilder.add("techFirstName",rst.getString(2));
            objectBuilder.add("techLastName",rst.getString(3));
            objectBuilder.add("techStatus",(rst.getInt(4)==1) ? "Available":"Not Available");
            objectBuilder.add("techContactNumb",rst.getString(5));
            objectBuilder.add("expertiseList", expertiseList.toString());
            technicianArray.add(objectBuilder.build());
        }
        return technicianArray.build();
    }

    private List<String> fetchExpertiseArias(Connection connection,int techId) throws SQLException, ClassNotFoundException {

        List<String> expertiseList= new ArrayList<>();

        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT e.expertise FROM technician_expertise te JOIN expertise e ON te.expertise_id = e.id WHERE te.technician_id = ?;", techId);

        while (resultSet.next()){
            expertiseList.add(resultSet.getString(1));
        }

        return expertiseList;
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

//    public JsonArray getServiceRequest(Connection connection){
////        CrudUtil.executeQuery(connection,"")
//    }


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
