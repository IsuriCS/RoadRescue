package controllers.ControllerImpl;

import models.Garage;
import models.SpSupportTicket;
import utils.CrudUtil;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
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





    public Boolean update(Connection connection,Garage garageModel) throws SQLException, ClassNotFoundException {
       return CrudUtil.executeUpdate(connection,"UPDATE service_provider SET phone_number=?,email=?,garage_name=?,owner_name=?,profile_pic_ref=? WHERE id=?",
                garageModel.getContactNumber(),garageModel.getEmail(),garageModel.getGarageName(),garageModel.getOwnerName(),garageModel.getImgRef(),garageModel.getId());
    }


    public JsonArray getActivities(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection,
                " select DATE(sr.updated_at),TIME_FORMAT(sr.updated_at, '%h.%i %p'),CONCAT(c.f_name,' ',c.l_name) as custommerName,vm.model,CONCAT(t.f_name,' ',t.l_name) as technicianName,t.id,sr.paid_amount,sr.description\n" +
                        "from service_request sr\n" +
                        "left join customer c on sr.customer_id=c.id\n" +
                        "join vehicle_model vm on sr.vehicle_model_id = vm.id\n" +
                        "join service_technician st on sr.id=st.service_request_id\n" +
                        "join technician t on st.technician_id=t.id\n" +
                        "where sr.status=5");

        JsonArrayBuilder didActivities= Json.createArrayBuilder();

        while (resultSet.next()) {
            System.out.println("getActivities 3");
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            String date=resultSet.getString(1);
            String time=resultSet.getString(2);
            String customerName=resultSet.getString(3);
            String vehicle=resultSet.getString(4);
            String technicianName=resultSet.getString(5);
            int technicianId=resultSet.getInt(6);
            double amount=resultSet.getInt(7);
            String description=resultSet.getString(8);

            objectBuilder.add("date",date);
            objectBuilder.add("time",time);
            objectBuilder.add("customerName",customerName);
            objectBuilder.add("vehicle",vehicle);
            objectBuilder.add("technicianName",technicianName);
            objectBuilder.add("technicianId","T-"+technicianId);
            objectBuilder.add("amount",amount);
            objectBuilder.add("description",description);
            didActivities.add(objectBuilder.build());
        }
        return didActivities.build();
    }

    public JsonArray getCustomerSupports(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection,"select CONCAT(f_name,' ',l_name),phone_number from customer_support_member order by RAND() LIMIT 2");
        JsonArrayBuilder customerSupportMember=Json.createArrayBuilder();
        while (resultSet.next()) {
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();
            objectBuilder.add("name",resultSet.getString(1));
            objectBuilder.add("contactNumber",resultSet.getString(2));
            customerSupportMember.add(objectBuilder.build());
        }

        return customerSupportMember.build();
    }

    public boolean addSupportTicker(Connection connection, SpSupportTicket supportTicket) throws SQLException, ClassNotFoundException {
       return CrudUtil.executeUpdate(connection,"insert into sp_support_ticket (service_provider_id, status, title, description) values (?,?,?,?)",Integer.parseInt(supportTicket.getServiceProId()), "pending",supportTicket.getTitle(),supportTicket.getDescription());
    }
}

