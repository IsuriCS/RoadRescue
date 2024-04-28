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
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT sp.*,COALESCE(assign_counts.num_assigned_services, 0) AS num_assigned_services,COALESCE(ticket_counts.num_support_tickets, 0) AS num_support_tickets FROM service_provider sp LEFT JOIN( SELECT assigned_service_provider_id, COUNT(*) AS num_assigned_services FROM service_request WHERE status = '5' GROUP BY assigned_service_provider_id ) AS assign_counts ON sp.id = assign_counts.assigned_service_provider_id LEFT JOIN (SELECT service_provider_id, COUNT(*) AS num_support_tickets FROM sp_support_ticket GROUP BY service_provider_id) AS ticket_counts ON sp.id = ticket_counts.service_provider_id;");

        JsonArrayBuilder SericeProviderArray = Json.createArrayBuilder();
        while (rst.next()) {
            int id = rst.getInt("id");
            String phoneNumber= rst.getString("phone_number");
            String email= rst.getString("email");
            String garageName= rst.getString("garage_name");
            String Date = rst.getString("reg_timestamp");
            String status = rst.getString("status");
            String location = rst.getString("location");
            Double avg_rating = rst.getDouble("avg_rating");
            String type = rst.getString("type");
            String owner_name = rst.getString("owner_name");
            String profile_pic_ref = rst.getString("profile_pic_ref");
            String verify=rst.getString("Verified");
            String comRequsts=rst.getString("num_assigned_services");
            String supTickets =rst.getString("num_support_tickets");

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
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT sp.*,COALESCE(assign_counts.num_assigned_services, 0) AS num_assigned_services,COALESCE(ticket_counts.num_support_tickets, 0) AS num_support_tickets FROM service_provider sp LEFT JOIN( SELECT assigned_service_provider_id, COUNT(*) AS num_assigned_services FROM service_request WHERE status = '5' GROUP BY assigned_service_provider_id ) AS assign_counts ON sp.id = assign_counts.assigned_service_provider_id LEFT JOIN (SELECT service_provider_id, COUNT(*) AS num_support_tickets FROM sp_support_ticket GROUP BY service_provider_id) AS ticket_counts ON sp.id = ticket_counts.service_provider_id WHERE id=?",id);
        ResultSet rst4= CrudUtil.executeQuery(connection,"SELECT COUNT(service_provider_id) FROM technician where service_provider_id=? group by service_provider_id;",id);
        ResultSet avgResponce=CrudUtil.executeQuery(connection,"SELECT AVG(TIMESTAMPDIFF(MINUTE, request_timestamp, accepted_timestamp)) AS response_time_minutes FROM service_request WHERE assigned_service_provider_id = ?",id);
        ResultSet avgcompletion=CrudUtil.executeQuery(connection,"SELECT AVG(TIMESTAMPDIFF(MINUTE, accepted_timestamp, updated_at)) AS completion_time_minutes FROM service_request WHERE status=5 AND assigned_service_provider_id = ?",id);

        if (rst.next()) {


            String phoneNumber= rst.getString("phone_number");
            String email= rst.getString("email");
            String garageName= rst.getString("garage_name");
            String Date = rst.getString("reg_timestamp");
            String status = rst.getString("status");
            String location = rst.getString("location");
            Double avg_rating = rst.getDouble("avg_rating");
            String type = rst.getString("type");
            String owner_name = rst.getString("owner_name");
            String profile_pic_ref = rst.getString("profile_pic_ref");
            String verify=rst.getString("Verified");
            String comRequsts=rst.getString("num_assigned_services");
            String supTickets =rst.getString("num_support_tickets");
            int technician=0;
            String avgrResponce= avgResponce.next()?avgResponce.getString(1):"0";
            String avgcomplete= avgcompletion.next()?avgcompletion.getString(1):"0";


            if (rst4.next()){
                technician=rst4.getInt("COUNT(service_provider_id)");


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
            objectBuilder.add("technicians",technician);
            if (avgrResponce!=null){
                objectBuilder.add("avgrResponce",avgrResponce);
            }
            else{
                objectBuilder.add("avgrResponce","0");
            }

            if (avgcomplete!=null){
                objectBuilder.add("avgcomplete",avgcomplete);
            }
            else{
                objectBuilder.add("avgcomplete","0");
            }

            System.out.println(technician);


            return objectBuilder.build();
        }
        else

        {
            return null;
        }


    }

    public JsonObject getCSMbyid(Connection connection,String id) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT csm.id AS member_id,csm.f_name as f_name, csm.l_name AS l_name,csm.phone_number AS phone_number,COUNT(t.id) AS tickets_solved FROM customer_support_member csm LEFT JOIN (SELECT customer_support_member_id AS id FROM customer_support_ticket UNION ALL SELECT customer_support_member_id AS id FROM sp_support_ticket) AS t ON csm.id = t.id WHERE csm.id=?",id);

        if (rst.next()) {
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


            return objectBuilder.build();
        }
        else {
            return null;
        }


    }

    public boolean verifySP(Connection connection, int id ) throws SQLException, ClassNotFoundException {

        boolean verificationResult= CrudUtil.executeUpdate(connection,"UPDATE service_provider SET Verified = 'Yes' WHERE id = ?" , id);


        return verificationResult;
    }



    public boolean UpdateCustomer(Connection connection, String id ,String fname,String lname,String email,String contactnum) throws SQLException, ClassNotFoundException {

        boolean updateResult= CrudUtil.executeUpdate(connection,"UPDATE customer SET f_name=?,l_name=?,email=?,phone_number=? WHERE id = ?" ,fname,lname,email,contactnum, id);


        return updateResult;
    }

    public boolean UpdateServiceProvider(Connection connection, String id ,String garage,String owner,String email,String contactnum) throws SQLException, ClassNotFoundException {

        boolean updateResult= CrudUtil.executeUpdate(connection,"UPDATE service_provider SET garage_name=?,owner_name=?,email=?,phone_number=? WHERE id = ?" ,garage,owner,email,contactnum, id);


        return updateResult;
    }

    public boolean UpdateCSM(Connection connection, String id ,String fname,String lname,String contactnum) throws SQLException, ClassNotFoundException {

        boolean updateResult= CrudUtil.executeUpdate(connection,"UPDATE customer_support_member SET f_name=?,l_name=?,phone_number=? WHERE id = ?" ,fname,lname,contactnum, id);
        return updateResult;
    }


    public boolean cancelVerification(Connection connection,int id)throws SQLException, ClassNotFoundException {

        boolean cancleResult= CrudUtil.executeUpdate(connection,"DELETE FROM service_provider WHERE id = ?" , id);


        return cancleResult;
    }
    public boolean DeleteCustomer(Connection connection,String id)throws SQLException, ClassNotFoundException {

        boolean deleteResult= CrudUtil.executeUpdate(connection,"DELETE FROM customer WHERE id = ?" , id);


        return deleteResult;
    }

    public boolean DeleteCSM(Connection connection,String id)throws SQLException, ClassNotFoundException {

        boolean deleteResult= CrudUtil.executeUpdate(connection,"DELETE FROM customer_support_member WHERE id = ?" , id);


        return deleteResult;
    }

//   Customer analytics
    public JsonArray getrequestLocationsCustomer(Connection connection,String cusID)throws SQLException, ClassNotFoundException{
        ResultSet resultSet=CrudUtil.executeQuery(connection,"SELECT location FROM service_request WHERE customer_id=? ",cusID);

        JsonArrayBuilder rlarray=Json.createArrayBuilder();
        while (resultSet.next()){
            rlarray.add(resultSet.getString("location"));
        }
        return rlarray.build();
    }

    public JsonArray getrequeststatusCustomer(Connection connection,String cusID)throws SQLException,ClassNotFoundException{
        ResultSet resultSet= CrudUtil.executeQuery(connection,"SELECT CASE WHEN status IN ('1', '2', '3', '4', '5') THEN 'Complete' WHEN status IN ('6', '7') THEN 'Cancel' END AS status_group,COUNT(*) AS total_requests FROM service_request WHERE customer_id = ? GROUP BY CASE WHEN status IN ('1', '2', '3', '4', '5') THEN 'Complete' WHEN status IN ('6', '7') THEN 'Cancel'END",cusID);

        JsonArrayBuilder array= Json.createArrayBuilder();

        while (resultSet.next()){
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();

            String status = resultSet.getString("status_group");
            String count=resultSet.getString("total_requests");

            objectBuilder.add("status",status);
            objectBuilder.add("count",count);
            array.add(objectBuilder.build());
        }
        return array.build();


    }

    public JsonArray getratingsbycustomer(Connection connection,String cusID)throws SQLException,ClassNotFoundException{
        ResultSet resultSet= CrudUtil.executeQuery(connection,"SELECT rating, COUNT(*) AS rating_count FROM service_request WHERE customer_id =? AND rating IS NOT NULL GROUP BY rating;",cusID);

        JsonArrayBuilder array= Json.createArrayBuilder();

        while (resultSet.next()){
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();

            String rating = resultSet.getString("rating");
            String count=resultSet.getString("rating_count");

            objectBuilder.add("rating",rating);
            objectBuilder.add("count",count);
            array.add(objectBuilder.build());
        }
        return array.build();


    }

//    Service Provider Analytics
    public JsonArray getGarageTechnitians(Connection connection,String spid)throws  SQLException,ClassNotFoundException{
        ResultSet resultSet= CrudUtil.executeQuery(connection,"SELECT * FROM technician where service_provider_id=? group by service_provider_id;",spid);

        JsonArrayBuilder techArray = Json.createArrayBuilder();

        while ( resultSet.next()){
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();
            objectBuilder.add("id",resultSet.getString("id"));
            objectBuilder.add("service_provider_id",spid);
            objectBuilder.add("phone_number",resultSet.getString("phone_number"));
            objectBuilder.add("email",resultSet.getString("email"));
            objectBuilder.add("f_name",resultSet.getString("f_name"));
            objectBuilder.add("l_name",resultSet.getString("l_name"));
          techArray.add(objectBuilder.build());

        }
        return techArray.build();

    }
    public JsonArray getGarageTechnitianscount(Connection connection,String spid)throws  SQLException,ClassNotFoundException{
        ResultSet resultSet= CrudUtil.executeQuery(connection,"SELECT COUNT(service_provider_id) FROM technician where service_provider_id=? group by service_provider_id;",spid);

        JsonArrayBuilder techArray = Json.createArrayBuilder();

        while ( resultSet.next()){
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();
            objectBuilder.add("id",resultSet.getString("id"));
            objectBuilder.add("service_provider_id",spid);
            objectBuilder.add("phone_number",resultSet.getString("phone_number"));
            objectBuilder.add("email",resultSet.getString("email"));
            objectBuilder.add("f_name",resultSet.getString("f_name"));
            objectBuilder.add("l_name",resultSet.getString("l_name"));
            techArray.add(objectBuilder.build());

        }
        return techArray.build();

    }
    public JsonArray getrequestLocationsSP(Connection connection,String SPid)throws SQLException, ClassNotFoundException{
        ResultSet resultSet=CrudUtil.executeQuery(connection,"SELECT location FROM service_request WHERE assigned_service_provider_id=? ",SPid);

        JsonArrayBuilder rlarray=Json.createArrayBuilder();
        while (resultSet.next()){
            rlarray.add(resultSet.getString("location"));
        }
        return rlarray.build();
    }

    public JsonArray getratingstoSP(Connection connection,String spid)throws SQLException,ClassNotFoundException{
        ResultSet resultSet= CrudUtil.executeQuery(connection,"SELECT rating, COUNT(*) AS rating_count FROM service_request WHERE assigned_service_provider_id =? AND rating IS NOT NULL GROUP BY rating;",spid);

        JsonArrayBuilder array= Json.createArrayBuilder();

        while (resultSet.next()){
            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();

            String rating = resultSet.getString("rating");
            String count=resultSet.getString("rating_count");

            objectBuilder.add("rating",rating);
            objectBuilder.add("count",count);
            array.add(objectBuilder.build());
        }
        return array.build();


    }

}
