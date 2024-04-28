package servlet;

import controllers.ControllerImpl.GarageController;
import models.BankDetail;

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

@WebServlet(urlPatterns = "/bankDetail")
public class BankServlet extends HttpServlet {

    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    GarageController garage = new GarageController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String bank;
        String branch;
        String name;
        String accountNUmber;
        String serviceProId;


        try (Reader stringReader = new InputStreamReader(req.getInputStream())) {
            JsonReader reader = Json.createReader(stringReader);
            JsonObject jsonObject = reader.readObject();

            serviceProId = jsonObject.getString("garageId");
            bank = jsonObject.getString("bank");
            branch = jsonObject.getString("branch");
            accountNUmber = jsonObject.getString("accountNumber");
            name = jsonObject.getString("name");

        }
        BankDetail bankDetails=new BankDetail(name,branch,accountNUmber,bank,serviceProId);

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection =ds.getConnection();
            boolean result = garage.addBankDetails(connection, bankDetails);

            JsonObjectBuilder response = Json.createObjectBuilder();
            if (result) {
                response.add("status", 200);
                response.add("message", "Successfully");
            }else {
                response.add("status", 204);
                response.add("message", "Progress failed");
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
