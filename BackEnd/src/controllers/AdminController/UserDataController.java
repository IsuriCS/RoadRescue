package controllers.AdminController;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserDataController {

    public JsonArray getCustomerList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT c.id AS customerid,c.f_name AS fname,c.l_name As lname,c.email AS email, CONCAT(c.f_name, ' ', c.l_name) AS full_name, c.phone_number AS phone_number, COALESCE(sr.num_service_requests, 0) AS num_service_requests, COALESCE(st.num_support_tickets, 0) AS num_support_tickets FROM customer c LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_service_requests FROM service_request GROUP BY customer_id ) sr ON c.id = sr.customer_id LEFT JOIN ( SELECT customer_id, COUNT(*) AS num_support_tickets FROM customer_support_ticket GROUP BY customer_id ) st ON c.id = st.customer_id");
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


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("customerId", id);
            objectBuilder.add("fname",fname);
            objectBuilder.add("lname",lname);
            objectBuilder.add("email",email);
            objectBuilder.add("FullName", name);
            objectBuilder.add("contact", contactNum);
            objectBuilder.add("nServiceRequest", num_service_requests);
            objectBuilder.add("nSupportTickets", num_support_tickets);

            CustomerArray.add(objectBuilder.build());
        }

        return CustomerArray.build();
    }


    public JsonArray getServiceProviderList(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM service_provider");
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




            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id", id);
            objectBuilder.add("phoneNumber",phoneNumber);
            objectBuilder.add("email",email);
            objectBuilder.add("garageName",garageName);
            objectBuilder.add("Date",Date);
            objectBuilder.add("status",status);
            objectBuilder.add("location", location);
            objectBuilder.add("avg_rating", avg_rating);
            objectBuilder.add("type", type);
            objectBuilder.add("owner_name", owner_name);
            objectBuilder.add("profile_pic_ref", profile_pic_ref);



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
}
