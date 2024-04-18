package servlet;

import controllers.ControllerImpl.GarageController;
import controllers.ControllerImpl.TechnicianController;
import models.Garage;
import models.TechnicianModel;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/garage")
public class GarageServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    GarageController garage = new GarageController();
    TechnicianController technician=new TechnicianController();

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

                break;
            case "search":

                try {
                    connection = ds.getConnection();
                    Garage garageDetails = garage.getGarageDetails(connection, searchId);
                    JsonArray technicians=technician.getTechnicians(connection,Integer.parseInt(searchId));
                    JsonObjectBuilder garageData = Json.createObjectBuilder();
                    garageData.add("garageName",garageDetails.getGarageName());
                    garageData.add("contactNumber",garageDetails.getContactNumber());
                    garageData.add("email",garageDetails.getEmail());
                    garageData.add("garageStatus",garageDetails.getStatus());
                    garageData.add("garageRating",garageDetails.getAvgRating());
                    garageData.add("garageType",garageDetails.getGarageType());
                    garageData.add("OwnerName",garageDetails.getOwnerName());
                    garageData.add("imageRef",garageDetails.getImgRef());
                    garageData.add("availableTechnicians",technicians);

                    System.out.println(garageDetails.getImgRef().isEmpty());
                    System.out.println(garageDetails.getImgRef());


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

            case "loginSearch":

                try {
                    connection= ds.getConnection();
                    String result = garage.garageIsExists(connection, searchId);
                    if (result!=null) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "Done");
                        response.add("data", result);
                        writer.print(response.build());

                    }else{
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", searchId+" this phone Number is not register.\nPlease first register our system.");
                        response.add("data", "notExists");
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
                // handle
        }


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("garage update request is ok ");

        String id;
        String garageName ;
        String ownerName;
        String contactNumber;
        String email;
        String imageRef;

        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            id = jsonObject.getString("garageId");
            garageName = jsonObject.getString("garageName");
            ownerName = jsonObject.getString("ownerName");
            contactNumber = jsonObject.getString("contactNumber");
            email = jsonObject.getString("garageMail");
            imageRef = jsonObject.getString("imageRef");

            System.out.println("ssssssssssss"+imageRef);
            System.out.println("eeee"+email);
        }

        System.out.println("ssssssssssss"+imageRef);
        System.out.println("eeee"+email);

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try{
            Connection connection = ds.getConnection();
            Garage garageModel=new Garage(Integer.parseInt(id),garageName,ownerName,contactNumber,email,imageRef);

            boolean updateResult = garage.update(connection,garageModel);
            if (updateResult){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Technician update proceed successful.");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Technician update proceed failed.");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }
            connection.close();
        } catch (SQLException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "SQL Exception Error.");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Class not fount Exception Error");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }
}
