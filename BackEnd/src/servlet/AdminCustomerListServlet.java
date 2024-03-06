package servlet;

import controllers.AdminController.UserDataController;
import controllers.AdminController.dashboardCards;

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

@WebServlet(urlPatterns = "/Admin/CustomerList")
public class AdminCustomerListServlet extends HttpServlet{
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    UserDataController userDataController=new UserDataController();
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
}

