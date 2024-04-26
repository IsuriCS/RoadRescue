package servlet;

import controllers.AdminController.UserDataController;
import controllers.ControllerImpl.CustomerSupportTicketController;
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
import java.util.List;

@WebServlet(urlPatterns = "/Admin/CustomerList")
public class AdminCustomerListServlet extends HttpServlet{
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    UserDataController userDataController=new UserDataController();
    CustomerSupportTicketController customerSupportTicketController=new CustomerSupportTicketController();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;
        try {
            connection = ds.getConnection();
            JsonArray allCustomers = userDataController.getCustomerList(connection);
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status",200);
            response.add("message","Done");
            response.add("data", allCustomers);
            writer.print(response.build());
        } catch (SQLException throwables) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",400);
            response.add("message","Error");
            response.add("data",throwables.getLocalizedMessage());
            writer.print(response.build());
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",400);
            response.add("message","Error");
            response.add("data",e.getLocalizedMessage());
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
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String fName;
        String lName;
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
                        fName = jsonObject.getString("fname");
                        lName = jsonObject.getString("lname");
                        contactNumber = jsonObject.getString("cnum");
                        id = jsonObject.getString("customerId");
                        email = jsonObject.getString("email");
                    try {
                        Connection connection = ds.getConnection();

                        boolean result = userDataController.UpdateCustomer(connection,id,fName,lName,email,contactNumber);

                        if (result) {
                            System.out.println("start send response");
                            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                            resp.setStatus(HttpServletResponse.SC_OK);
                            objectBuilder.add("status", 201);
                            objectBuilder.add("message", "Customer profile update successfull.");
                            objectBuilder.add("data","");
                            writer.print(objectBuilder.build());
//                System.out.println("end send response");
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


                case "getCustomerById":
                        id = jsonObject.getString("customerId");
                    try {
                        Connection connection = ds.getConnection();

                        JsonObject result = userDataController.getCoustomerbyID(connection,id);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 201);
                        objectBuilder.add("message", "Get customer by id.");
                        objectBuilder.add("data", result);
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

                case "getProfile":
                    id = jsonObject.getString("customerId");
                    try {
                        Connection connection = ds.getConnection();
                        JsonObjectBuilder dataobject = Json.createObjectBuilder();
                        JsonObject customerDetails = userDataController.getCoustomerbyID(connection,id);
                        JsonArray requestLocations = userDataController.getrequestLocationsCustomer(connection,id);
                        JsonArray requstStatus=userDataController.getrequeststatusCustomer(connection,id);
                        JsonArray ratings=userDataController.getratingsbycustomer(connection,id);
                        JsonArray supportTickets=customerSupportTicketController.getAllPendingSupportTicket(connection);

                        dataobject.add("profile",customerDetails);
                        dataobject.add("requestLocations",requestLocations);
                        dataobject.add("requestStatus",requstStatus);
                        dataobject.add("ratings",ratings);
                        dataobject.add("complaints",supportTickets);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 201);
                        objectBuilder.add("message", "Get customer profile by id.");
                        objectBuilder.add("data", dataobject.build());
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

    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        try {
            Connection connection = ds.getConnection();
            boolean deleteResult = userDataController.DeleteCustomer(connection, id);

            if (deleteResult) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Customer delete proceed successful.");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Customer delete proceed failed,because insert  technician id is wrong..!");
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

