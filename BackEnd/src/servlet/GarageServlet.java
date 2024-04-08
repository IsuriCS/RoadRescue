package servlet;

import controllers.ControllerImpl.GarageController;
import controllers.ControllerImpl.TechnicianController;
import models.Garage;

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

@WebServlet(urlPatterns = "/garage")
public class GarageServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    GarageController garage = new GarageController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("mobile request is ok ");

        String option = req.getParameter("option");
        String searchId = req.getParameter("searchId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        switch (option) {
            case "garageDetail":
                try {
                    connection = ds.getConnection();
                    Garage garageDetails = garage.getGarageDetails(connection, "1");
                    System.out.println(garageDetails);

                    JsonObjectBuilder garageData = Json.createObjectBuilder();
                    garageData.add("garageName",garageDetails.getGarageName());
                    garageData.add("contactNumber",garageDetails.getContactNumber());
                    garageData.add("email",garageDetails.getEmail());
                    garageData.add("garageStatus",garageDetails.getStatus());
                    garageData.add("garageRating",garageDetails.getAvgRating());
                    garageData.add("garageType",garageDetails.getGarageType());
                    garageData.add("OwnerName",garageDetails.getOwnerName());


                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", garageData.build());
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

            case "search":
                // search content handle
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
        super.doPut(req, resp);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
