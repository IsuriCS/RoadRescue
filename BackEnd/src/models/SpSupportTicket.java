package models;

public class SpSupportTicket {
    private String serviceProId;
    private String title;

    public SpSupportTicket(String serviceProId, String title, String description) {
        this.serviceProId = serviceProId;
        this.title = title;
        this.description = description;
    }

    public SpSupportTicket() {
    }

    private String description;

    public String getServiceProId() {
        return serviceProId;
    }

    public void setServiceProId(String serviceProId) {
        this.serviceProId = serviceProId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
