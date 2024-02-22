package models;

import java.sql.Timestamp;
import java.util.List;

public class TechnicianModel {

    private String id;
    private String fName;
    private String lName;
    private String contact;
    private Timestamp timestamp;
    private List<String> expertiseArias;
    private String status;
    private int serviceProviderId;



    public TechnicianModel() {
    }

    public TechnicianModel(String id, String fName, String lName, String contact, Timestamp timestamp, List<String> expertiseArias, String status, int serviceProviderId) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.contact = contact;
        this.timestamp = timestamp;
        this.expertiseArias = expertiseArias;
        this.status = status;
        this.serviceProviderId = serviceProviderId;
    }


    public TechnicianModel(String fName, String lName, String contact, List<String> expertiseArias, String status, int serviceProviderId) {
        this.fName = fName;
        this.lName = lName;
        this.contact = contact;
        this.expertiseArias = expertiseArias;
        this.status = status;
        this.serviceProviderId = serviceProviderId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public List<String> getExpertiseArias() {
        return expertiseArias;
    }

    public void setExpertiseArias(List<String> expertiseArias) {
        this.expertiseArias = expertiseArias;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getServiceProviderId() {
        return serviceProviderId;
    }

    public void setServiceProviderId(int serviceProviderId) {
        this.serviceProviderId = serviceProviderId;
    }

    @Override
    public String toString() {
        return "TechnicianModel{" +
                "id='" + id + '\'' +
                ", fName='" + fName + '\'' +
                ", lName='" + lName + '\'' +
                ", contact='" + contact + '\'' +
                ", timestamp=" + timestamp +
                ", expertiseArias='" + expertiseArias + '\'' +
                ", status='" + status + '\'' +
                ", didJobs=" + serviceProviderId +
                '}';
    }
}
