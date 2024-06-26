package controllers.AdminController;

import models.SupportTicket;
import models.TimeStampFormatter;
import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;


public class dashboardCards {

    public static JsonArray getcountsForCards(Connection connection) throws SQLException, ClassNotFoundException {
        int customerNum,SproviderNum,cusTicketCount,spTicketCount;
        int completedtasks;
        ResultSet rst1 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_count FROM customer");
        ResultSet rst2 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_count FROM service_provider");
        ResultSet cusTickets = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_tickets FROM customer_support_ticket");
        ResultSet spTickects = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_tickets FROM sp_support_ticket");
        ResultSet completedtasksset = CrudUtil.executeQuery(connection,"SELECT COUNT(*) AS completed_tasks FROM service_request WHERE status='5'");

        ResultSet resentReports = CrudUtil.executeQuery(connection,"SELECT *FROM (SELECT s.garage_name AS name,st.title,st.created_time,st.status,st.id as ticketId,st.service_provider_id As ownerid,st.customer_support_member_id As customer_support_member_id,st.description AS description,st.solution AS solution FROM sp_support_ticket st , service_provider s WHERE st.service_provider_id=s.id UNION ALL SELECT CONCAT(c.f_name,\" \",c.l_name) AS name,ct.title,ct.created_time,ct.status,ct.id as ticketId,ct.customer_id As ownerid,ct.customer_support_member_id As customer_support_member_id,ct.description AS description,ct.solution AS solution  FROM customer_support_ticket ct , customer c WHERE ct.customer_id=c.id) AS combined_tickets WHERE status='pending' ORDER BY created_time desc ");

        ResultSet registationChart=CrudUtil.executeQuery(connection,"SELECT DATE_FORMAT(reg_timestamp, '%M') AS month,COUNT(*) AS registrations,'customer' AS type FROM customer GROUP BY MONTH(reg_timestamp) UNION ALL SELECT DATE_FORMAT(reg_timestamp, '%M') AS month,COUNT(*) AS registrations, 'service_provider' AS type FROM service_provider GROUP BY MONTH(reg_timestamp) UNION ALL SELECT DATE_FORMAT(reg_timestamp, '%M') AS month,COUNT(*) AS registrations,'technician' AS type FROM technician GROUP BY MONTH(reg_timestamp)");
        ResultSet deletionChart=CrudUtil.executeQuery(connection,"SELECT DATE_FORMAT(deleted_time, '%M') AS month,COUNT(*) AS deletion, type AS type FROM deleted_accounts GROUP BY MONTH(deleted_time)");

//        ResultSet paymentChart=CrudUtil.executeQuery(connection,"SELECT MONTH(paid_time) AS month,YEAR(paid_time) AS year,SUM(CASE WHEN payment_method = 'online' THEN payment_amount ELSE 0 END) AS online_amount, SUM(CASE WHEN payment_method = 'cash' THEN payment_amount ELSE 0 END) AS cash_amount FROM payment GROUP BY YEAR(paid_time), MONTH(paid_time)");
        //Analytics Cards
        if (rst1.next()) {
            customerNum= rst1.getInt("customer_count");
        } else {
            customerNum=0;
        }

        if (rst2.next()) {
            SproviderNum= rst2.getInt("sp_count");
        } else {
            SproviderNum=0;
        }

        if (cusTickets.next()) {
            cusTicketCount= cusTickets.getInt("customer_tickets");
        } else {
            cusTicketCount=0;
        }

        if (spTickects.next()) {
            spTicketCount= spTickects.getInt("sp_tickets");
        } else {
            spTicketCount=0;
        }

        if (completedtasksset.next()) {
            completedtasks= completedtasksset.getInt("completed_tasks");
        } else {
            completedtasks=0;
        }

        JsonArrayBuilder countersForCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("CustomerNum", customerNum);
        objectBuilder.add("sproviderNum",SproviderNum);

        objectBuilder.add("SupportTicketCount",cusTicketCount+spTicketCount);
        objectBuilder.add("CompletedTaskCount",completedtasks);

        countersForCardsArray.add(objectBuilder.build());

        JsonArrayBuilder reportArray = Json.createArrayBuilder();
//        Recent 5 Tickets
        while (resentReports.next()) {

            SupportTicket supportTicket = new SupportTicket(resentReports.getString(1), resentReports.getString(2), resentReports.getString(3), resentReports.getString(4));
            JsonObjectBuilder recentReportsObjecct = Json.createObjectBuilder();
            recentReportsObjecct.add("name",supportTicket.getTicketOwner());
            recentReportsObjecct.add("title",supportTicket.getTitle());
            Timestamp timestamp = Timestamp.valueOf(supportTicket.getTimestamp());
            TimeStampFormatter formatterdTS = new TimeStampFormatter(timestamp);
            recentReportsObjecct.add("date", formatterdTS.extractDate());
            recentReportsObjecct.add("status",supportTicket.getTicketStatus());
            recentReportsObjecct.add("ticketId",resentReports.getString("ticketId"));
            recentReportsObjecct.add("SPid",resentReports.getString("ownerid"));

//            recentReportsObjecct.add("customer_support_member_id",resentReports.getString("customer_support_member_id"));
            recentReportsObjecct.add("description",resentReports.getString("description"));
//            recentReportsObjecct.add("solution",resentReports.getString("solution"));


            reportArray.add(recentReportsObjecct.build());
        }

        countersForCardsArray.add(reportArray.build());
//        Account Deletions And Registations
        JsonArrayBuilder RegistationArrray = Json.createArrayBuilder();
        while (registationChart.next()){
            String month = registationChart.getString("month");
            int reg= registationChart.getInt("registrations");
            String type = registationChart.getString("type");

            JsonObjectBuilder regObject = Json.createObjectBuilder();
            regObject.add("month",month);
            regObject.add("registrations",reg);
            regObject.add("type",type);

            RegistationArrray.add(regObject.build());

        }
        countersForCardsArray.add(RegistationArrray.build());

        JsonArrayBuilder deletionArray = Json.createArrayBuilder();
        while (deletionChart.next()){
            String month = deletionChart.getString("month");
            int reg= deletionChart.getInt("deletion");
            String type = deletionChart.getString("type");

            JsonObjectBuilder delObject = Json.createObjectBuilder();
            delObject.add("month",month);
            delObject.add("deletion",reg);
            delObject.add("type",type);

            deletionArray.add(delObject.build());

        }
        countersForCardsArray.add(deletionArray.build());

//        Payment Chart
//        JsonArrayBuilder PaymentArrray = Json.createArrayBuilder();
//        while (paymentChart.next()){
//            int month = paymentChart.getInt("month");
//            String year = paymentChart.getString("year");
//            String online=paymentChart.getString("online_amount");
//            String cash=paymentChart.getString("cash_amount");
//
//            JsonObjectBuilder Object = Json.createObjectBuilder();
//            Object.add("month",month);
//            Object.add("year",year);
//            Object.add("online",online);
//            Object.add("cash",cash);
//
//            PaymentArrray.add(Object.build());
//
//        }
//        countersForCardsArray.add(PaymentArrray.build());

        return countersForCardsArray.build();
    }

    public JsonObject getstbyNameandid(Connection connection, String id,String name)throws SQLException, ClassNotFoundException {

        ResultSet resultSet = CrudUtil.executeQuery(connection,"SELECT *FROM (SELECT s.garage_name AS name,st.title,st.created_time,st.status,st.id as ticketId,st.service_provider_id As ownerid,st.customer_support_member_id As customer_support_member_id,st.description AS description,st.solution AS solution FROM sp_support_ticket st , service_provider s WHERE st.service_provider_id=s.id UNION ALL SELECT CONCAT(c.f_name,' ',c.l_name) AS name,ct.title,ct.created_time,ct.status,ct.id as ticketId,ct.customer_id As ownerid,ct.customer_support_member_id As customer_support_member_id,ct.description AS description,ct.solution AS solution  FROM customer_support_ticket ct , customer c WHERE ct.customer_id=c.id) AS combined_tickets WHERE ticketID=? and name=?;",id,name);


        JsonArrayBuilder SupportTickets = Json.createArrayBuilder();

        if (resultSet.next()){

            int SPid= resultSet.getInt(6);
            String status =resultSet.getString(4);
            String customer_support_member_id =resultSet.getString(7);
            String title =resultSet.getString(2);
            String description =resultSet.getString("description");
            String created_time =resultSet.getString("created_time");
            String solution = resultSet.getString("solution");


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("ticketId",id);
            objectBuilder.add("SPid",SPid);
            objectBuilder.add("status",status);

            if (customer_support_member_id != null) {
                objectBuilder.add("customer_support_member_id",customer_support_member_id);
            } else {
                objectBuilder.addNull("customer_support_member_id");
            }
            objectBuilder.add("title",title);
            objectBuilder.add("description",description);
            objectBuilder.add("created_time",created_time);
            if (solution != null) {
                objectBuilder.add("solution",solution);
            } else {
                objectBuilder.addNull("solution");
            }

            return objectBuilder.build();
        }
        else {
            return null;
        }
    }

    public JsonObject getLocations(Connection connection)throws SQLException, ClassNotFoundException{
        ResultSet splocation = CrudUtil.executeQuery(connection,"Select location from service_provider");
        ResultSet srlocation = CrudUtil.executeQuery(connection,"Select location from service_request");

        JsonArrayBuilder splocationArray = Json.createArrayBuilder();
        JsonArrayBuilder srlocationArray = Json.createArrayBuilder();

        while (splocation.next()){
            splocationArray.add(splocation.getString("location"));

        }
        while (srlocation.next()){
            srlocationArray.add(srlocation.getString("location"));

        }
        JsonObjectBuilder result= Json.createObjectBuilder();

        result.add("ServiceProviders",splocationArray.build());
        result.add("ServiceRequests",srlocationArray.build());

        return  result.build();
    }

    public JsonArray getHighDemandService(Connection connection)throws SQLException,ClassNotFoundException{
        ResultSet resultSet=CrudUtil.executeQuery(connection,"SELECT e.expertise,COUNT(st.service_request_id) AS request_count FROM expertise e LEFT JOIN technician_expertise te ON e.id = te.expertise_id LEFT JOIN service_technician st ON te.technician_id = st.technician_id LEFT JOIN (SELECT COUNT(*) AS total_requests_count FROM service_request) AS total_requests ON 1=1 GROUP BY e.expertise;");

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
