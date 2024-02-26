package controllers.AdminController;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
public class dashboardCards {

    public static JsonArray getcountsForCards(Connection connection) throws SQLException, ClassNotFoundException {
        int customerNum,SproviderNum;
        ResultSet rst1 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_count FROM customer");
        ResultSet rst2 = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS sp_count FROM service_provider");

        if (rst1.next()) {
            customerNum= rst1.getInt("customer_count");
        } else {
            customerNum=0; // return 0 if no records found
        }

        if (rst2.next()) {
            SproviderNum= rst2.getInt("sp_count");
        } else {
            SproviderNum=0; // return 0 if no records found
        }


//        ResultSet rst = CrudUtil.executeQuery(connection, query.toString());
        JsonArrayBuilder countersForCardsArray = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        objectBuilder.add("CustomerNum", customerNum);
        objectBuilder.add("sproviderNum",SproviderNum);

        countersForCardsArray.add(objectBuilder.build());

        return countersForCardsArray.build();
    }
//    public static int getNumofCustomers(Connection connection) throws SQLException, ClassNotFoundException {
//        ResultSet rst = CrudUtil.executeQuery(connection, "SELECT COUNT(*) AS customer_count FROM customer");
//        if (rst.next()) {
//            return rst.getInt("customer_count");
//        } else {
//            return 0; // return 0 if no records found
//        }
//    }

}
