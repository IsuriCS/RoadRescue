package servlet;


import controllers.CustomerController;
import models.CustomerModel;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {

    @Resource(name = "java:comp/env/thogakade/pool")
    DataSource ds;

    /*CustomerBO customerBO = (CustomerBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOMER);*/
    CustomerController customer=new CustomerController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            String option = req.getParameter("option");
            String searchId = req.getParameter("searchId");
            Connection connection = ds.getConnection();

            switch (option) {

                case "SEARCH":

                    CustomerModel searchCustomer = customer.search(connection, searchId);
                    if (searchCustomer!=null) {
                        String cstId = searchCustomer.getId();
                        String cstName = searchCustomer.getName();
                        String cstAddress = searchCustomer.getAddress();
                        double cstSalary = searchCustomer.getSalary();

                        JsonObjectBuilder customerData = Json.createObjectBuilder();
                        customerData.add("id",cstId);
                        customerData.add("name",cstName);
                        customerData.add("address",cstAddress);
                        customerData.add("salary",cstSalary);

                        JsonObjectBuilder searchResponse = Json.createObjectBuilder();
                        searchResponse.add("status",200);
                        searchResponse.add("message","Customer found");
                        searchResponse.add("data",customerData.build());

                        writer.print(searchResponse.build());
                    }else {
                        JsonObjectBuilder searchResponse = Json.createObjectBuilder();
                        resp.setStatus(HttpServletResponse.SC_OK);
                        searchResponse.add("status",404);
                        searchResponse.add("message","Customer is not found");
                        searchResponse.add("data","");
                        writer.print(searchResponse.build());
                    }

                    break;
                case "GETALL":

                    /*ResultSet rst = connection.prepareStatement("SELECT  * FROM customer").executeQuery();
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
                    while (rst.next()){
                        String id = rst.getString(1);
                        String name = rst.getString(2);
                        String address = rst.getString(3);
                        double salary = rst.getDouble(4);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("id",id);
                        objectBuilder.add("name",name);
                        objectBuilder.add("address",address);
                        objectBuilder.add("salary",salary);
                        arrayBuilder.add(objectBuilder.build());
                    }*/


                    JsonArray allCustomers = customer.getAll(connection);
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status",200);
                    response.add("message","Done");
                    response.add("data",allCustomers);
                    writer.print(response.build());
                    break;

                case "GetCustomerID":
                    /*ResultSet result = connection.prepareStatement("SELECT  id FROM customer").executeQuery();
                    JsonArrayBuilder cstIdArray = Json.createArrayBuilder();
                    while (result.next()){
                        String cstId = result.getString(1);

                        JsonObjectBuilder cstIdObject = Json.createObjectBuilder();
                        cstIdObject.add("id",cstId);
                        cstIdArray.add(cstIdObject.build());
                    }*/


                    JsonArray allCustomersId = customer.getCustomerId(connection);
                    JsonObjectBuilder responseGetCstId = Json.createObjectBuilder();
                    responseGetCstId.add("status",200);
                    responseGetCstId.add("message","Done");
                    responseGetCstId.add("data",allCustomersId);
                    writer.print(responseGetCstId.build());
                break;
            }
            connection.close();
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        System.out.println("customer check one");
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String customerId = jsonObject.getString("id");
        String customerName = jsonObject.getString("name");
        String customerAddress = jsonObject.getString("address");
        double customerSalary = Double.parseDouble(jsonObject.getString("salary"));



        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            Connection connection = ds.getConnection();
            CustomerModel customerDTO = new CustomerModel(customerId, customerName, customerAddress, customerSalary);
            boolean result = customer.add(connection, customerDTO);

            resp.addHeader("Access-Control-Allow-Origin","*");
            resp.addHeader("Access-Control-Allow-Methods", "DELETE, PUT");
            resp.addHeader("Access-Control-Allow-Headers", "Content-Type");

            System.out.println("customer check three");
         /*   PreparedStatement pst = connection.prepareStatement("INSERT  into customer values(?,?,?,?)");
            pst.setString(1, customerId);
            pst.setString(2, customerName);
            pst.setString(3, customerAddress);
            pst.setDouble(4, customerSalary);*/

            if (result){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_CREATED);
                objectBuilder.add("status",200);
                objectBuilder.add("message","Successfully Add...!");
                objectBuilder.add("data","");
                writer.print(objectBuilder.build());
            }
            connection.close();
        } catch (SQLException throwables) {
            System.out.println("customer check error one");
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status",400);
            objectBuilder.add("message","Error");
            objectBuilder.add("data",throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
            throwables.printStackTrace();
        } catch (ClassNotFoundException a) {
            System.out.println("customer check error two");
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status",400);
            objectBuilder.add("message","Error");
            objectBuilder.add("data",a.getLocalizedMessage());
            writer.print(objectBuilder.build());
            a.printStackTrace();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String cstId = req.getParameter("cstId");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();

        try {
            Connection connection = ds.getConnection();

            boolean result = customer.delete(connection, cstId);
            /*PreparedStatement pst = connection.prepareStatement("Delete from Customer where id=?");
            pst.setObject(1, cstId);*/

            if (result) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("status",200);
                response.add("message","Customer Deleted..!x!");
                response.add("data","");
                writer.print(response.build());
            }else {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                response.add("status",400);
                response.add("message","Wrong Id Insert");
                response.add("data","");
                writer.print(response.build());
            }
            connection.close();
        } catch (SQLException throwables) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",500);
            response.add("message","Error");
            response.add("data",throwables.getLocalizedMessage());
            writer.print(response.build());
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            response.add("status",500);
            response.add("message","Error");
            response.add("data",e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String customerId = jsonObject.getString("id");
        String customerName = jsonObject.getString("name");
        String customerAddress = jsonObject.getString("address");
        double customerSalary = Double.parseDouble(jsonObject.getString("salary"));

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            Connection connection = ds.getConnection();
            CustomerModel customerDTO = new CustomerModel(customerId, customerName, customerAddress, customerSalary);
            boolean result = customer.update(connection, customerDTO);

            /*PreparedStatement stm = connection.prepareStatement("UPDATE customer SET name=?,address=?,salary=? where id=?");
            stm.setString(1,customerName);
            stm.setString(2,customerAddress);
            stm.setDouble(3,customerSalary);
            stm.setString(4,customerId);*/

            if (result) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Updated");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Update Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }
            connection.close();
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Exception Error");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Exception Error");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }
    }
}
