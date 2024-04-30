package servlet;

import controllers.AdminController.SPSupportTicketContraller;
import controllers.AdminController.UserDataController;
import controllers.AdminController.dashboardCards;
import controllers.CSmember.DashboardController;
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

@WebServlet(urlPatterns = "/Admin/supportTicket")
public class SupportTicketServlet extends HttpServlet {
    @Resource(name = "java:comp/env/roadRescue")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        String option = req.getParameter("option");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        switch (option){
            case "getSTbyid":
                String type=req.getParameter("type");
                switch (type){
                    case "cus":
                        try {
                            Connection connection = ds.getConnection();
                            CustomerSupportTicketController customerSupportTicketController = new CustomerSupportTicketController();
                            JsonObject supportTicket = customerSupportTicketController.getSupportTicketByid(connection,id);
                            JsonObjectBuilder response = Json.createObjectBuilder();
                            response.add("status",200);
                            response.add("message","Done");
                            response.add("data", supportTicket);
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
                        break;
                    case "SP":
                        try {
                            Connection connection = ds.getConnection();
                            SPSupportTicketContraller supportticket=new SPSupportTicketContraller();
                            JsonObject supportTicket = supportticket.getstbyid(connection,id);
                            JsonObjectBuilder response = Json.createObjectBuilder();
                            response.add("status",200);
                            response.add("message","Done");
                            response.add("data", supportTicket);
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

                        break;
                    case "getbyNameandId":
                        String name=req.getParameter("name");
                        try {
                            Connection connection = ds.getConnection();
                            dashboardCards controller = new dashboardCards();
                            JsonObject st = controller.getstbyNameandid(connection,id,name);
                            JsonObjectBuilder response = Json.createObjectBuilder();
                            response.add("status",200);
                            response.add("message","Done");
                            response.add("data", st);
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

                        break;

                }

                break;
        }



    }
}
