package servlet;

import controllers.ControllerImpl.RegisterController;
import models.RegisterModel;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
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

@WebServlet(urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    RegisterController regController = new RegisterController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String ownerName;
        String garageName;
        String contactNumber;
        String latitude;
        String longitude;

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");


        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();
            ownerName = jsonObject.getString("ownerName");
            garageName = jsonObject.getString("garageName");
            contactNumber = jsonObject.getString("phoneNumber");
            latitude = jsonObject.getString("latitude");
            longitude = jsonObject.getString("longitude");

        }

        System.out.println(ownerName);
        System.out.println(garageName);
        System.out.println(contactNumber);
        System.out.println(latitude);
        System.out.println(longitude);
        System.out.println("****************");

        Connection connection=null;
        RegisterModel registerModel = new RegisterModel(
            ownerName,garageName,contactNumber,
                Double.parseDouble(latitude),
                Double.parseDouble(longitude)
        );

        try {
            connection=ds.getConnection();
            String result= regController.RegisterServiceProvider(connection,registerModel);
            if (result!=null) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("status", 200);
                response.add("message", "Done");
                response.add("data", result);
                writer.print(response.build());
            }else {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("status", 204);
                response.add("message", "Failed");
                response.add("data", "User register failed");
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
