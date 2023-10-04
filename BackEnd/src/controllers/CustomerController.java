package controllers;

import dao.CrudUtil;
import models.CustomerModel;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


public class CustomerController {


    public JsonArray getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT  * FROM customer");
        JsonArrayBuilder customerArray = Json.createArrayBuilder();
        while (rst.next()){
            CustomerModel customer = new CustomerModel(rst.getString(1), rst.getString(2), rst.getString(3), rst.getDouble(4));
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id",customer.getId());
            objectBuilder.add("name",customer.getName());
            objectBuilder.add("address",customer.getAddress());
            objectBuilder.add("salary",customer.getSalary());
            customerArray.add(objectBuilder.build());
        }
        return customerArray.build();
    }

    public JsonArray getCustomerId(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT  id FROM customer");
        JsonArrayBuilder arrayBuilder2 = Json.createArrayBuilder();
        while (rst.next()) {
            String id = rst.getString(1);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id",id);
            arrayBuilder2.add(objectBuilder.build());
        }
        return arrayBuilder2.build();
    }


    public CustomerModel search(Connection connection, String id) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "select * FROM customer WHERE id=?", id);
        CustomerModel customer=null;
        while (rst.next()) {
            customer=new CustomerModel(rst.getString(1), rst.getString(2), rst.getString(3), rst.getDouble(4) );
        }
        return customer;
    }



    public boolean add(Connection connection,CustomerModel customer) throws SQLException, ClassNotFoundException {
        /*return  CrudUtil.executeUpdate(connection, "INSERT  into customer values(?,?,?,?)",customer.getId(),customer.getName(),customer.getAddress(),customer.getSalary());*/

        System.out.println("customer check two");

        return true;
    }

    public boolean delete(Connection connection,String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"Delete from Customer where id=?",id);
    }

    public boolean update(Connection connection,CustomerModel customer) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE Customer SET name=?,address=?,salary=? WHERE id=?",customer.getName(),customer.getAddress(),customer.getSalary(),customer.getId());
    }

}
