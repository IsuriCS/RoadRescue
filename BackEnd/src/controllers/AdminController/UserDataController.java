package controllers.AdminController;
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

    public JsonArray getCustomerSupportList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT csm.id AS member_id,csm.f_name as f_name, csm.l_name AS l_name,csm.phone_number AS phone_number,COUNT(t.id) AS tickets_solved FROM customer_support_member csm LEFT JOIN (SELECT customer_support_member_id AS id FROM customer_support_ticket UNION ALL SELECT customer_support_member_id AS id FROM sp_support_ticket) AS t ON csm.id = t.id GROUP BY csm.id, csm.f_name, csm.l_name, csm.phone_number");
        JsonArrayBuilder CustomerArray = Json.createArrayBuilder();
        while (rst.next()) {
            String member_id = rst.getString("member_id");
            String fname= rst.getString("f_name");
            String lname= rst.getString("l_name");
            String phone_number= rst.getString("phone_number");
            int tickets_solved = rst.getInt("tickets_solved");



            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("CSid", member_id);
            objectBuilder.add("fname",fname);
            objectBuilder.add("lname",lname);
            objectBuilder.add("phone_number",phone_number);
            objectBuilder.add("tickets_solved", tickets_solved);


            CustomerArray.add(objectBuilder.build());
        }

        return CustomerArray.build();
    }

    public boolean verifySP(Connection connection, int id ) throws SQLException, ClassNotFoundException {

        boolean verificationResult= CrudUtil.executeUpdate(connection,"UPDATE service_provider SET Verified = 'Yes' WHERE id = ?" , id);


        return verificationResult;
    }

    public boolean cancelVerification(Connection connection,int id)throws SQLException, ClassNotFoundException {

        boolean cancleResult= CrudUtil.executeUpdate(connection,"DELETE FROM service_provider WHERE id = ?" , id);


        return cancleResult;
    }

    public boolean UpdateCustomer(Connection connection, String id ,String fname,String lname,String email,String contactnum) throws SQLException, ClassNotFoundException {

        boolean updateResult= CrudUtil.executeUpdate(connection,"UPDATE customer SET f_name=?,l_name=?,email=?,phone_number=? WHERE id = ?" ,fname,lname,email,contactnum, id);


        return updateResult;
    }

    public boolean UpdateServiceProvider(Connection connection, String id ,String garage,String owner,String email,String contactnum) throws SQLException, ClassNotFoundException {

        boolean updateResult= CrudUtil.executeUpdate(connection,"UPDATE service_provider SET garage_name=?,owner_name=?,email=?,phone_number=? WHERE id = ?" ,garage,owner,email,contactnum, id);


        return updateResult;
    }
    public JsonObject getCoustomerbyID(Connection connection, String id) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT c.reg_timestamp AS time ,c.id AS customerid,c.f_name AS fname,c.l_name As lname,c.email AS email, CONCAT(c.f_name, ' ', c.l_name) AS full_name, c.phone_number AS phone_number, COALESCE(sr.num_service_requests, 0) AS num_service_requests, COALESCE(st.num_support_tickets, 0) AS num_support_tickets FROM customer c LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_service_requests FROM service_request GROUP BY customer_id ) sr ON c.id = sr.customer_id LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_support_tickets FROM customer_support_ticket GROUP BY customer_id ) st ON c.id = st.customer_id where id=?", id);

        // Check if ResultSet contains any rows
        if (rst.next()) {

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
            if (email == null) {
                objectBuilder.addNull("email");
            } else {
                objectBuilder.add("email", email);
            }
            objectBuilder.add("FullName", name);
            objectBuilder.add("contact", contactNum);
            objectBuilder.add("nServiceRequest", num_service_requests);
            objectBuilder.add("nSupportTickets", num_support_tickets);
            objectBuilder.add("Time",time);


            return objectBuilder.build();
        } else {
            return null;
        }
    }


    public JsonObject getSpyid(Connection connection, String id) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM service_provider WHERE id=?",id);
        ResultSet rst2=CrudUtil.executeQuery(connection,"Select assigned_service_provider_id,count(assigned_service_provider_id) From service_request WHERE assigned_service_provider_id=? GROUP BY assigned_service_provider_id ",id);
        ResultSet rst3=CrudUtil.executeQuery(connection,"SELECT s.id, COUNT(t.service_provider_id) FROM service_provider s LEFT JOIN sp_support_ticket t ON s.id = t.service_provider_id WHERE service_provider_id=? GROUP BY s.id ",id);

        if (rst.next()) {

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
            if (rst2.next()){
                comRequsts=rst2.getInt(2);
            }
            if (rst3.next()){
                supTickets=rst3.getInt(2);


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



           return objectBuilder.build();
        }
        else

    {
        return null;
    }


    }

    public boolean DeleteCustomer(Connection connection,String id)throws SQLException, ClassNotFoundException {

        boolean deleteResult= CrudUtil.executeUpdate(connection,"DELETE FROM customer WHERE id = ?" , id);


        return deleteResult;
    }



}
