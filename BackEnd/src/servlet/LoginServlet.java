package servlet;

import controllers.ControllerImpl.LoginController;

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

import static utils.OTP.generateOTP;
import static utils.SMS.smsApi;

@WebServlet(urlPatterns = "/login")
public class LoginServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    LoginController login = new LoginController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        String searchId = req.getParameter("searchId");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        switch (option) {
            case "loginSearch":
                try {
                    connection= ds.getConnection();

                    String result = login.garageIsExists(connection, searchId);
                    if (result!=null) {
                        String otp = generateOTP();
                        smsApi(otp,searchId);
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "OTP "+otp);
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

            case "registerSearch":
                try {
                    connection=ds.getConnection();
                    boolean exitsServiceProvider = login.isExitsServiceProvider(connection, searchId);
                    if (exitsServiceProvider) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", searchId+" is already exits.");
                        response.add("data", "");
                        writer.print(response.build());
                    }else {
                        String otp = generateOTP();
//                        smsApi(otp,searchId);
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "OTP "+otp);
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
            default:
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        String longitude = req.getParameter("longitude");
        String latitude = req.getParameter("latitude");
        String id = req.getParameter("id");
        String ownerName = req.getParameter("ownerName");
        String garageName = req.getParameter("garageName");
        String phoneNumber = req.getParameter("phoneNumber");

        String location=latitude+","+longitude;

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;

        switch (option) {
            case "sp":
                try {
                    connection= ds.getConnection();
                    boolean result= login.updateLocationForServiceProvider(connection,location,id);
                    if (result) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "Location Updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }else{
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "Location update failed");
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
            case "t":
                try {
                    connection= ds.getConnection();
                    boolean result= login.updateLocationForTechnician(connection,location,id);
                    if (result) {
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 200);
                        response.add("message", "Location Updated");
                        response.add("data", "");
                        writer.print(response.build());
                    }else{
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status", 204);
                        response.add("message", "Location update failed");
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

            case "registerUser":
                try {
                    connection= ds.getConnection();
                    String tempId= login.RegisterUser(connection,ownerName,garageName,phoneNumber);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                } catch (ClassNotFoundException e) {
                    throw new RuntimeException(e);
                }

                break;

            default:
        }
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
