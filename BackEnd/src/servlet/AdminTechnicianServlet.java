package servlet;

import controllers.AdminController.SPSupportTicketContraller;
import controllers.AdminController.UserDataController;

import javax.annotation.Resource;
import javax.json.*;
import javax.json.stream.JsonParsingException;
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

@WebServlet(urlPatterns = "/Admin/technician")
public class AdminTechnicianServlet extends HttpServlet {
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    UserDataController userDataController=new UserDataController();
//    SPSupportTicketContraller spSupportTicketContraller= new SPSupportTicketContraller();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        Connection connection = null;

        String option = req.getParameter("option");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        switch (option) {
            case "getalltech":
                try {
                    connection = ds.getConnection();
                    JsonArray profile = userDataController.getTechnicianList(connection);

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", profile);
                    writer.print(response.build());
                } catch (SQLException throwables) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", throwables.getLocalizedMessage());
                    writer.print(response.build());
                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                } finally {
                    if (connection != null) {
                        try {
                            connection.close();
                        } catch (SQLException e) {

                        }
                    }

                }
                break;
            case "getTechbyid":
                String id = req.getParameter("id");
                try {
                    connection = ds.getConnection();
                    JsonObject profile = userDataController.getTechnicianByid(connection,id);
                    JsonObject analytics=userDataController.gettechnitianActivities(connection,id);
                    JsonObjectBuilder data = Json.createObjectBuilder();

                    data.add("profile",profile);
                    data.add("analytics",analytics);

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", data.build());
                    writer.print(response.build());
                } catch (SQLException throwables) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", throwables.getLocalizedMessage());
                    writer.print(response.build());
                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                } finally {
                    if (connection != null) {
                        try {
                            connection.close();
                        } catch (SQLException e) {

                        }
                    }

                }
                break;
        }
    }


    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String fname;
        String lname;
        String contactNumber;
        String id;
        String email;
        String option;
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            option = jsonObject.getString("option");
            switch (option){
                case "updateDetails":
                    fname = jsonObject.getString("fname");
                    lname = jsonObject.getString("lname");
                    contactNumber = jsonObject.getString("cnum");
                    id = jsonObject.getString("techId");
                    email = jsonObject.getString("email");



                    try {
                        Connection connection = ds.getConnection();

                        boolean result = userDataController.Updatetechnician(connection,id,fname,lname,contactNumber,email);

                        if (result) {
                            System.out.println("start send response");
                            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                            resp.setStatus(HttpServletResponse.SC_OK);
                            objectBuilder.add("status", 201);
                            objectBuilder.add("message", "Service Provider profile update successfull.");
                            objectBuilder.add("data","");
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
                    break;

                case "getTechById":

                    id = jsonObject.getString("techId");

                    try {
                        Connection connection = ds.getConnection();

                        JsonObject profile = userDataController.getTechnicianByid(connection,id);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 201);
                        objectBuilder.add("message", "Get Service Provider by id.");
                        objectBuilder.add("data", profile);
                        writer.print(objectBuilder.build());
//                System.out.println("end send response");

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
                    break;
            }

        }




    }



}
