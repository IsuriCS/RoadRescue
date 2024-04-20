package servlet;

import controllers.ControllerImpl.ServicesController;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObjectBuilder;
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

@WebServlet(urlPatterns = "/service")
public class ServiceServlet extends HttpServlet {
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;



    ServicesController services =new ServicesController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        String searchId = req.getParameter("searchId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        switch (option) {
            case "getServices":
                try {
                    connection=ds.getConnection();
                    JsonArray requestServices = services.fetchService(connection);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", requestServices);
                    writer.print(response.build());
                    connection.close();

                } catch (SQLException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 500);
                    response.add("message", "SQL Exception Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                } catch (ClassNotFoundException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 500);
                    response.add("message", "Class not fount Exception Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }


                break;

            case "garageDetail":
                    //handel option
                break;

            case "search":

                break;
            default:
                // handle
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String serviceId = req.getParameter("serviceId");
        String serviceProviderId = req.getParameter("serviceProviderId");
        String technician = req.getParameter("technicianId");
        String option = req.getParameter("option");
        String[] parts = technician.split("-");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        System.out.println(option);

        switch (option) {
            case "assignTechnician":
                System.out.println("2");
                try {
                    connection=ds.getConnection();
                    boolean result = services.assignTechnicianForService(connection,serviceId,serviceProviderId,parts[0]);
                    System.out.println("6");
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    if (result) {
                        response.add("status", 200);
                        response.add("message", technician+" is assigned for service.");
                    }else {
                        response.add("status", 400);
                        response.add("message", "Technician assign is failed.!");
                    }
                    response.add("data", "");
                    writer.print(response.build());

                    connection.close();

                } catch (SQLException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 500);
                    response.add("message", "SQL Exception Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                } catch (ClassNotFoundException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 500);
                    response.add("message", "Class not fount Exception Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }


                break;

            case "garageDetail":
                //handel option
                break;

            case "search":

                break;
            default:
                // handle
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
