package servlet;

import javax.servlet.http.HttpServlet;
import controllers.CSmember.ReportsController;

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

@WebServlet(urlPatterns = "/CSMemberTicket/customerSupportTicketList")
public class CustomerSupportTicketListServlet extends HttpServlet {

    ReportsController reportsController = new ReportsController();
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;


    // protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //     String solution = req.getParameter("solution");
    //     try {
    //         Connection connection = ds.getConnection();
    //         boolean b = reportsController.UpdateSolutionTicket(connection, solution);
    //         if (b) {
    //             JsonObjectBuilder response = Json.createObjectBuilder();
    //             response.add("status", 200);
    //             response.add("message", "Done");
    //             resp.getWriter().print(response.build());
    //         } else {
    //             JsonObjectBuilder response = Json.createObjectBuilder();
    //             response.add("status", 500);
    //             response.add("message", "Failed");
    //             resp.getWriter().print(response.build());
    //         }
    //     } catch (SQLException e) {
    //         throw new RuntimeException(e);
    //     } catch (ClassNotFoundException e) {
    //         throw new RuntimeException(e);
    //     }

    // }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;
        try {
            connection = ds.getConnection();
            JsonArray PendingTickets = reportsController.getTicketList(connection);
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 200);
            response.add("message", "Done");
            response.add("data", PendingTickets);
            writer.print(response.build());
        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "SQLException");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status", 500);
            response.add("message", "Class Not found");
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
    }
}
