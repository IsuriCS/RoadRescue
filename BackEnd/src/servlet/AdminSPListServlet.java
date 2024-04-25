package servlet;


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

@WebServlet(urlPatterns = "/Admin/SPlist")
public class AdminSPListServlet extends HttpServlet{
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    UserDataController userDataController=new UserDataController();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        Connection connection = null;

        String option = req.getParameter("option");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        switch (option) {
            case "getallsp":
                try {
                    connection = ds.getConnection();
                    JsonArray allServiceP = userDataController.getServiceProviderList(connection);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", allServiceP);
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
            case "getSPbyid":
                String id = req.getParameter("id");
                try {
                    connection = ds.getConnection();
                    JsonObject spdetail = userDataController.getSpyid(connection,id);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", spdetail);
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
        String garage;
        String owner;
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


                    garage = jsonObject.getString("garage");
                    owner = jsonObject.getString("owner");
                    contactNumber = jsonObject.getString("cnum");
                    id = jsonObject.getString("spId");
                    email = jsonObject.getString("email");



                    try {
                        Connection connection = ds.getConnection();

                        boolean result = userDataController.UpdateServiceProvider(connection,id,garage,owner,email,contactNumber);

                        if (result) {
                            System.out.println("start send response");
                            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                            resp.setStatus(HttpServletResponse.SC_OK);
                            objectBuilder.add("status", 201);
                            objectBuilder.add("message", "Service Provider profile update successfull.");
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

                case "getSPById":


                    id = jsonObject.getString("spId");



                    try {
                        Connection connection = ds.getConnection();

                        JsonObject result = userDataController.getSpyid(connection,id);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 201);
                        objectBuilder.add("message", "Get Service Provider by id.");
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
            }

        }




    }
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id;
        String verify;
        String option;

        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            id = jsonObject.getInt("id");
            verify = jsonObject.getString("verify");
            option = jsonObject.getString("option");

        }




        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        switch (option){
            case "verify":
                try{
                    Connection connection = ds.getConnection();
                    boolean verificationResult = userDataController.verifySP(connection,id);
                    if (verificationResult){
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 200);
                        objectBuilder.add("message", "SP verification succussfull");
                        objectBuilder.add("data", "");
                        writer.print(objectBuilder.build());
                    }else {
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        objectBuilder.add("status", 400);
                        objectBuilder.add("message", "SP verification Failed");
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
    }

    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Extract the id parameter from the request URL
        String idParam = req.getParameter("id");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();


            try {
                Connection connection = ds.getConnection();
                int id = Integer.parseInt(idParam);

                boolean deletionResult = userDataController.cancelVerification(connection,id);

                if (deletionResult) {

                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_OK);
                    objectBuilder.add("status", 200);
                    objectBuilder.add("message", "Verification cancel successfull.");
                    writer.print(objectBuilder.build());
                } else {

                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    objectBuilder.add("status", 400);
                    objectBuilder.add("message", "Verification cancel fail.");
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
