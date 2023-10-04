package controllers;

import dao.CrudUtil;
import models.TechnicianModel;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TechnicianController {

    public JsonArray getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT * FROM technician");
        JsonArrayBuilder technicianArray = Json.createArrayBuilder();

        while (rst.next()) {
            TechnicianModel technicianModel = new TechnicianModel(rst.getString(1), rst.getString(2), rst.getString(3), rst.getString(4), rst.getInt(5));
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id",technicianModel.getId());
            objectBuilder.add("name",technicianModel.getName());
            objectBuilder.add("expertise",technicianModel.getExpertise());
            objectBuilder.add("status",technicianModel.getStatus());
            objectBuilder.add("didJobs",technicianModel.getDidJobs());
        }
        return technicianArray.build();
    }

    public boolean add(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"INSERT into technician values(?,?,?,?,?)",technicianModel.getId(),technicianModel.getName(),technicianModel.getExpertise(),technicianModel.getStatus(),technicianModel.getDidJobs());
    }

    public boolean update(Connection connection,TechnicianModel technicianModel) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE technician SET name=?,expertise=?,status=?,didJob=? WHERE id=?",technicianModel.getName(),technicianModel.getExpertise(),technicianModel.getStatus(),technicianModel.getDidJobs(),technicianModel.getId());
    }

    public boolean delete(Connection connection,String techId) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"DELETE FROM technician WHERE id=?",techId);
    }
}
