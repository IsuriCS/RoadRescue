package servlet;


import javax.servlet.http.HttpServlet;
import controllers.CSmember.ServiceRequestsController;

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

@WebServlet(urlPatterns = "/CSMember/customerSupportServiceRequests")
public class CustomerSupportServiceRequestsServlet extends HttpServlet{

    ServiceRequestsController serviceRequestsController = new ServiceRequestsController();
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;
        try {
            connection = ds.getConnection();
            JsonArray serviceRequests = serviceRequestsController.getServiceRequests(connection);
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 200);
            response.add("message", "Done");
            response.add("data", serviceRequests);
            writer.print(response.build());
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "SQLException");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "Class Not found");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestid = req.getParameter("RequestId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;


        System.out.println(requestid);

        try {
            connection = ds.getConnection();
            JsonArray RequestCancel = serviceRequestsController.RequestCancelation(connection,requestid);
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 200);
            response.add("message", "Done");
            response.add("data", RequestCancel);
            writer.print(response.build());
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "SQLException");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "Class Not found");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
