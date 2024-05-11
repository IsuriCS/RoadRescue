package servlet;

import controllers.ControllerImpl.GarageController;
import controllers.ControllerImpl.ServicesController;
import controllers.ControllerImpl.TechnicianController;

import javax.annotation.Resource;
import javax.json.Json;
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

@WebServlet(urlPatterns = "/statusServlet")
public class StatesServlets extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    GarageController garage = new GarageController();
    TechnicianController technician = new TechnicianController();

    ServicesController service=new ServicesController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        String id = req.getParameter("id");
        String status = req.getParameter("status");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        Connection connection=null;

        switch (option){
            case "garage":
                try {
                    connection= ds.getConnection();
                    boolean b = garage.changeStatus(connection, status, id);
                    if (b) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }else {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "does not updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }
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
                    response.add("message", "Class not fount Exception Error ");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }

                break;

            case "technician":

                try {
                    connection= ds.getConnection();
                    boolean b = technician.changeStatus(connection, status, id);
                    if (b) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }else {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "does not updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }
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
                    response.add("message", "Class not fount Exception Error ");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }
                break;

            case "cancel":
                try {
                    System.out.println(status+"status");
                    System.out.println(id+"id");

                    connection=ds.getConnection();
                    boolean b = service.cancelRequest(connection, status, id);
                    if (b) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }else {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "does not updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }
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
                    response.add("message", "Class not fount Exception Error ");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }


                break;

            default:
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
