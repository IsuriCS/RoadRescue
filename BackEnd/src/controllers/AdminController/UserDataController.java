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

}
