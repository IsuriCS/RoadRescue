package controllers.ControllerImpl;

import models.TechnicianModel;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TechnicianController {


    public JsonArray getTechnicians(Connection connection,int garageId,String expertiseType) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select t.id,t.f_name,t.l_name\n" +
                "from technician_expertise te\n" +
                "left join expertise e on e.id=te.expertise_id\n" +
                "INNER JOIN technician t on te.technician_id=t.id\n" +
                "where e.expertise=? AND t.status=? AND t.service_provider_id=?;", expertiseType,1, garageId);

        JsonArrayBuilder technicianArray = Json.createArrayBuilder();
        while (resultSet.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("techId", resultSet.getString(1));
            objectBuilder.add("f_name", resultSet.getString(2));
            objectBuilder.add("l_name", resultSet.getString(3));
            technicianArray.add(objectBuilder.build());
        }
        return technicianArray.build();
    }

    public JsonArray getAll(Connection connection,String searchId) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "select  id,f_name,l_name,status,phone_number,profile_pic_ref from technician where service_provider_id=?",searchId);
        JsonArrayBuilder technicianArray = Json.createArrayBuilder();

        while (rst.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            int techId = rst.getInt(1);
            int techStatus = rst.getInt(4);
            String techStatusName="";

            if (techId < 10) {
                objectBuilder.add("techId", "T-00" + techId);
            } else if (techId < 100) {
                objectBuilder.add("techId", "T-0" + techId);
            } else {
                objectBuilder.add("techId", "T-" + techId);
            }

            if(techStatus==0){
                techStatusName="Not Available";
            } else if (techStatus==1) {
                techStatusName="Available";
            }else {
                techStatusName="Assign for Job";

            }


            List<String> expertiseList = fetchExpertiseArias(connection, techId);

            objectBuilder.add("techFirstName", rst.getString(2));
            objectBuilder.add("techLastName", rst.getString(3));
            objectBuilder.add("techStatus", techStatusName);
            objectBuilder.add("techContactNumb", rst.getString(5));
            objectBuilder.add("techProfilePicRef", (rst.getString(6) == null) ? "0" : rst.getString(6));
            objectBuilder.add("expertiseList", expertiseList.toString());
            technicianArray.add(objectBuilder.build());


        }
        return technicianArray.build();
    }

    private List<String> fetchExpertiseArias(Connection connection, int techId) throws SQLException, ClassNotFoundException {

        List<String> expertiseList = new ArrayList<>();

        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT e.expertise FROM technician_expertise te JOIN expertise e ON te.expertise_id = e.id WHERE te.technician_id = ?;", techId);

        while (resultSet.next()) {
            expertiseList.add(resultSet.getString(1));
        }

        return expertiseList;
    }

    public JsonArray getExpertiseArias(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select  * from expertise;");
        JsonArrayBuilder expertiseList = Json.createArrayBuilder();

        while (resultSet.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("expertiseId", resultSet.getString(1));
            objectBuilder.add("expertise", resultSet.getString(2));
            expertiseList.add(objectBuilder.build());
        }

        return expertiseList.build();

    }

    public boolean add(Connection connection, TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {


        // insert technician in to technician table
        boolean result_one = CrudUtil.executeUpdate(connection, "INSERT into technician (service_provider_id, phone_number, f_name, status, l_name) values(?,?,?,?,?)",
                technicianModel.getServiceProviderId(), technicianModel.getContact(), technicianModel.getfName(), technicianModel.getStatus(), technicianModel.getlName());

        ResultSet resultSet = CrudUtil.executeQuery(connection, "select max(id) from technician;");

        int technicianId = 0;

        while (resultSet.next()) {
            technicianId = resultSet.getInt(1);
        }


        // inset expertiseArias in to  technician_expertise table
        boolean result_two = false;

        for (int i = 2; i < technicianModel.getExpertiseArias().size(); i += 3) {

            String expertise_id = technicianModel.getExpertiseArias().get(i);
            String[] parts = expertise_id.split("");
            expertise_id = parts[1];
            int expertise_idCast = Integer.parseUnsignedInt(expertise_id);
            result_two = CrudUtil.executeUpdate(connection, "INSERT into technician_expertise (technician_id,expertise_id) values(?,?);", technicianId, expertise_idCast);
        }

        return result_one && result_two;

    }

    public boolean update(Connection connection, TechnicianModel technicianModel,int option) throws SQLException, ClassNotFoundException {

        if (option==1) {
            boolean technicianUpdateRust = CrudUtil.executeUpdate(connection, "Update technician SET f_name=?,l_name=?,profile_pic_ref=? where id=?",
                    technicianModel.getfName(), technicianModel.getlName(), technicianModel.getSaveImageRef(), technicianModel.getId());

            System.out.println(technicianUpdateRust);

            boolean technicianExpatriateUpdateRust = false;

            // clear technician_expertise table for update technician
            boolean clearResult = clearTechnicianExpertise(connection, technicianModel.getId());
            System.out.println(clearResult);
            if (clearResult) {
                for (int i = 2; i < technicianModel.getExpertiseArias().size(); i += 3) {
                    System.out.println(technicianModel.getExpertiseArias().get(i) + " " +technicianModel.getId());
                    String expertise_id = technicianModel.getExpertiseArias().get(i);
                    String[] parts = expertise_id.split("");
                    expertise_id = parts[1];
                    int expertise_idCast = Integer.parseUnsignedInt(expertise_id);
                    System.out.println(expertise_idCast + " " +technicianModel.getId());
                    technicianExpatriateUpdateRust = CrudUtil.executeUpdate(connection, "INSERT into technician_expertise (technician_id,expertise_id) values(?,?);", Integer.parseInt(technicianModel.getId()), expertise_idCast);
                }
            }

            return technicianUpdateRust && technicianExpatriateUpdateRust;
        }else {
            return CrudUtil.executeUpdate(connection,"Update technician SET f_name=?,l_name=?,profile_pic_ref=?,email=? where id=?",
                    technicianModel.getfName(),technicianModel.getlName(),technicianModel.getSaveImageRef(),technicianModel.getEmail(),technicianModel.getId());
        }
    }

    private boolean clearTechnicianExpertise(Connection connection, String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "DELETE FROM technician_expertise WHERE technician_id=?", Integer.parseInt(id));
    }

    public boolean delete(Connection connection, String techId) throws SQLException, ClassNotFoundException {

        boolean technicianExpertiseTableResult = CrudUtil.executeUpdate(connection, "DELETE FROM technician_expertise WHERE technician_id=?", techId);
        boolean serviceTechnicianResult=CrudUtil.executeUpdate(connection,"DELETE FROM service_technician WHERE technician_id=?", techId);
        boolean technicianTableResult = CrudUtil.executeUpdate(connection, "DELETE FROM technician WHERE id=?", techId);

        return technicianExpertiseTableResult && technicianTableResult;
    }

    public JsonArray fetchAssignTechnicianServices(Connection connection,String techId) throws SQLException, ClassNotFoundException {
        System.out.println(techId);
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select TIME_FORMAT(sr.accepted_timestamp, '%h.%i %p'),sr.description,ic.category,CONCAT(c.f_name,' ',c.l_name),c.phone_number,vm.model,sr.id,sr.location\n" +
                "from service_request sr\n" +
                "left join service_technician st on sr.id=st.service_request_id\n" +
                "join issue_category ic on sr.issue_category_id=ic.id\n" +
                "join customer c on c.id = sr.customer_id\n" +
                "join vehicle_model vm on vm.id=sr.vehicle_model_id\n" +
                "where st.technician_id=? and sr.status=?",Integer.parseInt(techId),2);

        JsonArrayBuilder assignIssue=Json.createArrayBuilder();

        while (resultSet.next()) {

            String time=resultSet.getString(1);
            String description=resultSet.getString(2);
            String issueCategory=resultSet.getString(3);
            String customerName=resultSet.getString(4);
            String customerContact=resultSet.getString(5);
            String vehicleModel=resultSet.getString(6);
            String serviceId=String.valueOf(resultSet.getInt(7));
            String customerLocation=resultSet.getString(8);

            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();
            objectBuilder.add("time",time);
            objectBuilder.add("description",description);
            objectBuilder.add("issueCategory",issueCategory);
            objectBuilder.add("customerName",customerName);
            objectBuilder.add("customerContact",customerContact);
            objectBuilder.add("vehicleModel",vehicleModel);
            objectBuilder.add("serviceId", serviceId);
            objectBuilder.add("customerLocation", customerLocation);
            assignIssue.add(objectBuilder.build());
        }
        return assignIssue.build();
    }

    public JsonObject getTechnicianData(Connection connection, String searchId) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select f_name,l_name,email,phone_number,profile_pic_ref from technician where id=?", Integer.parseInt(searchId));
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        if (resultSet.next()){

            List<String> expertiseList = fetchExpertiseArias(connection, Integer.parseInt(searchId));


            objectBuilder.add("techFName",resultSet.getString(1));
            objectBuilder.add("techLName",resultSet.getString(2));
            objectBuilder.add("tecEmail",(resultSet.getString(3)==null)? "example@gmail.com": resultSet.getString(3));
            objectBuilder.add("phoneNumber",resultSet.getString(4));
            objectBuilder.add("imgRef",(resultSet.getString(5)==null)? "0":resultSet.getString(5));
            objectBuilder.add("expertiseList", expertiseList.toString());
        }

        return objectBuilder.build();
    }

    public JsonObject getTechnicianActivities(Connection connection, String searchId) throws SQLException, ClassNotFoundException {
        int[] countJobs = countJobs(connection, searchId);

        int electricalTroubleShoot= countJobs[1];
        int engineMaintainable= countJobs[2]+countJobs[4];
        int oilSystem= countJobs[3];
        int hvac= countJobs[5];
        int other= countJobs[0] + countJobs[6];

        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        objectBuilder.add("ElectricalTroubleShoot",electricalTroubleShoot);
        objectBuilder.add("engineMaintainable",engineMaintainable);
        objectBuilder.add("OilSystem",oilSystem);
        objectBuilder.add("HVAC",hvac);
        objectBuilder.add("Other",other);

        return objectBuilder.build();

    }

    private int[] countJobs(Connection connection, String searchId) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select sr.issue_category_id\n" +
                "from service_technician st\n" +
                "join service_request sr on st.service_request_id=sr.id\n" +
                "where st.technician_id=?", searchId);

        int mechanicalIssue=0;
        int electricalIssues=0;
        int engineProblems=0;
        int fuelIssues=0;
        int exhaustIssues=0;
        int coolingProblems=0;
        int other=0;



        while (resultSet.next()) {
            int issueId = resultSet.getInt(1);
            if (issueId==1){
                mechanicalIssue++;
            } else if (issueId==2) {
                electricalIssues++;
            } else if (issueId==3) {
                engineProblems++;
            } else if (issueId==4) {
                fuelIssues++;
            } else if (issueId==5) {
                exhaustIssues++;
            } else if (issueId==6) {
                coolingProblems++;
            } else if (issueId==7) {
                other++;
            }
        }


        return new int[]{mechanicalIssue,electricalIssues,engineProblems,fuelIssues,exhaustIssues,coolingProblems,other};

    }

    public boolean updateTechnicianContactNumber(Connection connection, String newContactNumber, String technicianId) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "UPDATE technician set phone_number=? where id=?", newContactNumber, Integer.parseInt(technicianId));
    }

    public boolean changeStatus(Connection connection, String status, String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "UPDATE technician set status=? where id=?", Integer.parseInt(status), Integer.parseInt(id));
    }
}
