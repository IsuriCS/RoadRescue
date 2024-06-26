package servlet;

import controllers.CSmember.DashboardCardsController;
import controllers.AdminController.UserDataController;

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


@WebServlet(urlPatterns = "/CS/DashboardCard")
public class CSDashboardCardServlet extends HttpServlet{
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    UserDataController userDataController=new UserDataController();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        Connection connection = null;
        try {
            connection = ds.getConnection();
            DashboardCardsController controller = new DashboardCardsController();
            JsonArray numofTickets= DashboardCardsController.GetCountsForCards(connection);
            JsonObject profile=userDataController.getCSMbyid(connection,id);


            JsonObjectBuilder dataBuilder = Json.createObjectBuilder();
            dataBuilder.add("analyticsData", numofTickets);
            dataBuilder.add("profile",profile);

            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status",200);
            response.add("message","Done");
            response.add("data", dataBuilder.build());
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
        }
    }



}
