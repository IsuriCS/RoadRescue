package models;

public class Garage {
    private int id;
    private String garageName;
    private String contactNumber;
    private String email;
    private String registerTimeStamp;
    private String status;
    private  String location;
    private Float avgRating;
    private String garageType;


    public Garage() {
    }

    public Garage(int id, String garageName, String contactNumber, String email, String registerTimeStamp, String status, String location, Float avgRating, String garageType, String ownerName) {
        this.id = id;
        this.garageName = garageName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.registerTimeStamp = registerTimeStamp;
        this.status = status;
        this.location = location;
        this.avgRating = avgRating;
        this.garageType = garageType;
        this.ownerName = ownerName;
    }

    public Garage(String garageName, String contactNumber, String email, String status, Float avgRating, String garageType, String ownerName) {
        this.garageName = garageName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
        this.avgRating = avgRating;
        this.garageType = garageType;
        this.ownerName = ownerName;
    }

    private String ownerName;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGarageName() {
        return garageName;
    }

    public void setGarageName(String garageName) {
        this.garageName = garageName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegisterTimeStamp() {
        return registerTimeStamp;
    }

    public void setRegisterTimeStamp(String registerTimeStamp) {
        this.registerTimeStamp = registerTimeStamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Float getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(Float avgRating) {
        this.avgRating = avgRating;
    }

    public String getGarageType() {
        return garageType;
    }

    public void setGarageType(String garageType) {
        this.garageType = garageType;
    }



    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    @Override
    public String toString() {
        return "Garage{" +
                "id=" + id +
                ", garageName='" + garageName + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", email='" + email + '\'' +
                ", registerTimeStamp='" + registerTimeStamp + '\'' +
                ", status='" + status + '\'' +
                ", location='" + location + '\'' +
                ", avgRating=" + avgRating +
                ", garageType='" + garageType + '\'' +
                ", ownerName='" + ownerName + '\'' +
                '}';
    }

}
