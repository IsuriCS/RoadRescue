package controllers.ControllerImpl;

import utils.CrudUtil;

import javax.json.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ServicesController {

    public JsonArray fetchService(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "select ic.category,se.customer_id,se.description," +
                "se.approx_cost,TIME_FORMAT(se.request_timestamp, '%h.%i %p')" +
                ",se.indicator_1,se.indicator_2,se.indicator_3,se.indicator_4,se.indicator_5,se.indicator_6,se.id,se.location\n" +
                "from service_request se\n" +
                "right join issue_category ic on se.issue_category_id=ic.id\n" +
                "where  se.status=1;");
        JsonArrayBuilder services= Json.createArrayBuilder();

        while (resultSet.next()) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            String indicatorLightStatus;

            int customerId=resultSet.getInt(2);
            int engineIndicator=resultSet.getInt(6);
            int batteryIndicator=resultSet.getInt(7);
            int coolantTemperatureIndicator=resultSet.getInt(8);
            int transmissionIndicator=resultSet.getInt(9);
            int oilIndicator=resultSet.getInt(10);
            int breakSystemIndicator=resultSet.getInt(11);

            if (engineIndicator==1) {
                indicatorLightStatus="Engine indicator on";
            } else if (batteryIndicator == 1) {
                indicatorLightStatus="Battery indicator on";
            } else if (coolantTemperatureIndicator == 1) {
                indicatorLightStatus="Coolant temperature indicator on";
            } else if (transmissionIndicator == 1) {
                indicatorLightStatus="Transmission indicator on";
            } else if (oilIndicator == 1) {
                indicatorLightStatus="Oil pressure indicator on";
            } else if (breakSystemIndicator == 1) {
                indicatorLightStatus="Break system indicator on";
            }else {
                indicatorLightStatus="No select indicator lights";
            }

            String customContactNumber = getCustomContactNumber(connection, customerId);

            objectBuilder.add("issue",resultSet.getString(1));
            objectBuilder.add("customerContactNumber",customContactNumber);
            objectBuilder.add("description",resultSet.getString(3));
            objectBuilder.add("approx_cost",resultSet.getDouble(4));
            objectBuilder.add("requestTimeStamp",  resultSet.getString(5));
            objectBuilder.add("indicatorLightStatus", indicatorLightStatus );
            objectBuilder.add("serviceRequestId", resultSet.getInt(12) );
            objectBuilder.add("serviceLocation", resultSet.getString(13) );
            services.add(objectBuilder.build());
        }
        return services.build();
    }

    private String getCustomContactNumber(Connection connection,int customerId) throws SQLException, ClassNotFoundException {
        String contactNumber=null;
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT phone_number FROM customer WHERE id=?", customerId);
        if (resultSet.next()) {
            contactNumber=resultSet.getString(1);
        }else {
            // default call customer support contact number
            contactNumber="+94761339805";
        }
        return contactNumber;
    }

    public boolean assignTechnicianForService(Connection connection, String serviceId, String serviceProviderId, String technicianId) throws SQLException, ClassNotFoundException {
        boolean result1 = CrudUtil.executeUpdate(connection, "update service_request set\n" +
                "                           status=2,assigned_service_provider_id=?,accepted_timestamp=CONVERT_TZ(CURRENT_TIMESTAMP,'+00:00', '+05:30')\n" +
                "where id=?",Integer.parseInt(serviceProviderId),Integer.parseInt(serviceId));

        boolean result2 = add(connection, Integer.parseInt(serviceId), Integer.parseInt(technicianId));

        return result1 && result2;
    }

    public boolean add(Connection connection,int serviceRequestId,int technicianId) throws SQLException, ClassNotFoundException {
       return CrudUtil.executeUpdate(connection,"INSERT INTO service_technician (technician_id,service_request_id) values(?,?)",technicianId,serviceRequestId);
    }

    public boolean updateStatusAndAmount(Connection connection, int serviceId, double amount) throws SQLException, ClassNotFoundException {
        return     CrudUtil.executeUpdate(connection,"Update service_request set updated_at=CONVERT_TZ(CURRENT_TIMESTAMP,'+00:00', '+05:30'),requested_amount=? where id=?",amount,serviceId);
    }

    public String checkForCardPayment(Connection connection, String serviceId) throws SQLException, ClassNotFoundException {
        System.out.println(serviceId);
        System.out.println("A");
        ResultSet resultSet = CrudUtil.executeQuery(connection, "Select paid_amount from service_request where id=?", Integer.parseInt(serviceId));
        System.out.println("B");
        if (resultSet.next()){
            System.out.println("C");
            int value=(int) resultSet.getDouble(1);
            System.out.println("D");
            System.out.println(value);
            if (value==1){
                System.out.println("E");
                if (updateStatus(connection,serviceId)) {
                    System.out.println("F");
                    return "Payment successful";
                }else {
                    System.out.println("J");
                    return "failed";
                }
            }else if (value==0){
                System.out.println("H");
                System.out.println(value);
                return "Payment not successful.\n Try again later.";
            }
        }else {
            System.out.println("I");
            return "Not found";
        }
        System.out.println("K");
        return "";
    }

    private boolean updateStatus(Connection connection, String serviceId) throws SQLException, ClassNotFoundException {
        System.out.println("L");
        return CrudUtil.executeUpdate(connection,"Update service_request set status=3,updated_at=CONVERT_TZ(CURRENT_TIMESTAMP,'+00:00', '+05:30') where id=?",serviceId);
    }
}

