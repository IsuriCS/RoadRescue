package controllers.ControllerImpl;


import utils.CrudUtil;

import models.SupportMemberModels;
import models.SupportMember;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SupportMemberController {
    public boolean update(Connection connection, int supportMemberId) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"UPDATE support_member SET f_name=?, l_name=? , phone_number=? WHERE id=?","closed",  supportMemberId);
}

    public boolean add(Connection connection, SupportMember supportMember, SupportMemberModels customerSupportMember) throws SQLException, ClassNotFoundException, ParseException {


        Timestamp timestamp = dateConvert(supportMember.getTimestamp());

        boolean boolValue1 = CrudUtil.executeUpdate(connection, "INSERT INTO support_member values(?,?,?)",
                supportMember.getf_name(), supportMember.getl_name(), supportMember.getphone_number(), timestamp);



        if (boolValue1){


            return true;
        }else {
            return false;
        }

    }

    private Timestamp dateConvert(String timestamp) throws ParseException {
        String dateFormat = "dd.MM.yyyy";

        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        Date utilDate = sdf.parse(timestamp);

        return new Timestamp(utilDate.getTime());

    }

    public static JsonObject getCustomerSupportMemberByContact(Connection connection, String contactNum) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM customer WHERE phone_number=?", contactNum);



        if (resultSet.next()){
            int id=resultSet.getInt(1);
            String f_name =resultSet.getString(2);
            String phone_number =resultSet.getString(3);
            String reg_timestamp =resultSet.getString(4);
            String l_name =resultSet.getString(5);


            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("id",id);
            objectBuilder.add("f_name",f_name);
            objectBuilder.add("phone_number",phone_number);
            objectBuilder.add("reg_timestamp",reg_timestamp);
            objectBuilder.add("l_name",l_name);
            return  objectBuilder.build();

        }
        return null;

    }


    public JsonObject getCustomerSupportProfile(Connection connection, int id) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM customer_support_member WHERE id=?", id);

        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        if (resultSet.next()) {
            int id1 = resultSet.getInt(1);
            String f_name = resultSet.getString(2);
            String phone_number = resultSet.getString(3);
            String reg_timestamp = resultSet.getString(4);
            String l_name = resultSet.getString(5);

            objectBuilder.add("id", id1);
            objectBuilder.add("f_name", f_name);
            objectBuilder.add("phone_number", phone_number);
            objectBuilder.add("reg_timestamp", reg_timestamp);
            objectBuilder.add("l_name", l_name);
        }

        return objectBuilder.build();


    }
}
