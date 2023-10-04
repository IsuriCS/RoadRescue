package models;

public class TechnicianModel {

    private String id;
    private String name;
    private String expertise;
    private String status;
    private int didJobs;

    public TechnicianModel(String id, String name, String expertise, String status, int didJobs) {
        this.id = id;
        this.name = name;
        this.expertise = expertise;
        this.status = status;
        this.didJobs = didJobs;
    }

    public TechnicianModel() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getDidJobs() {
        return didJobs;
    }

    public void setDidJobs(int didJobs) {
        this.didJobs = didJobs;
    }

    @Override
    public String toString() {
        return "TechnicianModel{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", expertise='" + expertise + '\'' +
                ", status='" + status + '\'' +
                ", didJobs=" + didJobs +
                '}';
    }
}
