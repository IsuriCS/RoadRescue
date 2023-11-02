package servlet;

<<<<<<< HEAD
import controllers.CustomerSupportTicketController;
=======
import controllers.ControllerImpl.CustomerSupportTicketController;
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
import models.CustomerSupportTicket;
import models.SupportTicket;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;

<<<<<<< HEAD

=======
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
@WebServlet(urlPatterns = "/customerSupport")
public class CustomerSupportServlet extends HttpServlet {


<<<<<<< HEAD
    CustomerSupportTicketController cusSupportTicket = new CustomerSupportTicketController();
    @Resource(name = "java:comp/env/road_rescue/pool")
    DataSource ds;
=======
   CustomerSupportTicketController cusSupportTicket =new CustomerSupportTicketController();
   @Resource(name="java:comp/env/road_rescue/pool")
   DataSource ds;
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();

        try {
            Connection connection = ds.getConnection();
            JsonArray allPendingSupportTicket = cusSupportTicket.getAllPendingSupportTicket(connection);
            JsonObjectBuilder response = Json.createObjectBuilder();
<<<<<<< HEAD
            response.add("status", 200);
            response.add("message", "Successfully get all support tickets.");
            response.add("data", allPendingSupportTicket);
            writer.print(response.build());
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 500);
            response.add("message", "SQLException");
            response.add("data", e.getLocalizedMessage());
=======
            response.add("status",200);
            response.add("message","Successfully get all support tickets.");
            response.add("data",allPendingSupportTicket);
            writer.print(response.build());
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status",500);
            response.add("message","SQLException");
            response.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
<<<<<<< HEAD
            response.add("status", 500);
            response.add("message", "ClassNotFoundException");
            response.add("data", e.getLocalizedMessage());
=======
            response.add("status",500);
            response.add("message","ClassNotFoundException");
            response.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(response.build());
            e.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        int ticketId = jsonObject.getInt("supportTickerId");
        int customerSupport = jsonObject.getInt("CustomerSupport");
        int tickerOwner = jsonObject.getInt("tickerOwner");
        String createdDate = jsonObject.getString("createdDate");
        String title = jsonObject.getString("title");
        String description = jsonObject.getString("description");
        String solution = jsonObject.getString("solution");
        String status = jsonObject.getString("status");


<<<<<<< HEAD
        SupportTicket supportTicket = new SupportTicket(ticketId, title, description, status, createdDate);
=======
        SupportTicket supportTicket = new SupportTicket(ticketId,title,description,status,createdDate);
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
        CustomerSupportTicket customerSupportTicket = new CustomerSupportTicket(ticketId, tickerOwner, customerSupport);

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            boolean result = cusSupportTicket.add(connection, supportTicket, customerSupportTicket);

            if (result) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
                response.add("status", 200);
                response.add("message", "Customer Support ticket created successfully.");
                response.add("data", "");
                writer.print(response.build());
            } else {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                response.add("status", 400);
                response.add("message", "Customer Support ticket created failed.");
                response.add("data", "");
=======
                response.add("status",200);
                response.add("message","Customer Support ticket created successfully.");
                response.add("data","");
                writer.print(response.build());
            }else {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                response.add("status",400);
                response.add("message","Customer Support ticket created failed.");
                response.add("data","");
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
                writer.print(response.build());
            }
            connection.close();
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
            response.add("status", 500);
            response.add("message", "SQLException error.");
            response.add("data", e.getLocalizedMessage());
=======
            response.add("status",500);
            response.add("message","SQLException error.");
            response.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
            response.add("status", 500);
            response.add("message", "ClassNotFoundException error.");
            response.add("data", e.getLocalizedMessage());
=======
            response.add("status",500);
            response.add("message","ClassNotFoundException error.");
            response.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(response.build());
            e.printStackTrace();
        } catch (ParseException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
            response.add("status", 400);
            response.add("message", "ParseException error. Convert string type date to Timestamp type ");
            response.add("data", e.getLocalizedMessage());
=======
            response.add("status",400);
            response.add("message","ParseException error. Convert string type date to Timestamp type ");
            response.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(response.build());
            e.printStackTrace();
        }

        // solution eka add karala ne database eke kothankatwath

        // customer_support_ticket cannot enter data because already entered  data  this tables customer & customer support member


    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        int ticketId = jsonObject.getInt("supportTickerId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();
            boolean result = cusSupportTicket.update(connection, ticketId);

            if (result) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Support ticket is closed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Support ticket isn't closed (client side error).");
                objectBuilder.add("data", "");
=======
                objectBuilder.add("status",200);
                objectBuilder.add("message","Support ticket is closed");
                objectBuilder.add("data","");
                writer.print(objectBuilder.build());
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status",400);
                objectBuilder.add("message","Support ticket isn't closed (client side error).");
                objectBuilder.add("data","");
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
                writer.print(objectBuilder.build());
            }
        } catch (SQLException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "SQLException error.");
            objectBuilder.add("data", e.getLocalizedMessage());
=======
            objectBuilder.add("status",500);
            objectBuilder.add("message","SQLException error.");
            objectBuilder.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(objectBuilder.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
<<<<<<< HEAD
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "ClassNotFoundException error.");
            objectBuilder.add("data", e.getLocalizedMessage());
=======
            objectBuilder.add("status",500);
            objectBuilder.add("message","ClassNotFoundException error.");
            objectBuilder.add("data",e.getLocalizedMessage());
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }


    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
<<<<<<< HEAD


=======
>>>>>>> ce610b52e8cff5a4b6b1960d2977a4c3b6fbf406
