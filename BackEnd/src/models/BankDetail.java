package models;

public class BankDetail {
    private String name;
    private String branch;
    private String accountNumber;
    private String bank;
    private String serviceProviderId;


    public BankDetail() {
    }

    public BankDetail(String name, String branch, String accountNumber, String bank, String serviceProviderId) {
        this.name = name;
        this.branch = branch;
        this.accountNumber = accountNumber;
        this.bank = bank;
        this.serviceProviderId = serviceProviderId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getServiceProviderId() {
        return serviceProviderId;
    }

    public void setServiceProviderId(String serviceProviderId) {
        this.serviceProviderId = serviceProviderId;
    }
}
