package servlet;


import com.google.gson.Gson;
import controllers.ControllerImpl.TechnicianController;
import models.TechnicianModel;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.*;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = "/technician")
public class TechnicianServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    TechnicianController technician = new TechnicianController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        String searchId = req.getParameter("searchId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        switch (option) {
            case "getAll":
                try {
                    connection = ds.getConnection();
                    JsonArray allTechnicians = technician.getAll(connection);
                    System.out.println(allTechnicians);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", allTechnicians);
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

            case "expertise":
                System.out.println("hutta moko wada natte");
                try {
                    connection= ds.getConnection();
                    JsonArray expertiseArias = technician.getExpertiseArias(connection);
                    System.out.println(expertiseArias.toString());
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", expertiseArias);
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
            case "filterTechByIssue":
                try {
                    // split searchId to issueCategory and id
                    String[] parts = searchId.split("-");

                    String issueCategory = parts[0];
                    String id = parts[1];

                    connection = ds.getConnection();

                    JsonArray technicians=technician.getTechnicians(connection,Integer.parseInt(id),issueCategory);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", technicians);
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
            default:
                // handle
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String fName;
        String lName;
        String contactNumber;
        int techStatus;
        JsonArray expertiseAreas;

        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            fName = jsonObject.getString("techFirstName");
            lName = jsonObject.getString("techLastName");
            contactNumber = jsonObject.getString("techContactNumber");
            techStatus = jsonObject.getInt("techStatus");
            expertiseAreas = jsonObject.getJsonArray("techExpertiseAreas");
        }

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        List<String> expertiseAreasList = new ArrayList<String>();

        for (JsonValue expertiseArea : expertiseAreas
        ) {
            expertiseAreasList.add(String.valueOf(expertiseArea));
        }

        try {
            Connection connection = ds.getConnection();
            TechnicianModel technicianModel = new TechnicianModel(fName, lName, contactNumber, expertiseAreasList, techStatus, 1);

            boolean result = technician.add(connection, technicianModel);

            if (result) {
                System.out.println("start send response");
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 201);
                objectBuilder.add("message", "Technician add proceed successful.");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
                System.out.println("end send response");
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
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String id;
        String fName;
        String lName;
        String imageRef;
        JsonArray expertiseAreas;

        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            id = jsonObject.getString("techId");
            fName = jsonObject.getString("techFirstName");
            lName = jsonObject.getString("techLastName");
            imageRef = jsonObject.getString("imageRef");
            expertiseAreas = jsonObject.getJsonArray("techExpertiseAreas");
        }

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        List<String> expertiseAreasList = new ArrayList<String>();

        for (JsonValue expertiseArea : expertiseAreas
        ) {
            expertiseAreasList.add(String.valueOf(expertiseArea));
        }

        try{
            Connection connection = ds.getConnection();
            TechnicianModel technicianModel=new TechnicianModel(id,fName,lName,expertiseAreasList,imageRef);

            boolean updateResult = technician.update(connection, technicianModel);
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
                objectBuilder.add("message", "Technician update proceed failed.!");
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
        String techId = req.getParameter("delId");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        try {
            Connection connection = ds.getConnection();
            boolean deleteResult = technician.delete(connection, techId);

            if (deleteResult) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Technician delete proceed successful.");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Technician delete proceed failed,because insert  technician id is wrong..!");
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
            objectBuilder.add("message", "Class not found Exception Error.");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }
    }
}



/*
* 1xx Informational:

100 Continue
101 Switching Protocols
102 Processing
*
2xx Success:

200 OK
201 Created
202 Accepted
204 No Content
206 Partial Content
*
*
3xx Redirection:

300 Multiple Choices
301 Moved Permanently
302 Found
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect
*
*
4xx Client Error:

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
409 Conflict
410 Gone
429 Too Many Requests
*
*
5xx Server Error:

500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
* */