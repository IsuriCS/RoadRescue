package controllers.CSmember;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDataController {
    public JsonArray getCustomerList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT c.reg_timestamp AS time ,c.id AS customerid,c.f_name AS fname,c.l_name As lname,c.email AS email, CONCAT(c.f_name, ' ', c.l_name) AS full_name, c.phone_number AS phone_number, COALESCE(sr.num_service_requests, 0) AS num_service_requests, COALESCE(st.num_support_tickets, 0) AS num_support_tickets FROM customer c LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_service_requests FROM service_request GROUP BY customer_id ) sr ON c.id = sr.customer_id LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_support_tickets FROM customer_support_ticket GROUP BY customer_id ) st ON c.id = st.customer_id");
        JsonArrayBuilder CustomerArray = Json.createArrayBuilder();
        while (rst.next()) {
            String id = rst.getString("customerid");
            String fname= rst.getString("fname");
            String lname= rst.getString("lname");
            String email= rst.getString("email");
            String name = rst.getString("full_name");
            String contactNum = rst.getString("phone_number");
            int num_service_requests = rst.getInt("num_service_requests");
            int num_support_tickets = rst.getInt("num_support_tickets");
            String time = rst.getString("time");


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("customerId", id);
            objectBuilder.add("fname",fname);
            objectBuilder.add("lname",lname);
            objectBuilder.add("email",email);
            objectBuilder.add("FullName", name);
            objectBuilder.add("contact", contactNum);
            objectBuilder.add("nServiceRequest", num_service_requests);
            objectBuilder.add("nSupportTickets", num_support_tickets);
            objectBuilder.add("Time",time);

            CustomerArray.add(objectBuilder.build());
        }

        return CustomerArray.build();
    }


    public JsonArray getServiceProviderList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM service_provider");
        ResultSet rst2=CrudUtil.executeQuery(connection,"Select assigned_service_provider_id,count(assigned_service_provider_id) From service_request GROUP BY assigned_service_provider_id");
        ResultSet rst3=CrudUtil.executeQuery(connection,"SELECT s.id, COUNT(t.service_provider_id) FROM service_provider s LEFT JOIN sp_support_ticket t ON s.id = t.service_provider_id GROUP BY s.id");
        JsonArrayBuilder SericeProviderArray = Json.createArrayBuilder();
        while (rst.next()) {
            int id = rst.getInt(1);
            String phoneNumber= rst.getString(2);
            String email= rst.getString(3);
            String garageName= rst.getString(4);
            String Date = rst.getString(5);
            String status = rst.getString(6);
            String location = rst.getString(7);
            Double avg_rating = rst.getDouble(8);
            String type = rst.getString(9);
            String owner_name = rst.getString(10);
            String profile_pic_ref = rst.getString(11);
            String verify=rst.getString(12);
            int comRequsts=0;
            int supTickets=0;
            while (rst2.next()){
                if (rst2.getInt(1)==id){
                    comRequsts=rst2.getInt(2);
                }

            }
            while (rst3.next()){
                if (rst3.getInt(1)==id){
                    supTickets=rst3.getInt(2);
                }

            }


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id", id);
            objectBuilder.add("phoneNumber",phoneNumber);

            if (email != null) {
                objectBuilder.add("email", email);
            } else {
                objectBuilder.addNull("email");
            }

            objectBuilder.add("garageName",garageName);
            objectBuilder.add("Date",Date);
            objectBuilder.add("status",status);
            objectBuilder.add("location", location);
            objectBuilder.add("avg_rating", avg_rating);
            objectBuilder.add("type", type);
            objectBuilder.add("owner_name", owner_name);

            if (profile_pic_ref != null) {
                objectBuilder.add("profile_pic_ref", profile_pic_ref);
            } else {
                objectBuilder.addNull("profile_pic_ref");
            }
            objectBuilder.add("verify",verify);
            objectBuilder.add("comRequests",comRequsts);
            objectBuilder.add("supTickets",supTickets);



            SericeProviderArray.add(objectBuilder.build());
        }

        return SericeProviderArray.build();
    }


    public boolean verifySP(Connection connection, int id ) throws SQLException, ClassNotFoundException {

        boolean verificationResult= CrudUtil.executeUpdate(connection,"UPDATE service_provider SET Verified = 'Yes' WHERE id = ?" , id);


        return verificationResult;
    }

    public boolean cancelVerification(Connection connection,int id)throws SQLException, ClassNotFoundException {

        boolean cancleResult= CrudUtil.executeUpdate(connection,"DELETE FROM service_provider WHERE id = ?" , id);


        return cancleResult;
    }
}
