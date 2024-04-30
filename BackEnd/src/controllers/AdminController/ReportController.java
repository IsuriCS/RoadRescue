package controllers.AdminController;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


public class ReportController {

    public JsonArray GetColumnNames(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT column_name FROM information_schema.columns WHERE table_schema = 'road_rescue' AND table_name = 'customer'");
        ResultSet rst2 = CrudUtil.executeQuery(connection, "SELECT column_name FROM information_schema.columns WHERE table_schema = 'road_rescue' AND table_name = 'service_provider'");
        ResultSet rst3 = CrudUtil.executeQuery(connection, "SELECT column_name FROM information_schema.columns WHERE table_schema = 'road_rescue' AND table_name = 'customer_support_member'");
        ResultSet rst4 = CrudUtil.executeQuery(connection, "SELECT column_name FROM information_schema.columns WHERE table_schema = 'road_rescue' AND table_name = 'sp_support_ticket'");
        ResultSet rst5 = CrudUtil.executeQuery(connection, "SELECT column_name FROM information_schema.columns WHERE table_schema = 'road_rescue' AND table_name = 'payment'");





        JsonArrayBuilder customerArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder serviceProviderArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder  CSMemberArrayBuilder= Json.createArrayBuilder();
        JsonArrayBuilder supportTicketArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder PaymentArrayBuilder = Json.createArrayBuilder();

        // Extract column names from rst and add to customerArrayBuilder

        while (rst.next()) {
            String columnName = rst.getString("column_name");
            customerArrayBuilder.add(columnName);
           
        }

        // Extract column names from rst2 and add to serviceProviderArrayBuilder

        while (rst2.next()) {
            String columnName = rst2.getString("column_name");
            serviceProviderArrayBuilder.add(columnName);

        }


        while (rst3.next()) {
            String columnName = rst3.getString("column_name");
            CSMemberArrayBuilder.add(columnName);

        }

        supportTicketArrayBuilder.add("SupportTicket");
        while (rst4.next()) {
            String columnName = rst4.getString("column_name");
            if(columnName=="service_provider_id"){
                supportTicketArrayBuilder.add("user_id");
            }
            else{
                supportTicketArrayBuilder.add(columnName);
            }


        }


        while (rst5.next()) {
            String columnName = rst5.getString("column_name");
            PaymentArrayBuilder.add(columnName);

        }

        // Build JSON arrays
        JsonArray customerArray = customerArrayBuilder.build();
        JsonArray serviceProviderArray = serviceProviderArrayBuilder.build();
        JsonArray CSMemberArray = CSMemberArrayBuilder.build();
        JsonArray supportTicketArray =supportTicketArrayBuilder.build();
        JsonArray PaymentArray = PaymentArrayBuilder.build();

        // Combine JSON arrays into a single JSON array
        JsonArrayBuilder resultArrayBuilder = Json.createArrayBuilder()
                .add(customerArray)
                .add(serviceProviderArray)
                .add(CSMemberArray)
                .add(supportTicketArray)
                .add(PaymentArray);

        return resultArrayBuilder.build();
    }

    public JsonArray getHighDemandServicebyMounth(Connection connection,String mounth)throws SQLException,ClassNotFoundException{
        ResultSet resultSet=CrudUtil.executeQuery(connection,"SELECT e.expertise,COUNT(st.service_request_id) AS request_count FROM expertise e LEFT JOIN technician_expertise te ON e.id = te.expertise_id LEFT JOIN service_technician st ON te.technician_id = st.technician_id LEFT JOIN (SELECT COUNT(*) AS total_requests_count FROM service_request) AS total_requests ON 1=1 WHERE st.service_request_id IN (SELECT id FROM service_request WHERE request_timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL ? MONTH)) GROUP BY e.expertise;",mounth);

        JsonArrayBuilder demandArray = Json.createArrayBuilder();
        while (resultSet.next()){
            String expertice=resultSet.getString("expertise");
            int count = resultSet.getInt("request_count");

            JsonObjectBuilder objectBuilder=Json.createObjectBuilder();
            objectBuilder.add("expertise",expertice);
            objectBuilder.add("request_count",count);

            demandArray.add(objectBuilder.build());
        }

        return demandArray.build();
    }
}
