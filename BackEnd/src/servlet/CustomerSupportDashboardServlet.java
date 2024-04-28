package servlet;



import controllers.CSmember.DashboardContraller;
import controllers.ControllerImpl.CustomerSupportController;
import controllers.ControllerImpl.CustomerSupportTicketController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import models.CustomerSupportTicketModels;
import models.SupportTicket;
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
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
@WebServlet(urlPatterns = "/customerSupportDashboard")
public class CustomerSupportDashboardServlet extends HttpServlet{

    DashboardContraller dashboardContraller= new DashboardContraller();
    @Resource(name="java:comp/env/roadRescue")
    DataSource ds;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();
            JsonArray recentRequests = dashboardContraller.getRecentServices(connection);
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status",200);
            response.add("message","Successfully get all RecentRequests.");
            response.add("data",recentRequests);
            writer.print(response.build());
            connection.close();
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",500);
            response.add("message","SQLException");
            response.add("data",e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",500);
            response.add("message","ClassNotFoundException");
            response.add("data",e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        }

    }

}
