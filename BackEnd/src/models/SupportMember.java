package models;


public class SupportMember {
    private int supportMemberId;

    private String f_name;
    private String l_name;



    private String phone_number;
    private String timestamp;



    public SupportMember() {
    }

    public SupportMember(int supportMemberId, String f_name, String l_name, String phone_number, String timestamp) {
        this.supportMemberId = supportMemberId;
        this.f_name = f_name;
        this.l_name= l_name;
        this.phone_number = phone_number;
        this.timestamp = timestamp;
    }





    public int getsupportMemberId() {
        return supportMemberId;
    }

    public void setsupportMemberId(int supportMemberId) {
        this.supportMemberId = supportMemberId;
    }

    public String getf_name() {
        return f_name;
    }

    public void setf_name(String f_name) {
        this.f_name = f_name;
    }

    public String getl_name() {
        return l_name;
    }

    public void setl_name(String l_name) {
        this.l_name = l_name;
    }


    public String getphone_number() {
        return phone_number;
    }

    public void setphone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "SupportMember{" +
                "supportMemberId=" + supportMemberId +
                ", l_name='" + l_name + '\'' +
                ", f_name='" + f_name + '\'' +
                ", phone-number=" + phone_number +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}

//    public int getCustomer_support_member_id() {
//        return customer_support_member_id;
//    }
//
//    public void setCustomer_support_member_id(int customer_support_member_id) {
//        this.customer_support_member_id = customer_support_member_id;
//    }
//}
